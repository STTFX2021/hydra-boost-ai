import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, Clock3, Globe2, PhoneCall, Pizza } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/seo";

const DEMO_URL = "https://sarah-speaks-direct.lovable.app";

const demoPoints = [
  { icon: Pizza, text: "Está especializada en una pizzería de demostración." },
  { icon: PhoneCall, text: "Puede atender pedidos y resolver dudas habituales." },
  { icon: Clock3, text: "Representa una atención disponible 24/7." },
  { icon: Globe2, text: "La experiencia muestra cómo funciona un agente adaptado a un negocio real." },
];

export default function DemoRedirect() {
  return (
    <>
      <SEOHead
        title="Probar Sarah | Demo Vozra PID"
        description="Prueba Sarah, un agente de Vozra PID especializado en la recepción de pedidos para una pizzería."
        canonical="/demo"
      />

      <div className="min-h-screen overflow-hidden bg-black text-white">
        <Header />

        <main>
          <section className="relative flex min-h-screen items-center border-b border-white/10 pb-20 pt-[158px] md:pt-[174px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(34,211,238,0.17),transparent_30%),radial-gradient(circle_at_20%_25%,rgba(37,99,235,0.10),transparent_30%)]" />

            <div className="section-container relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                  <Bot className="h-4 w-4" />
                  Demo funcional de Vozra PID
                </div>

                <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl">
                  Vas a probar a Sarah.
                </h1>

                <p className="mt-5 max-w-3xl text-2xl font-medium leading-9 text-white md:text-3xl">
                  Un agente especializado en la recepción de pedidos para una pizzería.
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                  Esta demostración utiliza un caso concreto para que puedas comprobar cómo conversa, recoge información y guía al cliente. En una implementación real, adaptamos el agente a tu negocio, productos, horarios y procesos.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={DEMO_URL}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300"
                  >
                    Hablar ahora con Sarah <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
                  >
                    <ArrowLeft className="h-4 w-4" /> Volver
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-12 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative rounded-[2rem] border border-cyan-300/20 bg-zinc-950/88 p-7 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:p-9">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10">
                      <Pizza className="h-7 w-7 text-cyan-300" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold">Sarah</p>
                      <p className="mt-1 text-sm text-cyan-300">Asistente de Vozra PID</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {demoPoints.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                        <p className="leading-7 text-zinc-300">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-300/20 bg-emerald-400/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-6 text-zinc-400">
                      La demo no representa una pizzería real. Los datos y productos se utilizan únicamente para mostrar el funcionamiento del agente.
                    </p>
                  </div>
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
