import { ArrowUpRight, Bot, Braces, CheckCircle2, Globe2, LayoutDashboard, PhoneCall, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    id: "inteligencia-conversacional",
    eyebrow: "Pilar principal",
    title: "Inteligencia conversacional",
    description:
      "Agentes de voz y sistemas que entienden el contexto, aplican las reglas de tu negocio y ejecutan acciones verificables.",
    icon: Bot,
    href: "/agentes-ia-voz-restaurantes",
    features: ["Agentes telefónicos", "Reservas y pedidos", "Memoria y personalización", "Escalado humano"],
    accent: "primary",
  },
  {
    id: "desarrollo-web",
    eyebrow: "Infraestructura digital",
    title: "Desarrollo web",
    description:
      "Construimos las webs, aplicaciones y paneles que convierten cada conversación en una operación útil para el negocio.",
    icon: Braces,
    href: "/casos",
    features: ["Webs corporativas", "E-commerce", "Aplicaciones web", "Paneles e integraciones"],
    accent: "secondary",
  },
] as const;

export const BusinessPillars = () => (
  <section id="inteligencia-conversacional" className="section-padding section-alt-subtle" aria-labelledby="business-pillars-title">
    <div className="section-container">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Dos capacidades, un solo sistema</p>
        <h2 id="business-pillars-title" className="text-3xl font-bold md:text-5xl">
          Construimos la conversación y todo lo que ocurre después.
        </h2>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          La inteligencia conversacional es el centro. El desarrollo web conecta esa inteligencia con clientes, equipos y operaciones.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const primary = pillar.accent === "primary";
          return (
            <article key={pillar.id} className="card-elevated card-elevated-hover relative overflow-hidden p-7 md:p-9">
              <div className={`absolute inset-x-0 top-0 h-px ${primary ? "bg-primary/60" : "bg-secondary/60"}`} />
              <div className="flex items-start justify-between gap-5">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${primary ? "border-primary/20 bg-primary/10 text-primary" : "border-secondary/20 bg-secondary/10 text-secondary"}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${primary ? "border-primary/20 bg-primary/5 text-primary" : "border-secondary/20 bg-secondary/5 text-secondary"}`}>
                  {pillar.eyebrow}
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold md:text-3xl">{pillar.title}</h3>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{pillar.description}</p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {pillar.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className={`h-4 w-4 ${primary ? "text-primary" : "text-secondary"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={pillar.href} className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${primary ? "text-primary" : "text-secondary"}`}>
                Explorar soluciones
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="mt-8 flex items-center gap-3 border-t border-border/40 pt-5 text-xs text-muted-foreground">
                {primary ? (
                  <>
                    <PhoneCall className="h-4 w-4 text-primary" />
                    <Workflow className="h-4 w-4 text-primary" />
                    Conversación → decisión → acción
                  </>
                ) : (
                  <>
                    <Globe2 className="h-4 w-4 text-secondary" />
                    <LayoutDashboard className="h-4 w-4 text-secondary" />
                    Web → datos → operación
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
