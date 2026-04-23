import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo";
import { Helmet } from "react-helmet-async";
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
  return (
    <>
      <Helmet>
        <title>HydrAI Labs | Automatización IA para Negocios Locales en Costa del Sol</title>
        <meta name="description" content="Agencia de automatización con IA en Costa del Sol. Chatbots WhatsApp 24/7, automatizaciones n8n y captación de clientes para restaurantes, clínicas, inmobiliarias y gimnasios." />
        <link rel="canonical" href="https://hydrailabs.com/" />
        <meta property="og:title" content="HydrAI Labs | Automatización IA para Negocios Locales en Costa del Sol" />
        <meta property="og:description" content="Agencia de automatización con IA en Costa del Sol. Chatbots WhatsApp 24/7, automatizaciones n8n y captación de clientes para restaurantes, clínicas, inmobiliarias y gimnasios." />
        <meta property="og:url" content="https://hydrailabs.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="HydrAI Labs | Automatización IA para Negocios Locales en Costa del Sol" />
        <meta name="twitter:description" content="Agencia de automatización con IA en Costa del Sol. Chatbots WhatsApp 24/7, automatizaciones n8n y captación de clientes para restaurantes, clínicas, inmobiliarias y gimnasios." />
      </Helmet>
      <OrganizationSchema />
      <LocalBusinessSchema />

      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />

        <main id="main-content">
          <HeroWorld />

          <GrowthSystemSection />

          <TrustBar />
          <UseCaseTabs />
          <IntegrationsShowcase />
          <BaseImplementations />
          <AnimatedCounters />
          <SectorDemos />
          <AgentsTeaser />

          <LazySection>
            <InteractiveROICalculator />
          </LazySection>
          <AutomationQuiz />
          <LazySection>
            <ROICalculator />
          </LazySection>

          {/* Enterprise Audit Section */}
          <section id="audit" aria-label="Auditoría Enterprise" className="section-padding relative overflow-hidden section-alt">
            <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
            <div className="section-container relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="badge-primary mb-6 inline-flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    Technical Audit
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                    Enterprise Infrastructure
                    <span className="text-gradient-primary block">Audit</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Comprehensive technical assessment of your automation opportunities. Get a detailed analysis of your stack, security requirements, and ROI projections.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Full stack architecture review",
                      "Security & compliance assessment",
                      "Integration complexity analysis",
                      "Custom ROI projections",
                      "Priority recommendations",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                          <Shield className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Valued at €2,500</span> — Complimentary for qualified enterprises
                    </p>
                  </div>
                </div>
                <div>
                  <LeadFormMultiStep variant="inline" />
                </div>
              </div>
            </div>
          </section>

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
