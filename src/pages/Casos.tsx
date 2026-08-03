import { useMemo, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Dumbbell,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema, SEOHead } from "@/components/seo";
import {
  PROJECT_CATEGORIES,
  PROJECT_SHOWCASE,
  type ProjectCategory,
  type ProjectShowcaseItem,
} from "@/data/projectShowcase";
import { useTranslation } from "@/lib/i18n";

const COPY={
es:{view:"Ver proyecto",all:"Todos",categories:["Inteligencia conversacional","Hostelería","Inmobiliaria y reformas","Belleza y salud","Deporte","Comercio y proyectos personales"],statuses:["Producto propio","Implementación web","Demo funcional","Concepto demostrativo"],seo:"Proyectos y Demostraciones | HydrAI Labs",seoDescription:"Productos propios, implementaciones web y demostraciones funcionales.",home:"Inicio",projects:"Proyectos",eyebrow:"Portfolio HydrAI Labs",title:"Proyectos y demostraciones",description:"Productos propios, implementaciones y conceptos funcionales que conectan inteligencia conversacional, desarrollo web y operación.",catalog:"Catálogo de proyectos",singular:"proyecto",plural:"proyectos",cta:"{copy.cta}",ctaDescription:"{copy.ctaDescription}",contact:"{copy.contact}"},
en:{generic:true,details:[["Conversational system connected to real business operations.",["Voice agents","Business rules","Operational integration"]],["Digital hospitality experience for bookings, menus and orders.",["Bookings","Digital menu","Online orders"]],["Digital platform for property search, acquisition and qualification.",["Property search","Lead capture","Qualification"]],["Digital experience for services, bookings and customer acquisition.",["Services","Bookings","Lead capture"]],["Digital platform for sports services, customers and operations.",["Customer management","Bookings","Digital experience"]],["Digital commerce or personal project with a functional experience.",["Catalog","Conversion","Connected operation"]]],view:"View project",all:"All",categories:["Conversational intelligence","Hospitality","Real estate and renovation","Beauty and health","Sports","Commerce and personal projects"],statuses:["Own product","Web implementation","Functional demo","Demonstration concept"],seo:"Projects and Demos | HydrAI Labs",seoDescription:"Our products, web implementations and functional demonstrations.",home:"Home",projects:"Projects",eyebrow:"HydrAI Labs portfolio",title:"Projects and demonstrations",description:"Products, implementations and functional concepts connecting conversational intelligence, web development and business operations.",catalog:"Project catalog",singular:"project",plural:"projects",cta:"What system does your business need?",ctaDescription:"We can build the conversational agent, website, dashboard and integrations as one solution.",contact:"Tell us about your project"},
de:{generic:true,details:[["Gesprächssystem, verbunden mit realen Geschäftsabläufen.",["Sprachagenten","Geschäftsregeln","Operative Integration"]],["Digitale Gastronomie-Erfahrung für Reservierungen, Karten und Bestellungen.",["Reservierungen","Digitale Karte","Online-Bestellungen"]],["Digitale Plattform für Immobiliensuche, Akquise und Qualifizierung.",["Immobiliensuche","Lead-Erfassung","Qualifizierung"]],["Digitale Erfahrung für Leistungen, Reservierungen und Akquise.",["Leistungen","Reservierungen","Lead-Erfassung"]],["Digitale Plattform für Sportangebote, Kunden und Betrieb.",["Kundenverwaltung","Reservierungen","Digitale Erfahrung"]],["Digitaler Handel oder persönliches Projekt mit funktionaler Erfahrung.",["Katalog","Conversion","Vernetzter Betrieb"]]],view:"Projekt ansehen",all:"Alle",categories:["Conversational Intelligence","Gastronomie","Immobilien und Renovierung","Beauty und Gesundheit","Sport","Handel und persönliche Projekte"],statuses:["Eigenes Produkt","Webimplementierung","Funktionale Demo","Demonstrationskonzept"],seo:"Projekte und Demos | HydrAI Labs",seoDescription:"Eigene Produkte, Webimplementierungen und funktionale Demonstrationen.",home:"Start",projects:"Projekte",eyebrow:"HydrAI Labs Portfolio",title:"Projekte und Demonstrationen",description:"Produkte, Implementierungen und funktionale Konzepte, die Conversational Intelligence, Webentwicklung und Betrieb verbinden.",catalog:"Projektkatalog",singular:"Projekt",plural:"Projekte",cta:"Welches System braucht Ihr Unternehmen?",ctaDescription:"Wir können Gesprächsagent, Website, Dashboard und Integrationen als eine Lösung entwickeln.",contact:"Erzählen Sie uns von Ihrem Projekt"},
ru:{generic:true,details:[["Разговорная система, связанная с реальными операциями бизнеса.",["Голосовые агенты","Бизнес-правила","Операционная интеграция"]],["Цифровой сервис для бронирований, меню и заказов.",["Бронирования","Цифровое меню","Онлайн-заказы"]],["Цифровая платформа для поиска недвижимости, привлечения и квалификации.",["Поиск недвижимости","Привлечение лидов","Квалификация"]],["Цифровой сервис для услуг, бронирований и привлечения клиентов.",["Услуги","Бронирования","Привлечение клиентов"]],["Цифровая платформа для спортивных услуг, клиентов и операций.",["Управление клиентами","Бронирования","Цифровой сервис"]],["Цифровая торговля или личный проект с функциональным интерфейсом.",["Каталог","Конверсия","Связанные операции"]]],view:"Посмотреть проект",all:"Все",categories:["Разговорный ИИ","Гостеприимство","Недвижимость и ремонт","Красота и здоровье","Спорт","Торговля и личные проекты"],statuses:["Собственный продукт","Веб-внедрение","Функциональное демо","Демонстрационная концепция"],seo:"Проекты и демо | HydrAI Labs",seoDescription:"Собственные продукты, веб-внедрения и функциональные демонстрации.",home:"Главная",projects:"Проекты",eyebrow:"Портфолио HydrAI Labs",title:"Проекты и демонстрации",description:"Продукты, внедрения и рабочие концепции, объединяющие разговорный ИИ, веб-разработку и бизнес-операции.",catalog:"Каталог проектов",singular:"проект",plural:"проектов",cta:"Какая система нужна вашему бизнесу?",ctaDescription:"Мы можем создать разговорного агента, сайт, панель и интеграции как единое решение.",contact:"Рассказать о проекте"}} as const;
const categoryKeys=["Inteligencia conversacional","Hostelería","Inmobiliaria y reformas","Belleza y salud","Deporte","Comercio y proyectos personales"] as const;
const statusKeys=["Producto propio","Implementación web","Demo funcional","Concepto demostrativo"] as const;

const categoryIcons: Record<ProjectCategory, ComponentType<{ className?: string }>> = {
  "Inteligencia conversacional": Bot,
  Hostelería: UtensilsCrossed,
  "Inmobiliaria y reformas": Building2,
  "Belleza y salud": HeartPulse,
  Deporte: Dumbbell,
  "Comercio y proyectos personales": ShoppingBag,
};

const statusClasses = {
  "Producto propio": "border-primary/25 bg-primary/10 text-primary",
  "Implementación web": "border-secondary/25 bg-secondary/10 text-secondary",
  "Demo funcional": "border-success/25 bg-success/10 text-success",
  "Concepto demostrativo": "border-warning/25 bg-warning/10 text-warning",
} as const;

const ProjectCard = ({ project, copy }: { project: ProjectShowcaseItem; copy: (typeof COPY)[keyof typeof COPY] }) => {
  const Icon = categoryIcons[project.category];
  const categoryIndex=categoryKeys.indexOf(project.category);
  const generic = "generic" in copy ? copy.details[categoryIndex] : null;
  const projectDescription = generic ? generic[0] : project.description;
  const projectCapabilities = generic ? generic[1] : project.capabilities;

  const content = (
    <article className="card-elevated card-elevated-hover group flex h-full flex-col p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusClasses[project.status]}`}>
          {copy.statuses[statusKeys.indexOf(project.status)]}
        </span>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{copy.categories[categoryKeys.indexOf(project.category)]}</p>
      <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{projectDescription}</p>

      <ul className="mt-6 space-y-2">
        {projectCapabilities.map((capability) => (
          <li key={capability} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
            {capability}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-5 text-sm font-semibold text-primary">
        {copy.view}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );

  return project.external ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${project.title}`}>
      {content}
    </a>
  ) : (
    <Link to={project.href} aria-label={`Ver ${project.title}`}>
      {content}
    </Link>
  );
};

const Casos = () => {
  const { language }=useTranslation();
  const copy=COPY[language as keyof typeof COPY]??COPY.es;
  const [activeCategory, setActiveCategory] = useState<(typeof PROJECT_CATEGORIES)[number]>("Todos");

  const visibleProjects = useMemo(
    () =>
      activeCategory === "Todos"
        ? PROJECT_SHOWCASE
        : PROJECT_SHOWCASE.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <SEOHead
        title={copy.seo}
        description={copy.seoDescription}
        canonical="/casos"
      />
      <BreadcrumbSchema
        items={[
          { name: copy.home, url: "/" },
          { name: copy.projects, url: "/casos" },
        ]}
      />

      <PageLayout>
        <section className="relative overflow-hidden pb-14 pt-20 md:pb-20 md:pt-28" aria-labelledby="projects-title">
          <div className="absolute inset-0 bg-mesh-hydrai" />
          <div className="glow-orb-primary -left-24 top-12 h-72 w-72 opacity-10" />
          <div className="section-container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
              <h1 id="projects-title" className="text-4xl font-bold md:text-6xl">
                {copy.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                {copy.description}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28" aria-label={copy.catalog}>
          <div className="section-container">
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                    activeCategory === category
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                      : "border-border/60 bg-card/50 text-muted-foreground hover:border-primary/35 hover:text-foreground"
                  }`}
                  aria-pressed={activeCategory === category}
                >
                  {category === "Todos" ? copy.all : copy.categories[categoryKeys.indexOf(category as typeof categoryKeys[number])]}
                </button>
              ))}
            </div>

            <div className="mb-6 text-sm text-muted-foreground">
              {visibleProjects.length} {visibleProjects.length === 1 ? copy.singular : copy.plural}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} copy={copy} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding section-alt-subtle" aria-labelledby="projects-cta-title">
          <div className="section-container">
            <div className="gradient-border mx-auto max-w-3xl rounded-[2rem] bg-card/70 p-8 text-center md:p-12">
              <h2 id="projects-cta-title" className="text-3xl font-bold md:text-4xl">
                ¿Qué sistema necesita tu negocio?
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
                Podemos construir el agente conversacional, la web, el panel y las integraciones como una sola solución.
              </p>
              <Link to="/contacto" className="mt-8 inline-block">
                <Button size="lg" className="btn-neon btn-depth">
                  Cuéntanos tu proyecto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Casos;
