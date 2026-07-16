import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  HeartPulse,
  Pizza,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";

const featuredProjects = [
  {
    title: "Vozra",
    sector: "Inteligencia conversacional",
    description: "Plataforma propia para atención, reservas, pedidos, memoria y lógica operacional.",
    status: "Producto propio",
    icon: Bot,
    href: "/arquitectura",
    external: false,
  },
  {
    title: "Vozra PID",
    sector: "Pedidos telefónicos",
    description: "Demostración conversacional de Sarah para pedidos inteligentes directos.",
    status: "Producto propio",
    icon: Pizza,
    href: VOZRA_RAPID_DEMOS.sarah.url,
    external: true,
  },
  {
    title: "La Locanda",
    sector: "Hostelería",
    description: "Carta digital, personalización de productos y sistema de pedidos para restauración.",
    status: "Implementación web",
    icon: UtensilsCrossed,
    href: "https://locanda-connect.lovable.app",
    external: true,
  },
  {
    title: "La Cruz Tapas",
    sector: "Hostelería",
    description: "Experiencia digital para reservas, carta, maridajes y pedidos desde mesa.",
    status: "Demo funcional",
    icon: UtensilsCrossed,
    href: "https://cruzatapas-digital-chic.lovable.app/",
    external: true,
  },
  {
    title: "Tu Hogar 21",
    sector: "Inmobiliaria",
    description: "Portal inmobiliario con búsqueda avanzada, captación y herramientas de cualificación.",
    status: "Demo funcional",
    icon: Building2,
    href: "https://tu-hogar-21-nextgen.lovable.app",
    external: true,
  },
  {
    title: "Vitality Hub",
    sector: "Belleza y salud",
    description: "Web de captación, servicios, reservas y chatbot especializado con enfoque responsable.",
    status: "Demo funcional",
    icon: HeartPulse,
    href: "https://body-harmony-leads.lovable.app",
    external: true,
  },
] as const;

export const FeaturedProjectsSection = () => (
  <section id="proyectos" className="section-padding section-alt-subtle" aria-labelledby="featured-projects-title">
    <div className="section-container">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Proyectos destacados</p>
          <h2 id="featured-projects-title" className="text-3xl font-bold md:text-5xl">
            Productos, implementaciones y demostraciones que ya puedes explorar.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            Mostramos claramente qué es producto propio, qué es una implementación y qué es una demostración funcional.
          </p>
        </div>

        <Link to="/casos">
          <Button variant="outline" className="w-full lg:w-auto">
            Ver todos los proyectos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => {
          const Icon = project.icon;
          const card = (
            <article className="card-elevated card-elevated-hover group h-full overflow-hidden p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {project.status}
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.sector}</p>
              <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-muted-foreground">{project.description}</p>

              <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-5 text-sm font-semibold text-primary">
                Ver proyecto
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          );

          return project.external ? (
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer">
              {card}
            </a>
          ) : (
            <Link key={project.title} to={project.href}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);
