import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuditoriaSelector = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Elige tu Auditoría IA - HydrAI Labs"
        description="Selecciona el tipo de auditoría que mejor se adapta a tu negocio. Diagnóstico gratuito para negocios locales o evaluación enterprise avanzada."
        canonical="/auditoria-selector"
      />

      <section className="relative section-padding overflow-hidden min-h-[80vh] flex items-center">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-secondary w-80 h-80 top-1/3 -right-40" />

        <div className="section-container relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Auditoría con IA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5"
            >
              ¿Qué tipo de auditoría{" "}
              <span className="text-gradient-primary">necesitas?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Selecciona el perfil que mejor describe tu negocio
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Local Business Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-2xl border-2 border-primary/30 bg-card/60 backdrop-blur-sm p-8 flex flex-col hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,180,0.12)]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary to-cyan-500" />

              <span className="text-6xl mb-5">🏪</span>
              <h2 className="text-2xl font-display font-bold mb-1">Negocio Local</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Restaurante, clínica, peluquería, taller, gimnasio...
              </p>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5 flex-1">
                Auditoría de 12 áreas clave. Resultado instantáneo con score, problemas detectados y plan de acción en 7/30/90 días.
              </p>

              <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 w-fit mb-6">
                ✓ Gratis · 15 minutos · Informe por WhatsApp
              </div>

              <Link to="/auditoria-local" className="w-full">
                <Button className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 text-base py-5">
                  Empezar auditoría gratuita
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 flex flex-col hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
            >
              <span className="text-6xl mb-5">🏢</span>
              <h2 className="text-2xl font-display font-bold mb-1">Empresa o Startup</h2>
              <p className="text-sm text-muted-foreground mb-4">
                +10 empleados, estructura compleja, múltiples departamentos
              </p>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5 flex-1">
                Evaluación técnica avanzada de infraestructura, integraciones, seguridad y madurez de automatización.
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium bg-muted/20 border border-border/40 rounded-full px-3 py-1.5 w-fit mb-6">
                Valorada en 500€ · Requiere llamada previa
              </div>

              <Link to="/auditoria" className="w-full">
                <Button variant="outline" className="w-full border-border hover:bg-muted/20 text-base py-5">
                  Solicitar auditoría Enterprise
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditoriaSelector;
