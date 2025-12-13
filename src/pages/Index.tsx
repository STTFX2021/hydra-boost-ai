import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calendar, Star, Users, MessageSquare, TrendingUp, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";

const Index = () => {
  const { t } = useTranslation();

  const services = [
    { icon: Bot, title: "AI Recepcionista", description: "Responde WhatsApp, Instagram y Facebook 24/7." },
    { icon: Calendar, title: "Reservas + Anti No-Show", description: "Sistema de citas con recordatorios automáticos." },
    { icon: Star, title: "Reputación Autopilot", description: "Pide reseñas en el momento perfecto." },
    { icon: Users, title: "Lead Capture", description: "Captura leads desde redes sin web." },
    { icon: MessageSquare, title: "Reactivación", description: "Recupera clientes inactivos." },
    { icon: TrendingUp, title: "Dashboard KPI", description: "Métricas claras. Sin Excel." },
  ];

  const steps = [
    { num: "01", title: "Diagnóstico", desc: "Analizamos tu negocio en 15 minutos." },
    { num: "02", title: "Implementación", desc: "Configuramos todo en 48-72h." },
    { num: "03", title: "Optimización", desc: "Mejora continua con datos reales." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="section-container flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-bold text-gradient-primary">
            HydrAI Labs
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/servicios" className="text-sm text-muted-foreground hover:text-foreground transition">Servicios</Link>
            <Link to="/industrias" className="text-sm text-muted-foreground hover:text-foreground transition">Industrias</Link>
            <Link to="/precios" className="text-sm text-muted-foreground hover:text-foreground transition">Precios</Link>
            <Link to="/casos" className="text-sm text-muted-foreground hover:text-foreground transition">Casos</Link>
            <Link to="/contacto" className="text-sm text-muted-foreground hover:text-foreground transition">Contacto</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Admin</Button>
            </Link>
            <Link to="/auditoria">
              <Button size="sm" className="btn-neon">Auditoría Gratis</Button>
            </Link>
          </div>
        </div>
      </nav>

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
              <span className="text-gradient-primary">Convertimos reseñas</span>
              <br />
              <span className="text-foreground">en reservas usando IA</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sin apps raras. Sin líos. Resultados medibles. Automatizamos la captación, atención y reservas de tu negocio local.
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
              {[
                { value: "50+", label: "Negocios automatizados" },
                { value: "10K+", label: "Mensajes/mes" },
                { value: "80%", label: "Ahorro en tiempo" },
                { value: "4.9", label: "Satisfacción" },
              ].map((stat, i) => (
                <div key={i} className="card-premium p-4">
                  <div className="stat-value text-2xl md:text-3xl">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
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
              Soluciones de <span className="text-gradient-primary">IA</span> para negocios locales
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Automatizamos lo que te quita tiempo. Tú te centras en lo que importa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="card-premium group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Cómo <span className="text-gradient-secondary">funciona</span>?
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
              ¿Listo para automatizar tu negocio?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Empieza con una auditoría gratuita. Sin compromisos.
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

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="font-display text-xl font-bold text-gradient-primary">HydrAI Labs</span>
              <p className="text-sm text-muted-foreground mt-1">Automatización inteligente para negocios locales.</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacidad" className="hover:text-foreground transition">Privacidad</Link>
              <Link to="/terminos" className="hover:text-foreground transition">Términos</Link>
              <Link to="/cookies" className="hover:text-foreground transition">Cookies</Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            © {new Date().getFullYear()} HydrAI Labs. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
