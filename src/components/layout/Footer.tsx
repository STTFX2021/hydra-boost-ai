import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Mail } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";

export const Footer = () => {
  const { t } = useTranslation();

  const email = "hola@hydrailabs.com";

  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-lg font-semibold text-white">HydrAI Labs</div>
            <p className="text-sm text-white/70">
              {t?.("footer.tagline") ?? "Webs y automatizaciones con IA para negocios locales."}
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link className="text-white/70 hover:text-white" to="/servicios">
              {t?.("nav.services") ?? "Servicios"}
            </Link>
            <Link className="text-white/70 hover:text-white" to="/industrias">
              {t?.("nav.industries") ?? "Industrias"}
            </Link>
            <Link className="text-white/70 hover:text-white" to="/precios">
              {t?.("nav.pricing") ?? "Precios"}
            </Link>
            <Link className="text-white/70 hover:text-white" to="/casos">
              {t?.("nav.cases") ?? "Casos"}
            </Link>
            <Link className="text-white/70 hover:text-white" to="/recursos">
              {t?.("nav.resources") ?? "Recursos"}
            </Link>
            <Link className="text-white/70 hover:text-white" to="/contacto">
              {t?.("nav.contact") ?? "Contacto"}
            </Link>
            <Link className="text-white/70 hover:text-white" to="/inversores">
              {t?.("nav.investors") ?? "Inversores"}
            </Link>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <a className="flex items-center gap-2 text-sm text-white/70 hover:text-white" href={`mailto:${email}`}>
              <Mail className="h-4 w-4" />
              {email}
            </a>

            <a
              className="text-sm text-white/70 hover:text-white"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Discord: {DISCORD_INVITE_URL}
            </a>

            <p className="text-xs text-white/50">© {new Date().getFullYear()} HydrAI Labs</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
