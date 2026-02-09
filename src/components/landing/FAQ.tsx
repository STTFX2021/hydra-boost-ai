import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLandingTranslation } from "@/lib/i18n";

const FAQS_ES = [
  {
    q: "¿Cuánto tiempo tarda el setup completo?",
    a: "7 días hábiles desde la aprobación del proyecto. Incluye: configuración de chatbot, automatizaciones iniciales, integración con tus herramientas existentes y formación del equipo."
  },
  {
    q: "¿Necesito conocimientos técnicos para usar vuestros sistemas?",
    a: "NO. Todo está diseñado sin código. Te damos formación completa y documentación paso a paso. Si algo falla, nuestro soporte 24/7 lo resuelve."
  },
  {
    q: "¿Qué pasa si no ahorro las 10 horas/mes prometidas?",
    a: "Devolución 100% sin preguntas. Es nuestra garantía de satisfacción. Medimos las horas ahorradas con métricas reales."
  },
  {
    q: "¿Funciona con mi CRM/herramientas actuales?",
    a: "Sí. Integramos con 500+ herramientas vía Make/n8n: HubSpot, Salesforce, Notion, Google Sheets, WhatsApp, Instagram, etc. Si no está en la lista, lo conectamos via API custom."
  },
  {
    q: "¿Los datos de mis clientes están seguros?",
    a: "Totalmente. Cumplimos RGPD europeo. Datos encriptados end-to-end, servidores en UE (Frankfurt), backups diarios."
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí. Sin permanencia. Cancelas cuando quieras con 30 días de preaviso. Exportamos todos tus datos en formato estándar."
  },
  {
    q: "¿El chatbot suena 'robótico'?",
    a: "NO. Usamos los modelos de IA más avanzados. Responde como humano, entiende contexto, aprende de tus FAQs y escala tu tono de marca."
  },
  {
    q: "¿Cuál es la diferencia con contratar un programador?",
    a: "Más rápido, más barato, sin gestión. Un dev te cobra 3.000-5.000€/mes + 3-6 meses de desarrollo. Nosotros: 997€/mes, listo en 7 días, soporte incluido."
  },
  {
    q: "¿Qué tipo de negocios se benefician más?",
    a: "Restaurantes, clínicas, inmobiliarias, gimnasios, barberías, estudios de yoga y cualquier negocio local con atención al cliente repetitiva. Si contestas las mismas preguntas cada día, podemos automatizarlo."
  },
  {
    q: "¿Cómo funciona el chatbot de WhatsApp?",
    a: "Conectamos un número de WhatsApp Business a nuestro sistema de IA. El bot responde 24/7 con el tono de tu marca, gestiona reservas, toma pedidos y escala a un humano cuando es necesario."
  },
  {
    q: "¿Ofrecéis soporte después de la implementación?",
    a: "Sí. Todos los planes incluyen soporte técnico prioritario, actualizaciones mensuales del sistema y un dashboard de métricas en tiempo real para que veas el rendimiento."
  },
  {
    q: "¿Puedo ver una demo antes de contratar?",
    a: "Por supuesto. Ofrecemos un diagnóstico gratuito de 30 minutos donde analizamos tu negocio y te mostramos exactamente cómo funcionaría la automatización en tu caso concreto."
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
