import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";
import LiteYouTube from "./LiteYouTube";
import { HERO_DEMO_VIDEO_ID } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const floatDelayedAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 0.5,
  },
};

export const HeroWorld = () => {
  const { language } = useLandingTranslation();
  const content = {
    es: {
      badge: "#1 en Automatización IA para Negocios Locales",
      title1: "Automatizaciones IA que",
      title2: "traen clientes 24/7",
      subtitle: "Chatbots inteligentes + Webs profesionales + Automatizaciones sin código.",
      subtitleBold: "Convierte visitantes en clientes mientras duermes.",
      ctaPrimary: "Solicitar Auditoría Técnica",
      ctaSecondary: "Ver Casos de Éxito",
      trust: ["Sin permanencia", "Setup en 7 días", "Soporte 24/7"],
      stat1: "+127%",
      stat1Label: "Leads automatizados",
      stat2: "24/7",
      stat2Label: "Atención al cliente",
      videoTitle: "Ver demo en acción",
      watchDemo: "Ver Demo",
    },
    en: {
      badge: "#1 in AI Automation for Local Businesses",
      title1: "AI Automations that",
      title2: "bring customers 24/7",
      subtitle: "Smart chatbots + Professional websites + No-code automations.",
      subtitleBold: "Convert visitors into customers while you sleep.",
      ctaPrimary: "Request Technical Audit",
      ctaSecondary: "View Success Cases",
      trust: ["No commitment", "7-day setup", "24/7 support"],
      stat1: "+127%",
      stat1Label: "Automated leads",
      stat2: "24/7",
      stat2Label: "Customer support",
      videoTitle: "Watch demo in action",
      watchDemo: "Watch Demo",
    },
    fr: {
      badge: "#1 en Automatisation IA pour les Entreprises Locales",
      title1: "Automatisations IA qui",
      title2: "attirent des clients 24/7",
      subtitle: "Chatbots intelligents + Sites web professionnels + Automatisations sans code.",
      subtitleBold: "Convertissez les visiteurs en clients pendant que vous dormez.",
      ctaPrimary: "Demander un Audit Technique",
      ctaSecondary: "Voir les Cas de Succès",
      trust: ["Sans engagement", "Setup en 7 jours", "Support 24/7"],
      stat1: "+127%",
      stat1Label: "Leads automatisés",
      stat2: "24/7",
      stat2Label: "Service client",
      videoTitle: "Voir la démo en action",
      watchDemo: "Voir la Démo",
    },
    de: {
      badge: "#1 in KI-Automatisierung für lokale Unternehmen",
      title1: "KI-Automatisierungen, die",
      title2: "Kunden 24/7 bringen",
      subtitle: "Intelligente Chatbots + Professionelle Websites + No-Code-Automatisierungen.",
      subtitleBold: "Verwandeln Sie Besucher in Kunden, während Sie schlafen.",
      ctaPrimary: "Technisches Audit anfordern",
      ctaSecondary: "Erfolgsgeschichten ansehen",
      trust: ["Keine Bindung", "7 Tage Setup", "24/7 Support"],
      stat1: "+127%",
      stat1Label: "Automatisierte Leads",
      stat2: "24/7",
      stat2Label: "Kundensupport",
      videoTitle: "Demo ansehen",
      watchDemo: "Demo ansehen",
    },
    pt: {
      badge: "#1 em Automação IA para Negócios Locais",
      title1: "Automações IA que",
      title2: "trazem clientes 24/7",
      subtitle: "Chatbots inteligentes + Sites profissionais + Automações sem código.",
      subtitleBold: "Converta visitantes em clientes enquanto você dorme.",
      ctaPrimary: "Solicitar Auditoria Técnica",
      ctaSecondary: "Ver Casos de Sucesso",
      trust: ["Sem compromisso", "Setup em 7 dias", "Suporte 24/7"],
      stat1: "+127%",
      stat1Label: "Leads automatizados",
      stat2: "24/7",
      stat2Label: "Atendimento ao cliente",
      videoTitle: "Ver demo em ação",
      watchDemo: "Ver Demo",
    },
    it: {
      badge: "#1 in Automazione IA per Aziende Locali",
      title1: "Automazioni IA che",
      title2: "portano clienti 24/7",
      subtitle: "Chatbot intelligenti + Siti web professionali + Automazioni senza codice.",
      subtitleBold: "Converti i visitatori in clienti mentre dormi.",
      ctaPrimary: "Richiedi Audit Tecnico",
      ctaSecondary: "Vedi Casi di Successo",
      trust: ["Senza impegno", "Setup in 7 giorni", "Supporto 24/7"],
      stat1: "+127%",
      stat1Label: "Lead automatizzati",
      stat2: "24/7",
      stat2Label: "Assistenza clienti",
      videoTitle: "Guarda la demo",
      watchDemo: "Guarda Demo",
    },
  };

  const t = content[language] || content.es;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="glow-orb-primary w-[700px] h-[700px] -top-80 -left-80 opacity-30" />
      <div className="glow-orb-secondary w-[600px] h-[600px] top-1/4 -right-60 opacity-20" />
      <div className="glow-orb-accent w-[500px] h-[500px] bottom-0 left-1/4 opacity-20" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {t.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.1]"
            >
              {t.title1}
              <span className="block text-gradient-primary">
                {t.title2}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              {t.subtitle}
              <span className="block mt-2 font-semibold text-foreground">
                {t.subtitleBold}
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-base px-8 py-6 group w-full sm:w-auto">
                  {t.ctaPrimary}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/casos">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-outline-neon text-base px-8 py-6 w-full sm:w-auto"
                >
                  {t.ctaSecondary}
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              {t.trust.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual - Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Video Preview */}
            <div className="relative z-10">
              <div className="card-premium p-2 overflow-hidden neon-border">
                <LiteYouTube
                  videoId={HERO_DEMO_VIDEO_ID}
                  title="HydrAI Labs Demo"
                />
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={floatAnimation}
              className="absolute -bottom-6 -left-6 bg-card p-5 rounded-xl shadow-2xl border border-border/50 z-20"
            >
              <p className="text-4xl font-bold text-gradient-primary">{t.stat1}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.stat1Label}</p>
            </motion.div>

            <motion.div
              animate={floatDelayedAnimation}
              className="absolute -top-6 -right-6 bg-card p-5 rounded-xl shadow-2xl border border-border/50 z-20"
            >
              <p className="text-4xl font-bold text-gradient-secondary">{t.stat2}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.stat2Label}</p>
            </motion.div>

            {/* Gradient blur behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl -z-10 scale-110" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
