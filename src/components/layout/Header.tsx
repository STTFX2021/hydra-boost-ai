import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation, useI18n } from "@/lib/i18n";
import { useAdmin } from "@/hooks/useAdmin";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { t, language } = useTranslation();
  const { setLanguage } = useI18n();
  const { isAdmin } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: "/servicios", label: "Automatizaciones" },
    { to: "/industrias", label: "Arquitectura IA" },
    { to: "/casos", label: "Casos de Uso" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="section-container flex items-center justify-between h-18 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-xl font-bold"
        >
          <img
            src="/favicon.png"
            alt="HydrAI Labs"
            className="w-9 h-9 rounded-lg"
          />
          <span className="text-gradient-primary">{t("brand")}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(item.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
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
              <Button variant="ghost" size="sm">
                {t("nav.login")}
              </Button>
            </Link>
          )}

          <Link to="/auditoria" className="hidden sm:block">
            <Button size="sm" className="btn-neon">
              Solicitar Auditoría
            </Button>
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
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border/50">
          <div className="section-container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium",
                  isActive(item.to) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border/30">
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
              )}
              <Link to="/auditoria" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="btn-neon">
                  Solicitar Auditoría
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
