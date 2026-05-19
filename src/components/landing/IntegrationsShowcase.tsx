import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const CATEGORIES = {
  es: { ai: "IA", autom: "Automatización", backend: "Backend", msg: "Mensajería", email: "Email", agenda: "Agenda", pay: "Pagos", api: "APIs", sales: "Ventas", scraping: "Scraping", video: "Vídeo IA", notif: "Notificaciones", deploy: "Deploy" },
  en: { ai: "AI", autom: "Automation", backend: "Backend", msg: "Messaging", email: "Email", agenda: "Calendar", pay: "Payments", api: "APIs", sales: "Sales", scraping: "Scraping", video: "AI Video", notif: "Notifications", deploy: "Deploy" },
  de: { ai: "KI", autom: "Automatisierung", backend: "Backend", msg: "Messaging", email: "E-Mail", agenda: "Kalender", pay: "Zahlungen", api: "APIs", sales: "Vertrieb", scraping: "Scraping", video: "KI-Video", notif: "Benachrichtigungen", deploy: "Deploy" },
  ru: { ai: "ИИ", autom: "Автоматизация", backend: "Бэкенд", msg: "Мессенджеры", email: "Email", agenda: "Календарь", pay: "Платежи", api: "API", sales: "Продажи", scraping: "Скрейпинг", video: "ИИ-видео", notif: "Уведомления", deploy: "Деплой" },
};

const HEAD = {
  es: { badge: "🔌 Stack Tecnológico", title1: "Integraciones que", title2: "potencian tu negocio", sub: "Conectamos las mejores herramientas del mercado en un sistema unificado que trabaja por ti 24/7", more: "+ más de 200 integraciones disponibles vía API" },
  en: { badge: "🔌 Tech Stack", title1: "Integrations that", title2: "power your business", sub: "We connect the best tools on the market into one unified system that works for you 24/7", more: "+ 200+ integrations available via API" },
  de: { badge: "🔌 Tech-Stack", title1: "Integrationen, die", title2: "Ihr Geschäft stärken", sub: "Wir verbinden die besten Tools des Marktes in einem System, das 24/7 für Sie arbeitet", more: "+ Über 200 Integrationen via API verfügbar" },
  ru: { badge: "🔌 Технологический стек", title1: "Интеграции, которые", title2: "усиливают ваш бизнес", sub: "Мы объединяем лучшие инструменты рынка в единую систему, работающую на вас 24/7", more: "+ Более 200 интеграций через API" },
};

export const IntegrationsShowcase = () => {
  const { language } = useI18n();
  const c = CATEGORIES[language] || CATEGORIES.es;
  const h = HEAD[language] || HEAD.es;

  const INTEGRATIONS = [
    { name: "OpenAI", icon: "🤖", category: c.ai },
    { name: "n8n", icon: "⚙️", category: c.autom },
    { name: "Supabase", icon: "🗄️", category: c.backend },
    { name: "WhatsApp", icon: "💬", category: c.msg },
    { name: "Resend", icon: "📧", category: c.email },
    { name: "Google Calendar", icon: "📅", category: c.agenda },
    { name: "Gmail", icon: "✉️", category: c.email },
    { name: "Stripe", icon: "💳", category: c.pay },
    { name: "Webhooks", icon: "🔗", category: c.api },
    { name: "CRM", icon: "👥", category: c.sales },
    { name: "Make", icon: "🔄", category: c.autom },
    { name: "Apify", icon: "🕷️", category: c.scraping },
    { name: "HeyGen", icon: "🎬", category: c.video },
    { name: "Anthropic", icon: "🧠", category: c.ai },
    { name: "Discord", icon: "💜", category: c.notif },
    { name: "Vercel", icon: "▲", category: c.deploy },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, hsl(190 100% 50% / 0.04), transparent 60%)" }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">{h.badge}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {h.title1} <span className="text-gradient-hydrai">{h.title2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{h.sub}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {INTEGRATIONS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/30 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-default"
              style={{ boxShadow: "0 2px 8px hsl(0 0% 0% / 0.15)" }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              <span className="text-xs font-medium text-foreground text-center leading-tight">{item.name}</span>
              <span className="text-[10px] text-muted-foreground/70">{item.category}</span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-12 h-px mx-auto max-w-lg" style={{ background: "linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.3), hsl(260 60% 55% / 0.2), transparent)" }} />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-center text-sm text-muted-foreground mt-4">
          {h.more}
        </motion.p>
      </div>
    </section>
  );
};
