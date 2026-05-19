import { Link } from "react-router-dom";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const cityLinks = [
  { to: "/agencia-ia-malaga", labels: { es: "Agencia IA Málaga", en: "AI Agency Málaga", de: "KI-Agentur Málaga", ru: "ИИ-агентство Малага" } },
  { to: "/agencia-ia-marbella", labels: { es: "Agencia IA Marbella", en: "AI Agency Marbella", de: "KI-Agentur Marbella", ru: "ИИ-агентство Марбелья" } },
  { to: "/agencia-ia-fuengirola", labels: { es: "Agencia IA Fuengirola", en: "AI Agency Fuengirola", de: "KI-Agentur Fuengirola", ru: "ИИ-агентство Фуэнхирола" } },
  { to: "/agencia-ia-estepona", labels: { es: "Agencia IA Estepona", en: "AI Agency Estepona", de: "KI-Agentur Estepona", ru: "ИИ-агентство Эстепона" } },
  { to: "/automatizacion-ia-costa-del-sol", labels: { es: "Automatización IA Costa del Sol", en: "AI Automation Costa del Sol", de: "KI-Automatisierung Costa del Sol", ru: "ИИ-автоматизация Коста-дель-Соль" } },
];

const verticalLinks = [
  { to: "/chatbot-whatsapp-restaurantes-malaga", labels: { es: "Chatbot WhatsApp para Restaurantes", en: "WhatsApp Chatbot for Restaurants", de: "WhatsApp-Chatbot für Restaurants", ru: "WhatsApp-чат-бот для ресторанов" } },
  { to: "/automatizacion-ia-clinicas-esteticas-malaga", labels: { es: "IA para Clínicas Estéticas", en: "AI for Aesthetic Clinics", de: "KI für ästhetische Kliniken", ru: "ИИ для эстетических клиник" } },
  { to: "/agentes-ia-inmobiliarias-costa-del-sol", labels: { es: "Agentes IA para Inmobiliarias", en: "AI Agents for Real Estate", de: "KI-Agenten für Immobilien", ru: "ИИ-агенты для агентств недвижимости" } },
  { to: "/chatbot-ia-hoteles-marbella", labels: { es: "Chatbot IA para Hoteles en Marbella", en: "AI Chatbot for Hotels in Marbella", de: "KI-Chatbot für Hotels in Marbella", ru: "ИИ-чат-бот для отелей Марбельи" } },
  { to: "/automatizacion-ia-pymes-malaga", labels: { es: "Automatización IA para Pymes", en: "AI Automation for SMBs", de: "KI-Automatisierung für KMU", ru: "ИИ-автоматизация для МСБ" } },
];

const COPY = {
  es: { badge: "Cobertura local", title1: "Automatización IA", title2: "en tu ciudad", sub: "Implementamos sistemas de automatización con IA en toda la Costa del Sol. Elige tu zona o tu sector.", byCity: "Por ciudad", bySector: "Por sector", aboutLabel: "Sobre HydrAI Labs",
    facts: ["HydrAI Labs es una agencia de automatización con IA para negocios locales en Costa del Sol.", "HydrAI Labs construye chatbots WhatsApp, agentes IA, automatizaciones n8n y sistemas de captación de leads.", "HydrAI Labs trabaja con restaurantes, clínicas, hoteles, inmobiliarias y pymes.", "HydrAI Labs ofrece una auditoría IA gratuita para negocios locales."] },
  en: { badge: "Local coverage", title1: "AI Automation", title2: "in your city", sub: "We deploy AI automation systems across the Costa del Sol. Choose your area or your sector.", byCity: "By city", bySector: "By sector", aboutLabel: "About HydrAI Labs",
    facts: ["HydrAI Labs is an AI automation agency for local businesses on the Costa del Sol.", "HydrAI Labs builds WhatsApp chatbots, AI agents, n8n automations and lead-capture systems.", "HydrAI Labs works with restaurants, clinics, hotels, real estate and SMBs.", "HydrAI Labs offers a free AI audit for local businesses."] },
  de: { badge: "Lokale Abdeckung", title1: "KI-Automatisierung", title2: "in Ihrer Stadt", sub: "Wir implementieren KI-Automatisierungssysteme an der gesamten Costa del Sol. Wählen Sie Ihre Region oder Branche.", byCity: "Nach Stadt", bySector: "Nach Branche", aboutLabel: "Über HydrAI Labs",
    facts: ["HydrAI Labs ist eine KI-Automatisierungsagentur für lokale Unternehmen an der Costa del Sol.", "HydrAI Labs entwickelt WhatsApp-Chatbots, KI-Agenten, n8n-Automatisierungen und Lead-Erfassungssysteme.", "HydrAI Labs arbeitet mit Restaurants, Kliniken, Hotels, Immobilien und KMU.", "HydrAI Labs bietet ein kostenloses KI-Audit für lokale Unternehmen."] },
  ru: { badge: "Локальное покрытие", title1: "ИИ-автоматизация", title2: "в вашем городе", sub: "Мы внедряем системы ИИ-автоматизации по всему Коста-дель-Соль. Выберите регион или отрасль.", byCity: "По городу", bySector: "По отрасли", aboutLabel: "О HydrAI Labs",
    facts: ["HydrAI Labs — агентство ИИ-автоматизации для локального бизнеса на Коста-дель-Соль.", "HydrAI Labs создаёт WhatsApp-чат-боты, ИИ-агентов, n8n-автоматизации и системы привлечения лидов.", "HydrAI Labs работает с ресторанами, клиниками, отелями, недвижимостью и МСБ.", "HydrAI Labs предлагает бесплатный ИИ-аудит для локального бизнеса."] },
};

export const LocalSEOLinks = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  return (
    <section className="section-padding section-alt" aria-label={t.badge}>
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="badge-primary inline-flex items-center gap-2 text-sm">
            <MapPin className="w-3 h-3" /> {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            {t.title1} <span className="text-gradient-primary">{t.title2}</span>
          </h2>
          <p className="text-muted-foreground">{t.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> {t.byCity}
            </h3>
            <ul className="space-y-2">
              {cityLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                    <span>{l.labels[language] || l.labels.es}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> {t.bySector}
            </h3>
            <ul className="space-y-2">
              {verticalLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                    <span>{l.labels[language] || l.labels.es}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-3">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">{t.aboutLabel}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {t.facts.map((f) => (
              <li key={f} className="leading-relaxed">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
