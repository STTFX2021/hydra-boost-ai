import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, Bot, Calendar, Star, Users, TrendingUp,
  ArrowRight, CheckCircle2, Clock, Zap
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, ServiceSchema, BreadcrumbSchema } from "@/components/seo";

const Servicios = () => {
  const { language } = useTranslation();

  const content = {
    es: {
      badge: "Soluciones de Automatización",
      title: "Automatizaciones que",
      titleHighlight: "Escalan tu Negocio",
      subtitle: "Webs profesionales, chatbots 24/7, automatizaciones de reservas y gestión de reputación. Soluciones IA completas para negocios locales.",
      includes: "Incluye",
      deliverables: "Entregables",
      implementTime: "Tiempo de implementación:",
      expectedKpis: "KPIs esperados",
      requestService: "Solicitar servicio",
      ctaTitle: "¿Listo para automatizar?",
      ctaSubtitle: "Agenda una auditoría gratuita y te mostramos exactamente qué podemos automatizar en tu negocio.",
      ctaButton: "Solicitar Auditoría Técnica",
      services: [
        {
          id: "webPresencia",
          icon: Globe,
          title: "Web Profesional + SEO",
          subtitle: "Tu presencia digital optimizada",
          description: "Landing page o web corporativa optimizada para conversión con SEO local, formularios inteligentes y analíticas.",
          features: ["Diseño responsive premium", "SEO local optimizado", "Formularios de captación", "Analytics y tracking", "SSL y hosting incluido"],
          deliverables: ["Web lista para publicar", "Dominio configurado", "Google Analytics setup", "Guía de uso"],
          time: "7-14 días",
          price: "Desde 1.497€",
          kpis: ["+300% visibilidad", "2x leads orgánicos"],
        },
        {
          id: "webChatbot",
          icon: Bot,
          title: "Chatbot IA 24/7",
          subtitle: "Atención automática inteligente",
          description: "Agente conversacional con IA que atiende WhatsApp, web e Instagram 24/7. Responde FAQs, califica leads y agenda citas.",
          features: ["WhatsApp Business API", "Chat web integrado", "Instagram DM bot", "Respuestas con IA", "Integración CRM"],
          deliverables: ["Chatbot configurado", "Flujos de conversación", "Dashboard de métricas", "Training inicial"],
          time: "5-10 días",
          price: "Desde 997€/mes",
          kpis: ["-70% consultas manuales", "+50% leads cualificados"],
        },
        {
          id: "automatiza",
          icon: Calendar,
          title: "Automatización de Reservas",
          subtitle: "Sistema anti no-shows",
          description: "Sistema completo de reservas online con confirmaciones automáticas, recordatorios WhatsApp y gestión de cancelaciones.",
          features: ["Calendario de reservas", "Confirmaciones automáticas", "Recordatorios anti no-show", "Gestión de cancelaciones", "Integración Google Calendar"],
          deliverables: ["Sistema de reservas", "Flujos de WhatsApp", "Panel de gestión", "Reportes automáticos"],
          time: "7-14 días",
          price: "Desde 1.290€",
          kpis: ["-80% no-shows", "+40% reservas online"],
        },
        {
          id: "reputacion",
          icon: Star,
          title: "Gestión de Reputación",
          subtitle: "Más reseñas, mejor rating",
          description: "Sistema automático de solicitud de reseñas post-servicio. Aumenta tu rating en Google y atrae más clientes.",
          features: ["Solicitud automática", "Multi-plataforma", "Gestión de respuestas", "Alertas negativas", "Dashboard de reputación"],
          deliverables: ["Sistema configurado", "Templates de mensajes", "Panel de seguimiento", "Alertas configuradas"],
          time: "3-5 días",
          price: "Desde 497€/mes",
          kpis: ["+300% reseñas", "+0.5 rating promedio"],
        },
        {
          id: "leadCapture",
          icon: Users,
          title: "Lead Engine",
          subtitle: "Captación y nurturing",
          description: "Sistema de captación multicanal con cualificación automática, scoring y nurturing personalizado.",
          features: ["Formularios inteligentes", "Lead scoring IA", "Email nurturing", "WhatsApp follow-up", "Integración CRM"],
          deliverables: ["Sistema de captación", "Flujos de nurturing", "Dashboard de leads", "Reportes semanales"],
          time: "10-14 días",
          price: "Desde 1.497€",
          kpis: ["+200% leads", "-50% tiempo cualificación"],
        },
        {
          id: "mantenimiento",
          icon: TrendingUp,
          title: "Soporte & Optimización",
          subtitle: "Tu equipo técnico 24/7",
          description: "Mantenimiento continuo, actualizaciones, optimización de rendimiento y soporte técnico prioritario.",
          features: ["Soporte prioritario", "Actualizaciones incluidas", "Backups automáticos", "Optimización continua", "Reportes mensuales"],
          deliverables: ["Soporte 24/7", "Updates mensuales", "Reportes de performance", "Consultoría incluida"],
          time: "Continuo",
          price: "Desde 297€/mes",
          kpis: ["99.9% uptime", "<2h respuesta"],
        },
      ],
    },
    en: {
      badge: "Automation Solutions",
      title: "Automations that",
      titleHighlight: "Scale your Business",
      subtitle: "Professional websites, 24/7 chatbots, booking automations and reputation management. Complete AI solutions for local businesses.",
      includes: "Includes",
      deliverables: "Deliverables",
      implementTime: "Implementation time:",
      expectedKpis: "Expected KPIs",
      requestService: "Request service",
      ctaTitle: "Ready to automate?",
      ctaSubtitle: "Schedule a free audit and we'll show you exactly what we can automate in your business.",
      ctaButton: "Request Technical Audit",
      services: [
        {
          id: "webPresencia",
          icon: Globe,
          title: "Professional Web + SEO",
          subtitle: "Your optimized digital presence",
          description: "Conversion-optimized landing page or corporate website with local SEO, smart forms and analytics.",
          features: ["Premium responsive design", "Local SEO optimized", "Lead capture forms", "Analytics and tracking", "SSL and hosting included"],
          deliverables: ["Ready-to-publish website", "Domain configured", "Google Analytics setup", "User guide"],
          time: "7-14 days",
          price: "From €1,497",
          kpis: ["+300% visibility", "2x organic leads"],
        },
        {
          id: "webChatbot",
          icon: Bot,
          title: "24/7 AI Chatbot",
          subtitle: "Intelligent automatic support",
          description: "AI conversational agent that handles WhatsApp, web and Instagram 24/7. Answers FAQs, qualifies leads and schedules appointments.",
          features: ["WhatsApp Business API", "Integrated web chat", "Instagram DM bot", "AI responses", "CRM integration"],
          deliverables: ["Configured chatbot", "Conversation flows", "Metrics dashboard", "Initial training"],
          time: "5-10 days",
          price: "From €997/month",
          kpis: ["-70% manual queries", "+50% qualified leads"],
        },
        {
          id: "automatiza",
          icon: Calendar,
          title: "Booking Automation",
          subtitle: "Anti no-show system",
          description: "Complete online booking system with automatic confirmations, WhatsApp reminders and cancellation management.",
          features: ["Booking calendar", "Automatic confirmations", "Anti no-show reminders", "Cancellation management", "Google Calendar integration"],
          deliverables: ["Booking system", "WhatsApp flows", "Management panel", "Automatic reports"],
          time: "7-14 days",
          price: "From €1,290",
          kpis: ["-80% no-shows", "+40% online bookings"],
        },
        {
          id: "reputacion",
          icon: Star,
          title: "Reputation Management",
          subtitle: "More reviews, better rating",
          description: "Automatic post-service review request system. Increase your Google rating and attract more customers.",
          features: ["Automatic request", "Multi-platform", "Response management", "Negative alerts", "Reputation dashboard"],
          deliverables: ["Configured system", "Message templates", "Tracking panel", "Alerts configured"],
          time: "3-5 days",
          price: "From €497/month",
          kpis: ["+300% reviews", "+0.5 average rating"],
        },
        {
          id: "leadCapture",
          icon: Users,
          title: "Lead Engine",
          subtitle: "Capture and nurturing",
          description: "Multichannel capture system with automatic qualification, scoring and personalized nurturing.",
          features: ["Smart forms", "AI lead scoring", "Email nurturing", "WhatsApp follow-up", "CRM integration"],
          deliverables: ["Capture system", "Nurturing flows", "Lead dashboard", "Weekly reports"],
          time: "10-14 days",
          price: "From €1,497",
          kpis: ["+200% leads", "-50% qualification time"],
        },
        {
          id: "mantenimiento",
          icon: TrendingUp,
          title: "Support & Optimization",
          subtitle: "Your 24/7 tech team",
          description: "Continuous maintenance, updates, performance optimization and priority technical support.",
          features: ["Priority support", "Updates included", "Automatic backups", "Continuous optimization", "Monthly reports"],
          deliverables: ["24/7 support", "Monthly updates", "Performance reports", "Consulting included"],
          time: "Ongoing",
          price: "From €297/month",
          kpis: ["99.9% uptime", "<2h response"],
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <>
      <SEOHead
        title="Servicios de Automatización IA | HydrAI Labs"
        description="Webs profesionales, chatbots 24/7, automatizaciones de reservas y gestión de reputación. Soluciones IA completas para negocios locales. Consulta gratis."
        canonical="/servicios"
        keywords="servicios ia, chatbot negocios, automatizacion reservas, web ia, agencia automatizacion"
      />
      <ServiceSchema
        name="Servicios de Automatización con IA"
        description="Soluciones completas de automatización con inteligencia artificial para negocios locales: webs, chatbots, reservas y más."
        url="/servicios"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Servicios", url: "/servicios" }
      ]} />
      
      <PageLayout>
        {/* Hero */}
        <section className="relative section-padding overflow-hidden">
          <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
          <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
          
          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="badge-primary mb-6 inline-flex">
                <Zap className="w-3 h-3 mr-1" /> {t.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {t.title} <span className="text-gradient-primary">{t.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-muted/10">
          <div className="section-container">
            <div className="space-y-16">
              {t.services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-display font-bold mb-2">{service.title}</h2>
                      <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                      <p className="text-muted-foreground mb-6">{service.description}</p>

                      <h4 className="font-semibold mb-3">{t.includes}</h4>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-medium">
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4 mb-6">
                        <span className="badge-primary text-sm font-semibold">{service.price}</span>
                      </div>

                      <Link to="/contacto">
                        <Button className="btn-neon">
                          {t.requestService}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className={`rounded-xl border-2 border-[#cbd5e1] bg-[#f8fafc] p-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{t.deliverables}</h4>
                          <ul className="space-y-2">
                            {service.deliverables.map((d, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{t.implementTime}</span>
                          <span className="font-semibold">{service.time}</span>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{t.expectedKpis}</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.kpis.map((kpi, i) => (
                              <span key={i} className="badge-success text-xs">{kpi}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="glow-orb-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="section-container relative z-10">
            <div className="card-premium text-center p-12 neon-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t.ctaSubtitle}
              </p>
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  {t.ctaButton}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Servicios;
