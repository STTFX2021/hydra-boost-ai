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
          id: "webProfesional",
          icon: Globe,
          title: "Web Profesional",
          subtitle: "Tu presencia digital optimizada",
          description: "Landing page o web corporativa optimizada para conversión con SEO local, formularios inteligentes y analíticas.",
          features: ["Diseño responsive premium", "SEO local optimizado", "Formularios de captación", "Analytics y tracking", "SSL y hosting incluido"],
          deliverables: ["Web lista para publicar", "Dominio configurado", "Google Analytics setup", "Guía de uso"],
          time: "7-14 días",
          price: "497€ + IVA",
          kpis: ["+300% visibilidad", "2x leads orgánicos"],
        },
        {
          id: "chatbotWeb",
          icon: Bot,
          title: "Chatbot Web",
          subtitle: "Atención automática en tu web",
          description: "Agente conversacional IA en tu web que responde FAQs 24/7, cualifica leads y agenda citas automáticamente.",
          features: ["Agente conversacional IA", "Responde FAQs 24/7", "Cualifica leads", "Agenda citas automáticamente"],
          deliverables: ["Chatbot configurado", "Flujos de conversación", "Dashboard de métricas", "Training inicial"],
          time: "3-5 días",
          price: "295€ + IVA",
          kpis: ["+60% leads capturados", "-80% tiempo respuesta"],
        },
        {
          id: "chatbotWhatsApp",
          icon: Bot,
          title: "Chatbot WhatsApp",
          subtitle: "Bot IA en WhatsApp Business",
          description: "Bot IA en WhatsApp Business con flujos conversacionales, recordatorios automáticos e integración CRM.",
          features: ["Bot IA en WhatsApp Business", "Flujos conversacionales", "Recordatorios automáticos", "Integración CRM"],
          deliverables: ["Bot configurado", "Flujos de WhatsApp", "Panel de gestión", "Reportes automáticos"],
          time: "3-5 días",
          price: "350€ + IVA",
          kpis: ["+90% tasa respuesta", "-70% no-shows"],
        },
        {
          id: "reservas",
          icon: Calendar,
          title: "Sistema de Reservas Online",
          subtitle: "Sistema anti no-shows",
          description: "Calendario de reservas online con confirmaciones automáticas, recordatorios anti no-show y gestión de cancelaciones.",
          features: ["Calendario de reservas online", "Confirmaciones automáticas", "Recordatorios anti no-show", "Gestión de cancelaciones", "Integración Google Calendar"],
          deliverables: ["Sistema de reservas", "Flujos de WhatsApp", "Panel de gestión", "Reportes automáticos"],
          time: "3-5 días",
          price: "197€ + IVA",
          kpis: ["-80% no-shows", "+40% reservas online"],
        },
        {
          id: "pasarelaPago",
          icon: Zap,
          title: "Pasarela de Pago Integrada",
          subtitle: "Cobros online seguros",
          description: "Integración Stripe/Redsys con pagos online seguros, facturas automáticas y panel de gestión de cobros.",
          features: ["Integración Stripe/Redsys", "Pagos online seguros", "Facturas automáticas", "Panel de gestión de cobros"],
          deliverables: ["Pasarela configurada", "Panel de cobros", "Facturas automáticas", "Guía de uso"],
          time: "2-3 días",
          price: "197€ + IVA",
          kpis: ["+35% conversión", "Cobro inmediato"],
        },
        {
          id: "tiendaOnline",
          icon: Globe,
          title: "Tienda Online",
          subtitle: "Vende online 24/7",
          description: "Catálogo de productos con carrito, checkout, gestión de stock e integración con pasarela de pago.",
          features: ["Catálogo de productos", "Carrito y checkout", "Gestión de stock", "Integración pasarela de pago", "Panel de pedidos"],
          deliverables: ["Tienda configurada", "Panel de pedidos", "Gestión de stock", "Guía de uso"],
          time: "7-14 días",
          price: "497€ + IVA",
          kpis: ["Venta online 24/7", "+200% alcance"],
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
          id: "webProfesional",
          icon: Globe,
          title: "Professional Website",
          subtitle: "Your optimized digital presence",
          description: "Conversion-optimized landing page or corporate website with local SEO, smart forms and analytics.",
          features: ["Premium responsive design", "Local SEO optimized", "Lead capture forms", "Analytics and tracking", "SSL and hosting included"],
          deliverables: ["Ready-to-publish website", "Domain configured", "Google Analytics setup", "User guide"],
          time: "7-14 days",
          price: "€497 + VAT",
          kpis: ["+300% visibility", "2x organic leads"],
        },
        {
          id: "chatbotWeb",
          icon: Bot,
          title: "Web Chatbot",
          subtitle: "Automatic web support",
          description: "AI conversational agent on your website that answers FAQs 24/7, qualifies leads and schedules appointments automatically.",
          features: ["AI conversational agent", "Answers FAQs 24/7", "Qualifies leads", "Schedules appointments automatically"],
          deliverables: ["Configured chatbot", "Conversation flows", "Metrics dashboard", "Initial training"],
          time: "3-5 days",
          price: "€295 + VAT",
          kpis: ["+60% leads captured", "-80% response time"],
        },
        {
          id: "chatbotWhatsApp",
          icon: Bot,
          title: "WhatsApp Chatbot",
          subtitle: "AI bot on WhatsApp Business",
          description: "AI bot on WhatsApp Business with conversational flows, automatic reminders and CRM integration.",
          features: ["WhatsApp Business AI bot", "Conversational flows", "Automatic reminders", "CRM integration"],
          deliverables: ["Configured bot", "WhatsApp flows", "Management panel", "Automatic reports"],
          time: "3-5 days",
          price: "€350 + VAT",
          kpis: ["+90% response rate", "-70% no-shows"],
        },
        {
          id: "reservas",
          icon: Calendar,
          title: "Online Booking System",
          subtitle: "Anti no-show system",
          description: "Online booking calendar with automatic confirmations, anti no-show reminders and cancellation management.",
          features: ["Online booking calendar", "Automatic confirmations", "Anti no-show reminders", "Cancellation management", "Google Calendar integration"],
          deliverables: ["Booking system", "WhatsApp flows", "Management panel", "Automatic reports"],
          time: "3-5 days",
          price: "€197 + VAT",
          kpis: ["-80% no-shows", "+40% online bookings"],
        },
        {
          id: "pasarelaPago",
          icon: Zap,
          title: "Integrated Payment Gateway",
          subtitle: "Secure online payments",
          description: "Stripe/Redsys integration with secure online payments, automatic invoices and payment management panel.",
          features: ["Stripe/Redsys integration", "Secure online payments", "Automatic invoices", "Payment management panel"],
          deliverables: ["Configured gateway", "Payment panel", "Automatic invoices", "User guide"],
          time: "2-3 days",
          price: "€197 + VAT",
          kpis: ["+35% conversion", "Immediate payment"],
        },
        {
          id: "tiendaOnline",
          icon: Globe,
          title: "Online Store",
          subtitle: "Sell online 24/7",
          description: "Product catalog with cart, checkout, stock management and payment gateway integration.",
          features: ["Product catalog", "Cart and checkout", "Stock management", "Payment gateway integration", "Order panel"],
          deliverables: ["Configured store", "Order panel", "Stock management", "User guide"],
          time: "7-14 days",
          price: "€497 + VAT",
          kpis: ["Online sales 24/7", "+200% reach"],
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
