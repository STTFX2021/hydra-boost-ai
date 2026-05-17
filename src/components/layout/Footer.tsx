import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/20 bg-background">
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.3), hsl(260 60% 55% / 0.2), transparent)' }} />

      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" aria-label="HydrAI Labs - Ir a inicio" className="flex items-center gap-2">
              <img
                src="/favicon.png"
                alt="HydrAI Labs"
                className="w-8 h-8 rounded logo-violet-halo"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
              />
              <span className="font-display font-bold text-lg text-gradient-hydrai">HydrAI Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
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

          {/* Soluciones */}
          <nav aria-label="Soluciones" className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-foreground">{t("footer.solutions")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.solutionsBase")}
                </Link>
              </li>
              <li>
                <Link to="/industrias" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.solutionsEnterprise")}
                </Link>
              </li>
              <li>
                <Link to="/casos" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.solutionsCases")}
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.solutionsProcess")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label="Recursos" className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-foreground">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.resourcesBlog")}
                </Link>
              </li>
              <li>
                <Link to="/casos" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.resourcesCases")}
                </Link>
              </li>
              <li>
                <a 
                  href={DISCORD_INVITE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Unirse a la comunidad de HydrAI Labs en Discord"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.resourcesContact")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-foreground">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* SEO / vertical / city / international links */}
        <div className="mt-12 pt-8 border-t border-border/20 grid gap-8 md:grid-cols-3 text-sm">
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">Soluciones por vertical</h4>
            <ul className="space-y-2">
              <li><Link to="/auditoria-gratis" className="text-muted-foreground hover:text-primary transition-colors">Auditoría gratis</Link></li>
              <li><Link to="/ai-discoverability" className="text-muted-foreground hover:text-primary transition-colors">AI Discoverability</Link></li>
              <li><Link to="/automatizacion-ia-restaurantes-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">Automatización IA Restaurantes</Link></li>
              <li><Link to="/restaurantes-ia-reservas-whatsapp-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">IA Reservas Restaurantes</Link></li>
              <li><Link to="/automatizacion-ia-clinicas-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">Automatización IA Clínicas</Link></li>
              <li><Link to="/automatizacion-ia-inmobiliarias-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">Automatización IA Inmobiliarias</Link></li>
              <li><Link to="/chatbots-whatsapp-negocios-locales" className="text-muted-foreground hover:text-primary transition-colors">Chatbots WhatsApp</Link></li>
              <li><Link to="/agentes-ia-voz-restaurantes" className="text-muted-foreground hover:text-primary transition-colors">Agentes de voz IA</Link></li>
              <li><Link to="/n8n-automatizaciones-empresas" className="text-muted-foreground hover:text-primary transition-colors">n8n Automatizaciones</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">Costa del Sol</h4>
            <ul className="space-y-2">
              <li><Link to="/automatizacion-ia-estepona" className="text-muted-foreground hover:text-primary transition-colors">Estepona</Link></li>
              <li><Link to="/automatizacion-ia-marbella" className="text-muted-foreground hover:text-primary transition-colors">Marbella</Link></li>
              <li><Link to="/automatizacion-ia-malaga" className="text-muted-foreground hover:text-primary transition-colors">Málaga</Link></li>
              <li><Link to="/automatizacion-ia-fuengirola" className="text-muted-foreground hover:text-primary transition-colors">Fuengirola</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground">Internacional</h4>
            <ul className="space-y-2">
              <li><Link to="/eastern-europe-ai-automation-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">AI automation for international businesses</Link></li>
              <li><Link to="/ru" className="text-muted-foreground hover:text-primary transition-colors">Автоматизация ИИ для бизнеса</Link></li>
              <li><Link to="/eastern-europe-ai-automation-costa-del-sol" className="text-muted-foreground hover:text-primary transition-colors">Russian-speaking businesses in Costa del Sol</Link></li>
            </ul>
            <div className="pt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-display font-semibold text-foreground">Idioma:</span>
              <Link to="/" className="hover:text-primary transition-colors">Español</Link>
              <span className="text-border">·</span>
              <Link to="/eastern-europe-ai-automation-costa-del-sol" className="hover:text-primary transition-colors">English</Link>
              <span className="text-border">·</span>
              <Link to="/ru" className="hover:text-primary transition-colors">Русский</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HydrAI Labs - {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
