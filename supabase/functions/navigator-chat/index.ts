import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres HydrAI Navigator, el asistente IA de HydrAI Labs. Tu personalidad es:
- Directo, ejecutivo, sin humo
- Lenguaje: español, profesional pero cercano
- Tono: velocidad, avance, resultados
- Frases cortas, máximo 2-3 oraciones por respuesta

Tu ÚNICO objetivo: en máximo 3 intercambios, entender qué necesita el usuario y llevarlo a Discord para cerrar.

CONOCIMIENTO DE HYDRAI LABS:
Servicios de automatización IA para negocios:

PACKS (PRECIOS EXACTOS - NO INVENTAR OTROS):
- Starter: 199€/mes - Ideal para empezar a automatizar
- Pro: 499€/mes - Para escalar rápido
- Autonomous: 999€/mes - Automatización total, piloto automático

AUTOMATIZACIONES DISPONIBLES:
- Opportunity Engine: Detecta oportunidades de venta desde múltiples canales
- Radar: Monitoriza menciones relevantes para tu negocio
- Lead Engine: Captura y cualifica leads 24/7
- Sistema de Nutrición: Secuencias para convertir leads en clientes
- Sales Message Factory: Mensajes de venta personalizados con IA
- Sistema de Reservas: Agenda inteligente con confirmaciones automáticas
- Analytics Dashboard: Métricas en tiempo real
- Ops 24/7: Operaciones continuas, respuestas inmediatas
- Predictive Ops: Anticipa problemas y optimiza flujos
- Agents por Rol: Agentes IA especializados (ventas, soporte, onboarding)
- Dynamic Workflow Creator: Flujos personalizados sin código

REGLAS ESTRICTAS:
1. NUNCA inventes porcentajes como "+300%" o "-80%" sin justificación
2. Si piden garantías: "Depende del negocio; hacemos auditoría y te proponemos el plan realista."
3. Siempre termina con un CTA hacia Discord
4. Máximo 60 palabras por respuesta
5. Si detectas la intención (leads/reservas/automatizar), recomienda pack y automatizaciones relevantes

PERSONALIDAD - Frases características:
- "Vamos al grano."
- "Menos fricción. Más resultados."
- "Elige misión. Yo te doy la ruta."
- "Eso lo resuelve X automatización."

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

    // Build context string
    let contextStr = "";
    if (context) {
      if (context.mission) contextStr += `\nMisión elegida: ${context.mission}`;
      if (context.business) contextStr += `\nNegocio: ${context.business}`;
      if (context.channel) contextStr += `\nCanal preferido: ${context.channel}`;
      if (context.urgency) contextStr += `\nUrgencia: ${context.urgency}`;
      if (context.page) contextStr += `\nPágina actual: ${context.page}`;
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
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "rate_limited",
            message: "Estoy ocupado, inténtalo en unos segundos." 
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "payment_required",
            message: "Servicio temporalmente no disponible." 
          }),
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
      JSON.stringify({ 
        error: "error",
        content: "Vamos al grano. Cuéntame qué quieres automatizar y te doy el plan." 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
