import { motion } from "framer-motion";
import {
  PhoneOff, Globe, CalendarX, Loader2, AlertCircle,
  Brain, Target, BarChart3, Map,
  MonitorSmartphone, MessageSquare, CalendarCheck, Bot, Workflow, Database, Send,
  TrendingUp, Users, BellRing, Sparkles, Clock, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n, type Language } from "@/lib/i18n";

type Step = {
  id: number;
  badge: string;
  title: string;
  text: string;
  accent: string;
  ring: string;
  chips: { icon: React.ComponentType<{ className?: string }>; label: string }[];
};

type Copy = {
  badge: string;
  heading1: string;
  heading2: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { v: string; l: string }[];
  steps: { title: string; text: string; chips: string[] }[];
};

const COPY: Record<Language, Copy> = {
  es: {
    badge: "Cómo funciona",
    heading1: "Cómo construimos",
    heading2: "Sistemas de Crecimiento",
    intro: "Cuéntanos tus objetivos, problemas y cuellos de botella. Creamos la web y el sistema de automatización perfectos para tu negocio.",
    ctaPrimary: "Auditoría gratis",
    ctaSecondary: "Ver resultados",
    stats: [
      { v: "7d", l: "Setup medio" },
      { v: "24/7", l: "Siempre activo" },
      { v: "+120", l: "Negocios" },
    ],
    steps: [
      {
        title: "El cliente llega con problemas",
        text: "Cuéntanos qué está bloqueando tu crecimiento.",
        chips: ["Llamadas perdidas", "Sin leads", "Web obsoleta", "Reservas perdidas", "Trabajo manual"],
      },
      {
        title: "HydrAI analiza el negocio",
        text: "Estudiamos tu negocio y detectamos las mejores oportunidades.",
        chips: ["Cerebro IA", "Mapa de estrategia", "Analítica", "Planificación"],
      },
      {
        title: "Construimos la solución",
        text: "Diseñamos un sistema pensado para hacer crecer tu negocio.",
        chips: ["Web que convierte", "Chatbot inteligente", "Reservas automáticas", "Flujos WhatsApp", "Integración CRM", "Asistentes IA", "Embudos de leads"],
      },
      {
        title: "El negocio crece",
        text: "Más clientes. Menos caos. Crecimiento automático.",
        chips: ["Más leads", "Más reservas", "Clientes felices", "Notificaciones", "Gráficas al alza", "Actividad 24/7", "Outreach automático"],
      },
    ],
  },
  en: {
    badge: "How it works",
    heading1: "How We Build",
    heading2: "Growth Systems",
    intro: "You tell us your goals, problems, and bottlenecks. We create the perfect website and automation system for your business.",
    ctaPrimary: "Get Free Audit",
    ctaSecondary: "View Results",
    stats: [
      { v: "7d", l: "Avg setup" },
      { v: "24/7", l: "Always on" },
      { v: "+120", l: "Businesses" },
    ],
    steps: [
      {
        title: "Client arrives with problems",
        text: "Tell us what is blocking your growth.",
        chips: ["Missed calls", "No leads", "Outdated website", "Lost bookings", "Manual work"],
      },
      {
        title: "HydrAI analyzes the business",
        text: "We study your business and detect the best opportunities.",
        chips: ["AI brain", "Strategy map", "Analytics", "Planning"],
      },
      {
        title: "We build the solution",
        text: "We build a system designed to grow your business.",
        chips: ["High-converting site", "Smart chatbot", "Booking automation", "WhatsApp flows", "CRM integration", "AI assistants", "Lead funnels"],
      },
      {
        title: "Business grows",
        text: "More clients. Less chaos. Automatic growth.",
        chips: ["More leads", "More bookings", "Happy customers", "Notifications", "Rising charts", "24/7 activity", "Auto outreach"],
      },
    ],
  },
  ru: {
    badge: "Как это работает",
    heading1: "Как мы строим",
    heading2: "Системы роста",
    intro: "Вы рассказываете о ваших целях, проблемах и узких местах. Мы создаём идеальный сайт и систему автоматизации для вашего бизнеса.",
    ctaPrimary: "Бесплатный аудит",
    ctaSecondary: "Смотреть результаты",
    stats: [
      { v: "7 дн", l: "Средний запуск" },
      { v: "24/7", l: "Всегда работает" },
      { v: "+120", l: "Бизнесов" },
    ],
    steps: [
      {
        title: "Клиент приходит с проблемами",
        text: "Расскажите, что мешает росту вашего бизнеса.",
        chips: ["Пропущенные звонки", "Нет лидов", "Устаревший сайт", "Потерянные брони", "Ручная работа"],
      },
      {
        title: "HydrAI анализирует бизнес",
        text: "Мы изучаем ваш бизнес и находим лучшие возможности.",
        chips: ["ИИ-мозг", "Карта стратегии", "Аналитика", "Планирование"],
      },
      {
        title: "Мы строим решение",
        text: "Система, спроектированная для роста вашего бизнеса.",
        chips: ["Сайт с высокой конверсией", "Умный чат-бот", "Авто-бронирование", "WhatsApp-флоу", "Интеграция с CRM", "ИИ-ассистенты", "Воронки лидов"],
      },
      {
        title: "Бизнес растёт",
        text: "Больше клиентов. Меньше хаоса. Автоматический рост.",
        chips: ["Больше лидов", "Больше броней", "Довольные клиенты", "Уведомления", "Растущие графики", "Активность 24/7", "Авто-аутрич"],
      },
    ],
  },
  de: {
    badge: "So funktioniert es",
    heading1: "So bauen wir",
    heading2: "Wachstumssysteme",
    intro: "Erzählen Sie uns Ihre Ziele, Probleme und Engpässe. Wir bauen die perfekte Website und das passende Automatisierungssystem für Ihr Unternehmen.",
    ctaPrimary: "Kostenlose Analyse",
    ctaSecondary: "Ergebnisse ansehen",
    stats: [
      { v: "7T", l: "Setup-Zeit" },
      { v: "24/7", l: "Immer aktiv" },
      { v: "+120", l: "Unternehmen" },
    ],
    steps: [
      {
        title: "Der Kunde kommt mit Problemen",
        text: "Sagen Sie uns, was Ihr Wachstum blockiert.",
        chips: ["Verpasste Anrufe", "Keine Leads", "Veraltete Website", "Verlorene Buchungen", "Manuelle Arbeit"],
      },
      {
        title: "HydrAI analysiert Ihr Geschäft",
        text: "Wir untersuchen Ihr Unternehmen und finden die besten Chancen.",
        chips: ["KI-Gehirn", "Strategiekarte", "Analytik", "Planung"],
      },
      {
        title: "Wir bauen die Lösung",
        text: "Ein System, das für Wachstum entwickelt wurde.",
        chips: ["Conversion-Website", "Smarter Chatbot", "Automatische Buchungen", "WhatsApp-Flows", "CRM-Integration", "KI-Assistenten", "Lead-Funnels"],
      },
      {
        title: "Das Geschäft wächst",
        text: "Mehr Kunden. Weniger Chaos. Automatisches Wachstum.",
        chips: ["Mehr Leads", "Mehr Buchungen", "Zufriedene Kunden", "Benachrichtigungen", "Steigende Kurven", "24/7-Aktivität", "Auto-Outreach"],
      },
    ],
  },
};

const STEP_META = [
  {
    accent: "text-destructive",
    ring: "border-destructive/30",
    icons: [PhoneOff, AlertCircle, Globe, CalendarX, Loader2],
  },
  {
    accent: "text-primary",
    ring: "border-primary/30",
    icons: [Brain, Map, BarChart3, Target],
  },
  {
    accent: "text-secondary",
    ring: "border-secondary/30",
    icons: [MonitorSmartphone, Bot, CalendarCheck, MessageSquare, Database, Sparkles, Workflow],
  },
  {
    accent: "text-success",
    ring: "border-success/30",
    icons: [Users, CalendarCheck, Sparkles, BellRing, TrendingUp, Clock, Send],
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export const GrowthSystemSection = () => {
  const { language } = useI18n();
  const copy = COPY[language] ?? COPY.es;

  const steps: Step[] = copy.steps.map((s, i) => ({
    id: i + 1,
    badge: `Step 0${i + 1}`,
    title: s.title,
    text: s.text,
    accent: STEP_META[i].accent,
    ring: STEP_META[i].ring,
    chips: s.chips.map((label, j) => ({
      icon: STEP_META[i].icons[j] ?? STEP_META[i].icons[STEP_META[i].icons.length - 1],
      label,
    })),
  }));

  return (
    <section
      id="how-we-build"
      aria-label={copy.heading1}
      className="section-padding relative overflow-hidden section-alt"
    >
      <div className="glow-orb-primary w-[500px] h-[500px] -top-40 -right-40 opacity-60" />
      <div className="glow-orb-secondary w-[400px] h-[400px] bottom-0 -left-32 opacity-50" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT — Copy */}
          <div className="lg:sticky lg:top-28">
            <div className="badge-primary mb-6 inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              {copy.badge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              {copy.heading1}
              <span className="text-gradient-hydrai block">{copy.heading2}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              {copy.intro}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon group">
                  {copy.ctaPrimary}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/casos">
                <Button size="lg" variant="outline" className="btn-outline-neon">
                  {copy.ctaSecondary}
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {copy.stats.map((s) => (
                <div key={s.l} className="text-center p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                  <p className="text-2xl font-display font-bold text-gradient-hydrai">{s.v}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Animated 4 steps */}
          <div className="relative">
            <div
              className="absolute left-6 top-4 bottom-4 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--destructive) / 0.4), hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), hsl(var(--success) / 0.5))",
              }}
              aria-hidden
            />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative sm:pl-16"
                >
                  <div
                    className={`hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-full items-center justify-center border-2 ${step.ring} bg-card shadow-lg`}
                  >
                    <span className={`text-sm font-display font-bold ${step.accent}`}>
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`absolute inset-0 rounded-full ${step.ring} animate-ping opacity-40`}
                      aria-hidden
                    />
                  </div>

                  <div
                    className={`card-premium p-6 md:p-7 rounded-2xl border ${step.ring} hover:translate-y-[-2px] transition-transform duration-300`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono uppercase tracking-wider ${step.accent}`}>
                        {step.badge}
                      </span>
                      <span className="sm:hidden text-xs font-mono text-muted-foreground">
                        {step.id}/4
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-5">
                      {step.text}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {step.chips.map((chip, idx) => {
                        const Icon = chip.icon;
                        return (
                          <motion.span
                            key={`${chip.label}-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/40 border border-border/60 text-foreground/90 hover:bg-muted/60 transition-colors"
                          >
                            <Icon className={`w-3.5 h-3.5 ${step.accent}`} />
                            {chip.label}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
