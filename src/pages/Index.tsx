import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead, OrganizationSchema, LocalBusinessSchema } from "@/components/seo";
import {
  HeroWorld,
  TrustBar,
  UseCaseTabs,
  BaseImplementations,
  EnterpriseElite,
  LeadFormMultiStep,
} from "@/components/landing";
import WorkflowAnimation from "@/components/WorkflowAnimation";

import { Shield, Zap } from "lucide-react";

// Lazy-loaded below-the-fold sections
const ROICalculator = lazy(() => import("@/components/landing/ROICalculator").then(m => ({ default: m.ROICalculator })));
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection").then(m => ({ default: m.ProcessSection })));
const FAQ = lazy(() => import("@/components/landing/FAQ").then(m => ({ default: m.FAQ })));
const TechStack = lazy(() => import("@/components/landing/TechStack").then(m => ({ default: m.TechStack })));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA").then(m => ({ default: m.FinalCTA })));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-[200px]" />}>{children}</Suspense>
);

const Index = () => {
  return (
    <>
      <SEOHead
        title="HydrAI Labs | Automatizaciones IA que traen clientes 24/7"
        description="Agencia de automatización IA para negocios locales en España. Chatbots, webs SEO y campañas automáticas. Desde 197€."
        canonical="/"
        keywords="automatización ia, chatbot whatsapp, chatbot ia restaurantes, automatizar negocios, agencia ia españa, n8n, make, automatizaciones sin código"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />

      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />

        <main id="main-content">
          <HeroWorld />

          {/* Demo Video Section */}
          <section id="demo" aria-label="Demo en vivo" className="section-padding relative overflow-hidden">
            <div className="section-container relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Copy */}
                <div>
                  <div className="badge-primary mb-6 inline-flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    Live Demo
                  </div>

                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                    Watch how it works
                    <span className="text-gradient-primary block">in 60 seconds</span>
                  </h2>

                  <p className="text-lg text-muted-foreground mb-8">
                    Real example of how HydrAI captures leads, qualifies them, and routes them to your team
                    automatically.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#audit"
                      className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition"
                    >
                      Request Free Audit
                    </a>

                    <a
                      href="https://youtu.be/jvHA_QbYqf4"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ver demo de HydrAI en YouTube"
                      className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold border border-border hover:bg-muted/40 transition"
                    >
                      Open on YouTube
                    </a>
                  </div>
                </div>

                {/* Right: Video */}
                <div className="rounded-2xl border border-border bg-muted/10 overflow-hidden">
                  <WorkflowAnimation />
                </div>
              </div>
            </div>
          </section>

          <TrustBar />
          <UseCaseTabs />
          <BaseImplementations />
          <LazySection><ROICalculator /></LazySection>

          {/* Enterprise Audit Section */}
          <section id="audit" aria-label="Auditoría Enterprise" className="section-padding relative overflow-hidden">
            <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
            <div className="section-container relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Benefits */}
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
                    Comprehensive technical assessment of your automation opportunities. Get a detailed analysis of your
                    stack, security requirements, and ROI projections.
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
                      <span className="font-semibold text-foreground">Valued at €2,500</span> — Complimentary for
                      qualified enterprises
                    </p>
                  </div>
                </div>

                {/* Right: Form */}
                <div>
                  <LeadFormMultiStep variant="inline" />
                </div>
              </div>
            </div>
          </section>

          <EnterpriseElite />
          <LazySection><ProcessSection /></LazySection>
          
          <LazySection><FAQ /></LazySection>
          <LazySection><TechStack /></LazySection>
          <LazySection><FinalCTA /></LazySection>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
