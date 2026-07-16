import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const capabilities = [
  { icon: Globe2, title: "Webs corporativas", detail: "Posicionamiento, captación y conversión." },
  { icon: ShoppingCart, title: "E-commerce", detail: "Catálogo, pedidos y pagos." },
  { icon: LayoutDashboard, title: "Aplicaciones y paneles", detail: "Herramientas internas y control operativo." },
  { icon: Database, title: "Integraciones", detail: "Datos, CRM, automatizaciones y APIs." },
];

export const WebDevelopmentSection = () => (
  <section id="desarrollo-web" className="section-padding section-alt-subtle" aria-labelledby="web-development-title">
    <div className="section-container">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            <Code2 className="h-4 w-4" />
            Desarrollo web orientado a negocio
          </div>
          <h2 id="web-development-title" className="text-3xl font-bold md:text-5xl">
            La infraestructura digital que convierte conversaciones en resultados.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            Diseñamos webs, aplicaciones y paneles conectados con la operación real de tu empresa. No entregamos una página aislada: construimos el sistema que capta, organiza y mueve el trabajo.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              "Diseño responsive y optimizado para conversión",
              "SEO técnico y estructura escalable",
              "Conexión con formularios, CRM, reservas y pedidos",
              "Automatizaciones y agentes integrados desde el inicio",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/casos">
              <Button className="w-full sm:w-auto">
                Ver proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" className="w-full sm:w-auto">
                Cuéntanos tu proyecto
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 blur-2xl" />
          <div className="relative grid gap-4 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, detail }, index) => (
              <article
                key={title}
                className={`card-elevated card-elevated-hover p-6 ${index === 1 || index === 2 ? "sm:translate-y-6" : ""}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>

          <div className="relative mx-auto mt-10 flex max-w-md items-center gap-4 rounded-2xl border border-primary/20 bg-background/70 p-4 shadow-xl backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Blocks className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Todo conectado</p>
              <p className="text-xs text-muted-foreground">Web, conversación, datos y automatización en una sola arquitectura.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
