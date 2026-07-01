import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Headphones,
  Languages,
  Network,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/seo";

const attributes = [
  {
    icon: BrainCircuit,
    title: "Entiende lenguaje natural",
    text: "Interpreta intención, contexto, correcciones y datos incompletos.",
  },
  {
    icon: RefreshCw,
    title: "Mantiene el contexto",
    text: "Conserva la información relevante durante toda la conversación.",
  },
  {
    icon: CheckCircle2,
    title: "Ejecuta acciones",
    text: "Gestiona reservas, pedidos, consultas y captación.",
  },
  {
    icon: Network,
    title: "Se integra",
    text: "Conecta con CRM, agendas, telefonía y sistemas internos.",
  },
  {
    icon: ShieldCheck,
    title: "Opera con control",
    text: "Aplica reglas, validaciones y revisión cuando corresponde.",
  },
  {
    icon: Workflow,
    title: "Escala",
    text: "Atiende más volumen sin multiplicar tareas manuales.",
  },
];

const capabilities = [
  { icon: CheckCircle2, label: "Reservas" },
  { icon: ShoppingBag, label: "Pedidos" },
  { icon: PhoneCall, label: "Atención telefónica" },
  { icon: RefreshCw, label: "Cambios y cancelaciones" },
  { icon: BrainCircuit, label: "Recogida de datos" },
  { icon: Network, label: "Integración con sistemas" },
  { icon: Headphones, label: "Derivación cuando es necesaria" },
  { icon: Languages, label: "Atención multilingüe" },
];

export default function Vozra() {
  return (
    <>
      <SEOHead
        title="Vozra | Agente conversacional inteligente"
        description="Vozra atiende, entiende y ejecuta acciones reales dentro de las reglas de tu negocio."
        canonical="/vozra"
      />

      <div className="min-h-screen overflow-hidden bg-black text-white">
        <Header />

        <main>
          <section className="relative border-b border-white/10 pb-20 pt-36 md:pb-28 md:pt-44">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_15%_20%,rgba(14,116,144,0.12),transparent_30%)]" />

            <div className="section-container relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Agente conversacional inteligente
                </p>

                <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.045em] md:text-7xl">
                  Vozra atiende, entiende y resuelve.
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
                  Un agente conversacional conectado a la operación real de tu
                  negocio. Mantiene contexto, aplica reglas y ejecuta acciones
                  sin convertir cada llamada en una tarea manual.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300"
                  >
                    Probar Vozra <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
                  >
                    Solicitar demo
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-12 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative rounded-[2rem] border border-cyan-300/20 bg-zinc-950/85 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                  <img
                    src="/vozra-logo.svg"
                    alt="Vozra"
                    className="mx-auto max-h-52 w-auto max-w-full object-contain"
                  />

                  <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="block text-zinc-500">Estado</span>
                      <span className="mt-1 block font-semibold text-emerald-300">
                        En línea
                      </span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <span className="block text-zinc-500">Canal</span>
                      <span className="mt-1 block font-semibold text-white">
                        Voz y texto
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-container py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Capacidades principales
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Conversación conectada a la operación
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {attributes.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/35 hover:bg-cyan-400/[0.04]"
                >
                  <Icon className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-500">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y border-white/10 bg-zinc-950/70 py-20 md:py-24">
            <div className="section-container grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  Demostración
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                  Mantiene el hilo de la conversación.
                </h2>

                <div className="mt-8 space-y-4 text-sm leading-6">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/5 p-4 text-zinc-300">
                    Quiero reservar una mesa para cuatro personas mañana a las
                    nueve.
                  </div>

                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm border border-cyan-300/20 bg-cyan-400/10 p-4 text-zinc-200">
                    Perfecto. ¿A nombre de quién realizamos la solicitud?
                  </div>

                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/5 p-4 text-zinc-300">
                    A nombre de Sam. Mejor a las nueve y media.
                  </div>

                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm border border-cyan-300/20 bg-cyan-400/10 p-4 text-zinc-200">
                    De acuerdo, actualizo la hora a las 21:30. ¿Puede
                    facilitarme un teléfono de contacto?
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="font-semibold">Solicitud en curso</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Datos recogidos durante la conversación
                    </p>
                  </div>
                  <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                    Validando
                  </span>
                </div>

                <dl className="mt-6 space-y-4">
                  {[
                    ["Fecha", "Mañana"],
                    ["Hora", "21:30"],
                    ["Personas", "4"],
                    ["Estado", "Validando"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-white/5 pb-3"
                    >
                      <dt className="text-zinc-500">{label}</dt>
                      <dd className="font-medium text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          <section className="section-container py-20 md:py-28">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Operación real
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Todo lo que Vozra puede gestionar
              </h2>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <Icon className="h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="font-medium text-zinc-200">{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-y border-white/10 bg-white/[0.018] py-20 md:py-24">
            <div className="section-container text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Diferenciador
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                No es un chatbot decorativo.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
                Vozra comprende la conversación, conserva los datos relevantes
                y actúa dentro de las reglas reales del negocio.
              </p>
            </div>
          </section>

          <section className="section-container py-16 md:py-24">
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-zinc-950 px-7 py-10 md:px-12 md:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,211,238,0.14),transparent_36%)]" />

              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <h2 className="text-3xl font-semibold md:text-4xl">
                    Comprueba cómo atendería Vozra a tus clientes.
                  </h2>
                  <p className="mt-3 text-lg text-zinc-500">
                    Prueba una conversación y revisa cómo recoge y organiza la
                    información.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-black hover:bg-cyan-300"
                  >
                    Probar Vozra <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-semibold text-white hover:bg-white/5"
                  >
                    Contactar
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
