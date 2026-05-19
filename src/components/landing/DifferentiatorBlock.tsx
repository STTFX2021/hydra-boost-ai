import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const COPY = {
  es: {
    line1: "HydrAI Labs no vende páginas web genéricas.",
    line2: "Construimos sistemas operativos de captación, atención y automatización para negocios locales.",
  },
  en: {
    line1: "HydrAI Labs doesn't sell generic websites.",
    line2: "We build operating systems for lead capture, customer service and automation for local businesses.",
  },
  de: {
    line1: "HydrAI Labs verkauft keine generischen Websites.",
    line2: "Wir bauen Betriebssysteme für Lead-Generierung, Kundenservice und Automatisierung für lokale Unternehmen.",
  },
  ru: {
    line1: "HydrAI Labs не продаёт типовые сайты.",
    line2: "Мы создаём операционные системы для привлечения клиентов, поддержки и автоматизации локального бизнеса.",
  },
};

export const DifferentiatorBlock = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  return (
    <section className="section-padding">
      <div className="section-container max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-primary/20 bg-card/60 backdrop-blur-sm p-8 md:p-12"
          style={{ boxShadow: "0 0 40px hsl(190 100% 50% / 0.08)" }}
        >
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-display font-semibold leading-relaxed text-foreground">
            {t.line1}
            <span className="block text-gradient-hydrai mt-2">{t.line2}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
