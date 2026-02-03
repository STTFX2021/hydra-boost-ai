import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation, useI18n, languageNames, type Language } from "@/lib/i18n";
import { useAdmin } from "@/hooks/useAdmin";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const availableLanguages: Language[] = ['es', 'en', 'fr', 'de', 'pt', 'it'];

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
    { to: "/servicios", label: t("nav.industries") },
    { to: "/arquitectura", label: t("nav.architecture") },
    { to: "/casos", label: t("nav.cases") },
    { to: "/contacto", label: t("nav.contact") },
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
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Globe className="w-4 h-4 mr-1" />
                {language.toUpperCase()}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "cursor-pointer",
                    language === lang && "bg-primary/10 text-primary"
                  )}
                >
                  <span className="font-medium">{lang.toUpperCase()}</span>
                  <span className="ml-2 text-muted-foreground text-xs">
                    {languageNames[lang]}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
              {t("nav.audit")}
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
                  {t("nav.audit")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
