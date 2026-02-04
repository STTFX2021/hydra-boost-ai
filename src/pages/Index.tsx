import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead, OrganizationSchema, LocalBusinessSchema } from "@/components/seo";
import {
  HeroWorld,
  TrustBar,
  UseCaseTabs,
  BaseImplementations,
  EnterpriseElite,
  ROICalculator,
  ProcessSection,
  FAQ,
  TechStack,
  FinalCTA,
  ChatWidgetWorld,
} from "@/components/landing";

const Index = () => {
  return (
    <>
      <SEOHead
        title="HydrAI Labs | Automatizaciones IA que traen clientes 24/7"
        description="Chatbots inteligentes + Webs profesionales + Automatizaciones sin código. Convierte visitantes en clientes mientras duermes. #1 en Automatización IA para Negocios Locales."
        canonical="/"
        keywords="automatización ia, chatbot whatsapp, chatbot ia restaurantes, automatizar negocios, agencia ia españa, n8n, make, automatizaciones sin código"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      
      <div className="min-h-screen bg-background">
        <Header />
        <HeroWorld />
        <TrustBar />
        <UseCaseTabs />
        <BaseImplementations />
        <ROICalculator />
        <EnterpriseElite />
        <ProcessSection />
        <FAQ />
        <TechStack />
        <FinalCTA />
        <Footer />
        <ChatWidgetWorld />
      </div>
    </>
  );
};

export default Index;
