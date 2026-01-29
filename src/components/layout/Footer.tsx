import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";

export const Footer = () => {
  const email = "hola@hydrailabs.com";

  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/favicon.png" alt="HydrAI Labs" className="w-8 h-8 rounded" />
              <span className="font-display font-bold text-lg text-gradient-primary">HydrAI Labs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Arquitecturas de automatización con IA que operan tu negocio 24/7
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                {email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Madrid, España
              </div>
            </div>
          </div>

          {/* Soluciones */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm">Soluciones</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Implementaciones Base
                </Link>
              </li>
              <li>
                <Link to="/industrias" className="text-muted-foreground hover:text-foreground transition-colors">
                  Arquitectura Enterprise
                </Link>
              </li>
              <li>
                <Link to="/casos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Casos de Uso
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/casos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <a 
                  href={DISCORD_INVITE_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Comunidad Discord
                </a>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HydrAI Labs - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
