import { motion } from "framer-motion";
import { Brain, Cpu, Users, BarChart3, Target, Wrench, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const automations = [
  {
    icon: Brain,
    title: "Opportunity Intelligence Engine",
    features: [
      "Radar de tendencias cada 6h",
      "Scoring agresivo de prospectos",
      "Mensajes de venta automáticos",
      "Búsqueda activa de clientes",
    ],
    result: "3x conversión pipeline",
  },
  {
    icon: Cpu,
    title: "Orchestrator de Eventos",
    features: [
      "Event Bus procesa 10K+ eventos/mes",
      "Workers especializados (Leads, OPS)",
      "Routing inteligente por tipo",
      "Auto-remediación P0/P1/P2",
    ],
    result: "0 downtime, <2min",
  },
  {
    icon: Users,
    title: "Agentes C-Level Autónomos",
    features: [
      "CEO: Estrategia y prioridades",
      "CFO: Decisiones financieras",
      "CTO: Research técnico",
      "Legal: Compliance automático",
    ],
    result: "24/7 sin bloqueos",
  },
  {
    icon: BarChart3,
    title: "Master Inventory Analyzer",
    features: [
      "Análisis de workflows activos",
      "Recursos ociosos detectados",
      "Reportes de salud diarios",
      "Optimización de costos",
    ],
    result: "40% reducción costos",
  },
  {
    icon: Target,
    title: "Lead Intelligence Engine",
    features: [
      "Intake multicanal integrado",
      "Clasificación automática con IA",
      "Nurturing personalizado",
      "Integración CRM/Supabase",
    ],
    result: "70% menos tiempo",
  },
  {
    icon: Wrench,
    title: "SRE Guardian System",
    features: [
      "Monitoreo continuo 24/7",
      "Health checks automáticos",
      "Remediación inteligente",
      "Alertas multi-canal P0/P1/P2",
    ],
    result: "Auto-sanador 24/7",
  },
];

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

const comparisonOthers = [
  "Chatbot FAQ básico (200 respuestas)",
  "Automatizaciones aisladas y manuales",
  "Plantillas genéricas para todos",
  "Soporte reactivo (9-5 laborables)",
  "Asistentes simples con reglas fijas",
];

const comparisonUs = [
  "Event Bus que procesa 10K+ eventos/mes",
  "Orchestrator central con workers especializados",
  "Arquitecturas enterprise personalizadas",
  "Auto-remediación SRE Guardian 24/7",
  "Agentes CEO, CFO, CTO, Legal autónomos",
];

export const EnterpriseElite = () => {
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
            🏢 Arquitectura Enterprise Elite
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Sistemas de Automatización <span className="text-gradient-secondary">a Nivel Enterprise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Event Bus, Orchestrators, Workers especializados y Agentes Autónomos C-Level. 
            Arquitecturas que procesan miles de eventos sin intervención humana.
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
            La Diferencia Enterprise
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Others */}
            <motion.div 
              variants={comparisonVariants}
              className="card-premium p-6 border-destructive/30"
            >
              <h4 className="font-display font-semibold text-lg mb-4 text-muted-foreground">
                Otras Agencias de IA
              </h4>
              <ul className="space-y-3">
                {comparisonOthers.map((item, i) => (
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
                HydrAI Labs Enterprise
              </h4>
              <ul className="space-y-3">
                {comparisonUs.map((item, i) => (
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
            Nuestras Automatizaciones Enterprise
          </h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {automations.map((auto, i) => (
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
                  <auto.icon className="w-10 h-10 text-secondary mb-4" />
                </motion.div>
                <h4 className="font-display font-semibold text-lg mb-3">{auto.title}</h4>
                <ul className="space-y-1 mb-4">
                  {auto.features.map((f, j) => (
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
            ))}
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
              <div key={i} className="text-center">
                <div className="step-indicator mx-auto mb-3 w-10 h-10 text-sm">{step.num}</div>
                <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
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
            <div key={i} className="card-premium text-center py-6">
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
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
              Solicitar Auditoría Enterprise
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
