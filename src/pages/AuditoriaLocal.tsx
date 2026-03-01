import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuditoriaLocal = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Auditoría IA para Negocios Locales - HydrAI Labs"
        description="Auditoría gratuita de 12 áreas clave para negocios locales. Score instantáneo y plan de acción personalizado."
        canonical="/auditoria-local"
      />

      <section className="relative section-padding min-h-[70vh] flex items-center justify-center">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <Construction className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Próximamente</h1>
            <p className="text-muted-foreground mb-8">
              Estamos preparando la auditoría completa de 12 áreas para negocios locales. Vuelve pronto.
            </p>
            <Link to="/auditoria-selector">
              <Button variant="outline">← Volver al selector</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditoriaLocal;
