import { motion } from "framer-motion";
import {
  MessageCircle,
  PhoneOff,
  UserPlus,
  CalendarClock,
  Workflow,
  Bot,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ICONS = [MessageCircle, PhoneOff, UserPlus, CalendarClock, Workflow, Bot];

const COPY = {
  es: {
    title: "Qué revisamos en tu negocio",
    subtitle:
      "En la auditoría gratuita analizamos seis áreas concretas para detectar dónde pierdes tiempo y clientes — y qué se puede automatizar primero.",
    items: [
      { title: "Atención al cliente", desc: "Cómo respondes consultas y cuántas se quedan sin contestar." },
      { title: "WhatsApp y llamadas perdidas", desc: "Qué oportunidades se escapan fuera de horario o en horas punta." },
      { title: "Captación de leads", desc: "Cómo entran tus contactos desde web, redes y publicidad." },
      { title: "Reservas y citas", desc: "Cómo se agendan, recuerdan y reprograman tus citas." },
      { title: "Seguimiento comercial", desc: "Qué pasa entre 'primer contacto' y 'cliente que paga'." },
      { title: "Automatización con IA", desc: "Procesos repetitivos automatizables con n8n, Supabase, Vapi y agentes IA." },
    ],
  },
  en: {
    title: "What we review in your business",
    subtitle:
      "In the free audit we analyze six specific areas to detect where you lose time and customers — and what can be automated first.",
    items: [
      { title: "Customer service", desc: "How you handle inquiries and how many go unanswered." },
      { title: "WhatsApp & missed calls", desc: "Opportunities lost after hours or during peak times." },
      { title: "Lead capture", desc: "How contacts come in from your website, social media and ads." },
      { title: "Bookings & appointments", desc: "How appointments are scheduled, reminded and rescheduled." },
      { title: "Sales follow-up", desc: "What happens between 'first contact' and 'paying customer'." },
      { title: "AI automation", desc: "Repetitive processes you can automate with n8n, Supabase, Vapi and AI agents." },
    ],
  },
  de: {
    title: "Was wir in Ihrem Unternehmen prüfen",
    subtitle:
      "Im kostenlosen Audit analysieren wir sechs konkrete Bereiche, um zu erkennen, wo Sie Zeit und Kunden verlieren — und was zuerst automatisiert werden kann.",
    items: [
      { title: "Kundenservice", desc: "Wie Sie Anfragen beantworten und wie viele unbeantwortet bleiben." },
      { title: "WhatsApp & verpasste Anrufe", desc: "Welche Chancen außerhalb der Geschäftszeiten verloren gehen." },
      { title: "Lead-Generierung", desc: "Wie Kontakte über Website, Social Media und Werbung hereinkommen." },
      { title: "Buchungen & Termine", desc: "Wie Termine geplant, erinnert und verschoben werden." },
      { title: "Vertriebs-Follow-up", desc: "Was zwischen 'Erstkontakt' und 'zahlendem Kunden' passiert." },
      { title: "KI-Automatisierung", desc: "Wiederkehrende Prozesse, automatisierbar mit n8n, Supabase, Vapi und KI-Agenten." },
    ],
  },
  ru: {
    title: "Что мы анализируем в вашем бизнесе",
    subtitle:
      "В рамках бесплатного аудита мы изучаем шесть конкретных областей, чтобы понять, где вы теряете время и клиентов — и что автоматизировать в первую очередь.",
    items: [
      { title: "Клиентская поддержка", desc: "Как вы отвечаете на запросы и сколько остаётся без ответа." },
      { title: "WhatsApp и пропущенные звонки", desc: "Какие возможности теряются вне рабочего времени и в часы пик." },
      { title: "Привлечение лидов", desc: "Как поступают контакты с сайта, соцсетей и рекламы." },
      { title: "Бронирования и записи", desc: "Как назначаются, напоминаются и переносятся встречи." },
      { title: "Сопровождение продаж", desc: "Что происходит между «первым контактом» и «оплатившим клиентом»." },
      { title: "ИИ-автоматизация", desc: "Повторяющиеся процессы, автоматизируемые с n8n, Supabase, Vapi и ИИ-агентами." },
    ],
  },
};

export const WhatWeReview = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  return (
    <section className="section-padding bg-muted/10">
      <div className="section-container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
