import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Building2, Store, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="glow-orb-primary w-[600px] h-[600px] -top-64 -left-64" />
      <div className="glow-orb-secondary w-[500px] h-[500px] top-1/3 -right-48" />
      <div className="glow-orb-accent w-[400px] h-[400px] bottom-0 left-1/3" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge-primary mb-4 inline-flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Arquitectura de Automatización con IA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              <span className="text-gradient-primary">Arquitecturas de Automatización con IA</span>
              <br />
              <span className="text-foreground">que operan tu negocio 24/7</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              Diseñamos sistemas completos que conectan captación, operaciones y clientes 
              en una arquitectura autónoma. No vendemos herramientas sueltas — construimos 
              el sistema nervioso de tu empresa.
            </motion.p>

            {/* Level Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground font-medium">
                ¿Qué nivel de automatización necesitas?
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Level 1: Base */}
                <button
                  onClick={() => scrollTo('#implementaciones')}
                  className="group p-5 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 text-left"
                >
                  <Store className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-2">Implementaciones Base</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                    <li>• Webs como nodos de captación</li>
                    <li>• Agentes conversacionales</li>
                    <li>• Automatizaciones conectadas</li>
                  </ul>
                  <span className="text-primary text-sm font-medium group-hover:underline inline-flex items-center gap-1">
                    Ver soluciones <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                {/* Level 2: Enterprise */}
                <button
                  onClick={() => scrollTo('#enterprise')}
                  className="group p-5 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 hover:border-primary hover:shadow-neon-sm transition-all duration-300 text-left"
                >
                  <Building2 className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-2">Arquitectura Enterprise</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                    <li>• Event Bus + Orchestrators</li>
                    <li>• Workers especializados</li>
                    <li>• Agentes CEO/CFO/CTO</li>
                  </ul>
                  <span className="text-secondary text-sm font-medium group-hover:underline inline-flex items-center gap-1">
                    Ver arquitectura <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-base px-8">
                  Solicitar Auditoría de Automatización
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/casos">
                <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6">
                  Ver Casos Reales
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { label: "50+ workflows activos" },
                { label: "10K+ eventos/mes" },
                { label: "99.9% uptime" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="relative">
              {/* Architecture Diagram */}
              <div className="card-premium p-6 font-mono text-xs md:text-sm neon-border">
                <pre className="text-primary/90 leading-relaxed whitespace-pre-wrap">
{`┌─────────────────┐
│   EVENT BUS     │
│  (Supabase)     │
└────────┬────────┘
         │
    ┌────▼────┐
    │ORCHEST- │
    │ RATOR   │
    └─┬──┬──┬─┘
      │  │  │
 ┌────▼┐│ ┌▼────┐
 │LEADS││ │ OPS │
 │WORK ││ │WORK │
 └─────┘│ └─────┘
        │
    ┌───▼───┐
    │AGENTS │
    │C-LEVEL│
    └───────┘`}
                </pre>
                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Sistema activo procesando eventos...
                </div>
              </div>

              {/* Floating indicators */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 badge-success"
              >
                ↑ 10 eventos/min
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 badge-primary"
              >
                3 workers activos
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
