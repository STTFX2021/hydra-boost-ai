import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Gauge,
  Globe2,
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
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, SEOHead } from "@/components/seo";

const benefitItems = [
  { icon: Workflow, title: "Más eficiencia", text: "Procesos automatizados" },
  { icon: UsersRound, title: "Más clientes", text: "Atención y captación 24/7" },
  { icon: Gauge, title: "Más ventas", text: "Menos oportunidades perdidas" },
  { icon: Layers3, title: "Más control", text: "Datos y decisiones en tiempo real" },
];

const vozraCapabilities = [
  { icon: MessageSquareMore, title: "Entiende", text: "Comprende lenguaje natural, intención y contexto." },
  { icon: CheckCircle2, title: "Resuelve", text: "Ejecuta acciones y aplica reglas reales del negocio." },
  { icon: BrainCircuit, title: "Aprende", text: "Mejora continuamente con cada conversación." },
  { icon: Network, title: "Se integra", text: "Conecta con CRM, agendas y sistemas internos." },
  { icon: ShieldCheck, title: "Es seguro", text: "Protección de datos y procesos controlados." },
  { icon: Rocket, title: "Es escalable", text: "Crece junto al volumen y las necesidades del negocio." },
];

const pidCapabilities = [
  { icon: Globe2, title: "Multilanguage", text: "Atiende a tus clientes en varios idiomas." },
  { icon: Clock3, title: "Atención 24/7", text: "Disponible todos los días y a cualquier hora." },
  { icon: PhoneCall, title: "Múltiples llamadas", text: "Gestiona conversaciones simultáneas sin esperas." },
  { icon: Gauge, title: "Máxima eficiencia", text: "Respuestas rápidas, precisas y orientadas a resultados." },
];

const services = [
  { icon: Sparkles, title: "Creación web", text: "Webs limpias, rápidas y optimizadas para convertir visitas en clientes." },
  { icon: Code2, title: "Desarrollo web", text: "Aplicaciones, plataformas internas e integraciones a medida." },
  { icon: Bot, title: "Chatbots e IA", text: "Asistentes inteligentes de texto y voz conectados a tu operación." },
  { icon: Workflow, title: "Automatización", text: "Procesos repetitivos automatizados para ahorrar tiempo y costes." },
];

const process = [
  ["01", "Escuchamos", "Entendemos el negocio, los objetivos y los bloqueos reales."],
  ["02", "Diseñamos", "Definimos la herramienta adecuada sin añadir complejidad innecesaria."],
  ["03", "Desarrollamos", "Construimos, integramos y probamos la solución."],
  ["04", "Implementamos", "La ponemos en marcha con acompañamiento operativo."],
  ["05", "Optimizamos", "Medimos resultados, mejoramos y escalamos."],
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
        <section className="relative border-b border-white/10 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.17),transparent_32%),radial-gradient(circle_at_18%_15%,rgba(37,99,235,0.10),transparent_28%)]" />
          <div className="section-container relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Inteligencia conversacional para negocios
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                Herramientas diseñadas a medida para profesionales, por profesionales.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
                Creamos soluciones de inteligencia artificial, automatización, creación web y desarrollo a medida que resuelven problemas operativos reales.
              </p>

              <div className="mt-9 grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
                {benefitItems.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/auditoria-gratis" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300">
                  Probar demo <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#vozra" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/5">
                  Ver cómo funciona
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-cyan-300/25 bg-zinc-950/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10">
                      <Bot className="h-6 w-6 text-cyan-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Vozra</p>
                      <p className="text-sm text-zinc-500">Atiende, entiende y resuelve</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">En línea</span>
                </div>
                <div className="space-y-4 py-6">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 p-4 text-sm leading-6 text-zinc-300">
                    Quiero reservar una mesa para cuatro personas mañana a las 21:00.
                  </div>
                  <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm leading-6 text-zinc-200">
                    Perfecto. ¿A nombre de quién realizamos la solicitud?
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Solicitud registrada</span>
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-zinc-500">
                    <span>Fecha: mañana</span><span>Hora: 21:00</span>
                    <span>Personas: 4</span><span>Estado: validando</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vozra" className="section-container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Producto principal</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Vozra</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">Tu agente conversacional inteligente: comprende, decide y ejecuta dentro de las reglas del negocio.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vozraCapabilities.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/35 hover:bg-cyan-400/[0.04]">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-zinc-500">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-zinc-950/65 py-20 md:py-24">
          <div className="section-container">
            <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <span className="inline-flex rounded-lg border border-white/15 px-3 py-1 text-xs font-bold tracking-[0.22em] text-white">PID</span>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Vozra PID</h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Pedidos Inteligentes Directos</p>
                <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">Diseñado para gestionar pedidos, reservas y llamadas con velocidad, precisión y disponibilidad permanente.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {pidCapabilities.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="rounded-2xl border border-white/10 bg-black/60 p-6">
                    <Icon className="h-6 w-6 text-cyan-300" />
                    <h3 className="mt-5 text-lg font-semibold uppercase tracking-wide">{title}</h3>
                    <p className="mt-2 leading-7 text-zinc-500">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-container py-20 md:py-28">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Soluciones a medida</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Construimos lo que tu operación necesita</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">No adaptamos tu negocio a una herramienta. Diseñamos la herramienta alrededor de tu negocio.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-300/35">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 min-h-24 leading-7 text-zinc-500">{text}</p>
                <Link to="/servicios" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Saber más <ArrowRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-white/[0.018] py-20 md:py-24">
          <div className="section-container">
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Cómo trabajamos</h2>
              <p className="mt-4 text-lg text-zinc-500">Un proceso claro, simple y enfocado en resultados.</p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-5">
              {process.map(([number, title, text]) => (
                <article key={number} className="relative">
                  <div className="text-sm font-bold tracking-[0.18em] text-cyan-300">{number}</div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-container py-16 md:py-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-zinc-950 px-7 py-10 md:px-12 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,211,238,0.14),transparent_36%)]" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-semibold md:text-4xl">¿Listo para transformar tu negocio?</h2>
                <p className="mt-3 text-lg text-zinc-500">Hablemos y diseñemos la solución adecuada para tu operación.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/auditoria-gratis" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-black hover:bg-cyan-300">Probar demo <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contacto" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-semibold text-white hover:bg-white/5"><Headphones className="h-4 w-4" /> Contactar</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </>
);

export default Index;
