import { useState, useEffect, useCallback, useRef } from "react";

type TabKey = "email" | "whatsapp" | "instagram";

interface WorkflowNode {
  nombre: string;
  color_fondo: string;
  icono: string;
  items: string;
  tool_badge?: string;
  badge_color?: string;
  detalle: string;
}

interface WorkflowStep {
  titulo: string;
  descripcion: string;
}

interface WorkflowData {
  label: string;
  emoji: string;
  nodes: WorkflowNode[];
  steps: WorkflowStep[];
  totalProcessed: number;
}

const workflows: Record<TabKey, WorkflowData> = {
  email: {
    label: "Email Campaign",
    emoji: "📧",
    totalProcessed: 41,
    nodes: [
      { nombre: "Start", color_fondo: "#1a6b3a", icono: "▶", items: "1 item", detalle: "Trigger manual o programado vía cron. Arranca el pipeline completo de prospección." },
      { nombre: "Contactos1", color_fondo: "#c45200", icono: "{}", items: "41 items", tool_badge: "Apify", badge_color: "bg-orange-500/20 text-orange-400", detalle: "Apify Actor recorre Google Maps y directorios del sector objetivo. Extrae: nombre del negocio, email, teléfono, web, dirección. Resultado: 41 leads cualificados listos para contactar." },
      { nombre: "Preparar Email1", color_fondo: "#c45200", icono: "{}", items: "41 items", detalle: "Nodo de código JavaScript. Personaliza el asunto y cuerpo de cada email con el nombre del negocio, sector detectado y propuesta de valor adaptada. Genera 41 emails únicos." },
      { nombre: "Wait", color_fondo: "#8b5e00", icono: "⏸", items: "41 items", detalle: "Delay configurable entre envíos (ej: 30-90 segundos random). Evita ser marcado como spam. Simula comportamiento humano natural." },
      { nombre: "Enviar con Resend", color_fondo: "#1a4080", icono: "🌐", items: "41 items", tool_badge: "Resend API", badge_color: "bg-blue-500/20 text-blue-400", detalle: "POST a api.resend.com. Envía cada email personalizado desde el dominio verificado. Tracking de apertura y clicks automático. 41/41 enviados con éxito." },
    ],
    steps: [
      { titulo: "🚀 Trigger arranca el pipeline", descripcion: "El workflow inicia manual o en horario programado." },
      { titulo: "🕷️ Apify extrae 41 leads reales", descripcion: "Scraping de Google Maps y directorios: nombre, email, teléfono y sector de negocios locales de tu zona." },
      { titulo: "✍️ IA personaliza cada mensaje", descripcion: "Código JS prepara un email único por lead: nombre del negocio, pain point del sector, CTA directo." },
      { titulo: "⏱️ Anti-spam delay aleatorio", descripcion: "Espera entre 30-90s entre envíos para máxima entregabilidad." },
      { titulo: "📤 Resend entrega a bandeja principal", descripcion: "API de Resend garantiza entrega y proporciona analytics de apertura en tiempo real." },
    ],
  },
  whatsapp: {
    label: "WhatsApp Business",
    emoji: "💬",
    totalProcessed: 38,
    nodes: [
      { nombre: "Start", color_fondo: "#1a6b3a", icono: "▶", items: "1 item", detalle: "Trigger manual o cron. Inicia el pipeline de outreach por WhatsApp Business." },
      { nombre: "Apify Scraper", color_fondo: "#c45200", icono: "{}", items: "38 items", tool_badge: "Apify", badge_color: "bg-orange-500/20 text-orange-400", detalle: "Apify extrae negocios locales con número de teléfono verificado. Filtra solo los que tienen WhatsApp Business activo. Resultado: 38 contactos con número WA válido." },
      { nombre: "Format Message", color_fondo: "#c45200", icono: "{}", items: "38 items", detalle: "Prepara el mensaje de WhatsApp personalizado: saludo con nombre del negocio, propuesta de valor en máx 3 líneas, CTA con link directo. Formato optimizado para WA (sin HTML)." },
      { nombre: "Twilio / WA API", color_fondo: "#c00020", icono: "📱", items: "38 items", tool_badge: "Twilio", badge_color: "bg-red-500/20 text-red-400", detalle: "Envía vía API oficial de WhatsApp Business (Twilio). Mensajes desde número verificado de la empresa. Tasa de apertura >95%. Templates aprobados por Meta." },
      { nombre: "Log → CRM", color_fondo: "#1a4080", icono: "🗃️", items: "38 items", tool_badge: "Supabase", badge_color: "bg-emerald-500/20 text-emerald-400", detalle: "Registra cada envío en Supabase: contacto, timestamp, estado del mensaje. Si hay respuesta, el agente IA toma el control de la conversación automáticamente." },
    ],
    steps: [
      { titulo: "🚀 Pipeline arranca", descripcion: "Trigger manual o programado para iniciar la campaña." },
      { titulo: "🕷️ Apify busca teléfonos WA verificados", descripcion: "Solo extrae números con WhatsApp Business activo: máxima tasa de entrega." },
      { titulo: "✍️ Mensaje personalizado por negocio", descripcion: "3 líneas máximo. Nombre del negocio + dolor del sector + solución concreta." },
      { titulo: "📱 Envío vía API oficial WhatsApp", descripcion: "Twilio entrega el mensaje como número de empresa verificado por Meta." },
      { titulo: "🗃️ CRM registra y IA responde", descripcion: "Supabase guarda todo. Si contestan, el agente IA continúa la conversación 24/7." },
    ],
  },
  instagram: {
    label: "Instagram DM",
    emoji: "📸",
    totalProcessed: 28,
    nodes: [
      { nombre: "Start", color_fondo: "#1a6b3a", icono: "▶", items: "1 item", detalle: "Trigger manual. Inicia el scraping y outreach en Instagram Business." },
      { nombre: "Apify IG Scraper", color_fondo: "#c45200", icono: "{}", items: "52 items", tool_badge: "Apify", badge_color: "bg-orange-500/20 text-orange-400", detalle: "Apify Actor especializado en Instagram. Busca perfiles por hashtag, ubicación o competencia. Extrae: username, followers, bio, email si está público. 52 perfiles target identificados." },
      { nombre: "Filter & Score", color_fondo: "#7b2fa0", icono: "🔍", items: "28 items", detalle: "Filtra y puntúa cada perfil: engagement rate >3%, seguidores en rango 500-50K, bio con palabras clave del sector. De 52 → 28 leads de alta calidad. Calidad > cantidad." },
      { nombre: "Generate DM", color_fondo: "#c45200", icono: "{}", items: "28 items", detalle: "GPT genera un DM personalizado para cada perfil: referencia a su contenido reciente, propuesta de valor específica para su sector, CTA natural (no spam). Máx 150 caracteres." },
      { nombre: "IG Graph API", color_fondo: "#c4006a", icono: "📸", items: "28 items", tool_badge: "Meta API", badge_color: "bg-pink-500/20 text-pink-400", detalle: "Envío vía Instagram Graph API oficial. Solo perfiles que han interactuado con tu cuenta o que han dado permiso de mensajes. Cumple 100% con políticas de Meta. Log en Supabase." },
    ],
    steps: [
      { titulo: "🚀 Trigger inicia el scraping", descripcion: "Pipeline arranca para buscar perfiles IG relevantes." },
      { titulo: "🕷️ Apify mapea 52 perfiles target", descripcion: "Búsqueda por hashtag, ubicación y competencia. Extrae datos públicos del perfil." },
      { titulo: "🔍 IA filtra: 52 → 28 leads premium", descripcion: "Solo profiles con engagement real: elimina cuentas inactivas y bots." },
      { titulo: "✍️ GPT redacta DM personalizado", descripcion: "Mensaje único por perfil referenciando su contenido. Natural, no spam." },
      { titulo: "📸 Meta API entrega el DM", descripcion: "Graph API oficial de Instagram. Cumple políticas. Tracking en Supabase automático." },
    ],
  },
};

const tabs: { key: TabKey; label: string; emoji: string }[] = [
  { key: "email", label: "Email Campaign", emoji: "📧" },
  { key: "whatsapp", label: "WhatsApp Business", emoji: "💬" },
  { key: "instagram", label: "Instagram DM", emoji: "📸" },
];

export default function WorkflowShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("email");
  const [activeNode, setActiveNode] = useState(-1);
  const [animStep, setAnimStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const wf = workflows[activeTab];

  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAnimStep((p) => (p + 1) % 5);
    }, 1800);
  }, []);

  useEffect(() => {
    if (!paused) startCycle();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, startCycle]);

  useEffect(() => {
    setActiveNode(-1);
    setAnimStep(0);
    setPaused(false);
  }, [activeTab]);

  const handleNodeClick = (i: number) => {
    setPaused(true);
    setActiveNode(i);
    setAnimStep(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const currentStep = paused ? activeNode : animStep;
  const detailNode = activeNode >= 0 ? wf.nodes[activeNode] : null;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[hsl(var(--background))]/40 border-t border-b border-[hsl(var(--border))]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[hsl(var(--primary))] mb-3">
            Tecnología Real
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Así funciona{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(190_100%_50%)] bg-clip-text text-transparent">
              por dentro
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Apify extrae los leads. n8n los orquesta. Nosotros los convertimos en clientes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-[hsl(var(--primary))]/20 border-[hsl(var(--primary))]/50 text-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))]/30 text-muted-foreground hover:text-foreground hover:border-[hsl(var(--border))]/60"
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: n8n Canvas */}
          <div>
            <div
              className="rounded-xl border border-[hsl(var(--border))]/20 p-5 sm:p-7 relative overflow-hidden"
              style={{
                backgroundColor: "#1a1a2e",
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* Nodes row */}
              <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
                {wf.nodes.map((node, i) => (
                  <div key={i} className="flex items-center flex-shrink-0">
                    {/* Node */}
                    <button
                      onClick={() => handleNodeClick(i)}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 ${
                          currentStep === i
                            ? "ring-2 ring-[hsl(var(--primary))] shadow-[0_0_16px_rgba(0,212,232,0.4)] scale-110"
                            : "group-hover:scale-105"
                        }`}
                        style={{ backgroundColor: node.color_fondo }}
                      >
                        {node.icono}
                      </div>
                      <span className="text-[10px] sm:text-xs text-white/60 text-center leading-tight max-w-[72px] truncate">
                        {node.nombre}
                      </span>
                      <span className="text-[9px] text-white/30 font-mono">{node.items}</span>
                      {node.tool_badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${node.badge_color}`}>
                          {node.tool_badge}
                        </span>
                      )}
                    </button>

                    {/* Arrow */}
                    {i < wf.nodes.length - 1 && (
                      <div className="relative w-8 sm:w-12 h-[2px] mx-1 sm:mx-2 flex-shrink-0">
                        <div className="absolute inset-0 bg-white/10 rounded-full" />
                        {/* Animated dot */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: currentStep >= i ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)",
                            animation: `travelDot 1.8s linear infinite`,
                            animationDelay: `${i * 0.3}s`,
                            boxShadow: currentStep >= i ? "0 0 6px hsl(var(--primary))" : "none",
                          }}
                        />
                        {/* Arrow tip */}
                        <div
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                          style={{
                            borderTop: "4px solid transparent",
                            borderBottom: "4px solid transparent",
                            borderLeft: `6px solid ${currentStep > i ? "hsl(var(--primary))" : "rgba(255,255,255,0.15)"}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs text-white/40">
                    Ejecutado · <span className="text-emerald-400 font-mono">{wf.totalProcessed}</span> procesados
                  </span>
                </div>
                <span className="text-[10px] text-white/20 font-mono hidden sm:block">hydrai.app.n8n.cloud</span>
              </div>
            </div>

            {/* Detail card */}
            <div className="mt-4 rounded-xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5 p-4 min-h-[80px] transition-all duration-300">
              {detailNode ? (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{detailNode.nombre}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{detailNode.detalle}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  Haz clic en cualquier nodo para ver qué hace.
                </p>
              )}
            </div>
          </div>

          {/* Right: Steps */}
          <div className="flex flex-col gap-2">
            {wf.steps.map((step, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 transition-all duration-400 ${
                  currentStep === i
                    ? "bg-foreground/[0.04] border-l-[3px] border-l-[hsl(var(--primary))] pl-5"
                    : "border-l-[3px] border-l-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-300 ${
                      currentStep === i
                        ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                        : "bg-foreground/5 text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes travelDot {
          0% { left: 0; }
          100% { left: calc(100% - 6px); }
        }
      `}</style>
    </section>
  );
}
