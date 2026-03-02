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
      { nombre: "Start", color_fondo: "#1a6b3a", icono: "▶", items: "1 item", detalle: "El proceso arranca aquí. Puede iniciarse manualmente con un clic o programarse para ejecutarse solo cada día o cada semana." },
      { nombre: "Contactos", color_fondo: "#c45200", icono: "{}", items: "41 items", tool_badge: "Apify", badge_color: "bg-orange-500/20 text-orange-400", detalle: "Apify es una herramienta que recorre Google Maps y directorios de empresas automáticamente. Extrae el nombre, email, teléfono y web de 41 negocios locales del sector que tú elijas, en la zona que tú elijas." },
      { nombre: "Preparar Email", color_fondo: "#c45200", icono: "{}", items: "41 items", detalle: "Un código JavaScript toma los datos de cada negocio y escribe un email personalizado: con el nombre real del negocio, adaptado a su sector, con una propuesta concreta. Se generan 41 emails diferentes, ninguno igual." },
      { nombre: "Espera", color_fondo: "#8b5e00", icono: "⏸", items: "41 items", detalle: "Entre cada envío el sistema espera entre 30 y 90 segundos de forma aleatoria. Esto imita el comportamiento humano y evita que los emails lleguen a la carpeta de spam." },
      { nombre: "Enviar Email", color_fondo: "#1a4080", icono: "🌐", items: "41 items", tool_badge: "Resend API", badge_color: "bg-blue-500/20 text-blue-400", detalle: "Resend es el servicio que manda los emails desde el dominio verificado de la empresa. Garantiza que llegan a la bandeja principal, no a spam. Registra quién abre el email y quién hace clic." },
    ],
    steps: [
      { titulo: "🚀 El proceso arranca", descripcion: "Se inicia solo o con un clic. Todo lo demás es automático." },
      { titulo: "🕷️ Apify busca 41 empresas reales", descripcion: "Recorre Google Maps y extrae nombre, email y teléfono de negocios locales del sector que tú elijas." },
      { titulo: "✍️ Se escribe un email para cada empresa", descripcion: "Cada email menciona el nombre real del negocio y está adaptado a su sector. Cero emails genéricos." },
      { titulo: "⏱️ El sistema espera entre envíos", descripcion: "Espera aleatoria de 30 a 90 segundos. Evita spam y protege el dominio." },
      { titulo: "📤 Los emails llegan a bandeja principal", descripcion: "Resend garantiza la entrega. Puedes ver quién abrió y quién hizo clic." },
    ],
  },
  whatsapp: {
    label: "WhatsApp",
    emoji: "💬",
    totalProcessed: 38,
    nodes: [
      { nombre: "Start", color_fondo: "#1a6b3a", icono: "▶", items: "1 item", detalle: "El proceso arranca. El sistema va a buscar negocios locales que tengan WhatsApp Business activo para contactarles directamente." },
      { nombre: "Buscar Contactos", color_fondo: "#c45200", icono: "{}", items: "38 items", tool_badge: "Apify", badge_color: "bg-orange-500/20 text-orange-400", detalle: "Apify busca negocios locales en Google Maps y directorios. Filtra solo los que tienen WhatsApp Business activado y un número de teléfono válido. Resultado: 38 contactos listos para recibir el mensaje." },
      { nombre: "Preparar Mensaje", color_fondo: "#c45200", icono: "{}", items: "38 items", detalle: "Se prepara un mensaje de WhatsApp para cada negocio: saludo con el nombre real, propuesta en máximo 3 líneas y un enlace directo para responder. Sin HTML, con emojis naturales, como si lo escribiera una persona." },
      { nombre: "Enviar por WhatsApp", color_fondo: "#c00020", icono: "📱", items: "38 items", tool_badge: "Twilio", badge_color: "bg-red-500/20 text-red-400", detalle: "Twilio envía el mensaje por la API oficial de WhatsApp Business. El mensaje llega desde el número de empresa verificado por Meta. Más del 95% de los mensajes de WhatsApp se abren, frente al 20% del email." },
      { nombre: "Guardar en Base de Datos", color_fondo: "#1a4080", icono: "🗃️", items: "38 items", tool_badge: "Supabase", badge_color: "bg-emerald-500/20 text-emerald-400", detalle: "Cada envío se guarda en la base de datos con el estado del mensaje. Si el negocio responde, el agente de inteligencia artificial de HydrAI toma el control de la conversación de forma automática y la continúa 24 horas al día." },
    ],
    steps: [
      { titulo: "🚀 El proceso arranca", descripcion: "Se inicia la búsqueda de negocios con WhatsApp Business activo." },
      { titulo: "🕷️ Apify localiza 38 números verificados", descripcion: "Solo negocios con WhatsApp Business operativo. Cero números inválidos." },
      { titulo: "✍️ Mensaje personalizado en 3 líneas", descripcion: "Nombre del negocio, problema concreto del sector y solución. Natural, no spam." },
      { titulo: "📱 WhatsApp entrega el mensaje", descripcion: "Número de empresa verificado por Meta. Tasa de apertura superior al 95%." },
      { titulo: "🗃️ La IA continúa la conversación", descripcion: "Si responden, el agente de HydrAI gestiona la conversación y agenda la reunión automáticamente." },
    ],
  },
  instagram: {
    label: "Instagram DM",
    emoji: "📸",
    totalProcessed: 28,
    nodes: [
      { nombre: "Start", color_fondo: "#1a6b3a", icono: "▶", items: "1 item", detalle: "El proceso arranca. El sistema va a buscar perfiles de Instagram del sector objetivo para enviarles un mensaje directo personalizado." },
      { nombre: "Buscar Perfiles", color_fondo: "#c45200", icono: "{}", items: "52 items", tool_badge: "Apify", badge_color: "bg-orange-500/20 text-orange-400", detalle: "Apify busca perfiles de Instagram por hashtags, ubicación geográfica o seguidores de la competencia. Extrae el nombre de usuario, número de seguidores, nivel de interacción y el email si está visible en la bio. Se encuentran 52 perfiles del sector." },
      { nombre: "Filtrar Perfiles", color_fondo: "#7b2fa0", icono: "🔍", items: "28 items", detalle: "La inteligencia artificial analiza cada perfil y descarta los que no interesan: cuentas con menos del 3% de interacción, bots, cuentas inactivas o fuera del rango de seguidores. De 52 perfiles quedan 28 de alta calidad." },
      { nombre: "Escribir Mensaje", color_fondo: "#c45200", icono: "{}", items: "28 items", detalle: "La inteligencia artificial escribe un mensaje directo único para cada perfil. Menciona algo específico de su contenido o sector, propone una solución concreta y termina con una pregunta natural. Máximo 150 caracteres. Cero mensajes copiados." },
      { nombre: "Enviar por Instagram", color_fondo: "#c4006a", icono: "📸", items: "28 items", tool_badge: "Meta API", badge_color: "bg-pink-500/20 text-pink-400", detalle: "El mensaje se envía por la API oficial de Instagram de Meta. Solo a perfiles que permiten mensajes de empresas. Cumple todas las normas de Meta. Cada envío queda registrado automáticamente en la base de datos." },
    ],
    steps: [
      { titulo: "🚀 El proceso arranca", descripcion: "Se inicia la búsqueda de perfiles de Instagram relevantes para el sector." },
      { titulo: "🕷️ Apify encuentra 52 perfiles", descripcion: "Búsqueda por hashtag y zona. Extrae seguidores, interacción y email público de cada perfil." },
      { titulo: "🔍 La IA filtra: 52 quedan en 28", descripcion: "Solo perfiles reales y activos con interacción genuina. Se eliminan bots e inactivos." },
      { titulo: "✍️ La IA escribe un mensaje único", descripcion: "Personalizado para cada perfil, referenciando su contenido real. Máximo 150 caracteres." },
      { titulo: "📸 Instagram entrega el mensaje", descripcion: "API oficial de Meta. Cumple todas las normas. Registro automático en base de datos." },
    ],
  },
};

const tabs: { key: TabKey; label: string; emoji: string }[] = [
  { key: "email", label: "Email Campaign", emoji: "📧" },
  { key: "whatsapp", label: "WhatsApp", emoji: "💬" },
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

  const handleStepClick = (i: number) => {
    setPaused(true);
    setActiveNode(i);
    setAnimStep(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const currentStep = paused ? activeNode : animStep;
  const detailNode = activeNode >= 0 ? wf.nodes[activeNode] : null;

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap" role="tablist" aria-label="Tipo de campaña">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-controls={`panel-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))]/30 text-muted-foreground hover:text-foreground hover:border-[hsl(var(--border))]/60"
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div id={`panel-${activeTab}`} role="tabpanel" className="grid lg:grid-cols-2 gap-8 items-start">
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
                    <button
                      onClick={() => handleNodeClick(i)}
                      aria-label={`Ver detalle del nodo: ${node.nombre}`}
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
                      <span className="text-[9px] text-white/40 font-mono">{node.items}</span>
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
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: currentStep >= i ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)",
                            animation: `travelDot 1.8s linear infinite`,
                            animationDelay: `${i * 0.3}s`,
                            boxShadow: currentStep >= i ? "0 0 6px hsl(var(--primary))" : "none",
                          }}
                        />
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
                  💡 Haz clic en cualquier nodo para ver qué hace en detalle.
                </p>
              )}
            </div>
          </div>

          {/* Right: Steps */}
          <div className="flex flex-col gap-2">
            {wf.steps.map((step, i) => (
              <button
                key={i}
                onClick={() => handleStepClick(i)}
                aria-label={`Paso ${i + 1}: ${step.titulo}`}
                className={`rounded-xl p-4 transition-all duration-400 text-left ${
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
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes travelDot {
          0% { left: 0; }
          100% { left: calc(100% - 6px); }
        }
      `}</style>
    </div>
  );
}
