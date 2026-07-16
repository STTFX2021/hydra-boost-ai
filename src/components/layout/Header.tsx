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

const availableLanguages: Language[] = ["es", "en", "de", "ru"];

const navItems = [
  { href: "/#inteligencia-conversacional", label: "Inteligencia conversacional", anchor: true },
  { href: "/#vozra", label: "Vozra", anchor: true },
  { href: "/#desarrollo-web", label: "Desarrollo web", anchor: true },
  { href: "/casos", label: "Proyectos", anchor: false },
  { href: "/contacto", label: "Contacto", anchor: false },
] as const;

export const Header = () => {
  const { t, language } = useTranslation();
  const { setLanguage } = useI18n();
  const { isAdmin } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => !path.includes("#") && location.pathname === path;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/95 shadow-lg shadow-black/10 backdrop-blur-lg"
          : "bg-background/55 backdrop-blur-md",
      )}
    >
      <nav aria-label="Navegación principal" className="section-container flex min-h-[76px] items-center justify-between gap-4 py-3">
        <Link to="/" aria-label="HydrAI Labs - Ir a inicio" className="flex shrink-0 items-center">
          <img
            src="/brand/hydrai/hydrai-logo.svg"
            alt="HydrAI Labs"
            className="h-12 w-auto max-w-[150px] object-contain"
            width={150}
            height={48}
            loading="eager"
            decoding="async"
          />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) =>
            item.anchor ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden text-muted-foreground hover:text-foreground sm:flex"
                aria-label={`Cambiar idioma. Idioma actual: ${languageNames[language]}`}
              >
                <Globe className="mr-1 h-4 w-4" />
                {language.toUpperCase()}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn("cursor-pointer", language === lang && "bg-primary/10 text-primary")}
                >
                  <span className="font-medium">{lang.toUpperCase()}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{languageNames[lang]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAdmin && (
            <Link to="/admin" className="hidden lg:block">
              <Button variant="ghost" size="sm">
                {t("nav.login")}
              </Button>
            </Link>
          )}

          <Link to="/contacto" className="hidden sm:block">
            <Button size="sm" className="btn-neon">
              Solicitar demo
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border/30 bg-background/95 backdrop-blur-xl xl:hidden">
          <nav aria-label="Navegación móvil" className="section-container space-y-2 py-4">
            {navItems.map((item) =>
              item.anchor ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium",
                    isActive(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="flex flex-wrap gap-3 border-t border-border/30 pt-4">
              <Link to="/contacto" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="btn-neon">
                  Solicitar demo
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
