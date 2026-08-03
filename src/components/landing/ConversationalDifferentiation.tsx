import { BrainCircuit, DatabaseZap, ShieldCheck, UserRoundCog } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const COPY = {
es:{eyebrow:"La diferencia está en la arquitectura",title:"No creamos bots. Construimos sistemas que entienden, deciden y ejecutan.",description:"Una voz natural no basta. El valor aparece cuando la conversación se conecta con datos, políticas, herramientas y decisiones reales.",items:[["Lógica operacional","Comprende la situación, valida datos y aplica las reglas específicas de cada negocio antes de actuar."],["Memoria y contexto","Reconoce clientes, conserva preferencias relevantes y evita que cada conversación empiece desde cero."],["Trazabilidad y control","Registra qué entendió, qué decisión tomó y qué acción ejecutó para poder revisar cada resultado."],["Supervisión humana","Deriva los casos sensibles, ambiguos o reservados a una persona con el contexto ya organizado."]]},
en:{eyebrow:"The difference is in the architecture",title:"We do not build bots. We build systems that understand, decide and execute.",description:"A natural voice is not enough. Value appears when conversation connects to data, policies, tools and real decisions.",items:[["Operational logic","Understands the situation, validates data and applies each business's specific rules before acting."],["Memory and context","Recognizes customers, preserves relevant preferences and prevents every conversation from starting over."],["Traceability and control","Records what it understood, decided and executed so every result can be reviewed."],["Human oversight","Escalates sensitive, ambiguous or human-reserved cases with the context already organized."]]},
de:{eyebrow:"Der Unterschied liegt in der Architektur",title:"Wir bauen keine Bots. Wir bauen Systeme, die verstehen, entscheiden und handeln.",description:"Eine natürliche Stimme reicht nicht. Wert entsteht, wenn Gespräche mit Daten, Richtlinien, Werkzeugen und echten Entscheidungen verbunden sind.",items:[["Operative Logik","Versteht die Situation, validiert Daten und wendet vor jeder Aktion die spezifischen Geschäftsregeln an."],["Gedächtnis und Kontext","Erkennt Kunden, bewahrt relevante Präferenzen und verhindert, dass jedes Gespräch bei null beginnt."],["Nachvollziehbarkeit und Kontrolle","Protokolliert Verständnis, Entscheidung und Aktion, damit jedes Ergebnis überprüfbar ist."],["Menschliche Aufsicht","Übergibt sensible oder mehrdeutige Fälle mit bereits organisiertem Kontext an einen Menschen."]]},
ru:{eyebrow:"Разница — в архитектуре",title:"Мы не создаём ботов. Мы строим системы, которые понимают, решают и действуют.",description:"Естественного голоса недостаточно. Ценность появляется, когда разговор связан с данными, правилами, инструментами и реальными решениями.",items:[["Операционная логика","Понимает ситуацию, проверяет данные и применяет правила конкретного бизнеса до выполнения действия."],["Память и контекст","Узнаёт клиентов, сохраняет важные предпочтения и не начинает каждый разговор с нуля."],["Прослеживаемость и контроль","Записывает, что поняла система, какое решение приняла и какое действие выполнила."],["Контроль человека","Передаёт чувствительные и неоднозначные случаи человеку с уже организованным контекстом."]]}
} as const;

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

export const ConversationalDifferentiation = () => { const { language } = useTranslation(); const copy = COPY[language as keyof typeof COPY] ?? COPY.es; const localized = capabilities.map((item,i)=>({...item,title:copy.items[i][0],description:copy.items[i][1]})); return (
  <section className="section-padding relative overflow-hidden" aria-labelledby="differentiation-title">
    <div className="absolute inset-0 bg-dots opacity-20" />
    <div className="section-container relative z-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
        <h2 id="differentiation-title" className="text-3xl font-bold md:text-5xl">
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {localized.map(({ icon: Icon, title, description }, index) => (
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
); };
