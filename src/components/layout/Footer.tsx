import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" aria-label="HydrAI Labs - Ir a inicio" className="flex items-center gap-2">
              <img
                src="/favicon.png"
                alt="HydrAI Labs"
                className="w-8 h-8 rounded"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
              />
              <span className="font-display font-bold text-lg text-gradient-primary">HydrAI Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${t("footer.email")}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
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
            <h4 className="font-display font-semibold text-sm">{t("footer.solutions")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.solutionsBase")}
                </Link>
              </li>
              <li>
                <Link to="/industrias" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.solutionsEnterprise")}
                </Link>
              </li>
              <li>
                <Link to="/casos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.solutionsCases")}
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.solutionsProcess")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label="Recursos" className="space-y-4">
            <h4 className="font-display font-semibold text-sm">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.resourcesBlog")}
                </Link>
              </li>
              <li>
                <Link to="/casos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.resourcesCases")}
                </Link>
              </li>
              <li>
                <a 
                  href={DISCORD_INVITE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Unirse a la comunidad de HydrAI Labs en Discord"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.resourcesContact")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="space-y-4">
            <h4 className="font-display font-semibold text-sm">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HydrAI Labs - {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
