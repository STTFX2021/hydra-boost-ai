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
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";

const products = [
  {
    name: "Vozra Reserve",
    title: "Reservas y atención inteligente",
    description: "Gestiona consultas, solicitudes de reserva, cambios, grupos, preferencias y excepciones operativas.",
    icon: CalendarDays,
    features: ["Atención telefónica", "Reservas y cambios", "Grupos y preferencias", "Restricciones alimentarias"],
    tone: "primary",
    href: "/restaurantes-ia-reservas-whatsapp-costa-del-sol",
    external: false,
  },
  {
    name: "Vozra Rapid",
    title: "Pedidos Inteligentes Directos",
    description: "Recoge pedidos por teléfono, confirma productos y extras y entrega la información estructurada al negocio.",
    icon: Pizza,
    features: ["Carta y precios", "Extras y modificadores", "Recogida o entrega", "Confirmación del pedido"],
    tone: "success",
    href: VOZRA_RAPID_DEMOS.sarah.url,
    external: true,
  },
  {
    name: "Vozra Control Center",
    title: "Configuración y supervisión",
    description: "Centraliza horarios, reglas, clientes, conversaciones, reservas, pedidos, permisos e integraciones.",
    icon: Gauge,
    features: ["Configuración multiempresa", "Clientes y memoria", "Operaciones en tiempo real", "Usuarios y permisos"],
    tone: "secondary",
    href: "/arquitectura",
    external: false,
  },
] as const;

export const VozraPlatformSection = () => (
  <section id="vozra" className="section-padding relative overflow-hidden" aria-labelledby="vozra-platform-title">
    <div className="glow-orb-primary -left-28 top-20 h-64 w-64 opacity-10" />
    <div className="section-container relative z-10">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Settings2 className="h-4 w-4" />
            Plataforma Vozra
          </div>
          <h2 id="vozra-platform-title" className="text-3xl font-bold md:text-5xl">
            Un único cerebro. Tres soluciones operativas.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            Vozra conecta conversaciones, reglas del negocio, clientes y sistemas para que cada llamada produzca un resultado útil y verificable.
          </p>
        </div>

        <a href={VOZRA_RAPID_DEMOS.sarah.url} target="_blank" rel="noopener noreferrer">
          <Button className="btn-neon btn-depth w-full lg:w-auto">
            <Mic className="mr-2 h-4 w-4" />
            Habla con Sarah
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
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
              {product.name === "Vozra Rapid" ? (
                <div className="flex h-24 items-center overflow-hidden rounded-2xl border border-border/60 bg-black/70 px-4">
                  <img
                    src="/brand/vozra/vozra-rapid-logo.svg"
                    alt="Vozra Rapid — Pedidos Inteligentes Directos"
                    className="h-20 w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
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
                {product.name === "Vozra Rapid" ? "Probar ahora" : "Conocer la solución"}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </>
          );

          return product.external ? (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-elevated card-elevated-hover block p-7"
            >
              {content}
            </a>
          ) : (
            <Link key={product.name} to={product.href} className="card-elevated card-elevated-hover block p-7">
              {content}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-border/50 bg-card/45 p-6 backdrop-blur md:grid-cols-3 md:p-8">
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
