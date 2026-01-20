import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, Bot, Calendar, Home, CheckCircle2, ArrowRight, 
  Zap, MessageSquare, Camera, TrendingUp
} from "lucide-react";

const faqs = [
  {
    question: "¿Cómo ayuda un chatbot a una inmobiliaria?",
    answer: "El chatbot responde preguntas sobre propiedades 24/7, filtra clientes según presupuesto/zona, agenda visitas y captura datos de contacto automáticamente."
  },
  {
    question: "¿Se integra con mi CRM inmobiliario?",
    answer: "Sí, podemos integrar con los principales CRMs del sector (Inmovilla, Sooprema, Witei, etc.) o con soluciones genéricas como HubSpot."
  },
  {
    question: "¿Puede el bot mostrar propiedades disponibles?",
    answer: "Sí, el bot accede a tu catálogo y puede filtrar por zona, precio, habitaciones, etc. Muestra fichas con fotos y enlaza a la ficha completa."
  },
  {
    question: "¿Funciona para alquiler vacacional?",
    answer: "Sí, tenemos soluciones específicas para alquiler vacacional: disponibilidad en tiempo real, reservas automáticas e integración con Airbnb/Booking."
  },
  {
    question: "¿Cuánto se tarda en implementar?",
    answer: "Entre 10 y 15 días laborables. Incluye integración con tu catálogo, entrenamiento del bot y configuración de automatizaciones."
  }
];

const solutions = [
  {
    icon: Bot,
    title: "Chatbot Inmobiliario 24/7",
    description: "Responde sobre propiedades, filtra por presupuesto y agenda visitas",
    benefits: ["Atención fuera de horario", "Cualificación automática", "Menos llamadas repetitivas"]
  },
  {
    icon: Calendar,
    title: "Agenda de Visitas Automática",
    description: "El cliente elige día y hora, el bot sincroniza con tu calendario",
    benefits: ["Sin llamadas para agendar", "Recordatorios automáticos", "Menos cancelaciones"]
  },
  {
    icon: Camera,
    title: "Tours Virtuales + Bot",
    description: "El bot guía al cliente por el tour virtual y responde preguntas",
    benefits: ["Visitas previas online", "Filtra curiosos", "Más tiempo para cerrar ventas"]
  },
];

const SectorInmobiliarias = () => {
  return (
    <PageLayout>
      <SEOHead
        title="IA para Inmobiliarias - Chatbots, Visitas y Cualificación de Leads"
        description="Automatiza tu inmobiliaria con IA: chatbot que filtra clientes, agenda visitas y muestra propiedades 24/7. Cualifica leads automáticamente. Desde 790€."
        canonical="/sectores/inmobiliarias"
        keywords="ia inmobiliarias, chatbot inmobiliaria, automatizar inmobiliaria, leads inmobiliarios, visitas automaticas inmobiliaria"
      />
      <LocalBusinessSchema />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Sectores', url: '/industrias' },
        { name: 'Inmobiliarias', url: '/sectores/inmobiliarias' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Building2 className="w-3 h-3 mr-1" /> Inmobiliarias
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              IA que cualifica leads <span className="text-gradient-primary">mientras duermes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbot que filtra clientes por presupuesto, muestra propiedades y agenda visitas. 
              Tú solo cierras ventas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria?vertical=inmobiliaria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría para inmobiliarias
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  Solicitar demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Problemas del sector <span className="text-gradient-secondary">inmobiliario</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { problem: "Leads que no cualifican", solution: "Bot filtra por presupuesto/zona", icon: MessageSquare },
              { problem: "Visitas que no cierran", solution: "Pre-cualificación antes de visitar", icon: Home },
              { problem: "Clientes que llaman fuera de horario", solution: "Chatbot 24/7", icon: Bot },
              { problem: "Tiempo perdido enseñando pisos", solution: "Tours virtuales previos", icon: Camera },
              { problem: "Seguimiento manual de leads", solution: "CRM automatizado", icon: TrendingUp },
              { problem: "Cancelaciones de visitas", solution: "Recordatorios automáticos", icon: Calendar },
            ].map((item, i) => (
              <div key={i} className="card-premium">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="font-semibold text-destructive">{item.problem}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <span className="font-semibold text-success">{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Soluciones para <span className="text-gradient-primary">inmobiliarias</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, i) => (
              <div key={i} className="card-premium">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <solution.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { value: "+50%", label: "Leads cualificados" },
              { value: "-60%", label: "Visitas sin resultado" },
              { value: "24/7", label: "Atención a clientes" },
              { value: "+30%", label: "Conversión" },
            ].map((stat, i) => (
              <div key={i} className="card-premium">
                <div className="stat-value text-2xl md:text-3xl mb-1">{stat.value}</div>
                <div className="stat-label text-xs">{stat.label}</div>
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
              ¿Listo para automatizar tu inmobiliaria?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Te analizamos gratis y te decimos exactamente qué automatizaciones necesitas.
            </p>
            <Link to="/auditoria?vertical=inmobiliaria">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría gratis (3 min)
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SectorInmobiliarias;
