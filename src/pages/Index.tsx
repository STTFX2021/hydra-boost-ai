import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calendar, Star, Globe, MessageSquare, Clock, Target, TrendingUp, ThumbsUp, Zap, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const services = [
    { 
      icon: Globe, 
      title: "Web Presencia IA-Ready", 
      description: "Landing o web corporativa 1–3 páginas para negocio local, optimizada para móvil y preparada para conectar chatbots y automatizaciones.",
      price: "Desde 497 € + IVA"
    },
    { 
      icon: Bot, 
      title: "Web + Chatbot 24/7", 
      description: "Web + chatbot IA 24/7 que responde preguntas frecuentes, recoge datos y genera oportunidades.",
      price: "Desde 790 € + IVA"
    },
    { 
      icon: Calendar, 
      title: "Automatiza tu Agenda", 
      description: "Automatizaciones para reservas, recordatorios de citas, follow-up y solicitud de reseñas.",
      price: "Desde 1.290 € + IVA"
    },
    { 
      icon: Star, 
      title: "Mantenimiento & Optimización", 
      description: "Cambios en la web, mejora continua y revisión de automatizaciones.",
      price: "Desde 49 €/mes"
    },
  ];

  const stats = [
    { value: "Respuesta < 60s", label: "Tiempo medio de respuesta", icon: Clock },
    { value: "Menos no-shows", label: "Con recordatorios de cita", icon: Target },
    { value: "Más reservas", label: "Con automatización", icon: TrendingUp },
    { value: "Alta satisfacción", label: "Nuestros clientes", icon: ThumbsUp },
  ];

  const steps = [
    { num: "01", title: "Diagnóstico", desc: "Analizamos tu negocio en 15 minutos." },
    { num: "02", title: "Implementación", desc: "Configuramos en 48-72h." },
    { num: "03", title: "Optimización", desc: "Mejora continua garantizada." },
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
              <Zap className="w-3 h-3 mr-1" /> Automatización con IA
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient-primary">Creamos webs y automatizaciones IA</span>
              <br />
              <span className="text-foreground">que traen clientes mientras duermes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Agencia de Inteligencia Artificial para negocios locales y pymes: páginas web profesionales, chatbots 24/7 y automatizaciones que responden, reservan y hacen seguimiento por ti.
            </p>
            <p className="text-sm text-primary mb-8">
              Packs desde 497 € + IVA · Entregas rápidas · Soporte humano + IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría AI gratis (3 min)
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  Reservar llamada
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
              Webs, chatbots y <span className="text-gradient-primary">automatizaciones a medida</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creamos páginas web que convierten, añadimos chatbots 24/7, y automatizamos reservas, recordatorios y reseñas para tu negocio local.
            </p>
          </div>

          {/* Christmas Ribbon */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/30">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">🎄 Oferta Navidad: hasta -20% en packs Web + Chatbot y Automatiza tu Agenda</span>
            </div>
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
              ¿Cómo <span className="text-gradient-secondary">funciona?</span>
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
              ¿Listo para automatizar?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Empieza con una auditoría gratuita.
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                Solicitar auditoría gratis
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
