import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";

export const FinalCTA = () => {
  const { landing } = useLandingTranslation();
  const t = landing.finalCta;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb-primary w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
      <div className="glow-orb-secondary w-[400px] h-[400px] top-1/4 right-0 opacity-[0.04]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 md:p-14 lg:p-20 max-w-4xl mx-auto rounded-3xl border border-primary/20 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 7%))",
            boxShadow: "0 0 80px hsl(190 100% 50% / 0.06), 0 0 160px hsl(260 60% 55% / 0.03)",
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.4), hsl(260 60% 55% / 0.3), transparent)" }} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Shield className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 leading-tight">
              ¿Listo para poner tu negocio en{" "}
              <span className="text-gradient-hydrai">Piloto Automático</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Agenda tu auditoría gratuita y te mostramos exactamente qué procesos automatizar y el ROI esperado.
            </p>

            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-lg px-12 py-6 rounded-2xl">
                {t.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground mt-8">
              {t.disclaimer}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
