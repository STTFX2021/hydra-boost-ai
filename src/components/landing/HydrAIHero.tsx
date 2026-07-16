import { ArrowRight, BrainCircuit, Headphones, Mic, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";
import { HeroConversationVisual } from "@/components/landing/HeroConversationVisual";

const proofPoints = [
  { icon: Headphones, label: "Atención continua" },
  { icon: BrainCircuit, label: "Reglas de negocio" },
  { icon: ShieldCheck, label: "Supervisión humana" },
];

export const HydrAIHero = () => (
  <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40" aria-labelledby="home-hero-title">
    <div className="absolute inset-0 bg-mesh-hydrai" />
    <div className="glow-orb-primary -left-40 top-20 h-96 w-96 opacity-10" />
    <div className="glow-orb-secondary -right-32 top-10 h-80 w-80 opacity-10" />

    <div className="section-container relative z-10">
      <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] xl:gap-20">
        <div className="max-w-2xl">
          <div className="badge-primary mb-6 inline-flex items-center gap-2">
            <Mic className="h-3.5 w-3.5" />
            Inteligencia conversacional para negocios
          </div>

          <h1 id="home-hero-title" className="text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl xl:text-7xl">
            El futuro de tu negocio
            <span className="mt-2 block text-gradient-hydrai text-glow-violet">habla por ti.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            Creamos sistemas conversacionales altamente especializados para tu negocio. Atienden llamadas,
            gestionan reservas, toman pedidos y conectan cada conversación con la operación real de tu empresa.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={VOZRA_RAPID_DEMOS.sarah.url} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-neon btn-depth w-full sm:w-auto">
                <Mic className="mr-2 h-5 w-5" />
                Habla con Sarah
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="w-full border-border/70 bg-background/40 sm:w-auto">
                Solicitar una demo
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {proofPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <HeroConversationVisual />
      </div>
    </div>
  </section>
);
