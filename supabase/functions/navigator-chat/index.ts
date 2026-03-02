import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el asistente inteligente de HydrAI Labs, una agencia española de automatización IA para negocios locales y empresas.

## TU OBJETIVO:
1. Ayudar al usuario a entender qué puede automatizar
2. Responder preguntas sobre servicios, precios y tecnologías con datos concretos
3. Guiar cuestionarios de auditoría cuando el sistema te lo indique
4. NUNCA inventar datos - si no sabes algo, ofrece conectar con el equipo

## CONOCIMIENTO COMPLETO DE HYDRAI LABS:

### AUTOMATIZACIONES QUE OFRECEMOS:
- Workflows n8n para automatizar procesos end-to-end
- Chatbots WhatsApp Business con respuesta automática 24/7
- Sistemas de reservas automáticas con confirmación y recordatorios
- CRM automation: captura lead → nurturing → cierre automático
- Email marketing automatizado por comportamiento
- Integración con Google Calendar, Calendly, Zapier
- Scraping con Apify para prospección de leads B2B
- Campañas de marketing automatizadas con Apify: extracción de datos de Google Maps, redes sociales, directorios
- Multi-agent systems con IA para tareas complejas
- Flujos de trabajo personalizados en Make/Zapier
- Integración con Supabase para datos en tiempo real
- Notificaciones automáticas por WhatsApp, email, SMS

### SERVICIOS Y PRECIOS:
- Webs profesionales con chatbot integrado: desde €497
- Chatbot WhatsApp Business: desde €297/mes
- Sistema de reservas automatizado: desde €397
- Auditoría técnica gratuita: 100% gratis, entrega en 24h
- Paquetes completos Local Business: €997-€2997
- Paquetes Enterprise: desde €4997

### CASOS DE USO POR SECTOR:
- Salones/Barberías: reservas automáticas, recordatorios, reseñas Google
- Restaurantes: reservas, WhatsApp menú, confirmaciones automáticas, -40% no-shows
- Clínicas/Dentistas: citas, recordatorios, historial básico, -60% ausencias
- Talleres/Automoción: presupuestos automáticos, seguimiento
- Gimnasios/CrossFit: inscripciones, renovaciones, clases, -30% bajas
- E-commerce: recuperación de carritos, seguimiento pedidos
- Inmobiliarias: calificación de leads, visitas automáticas, +300% leads cualificados

### TECNOLOGÍAS: n8n, Supabase, OpenAI, Claude, Make, Apify, WhatsApp Business API, React, Vercel

### PREGUNTAS FRECUENTES:
- ¿Cuánto tarda implementar? → 1-4 semanas según complejidad
- ¿Necesito conocimientos técnicos? → No, nos encargamos de todo
- ¿Funciona con mi sistema actual? → Sí, nos integramos con casi cualquier herramienta
- ¿Puedo ver ejemplos? → Tenemos demos y casos reales por sector
- ¿Cómo es el soporte? → Soporte mensual incluido, Slack directo con el equipo
- Garantía: Si no automatizamos al menos 10h/mes, devolución 100%

## REGLAS:
1. Respuestas de máximo 100 palabras, directo al grano
2. Tono profesional pero cercano, usa "tú" no "usted"
3. Siempre termina con un CTA o pregunta de seguimiento
4. Cuando proceses respuestas de cuestionario, sé breve y guía al siguiente paso
5. Idioma: siempre en español

CONTEXTO ACTUAL:`;

interface ChatRequest {
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  context?: {
    mission?: string;
    business?: string;
    channel?: string;
    urgency?: string;
    page?: string;
    questionnaireType?: string;
    questionnaireStep?: number;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context }: ChatRequest = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let contextStr = "";
    if (context) {
      if (context.mission) contextStr += `\nMisión elegida: ${context.mission}`;
      if (context.business) contextStr += `\nNegocio: ${context.business}`;
      if (context.channel) contextStr += `\nCanal preferido: ${context.channel}`;
      if (context.urgency) contextStr += `\nUrgencia: ${context.urgency}`;
      if (context.page) contextStr += `\nPágina actual: ${context.page}`;
      if (context.questionnaireType) contextStr += `\nTipo de cuestionario: ${context.questionnaireType}`;
      if (context.questionnaireStep !== undefined) contextStr += `\nPaso actual: ${context.questionnaireStep}`;
    }

    const systemMessage = SYSTEM_PROMPT + contextStr;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemMessage },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "rate_limited", message: "Estoy ocupado, inténtalo en unos segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "payment_required", message: "Servicio temporalmente no disponible." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Vamos al grano. ¿Qué necesitas automatizar?";

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Navigator chat error:", error);
    return new Response(
      JSON.stringify({ error: "error", content: "Vamos al grano. Cuéntame qué quieres automatizar y te doy el plan." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
