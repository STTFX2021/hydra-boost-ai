import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, SEOHead } from "@/components/seo";
import { HydrAIHero } from "@/components/landing/HydrAIHero";
import { BusinessPillars } from "@/components/landing/BusinessPillars";
import { VozraPlatformSection } from "@/components/landing/VozraPlatformSection";
import { ConversationalDifferentiation } from "@/components/landing/ConversationalDifferentiation";
import { WebDevelopmentSection } from "@/components/landing/WebDevelopmentSection";
import { FeaturedProjectsSection } from "@/components/landing/FeaturedProjectsSection";
import { HomeFinalCTA } from "@/components/landing/HomeFinalCTA";

const Index = () => (
  <>
    <SEOHead
      title="Inteligencia Conversacional para Empresas | HydrAI Labs"
      description="Diseñamos sistemas de inteligencia conversacional: agentes de voz y WhatsApp, reservas, pedidos y atención al cliente conectados con la operación real. Desarrollo web como capa de captación e integración."
      keywords="inteligencia conversacional, agentes de voz IA, IA conversacional para empresas, automatización de llamadas, agentes WhatsApp, Vozra, Vozra Rapid, desarrollo web con IA"
      canonical="/"
    />
    <OrganizationSchema />
    <LocalBusinessSchema />
    <WebSiteSchema />

    <div className="hydrai-grid-page min-h-screen bg-background">
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
        <HomeFinalCTA />
      </main>

      <Footer />
    </div>
  </>
);

export default Index;
