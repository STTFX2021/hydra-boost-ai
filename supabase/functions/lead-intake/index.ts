import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadPayload {
  request_id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  tipo_negocio?: string;
  nombre_negocio?: string;
  ciudad?: string;
  mensaje?: string;
  fuente: string;
  pagina?: string;
  extra?: Record<string, unknown>;
}

async function insertLead(payload: LeadPayload): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const tags: string[] = [];
  if (payload.extra) {
    const { problems, channels, volume } = payload.extra as {
      problems?: string[];
      channels?: string[];
      volume?: string;
    };
    if (problems) tags.push(...problems);
    if (channels) tags.push(...channels);
    if (volume) tags.push(`vol_${volume}`);
  }

  const { error } = await supabase.from("leads").insert({
    name: payload.nombre,
    email: payload.email,
    phone: payload.telefono || null,
    business_name: payload.nombre_negocio || payload.tipo_negocio || null,
    city: payload.ciudad || null,
    vertical: payload.tipo_negocio || null,
    source: payload.fuente || "website",
    score: 70,
    status: "new",
    tags: tags.length > 0 ? tags : null,
  });

  if (error) {
    console.error("DB insert error:", error);
    return false;
  }
  return true;
}

async function sendToN8N(payload: LeadPayload): Promise<boolean> {
  const url = "https://hydrai.app.n8n.cloud/webhook/lead-intake";
  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          fecha: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        console.log(`n8n lead-intake delivered (attempt ${attempt + 1})`);
        return true;
      }
      console.error(`n8n attempt ${attempt + 1} failed:`, await res.text());
    } catch (err) {
      console.error(`n8n attempt ${attempt + 1} error:`, err);
    }
    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }
  return false;
}

async function sendResendBackup(payload: LeadPayload): Promise<boolean> {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.warn("No RESEND_API_KEY, skipping email backup");
    return false;
  }

  const CONTACT_FROM = Deno.env.get("CONTACT_FROM") || "HydrAI Labs <noreply@hydrailabs.com>";
  const CONTACT_TO = Deno.env.get("CONTACT_TO") || "sam@hydrailabs.com";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: payload.email,
        subject: `🔥 Nuevo lead: ${payload.nombre} - ${payload.tipo_negocio || "Web"} [${payload.fuente}]`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h1 style="color:#7C3AED;">🔥 Nuevo Lead — ${payload.fuente}</h1>
            <hr style="border:1px solid #eee;" />
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:bold;width:140px;">Nombre:</td><td>${payload.nombre}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Teléfono:</td><td>${payload.telefono || "No proporcionado"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Negocio:</td><td>${payload.nombre_negocio || "No especificado"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Tipo negocio:</td><td>${payload.tipo_negocio || "No especificado"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Ciudad:</td><td>${payload.ciudad || "No especificada"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Fuente:</td><td>${payload.fuente}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Página:</td><td>${payload.pagina || "/"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;">Request ID:</td><td style="font-family:monospace;font-size:12px;">${payload.request_id || "N/A"}</td></tr>
            </table>
            ${payload.mensaje ? `<hr style="border:1px solid #eee;"/><h3 style="color:#333;">Mensaje:</h3><div style="background:#f9f9f9;padding:15px;border-radius:8px;white-space:pre-wrap;">${payload.mensaje}</div>` : ""}
            <hr style="border:1px solid #eee;margin-top:20px;"/>
            <p style="color:#888;font-size:12px;">Fuente: ${payload.fuente} | ${new Date().toISOString()}</p>
          </div>
        `,
      }),
    });
    if (res.ok) {
      console.log("Resend backup email sent");
      return true;
    }
    console.error("Resend failed:", await res.text());
    return false;
  } catch (err) {
    console.error("Resend error:", err);
    return false;
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();

  try {
    const body: LeadPayload = await req.json();
    const effectiveRequestId = body.request_id || requestId;

    if (!body.nombre || !body.email || !body.fuente) {
      return new Response(
        JSON.stringify({
          ok: false,
          request_id: effectiveRequestId,
          stored: false,
          error: "Faltan campos obligatorios (nombre, email, fuente)",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Insert into DB (critical — if this fails, return error)
    const stored = await insertLead({ ...body, request_id: effectiveRequestId });

    if (!stored) {
      return new Response(
        JSON.stringify({
          ok: false,
          request_id: effectiveRequestId,
          stored: false,
          error: "Could not save lead",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. n8n + Resend in parallel (best-effort)
    const [n8nOk, resendOk] = await Promise.all([
      sendToN8N({ ...body, request_id: effectiveRequestId }),
      sendResendBackup({ ...body, request_id: effectiveRequestId }),
    ]);

    console.log(`lead-intake [${effectiveRequestId}]: stored=true, n8n=${n8nOk}, resend=${resendOk}`);

    const warnings: string[] = [];
    if (!n8nOk) warnings.push("n8n forwarding failed");
    if (!resendOk) warnings.push("backup email failed");

    return new Response(
      JSON.stringify({
        ok: true,
        request_id: effectiveRequestId,
        stored: true,
        forwarded_to_n8n: n8nOk,
        backup_email: resendOk,
        ...(warnings.length > 0 ? { warning: `Lead saved but: ${warnings.join(", ")}` } : {}),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("lead-intake error:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        request_id: requestId,
        stored: false,
        error: "Error interno",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
