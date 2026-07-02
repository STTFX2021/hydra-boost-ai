import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CalendarCheck2,
  CheckCircle2,
  Code2,
  Gauge,
  Headphones,
  Layers3,
  MessageSquareMore,
  Network,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, SEOHead } from "@/components/seo";

const benefits = [
  { icon: Workflow, title: "Más eficiencia", text: "Procesos automatizados" },
  { icon: UsersRound, title: "Más clientes", text: "Captura y atención 24/7" },
  { icon: Gauge, title: "Más ventas", text: "Menos pérdidas, más resultados" },
  { icon: Layers3, title: "Más control", text: "Datos y decisiones en tiempo real" },
];

const sentraLeft = [
  [Workflow, "Automatización", "Flujos inteligentes que optimizan procesos."],
  [Network, "Integraciones", "Conecta todas tus herramientas."],
  [BrainCircuit, "Datos e IA", "Información unificada para mejores decisiones."],
];

const sentraRight = [
  [MessageSquareMore, "Conversaciones", "Gestión avanzada de todos los canales."],
  [Rocket, "Orquestación", "Coordina agentes, sistemas y acciones."],
  [ShieldCheck, "Seguridad", "Infraestructura robusta y privacidad garantizada."],
];

const vozraFeatures = [
  [PhoneCall, "Atención 24/7", "Nunca más pierdas una llamada."],
  [CalendarCheck2, "Pedidos y reservas", "Toma y gestiona pedidos y reservas."],
  [MessageSquareMore, "Respuestas inteligentes", "Entiende, responde y resuelve."],
  [CheckCircle2, "Sin errores", "Información clara y enviada al momento."],
];

const services = [
  [Sparkles, "Creación Web", "Webs modernas, rápidas y optimizadas para convertir visitantes en clientes."],
  [Code2, "Desarrollo Web", "Aplicaciones y plataformas web a medida, escalables y seguras."],
  [Bot, "Chatbots & IA", "Asistentes inteligentes que atienden, califican y convierten 24/7."],
  [Zap, "Automatización", "Procesos repetitivos automatizados para ahorrar tiempo y dinero."],
];

const process = [
  [Headphones, "1. Escuchamos", "Entendemos tu negocio y tus objetivos."],
  [Sparkles, "2. Diseñamos", "Creamos la solución perfecta para ti."],
  [Code2, "3. Desarrollamos", "Construimos, integramos y probamos."],
  [Rocket, "4. Implementamos", "Puesta en marcha y acompañamiento."],
  [Gauge, "5. Optimizamos", "Medimos, mejoramos y escalamos contigo."],
];

const Index = () => (
  <>
    <SEOHead
      title="HydrAI Labs | Inteligencia conversacional y desarrollo a medida"
      description="Herramientas de inteligencia artificial, automatización y desarrollo diseñadas a medida para profesionales, por profesionales."
      canonical="/"
    />
    <OrganizationSchema />
    <LocalBusinessSchema />
    <WebSiteSchema />

    <div className="min-h-screen overflow-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative border-b border-white/10 pb-14 pt-[154px] md:pb-16 md:pt-[168px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(0,213,255,0.13),transparent_32%),radial-gradient(circle_at_16%_22%,rgba(0,116,255,0.08),transparent_28%)]" />
          <div className="section-container relative grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 md:text-sm">
                Inteligencia conversacional para negocios
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
                Herramientas diseñadas a medida para profesionales, por profesionales.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                Creamos soluciones de Inteligencia Artificial, automatización y desarrollo a medida que impulsan negocios reales.
              </p>

              <div className="mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 text-sm font-semibold text-black transition hover:bg-cyan-300">
                  Probar demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/vozra" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-white/5">
                  Ver cómo funciona
                </Link>
              </div>
            </div>

            <div className="relative mx-auto min-h-[470px] w-full max-w-[620px]">
              <div className="absolute inset-y-0 right-0 w-[82%] rounded-[42%_58%_48%_52%/55%_42%_58%_45%] bg-[radial-gradient(circle_at_60%_48%,rgba(23,69,89,0.75),rgba(4,10,16,0.92)_58%,transparent_72%)]" />
              <div className="absolute left-6 top-1/2 h-[3px] w-[66%] -translate-y-1/2 bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.9)]" />
              <div className="absolute left-[22%] top-[33%] h-24 w-16 -rotate-12 border-l-2 border-t-2 border-cyan-300/80" />
              <div className="absolute right-5 top-[18%] w-[205px] rounded-2xl border border-cyan-300/60 bg-black/75 p-5 shadow-[0_0_34px_rgba(34,211,238,0.12)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Bot className="h-7 w-7 text-cyan-300" />
                  <span className="text-2xl font-semibold text-cyan-300">Vozra</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">Atiende, entiende y resuelve.</p>
              </div>
              <div className="absolute bottom-[5%] right-0 w-[220px] rounded-2xl border border-white/15 bg-zinc-950/90 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-semibold">Reserva confirmada</span>
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-y-3 text-xs">
                  <span className="text-zinc-500">Nombre</span><span>Laura Martínez</span>
                  <span className="text-zinc-500">Fecha</span><span>24/05/2025</span>
                  <span className="text-zinc-500">Hora</span><span>21:00</span>
                  <span className="text-zinc-500">Personas</span><span>4</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-zinc-950/80 py-5">
          <div className="section-container flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-sm text-zinc-300">
            <span className="text-zinc-500">Conectamos con las herramientas que ya usas</span>
            <span>WhatsApp</span><span>Twilio</span><span>HubSpot</span><span>Google Calendar</span><span>Ringover</span><span>Zapier</span><span className="text-zinc-500">y muchas más...</span>
          </div>
        </section>

        <section id="sentra" className="section-container py-16 md:py-20">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-[0.08em] md:text-5xl">SENTRA</h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">El centro neurálgico de tus operaciones</p>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_1.15fr_1fr]">
            <div className="space-y-4">
              {sentraLeft.map(([Icon, title, text]) => (
                <article key={String(title)} className="rounded-xl border border-white/15 bg-zinc-950/80 p-5">
                  <div className="flex items-start gap-4"><Icon className="mt-1 h-6 w-6 text-cyan-300" /><div><h3 className="font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{String(text)}</p></div></div>
                </article>
              ))}
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
              <div className="absolute inset-[5%] rounded-full border border-cyan-300/20" />
              <div className="absolute inset-[15%] rounded-full border border-cyan-300/30" />
              <div className="absolute inset-[25%] rounded-full border border-cyan-300/50" />
              <div className="absolute inset-[35%] rounded-full border border-cyan-300/70 shadow-[0_0_34px_rgba(34,211,238,0.18)]" />
              <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-cyan-300 bg-black shadow-[0_0_45px_rgba(34,211,238,0.2)]">
                <span className="text-4xl font-bold">HL</span>
                <span className="mt-1 text-lg tracking-[0.16em]">SENTRA</span>
              </div>
            </div>

            <div className="space-y-4">
              {sentraRight.map(([Icon, title, text]) => (
                <article key={String(title)} className="rounded-xl border border-white/15 bg-zinc-950/80 p-5">
                  <div className="flex items-start gap-4"><Icon className="mt-1 h-6 w-6 text-cyan-300" /><div><h3 className="font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{String(text)}</p></div></div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/15 bg-zinc-950/90 p-7 md:p-9">
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_2fr]">
              <div>
                <img src="/vozra-logo.svg" alt="Vozra" className="h-auto max-h-28 w-auto max-w-full object-contain" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Vozra · Tu agente conversacional</p>
                <div className="mt-4 inline-flex items-center gap-3"><span className="rounded-lg border border-white/30 px-3 py-1 text-sm font-bold">PID</span><span className="text-sm text-zinc-300">Tu agente de recepción de pedidos</span></div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {vozraFeatures.map(([Icon, title, text]) => (
                  <article key={String(title)} className="border-white/10 xl:border-l xl:pl-5">
                    <Icon className="h-6 w-6 text-cyan-300" />
                    <h3 className="mt-4 text-sm font-semibold">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{String(text)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-zinc-950/70 py-16 md:py-20">
          <div className="section-container">
            <div className="text-center"><h2 className="text-3xl font-semibold md:text-4xl">SOLUCIONES A MEDIDA</h2><p className="mt-3 text-zinc-500">Desarrollamos herramientas que hacen crecer tu negocio.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map(([Icon, title, text]) => (
                <article key={String(title)} className="rounded-2xl border border-white/15 bg-black/60 p-6 transition hover:-translate-y-1 hover:border-cyan-300/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30"><Icon className="h-6 w-6 text-cyan-300" /></div>
                  <h3 className="mt-5 text-lg font-semibold">{String(title)}</h3>
                  <p className="mt-3 min-h-24 text-sm leading-6 text-zinc-500">{String(text)}</p>
                  <Link to="/servicios" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Saber más <ArrowRight className="h-4 w-4" /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-container py-16 md:py-20">
          <div className="text-center"><h2 className="text-3xl font-semibold md:text-4xl">CÓMO TRABAJAMOS</h2><p className="mt-3 text-zinc-500">Un proceso simple, claro y enfocado en resultados.</p></div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {process.map(([Icon, title, text], index) => (
              <article key={String(title)} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/35"><Icon className="h-7 w-7" /></div>
                <h3 className="mt-4 font-semibold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{String(text)}</p>
                {index < process.length - 1 && <ArrowRight className="absolute -right-5 top-6 hidden h-5 w-5 text-zinc-700 lg:block" />}
              </article>
            ))}
          </div>
        </section>

        <section className="section-container pb-16">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 px-7 py-8 md:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(14,116,144,0.16),transparent_35%)]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div><h2 className="text-2xl font-semibold md:text-3xl">¿Listo para transformar tu negocio?</h2><p className="mt-2 text-zinc-500">Hablemos y diseñemos tu solución a medida.</p></div>
              <div className="flex flex-col gap-3 sm:flex-row"><Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-black">Probar demo <ArrowRight className="h-4 w-4" /></Link><Link to="/contacto" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-4 font-semibold text-white">Contactar</Link></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </>
);

export default Index;
