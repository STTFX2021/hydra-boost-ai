import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  website?: string; // honeypot field
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get required secrets
    const DISCORD_WEBHOOK_URL = Deno.env.get("DISCORD_WEBHOOK_URL");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const CONTACT_TO = Deno.env.get("CONTACT_TO") || "hola@hydrailabs.com";
    const CONTACT_FROM = Deno.env.get("CONTACT_FROM") || "HydrAI <onboarding@resend.dev>";

    if (!DISCORD_WEBHOOK_URL) {
      console.error("Missing DISCORD_WEBHOOK_URL secret");
      return new Response(
        JSON.stringify({ ok: false, error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY secret");
      return new Response(
        JSON.stringify({ ok: false, error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: ContactRequest = await req.json();
    const { name, email, phone, message, website } = body;

    // Honeypot check - if filled, reject silently (looks like success to bots)
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered, rejecting submission");
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validations
    if (!name || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ ok: false, error: "Nombre muy corto (mínimo 2 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (name.trim().length > 100) {
      return new Response(
        JSON.stringify({ ok: false, error: "Nombre muy largo (máximo 100 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!email || !validateEmail(email.trim())) {
      return new Response(
        JSON.stringify({ ok: false, error: "Email inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (email.trim().length > 255) {
      return new Response(
        JSON.stringify({ ok: false, error: "Email muy largo (máximo 255 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (phone && phone.trim().length > 50) {
      return new Response(
        JSON.stringify({ ok: false, error: "Teléfono muy largo (máximo 50 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!message || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ ok: false, error: "Mensaje muy corto (mínimo 10 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (message.trim().length > 2000) {
      return new Response(
        JSON.stringify({ ok: false, error: "Mensaje muy largo (máximo 2000 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone?.trim() || "No proporcionado";
    const cleanMessage = message.trim();

    // Truncate message for Discord description if needed (max 2000)
    const discordMessage = cleanMessage.length > 2000 
      ? cleanMessage.substring(0, 1997) + "..." 
      : cleanMessage;

    // Send to Discord
    let discordSuccess = false;
    try {
      const discordPayload = {
        embeds: [{
          title: "📩 Nuevo Contacto",
          description: discordMessage,
          color: 0x7C3AED, // Purple
          fields: [
            { name: "👤 Nombre", value: cleanName, inline: true },
            { name: "📧 Email", value: cleanEmail, inline: true },
            { name: "📞 Teléfono", value: cleanPhone, inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "HydrAI Services - Formulario de Contacto" }
        }]
      };

      const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload),
      });

      discordSuccess = discordRes.ok;
      if (!discordSuccess) {
        console.error("Discord webhook failed:", await discordRes.text());
      } else {
        console.log("Discord notification sent successfully");
      }
    } catch (discordError) {
      console.error("Discord error:", discordError);
    }

    // Send email via Resend
    let emailSuccess = false;
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7C3AED;">📩 Nuevo Contacto</h1>
          <hr style="border: 1px solid #eee;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 120px;">Nombre:</td>
              <td style="padding: 10px 0;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Teléfono:</td>
              <td style="padding: 10px 0;">${cleanPhone}</td>
            </tr>
          </table>
          <hr style="border: 1px solid #eee;" />
          <h3 style="color: #333;">Mensaje:</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${cleanMessage}</div>
          <hr style="border: 1px solid #eee; margin-top: 20px;" />
          <p style="color: #888; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de HydrAI Services.
          </p>
        </div>
      `;

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: [CONTACT_TO],
          reply_to: cleanEmail,
          subject: `Nuevo contacto — ${cleanName}`,
          html: emailHtml,
        }),
      });

      emailSuccess = resendRes.ok;
      if (!emailSuccess) {
        const errorText = await resendRes.text();
        console.error("Resend email failed:", errorText);
      } else {
        console.log("Email sent successfully via Resend");
      }
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // At least one channel should succeed
    if (!discordSuccess && !emailSuccess) {
      return new Response(
        JSON.stringify({ ok: false, error: "Error al enviar notificaciones" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Contact submission processed: Discord=${discordSuccess}, Email=${emailSuccess}`);

    return new Response(
      JSON.stringify({ ok: true, discord: discordSuccess, email: emailSuccess }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("contact-submit error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
