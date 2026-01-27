import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, WebPageSchema, BreadcrumbSchema } from "@/components/seo";
import { DiagnosticForm, DiagnosticButton } from "@/components/diagnostic";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

const AuditoriaGratis = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Diagnóstico de Automatización IA - Evaluación Técnica de Viabilidad"
        description="Evaluación técnica de viabilidad para tu negocio. Descubre qué procesos puedes automatizar con IA y el ROI estimado. Acceso de cortesía valorado en 150€."
        canonical="/auditoria-gratis"
        keywords="diagnostico ia, automatizacion negocios, auditoria ia gratis, roi automatizacion, eficiencia operativa"
      />
      <WebPageSchema
        name="Diagnóstico de Automatización IA"
        description="Evaluación técnica de viabilidad para automatizar tu negocio con IA."
        url="/auditoria-gratis"
      />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Diagnóstico de Automatización', url: '/auditoria-gratis' }
      ]} />

      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-secondary w-80 h-80 top-1/3 -right-40" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            {/* Value Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Acceso de Cortesía (Valorado en 150€)
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            >
              Diagnóstico de{" "}
              <span className="text-gradient-primary">Automatización IA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Evaluación técnica de viabilidad para tu negocio.
              Descubre qué procesos puedes automatizar y el ROI estimado.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground font-mono flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Evaluación técnica de viabilidad • 2 min
            </motion.p>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-success" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Resultados en 2 min</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>+500 diagnósticos realizados</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diagnostic Form Section */}
      <section className="section-padding pt-0 pb-20">
        <div className="section-container">
          <DiagnosticForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditoriaGratis;
