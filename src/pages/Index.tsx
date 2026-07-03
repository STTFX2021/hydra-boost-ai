import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  Code2,
  Gauge,
  Headphones,
  Layers3,
  MessageSquareMore,
  Network,
  PhoneCall,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, SEOHead } from "@/components/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ---------- data ---------- */

const benefits = [
  { icon: Workflow, title: "Más eficiencia", text: "Procesos automatizados" },
  { icon: UsersRound, title: "Más clientes", text: "Captura y atención 24/7" },
  { icon: Gauge, title: "Más ventas", text: "Menos pérdidas, más resultados" },
  { icon: Layers3, title: "Más control", text: "Datos y decisiones en tiempo real" },
];

const kpis = [
  { value: "+120", label: "negocios automatizados" },
  { value: "15h", label: "ahorradas cada semana" },
  { value: "7 días", label: "de puesta en marcha" },
  { value: "4.9/5", label: "satisfacción cliente" },
];

const trustLogos = ["WhatsApp", "Twilio", "HubSpot", "Google Calendar", "Ringover", "Zapier", "Stripe", "Make", "Meta", "OpenAI"];

const sentraLeft: Array<[typeof Workflow, string, string]> = [
  [Workflow, "Automatización", "Flujos inteligentes que optimizan procesos."],
  [Network, "Integraciones", "Conecta todas tus herramientas."],
  [BrainCircuit, "Datos e IA", "Información unificada para mejores decisiones."],
];

const sentraRight: Array<[typeof Workflow, string, string]> = [
  [MessageSquareMore, "Conversaciones", "Gestión avanzada de todos los canales."],
  [Rocket, "Orquestación", "Coordina agentes, sistemas y acciones."],
  [ShieldCheck, "Seguridad", "Infraestructura robusta y privacidad garantizada."],
];

const vozraFeatures: Array<[typeof Workflow, string, string]> = [
  [PhoneCall, "Atención 24/7", "Nunca más pierdas una llamada."],
  [CalendarCheck2, "Pedidos y reservas", "Toma y gestiona pedidos y reservas."],
  [MessageSquareMore, "Respuestas inteligentes", "Entiende, responde y resuelve."],
  [CheckCircle2, "Sin errores", "Información clara y enviada al momento."],
];

const vozraMetrics = [
  { value: "<2s", label: "tiempo de respuesta" },
  { value: "+40%", label: "más reservas" },
  { value: "0", label: "llamadas perdidas" },
];

type Service = {
  icon: typeof Workflow;
  title: string;
  text: string;
  price: string;
  time: string;
  result: string;
};

const services: Service[] = [
  { icon: Sparkles, title: "Creación Web", text: "Webs modernas, rápidas y optimizadas para convertir visitantes en clientes.", price: "desde 890€", time: "5-10 días", result: "+35% conversiones" },
  { icon: Code2, title: "Desarrollo Web", text: "Aplicaciones y plataformas web a medida, escalables y seguras.", price: "a medida", time: "2-6 semanas", result: "100% escalable" },
  { icon: Bot, title: "Chatbots & IA", text: "Asistentes inteligentes que atienden, califican y convierten 24/7.", price: "desde 690€", time: "7 días", result: "+60% leads calificados" },
  { icon: Zap, title: "Automatización", text: "Procesos repetitivos automatizados para ahorrar tiempo y dinero.", price: "desde 490€", time: "7-14 días", result: "-15h / semana" },
];

const cases = [
  { sector: "Restaurante", metric: "+62%", metricLabel: "reservas por WhatsApp", quote: "En un mes, Vozra gestionó más reservas que dos camareros juntos.", author: "Carlos R.", role: "Marbella" },
  { sector: "Clínica estética", metric: "-80%", metricLabel: "no-shows en citas", quote: "Los recordatorios automáticos nos devolvieron horas de agenda cada día.", author: "Ana M.", role: "Málaga" },
  { sector: "Inmobiliaria", metric: "3.4x", metricLabel: "leads cualificados/mes", quote: "El chatbot filtra antes de que llegue a nosotros. Cerramos más rápido.", author: "David L.", role: "Costa del Sol" },
];

const processSteps: Array<[typeof Workflow, string, string, string]> = [
  [Headphones, "Escuchamos", "Entendemos tu negocio y tus objetivos.", "Día 1"],
  [Sparkles, "Diseñamos", "Creamos la solución perfecta para ti.", "Día 2-3"],
  [Code2, "Desarrollamos", "Construimos, integramos y probamos.", "Día 4-6"],
  [Rocket, "Implementamos", "Puesta en marcha y acompañamiento.", "Día 7"],
  [Gauge, "Optimizamos", "Medimos, mejoramos y escalamos contigo.", "Continuo"],
];

const faqs = [
  { q: "¿Cuánto tarda la puesta en marcha?", a: "La mayoría de proyectos están en producción en 7 días. Desarrollos a medida requieren de 2 a 6 semanas según alcance." },
  { q: "¿Tengo permanencia o contrato mínimo?", a: "No. Trabajamos sin permanencia. Puedes pausar o cancelar cuando quieras." },
  { q: "¿Cuánto cuesta empezar?", a: "Desde 490€ el primer proyecto. La auditoría inicial de 30 minutos es totalmente gratuita y sin compromiso." },
  { q: "¿Con qué herramientas os integráis?", a: "WhatsApp, Twilio, HubSpot, Google Calendar, Ringover, Zapier, Make, Stripe, Meta, OpenAI y prácticamente cualquier API abierta." },
  { q: "¿Los datos son míos?", a: "Sí. Toda la información generada, conversaciones y modelos entrenados quedan bajo tu propiedad. Cumplimos con RGPD." },
  { q: "¿Ofrecéis soporte después del lanzamiento?", a: "Sí. Todos los planes incluyen soporte técnico, mejoras continuas y monitorización proactiva." },
];

/* ---------- helpers ---------- */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

/* ---------- page ---------- */

const Index = () => (
  <>
    <SEOHead
      title="HydrAI Labs | Inteligencia conversacional y desarrollo a medida"
      description="Automatiza tu negocio con IA en 7 días. Chatbots, agentes de voz y desarrollo a medida por profesionales, para profesionales."
      canonical="/"
    />
    <OrganizationSchema />
    <LocalBusinessSchema />
    <WebSiteSchema />

    <div className="min-h-screen overflow-hidden bg-black text-white">
      <Header />
      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-[154px] md:pb-28 md:pt-[168px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(0,213,255,0.18),transparent_38%),radial-gradient(circle_at_12%_20%,rgba(0,116,255,0.10),transparent_32%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          <div className="section-container relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUp}>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/[0.06] px-4 py-1.5 text-xs font-medium text-cyan-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                </span>
                +120 negocios automatizados
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-cyan-300 text-cyan-300" />4.9/5</span>
              </div>

              <h1 className="max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
                Automatiza tu negocio con{" "}
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                  IA
                </span>
                <span className="block">en 7 días, 24/7.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
                Herramientas diseñadas a medida por profesionales para profesionales. Chatbots, agentes de voz y
                desarrollo que impulsan negocios reales.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/auditoria-gratis"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 text-sm font-semibold text-black shadow-[0_0_0_0_rgba(34,211,238,0)] transition hover:bg-cyan-300 hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.55)]"
                >
                  Auditoría gratis en 7 días
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-white/5"
                >
                  <PlayCircle className="h-4 w-4" />
                  Ver demo en 60s
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto h-[520px] w-full max-w-[560px]"
            >
              {/* orb backdrop */}
              <div className="absolute inset-6 rounded-[42%_58%_48%_52%/55%_42%_58%_45%] bg-[radial-gradient(circle_at_55%_45%,rgba(23,90,120,0.55),rgba(4,10,16,0.9)_60%,transparent_75%)]" />
              <div className="absolute inset-[18%] rounded-full border border-cyan-300/10" />
              <div className="absolute inset-[30%] rounded-full border border-cyan-300/20" />

              {/* animated wave */}
              <div className="absolute left-8 top-1/2 flex h-10 w-[70%] -translate-y-1/2 items-center gap-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-cyan-300/80"
                    style={{
                      height: `${20 + Math.abs(Math.sin(i * 0.7)) * 60}%`,
                      animation: `pulse-glow ${1.6 + (i % 4) * 0.2}s ease-in-out ${i * 0.05}s infinite`,
                    }}
                  />
                ))}
              </div>

              {/* Vozra live card */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="absolute right-2 top-6 w-[240px] rounded-2xl border border-cyan-300/50 bg-black/80 p-5 shadow-[0_0_50px_-10px_rgba(34,211,238,0.35)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/15">
                    <Bot className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-cyan-300">Vozra</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      En llamada · 00:42
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">"Perfecto, Laura. Reserva para 4 personas confirmada."</p>
              </motion.div>

              {/* Reserva confirmada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="absolute bottom-8 right-0 w-[250px] rounded-2xl border border-white/15 bg-zinc-950/90 p-5 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-semibold">Reserva confirmada</span>
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-y-2.5 text-xs">
                  <span className="text-zinc-500">Nombre</span><span>Laura Martínez</span>
                  <span className="text-zinc-500">Fecha</span><span>24/05/2025</span>
                  <span className="text-zinc-500">Hora</span><span>21:00</span>
                  <span className="text-zinc-500">Personas</span><span>4</span>
                </div>
              </motion.div>

              {/* Métrica flotante */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="absolute bottom-24 left-0 flex items-center gap-3 rounded-xl border border-white/15 bg-zinc-950/90 px-4 py-3 shadow-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold leading-none">+62%</div>
                  <div className="mt-1 text-[11px] text-zinc-500">reservas este mes</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============ KPI STRIP ============ */}
        <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 to-black py-10">
          <div className="section-container grid grid-cols-2 gap-6 md:grid-cols-4">
            {kpis.map((k) => (
              <motion.div {...fadeUp} key={k.label} className="text-center">
                <div className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
                  {k.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">{k.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ TRUST LOGOS MARQUEE ============ */}
        <section className="border-b border-white/10 bg-zinc-950/60 py-8">
          <p className="text-center text-xs uppercase tracking-[0.28em] text-zinc-500">
            Conectamos con las herramientas que ya usas
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-14 pr-14">
              {[...trustLogos, ...trustLogos].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap text-lg font-medium text-zinc-500 transition hover:text-cyan-300"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SENTRA ============ */}
        <section id="sentra" className="section-container py-24">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-4xl font-semibold tracking-[0.1em] md:text-5xl">SENTRA</h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              El centro neurálgico de tus operaciones
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
              Un solo sistema para orquestar IA, datos y conversaciones — sin cambiar tus herramientas actuales.
            </p>
          </motion.div>

          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_1.15fr_1fr]">
            <div className="space-y-4">
              {sentraLeft.map(([Icon, title, text]) => (
                <motion.article {...fadeUp} key={title} className="rounded-xl border border-white/15 bg-zinc-950/80 p-5 transition hover:border-cyan-300/40 hover:bg-zinc-950">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div {...fadeUp} className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
              <div className="absolute inset-[5%] animate-[spin_40s_linear_infinite] rounded-full border border-cyan-300/15" />
              <div className="absolute inset-[15%] rounded-full border border-cyan-300/25" />
              <div className="absolute inset-[25%] rounded-full border border-cyan-300/45" />
              <div className="absolute inset-[35%] rounded-full border border-cyan-300/70 shadow-[0_0_40px_rgba(34,211,238,0.25)]" />
              <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-cyan-300 bg-black shadow-[0_0_55px_rgba(34,211,238,0.28)]">
                <span className="text-4xl font-bold">HL</span>
                <span className="mt-1 text-lg tracking-[0.18em]">SENTRA</span>
              </div>
            </motion.div>

            <div className="space-y-4">
              {sentraRight.map(([Icon, title, text]) => (
                <motion.article {...fadeUp} key={title} className="rounded-xl border border-white/15 bg-zinc-950/80 p-5 transition hover:border-cyan-300/40 hover:bg-zinc-950">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* VOZRA premium card */}
          <motion.div
            {...fadeUp}
            className="relative mt-16 overflow-hidden rounded-[2rem] p-[1px]"
            style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(34,211,238,0.05) 40%, rgba(34,211,238,0.4))" }}
          >
            <div className="relative rounded-[calc(2rem-1px)] bg-zinc-950 p-8 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.10),transparent_45%)]" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_2fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    <Sparkles className="h-3 w-3" /> Producto estrella
                  </span>
                  <img src="/vozra-logo.svg" alt="Vozra" className="mt-4 h-auto max-h-24 w-auto max-w-full object-contain" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Vozra · Tu agente conversacional
                  </p>
                  <div className="mt-3 inline-flex items-center gap-3">
                    <span className="rounded-lg border border-white/30 px-3 py-1 text-sm font-bold">PID</span>
                    <span className="text-sm text-zinc-300">Tu agente de recepción de pedidos</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-6">
                    {vozraMetrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-2xl font-semibold text-cyan-300">{m.value}</div>
                        <div className="text-[11px] uppercase tracking-widest text-zinc-500">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/vozra"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Escuchar demo de voz
                  </Link>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {vozraFeatures.map(([Icon, title, text]) => (
                    <article key={title} className="border-white/10 xl:border-l xl:pl-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/10">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="border-y border-white/10 bg-zinc-950/70 py-24">
          <div className="section-container">
            <motion.div {...fadeUp} className="text-center">
              <h2 className="text-3xl font-semibold tracking-[0.06em] md:text-4xl">SOLUCIONES A MEDIDA</h2>
              <p className="mt-3 text-zinc-500">Desarrollamos herramientas que hacen crecer tu negocio.</p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map(({ icon: Icon, title, text, price, time, result }) => (
                <motion.article
                  {...fadeUp}
                  key={title}
                  className="group flex flex-col rounded-2xl border border-white/15 bg-black/60 p-6 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-[0_10px_40px_-15px_rgba(34,211,238,0.35)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/5 transition group-hover:bg-cyan-300/15">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px]">
                    <div>
                      <div className="text-zinc-500">Precio</div>
                      <div className="mt-0.5 font-semibold text-white">{price}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500">Entrega</div>
                      <div className="mt-0.5 font-semibold text-white">{time}</div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 border-t border-white/5 pt-2 text-cyan-300">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span className="font-semibold">{result}</span>
                    </div>
                  </div>

                  <Link
                    to="/servicios"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:gap-3"
                  >
                    Ver ejemplos <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CASOS DE ÉXITO ============ */}
        <section id="casos-uso" className="section-container py-24">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-semibold tracking-[0.06em] md:text-4xl">CASOS REALES</h2>
            <p className="mt-3 text-zinc-500">Resultados medibles en menos de 30 días.</p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <motion.article
                {...fadeUp}
                key={c.author}
                className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-zinc-950 to-black p-7 transition hover:border-cyan-300/40"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.10),transparent_50%)]" />
                <div className="relative">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{c.sector}</span>
                  <div className="mt-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
                    {c.metric}
                  </div>
                  <div className="mt-1 text-sm text-zinc-500">{c.metricLabel}</div>

                  <p className="mt-6 text-sm leading-7 text-zinc-300">"{c.quote}"</p>

                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-semibold text-cyan-300">
                      {c.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{c.author}</div>
                      <div className="text-xs text-zinc-500">{c.role}</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ============ PROCESO ============ */}
        <section className="border-y border-white/10 bg-zinc-950/60 py-24">
          <div className="section-container">
            <motion.div {...fadeUp} className="text-center">
              <h2 className="text-3xl font-semibold tracking-[0.06em] md:text-4xl">CÓMO TRABAJAMOS</h2>
              <p className="mt-3 text-zinc-500">Un proceso simple, claro y enfocado en resultados.</p>
            </motion.div>

            <div className="relative mt-14">
              <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent lg:block" />
              <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                {processSteps.map(([Icon, title, text, when], index) => (
                  <motion.article {...fadeUp} key={title} className="relative text-center">
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/40 bg-black shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]">
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-black">
                        {index + 1}
                      </span>
                      <Icon className="h-7 w-7 text-cyan-300" />
                    </div>
                    <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-cyan-300">{when}</div>
                    <h3 className="mt-1 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="section-container py-24">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-[0.06em] md:text-4xl">PREGUNTAS FRECUENTES</h2>
            <p className="mt-3 text-zinc-500">Todo lo que necesitas saber antes de empezar.</p>
          </motion.div>

          <motion.div {...fadeUp} className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/60 px-5 data-[state=open]:border-cyan-300/40"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-medium hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-zinc-400">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="section-container pb-24">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-cyan-300/25 px-8 py-14 md:px-14 md:py-16"
            style={{ background: "linear-gradient(135deg, rgba(6,18,26,1), rgba(2,8,14,1))" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(34,211,238,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(0,116,255,0.18),transparent_45%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                ¿Listo para que la{" "}
                <span className="bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">IA trabaje</span>{" "}
                por ti?
              </h2>
              <p className="mt-4 text-base text-zinc-400 md:text-lg">
                Auditoría gratis de 30 minutos. Salimos con un plan claro. Sin compromiso.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/auditoria-gratis"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-semibold text-black shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)] transition hover:bg-cyan-300"
                >
                  Reservar auditoría gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/34634425921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-white/5"
                >
                  <MessageSquareMore className="h-4 w-4" />
                  WhatsApp directo
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />Sin permanencia</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-cyan-300" />Setup en 7 días</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />Cancelas cuando quieras</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  </>
);

export default Index;
