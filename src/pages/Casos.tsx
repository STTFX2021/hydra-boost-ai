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

const ProjectCard = ({ project }: { project: ProjectShowcaseItem }) => {
  const Icon = categoryIcons[project.category];

  const content = (
    <article className="card-elevated card-elevated-hover group flex h-full flex-col p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusClasses[project.status]}`}>
          {project.status}
        </span>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.category}</p>
      <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>

      <ul className="mt-6 space-y-2">
        {project.capabilities.map((capability) => (
          <li key={capability} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
            {capability}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-5 text-sm font-semibold text-primary">
        Ver proyecto
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
        title="Proyectos y Demostraciones | HydrAI Labs"
        description="Explora productos propios, implementaciones web y demostraciones funcionales de inteligencia conversacional, hostelería, inmobiliaria, salud, deporte y comercio."
        canonical="/casos"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/casos" },
        ]}
      />

      <PageLayout>
        <section className="relative overflow-hidden pb-14 pt-20 md:pb-20 md:pt-28" aria-labelledby="projects-title">
          <div className="absolute inset-0 bg-mesh-hydrai" />
          <div className="glow-orb-primary -left-24 top-12 h-72 w-72 opacity-10" />
          <div className="section-container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Portfolio HydrAI Labs</p>
              <h1 id="projects-title" className="text-4xl font-bold md:text-6xl">
                Proyectos y <span className="text-gradient-hydrai">demostraciones</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Productos propios, implementaciones y conceptos funcionales que muestran cómo conectamos inteligencia conversacional, desarrollo web y operación de negocio.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28" aria-label="Catálogo de proyectos">
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
                  {category}
                </button>
              ))}
            </div>

            <div className="mb-6 text-sm text-muted-foreground">
              {visibleProjects.length} {visibleProjects.length === 1 ? "proyecto" : "proyectos"}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
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
