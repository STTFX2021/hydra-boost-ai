import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calendar, Star, Users, MessageSquare, TrendingUp, Zap, Globe, Clock, Target, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioSection } from "@/components/PortfolioSection";

const Index = () => {
  const { t } = useTranslation();

  const services = [
    { icon: Bot, title: "AI Recepcionista", description: t('language') === 'en' ? "Responds to WhatsApp, Instagram and Facebook 24/7." : "Responde WhatsApp, Instagram y Facebook 24/7." },
    { icon: Calendar, title: t('language') === 'en' ? "Bookings + Anti No-Show" : "Reservas + Anti No-Show", description: t('language') === 'en' ? "Appointment system with automatic reminders." : "Sistema de citas con recordatorios automáticos." },
    { icon: Star, title: t('language') === 'en' ? "Reputation Autopilot" : "Reputación Autopilot", description: t('language') === 'en' ? "Ask for reviews at the perfect moment." : "Pide reseñas en el momento perfecto." },
    { icon: Users, title: "Lead Capture", description: t('language') === 'en' ? "Capture leads from social media without a website." : "Captura leads desde redes sin web." },
    { icon: MessageSquare, title: t('language') === 'en' ? "Reactivation" : "Reactivación", description: t('language') === 'en' ? "Recover inactive customers." : "Recupera clientes inactivos." },
    { icon: Globe, title: t('services.web.title'), description: t('language') === 'en' ? "Corporate websites and conversion landings." : "Webs corporativas y landings de conversión." },
  ];

  const stats = [
    { value: t('stats.response'), label: t('language') === 'en' ? "Average response time" : "Tiempo medio de respuesta", icon: Clock },
    { value: t('stats.noShows'), label: t('language') === 'en' ? "Appointment reminders" : "Con recordatorios de cita", icon: Target },
    { value: t('stats.bookings'), label: t('language') === 'en' ? "With automation" : "Con automatización", icon: TrendingUp },
    { value: t('stats.satisfaction'), label: t('language') === 'en' ? "Our customers" : "Nuestros clientes", icon: ThumbsUp },
  ];

  const steps = [
    { num: "01", title: t('howItWorks.step1.title'), desc: t('howItWorks.step1.description') },
    { num: "02", title: t('howItWorks.step2.title'), desc: t('howItWorks.step2.description') },
    { num: "03", title: t('howItWorks.step3.title'), desc: t('howItWorks.step3.description') },
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
              <Zap className="w-3 h-3 mr-1" /> {t('language') === 'en' ? 'AI Automation' : 'Automatización con IA'}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient-primary">{t('hero.title').split(' ').slice(0, 3).join(' ')}</span>
              <br />
              <span className="text-foreground">{t('hero.title').split(' ').slice(3).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')} {t('language') === 'en' ? 'We automate customer acquisition, attention and bookings for your local business.' : 'Automatizamos la captación, atención y reservas de tu negocio local.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  {t('hero.cta2')}
                </Button>
              </Link>
            </div>

            {/* Stats - Goals/Objectives instead of fake numbers */}
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('services.title').split(' ').slice(0, 2).join(' ')} <span className="text-gradient-primary">{t('services.title').split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={i} to="/servicios" className="card-premium group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
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
              {t('howItWorks.title').split(' ').slice(0, 1).join(' ')} <span className="text-gradient-secondary">{t('howItWorks.title').split(' ').slice(1).join(' ')}</span>
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

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container relative z-10">
          <div className="card-premium text-center p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t('cta.button')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
