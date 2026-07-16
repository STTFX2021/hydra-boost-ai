import { ArrowRight, Mic, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";

export const HomeFinalCTA = () => (
  <section className="section-padding relative overflow-hidden" aria-labelledby="home-final-cta-title">
    <div className="glow-orb-primary left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 opacity-10" />
    <div className="section-container relative z-10">
      <div className="gradient-border overflow-hidden rounded-[2rem] bg-card/70 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
          <PhoneCall className="h-7 w-7" />
        </div>
        <h2 id="home-final-cta-title" className="mx-auto mt-7 max-w-3xl text-3xl font-bold md:text-5xl">
          Cada conversación debería mover tu negocio.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
          Prueba la experiencia de Vozra Rapid o cuéntanos qué proceso quieres automatizar, conectar o convertir en producto.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={VOZRA_RAPID_DEMOS.sarah.url} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="btn-neon btn-depth w-full sm:w-auto">
              <Mic className="mr-2 h-5 w-5" />
              Habla con Sarah
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <Link to="/contacto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Cuéntanos tu proyecto
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
