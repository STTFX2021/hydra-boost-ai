import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { 
  Bot, Calendar, Star, Users, MessageSquare, TrendingUp, Globe,
  ArrowRight, CheckCircle2, Clock, Zap
} from "lucide-react";

const Servicios = () => {
  const { t, language } = useTranslation();

  const services = [
    {
      id: "ai-receptionist",
      icon: Bot,
      title: language === 'en' ? "AI Receptionist 24/7" : "AI Recepcionista 24/7",
      subtitle: "WhatsApp, Instagram y Facebook",
      description: language === 'en' 
        ? "An AI assistant that responds to your customers' messages in seconds, 24 hours a day, 7 days a week."
        : "Un asistente de IA que responde mensajes de tus clientes en segundos, las 24 horas del día, los 7 días de la semana.",
      features: language === 'en' ? [
        "Instant response on WhatsApp, IG and FB",
        "Automated FAQs",
        "Automatic lead qualification",
        "Smart handoff to humans",
        "Multi-language (ES, EN, more)",
      ] : [
        "Respuesta instantánea en WhatsApp, IG y FB",
        "Preguntas frecuentes automatizadas",
        "Cualificación de leads automática",
        "Derivación inteligente a humanos",
        "Multiidioma (ES, EN, más)",
      ],
      deliverables: language === 'en' 
        ? ["Configured and trained bot", "Metrics dashboard", "Ongoing support"]
        : ["Bot configurado y entrenado", "Dashboard de métricas", "Soporte continuo"],
      time: "48-72h",
      kpis: language === 'en' 
        ? ["Response time < 30s", "-70% unanswered messages", "+40% lead conversion"]
        : ["Tiempo de respuesta < 30s", "-70% mensajes sin responder", "+40% conversión de leads"],
    },
    {
      id: "reservations",
      icon: Calendar,
      title: language === 'en' ? "Bookings + Anti No-Show" : "Reservas + Anti No-Show",
      subtitle: language === 'en' ? "Smart appointment system" : "Sistema de citas inteligente",
      description: language === 'en'
        ? "Automated booking system with reminders and confirmations that reduce no-shows by up to 80%."
        : "Sistema de reservas automatizado con recordatorios y confirmaciones que reducen los no-shows hasta un 80%.",
      features: language === 'en' ? [
        "Synced online calendar",
        "Automatic reminders (WhatsApp/SMS)",
        "One-click confirmation",
        "Waiting list management",
        "Automatic rescheduling",
      ] : [
        "Calendario online sincronizado",
        "Recordatorios automáticos (WhatsApp/SMS)",
        "Confirmación con un clic",
        "Gestión de lista de espera",
        "Reagendamiento automático",
      ],
      deliverables: language === 'en'
        ? ["Active booking system", "Calendar integration", "Reminder workflows"]
        : ["Sistema de reservas activo", "Integración con tu calendario", "Flujos de recordatorio"],
      time: "24-48h",
      kpis: language === 'en'
        ? ["-80% no-shows", "+25% occupancy", "Fewer manual calls"]
        : ["-80% no-shows", "+25% ocupación", "Menos llamadas manuales"],
    },
    {
      id: "reputation",
      icon: Star,
      title: language === 'en' ? "Reputation Autopilot" : "Reputación Autopilot",
      subtitle: language === 'en' ? "More 5-star reviews" : "Más reseñas 5 estrellas",
      description: language === 'en'
        ? "Automate review requests at the perfect moment and respond to all reviews intelligently."
        : "Automatiza la solicitud de reseñas en el momento perfecto y responde a todas las reseñas de forma inteligente.",
      features: language === 'en' ? [
        "Automatic post-service request",
        "Satisfaction pre-filter",
        "Automatic review response",
        "Multi-platform monitoring",
        "Negative review alerts",
      ] : [
        "Solicitud automática post-servicio",
        "Filtro de satisfacción previo",
        "Respuesta automática a reseñas",
        "Monitorización multi-plataforma",
        "Alertas de reseñas negativas",
      ],
      deliverables: language === 'en'
        ? ["Active request flows", "Response templates", "Reputation dashboard"]
        : ["Flujos de solicitud activos", "Plantillas de respuesta", "Dashboard de reputación"],
      time: "24h",
      kpis: language === 'en'
        ? ["+300% new reviews/month", "4.8+ average rating", "100% reviews responded"]
        : ["+300% nuevas reseñas/mes", "4.8+ rating promedio", "100% reseñas respondidas"],
    },
    {
      id: "lead-capture",
      icon: Users,
      title: language === 'en' ? "Lead Capture Without Website" : "Lead Capture Sin Web",
      subtitle: language === 'en' ? "Capture from social media" : "Captura desde redes sociales",
      description: language === 'en'
        ? "Capture leads directly from Instagram, Facebook and WhatsApp without needing a website."
        : "Captura leads directamente desde Instagram, Facebook y WhatsApp sin necesidad de tener una web.",
      features: language === 'en' ? [
        "Forms in stories/posts",
        "DM capture bot",
        "CRM integration",
        "Automatic tagging",
        "Automated follow-up",
      ] : [
        "Formularios en stories/posts",
        "Bot de captura en DMs",
        "Integración con CRM",
        "Etiquetado automático",
        "Seguimiento automatizado",
      ],
      deliverables: language === 'en'
        ? ["Active capture flows", "Basic CRM configured", "Automations"]
        : ["Flujos de captura activos", "CRM básico configurado", "Automatizaciones"],
      time: "48h",
      kpis: language === 'en'
        ? ["+50% leads captured", "0 lost leads", "100% automatic follow-up"]
        : ["+50% leads capturados", "0 leads perdidos", "Seguimiento 100% automático"],
    },
    {
      id: "reactivation",
      icon: MessageSquare,
      title: language === 'en' ? "Customer Reactivation" : "Reactivación de Clientes",
      subtitle: language === 'en' ? "Recover inactive customers" : "Recupera clientes inactivos",
      description: language === 'en'
        ? "Automated campaigns to recover customers who haven't returned in X time with personalized offers."
        : "Campañas automatizadas para recuperar clientes que no han vuelto en X tiempo con ofertas personalizadas.",
      features: language === 'en' ? [
        "Inactivity segmentation",
        "Personalized messages",
        "Dynamic offers",
        "Automatic A/B testing",
        "Conversion tracking",
      ] : [
        "Segmentación por inactividad",
        "Mensajes personalizados",
        "Ofertas dinámicas",
        "A/B testing automático",
        "Tracking de conversión",
      ],
      deliverables: language === 'en'
        ? ["Configured campaigns", "Defined segments", "Message templates"]
        : ["Campañas configuradas", "Segmentos definidos", "Plantillas de mensaje"],
      time: "24-48h",
      kpis: language === 'en'
        ? ["+20% reactivated customers", "10x average ROI", "Total automation"]
        : ["+20% clientes reactivados", "ROI 10x promedio", "Automatización total"],
    },
    {
      id: "dashboard",
      icon: TrendingUp,
      title: "Dashboard KPI",
      subtitle: language === 'en' ? "Clear metrics, no Excel" : "Métricas claras, sin Excel",
      description: language === 'en'
        ? "Real-time control panel with all your business metrics: bookings, leads, reviews and more."
        : "Panel de control en tiempo real con todas las métricas de tu negocio: reservas, leads, reseñas y más.",
      features: language === 'en' ? [
        "Real-time metrics",
        "Visual charts",
        "Period comparisons",
        "Custom alerts",
        "Data export",
      ] : [
        "Métricas en tiempo real",
        "Gráficos visuales",
        "Comparativas período",
        "Alertas personalizadas",
        "Exportación de datos",
      ],
      deliverables: language === 'en'
        ? ["Custom dashboard", "Web/mobile access", "Training included"]
        : ["Dashboard personalizado", "Acceso web/móvil", "Formación incluida"],
      time: "72h",
      kpis: language === 'en'
        ? ["Data-driven decisions", "Time saved on reports", "Total visibility"]
        : ["Decisiones basadas en datos", "Tiempo ahorrado en reportes", "Visibilidad total"],
    },
    {
      id: "web-creation",
      icon: Globe,
      title: t('services.web.title'),
      subtitle: t('services.web.subtitle'),
      description: t('services.web.description'),
      features: t('services.web.features').split(',').length > 1 
        ? (language === 'en' ? [
            "Responsive modern design",
            "Technical and on-page SEO",
            "CRM and leads integration",
            "Google Analytics 4 tracking",
            "Blog CMS included (optional)",
            "Optimized load speed"
          ] : [
            "Diseño responsive y moderno",
            "SEO técnico y on-page optimizado",
            "Integración con CRM y leads",
            "Analítica con Google Analytics 4",
            "Blog CMS incluido (opcional)",
            "Velocidad de carga optimizada"
          ])
        : [],
      deliverables: language === 'en'
        ? ["Production-ready website", "Admin panel", "Technical documentation"]
        : ["Web lista para producción", "Panel de administración", "Documentación técnica"],
      time: t('services.web.time'),
      kpis: language === 'en'
        ? ["Load time < 2s", "+30% conversion", "Leads captured 24/7"]
        : ["Tiempo carga < 2s", "+30% conversión", "Leads capturados 24/7"],
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {language === 'en' ? 'Productized Solutions' : 'Soluciones Productizadas'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-primary">{t('nav.services')}</span> {language === 'en' ? 'automation' : 'de automatización'}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {language === 'en' 
                ? 'Turnkey solutions to automate customer acquisition, attention and management for your local business. No complications. Measurable results.'
                : 'Soluciones llave en mano para automatizar la captación, atención y gestión de tu negocio local. Sin complicaciones. Resultados medibles.'}
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-2">{service.title}</h2>
                  <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <h4 className="font-semibold mb-3">{language === 'en' ? "What's included:" : "Qué incluye:"}</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contacto">
                    <Button className="btn-neon">
                      {language === 'en' ? 'Request this service' : 'Solicitar este servicio'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className={`card-premium ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{language === 'en' ? 'Deliverables' : 'Entregables'}</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{language === 'en' ? 'Implementation time:' : 'Tiempo de implementación:'}</span>
                      <span className="font-semibold">{service.time}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{language === 'en' ? 'Expected KPIs' : 'KPIs esperados'}</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.kpis.map((kpi, i) => (
                          <span key={i} className="badge-success text-xs">{kpi}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
              {language === 'en' ? "Don't know where to start?" : "¿No sabes por dónde empezar?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {language === 'en' ? "Take our free audit and we'll tell you which services you need." : "Haz nuestra auditoría gratuita y te diremos qué servicios necesitas."}
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t('hero.cta1')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Servicios;
