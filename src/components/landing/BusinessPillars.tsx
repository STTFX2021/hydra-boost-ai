import { ArrowUpRight, Bot, Braces, CheckCircle2, Globe2, LayoutDashboard, PhoneCall, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";

const COPY = {
es:{eyebrow:"Dos capacidades, un solo sistema",title:"{copy.title}",description:"{copy.description}",explore:"{copy.explore}",flow1:"{copy.flow1}",flow2:"{copy.flow2}",pillars:[
{eyebrow:"Pilar principal",title:"Inteligencia conversacional",description:"Agentes de voz y sistemas que entienden el contexto, aplican las reglas de tu negocio y ejecutan acciones verificables.",features:["Agentes telefónicos","Reservas y pedidos","Memoria y personalización","Escalado humano"]},
{eyebrow:"Infraestructura digital",title:"Desarrollo web",description:"Construimos las webs, aplicaciones y paneles que convierten cada conversación en una operación útil para el negocio.",features:["Webs corporativas","E-commerce","Aplicaciones web","Paneles e integraciones"]}]},
en:{eyebrow:"Two capabilities, one system",title:"We build the conversation and everything that happens next.",description:"Conversational intelligence is the core. Web development connects that intelligence to customers, teams and operations.",explore:"Explore solutions",flow1:"Conversation → decision → action",flow2:"Web → data → operation",pillars:[
{eyebrow:"Core capability",title:"Conversational intelligence",description:"Voice agents and systems that understand context, apply your business rules and execute verifiable actions.",features:["Phone agents","Bookings and orders","Memory and personalization","Human escalation"]},
{eyebrow:"Digital infrastructure",title:"Web development",description:"We build websites, applications and dashboards that turn every conversation into a useful business operation.",features:["Corporate websites","E-commerce","Web applications","Dashboards and integrations"]}]},
de:{eyebrow:"Zwei Fähigkeiten, ein System",title:"Wir entwickeln das Gespräch und alles, was danach geschieht.",description:"Conversational Intelligence ist der Kern. Webentwicklung verbindet sie mit Kunden, Teams und Abläufen.",explore:"Lösungen entdecken",flow1:"Gespräch → Entscheidung → Aktion",flow2:"Web → Daten → Betrieb",pillars:[
{eyebrow:"Kernbereich",title:"Conversational Intelligence",description:"Sprachagenten und Systeme, die Kontext verstehen, Geschäftsregeln anwenden und überprüfbare Aktionen ausführen.",features:["Telefonagenten","Reservierungen und Bestellungen","Gedächtnis und Personalisierung","Übergabe an Menschen"]},
{eyebrow:"Digitale Infrastruktur",title:"Webentwicklung",description:"Wir bauen Websites, Anwendungen und Dashboards, die jedes Gespräch in einen nützlichen Geschäftsprozess verwandeln.",features:["Unternehmenswebsites","E-Commerce","Webanwendungen","Dashboards und Integrationen"]}]},
ru:{eyebrow:"Две возможности, единая система",title:"Мы создаём разговор и всё, что происходит после него.",description:"Разговорный ИИ — это центр. Веб-разработка связывает его с клиентами, командами и операциями.",explore:"Посмотреть решения",flow1:"Разговор → решение → действие",flow2:"Веб → данные → операция",pillars:[
{eyebrow:"Основное направление",title:"Разговорный ИИ",description:"Голосовые агенты и системы, которые понимают контекст, применяют правила бизнеса и выполняют проверяемые действия.",features:["Телефонные агенты","Бронирования и заказы","Память и персонализация","Передача человеку"]},
{eyebrow:"Цифровая инфраструктура",title:"Веб-разработка",description:"Мы создаём сайты, приложения и панели, превращающие каждый разговор в полезную бизнес-операцию.",features:["Корпоративные сайты","Электронная коммерция","Веб-приложения","Панели и интеграции"]}]}
} as const;

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

export const BusinessPillars = () => { const { language } = useTranslation(); const copy = COPY[language as keyof typeof COPY] ?? COPY.es; const localizedPillars = pillars.map((p,i)=>({...p,...copy.pillars[i]})); return (
  <section id="inteligencia-conversacional" className="section-padding section-alt-subtle" aria-labelledby="business-pillars-title">
    <div className="section-container">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
        <h2 id="business-pillars-title" className="text-3xl font-bold md:text-5xl">
          Construimos la conversación y todo lo que ocurre después.
        </h2>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          La inteligencia conversacional es el centro. El desarrollo web conecta esa inteligencia con clientes, equipos y operaciones.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {localizedPillars.map((pillar) => {
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
); };
