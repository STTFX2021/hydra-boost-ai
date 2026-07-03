import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/#sentra", label: "Sentra" },
  { to: "/vozra", label: "Vozra" },
  { to: "/servicios", label: "Servicios" },
  { to: "/casos", label: "Casos de uso" },
  { to: "/precios", label: "Precios" },
  { to: "/contacto", label: "Contacto" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" && !location.hash;
    if (path.startsWith("/#")) return location.pathname === "/" && location.hash === path.slice(1);
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-black/92 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl"
          : "border-white/5 bg-black/78 backdrop-blur-md",
      )}
    >
      <nav className="section-container flex h-[118px] items-center justify-between" aria-label="Navegación principal">
        <Link to="/" className="flex shrink-0 items-center" aria-label="HydrAI Labs - Inicio">
          <img
            src="/hydrai-labs-logo.svg"
            alt="HydrAI Labs"
            className="h-[104px] w-auto max-w-[245px] object-contain sm:h-[110px] lg:h-[114px]"
          />
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-[13px] font-medium transition-colors",
                isActive(item.to) ? "text-cyan-300" : "text-zinc-300 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/demo" className="hidden sm:block">
            <Button className="h-12 rounded-xl border border-cyan-300/70 bg-transparent px-6 text-white hover:bg-cyan-300 hover:text-black">
              Probar demo
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/96 backdrop-blur-xl xl:hidden">
          <nav className="section-container space-y-1 py-5" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-3 text-sm font-medium",
                  isActive(item.to) ? "bg-cyan-400/10 text-cyan-300" : "text-zinc-300",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/demo" onClick={() => setMenuOpen(false)} className="block pt-3">
              <Button className="w-full rounded-xl bg-cyan-400 text-black hover:bg-cyan-300">Probar demo</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
