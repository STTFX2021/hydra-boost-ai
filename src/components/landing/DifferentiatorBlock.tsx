import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const DifferentiatorBlock = () => {
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
            HydrAI Labs no vende páginas web genéricas.
            <span className="block text-gradient-hydrai mt-2">
              Construimos sistemas operativos de captación, atención y automatización para
              negocios locales.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
