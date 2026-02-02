import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Building2, Store, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export const HeroSection = () => {
  const { landing } = useLandingTranslation();
  const t = landing.hero;

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
          <motion.div 
            className="lg:col-span-3 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="badge-primary mb-4 inline-flex items-center gap-2">
                <Zap className="w-3 h-3" />
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              <span className="text-gradient-primary">{t.title1}</span>
              <br />
              <span className="text-foreground">{t.title2}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              {t.subtitle}
            </motion.p>

            {/* Level Selector */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                {t.levelQuestion}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Level 1: Base */}
                <motion.button
                  onClick={() => scrollTo('#implementaciones')}
                  className="group p-5 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 text-left"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Store className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-2">{t.baseTitle}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                    {t.baseFeatures.map((feature: string, i: number) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                  <span className="text-primary text-sm font-medium group-hover:underline inline-flex items-center gap-1">
                    {t.baseCta} <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.button>

                {/* Level 2: Enterprise */}
                <motion.button
                  onClick={() => scrollTo('#enterprise')}
                  className="group p-5 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 hover:border-primary hover:shadow-neon-sm transition-all duration-300 text-left"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Building2 className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-2">{t.enterpriseTitle}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                    {t.enterpriseFeatures.map((feature: string, i: number) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                  <span className="text-secondary text-sm font-medium group-hover:underline inline-flex items-center gap-1">
                    {t.enterpriseCta} <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-base px-8">
                  {t.ctaPrimary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/casos">
                <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6">
                  {t.ctaSecondary}
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4">
              {t.stats.map((label: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
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
                  {t.systemActive}
                </div>
              </div>

              {/* Floating indicators */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 badge-success"
              >
                {t.eventsPerMin}
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 badge-primary"
              >
                {t.workersActive}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
