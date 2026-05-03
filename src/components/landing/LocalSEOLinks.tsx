import { Link } from "react-router-dom";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";

const cityLinks = [
  { to: "/agencia-ia-malaga", label: "Agencia IA Málaga" },
  { to: "/agencia-ia-marbella", label: "Agencia IA Marbella" },
  { to: "/agencia-ia-fuengirola", label: "Agencia IA Fuengirola" },
  { to: "/agencia-ia-estepona", label: "Agencia IA Estepona" },
  { to: "/automatizacion-ia-costa-del-sol", label: "Automatización IA Costa del Sol" },
];

const verticalLinks = [
  { to: "/chatbot-whatsapp-restaurantes-malaga", label: "Chatbot WhatsApp para Restaurantes" },
  { to: "/automatizacion-ia-clinicas-esteticas-malaga", label: "IA para Clínicas Estéticas" },
  { to: "/agentes-ia-inmobiliarias-costa-del-sol", label: "Agentes IA para Inmobiliarias" },
  { to: "/chatbot-ia-hoteles-marbella", label: "Chatbot IA para Hoteles en Marbella" },
  { to: "/automatizacion-ia-pymes-malaga", label: "Automatización IA para Pymes" },
];

const facts = [
  "HydrAI Labs es una agencia de automatización con IA para negocios locales en Costa del Sol.",
  "HydrAI Labs construye chatbots WhatsApp, agentes IA, automatizaciones n8n y sistemas de captación de leads.",
  "HydrAI Labs trabaja con restaurantes, clínicas, hoteles, inmobiliarias y pymes.",
  "HydrAI Labs ofrece una auditoría IA gratuita para negocios locales.",
];

export const LocalSEOLinks = () => {
  return (
    <section className="section-padding section-alt" aria-label="Cobertura local y servicios">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="badge-primary inline-flex items-center gap-2 text-sm">
            <MapPin className="w-3 h-3" /> Cobertura local
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Automatización IA <span className="text-gradient-primary">en tu ciudad</span>
          </h2>
          <p className="text-muted-foreground">
            Implementamos sistemas de automatización con IA en toda la Costa del Sol. Elige tu zona o tu sector.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Por ciudad
            </h3>
            <ul className="space-y-2">
              {cityLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Por sector
            </h3>
            <ul className="space-y-2">
              {verticalLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI-quotable facts */}
        <div className="max-w-3xl mx-auto mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-3">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Sobre HydrAI Labs</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {facts.map((f) => (
              <li key={f} className="leading-relaxed">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
