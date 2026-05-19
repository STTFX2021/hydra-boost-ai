import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Stethoscope, ShoppingCart, Briefcase, Building2 } from "lucide-react";
import { useLandingTranslation } from "@/lib/i18n";
import { IndustryFlowModal } from "./IndustryFlowModal";
import { TAB_TO_INDUSTRY, type IndustryId } from "@/lib/industryFlows";

const icons = [UtensilsCrossed, Stethoscope, ShoppingCart, Briefcase, Building2];

export const UseCaseTabs = () => {
  const { language } = useLandingTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [flowOpen, setFlowOpen] = useState(false);
  const [flowIndustry, setFlowIndustry] = useState<IndustryId>("restaurants");

  const content = {
    es: {
      title: "Soluciones por Industria",
      subtitle: "Automatizaciones específicas para cada sector",
      cases: [
        {
          titulo: "Restaurantes",
          problema: "Gestionar 50+ reservas/día vía WhatsApp manualmente",
          solucion: "Chatbot IA que confirma reservas, sugiere menús y gestiona cancelaciones automáticamente",
          resultado: "+127 reservas/mes, -15h trabajo/semana",
          features: ["Reservas 24/7 en WhatsApp", "Sugerencia automática de platos", "Recordatorios y confirmaciones", "Gestión de cancelaciones"],
        },
        {
          titulo: "Clínicas",
          problema: "Pacientes llaman fuera de horario y no hay quien atienda",
          solucion: "Chatbot 24/7 que agenda citas, recuerda visitas y responde FAQs médicas",
          resultado: "+89 citas/mes, 0 llamadas perdidas",
          features: ["Agenda citas automáticamente", "Recordatorios por WhatsApp", "Responde FAQs médicas", "Integración con calendario"],
        },
        {
          titulo: "Ecommerce",
          problema: "Carritos abandonados, consultas sin responder",
          solucion: "Automatizaciones que recuperan carritos y chatbot de soporte 24/7",
          resultado: "+34% conversión, -60% consultas manuales",
          features: ["Recuperación de carritos", "Soporte 24/7 en chat", "Tracking de pedidos", "Recomendaciones personalizadas"],
        },
        {
          titulo: "Servicios",
          problema: "Leads que no responden a tiempo y se pierden",
          solucion: "Sistema de follow-up automático + chatbot de calificación",
          resultado: "+70% leads convertidos, respuesta <2min",
          features: ["Respuesta instantánea", "Calificación automática", "Follow-up secuenciado", "Integración con CRM"],
        },
        {
          titulo: "Inmobiliarias",
          problema: "Gestionar cientos de consultas de propiedades manualmente",
          solucion: "Chatbot que filtra leads, agenda visitas y envía información detallada",
          resultado: "+95 visitas/mes, -20h trabajo/semana",
          features: ["Filtrado de leads", "Agenda visitas automático", "Envío de fichas de propiedades", "Seguimiento post-visita"],
        },
      ],
    },
    en: {
      title: "Solutions by Industry",
      subtitle: "Specific automations for each sector",
      cases: [
        {
          titulo: "Restaurants",
          problema: "Managing 50+ reservations/day via WhatsApp manually",
          solucion: "AI chatbot that confirms reservations, suggests menus and manages cancellations automatically",
          resultado: "+127 reservations/month, -15h work/week",
          features: ["24/7 WhatsApp reservations", "Automatic dish suggestions", "Reminders and confirmations", "Cancellation management"],
        },
        {
          titulo: "Clinics",
          problema: "Patients call after hours with no one to attend",
          solucion: "24/7 chatbot that schedules appointments, reminds visits and answers medical FAQs",
          resultado: "+89 appointments/month, 0 missed calls",
          features: ["Automatic appointment scheduling", "WhatsApp reminders", "Medical FAQ answers", "Calendar integration"],
        },
        {
          titulo: "Ecommerce",
          problema: "Abandoned carts, unanswered queries",
          solucion: "Automations that recover carts and 24/7 support chatbot",
          resultado: "+34% conversion, -60% manual queries",
          features: ["Cart recovery", "24/7 chat support", "Order tracking", "Personalized recommendations"],
        },
        {
          titulo: "Services",
          problema: "Leads that don't respond in time and are lost",
          solucion: "Automatic follow-up system + qualification chatbot",
          resultado: "+70% converted leads, <2min response",
          features: ["Instant response", "Automatic qualification", "Sequenced follow-up", "CRM integration"],
        },
        {
          titulo: "Real Estate",
          problema: "Managing hundreds of property inquiries manually",
          solucion: "Chatbot that filters leads, schedules visits and sends detailed information",
          resultado: "+95 visits/month, -20h work/week",
          features: ["Lead filtering", "Automatic visit scheduling", "Property sheet sending", "Post-visit follow-up"],
        },
      ],
    },
    ru: {
      title: "Solutions by Industry",
      subtitle: "Specific automations for each sector",
      cases: [
        {
          titulo: "Restaurants",
          problema: "Managing 50+ reservations/day via WhatsApp manually",
          solucion: "AI chatbot that confirms reservations, suggests menus and manages cancellations automatically",
          resultado: "+127 reservations/month, -15h work/week",
          features: ["24/7 WhatsApp reservations", "Automatic dish suggestions", "Reminders and confirmations", "Cancellation management"],
        },
        {
          titulo: "Clinics",
          problema: "Patients call after hours with no one to attend",
          solucion: "24/7 chatbot that schedules appointments, reminds visits and answers medical FAQs",
          resultado: "+89 appointments/month, 0 missed calls",
          features: ["Automatic appointment scheduling", "WhatsApp reminders", "Medical FAQ answers", "Calendar integration"],
        },
        {
          titulo: "Ecommerce",
          problema: "Abandoned carts, unanswered queries",
          solucion: "Automations that recover carts and 24/7 support chatbot",
          resultado: "+34% conversion, -60% manual queries",
          features: ["Cart recovery", "24/7 chat support", "Order tracking", "Personalized recommendations"],
        },
        {
          titulo: "Services",
          problema: "Leads that don't respond in time and are lost",
          solucion: "Automatic follow-up system + qualification chatbot",
          resultado: "+70% converted leads, <2min response",
          features: ["Instant response", "Automatic qualification", "Sequenced follow-up", "CRM integration"],
        },
        {
          titulo: "Real Estate",
          problema: "Managing hundreds of property inquiries manually",
          solucion: "Chatbot that filters leads, schedules visits and sends detailed information",
          resultado: "+95 visits/month, -20h work/week",
          features: ["Lead filtering", "Automatic visit scheduling", "Property sheet sending", "Post-visit follow-up"],
        },
      ],
    },
    de: {
      title: "Lösungen nach Branche",
      subtitle: "Spezifische Automatisierungen für jeden Sektor",
      cases: [
        {
          titulo: "Restaurants",
          problema: "50+ Reservierungen/Tag über WhatsApp manuell verwalten",
          solucion: "KI-Chatbot, der Reservierungen bestätigt, Menüs vorschlägt und Stornierungen automatisch verwaltet",
          resultado: "+127 Reservierungen/Monat, -15h Arbeit/Woche",
          features: ["24/7 WhatsApp-Reservierungen", "Automatische Gerichtvorschläge", "Erinnerungen und Bestätigungen", "Stornierungsverwaltung"],
        },
        {
          titulo: "Kliniken",
          problema: "Patienten rufen außerhalb der Geschäftszeiten an, niemand antwortet",
          solucion: "24/7 Chatbot, der Termine plant, an Besuche erinnert und medizinische FAQs beantwortet",
          resultado: "+89 Termine/Monat, 0 verpasste Anrufe",
          features: ["Automatische Terminplanung", "WhatsApp-Erinnerungen", "Medizinische FAQ-Antworten", "Kalenderintegration"],
        },
        {
          titulo: "E-Commerce",
          problema: "Abgebrochene Warenkörbe, unbeantwortete Anfragen",
          solucion: "Automatisierungen zur Warenkorb-Wiederherstellung und 24/7 Support-Chatbot",
          resultado: "+34% Conversion, -60% manuelle Anfragen",
          features: ["Warenkorb-Wiederherstellung", "24/7 Chat-Support", "Bestellverfolgung", "Personalisierte Empfehlungen"],
        },
        {
          titulo: "Dienstleistungen",
          problema: "Leads, die nicht rechtzeitig antworten und verloren gehen",
          solucion: "Automatisches Follow-up-System + Qualifizierungs-Chatbot",
          resultado: "+70% konvertierte Leads, Antwort <2min",
          features: ["Sofortige Antwort", "Automatische Qualifizierung", "Sequenziertes Follow-up", "CRM-Integration"],
        },
        {
          titulo: "Immobilien",
          problema: "Hunderte von Immobilienanfragen manuell verwalten",
          solucion: "Chatbot, der Leads filtert, Besichtigungen plant und detaillierte Informationen sendet",
          resultado: "+95 Besichtigungen/Monat, -20h Arbeit/Woche",
          features: ["Lead-Filterung", "Automatische Besichtigungsplanung", "Versand von Immobiliendaten", "Post-Besichtigungs-Follow-up"],
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <section className="section-padding section-alt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {t.cases.map((caso, idx) => {
            const Icon = icons[idx];
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveTab(idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === idx
                    ? "bg-primary text-primary-foreground shadow-neon-sm"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {caso.titulo}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {language === "es" ? "El problema" : "The problem"}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold">
                  {t.cases[activeTab].problema}
                </h3>
              </div>

              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {language === "es" ? "La solución" : "The solution"}
                </p>
                <p className="text-lg text-muted-foreground">
                  {t.cases[activeTab].solucion}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFlowIndustry(TAB_TO_INDUSTRY[activeTab]);
                  setFlowOpen(true);
                }}
                className="card-premium p-6 border-primary/30 w-full text-left cursor-pointer hover:border-primary/60 transition-colors group"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  {language === "es" ? "Resultado promedio" : "Average result"}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gradient-primary">
                  {t.cases[activeTab].resultado}
                </p>
                <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === "es" ? "Click para ver el flujo →" : "Click to see the flow →"}
                </p>
              </button>
            </div>

            <div className="card-premium p-8">
              <h4 className="font-display font-semibold text-lg mb-6">
                {language === "es" ? "Funcionalidades incluidas" : "Included features"}
              </h4>
              <ul className="space-y-4">
                {t.cases[activeTab].features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
        <IndustryFlowModal
          open={flowOpen}
          onClose={() => setFlowOpen(false)}
          industryId={flowIndustry}
        />
      </div>
    </section>
  );
};
