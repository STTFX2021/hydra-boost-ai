import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Gauge,
  Mic,
  Pizza,
  Settings2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SarahIntroDialog } from "@/components/landing/SarahIntroDialog";
import { VozraRapidLogo } from "@/components/brand/VozraRapidLogo";
import { productLinks } from "@/config/productLinks";

const products = [
  {
    name: "Vozra",
    title: "Reservas y atención inteligente",
    description: "Gestiona consultas, solicitudes de reserva, cambios, grupos, preferencias y excepciones operativas.",
    icon: CalendarDays,
    features: ["Atención telefónica", "Reservas y cambios", "Grupos y preferencias", "Restricciones alimentarias"],
    tone: "primary",
    href: "/restaurantes-ia-reservas-whatsapp-costa-del-sol",
    kind: "internal",
  },
  {
    name: "Vozra PID",
    title: "Pedidos Inteligentes Directos",
    description: "Recoge pedidos por teléfono, confirma productos y extras y entrega la información estructurada al negocio.",
    icon: Pizza,
    features: ["Carta y precios", "Extras y modificadores", "Recogida o entrega", "Confirmación del pedido"],
    tone: "success",
    href: productLinks.sarahDemo,
    kind: "sarah",
  },
  {
    name: "Vozra Control Center",
    title: "Configuración, supervisión y resultados",
    description: "Centraliza implementaciones, clientes, conversaciones, reservas, pedidos, permisos, integraciones y resultados.",
    icon: Gauge,
    features: ["Operación multiempresa", "Clientes y memoria", "Portal de resultados", "Usuarios y permisos"],
    tone: "secondary",
    href: productLinks.vozraApp,
    kind: "external",
  },
] as const;

export const VozraPlatformSection = () => (
  <section id="vozra" className="section-padding relative overflow-hidden" aria-labelledby="vozra-platform-title">
    <div className="absolute inset-0 bg-grid-hydrai opacity-55" aria-hidden />
    <div className="section-container relative z-10">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Settings2 className="h-4 w-4" />
            Ecosistema Vozra · Producto HydrAI Labs
          </div>
          <h2 id="vozra-platform-title" className="text-3xl font-bold md:text-5xl">
            Un único cerebro. Productos especializados.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            Vozra y Vozra PID conectan conversaciones, reglas del negocio, clientes y sistemas. HydrAI Labs configura y supervisa la complejidad desde un único Control Center.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={productLinks.vozraPortal} target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full border-white/15 bg-background/55 sm:w-auto">
              Ver portal cliente
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <SarahIntroDialog
            trigger={
              <Button className="btn-neon btn-depth w-full sm:w-auto">
                <Mic className="mr-2 h-4 w-4" />
                Habla con Sarah
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => {
          const Icon = product.icon;
          const toneClasses = {
            primary: "border-primary/25 bg-primary/10 text-primary",
            success: "border-success/25 bg-success/10 text-success",
            secondary: "border-secondary/25 bg-secondary/10 text-secondary",
          }[product.tone];

          const content = (
            <>
              {product.name === "Vozra PID" ? (
                <div className="flex h-24 items-center overflow-hidden rounded-2xl border border-white/10 bg-black/75 px-4">
                  <VozraRapidLogo className="h-20 w-full" />
                </div>
              ) : (
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${toneClasses}`}>
                  <Icon className="h-7 w-7" />
                </div>
              )}
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{product.name}</p>
              <h3 className="mt-2 text-2xl font-bold">{product.title}</h3>
              <p className="mt-4 min-h-[84px] leading-7 text-muted-foreground">{product.description}</p>
              <ul className="mt-6 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-primary">
                {product.kind === "sarah" ? "Probar ahora" : product.kind === "external" ? "Abrir dashboard" : "Conocer la solución"}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </>
          );

          if (product.kind === "sarah") {
            return (
              <SarahIntroDialog
                key={product.name}
                trigger={
                  <button type="button" className="card-elevated card-elevated-hover block w-full p-7 text-left">
                    {content}
                  </button>
                }
              />
            );
          }

          if (product.kind === "external") {
            return (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="card-elevated card-elevated-hover block p-7"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={product.name} to={product.href} className="card-elevated card-elevated-hover block p-7">
              {content}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-card/55 p-6 backdrop-blur-xl md:grid-cols-3 md:p-8">
        <div className="flex items-center gap-3">
          <UsersRound className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">Memoria del cliente</p>
            <p className="text-xs text-muted-foreground">Contexto, preferencias e historial.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Settings2 className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">Reglas configurables</p>
            <p className="text-xs text-muted-foreground">Cada negocio define su operación.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Gauge className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">Trazabilidad</p>
            <p className="text-xs text-muted-foreground">Decisiones y acciones supervisables.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
