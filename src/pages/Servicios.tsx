import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  Code2,
  CreditCard,
  Globe2,
  MessageSquareMore,
  Network,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/seo";

const services = [
  {
    icon: Globe2,
    title: "Creación web",
    text: "Landing pages, webs corporativas, webs de servicios y experiencias optimizadas para convertir.",
  },
  {
    icon: Code2,
    title: "Desarrollo web",
    text: "Aplicaciones, paneles internos, plataformas, integraciones y herramientas construidas a medida.",
  },
  {
    icon: Bot,
    title: "Chatbots e IA",
    text: "Asistentes inteligentes de texto y voz conectados con la operación real del negocio.",
  },
  {
    icon: Workflow,
    title: "Automatización",
    text: "Flujos que reducen tareas repetitivas y conectan personas, datos y sistemas.",
  },
  {
    icon: CalendarCheck2,
    title: "Reservas y citas",
    text: "Sistemas de reserva, confirmaciones, cambios, recordatorios y gestión de disponibilidad.",
  },
  {
    icon: MessageSquareMore,
    title: "Atención conversacional",
    text: "Atención 24/7 para consultas, captación, pedidos, reservas y seguimiento.",
  },
  {
    icon: CreditCard,
    title: "Pagos y checkout",
    text: "Integraciones con pasarelas de pago, facturación y procesos de cobro online.",
  },
  {
    icon: ShoppingCart,
    title: "Comercio digital",
    text: "Catálogos, tiendas, pedidos, stock y procesos de venta conectados.",
  },
];

const steps = [
  ["01", "Nos cuentas", "Explicas qué necesitas, qué falla y qué resultado buscas."],
  ["02", "Lo diseñamos", "Definimos una solución clara, útil y ajustada a tu operación."],
  ["03", "Lo construimos", "Desarrollamos, integramos y probamos cada parte."],
  ["04", "Lo ponemos en marcha", "Implementamos, medimos y optimizamos."],
];

export default function Servicios() {
  return (
    <>
      <SEOHead
        title="Servicios | HydrAI Labs"
        description="Soluciones de inteligencia artificial, automatización y desarrollo a medida."
        canonical="/servicios"
      />

      <div className="min-h-screen overflow-hidden bg-black text-white">
        <Header />
        <main>
          <section className="relative border-b border-white/10 pb-20 pt-[170px] md:pb-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_15%_30%,rgba(37,99,235,0.10),transparent_30%)]" />
            <div className="section-container relative text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Soluciones a medida
              </p>
              <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
                Creamos soluciones que impulsan tu negocio.
              </h1>
              <p className="mx-auto mt-7 max-w-4xl text-lg leading-8 text-zinc-400 md:text-xl">
                Creamos soluciones de Inteligencia Artificial, automatización y desarrollo a medida que impulsan tu negocio. Tú nos cuentas y nosotros lo solucionamos.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black hover:bg-cyan-300"
                >
                  Cuéntanos tu proyecto <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/precios"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-7 py-4 font-semibold text-white hover:border-cyan-300/60 hover:bg-white/5"
                >
                  Ver catálogo
                </Link>
              </div>
            </div>
          </section>

          <section className="section-container py-20 md:py-28">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-400/[0.035]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold">{title}</h2>
                  <p className="mt-3 leading-7 text-zinc-500">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y border-white/10 bg-zinc-950/70 py-20 md:py-24">
            <div className="section-container">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Cómo trabajamos</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">De una necesidad real a una herramienta útil</h2>
              </div>
              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {steps.map(([number, title, text]) => (
                  <article key={number} className="rounded-2xl border border-white/10 bg-black/65 p-6">
                    <span className="text-sm font-bold tracking-[0.2em] text-cyan-300">{number}</span>
                    <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                    <p className="mt-3 leading-7 text-zinc-500">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section-container py-16 md:py-24">
            <div className="rounded-[2rem] border border-cyan-300/20 bg-zinc-950 p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <Network className="h-6 w-6 text-cyan-300" />
                  <h2 className="mt-5 text-3xl font-semibold md:text-4xl">No adaptamos tu negocio a una herramienta.</h2>
                  <p className="mt-3 text-lg text-zinc-500">Diseñamos la herramienta alrededor de tu negocio.</p>
                </div>
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black hover:bg-cyan-300"
                >
                  Empezar proyecto <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
