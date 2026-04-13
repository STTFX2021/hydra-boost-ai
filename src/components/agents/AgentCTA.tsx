import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { AgentData } from "@/data/agents";
import { getAdjacentAgents } from "@/data/agents";

interface Props {
  agent: AgentData;
}

export function AgentCTA({ agent }: Props) {
  const { prev, next } = getAdjacentAgents(agent.slug);

  return (
    <section className="section-padding section-alt">
      <div className="section-container">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto p-10 md:p-16 rounded-3xl border border-primary/20 mb-12"
          style={{
            background: "linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 8%))",
            boxShadow: "0 0 60px hsl(190 100% 50% / 0.06), 0 0 120px hsl(260 60% 55% / 0.04)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Listo para implementar este <span className="text-gradient-hydrai">agente</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Te ayudamos a evaluar cómo encaja en tu negocio. Auditoría gratuita y sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-base px-8">
                Solicitar Auditoría Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="text-base px-8 border-border/50 hover:bg-card">
                Hablar con HydrAI
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Navigation between agents */}
        <div className="grid md:grid-cols-2 gap-4">
          {prev && (
            <Link
              to={`/agentes-ia/${prev.slug}`}
              className="card-premium p-5 flex items-center gap-4 group hover:border-primary/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Anterior</span>
                <p className="font-display font-semibold text-sm truncate group-hover:text-primary transition-colors">
                  {prev.name}
                </p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={`/agentes-ia/${next.slug}`}
              className={`card-premium p-5 flex items-center justify-end gap-4 group hover:border-primary/30 transition-colors ${
                !prev ? "md:col-start-2" : ""
              }`}
            >
              <div className="min-w-0 text-right">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Siguiente</span>
                <p className="font-display font-semibold text-sm truncate group-hover:text-primary transition-colors">
                  {next.name}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          )}
        </div>

        {/* Back to catalog */}
        <div className="text-center mt-8">
          <Link
            to="/agentes-ia"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos los agentes
          </Link>
        </div>
      </div>
    </section>
  );
}
