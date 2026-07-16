import { BrainCircuit, DatabaseZap, ShieldCheck, UserRoundCog } from "lucide-react";

const capabilities = [
  {
    icon: BrainCircuit,
    title: "Lógica operacional",
    description: "Comprende la situación, valida datos y aplica las reglas específicas de cada negocio antes de actuar.",
  },
  {
    icon: DatabaseZap,
    title: "Memoria y contexto",
    description: "Reconoce clientes, conserva preferencias relevantes y evita que cada conversación empiece desde cero.",
  },
  {
    icon: ShieldCheck,
    title: "Trazabilidad y control",
    description: "Registra qué entendió, qué decisión tomó y qué acción ejecutó para poder revisar cada resultado.",
  },
  {
    icon: UserRoundCog,
    title: "Supervisión humana",
    description: "Deriva los casos sensibles, ambiguos o reservados a una persona con el contexto ya organizado.",
  },
];

export const ConversationalDifferentiation = () => (
  <section className="section-padding relative overflow-hidden" aria-labelledby="differentiation-title">
    <div className="absolute inset-0 bg-dots opacity-20" />
    <div className="section-container relative z-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">La diferencia está en la arquitectura</p>
        <h2 id="differentiation-title" className="text-3xl font-bold md:text-5xl">
          No creamos bots. Construimos sistemas que entienden, deciden y ejecutan.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
          Una voz natural no basta. El valor aparece cuando la conversación se conecta con datos, políticas, herramientas y decisiones reales.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map(({ icon: Icon, title, description }, index) => (
          <article key={title} className="card-elevated card-elevated-hover relative overflow-hidden p-6">
            <span className="absolute right-5 top-4 text-5xl font-bold text-foreground/[0.035]">0{index + 1}</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
