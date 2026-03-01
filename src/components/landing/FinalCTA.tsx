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
      {/* Background */}
      <div className="glow-orb-primary w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-premium text-center p-8 md:p-12 lg:p-16 neon-border max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t.title.split('Piloto Automático')[0]}
            <span className="text-gradient-primary">Piloto Automático</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.subtitle}
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
