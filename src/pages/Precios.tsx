import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  Code2,
  CreditCard,
  Globe2,
  MessageSquareMore,
  Network,
  PhoneCall,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/seo";

const categories = [
  {
    id: "web",
    eyebrow: "Creación y desarrollo web",
    title: "Web y comercio digital",
    description: "Desde una presencia corporativa sencilla hasta una plataforma de venta completa.",
    icon: Globe2,
    items: [
      {
        icon: Globe2,
        name: "Página web esencial",
        price: "497 € + IVA",
        text: "Web corporativa o landing responsive, formularios, SEO técnico básico, analítica y configuración de dominio.",
        features: ["Diseño responsive", "Formulario de contacto", "SEO técnico básico", "Analítica", "Configuración de dominio"],
      },
      {
        icon: Bot,
        name: "Página web + chatbot",
        price: "792 € + IVA",
        text: "Página web profesional con asistente conversacional para responder, captar y cualificar clientes.",
        features: ["Todo lo incluido en web esencial", "Chatbot web", "Preguntas frecuentes", "Captación de leads", "Flujos iniciales"],
      },
      {
        icon: CreditCard,
        name: "Web + chatbot + pasarela de pago",
        price: "989 € + IVA",
        text: "Experiencia completa para informar, conversar y cobrar desde la misma web.",
        features: ["Web profesional", "Chatbot integrado", "Stripe o Redsys", "Checkout", "Panel básico de cobros"],
      },
      {
        icon: ShoppingCart,
        name: "Tienda online",
        price: "Desde 497 € + IVA",
        text: "Catálogo, carrito, checkout, pedidos y gestión básica de productos.",
        features: ["Catálogo de productos", "Carrito", "Checkout", "Pasarela de pago", "Panel de pedidos"],
      },
    ],
  },
  {
    id: "ia",
    eyebrow: "Inteligencia conversacional",
    title: "Chatbots, Vozra y atención inteligente",
    description: "Sistemas conversacionales conectados con la operación real del negocio.",
    icon: MessageSquareMore,
    items: [
      {
        icon: Bot,
        name: "Chatbot web",
        price: "295 € + IVA",
        text: "Asistente web para responder consultas, captar contactos y guiar al cliente.",
        features: ["Atención 24/7", "FAQs", "Captación de leads", "Flujos iniciales", "Integración web"],
      },
      {
        icon: MessageSquareMore,
        name: "Chatbot WhatsApp",
        price: "350 € + IVA",
        text: "Automatización conversacional en WhatsApp Business con flujos adaptados al negocio.",
        features: ["WhatsApp Business", "Respuestas automáticas", "Flujos conversacionales", "Recordatorios", "Integración CRM básica"],
      },
      {
        icon: PhoneCall,
        name: "Vozra",
        price: "Presupuesto personalizado",
        text: "Agente conversacional de voz que atiende, entiende, mantiene contexto y ejecuta acciones.",
        features: ["Atención telefónica", "Lenguaje natural", "Contexto conversacional", "Integraciones", "Reglas operativas"],
      },
      {
        icon: PhoneCall,
        name: "Vozra PID",
        price: "Presupuesto personalizado",
        text: "Agente de recepción de pedidos preparado para atender múltiples llamadas y trabajar 24/7.",
        features: ["Recepción de pedidos", "Multilanguage", "Múltiples llamadas", "Atención 24/7", "Integración con sistemas"],
      },
    ],
  },
  {
    id: "automation",
    eyebrow: "Procesos y operaciones",
    title: "Automatización e integraciones",
    description: "Herramientas que conectan tareas, datos y sistemas para reducir trabajo manual.",
    icon: Workflow,
    items: [
      {
        icon: CalendarCheck2,
        name: "Sistema de reservas online",
        price: "197 € + IVA",
        text: "Calendario de reservas con confirmaciones, recordatorios y gestión de cambios.",
        features: ["Reservas online", "Confirmaciones", "Recordatorios", "Cancelaciones", "Google Calendar"],
      },
      {
        icon: CreditCard,
        name: "Pasarela de pago",
        price: "197 € + IVA",
        text: "Integración de pagos online con Stripe o Redsys y flujo de cobro adaptado.",
        features: ["Stripe o Redsys", "Pago seguro", "Checkout", "Panel de cobros", "Pruebas de funcionamiento"],
      },
      {
        icon: Network,
        name: "Integración entre herramientas",
        price: "Presupuesto personalizado",
        text: "Conexión entre CRM, calendarios, bases de datos, formularios, correo y sistemas internos.",
        features: ["Análisis del flujo", "Integración API", "Sincronización de datos", "Pruebas", "Documentación"],
      },
      {
        icon: Code2,
        name: "Herramienta a medida",
        price: "Presupuesto personalizado",
        text: "Aplicación, panel o sistema interno diseñado alrededor de la operación del cliente.",
        features: ["Análisis funcional", "Diseño", "Desarrollo", "Integraciones", "Implementación"],
      },
    ],
  },
];

export default function Precios() {
  return (
    <>
      <SEOHead
        title="Catálogo y precios | HydrAI Labs"
        description="Catálogo de creación web, chatbots, automatización, Vozra y soluciones a medida."
        canonical="/precios"
      />

      <div className="min-h-screen overflow-hidden bg-black text-white">
        <Header />
        <main>
          <section className="relative border-b border-white/10 pb-20 pt-[170px] md:pb-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.09),transparent_30%)]" />
            <div className="section-container relative text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Catálogo de soluciones</p>
              <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
                Elige una base. Nosotros la adaptamos.
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
                Precios de referencia para soluciones habituales. El alcance final, las integraciones y los costes recurrentes se confirman antes de empezar.
              </p>
            </div>
          </section>

          {categories.map(({ id, eyebrow, title, description, icon: CategoryIcon, items }, categoryIndex) => (
            <section
              key={id}
              id={id}
              className={categoryIndex % 2 === 1 ? "border-y border-white/10 bg-zinc-950/65 py-20 md:py-24" : "section-container py-20 md:py-24"}
            >
              <div className={categoryIndex % 2 === 1 ? "section-container" : ""}>
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 text-cyan-300">
                    <CategoryIcon className="h-5 w-5" />
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]">{eyebrow}</p>
                  </div>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
                  <p className="mt-4 text-lg leading-8 text-zinc-500">{description}</p>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {items.map(({ icon: Icon, name, price, text, features }) => (
                    <article key={name} className="flex flex-col rounded-2xl border border-white/10 bg-black/65 p-6 transition hover:-translate-y-1 hover:border-cyan-300/35">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10">
                        <Icon className="h-6 w-6 text-cyan-300" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{name}</h3>
                      <p className="mt-3 text-2xl font-semibold text-cyan-300">{price}</p>
                      <p className="mt-4 leading-7 text-zinc-500">{text}</p>
                      <ul className="mt-6 flex-1 space-y-3">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contacto"
                        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-cyan-300/60 hover:bg-white/5"
                      >
                        Solicitar <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}

          <section className="section-container py-16 md:py-24">
            <div className="rounded-[2rem] border border-cyan-300/20 bg-zinc-950 p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="text-3xl font-semibold md:text-4xl">¿Necesitas combinar varios servicios?</h2>
                  <p className="mt-3 text-lg text-zinc-500">Preparamos una propuesta conjunta y eliminamos elementos que no aporten valor.</p>
                </div>
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-semibold text-black hover:bg-cyan-300"
                >
                  Pedir propuesta <ArrowRight className="h-4 w-4" />
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
