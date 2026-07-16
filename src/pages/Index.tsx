import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, SEOHead } from "@/components/seo";
import { HydrAIHero } from "@/components/landing/HydrAIHero";
import { BusinessPillars } from "@/components/landing/BusinessPillars";
import { VozraPlatformSection } from "@/components/landing/VozraPlatformSection";
import { ConversationalDifferentiation } from "@/components/landing/ConversationalDifferentiation";
import { WebDevelopmentSection } from "@/components/landing/WebDevelopmentSection";
import { FeaturedProjectsSection } from "@/components/landing/FeaturedProjectsSection";
import { SarahDemoStrip } from "@/components/landing/SarahDemoStrip";
import { HomeFinalCTA } from "@/components/landing/HomeFinalCTA";

const Index = () => (
  <>
    <SEOHead
      title="Inteligencia Conversacional y Desarrollo Web | HydrAI Labs"
      description="HydrAI Labs crea sistemas conversacionales especializados, agentes de voz, reservas, pedidos, aplicaciones y soluciones web conectadas con la operación real de cada negocio."
      canonical="/"
    />
    <OrganizationSchema />
    <LocalBusinessSchema />
    <WebSiteSchema />

    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Header />

      <main id="main-content">
        <HydrAIHero />
        <BusinessPillars />
        <VozraPlatformSection />
        <ConversationalDifferentiation />
        <WebDevelopmentSection />
        <FeaturedProjectsSection />
        <SarahDemoStrip />
        <HomeFinalCTA />
      </main>

      <Footer />
    </div>
  </>
);

export default Index;
