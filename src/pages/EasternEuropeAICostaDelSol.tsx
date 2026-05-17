import { PageLayout } from "@/components/layout/PageLayout";
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const BASE = "https://hydrailabs.com";
const URL = `${BASE}/eastern-europe-ai-automation-costa-del-sol`;

const COUNTRIES = [
  "Latvia", "Lithuania", "Estonia", "Poland", "Czech Republic",
  "Slovakia", "Ukraine", "Romania", "Bulgaria",
];

const FEATURES = [
  { title: "Multilingual by design", desc: "WhatsApp bots and voice agents that handle Spanish, English and Russian — and can be extended to your home language." },
  { title: "Lead capture for international SMBs", desc: "From Idealista, Kyero, Rightmove, Meta Ads, Google or your own site — we route, qualify and reply in seconds." },
  { title: "n8n & CRM automations", desc: "We connect your tools (HubSpot, Notion, Sheets, Stripe, Supabase) into workflows that scale without hiring." },
  { title: "Voice AI agents", desc: "24/7 phone agents for restaurants, clinics and service businesses that miss too many calls." },
  { title: "Local operations, EU compliance", desc: "We are based in Costa del Sol and host data inside the EU. GDPR-aware by default." },
  { title: "Free 24h audit", desc: "We map your processes and send a concrete automation plan in 24 hours, no commitment." },
];

const FAQ = [
  { question: "Do you work with companies registered in Eastern Europe?", answer: "Yes. We work with founders and operators from Latvia, Lithuania, Estonia, Poland, Czech Republic, Slovakia, Ukraine, Romania and Bulgaria who are running or expanding their business in Costa del Sol or Spain." },
  { question: "Which sectors do you cover?", answer: "Restaurants, aesthetic and dental clinics, real estate agencies, gyms, boutique hotels, professional services and premium B2C businesses." },
  { question: "Can you support Russian-speaking customers?", answer: "Yes. Our chatbots and voice agents handle Russian, Spanish and English natively, which is essential in Costa del Sol's international market." },
  { question: "What does an automation project cost?", answer: "Implementations typically start from €1.500 one-off plus a monthly fee from €297. The audit is free." },
  { question: "Do you provide legal, tax or real estate services?", answer: "No. We only build AI automations and integrations. For legal or fiscal advice we recommend specialised partners." },
];

const EasternEuropeAICostaDelSol = () => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    inLanguage: "en",
    name: "AI automation for Eastern European businesses in Costa del Sol",
    description: "HydrAI Labs builds WhatsApp chatbots, voice AI agents and business automations for international companies, local services, restaurants, clinics and real estate businesses operating in Costa del Sol.",
    areaServed: COUNTRIES.concat(["Spain", "Costa del Sol"]).map((c) => ({ "@type": "Place", name: c })),
    provider: { "@type": "Organization", name: "HydrAI Labs", url: BASE },
    url: URL,
  };

  return (
    <PageLayout>
      <Helmet>
        <html lang="en" />
        <title>AI Automation for Eastern European Businesses in Costa del Sol | HydrAI Labs</title>
        <meta name="description" content="HydrAI Labs builds WhatsApp chatbots, voice AI agents and business automations for Eastern European companies, restaurants, clinics, real estate and service businesses in Costa del Sol." />
        <link rel="canonical" href={URL} />
        <link rel="alternate" hrefLang="en" href={URL} />
        <link rel="alternate" hrefLang="es" href={`${BASE}/`} />
        <link rel="alternate" hrefLang="ru" href={`${BASE}/ru`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE}/`} />
        <meta property="og:title" content="AI Automation for Eastern European Businesses in Costa del Sol" />
        <meta property="og:description" content="WhatsApp chatbots, voice AI agents and n8n automations for international SMBs in Costa del Sol." />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <BreadcrumbSchema items={[
        { name: "HydrAI Labs", url: "/" },
        { name: "Eastern Europe AI Automation", url: "/eastern-europe-ai-automation-costa-del-sol" },
      ]} />
      <FAQSchema items={FAQ} />
      <ServiceSchema
        name="AI automation for Eastern European businesses in Costa del Sol"
        description="WhatsApp chatbots, voice AI agents and automations for international SMBs in Costa del Sol."
        url="/eastern-europe-ai-automation-costa-del-sol"
      />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="glow-orb-primary w-[500px] h-[500px] -top-48 -left-48" />
        <div className="section-container relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="badge-primary inline-flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4" /> International · Costa del Sol
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            <span className="text-foreground">AI automation for </span>
            <span className="text-gradient-primary">Eastern European businesses</span>
            <span className="text-foreground"> in Costa del Sol</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            HydrAI Labs builds WhatsApp chatbots, voice AI agents and business automations for
            international companies, local services, restaurants, clinics and real estate businesses
            operating in Costa del Sol.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[280px]">
                Request a free AI automation audit
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/ru">
              <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6 h-12">
                Русская версия
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {COUNTRIES.map((c) => (
              <span key={c} className="text-xs rounded-full border border-border/60 bg-card px-3 py-1 text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="section-container max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">What we build</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border/60 bg-card p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="section-container max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Free 24h audit for your business
          </h2>
          <p className="text-secondary-foreground/80 text-lg">
            We map your customer-facing processes, identify lead leaks and send a concrete
            automation plan within 24 hours. No commitment.
          </p>
          <Link to="/auditoria-gratis">
            <Button size="lg" className="btn-neon text-base px-8 h-12">
              Request a free AI automation audit
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="section-container max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-border/60 bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-foreground font-medium hover:text-primary transition-colors list-none">
                  {faq.question}
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EasternEuropeAICostaDelSol;
