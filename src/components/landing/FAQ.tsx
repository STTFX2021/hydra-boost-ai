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

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLandingTranslation();

  const faqs = language === 'es' ? FAQS_ES : FAQS_EN;
  const title = language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions';
  const subtitle = language === 'es'
    ? 'Todo lo que necesitas saber antes de empezar'
    : 'Everything you need to know before getting started';

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
