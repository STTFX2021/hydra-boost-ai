import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FinalCTA = () => {
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
            ¿Listo para Ver Tu Empresa en{" "}
            <span className="text-gradient-primary">Piloto Automático</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agenda una auditoría gratuita y te mostraremos exactamente qué procesos 
            podemos automatizar en tu negocio y el ROI esperado.
          </p>
          
          <Link to="/auditoria">
            <Button size="lg" className="btn-neon text-lg px-10">
              Solicitar Auditoría de Automatización
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-6">
            No es una llamada de ventas. Es una auditoría técnica real de tus procesos automatizables.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
