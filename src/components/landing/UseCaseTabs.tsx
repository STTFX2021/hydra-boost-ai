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
    fr: {
      title: "Solutions par Industrie",
      subtitle: "Automatisations spécifiques pour chaque secteur",
      cases: [
        {
          titulo: "Restaurants",
          problema: "Gérer 50+ réservations/jour via WhatsApp manuellement",
          solucion: "Chatbot IA qui confirme les réservations, suggère des menus et gère les annulations automatiquement",
          resultado: "+127 réservations/mois, -15h travail/semaine",
          features: ["Réservations 24/7 sur WhatsApp", "Suggestions automatiques de plats", "Rappels et confirmations", "Gestion des annulations"],
        },
        {
          titulo: "Cliniques",
          problema: "Les patients appellent en dehors des heures et personne ne répond",
          solucion: "Chatbot 24/7 qui planifie les rendez-vous, rappelle les visites et répond aux FAQs médicales",
          resultado: "+89 rendez-vous/mois, 0 appels manqués",
          features: ["Planification automatique des rendez-vous", "Rappels WhatsApp", "Réponses aux FAQs médicales", "Intégration calendrier"],
        },
        {
          titulo: "E-commerce",
          problema: "Paniers abandonnés, demandes sans réponse",
          solucion: "Automatisations qui récupèrent les paniers et chatbot de support 24/7",
          resultado: "+34% conversion, -60% demandes manuelles",
          features: ["Récupération de paniers", "Support chat 24/7", "Suivi des commandes", "Recommandations personnalisées"],
        },
        {
          titulo: "Services",
          problema: "Leads qui ne répondent pas à temps et sont perdus",
          solucion: "Système de follow-up automatique + chatbot de qualification",
          resultado: "+70% leads convertis, réponse <2min",
          features: ["Réponse instantanée", "Qualification automatique", "Follow-up séquencé", "Intégration CRM"],
        },
        {
          titulo: "Immobilier",
          problema: "Gérer des centaines de demandes de propriétés manuellement",
          solucion: "Chatbot qui filtre les leads, planifie les visites et envoie des informations détaillées",
          resultado: "+95 visites/mois, -20h travail/semaine",
          features: ["Filtrage des leads", "Planification automatique des visites", "Envoi de fiches de propriétés", "Suivi post-visite"],
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
    pt: {
      title: "Soluções por Indústria",
      subtitle: "Automações específicas para cada setor",
      cases: [
        {
          titulo: "Restaurantes",
          problema: "Gerenciar 50+ reservas/dia via WhatsApp manualmente",
          solucion: "Chatbot IA que confirma reservas, sugere menus e gerencia cancelamentos automaticamente",
          resultado: "+127 reservas/mês, -15h trabalho/semana",
          features: ["Reservas 24/7 no WhatsApp", "Sugestão automática de pratos", "Lembretes e confirmações", "Gestão de cancelamentos"],
        },
        {
          titulo: "Clínicas",
          problema: "Pacientes ligam fora do horário e ninguém atende",
          solucion: "Chatbot 24/7 que agenda consultas, lembra visitas e responde FAQs médicas",
          resultado: "+89 consultas/mês, 0 chamadas perdidas",
          features: ["Agendamento automático", "Lembretes por WhatsApp", "Respostas a FAQs médicas", "Integração com calendário"],
        },
        {
          titulo: "E-commerce",
          problema: "Carrinhos abandonados, consultas sem resposta",
          solucion: "Automações que recuperam carrinhos e chatbot de suporte 24/7",
          resultado: "+34% conversão, -60% consultas manuais",
          features: ["Recuperação de carrinhos", "Suporte chat 24/7", "Rastreamento de pedidos", "Recomendações personalizadas"],
        },
        {
          titulo: "Serviços",
          problema: "Leads que não respondem a tempo e são perdidos",
          solucion: "Sistema de follow-up automático + chatbot de qualificação",
          resultado: "+70% leads convertidos, resposta <2min",
          features: ["Resposta instantânea", "Qualificação automática", "Follow-up sequenciado", "Integração com CRM"],
        },
        {
          titulo: "Imobiliárias",
          problema: "Gerenciar centenas de consultas de imóveis manualmente",
          solucion: "Chatbot que filtra leads, agenda visitas e envia informações detalhadas",
          resultado: "+95 visitas/mês, -20h trabalho/semana",
          features: ["Filtragem de leads", "Agendamento automático de visitas", "Envio de fichas de imóveis", "Follow-up pós-visita"],
        },
      ],
    },
    it: {
      title: "Soluzioni per Industria",
      subtitle: "Automazioni specifiche per ogni settore",
      cases: [
        {
          titulo: "Ristoranti",
          problema: "Gestire 50+ prenotazioni/giorno via WhatsApp manualmente",
          solucion: "Chatbot IA che conferma prenotazioni, suggerisce menu e gestisce cancellazioni automaticamente",
          resultado: "+127 prenotazioni/mese, -15h lavoro/settimana",
          features: ["Prenotazioni 24/7 su WhatsApp", "Suggerimenti automatici di piatti", "Promemoria e conferme", "Gestione cancellazioni"],
        },
        {
          titulo: "Cliniche",
          problema: "I pazienti chiamano fuori orario e nessuno risponde",
          solucion: "Chatbot 24/7 che pianifica appuntamenti, ricorda visite e risponde alle FAQ mediche",
          resultado: "+89 appuntamenti/mese, 0 chiamate perse",
          features: ["Pianificazione automatica appuntamenti", "Promemoria WhatsApp", "Risposte FAQ mediche", "Integrazione calendario"],
        },
        {
          titulo: "E-commerce",
          problema: "Carrelli abbandonati, richieste senza risposta",
          solucion: "Automazioni che recuperano carrelli e chatbot di supporto 24/7",
          resultado: "+34% conversione, -60% richieste manuali",
          features: ["Recupero carrelli", "Supporto chat 24/7", "Tracciamento ordini", "Raccomandazioni personalizzate"],
        },
        {
          titulo: "Servizi",
          problema: "Lead che non rispondono in tempo e vengono persi",
          solucion: "Sistema di follow-up automatico + chatbot di qualificazione",
          resultado: "+70% lead convertiti, risposta <2min",
          features: ["Risposta istantanea", "Qualificazione automatica", "Follow-up sequenziale", "Integrazione CRM"],
        },
        {
          titulo: "Immobiliare",
          problema: "Gestire centinaia di richieste di immobili manualmente",
          solucion: "Chatbot che filtra lead, pianifica visite e invia informazioni dettagliate",
          resultado: "+95 visite/mese, -20h lavoro/settimana",
          features: ["Filtraggio lead", "Pianificazione automatica visite", "Invio schede immobili", "Follow-up post-visita"],
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <section className="section-padding bg-muted/5">
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
