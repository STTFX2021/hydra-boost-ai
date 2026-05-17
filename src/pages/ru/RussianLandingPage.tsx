import { PageLayout } from "@/components/layout/PageLayout";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, Phone, Sparkles } from "lucide-react";

export interface RussianLandingConfig {
  slug: string; // path without leading slash, e.g. "ru/audit"
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subline: string;
  bullets: string[];
  body: { title: string; desc: string }[];
  faqItems: { question: string; answer: string }[];
}

interface Props {
  config: RussianLandingConfig;
}

const BASE = "https://hydrailabs.com";

export const RussianLandingPage = ({ config }: Props) => {
  const url = `${BASE}/${config.slug}`;
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "ru",
    name: config.seoTitle,
    description: config.metaDescription,
    url,
    isPartOf: {
      "@type": "Organization",
      name: "HydrAI Labs",
      url: BASE,
    },
  };

  return (
    <PageLayout>
      <Helmet>
        <html lang="ru" />
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="ru" href={url} />
        <link rel="alternate" hrefLang="es" href={`${BASE}/`} />
        <link rel="alternate" hrefLang="en" href={`${BASE}/eastern-europe-ai-automation-costa-del-sol`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE}/`} />
        <meta property="og:title" content={config.seoTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "HydrAI Labs", url: "/" },
          { name: "Русский", url: "/ru" },
          { name: config.h1, url: `/${config.slug}` },
        ]}
      />
      <FAQSchema items={config.faqItems} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="glow-orb-primary w-[500px] h-[500px] -top-48 -left-48" />
        <div className="section-container relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="badge-primary inline-flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4" /> HydrAI Labs · Costa del Sol
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            <span className="text-gradient-primary">{config.h1}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {config.subline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/ru/audit">
              <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[260px]">
                Получить бесплатный аудит
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/ru/ai-automation-costa-del-sol">
              <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6 h-12 min-w-[240px]">
                <Phone className="mr-2 w-4 h-4" />
                Посмотреть решения для бизнеса
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Бесплатная диагностика · Без обязательств · Ответ в течение 24 часов
          </p>
        </div>
      </section>

      {/* Bullets */}
      {config.bullets.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="section-container max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
            {config.bullets.map((b) => (
              <div key={b} className="flex gap-3 rounded-xl border border-border/60 bg-card p-4">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Body sections */}
      <section className="py-20">
        <div className="section-container max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {config.body.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border/60 bg-card p-6 space-y-3">
              <h2 className="font-display font-semibold text-foreground text-xl">{s.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="section-container max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Получите бесплатный AI-аудит вашего бизнеса
          </h2>
          <p className="text-secondary-foreground/80 text-lg">
            Мы проанализируем процессы, найдём точки потерь клиентов и предложим план автоматизации.
            Без обязательств. Ответ в течение 24 часов.
          </p>
          <Link to="/ru/audit">
            <Button size="lg" className="btn-neon text-base px-8 h-12">
              Получить бесплатный аудит
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="section-container max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-10">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {config.faqItems.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-border/60 bg-card overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-foreground font-medium hover:text-primary transition-colors list-none">
                  {faq.question}
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm">
            <Link to="/ru" className="text-primary hover:underline mx-2">Русский</Link>
            <Link to="/" className="text-primary hover:underline mx-2">Español</Link>
            <Link to="/eastern-europe-ai-automation-costa-del-sol" className="text-primary hover:underline mx-2">English</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
