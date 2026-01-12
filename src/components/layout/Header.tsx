import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation, useI18n } from "@/lib/i18n";
import { useAdmin } from "@/hooks/useAdmin";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const { t, language } = useTranslation();
  const { setLanguage } = useI18n();
  const { isAdmin } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: "/servicios", label: t("nav.services") },
    { to: "/industrias", label: t("nav.industries") },
    { to: "/precios", label: t("nav.pricing") },
    { to: "/casos", label: t("nav.cases") },
    { to: "/blog", label: t("nav.resources") },
    { to: "/contacto", label: t("nav.contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="section-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-gradient-primary">
          <img src="/favicon.png" alt="HydrAI Labs" className="w-8 h-8 rounded" />
          {t('brand')}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm transition ${
                isActive(item.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Globe className="w-4 h-4 mr-1" />
            {language.toUpperCase()}
          </Button>

          {/* Only show Admin link if user is admin */}
          {isAdmin && (
            <Link to="/admin" className="hidden sm:block">
              <Button variant="ghost" size="sm">{t("nav.login")}</Button>
            </Link>
          )}
          
          <Link to="/auditoria" className="hidden sm:block">
            <Button size="sm" className="btn-neon">{t("nav.audit")}</Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-border/30">
          <div className="section-container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm ${
                  isActive(item.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border/30">
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" size="sm">{t("nav.login")}</Button>
                </Link>
              )}
              <Link to="/auditoria" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="btn-neon">{t("nav.audit")}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
