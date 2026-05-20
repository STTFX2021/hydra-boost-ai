import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema, SEOHead } from "@/components/seo";
import { usePageSEO } from "@/lib/i18n";
import {
  HeroWorld,
  TrustBar,
  UseCaseTabs,
  BaseImplementations,
  EnterpriseElite,
  LeadFormMultiStep,
  IntegrationsShowcase,
  AgentsTeaser,
  InsightsTeaser,
  LocalSEOLinks,
  WhatWeReview,
  LocalSpecialists,
  DifferentiatorBlock,
} from "@/components/landing";
import { GrowthSystemSection } from "@/components/landing/GrowthSystemSection";
import { InteractiveROICalculator } from "@/components/landing/InteractiveROICalculator";
import { AutomationQuiz } from "@/components/landing/AutomationQuiz";
import { SectorDemos } from "@/components/landing/SectorDemos";
import { AnimatedCounters } from "@/components/landing/AnimatedCounters";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

import { Shield, Zap } from "lucide-react";

// Lazy-loaded below-the-fold sections
const ROICalculator = lazy(() =>
  import("@/components/landing/ROICalculator").then((m) => ({ default: m.ROICalculator })),
);
const ProcessSection = lazy(() =>
  import("@/components/landing/ProcessSection").then((m) => ({ default: m.ProcessSection })),
);
const FAQ = lazy(() => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })));
const TechStack = lazy(() => import("@/components/landing/TechStack").then((m) => ({ default: m.TechStack })));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA").then((m) => ({ default: m.FinalCTA })));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-[200px]" />}>{children}</Suspense>
);

const Index = () => {
  const seo = usePageSEO('home');
  return (
    <>
      <SEOHead title={seo.title} description={seo.description} canonical="/" />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />

      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />

        <main id="main-content">
          <HeroWorld />

          <WhatWeReview />
          <DifferentiatorBlock />

          <GrowthSystemSection />

          <TrustBar />
          <UseCaseTabs />
          <IntegrationsShowcase />
          <BaseImplementations />
          <AnimatedCounters />
          <SectorDemos />
          <AgentsTeaser />
          <LocalSpecialists />
          <LocalSEOLinks />

          <LazySection>
            <InteractiveROICalculator />
          </LazySection>
          <AutomationQuiz />
          <LazySection>
            <ROICalculator />
          </LazySection>

          {/* Enterprise Audit Section */}
          <EnterpriseAuditSection />


          <TestimonialsSection />
          <InsightsTeaser />

          <LazySection>
            <ProcessSection />
          </LazySection>
          <LazySection>
            <FAQ />
          </LazySection>
          <LazySection>
            <TechStack />
          </LazySection>
          <LazySection>
            <FinalCTA />
          </LazySection>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
