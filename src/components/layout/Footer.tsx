import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { MessageCircle, Mail } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/30 bg-muted/10">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold text-gradient-primary">{t('brand')}</span>
            <p className="text-muted-foreground mt-3 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:hola@hydraiservices.com"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/servicios" className="hover:text-foreground transition">{t("nav.services")}</Link></li>
              <li><Link to="/industrias" className="hover:text-foreground transition">{t("nav.industries")}</Link></li>
              <li><Link to="/precios" className="hover:text-foreground transition">{t("nav.pricing")}</Link></li>
              <li><Link to="/casos" className="hover:text-foreground transition">{t("nav.cases")}</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition">{t("nav.resources")}</Link></li>
              <li><Link to="/contacto" className="hover:text-foreground transition">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacidad" className="hover:text-foreground transition">{t("footer.privacy")}</Link></li>
              <li><Link to="/terminos" className="hover:text-foreground transition">{t("footer.terms")}</Link></li>
              <li><Link to="/cookies" className="hover:text-foreground transition">{t("footer.cookies")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t border-border/30">
          © {new Date().getFullYear()} {t('brand')}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};
