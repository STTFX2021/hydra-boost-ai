import { PageLayout } from "@/components/layout/PageLayout";
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Globe, Bot, Calendar, CheckCircle2, ArrowRight, 
  Zap, Clock
} from "lucide-react";

const services = [
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
];

const faqs = [
  {
    question: "¿Qué automatizaciones puedo implementar en mi negocio?",
    answer: "Las más comunes son: reservas online, recordatorios de cita (WhatsApp/Email), mensajes anti no-show, solicitud automática de reseñas, seguimiento post-servicio y respuestas automáticas a mensajes."
  },
  {
    question: "¿Funcionan con mi calendario actual?",
    answer: "Sí, nos integramos con Google Calendar, Outlook, Calendly y la mayoría de sistemas de reservas. Si usas uno específico, consultamos compatibilidad."
  },
  {
    question: "¿Cuánto tiempo ahorro con las automatizaciones?",
    answer: "Nuestros clientes ahorran entre 5 y 15 horas semanales en tareas repetitivas: responder mensajes, confirmar citas, pedir reseñas y gestionar cancelaciones."
  },
  {
    question: "¿Es complicado de configurar?",
    answer: "No. Nosotros configuramos todo. Tú solo revisas que funcione correctamente y das feedback para ajustar los mensajes a tu estilo."
  }
];

const Automatizaciones = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Automatizaciones con IA para Negocios | HydrAI Labs"
        description="Automatiza tareas repetitivas con flujos n8n e IA. Ahorra tiempo, reduce errores y escala tu negocio sin contratar más personal. Agencia especializada en Costa del Sol."
        canonical="/servicios/automatizaciones"
        keywords="automatizaciones negocio, chatbot web, chatbot whatsapp, sistema reservas, tienda online, pasarela pago"
      />
      <ServiceSchema
        name="Automatizaciones para Negocios Locales"
        description="Soluciones completas de automatización: web profesional, chatbots IA, reservas online, pagos y tienda online."
        url="/servicios/automatizaciones"
        price="197"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Servicios', url: '/servicios' },
        { name: 'Automatizaciones', url: '/servicios/automatizaciones' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 right-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Automatizaciones
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Tu negocio en <span className="text-gradient-primary">piloto automático</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Web, chatbots, reservas, pagos y tienda online — todo listo para funcionar. 
              Implementación en días, no semanas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Solicitar servicio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/precios">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  Ver precios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Nuestros <span className="text-gradient-primary">servicios</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="rounded-xl border-2 border-[#cbd5e1] bg-[#f8fafc] p-6 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-1">{service.title}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{service.subtitle}</p>
                  <p className="text-muted-foreground text-sm font-medium mb-4">{service.description}</p>

                  <ul className="space-y-1.5 mb-4">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-medium">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm mb-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Implementación:</span>
                    <span className="font-semibold">{service.time}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.kpis.map((kpi, i) => (
                      <span key={i} className="badge-success text-xs">{kpi}</span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <span className="badge-primary text-sm font-semibold mb-4 inline-block">{service.price}</span>
                    <Link to="/contacto">
                      <Button className="btn-neon w-full">
                        Solicitar servicio
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Preguntas <span className="text-gradient-primary">frecuentes</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border-2 border-[#cbd5e1] bg-[#f8fafc] p-6">
                  <h3 className="font-display font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
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
              Cuéntanos qué necesitas y te proponemos la solución ideal.
            </p>
            <Link to="/contacto">
              <Button size="lg" className="btn-neon text-lg px-8">
                Solicitar servicio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Automatizaciones;
