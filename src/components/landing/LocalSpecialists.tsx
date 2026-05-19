import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const SECTOR_HREFS = ["/sectores/restaurantes", "/sectores/clinicas-estetica", "/sectores/inmobiliarias", "/sectores/gimnasios", "/servicios"];
const CITY_HREFS = ["/automatizacion-ia-marbella", "/automatizacion-ia-malaga", "/automatizacion-ia-estepona", "/automatizacion-ia-fuengirola"];

const COPY = {
  es: {
    badge: "Costa del Sol",
    title: "Especialistas en negocios locales de Costa del Sol",
    sub: "Trabajamos con negocios reales de la zona: entendemos el ritmo del servicio, los idiomas de tus clientes y cómo entra tu facturación.",
    sectorsLabel: "Sectores",
    citiesLabel: "Ciudades",
    sectors: ["Restaurantes", "Clínicas", "Inmobiliarias", "Gimnasios", "Servicios profesionales"],
    cities: ["Marbella", "Málaga", "Estepona", "Fuengirola"],
  },
  en: {
    badge: "Costa del Sol",
    title: "Specialists in local businesses on the Costa del Sol",
    sub: "We work with real businesses in the area: we understand service pace, your customers' languages and how your revenue comes in.",
    sectorsLabel: "Sectors",
    citiesLabel: "Cities",
    sectors: ["Restaurants", "Clinics", "Real estate", "Gyms", "Professional services"],
    cities: ["Marbella", "Málaga", "Estepona", "Fuengirola"],
  },
  de: {
    badge: "Costa del Sol",
    title: "Spezialisten für lokale Unternehmen an der Costa del Sol",
    sub: "Wir arbeiten mit echten Unternehmen vor Ort: wir verstehen den Service-Rhythmus, die Sprachen Ihrer Kunden und wie Ihre Umsätze hereinkommen.",
    sectorsLabel: "Branchen",
    citiesLabel: "Städte",
    sectors: ["Restaurants", "Kliniken", "Immobilien", "Fitnessstudios", "Professionelle Dienstleistungen"],
    cities: ["Marbella", "Málaga", "Estepona", "Fuengirola"],
  },
  ru: {
    badge: "Коста-дель-Соль",
    title: "Специалисты по локальному бизнесу на Коста-дель-Соль",
    sub: "Мы работаем с реальными бизнесами региона: понимаем ритм обслуживания, языки ваших клиентов и как поступает ваша выручка.",
    sectorsLabel: "Отрасли",
    citiesLabel: "Города",
    sectors: ["Рестораны", "Клиники", "Недвижимость", "Спортзалы", "Профессиональные услуги"],
    cities: ["Марбелья", "Малага", "Эстепона", "Фуэнхирола"],
  },
};

export const LocalSpecialists = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  return (
    <section className="section-padding">
      <div className="section-container max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="badge-primary inline-flex items-center gap-2 text-sm mb-4">
            <MapPin className="w-3 h-3" /> {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.sub}</p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">{t.sectorsLabel}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {t.sectors.map((label, i) => (
                <Link key={label} to={SECTOR_HREFS[i]} className="px-4 py-2 rounded-full border border-border/60 bg-card text-sm hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  {label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">{t.citiesLabel}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {t.cities.map((label, i) => (
                <Link key={label} to={CITY_HREFS[i]} className="px-4 py-2 rounded-full border border-border/60 bg-card text-sm hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
