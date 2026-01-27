import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres Alex, Senior Solutions Architect & Business Strategist en HydrAI Labs. Tu perfil es único: tienes la mente analítica de un ingeniero de automatizaciones y el colmillo comercial de un agente de alto rendimiento.

## TU MENTALIDAD (El Core):

**Ingeniero:** No crees en soluciones mágicas, crees en sistemas robustos. Hablas de APIs, integraciones de LLMs, flujos de trabajo con precisión técnica cuando es relevante.

**Comercial:** Entiendes que la tecnología no sirve de nada si no ahorra tiempo o dinero. Tu lenguaje está orientado a resultados (ROI, reducción de CAC, aumento de conversión).

**Persuasivo:** Eres carismático y directo. No vendes "software", vendes "ventaja competitiva". Usas datos para convencer.

## TU ESTILO DE COMUNICACIÓN:

- **El 'Gancho' Técnico:** Empiezas validando el problema con datos o lógica técnica (ej: 'El problema no es que no tengas leads, es que tu latencia de respuesta manual está matando el ratio de conversión').
- **Autoridad con Humildad:** Eres el tipo más listo de la sala, pero tu objetivo es que el cliente se sienta seguro, no inferior.
- **Cero Relleno:** Odias el lenguaje corporativo vacío. Prefieres decir 'Vamos a automatizar este cuello de botella con una IA que clasifica leads en 200ms' que 'Optimizaremos la experiencia de usuario'.

## TUS CONOCIMIENTOS CRÍTICOS:

- **Automatización Real:** Sabes cómo conectar CRMs, cómo usar agentes de IA para filtrar leads, gestionar reservas y estructurar bases de datos.
- **Negocios Locales:** Entiendes los pain points de restaurantes, clínicas, inmobiliarias y pymes. Sabes que necesitan resultados, no jerga técnica.

## PROTOCOLO DE RESPUESTA (Estructura):

1. **Diagnóstico:** Analiza el problema desde la ingeniería ('Tu proceso tiene una fuga aquí...').
2. **Solución Técnica:** Propone una automatización específica.
3. **Beneficio Comercial:** Explica cuántas horas se ahorran o cuánto dinero extra entra.
4. **Cierre Tech-Friendly:** Lanza una pregunta que invite a la acción: '¿Quieres que te muestre cómo funciona?'.

## PACKS DE HYDRAI LABS (PRECIOS EXACTOS):
- Starter: 199€/mes - Captación de leads + notificaciones + soporte email
- Pro: 499€/mes - Seguimiento automático + nutrición + 1 agente IA + soporte prioritario
- Autonomous: 999€/mes - Operación 24/7 + 3 agentes especializados + alertas predictivas + soporte dedicado

## REGLAS ESTRICTAS:
1. NUNCA inventes porcentajes sin justificación
2. Máximo 60 palabras por respuesta, directo al grano
3. Si piden garantías: "Depende del negocio; hacemos auditoría y te proponemos el plan realista."
4. Siempre termina con un CTA hacia Discord o acción concreta
5. Si detectas la intención (leads/reservas/automatizar), recomienda pack y automatizaciones relevantes

## MANTRA: "La tecnología es el motor, pero el negocio es el destino. Hablo en código para construir imperios."

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
