import { ArrowUpRight, Mic, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";

export const SarahDemoStrip = () => (
  <section aria-label="Demostraciones de Vozra Rapid" className="section-padding pt-0">
    <div className="section-container">
      <div className="card-elevated overflow-hidden p-6 md:p-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <PhoneCall className="h-4 w-4" />
              {VOZRA_RAPID_DEMOS.productName}
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Escucha cómo atiende una llamada real de pedidos.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Habla con Sarah desde el navegador o abre la demostración estable de {VOZRA_RAPID_DEMOS.tagline.toLowerCase()}.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={VOZRA_RAPID_DEMOS.sarah.url} target="_blank" rel="noopener noreferrer">
              <Button className="btn-neon btn-depth w-full sm:w-auto">
                <Mic className="mr-2 h-4 w-4" />
                {VOZRA_RAPID_DEMOS.sarah.label}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href={VOZRA_RAPID_DEMOS.stable.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full sm:w-auto">
                {VOZRA_RAPID_DEMOS.stable.label}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
