import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const metrics = [
  { value: "15h", label: "Ahorro semanal promedio", icon: Clock },
  { value: "7 días", label: "Setup completo", icon: Calendar },
  { value: "4.9/5", label: "Satisfacción cliente", icon: Star },
];

export const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="glow-orb-primary w-[600px] h-[600px] -top-64 -left-64" />
      <div className="glow-orb-secondary w-[400px] h-[400px] top-1/2 -right-48 opacity-60" />

      <div className="section-container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badge */}
          <motion.div variants={itemVariants}>
            <span className="badge-primary inline-flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              +120 negocios automatizados en 2024
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-foreground">Automatiza tu negocio</span>
            <br />
            <span className="text-gradient-primary">con IA en 7 días</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Reducimos hasta <span className="text-foreground font-semibold">15h/semana</span> de tareas repetitivas.
            Chatbots, automatizaciones y CRM sin código.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[240px]">
                Agenda diagnóstico gratis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <button onClick={() => scrollTo('#casos-uso')}>
              <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6 h-12 min-w-[200px]">
                Ver casos de éxito
              </Button>
            </button>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-border/40 mt-8 max-w-lg mx-auto"
          >
            {metrics.map(({ value, label, icon: Icon }) => (
              <div key={value} className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-2xl sm:text-3xl font-display font-bold text-foreground">{value}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
