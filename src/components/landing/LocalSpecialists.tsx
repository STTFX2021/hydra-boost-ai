import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const SECTORS = [
  { label: "Restaurantes", href: "/sectores/restaurantes" },
  { label: "Clínicas", href: "/sectores/clinicas-estetica" },
  { label: "Inmobiliarias", href: "/sectores/inmobiliarias" },
  { label: "Gimnasios", href: "/sectores/gimnasios" },
  { label: "Servicios profesionales", href: "/servicios" },
];

const CITIES = [
  { label: "Marbella", href: "/automatizacion-ia-marbella" },
  { label: "Málaga", href: "/automatizacion-ia-malaga" },
  { label: "Estepona", href: "/automatizacion-ia-estepona" },
  { label: "Fuengirola", href: "/automatizacion-ia-fuengirola" },
];

export const LocalSpecialists = () => {
  return (
    <section className="section-padding">
      <div className="section-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge-primary inline-flex items-center gap-2 text-sm mb-4">
            <MapPin className="w-3 h-3" /> Costa del Sol
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Especialistas en negocios locales de Costa del Sol
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabajamos con negocios reales de la zona: entendemos el ritmo del servicio, los
            idiomas de tus clientes y cómo entra tu facturación.
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">
              Sectores
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SECTORS.map((s) => (
                <Link
                  key={s.label}
                  to={s.href}
                  className="px-4 py-2 rounded-full border border-border/60 bg-card text-sm hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  {s.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">
              Ciudades
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CITIES.map((c) => (
                <Link
                  key={c.label}
                  to={c.href}
                  className="px-4 py-2 rounded-full border border-border/60 bg-card text-sm hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3" />
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
