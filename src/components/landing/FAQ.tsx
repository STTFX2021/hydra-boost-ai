import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLandingTranslation } from "@/lib/i18n";

const FAQS_ES = [
  {
    q: "¿Qué es una automatización IA para negocios locales?",
    a: "Es un conjunto de sistemas que usan inteligencia artificial para responder clientes, captar leads, gestionar reservas y tareas repetitivas sin que tu equipo tenga que estar pendiente. Para un restaurante, una clínica, una inmobiliaria o un gimnasio significa atender por WhatsApp, recordar citas, cualificar leads de Instagram o procesar pedidos de forma automática."
  },
  {
    q: "¿Cuánto cuesta automatizar un negocio con IA?",
    a: "Nuestros sistemas para negocios locales arrancan desde 297 €/mes (Base) y escalan según volumen y canales. La auditoría inicial es gratuita: te decimos qué automatizar primero, cuánto cuesta y qué retorno puedes esperar antes de contratar nada."
  },
  {
    q: "¿Qué puede automatizar HydrAI Labs?",
    a: "Chatbots de WhatsApp, agentes de voz para llamadas, reservas y agenda, recordatorios anti no-show, captación de leads de redes sociales, cualificación y enrutado de oportunidades, integración con CRM, automatización de seguimiento comercial y flujos internos con n8n."
  },
  {
    q: "¿HydrAI Labs trabaja con restaurantes?",
    a: "Sí. Tenemos sistemas específicos para restaurantes: chatbot WhatsApp multilingüe para reservas y dudas del menú, gestión de pedidos take-away, agentes de voz para reservas telefónicas y recordatorios para reducir no-shows."
  },
  {
    q: "¿Se puede automatizar WhatsApp?",
    a: "Sí. Conectamos un número de WhatsApp Business a un asistente IA que responde 24/7 en varios idiomas, gestiona reservas reales contra tu sistema, cualifica leads de Meta Ads y escala a una persona humana cuando hace falta."
  },
  {
    q: "¿Se puede crear un agente de voz para llamadas?",
    a: "Sí. Implementamos agentes de voz IA (basados en Vapi y modelos avanzados) que atienden llamadas entrantes, gestionan reservas, responden preguntas frecuentes y derivan al equipo cuando la conversación lo requiere."
  },
  {
    q: "¿Trabajáis en Costa del Sol?",
    a: "Sí. HydrAI Labs está basada en Málaga y trabaja con negocios locales en toda la Costa del Sol: Marbella, Málaga, Estepona, Fuengirola, Benalmádena, Torremolinos y Mijas. También trabajamos en remoto en el resto de España y Europa."
  },
  {
    q: "¿Qué diferencia a HydrAI Labs de una agencia web normal?",
    a: "Una agencia web te entrega una página y se va. Nosotros construimos sistemas operativos completos: captación, atención al cliente, automatización de procesos y seguimiento comercial — integrados con tus herramientas y medibles en métricas reales. No vendemos diseño, vendemos resultados de operación."
  }
];

const FAQS_EN = [
  {
    q: "How long does the complete setup take?",
    a: "7 business days from project approval. Includes: chatbot configuration, initial automations, integration with your existing tools and team training."
  },
  {
    q: "Do I need technical knowledge to use your systems?",
    a: "NO. Everything is designed without code. We provide complete training and step-by-step documentation. If something fails, our 24/7 support resolves it."
  },
  {
    q: "What if I don't save the promised 10 hours/month?",
    a: "100% refund, no questions asked. It's our satisfaction guarantee. We measure saved hours with real metrics."
  },
  {
    q: "Does it work with my current CRM/tools?",
    a: "Yes. We integrate with 500+ tools via Make/n8n: HubSpot, Salesforce, Notion, Google Sheets, WhatsApp, Instagram, etc. If it's not on the list, we connect via custom API."
  },
  {
    q: "Is my customer data secure?",
    a: "Absolutely. We comply with European GDPR. End-to-end encrypted data, EU servers (Frankfurt), daily backups."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No commitment. Cancel whenever you want with 30 days notice. We export all your data in standard format."
  },
  {
    q: "Does the chatbot sound 'robotic'?",
    a: "NO. We use the most advanced AI models. Responds like a human, understands context, learns from your FAQs and scales your brand tone."
  },
  {
    q: "What's the difference vs hiring a programmer?",
    a: "Faster, cheaper, no management. A dev charges 3,000-5,000€/month + 3-6 months development. Us: 997€/month, ready in 7 days, support included."
  },
  {
    q: "What types of businesses benefit the most?",
    a: "Restaurants, clinics, real estate, gyms, barbershops, yoga studios, and any local business with repetitive customer service. If you answer the same questions every day, we can automate it."
  },
  {
    q: "How does the WhatsApp chatbot work?",
    a: "We connect a WhatsApp Business number to our AI system. The bot responds 24/7 with your brand tone, manages bookings, takes orders, and escalates to a human when needed."
  },
  {
    q: "Do you offer support after implementation?",
    a: "Yes. All plans include priority technical support, monthly system updates, and a real-time metrics dashboard so you can track performance."
  },
  {
    q: "Can I see a demo before signing up?",
    a: "Of course. We offer a free 30-minute diagnostic where we analyze your business and show you exactly how automation would work in your specific case."
  }
];

const FAQS_DE = [
  { q: "Was ist KI-Automatisierung für lokale Unternehmen?", a: "Eine Reihe von Systemen, die KI nutzen, um Kunden zu beantworten, Leads zu erfassen, Buchungen und wiederkehrende Aufgaben zu verwalten — ohne dass Ihr Team ständig aufpassen muss. Für ein Restaurant, eine Klinik, ein Immobilienbüro oder ein Fitnessstudio bedeutet das automatische WhatsApp-Antworten, Terminerinnerungen, Qualifizierung von Instagram-Leads oder Bestellabwicklung." },
  { q: "Was kostet die Automatisierung eines Unternehmens mit KI?", a: "Unsere Systeme für lokale Unternehmen starten bei 297 €/Monat (Base) und skalieren je nach Volumen und Kanälen. Das initiale Audit ist kostenlos: Wir sagen Ihnen, was zuerst automatisiert werden sollte, was es kostet und welchen ROI Sie erwarten können — bevor Sie irgendetwas buchen." },
  { q: "Was kann HydrAI Labs automatisieren?", a: "WhatsApp-Chatbots, Sprachagenten für Anrufe, Buchungen und Kalender, Anti-No-Show-Erinnerungen, Lead-Erfassung aus Social Media, Qualifizierung und Routing von Opportunities, CRM-Integration, Sales-Follow-up und interne Workflows mit n8n." },
  { q: "Arbeitet HydrAI Labs mit Restaurants?", a: "Ja. Wir haben spezifische Systeme für Restaurants: mehrsprachiger WhatsApp-Chatbot für Reservierungen und Menüfragen, Verwaltung von Take-Away-Bestellungen, Sprachagenten für Telefonreservierungen und Erinnerungen zur Reduzierung von No-Shows." },
  { q: "Kann man WhatsApp automatisieren?", a: "Ja. Wir verbinden eine WhatsApp Business-Nummer mit einem KI-Assistenten, der 24/7 in mehreren Sprachen antwortet, echte Buchungen gegen Ihr System verwaltet, Meta-Ads-Leads qualifiziert und bei Bedarf an einen Menschen eskaliert." },
  { q: "Kann man einen Sprachagenten für Anrufe erstellen?", a: "Ja. Wir implementieren KI-Sprachagenten (basierend auf Vapi und fortschrittlichen Modellen), die eingehende Anrufe annehmen, Buchungen verwalten, häufige Fragen beantworten und bei Bedarf an das Team weiterleiten." },
  { q: "Arbeiten Sie an der Costa del Sol?", a: "Ja. HydrAI Labs hat seinen Sitz in Málaga und arbeitet mit lokalen Unternehmen an der gesamten Costa del Sol: Marbella, Málaga, Estepona, Fuengirola, Benalmádena, Torremolinos und Mijas. Wir arbeiten auch remote im Rest von Spanien und Europa." },
  { q: "Was unterscheidet HydrAI Labs von einer normalen Webagentur?", a: "Eine Webagentur liefert Ihnen eine Seite und verschwindet. Wir bauen komplette Betriebssysteme: Lead-Gewinnung, Kundensupport, Prozessautomatisierung und Sales-Follow-up — integriert in Ihre Tools und messbar in echten Metriken. Wir verkaufen kein Design, wir verkaufen Betriebsergebnisse." },
];

const FAQS_RU = [
  { q: "Что такое ИИ-автоматизация для локального бизнеса?", a: "Это набор систем на основе ИИ, которые отвечают клиентам, захватывают лидов, управляют бронированиями и рутинными задачами — без постоянного участия команды. Для ресторана, клиники, агентства недвижимости или фитнес-клуба это означает автоответы в WhatsApp, напоминания о записях, квалификация лидов из Instagram и автоматическая обработка заказов." },
  { q: "Сколько стоит автоматизация бизнеса с ИИ?", a: "Наши системы для локального бизнеса начинаются от 297 €/месяц (тариф Base) и масштабируются в зависимости от объёма и каналов. Первичный аудит бесплатен: мы скажем, что автоматизировать в первую очередь, сколько это стоит и какой ROI ожидать — до заключения договора." },
  { q: "Что может автоматизировать HydrAI Labs?", a: "Чат-боты WhatsApp, голосовые агенты для звонков, бронирования и расписание, напоминания против no-show, захват лидов из соцсетей, квалификацию и маршрутизацию заявок, интеграцию с CRM, sales follow-up и внутренние процессы в n8n." },
  { q: "HydrAI Labs работает с ресторанами?", a: "Да. У нас есть специализированные системы для ресторанов: многоязычный чат-бот WhatsApp для бронирований и вопросов по меню, управление заказами на вынос, голосовые агенты для телефонных бронирований и напоминания для снижения no-show." },
  { q: "Можно ли автоматизировать WhatsApp?", a: "Да. Подключаем номер WhatsApp Business к ИИ-ассистенту, который отвечает 24/7 на нескольких языках, управляет реальными бронированиями в вашей системе, квалифицирует лидов из Meta Ads и передаёт диалог человеку при необходимости." },
  { q: "Можно ли создать голосового агента для звонков?", a: "Да. Внедряем голосовых ИИ-агентов (на базе Vapi и продвинутых моделей), которые принимают входящие звонки, управляют бронированиями, отвечают на частые вопросы и передают разговор команде при необходимости." },
  { q: "Вы работаете на Коста-дель-Соль?", a: "Да. HydrAI Labs базируется в Малаге и работает с локальным бизнесом по всему побережью: Марбелья, Малага, Эстепона, Фуэнхирола, Бенальмадена, Торремолинос и Михас. Также удалённо работаем по всей Испании и Европе." },
  { q: "Чем HydrAI Labs отличается от обычного веб-агентства?", a: "Веб-агентство сдаёт сайт и уходит. Мы строим полноценные операционные системы: привлечение, поддержку, автоматизацию процессов и sales follow-up — интегрированные с вашими инструментами и измеримые реальными метриками. Мы продаём не дизайн, а операционный результат." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TITLES: Record<string, { title: string; subtitle: string }> = {
  es: { title: 'Preguntas Frecuentes', subtitle: 'Todo lo que necesitas saber antes de empezar' },
  en: { title: 'Frequently Asked Questions', subtitle: 'Everything you need to know before getting started' },
  de: { title: 'Häufig gestellte Fragen', subtitle: 'Alles, was Sie vor dem Start wissen müssen' },
  ru: { title: 'Часто задаваемые вопросы', subtitle: 'Всё, что нужно знать перед началом' },
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLandingTranslation();

  const faqs = language === 'de' ? FAQS_DE : language === 'ru' ? FAQS_RU : language === 'es' ? FAQS_ES : FAQS_EN;
  const { title, subtitle } = TITLES[language] ?? TITLES.es;

  // FAQPage JSON-LD schema (always use Spanish for SEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_ES.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section id="faq" className="section-padding bg-muted/10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-3"
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card-premium overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-muted/20 transition-colors rounded-t-xl"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/30 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
