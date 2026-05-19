import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useI18n } from "@/lib/i18n";

const COPY = {
  es: { badge: "Testimonios", title: "Lo que dicen nuestros clientes" },
  en: { badge: "Testimonials", title: "What our clients say" },
  de: { badge: "Stimmen", title: "Was unsere Kunden sagen" },
  ru: { badge: "Отзывы", title: "Что говорят наши клиенты" },
};

export const TestimonialsSection = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  const quoteLang = (language === "es" ? "es" : "en") as "es" | "en";
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb-secondary w-[400px] h-[400px] -bottom-32 -right-32 opacity-[0.05]" />
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge-success mb-4 inline-flex items-center gap-2">
            <Star className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((tt, i) => (
            <motion.div key={tt.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-premium group relative overflow-hidden">
              <Quote className="w-8 h-8 text-primary/10 absolute top-4 right-4" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: tt.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{tt.quote[quoteLang]}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{tt.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{tt.name}</p>
                  <p className="text-xs text-muted-foreground">{tt.business[quoteLang]} • {tt.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
