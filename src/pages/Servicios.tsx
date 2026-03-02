import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, Bot, Calendar, Star, Users, TrendingUp,
  ArrowRight, CheckCircle2, Clock, Zap, Sparkles
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, ServiceSchema, BreadcrumbSchema } from "@/components/seo";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

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
          accent: "from-primary to-[hsl(200_100%_40%)]",
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
          accent: "from-[hsl(230_70%_55%)] to-primary",
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
          accent: "from-[hsl(150_70%_40%)] to-primary",
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
          accent: "from-primary to-[hsl(200_90%_55%)]",
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
          accent: "from-[hsl(38_92%_50%)] to-primary",
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
          accent: "from-[hsl(280_70%_55%)] to-primary",
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
          accent: "from-primary to-[hsl(200_100%_40%)]",
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
          accent: "from-[hsl(230_70%_55%)] to-primary",
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
          accent: "from-[hsl(150_70%_40%)] to-primary",
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
          accent: "from-primary to-[hsl(200_90%_55%)]",
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
          accent: "from-[hsl(38_92%_50%)] to-primary",
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
          accent: "from-[hsl(280_70%_55%)] to-primary",
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <>
      <SEOHead
        title="Servicios de Automatización IA | HydrAI Labs"
        description="Chatbots IA, webs SEO, scraping y campañas automáticas por WhatsApp, Email e Instagram. Desde 197€."
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
        <section className="relative section-padding overflow-hidden bg-mesh-hydrai">
          <div className="glow-orb-primary w-[500px] h-[500px] -top-60 -right-60 opacity-20" />
          <div className="glow-orb-accent w-80 h-80 bottom-0 left-10 opacity-15" />
          
          <div className="section-container relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="badge-primary mb-6 inline-flex"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> {t.badge}
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {t.title}{" "}
                <span className="text-gradient-hydrai text-glow-soft">{t.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t.subtitle}
              </p>

              {/* Decorative divider */}
              <motion.div
                className="flex items-center justify-center gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-slow" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
          
          <div className="section-container relative z-10">
            <div className="space-y-24 lg:space-y-32">
              {t.services.map((service, index) => {
                const IconComponent = service.icon;
                const isReversed = index % 2 === 1;
                
                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={containerVariants}
                    className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
                  >
                    {/* Content side */}
                    <motion.div 
                      className={isReversed ? "lg:order-2" : ""}
                      variants={itemVariants}
                    >
                      {/* Icon with gradient background */}
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2">{service.title}</h2>
                      <p className="text-primary font-semibold mb-4 text-lg">{service.subtitle}</p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-foreground/80">{t.includes}</h4>
                      <motion.ul 
                        className="space-y-2.5 mb-6"
                        variants={containerVariants}
                      >
                        {service.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2.5 text-sm text-muted-foreground font-medium"
                            variants={itemVariants}
                          >
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <div className="flex items-center gap-4 mb-6">
                        <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r ${service.accent} text-white shadow-md`}>
                          {service.price}
                        </span>
                      </div>

                      <Link to="/contacto">
                        <Button className="btn-neon btn-depth group">
                          {t.requestService}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Card side */}
                    <motion.div 
                      className={isReversed ? "lg:order-1" : ""}
                      variants={itemVariants}
                    >
                      <div className="card-elevated card-elevated-hover p-8 relative overflow-hidden">
                        {/* Accent bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accent}`} />
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="w-5 h-px bg-primary" />
                              {t.deliverables}
                            </h4>
                            <ul className="space-y-3">
                              {service.deliverables.map((d, i) => (
                                <motion.li 
                                  key={i} 
                                  className="flex items-center gap-3 text-sm font-medium group/item"
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  {d}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-gradient-to-r from-border/50 via-primary/20 to-border/50" />

                          <div className="flex items-center gap-3 text-sm bg-muted/30 rounded-xl p-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Clock className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <span className="text-muted-foreground text-xs">{t.implementTime}</span>
                              <p className="font-bold text-foreground">{service.time}</p>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="h-px bg-gradient-to-r from-border/50 via-primary/20 to-border/50" />

                          <div>
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                              <span className="w-5 h-px bg-success" />
                              {t.expectedKpis}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {service.kpis.map((kpi, i) => (
                                <motion.span 
                                  key={i} 
                                  className="badge-success text-xs font-bold"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {kpi}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative overflow-hidden bg-mesh-hydrai">
          <div className="glow-orb-primary w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />
          <div className="section-container relative z-10">
            <motion.div 
              className="card-elevated text-center p-10 md:p-16 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[hsl(200_90%_55%)] to-[hsl(230_70%_55%)]" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse-slow" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-gradient-hydrai text-glow-soft">
                  {t.ctaTitle}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                  {t.ctaSubtitle}
                </p>
                <Link to="/auditoria-gratis">
                  <Button size="lg" className="btn-neon btn-depth text-lg px-10 py-6 group">
                    {t.ctaButton}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Servicios;
