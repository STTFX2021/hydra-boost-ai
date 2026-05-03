import { PageLayout } from "@/components/layout/PageLayout";
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Sparkles,
  Workflow,
  Target,
  TrendingUp,
} from "lucide-react";

export interface VerticalConfig {
  slug: string;
  vertical: string;
  city: string;
  badge: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  h1Top: string;
  h1Bottom: string;
  heroSubline: string;
  problem: string;
  solution: string;
  features: { title: string; desc: string }[];
  workflow: { step: string; title: string; desc: string }[];
  impact: { value: string; label: string }[];
  forWho: string[];
  notForWho: string[];
  faqItems: { question: string; answer: string }[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

interface Props {
  config: VerticalConfig;
}

export const VerticalLandingPage = ({ config }: Props) => {
  const url = `https://hydrailabs.com/${config.slug}`;

  return (
    <PageLayout>
      <Helmet>
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="keywords" content={config.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={config.seoTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hydrailabs.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.seoTitle} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content="https://hydrailabs.com/og-image.png" />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" },
          { name: config.h1Top + " " + config.h1Bottom, url: `/${config.slug}` },
        ]}
      />
      <FAQSchema items={config.faqItems} />
      <ServiceSchema
        name={config.h1Top + " " + config.h1Bottom}
        description={config.metaDescription}
        url={`/${config.slug}`}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="glow-orb-primary w-[500px] h-[500px] -top-48 -left-48" />
        <div className="glow-orb-secondary w-[350px] h-[350px] top-1/2 -right-36 opacity-50" />

        <div className="section-container relative z-10">
          <motion.div className="max-w-3xl mx-auto text-center space-y-8" variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="badge-primary inline-flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                {config.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-foreground">{config.h1Top}</span>
              <br />
              <span className="text-gradient-primary">{config.h1Bottom}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {config.heroSubline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[260px]">
                  Solicitar Auditoría Gratis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6 h-12 min-w-[200px]">
                  <Phone className="mr-2 w-4 h-4" />
                  Hablar con un experto
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="section-container grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
            <motion.span variants={fadeUp} className="badge-primary text-sm">El problema</motion.span>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Lo que está costando dinero a tu negocio
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">{config.problem}</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
            <motion.span variants={fadeUp} className="badge-primary text-sm">La solución</motion.span>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Cómo lo resolvemos con IA
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">{config.solution}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div className="text-center space-y-4 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="badge-primary text-sm inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Funcionalidades clave
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Qué incluye este sistema
            </motion.h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {config.features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="rounded-2xl border border-border/60 bg-card p-6 space-y-3 hover:border-primary/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div className="text-center space-y-4 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="badge-primary text-sm inline-flex items-center gap-2">
              <Workflow className="w-3 h-3" /> Flujo de trabajo
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Cómo funciona paso a paso
            </motion.h2>
          </motion.div>
          <motion.div className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {config.workflow.map((w, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold">
                  {w.step}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{w.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div className="text-center space-y-4 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} className="badge-primary text-sm inline-flex items-center gap-2">
              <TrendingUp className="w-3 h-3" /> Impacto esperado
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Resultados orientativos en negocios similares
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
              Rangos basados en implementaciones reales. Resultados varían según volumen y vertical.
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {config.impact.map((m) => (
              <div key={m.label} className="text-center rounded-2xl border border-border/60 bg-card p-6 space-y-2">
                <div className="text-3xl sm:text-4xl font-display font-bold text-gradient-primary">{m.value}</div>
                <p className="text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="section-container grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-success/30 bg-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-success">
              <Target className="w-5 h-5" />
              <h3 className="font-display font-semibold">Es para ti si…</h3>
            </div>
            <ul className="space-y-2">
              {config.forWho.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-destructive/30 bg-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="w-5 h-5" />
              <h3 className="font-display font-semibold">No es para ti si…</h3>
            </div>
            <ul className="space-y-2">
              {config.notForWho.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="section-container relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Solicita tu auditoría gratuita ahora
          </h2>
          <p className="text-secondary-foreground/80 text-lg leading-relaxed">
            Analizamos tu negocio en {config.city}, identificamos las oportunidades reales y te entregamos un plan claro. Sin compromiso, sin coste.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[280px]">
                Solicitar Auditoría Gratis <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/precios">
              <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 text-base px-6 h-12">
                Ver precios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="section-container max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground text-center mb-12">
            Preguntas frecuentes
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

          {/* Internal links */}
          <div className="mt-16 pt-8 border-t border-border/40 text-center space-y-4">
            <p className="text-sm text-muted-foreground">Sigue explorando</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link to="/auditoria-gratis" className="text-primary hover:underline">Auditoría gratis</Link>
              <span className="text-border">·</span>
              <Link to="/precios" className="text-primary hover:underline">Precios</Link>
              <span className="text-border">·</span>
              <Link to="/blog" className="text-primary hover:underline">Blog</Link>
              <span className="text-border">·</span>
              <Link to="/agentes-ia" className="text-primary hover:underline">Agentes IA</Link>
              <span className="text-border">·</span>
              <Link to="/" className="text-primary hover:underline">Inicio</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
