import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, ServiceSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, Bell, Star, CheckCircle2, ArrowRight, 
  Zap, Clock, MessageSquare, RefreshCcw
} from "lucide-react";

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
    question: "¿Qué pasa si un cliente cancela?",
    answer: "El sistema puede enviar automáticamente la cancelación, liberar el hueco en tu agenda y ofrecer la hora a clientes en lista de espera."
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
        title="Automatizaciones para Negocios - Reservas, Recordatorios y Reseñas Automáticas"
        description="Automatiza reservas, recordatorios de citas, seguimiento y solicitud de reseñas. Reduce no-shows un 80%. Desde 1.290€. Integración con WhatsApp y Google Calendar."
        canonical="/servicios/automatizaciones"
        keywords="automatizaciones negocio, recordatorios citas automáticos, sistema reservas automático, automatizar whatsapp, solicitar reseñas automáticamente"
      />
      <ServiceSchema
        name="Automatizaciones para Negocios Locales"
        description="Sistema completo de automatización: reservas online, recordatorios anti no-show, solicitud de reseñas y seguimiento post-servicio."
        url="/servicios/automatizaciones"
        price="1290"
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
              Reservas, recordatorios, seguimiento y reseñas — todo funcionando solo. 
              Reduce no-shows un 80% y multiplica tu reputación online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría gratis
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

      {/* Types of Automations */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Automatizaciones que <span className="text-gradient-secondary">funcionan solas</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Calendar, 
                title: "Reservas Online", 
                desc: "Sistema de reservas integrado con tu web y calendario. El cliente elige hora sin llamar." 
              },
              { 
                icon: Bell, 
                title: "Recordatorios", 
                desc: "WhatsApp o email automático 24-48h antes de la cita. Reduce no-shows drásticamente." 
              },
              { 
                icon: Star, 
                title: "Reseñas Automáticas", 
                desc: "Solicita reseñas en el momento perfecto: justo después del servicio." 
              },
              { 
                icon: RefreshCcw, 
                title: "Seguimiento", 
                desc: "Mensajes de seguimiento post-servicio para fidelizar y volver a reservar." 
              },
            ].map((item, i) => (
              <div key={i} className="card-premium">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="card-premium neon-border p-8">
              <h3 className="font-display font-bold text-xl mb-6">Flujo de automatización típico</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Cliente reserva", desc: "En tu web o por WhatsApp" },
                  { step: "2", title: "Confirmación automática", desc: "Email + WhatsApp al instante" },
                  { step: "3", title: "Recordatorio 24h antes", desc: "WhatsApp con opción de confirmar/cancelar" },
                  { step: "4", title: "Día del servicio", desc: "El cliente acude (¡no-show reducido!)" },
                  { step: "5", title: "Solicitud de reseña", desc: "Mensaje automático 2h después" },
                  { step: "6", title: "Seguimiento", desc: "Mensaje para próxima cita en X semanas" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="step-indicator shrink-0">{item.step}</div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Qué incluye <span className="text-gradient-primary">Automatiza tu Agenda</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Todo lo del pack Web + Chatbot",
                  "Sistema de reservas online completo",
                  "Confirmaciones y recordatorios automáticos",
                  "Mensajes anti no-show por WhatsApp/Email",
                  "Solicitud de reseñas post-servicio",
                  "Integración con Google Calendar",
                  "Dashboard de métricas y reservas",
                  "30 días de soporte incluido"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <span className="badge-primary text-lg font-semibold">Desde 1.290 € + IVA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "-80%", label: "No-shows con recordatorios" },
              { value: "+300%", label: "Reseñas mensuales" },
              { value: "10h/sem", label: "Ahorro de tiempo promedio" },
            ].map((stat, i) => (
              <div key={i} className="card-premium">
                <div className="stat-value text-3xl md:text-4xl mb-2">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
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
                <div key={i} className="card-premium">
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
              ¿Listo para automatizar tu agenda?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Descubre gratis qué automatizaciones necesita tu negocio.
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría AI gratis (3 min)
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
