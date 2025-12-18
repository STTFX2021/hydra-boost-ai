import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'lead' | 'contact' | 'assessment';
  data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    vertical?: string;
    score?: number;
    priority?: string;
    recommendations?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const discordWebhook = Deno.env.get("DISCORD_WEBHOOK_URL");

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { type, data }: NotificationRequest = await req.json();
    
    console.log(`Processing ${type} notification for ${data.email}`);

    const results = {
      email: { success: false, error: null as string | null },
      discord: { success: false, error: null as string | null },
    };

    // Send email via Resend if configured
    if (resendApiKey && resendApiKey.length > 10) {
      try {
        const emailSubject = type === 'assessment' 
          ? `🎯 Nueva Auditoría: ${data.name} (Score: ${data.score})`
          : type === 'contact'
          ? `📧 Nuevo Contacto: ${data.name}`
          : `🚀 Nuevo Lead: ${data.name}`;

        const emailBody = `
          <h2>Nuevo ${type === 'assessment' ? 'Auditoría' : type === 'contact' ? 'Contacto' : 'Lead'}</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ''}
          ${data.vertical ? `<p><strong>Vertical:</strong> ${data.vertical}</p>` : ''}
          ${data.score !== undefined ? `<p><strong>Score:</strong> ${data.score}</p>` : ''}
          ${data.priority ? `<p><strong>Prioridad:</strong> ${data.priority}</p>` : ''}
          ${data.message ? `<p><strong>Mensaje:</strong> ${data.message}</p>` : ''}
          ${data.recommendations ? `<h3>Recomendaciones:</h3><pre>${data.recommendations}</pre>` : ''}
          <hr>
          <p style="color: #666; font-size: 12px;">HydrAI Labs - Panel Admin</p>
        `;

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "HydrAI Labs <onboarding@resend.dev>",
            to: ["admin@hydrailabs.com"], // This should be configured or use owner email
            subject: emailSubject,
            html: emailBody,
          }),
        });

        if (resendResponse.ok) {
          results.email.success = true;
          console.log("Email sent successfully");
        } else {
          const errorText = await resendResponse.text();
          results.email.error = errorText;
          console.error("Resend error:", errorText);
        }
      } catch (emailError: any) {
        results.email.error = emailError.message;
        console.error("Email error:", emailError);
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email");
    }

    // Send Discord webhook if configured
    if (discordWebhook && discordWebhook.startsWith('https://discord')) {
      try {
        const discordEmbed = {
          title: type === 'assessment' 
            ? `🎯 Nueva Auditoría` 
            : type === 'contact' 
            ? `📧 Nuevo Contacto` 
            : `🚀 Nuevo Lead`,
          color: type === 'assessment' ? 0x8B5CF6 : type === 'contact' ? 0x06B6D4 : 0x22C55E,
          fields: [
            { name: "Nombre", value: data.name, inline: true },
            { name: "Email", value: data.email, inline: true },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "HydrAI Labs" },
        };

        if (data.phone) {
          discordEmbed.fields.push({ name: "Teléfono", value: data.phone, inline: true });
        }
        if (data.vertical) {
          discordEmbed.fields.push({ name: "Vertical", value: data.vertical, inline: true });
        }
        if (data.score !== undefined) {
          discordEmbed.fields.push({ name: "Score", value: String(data.score), inline: true });
        }
        if (data.priority) {
          discordEmbed.fields.push({ name: "Prioridad", value: data.priority, inline: true });
        }

        const discordResponse = await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ embeds: [discordEmbed] }),
        });

        if (discordResponse.ok || discordResponse.status === 204) {
          results.discord.success = true;
          console.log("Discord notification sent successfully");
        } else {
          const errorText = await discordResponse.text();
          results.discord.error = errorText;
          console.error("Discord error:", errorText);
        }
      } catch (discordError: any) {
        results.discord.error = discordError.message;
        console.error("Discord error:", discordError);
      }
    } else {
      console.log("DISCORD_WEBHOOK_URL not configured, skipping Discord");
    }

    // Log to event_logs table
    const logStatus = (results.email.success || results.discord.success) ? 'success' : 'partial';
    const errorMessage = [
      results.email.error ? `Email: ${results.email.error}` : null,
      results.discord.error ? `Discord: ${results.discord.error}` : null,
    ].filter(Boolean).join('; ') || null;

    await supabase.from('event_logs').insert({
      event_type: `notification_${type}`,
      status: logStatus,
      payload: { 
        name: data.name, 
        email: data.email, 
        type,
        results 
      },
      error_message: errorMessage,
    });

    console.log("Notification processing complete:", results);

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-lead-notification:", error);
    
    // Log error
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.from('event_logs').insert({
      event_type: 'notification_error',
      status: 'error',
      error_message: error.message,
    });

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
