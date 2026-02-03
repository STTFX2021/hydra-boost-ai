import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead, OrganizationSchema, LocalBusinessSchema } from "@/components/seo";
import {
  HeroSection,
  BaseImplementations,
  EnterpriseElite,
  ProcessSection,
  TechStack,
  FinalCTA,
  FAQ,
} from "@/components/landing";

const Index = () => {
  return (
    <>
      <SEOHead
        title="HydrAI Labs | Arquitecturas de Automatización con IA"
        description="Diseñamos arquitecturas de automatización con IA que conectan captación, operaciones y clientes en un sistema autónomo. No vendemos herramientas sueltas — construimos el sistema nervioso de tu empresa."
        canonical="/"
        keywords="automatización ia, arquitectura enterprise, event bus, orchestrator, agentes ia, chatbot whatsapp, automatización negocios"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <BaseImplementations />
        <EnterpriseElite />
        <ProcessSection />
        <FAQ />
        <TechStack />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
