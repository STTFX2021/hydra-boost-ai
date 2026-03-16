import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { WebPageSchema, BreadcrumbSchema } from "@/components/seo";
import { Helmet } from "react-helmet-async";
import { ProfileSelector } from "@/components/diagnostic/ProfileSelector";
import { LocalBusinessForm } from "@/components/diagnostic/LocalBusinessForm";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

const AuditoriaGratis = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"select" | "local">("select");

  return (
    <PageLayout>
      <SEOHead
        title="Auditoría IA Gratuita para tu Negocio | HydrAI Labs"
        description="Solicita tu auditoría gratuita de automatización IA. Analizamos tu negocio y te decimos exactamente qué automatizar para ahorrar tiempo y captar más clientes."
        canonical="/auditoria-gratis"
        keywords="auditoria ia gratis, automatizacion negocios, roi automatizacion"
      />
      <WebPageSchema
        name="Auditoría Gratis de Automatización IA"
        description="Solicita tu auditoría gratuita de automatización con IA."
        url="/auditoria-gratis"
      />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Auditoría Gratis', url: '/auditoria-gratis' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-secondary w-80 h-80 top-1/3 -right-40" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
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
              Auditoría de{" "}
              <span className="text-gradient-primary">Automatización IA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Descubre qué procesos puedes automatizar y cuánto puedes ahorrar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
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
                <span>+500 diagnósticos</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding pt-0 pb-20">
        <div className="section-container">
          {view === "select" ? (
            <ProfileSelector
              onSelectLocal={() => setView("local")}
              onSelectEnterprise={() => navigate("/auditoria")}
            />
          ) : (
            <LocalBusinessForm />
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditoriaGratis;
