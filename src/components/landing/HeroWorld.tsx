import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";
import { useEffect, useRef } from "react";

/* ── Animated counter ── */
const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionVal, target, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return () => { controls.stop(); unsub(); };
  }, [target, suffix, motionVal, rounded]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ── Variants ── */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

/* ── Content i18n ── */
const copy = {
  es: {
    badge: "🚀 #1 en Automatización IA para Negocios",
    title1: "Automatizaciones IA",
    title2: "que traen clientes 24/7",
    sub: "Chatbots inteligentes · Webs SEO · CRM automatizado",
    subBold: "Convierte visitantes en clientes mientras duermes.",
    cta1: "Solicitar Auditoría Gratis",
    cta2: "Ver Demo",
    trust: ["Sin permanencia", "Setup en 7 días", "Soporte 24/7"],
    urgency: "⚡ Solo quedan 3 plazas disponibles este mes",
    stats: [
      { value: 127, suffix: "%", label: "Más leads" },
      { value: 15, suffix: "h", label: "Ahorro / semana" },
      { value: 7, suffix: " días", label: "Setup completo" },
    ],
  },
  en: {
    badge: "🚀 #1 in AI Automation for Businesses",
    title1: "AI Automations",
    title2: "that bring customers 24/7",
    sub: "Smart chatbots · SEO websites · Automated CRM",
    subBold: "Convert visitors into customers while you sleep.",
    cta1: "Request Free Audit",
    cta2: "Watch Demo",
    trust: ["No commitment", "7-day setup", "24/7 support"],
    urgency: "⚡ Only 3 spots left this month",
    stats: [
      { value: 127, suffix: "%", label: "More leads" },
      { value: 15, suffix: "h", label: "Saved / week" },
      { value: 7, suffix: " days", label: "Full setup" },
    ],
  },
  fr: {
    badge: "🚀 #1 en Automatisation IA",
    title1: "Automatisations IA",
    title2: "qui attirent des clients 24/7",
    sub: "Chatbots intelligents · Sites SEO · CRM automatisé",
    subBold: "Convertissez les visiteurs en clients pendant que vous dormez.",
    cta1: "Demander un Audit Gratuit",
    cta2: "Voir la Démo",
    trust: ["Sans engagement", "Setup en 7 jours", "Support 24/7"],
    urgency: "⚡ Plus que 3 places ce mois-ci",
    stats: [
      { value: 127, suffix: "%", label: "Plus de leads" },
      { value: 15, suffix: "h", label: "Économisées / sem." },
      { value: 7, suffix: " jours", label: "Setup complet" },
    ],
  },
  de: {
    badge: "🚀 #1 in KI-Automatisierung",
    title1: "KI-Automatisierungen",
    title2: "die 24/7 Kunden bringen",
    sub: "Intelligente Chatbots · SEO-Websites · Automatisiertes CRM",
    subBold: "Verwandeln Sie Besucher in Kunden, während Sie schlafen.",
    cta1: "Kostenloses Audit anfordern",
    cta2: "Demo ansehen",
    trust: ["Keine Bindung", "7 Tage Setup", "24/7 Support"],
    urgency: "⚡ Nur noch 3 Plätze diesen Monat",
    stats: [
      { value: 127, suffix: "%", label: "Mehr Leads" },
      { value: 15, suffix: "h", label: "Gespart / Woche" },
      { value: 7, suffix: " Tage", label: "Komplettes Setup" },
    ],
  },
  pt: {
    badge: "🚀 #1 em Automação IA",
    title1: "Automações IA",
    title2: "que trazem clientes 24/7",
    sub: "Chatbots inteligentes · Sites SEO · CRM automatizado",
    subBold: "Converta visitantes em clientes enquanto dorme.",
    cta1: "Solicitar Auditoria Grátis",
    cta2: "Ver Demo",
    trust: ["Sem compromisso", "Setup em 7 dias", "Suporte 24/7"],
    urgency: "⚡ Apenas 3 vagas restantes este mês",
    stats: [
      { value: 127, suffix: "%", label: "Mais leads" },
      { value: 15, suffix: "h", label: "Poupança / sem." },
      { value: 7, suffix: " dias", label: "Setup completo" },
    ],
  },
  it: {
    badge: "🚀 #1 in Automazione IA",
    title1: "Automazioni IA",
    title2: "che portano clienti 24/7",
    sub: "Chatbot intelligenti · Siti SEO · CRM automatizzato",
    subBold: "Converti i visitatori in clienti mentre dormi.",
    cta1: "Richiedi Audit Gratuito",
    cta2: "Guarda Demo",
    trust: ["Senza impegno", "Setup in 7 giorni", "Supporto 24/7"],
    urgency: "⚡ Solo 3 posti rimasti questo mese",
    stats: [
      { value: 127, suffix: "%", label: "Più lead" },
      { value: 15, suffix: "h", label: "Risparmio / sett." },
      { value: 7, suffix: " giorni", label: "Setup completo" },
    ],
  },
};

export const HeroWorld = () => {
  const { language } = useLandingTranslation();
  const t = copy[language] || copy.es;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      {/* ── Layered dark background ── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(190 100% 50% / 0.06), transparent 60%)," +
              "radial-gradient(ellipse 60% 50% at 75% 25%, hsl(260 60% 55% / 0.05), transparent 55%)," +
              "radial-gradient(ellipse 70% 40% at 50% 90%, hsl(200 90% 55% / 0.03), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.25), hsl(260 60% 55% / 0.15), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.03]"
          style={{ background: "radial-gradient(ellipse at center, hsl(190 100% 50%), transparent 70%)" }}
        />
      </div>

      <div className="section-container relative z-10 py-32 md:py-40 lg:py-44">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* ── Badge ── */}
          <motion.div variants={item}>
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-primary/15 text-foreground"
              style={{ background: "hsl(190 100% 50% / 0.06)", boxShadow: "0 0 20px hsl(190 100% 50% / 0.06)" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              {t.badge}
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold tracking-tight leading-[1.05] text-glow-violet"
          >
            <span className="text-foreground">{t.title1}</span>
            <br />
            <span className="text-gradient-hydrai">{t.title2}</span>
          </motion.h1>

          {/* ── Subtitle ── */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {t.sub}
            <span className="block mt-2 font-semibold text-foreground">{t.subBold}</span>
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon btn-depth text-base px-10 py-6 group min-w-[260px] rounded-2xl">
                {t.cta1}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/casos">
              <Button size="lg" variant="outline" className="btn-outline-neon btn-depth text-base px-8 py-6 min-w-[200px] rounded-2xl gap-2">
                <Play className="w-4 h-4 fill-primary text-primary" />
                {t.cta2}
              </Button>
            </Link>
          </motion.div>

          {/* ── Trust pills + urgency ── */}
          <motion.div variants={item} className="space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-5">
              {t.trust.map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  {text}
                </div>
              ))}
            </div>
            <p className="text-sm text-warning font-medium">{t.urgency}</p>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div variants={item} className="grid grid-cols-3 max-w-md mx-auto pt-6">
            {t.stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center py-4 ${i < t.stats.length - 1 ? "border-r border-border/40" : ""}`}
              >
                <p className="text-3xl sm:text-4xl font-display font-bold text-gradient-hydrai">
                  {stat.suffix === "%" ? "+" : ""}
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
