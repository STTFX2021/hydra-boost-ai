import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const SEO_COPY = {
  es: {
    verticalsTitle: "Soluciones por vertical",
    auditFree: "Auditoría gratis",
    aiDisc: "AI Discoverability",
    autoRest: "Automatización IA Restaurantes",
    iaReservas: "IA Reservas Restaurantes",
    autoClin: "Automatización IA Clínicas",
    autoInmo: "Automatización IA Inmobiliarias",
    chatWa: "Chatbots WhatsApp",
    voiceAg: "Agentes de voz IA",
    n8n: "n8n Automatizaciones",
    costaTitle: "Costa del Sol",
    intlTitle: "Internacional",
    intlA: "AI automation for international businesses",
    intlB: "Автоматизация ИИ для бизнеса",
    intlC: "Russian-speaking businesses in Costa del Sol",
    langLabel: "Idioma:",
  },
  en: {
    verticalsTitle: "Solutions by vertical",
    auditFree: "Free audit",
    aiDisc: "AI Discoverability",
    autoRest: "AI Automation for Restaurants",
    iaReservas: "AI Booking for Restaurants",
    autoClin: "AI Automation for Clinics",
    autoInmo: "AI Automation for Real Estate",
    chatWa: "WhatsApp Chatbots",
    voiceAg: "AI Voice Agents",
    n8n: "n8n Automations",
    costaTitle: "Costa del Sol",
    intlTitle: "International",
    intlA: "AI automation for international businesses",
    intlB: "Автоматизация ИИ для бизнеса",
    intlC: "Russian-speaking businesses in Costa del Sol",
    langLabel: "Language:",
  },
  de: {
    verticalsTitle: "Branchenlösungen",
    auditFree: "Kostenloses Audit",
    aiDisc: "AI Discoverability",
    autoRest: "KI-Automatisierung Restaurants",
    iaReservas: "KI-Reservierungen Restaurants",
    autoClin: "KI-Automatisierung Kliniken",
    autoInmo: "KI-Automatisierung Immobilien",
    chatWa: "WhatsApp-Chatbots",
    voiceAg: "KI-Sprachagenten",
    n8n: "n8n-Automatisierungen",
    costaTitle: "Costa del Sol",
    intlTitle: "International",
    intlA: "KI-Automatisierung für internationale Unternehmen",
    intlB: "Автоматизация ИИ для бизнеса",
    intlC: "Russischsprachige Unternehmen an der Costa del Sol",
    langLabel: "Sprache:",
  },
  ru: {
    verticalsTitle: "Решения по отраслям",
    auditFree: "Бесплатный аудит",
    aiDisc: "AI Discoverability",
    autoRest: "ИИ-автоматизация для ресторанов",
    iaReservas: "ИИ-бронирование столиков",
    autoClin: "ИИ-автоматизация для клиник",
    autoInmo: "ИИ-автоматизация для недвижимости",
    chatWa: "WhatsApp-чат-боты",
    voiceAg: "Голосовые ИИ-агенты",
    n8n: "Автоматизации n8n",
    costaTitle: "Коста-дель-Соль",
    intlTitle: "Международные",
    intlA: "ИИ-автоматизация для международного бизнеса",
    intlB: "Автоматизация ИИ для бизнеса",
    intlC: "Русскоязычный бизнес на Коста-дель-Соль",
    langLabel: "Язык:",
  },
} as const;

export const Footer = () => {
  const { t, language } = useTranslation();
  const s = SEO_COPY[language as keyof typeof SEO_COPY] ?? SEO_COPY.es;

  return (
    <footer className="border-t border-border/20 bg-background">
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.3), hsl(260 60% 55% / 0.2), transparent)' }} />

      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" aria-label="HydrAI Labs" className="flex items-center gap-2">
              <img src="/favicon.png" alt="HydrAI Labs" className="w-8 h-8 rounded logo-violet-halo" width={32} height={32} loading="lazy" decoding="async" />
              <span className="font-display font-bold text-lg text-gradient-hydrai">HydrAI Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${t("footer.email")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {t("footer.email")}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t("footer.location")}
              </div>
            </div>
          </div>

          <nav aria-label={t("footer.solutions")} className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-foreground">{t("footer.solutions")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/servicios" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.solutionsBase")}</Link></li>
              <li><Link to="/industrias" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.solutionsEnterprise")}</Link></li>
              <li><Link to="/casos" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.solutionsCases")}</Link></li>
              <li><Link to="/precios" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.solutionsProcess")}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t("footer.resources")} className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-foreground">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.resourcesBlog")}</Link></li>
              <li><Link to="/casos" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.resourcesCases")}</Link></li>
              <li><a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
              <li><Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.resourcesContact")}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t("footer.legal")} className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/terminos" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.terms")}</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.cookies")}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 grid gap-8 md:grid-cols-3 text-sm">
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">{s.verticalsTitle}</h4>
            <ul className="space-y-2">
              <li><Link to="/auditoria-gratis" className="text-muted-foreground hover:text-primary transition-colors">{s.auditFree}</Link></li>
              <li><Link to="/ai-discoverability" className="text-muted-foreground hover:text-primary transition-colors">{s.aiDisc}</Link></li>
              <li><Link to="/automatizacion-ia-restaurantes-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">{s.autoRest}</Link></li>
              <li><Link to="/restaurantes-ia-reservas-whatsapp-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">{s.iaReservas}</Link></li>
              <li><Link to="/automatizacion-ia-clinicas-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">{s.autoClin}</Link></li>
              <li><Link to="/automatizacion-ia-inmobiliarias-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">{s.autoInmo}</Link></li>
              <li><Link to="/chatbots-whatsapp-negocios-locales" className="text-muted-foreground hover:text-primary transition-colors">{s.chatWa}</Link></li>
              <li><Link to="/agentes-ia-voz-restaurantes" className="text-muted-foreground hover:text-primary transition-colors">{s.voiceAg}</Link></li>
              <li><Link to="/n8n-automatizaciones-empresas" className="text-muted-foreground hover:text-primary transition-colors">{s.n8n}</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">{s.costaTitle}</h4>
            <ul className="space-y-2">
              <li><Link to="/automatizacion-ia-estepona" className="text-muted-foreground hover:text-primary transition-colors">Estepona</Link></li>
              <li><Link to="/automatizacion-ia-marbella" className="text-muted-foreground hover:text-primary transition-colors">Marbella</Link></li>
              <li><Link to="/automatizacion-ia-malaga" className="text-muted-foreground hover:text-primary transition-colors">Málaga</Link></li>
              <li><Link to="/automatizacion-ia-fuengirola" className="text-muted-foreground hover:text-primary transition-colors">Fuengirola</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">{s.intlTitle}</h4>
            <ul className="space-y-2">
              <li><Link to="/eastern-europe-ai-automation-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">{s.intlA}</Link></li>
              <li><Link to="/ru" className="text-muted-foreground hover:text-primary transition-colors">{s.intlB}</Link></li>
              <li><Link to="/eastern-europe-ai-automation-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">{s.intlC}</Link></li>
            </ul>
            <div className="pt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-display font-semibold text-foreground">{s.langLabel}</span>
              <Link to="/" className="hover:text-primary transition-colors">Español</Link>
              <span className="text-border">·</span>
              <Link to="/eastern-europe-ai-automation-costa-del-sol" className="hover:text-primary transition-colors">English</Link>
              <span className="text-border">·</span>
              <Link to="/ru" className="hover:text-primary transition-colors">Русский</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HydrAI Labs - {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
