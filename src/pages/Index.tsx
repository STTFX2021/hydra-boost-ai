import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calendar, Star, Globe, Clock, Target, TrendingUp, ThumbsUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, OrganizationSchema, LocalBusinessSchema } from "@/components/seo";
import { DiagnosticButton } from "@/components/diagnostic";

const Index = () => {
  return (
    <>
      <SEOHead
        title="HydrAI Labs | Chatbots y Automatizaciones IA para Negocios"
        description="Agencia de automatización con IA para negocios locales. Webs profesionales, chatbots 24/7 y automatizaciones que captan clientes mientras duermes. Desde 199€/mes."
        canonical="/"
        keywords="chatbot ia, automatizacion negocios, agencia ia, chatbot whatsapp, reservas automaticas, marketing ia"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <IndexContent />
    </>
  );
};

const IndexContent = () => {
  const { t } = useTranslation();

  const services = [
    { 
      icon: Globe, 
      title: t("homeServices.webPresencia.title"), 
      description: t("homeServices.webPresencia.description"),
      price: t("homeServices.webPresencia.price")
    },
    { 
      icon: Bot, 
      title: t("homeServices.webChatbot.title"), 
      description: t("homeServices.webChatbot.description"),
      price: t("homeServices.webChatbot.price")
    },
    { 
      icon: Calendar, 
      title: t("homeServices.automatiza.title"), 
      description: t("homeServices.automatiza.description"),
      price: t("homeServices.automatiza.price")
    },
    { 
      icon: Star, 
      title: t("homeServices.mantenimiento.title"), 
      description: t("homeServices.mantenimiento.description"),
      price: t("homeServices.mantenimiento.price")
    },
  ];

  const stats = [
    { value: t("stats.response"), label: t("stats.responseLabel"), icon: Clock },
    { value: t("stats.noShows"), label: t("stats.noShowsLabel"), icon: Target },
    { value: t("stats.bookings"), label: t("stats.bookingsLabel"), icon: TrendingUp },
    { value: t("stats.satisfaction"), label: t("stats.satisfactionLabel"), icon: ThumbsUp },
  ];

  const steps = [
    { num: t("howItWorks.step1.num"), title: t("howItWorks.step1.title"), desc: t("howItWorks.step1.description") },
    { num: t("howItWorks.step2.num"), title: t("howItWorks.step2.title"), desc: t("howItWorks.step2.description") },
    { num: t("howItWorks.step3.num"), title: t("howItWorks.step3.title"), desc: t("howItWorks.step3.description") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-secondary w-80 h-80 top-1/2 -right-40" />
        <div className="glow-orb-accent w-64 h-64 bottom-20 left-1/4" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t("hero.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient-primary">{t("hero.title").split(" ").slice(0, 4).join(" ")}</span>
              <br />
              <span className="text-foreground">{t("hero.title").split(" ").slice(4).join(" ")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <p className="text-sm text-primary mb-8">
              {t("hero.priceTag")}
            </p>
            <div className="flex flex-col items-center gap-6">
              {/* Primary CTA - Diagnostic Button */}
              <DiagnosticButton size="lg" />
              
              {/* Secondary CTA */}
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  {t("hero.cta2")}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, i) => (
                <div key={i} className="card-premium p-4">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="stat-value text-lg md:text-xl">{stat.value}</div>
                  <div className="stat-label text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("homeServices.title").split(" ").slice(0, 2).join(" ")} <span className="text-gradient-primary">{t("homeServices.title").split(" ").slice(2).join(" ")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("homeServices.subtitle")}
            </p>
          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Link key={i} to="/servicios" className="card-premium group flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{service.description}</p>
                <span className="badge-primary text-xs self-start">{service.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("howItWorks.title").split(" ").slice(0, 1).join(" ")} <span className="text-gradient-secondary">{t("howItWorks.title").split(" ").slice(1).join(" ")}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="step-indicator mx-auto mb-4">{step.num}</div>
                <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container relative z-10">
          <div className="card-premium text-center p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <DiagnosticButton />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
