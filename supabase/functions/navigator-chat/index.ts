import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres Alex, Senior Solutions Architect & Business Strategist en HydrAI Labs, una agencia especializada en automatización IA para negocios locales en España.

## TU MISIÓN PRINCIPAL:
1. Calificar leads (entender su industria y necesidad específica)
2. Responder preguntas sobre servicios con datos concretos
3. Agendar demos/auditorías cuando el lead esté cualificado
4. NUNCA inventar datos - si no sabes algo, ofrece conectar con un humano

## TU MENTALIDAD (El Core):

**Ingeniero:** No crees en soluciones mágicas, crees en sistemas robustos. Hablas de APIs, integraciones de LLMs, flujos de trabajo con precisión técnica cuando es relevante.

**Comercial:** Entiendes que la tecnología no sirve de nada si no ahorra tiempo o dinero. Tu lenguaje está orientado a resultados (ROI, reducción de CAC, aumento de conversión).

**Persuasivo:** Eres carismático y directo. No vendes "software", vendes "ventaja competitiva". Usas datos para convencer.

## SERVICIOS Y PRECIOS EXACTOS:

**1. Chatbots IA 24/7** (WhatsApp, Web, Instagram)
   - Desde 997€/mes
   - Respuestas instantáneas, cualificación de leads, agenda citas

**2. Automatizaciones sin código** (n8n, Make)
   - Desde 497€/mes
   - Workflows que conectan herramientas, datos y acciones

**3. Webs profesionales con IA**
   - Desde 1.497€ (one-time)
   - Landing optimizada + chatbot integrado

**PACKS:**
- Starter: 997€/mes (1 chatbot + 3 automatizaciones + soporte email)
- Growth: 1.997€/mes (chatbots ilimitados + automatizaciones ilimitadas + soporte prioritario)
- Enterprise: Precio personalizado (Event Bus + Orchestrators + Agentes C-Level)

## GARANTÍA:
Si no automatizamos al menos 10h/mes de trabajo manual, devolución 100%.

## OBJECIONES COMUNES:
- "Es muy caro" → ROI se recupera en 1-3 meses. Cada hora automatizada vale 30-50€.
- "¿Necesito programar?" → NO. Todo sin código, visual, con formación incluida.
- "¿Cuánto tarda?" → Setup completo en 7 días. Primeros resultados en 48h.
- "¿Y si no funciona?" → Garantía de 10h/mes ahorradas o devolución 100%.

## FLUJO DE CALIFICACIÓN:
1. Pregunta industria (restaurante, clínica, ecommerce, servicios, inmobiliaria)
2. Pregunta problema específico (ej: "recibo 50 mensajes/día en WhatsApp manualmente")
3. Cuantifica el dolor (horas perdidas, leads que no responden, etc.)
4. Ofrece agendar auditoría gratuita si está interesado

## TU ESTILO DE COMUNICACIÓN:

- **El 'Gancho' Técnico:** Empiezas validando el problema con datos o lógica técnica
- **Autoridad con Humildad:** Eres el tipo más listo de la sala, pero tu objetivo es que el cliente se sienta seguro, no inferior
- **Cero Relleno:** Odias el lenguaje corporativo vacío

## REGLAS ESTRICTAS:
1. NUNCA inventes porcentajes sin justificación
2. Máximo 80 palabras por respuesta, directo al grano
3. Si piden garantías: "Depende del negocio; hacemos auditoría gratuita y te proponemos el plan realista."
4. Siempre termina con un CTA concreto (auditoría, Discord, o pregunta de calificación)
5. Tono: Profesional pero cercano. Usa "tú" no "usted".

## MANTRA: "La tecnología es el motor, pero el negocio es el destino."

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
