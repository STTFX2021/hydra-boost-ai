import { motion } from "framer-motion";
import { Brain, Cpu, Users, BarChart3, Target, Wrench, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";

const icons = [Brain, Cpu, Users, BarChart3, Target, Wrench];

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const comparisonVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
};

export const EnterpriseElite = () => {
  const { landing } = useLandingTranslation();
  const t = landing.enterprise;

  return (
    <section id="enterprise" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="glow-orb-secondary w-[500px] h-[500px] top-0 right-0 opacity-20" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-secondary mb-4 inline-flex items-center gap-2">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t.title.split('Enterprise')[0]}<span className="text-gradient-secondary">Enterprise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="mb-20"
        >
          <h3 className="text-2xl font-display font-semibold text-center mb-8">
            {t.comparisonTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Others */}
            <motion.div 
              variants={comparisonVariants}
              className="card-premium p-6 border-destructive/30"
            >
              <h4 className="font-display font-semibold text-lg mb-4 text-muted-foreground">
                {t.othersTitle}
              </h4>
              <ul className="space-y-3">
                {t.othersFeatures.map((item: string, i: number) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Us */}
            <motion.div 
              variants={comparisonVariants}
              className="card-premium p-6 border-primary/50 neon-border"
            >
              <h4 className="font-display font-semibold text-lg mb-4 text-gradient-primary">
                {t.usTitle}
              </h4>
              <ul className="space-y-3">
                {t.usFeatures.map((item: string, i: number) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Automations Grid with Stagger */}
        <div className="mb-20">
          <h3 className="text-2xl font-display font-semibold text-center mb-8">
            {t.automationsTitle}
          </h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {t.automations.map((auto: { icon: string; title: string; features: string[]; result: string }, i: number) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="card-premium group cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-10 h-10 text-secondary mb-4" />
                  </motion.div>
                  <h4 className="font-display font-semibold text-lg mb-3">{auto.title}</h4>
                  <ul className="space-y-1 mb-4">
                    {auto.features.map((f: string, j: number) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-secondary">•</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">📈 Resultado: </span>
                    <span className="text-sm font-semibold text-success">{auto.result}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-display font-semibold text-center mb-2">
            Arquitectura Enterprise de Automatización
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Así es cómo procesamos miles de eventos sin intervención manual
          </p>
          
          <div className="card-premium p-6 md:p-8 font-mono text-xs md:text-sm max-w-4xl mx-auto">
            <pre className="text-primary/80 leading-relaxed overflow-x-auto">
{`                 ┌─────────────────┐
                 │   WEB / FORMS   │
                 │  WhatsApp / IG  │
                 └────────┬────────┘
                          │ webhooks
                 ┌────────▼────────┐
                 │  LEAD INTAKE    │
                 │   (normalize)   │
                 └────────┬────────┘
                          │
           ┌──────────────┼──────────────┐
           │              │              │
 ┌─────────▼──────┐  ┌───▼────┐  ┌──────▼─────┐
 │   SUPABASE     │  │ EVENT  │  │  DISCORD   │
 │   (database)   │  │  BUS   │  │ (notifs)   │
 └────────────────┘  └───┬────┘  └────────────┘
                         │ events
                ┌────────▼────────┐
                │  ORCHESTRATOR   │
                │    ROUTER       │
                │ (event routing) │
                └─┬─────┬────┬───┘
                  │     │    │
        ┌─────────▼┐  ┌─▼──┐ └──┐
        │  LEADS   │  │OPS │    │
        │  WORKER  │  │WORK│    │
        └─────┬────┘  └─┬──┘    │
              │         │        │
        ┌─────▼─────────▼────┐  │
        │    SUPABASE        │  │
        │ (leads/incidents)  │  │
        └────────────────────┘  │
                                │
                     ┌──────────▼────────┐
                     │  INVENTORY        │
                     │  ANALYZER         │
                     │  (daily reports)  │
                     └───────────────────┘`}
            </pre>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            {[
              { num: "1", title: "Captura de Eventos", desc: "Todos los inputs entran por webhooks estandarizados al Event Bus" },
              { num: "2", title: "Orquestación Inteligente", desc: "El Orchestrator analiza y enruta al worker correcto según event_type" },
              { num: "3", title: "Ejecución Autónoma", desc: "Los workers ejecutan acciones sin intervención humana" },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="step-indicator mx-auto mb-3 w-10 h-10 text-sm">{step.num}</div>
                <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50+", label: "Workflows en producción" },
            { value: "10,000+", label: "Eventos procesados/mes" },
            { value: "99.9%", label: "Uptime con auto-remediación" },
            { value: "40%", label: "Reducción de costos promedio" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="card-premium text-center py-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/auditoria">
            <Button size="lg" className="bg-gradient-to-r from-secondary to-primary text-primary-foreground hover:opacity-90">
              {t.waitlistCta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
