import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { AgentData } from "@/data/agents";

interface AgentHeroProps {
  agent: AgentData;
}

export function AgentHero({ agent }: AgentHeroProps) {
  const Icon = agent.icon;

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 30%, hsl(260 60% 55% / 0.06), transparent 60%)," +
              "radial-gradient(ellipse 50% 40% at 70% 60%, hsl(190 100% 50% / 0.04), transparent 50%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/agentes-ia" className="hover:text-foreground transition-colors">Agentes IA</Link>
            <span>/</span>
            <span className="text-foreground">{agent.name}</span>
          </nav>

          {/* Category badge */}
          <span className="badge-secondary mb-6 inline-flex items-center gap-2">
            <Icon className="w-3.5 h-3.5" />
            {agent.category}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            {agent.headline.split(",")[0]}
            {agent.headline.includes(",") && (
              <>
                ,<br />
                <span className="text-gradient-hydrai">{agent.headline.split(",").slice(1).join(",").trim()}</span>
              </>
            )}
            {!agent.headline.includes(",") && ""}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            {agent.subheadline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-base px-8">
                Solicitar auditoría gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#workflow">
              <Button size="lg" variant="outline" className="text-base px-8 border-border/50 hover:bg-card">
                Ver cómo funciona
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-32 right-8 hidden lg:block"
        >
          <Link
            to="/agentes-ia"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos los agentes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
