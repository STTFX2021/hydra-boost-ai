import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const COPY = {
  es: {
    badge: "Insights",
    title1: "Recursos y",
    title2: "casos reales",
    viewAll: "Ver todos",
    read: "Leer",
    insights: [
      { slug: "chatbot-whatsapp-restaurante", tag: "Caso de Éxito", tagClass: "badge-success", title: "Restaurante redujo no-shows un 40% con chatbot WhatsApp", readTime: "5 min" },
      { slug: "automatizacion-ia-negocio-local", tag: "Guía", tagClass: "badge-primary", title: "5 procesos que todo negocio local puede automatizar con IA", readTime: "7 min" },
      { slug: "chatbot-vs-persona-atencion-cliente", tag: "Análisis", tagClass: "badge-secondary", title: "Chatbot de IA vs Persona: cuándo usar cada uno", readTime: "5 min" },
    ],
  },
  en: {
    badge: "Insights",
    title1: "Resources and",
    title2: "real cases",
    viewAll: "View all",
    read: "Read",
    insights: [
      { slug: "chatbot-whatsapp-restaurante", tag: "Case Study", tagClass: "badge-success", title: "Restaurant cut no-shows by 40% with a WhatsApp chatbot", readTime: "5 min" },
      { slug: "automatizacion-ia-negocio-local", tag: "Guide", tagClass: "badge-primary", title: "5 processes every local business can automate with AI", readTime: "7 min" },
      { slug: "chatbot-vs-persona-atencion-cliente", tag: "Analysis", tagClass: "badge-secondary", title: "AI Chatbot vs Human: when to use each one", readTime: "5 min" },
    ],
  },
  de: {
    badge: "Insights",
    title1: "Ressourcen und",
    title2: "echte Fälle",
    viewAll: "Alle ansehen",
    read: "Lesen",
    insights: [
      { slug: "chatbot-whatsapp-restaurante", tag: "Fallstudie", tagClass: "badge-success", title: "Restaurant senkte No-Shows um 40% mit WhatsApp-Chatbot", readTime: "5 Min" },
      { slug: "automatizacion-ia-negocio-local", tag: "Leitfaden", tagClass: "badge-primary", title: "5 Prozesse, die jedes lokale Unternehmen mit KI automatisieren kann", readTime: "7 Min" },
      { slug: "chatbot-vs-persona-atencion-cliente", tag: "Analyse", tagClass: "badge-secondary", title: "KI-Chatbot vs Mensch: wann was einsetzen", readTime: "5 Min" },
    ],
  },
  ru: {
    badge: "Insights",
    title1: "Материалы и",
    title2: "реальные кейсы",
    viewAll: "Все материалы",
    read: "Читать",
    insights: [
      { slug: "chatbot-whatsapp-restaurante", tag: "Кейс", tagClass: "badge-success", title: "Ресторан сократил no-show на 40% с WhatsApp-чат-ботом", readTime: "5 мин" },
      { slug: "automatizacion-ia-negocio-local", tag: "Гайд", tagClass: "badge-primary", title: "5 процессов, которые любой локальный бизнес может автоматизировать с ИИ", readTime: "7 мин" },
      { slug: "chatbot-vs-persona-atencion-cliente", tag: "Анализ", tagClass: "badge-secondary", title: "ИИ-чат-бот или человек: когда что использовать", readTime: "5 мин" },
    ],
  },
};

export const InsightsTeaser = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <span className="badge-primary mb-4 inline-flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {t.title1} <span className="text-gradient-hydrai">{t.title2}</span>
            </h2>
          </div>
          <Link to="/blog" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all shrink-0">
            {t.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.insights.map((item, i) => (
            <motion.div key={item.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/blog/${item.slug}`} className="group block h-full">
                <article className="card-premium h-full flex flex-col p-6 hover:border-primary/30 transition-all">
                  <span className={`${item.tagClass} mb-4 self-start`}>{item.tag}</span>
                  <h3 className="font-display font-semibold text-lg mb-4 group-hover:text-primary transition-colors leading-snug flex-1">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </div>
                    <span className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t.read} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
