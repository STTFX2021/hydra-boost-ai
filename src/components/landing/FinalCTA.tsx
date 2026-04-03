import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";

export const FinalCTA = () => {
  const { landing } = useLandingTranslation();
  const t = landing.finalCta;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb-primary w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
      <div className="glow-orb-secondary w-[400px] h-[400px] top-1/4 right-0 opacity-[0.04]" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-8 md:p-12 lg:p-16 max-w-4xl mx-auto rounded-3xl border border-primary/20"
          style={{
            background: 'linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 8%))',
            boxShadow: '0 0 60px hsl(190 100% 50% / 0.06), 0 0 120px hsl(260 60% 55% / 0.04)',
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            ¿Listo para poner tu negocio en{" "}
            <span className="text-gradient-hydrai">Piloto Automático</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agenda tu auditoría gratuita y te mostramos exactamente qué procesos automatizar y el ROI esperado.
          </p>
          
          <Link to="/auditoria-gratis">
            <Button size="lg" className="btn-neon text-lg px-10">
              {t.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-6">
            {t.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
