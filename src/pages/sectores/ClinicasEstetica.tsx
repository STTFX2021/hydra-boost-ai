import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, Bot, Calendar, Star, CheckCircle2, ArrowRight, 
  Zap, Clock, MessageSquare, Heart
} from "lucide-react";

const faqs = [
  {
    question: "¿Qué tipo de clínicas atienden?",
    answer: "Clínicas de estética, medicina estética, dermatología, spa, centros de belleza y cualquier negocio del sector wellness que necesite automatizar citas y atención."
  },
  {
    question: "¿El chatbot puede informar sobre tratamientos?",
    answer: "Sí, el bot aprende toda la información de tus tratamientos: precios orientativos, duración, contraindicaciones, etc. Responde consultas 24/7."
  },
  {
    question: "¿Cómo ayuda con los no-shows?",
    answer: "Enviamos recordatorios 24-48h antes por WhatsApp/SMS. El cliente puede confirmar o cancelar directamente desde el mensaje."
  },
  {
    question: "¿Puedo gestionar varios tratamientos por sesión?",
    answer: "Sí, el sistema de reservas permite combinar tratamientos, ajusta la duración automáticamente y asigna al profesional adecuado."
  },
  {
    question: "¿Funciona para vender bonos y paquetes?",
    answer: "Sí, puedes configurar bonos de sesiones, paquetes de tratamientos y el sistema gestiona el seguimiento de sesiones consumidas."
  }
];

const solutions = [
  {
    icon: Bot,
    title: "Chatbot de Consultas 24/7",
    description: "Responde sobre tratamientos, precios y disponibilidad a cualquier hora",
    benefits: ["Captura leads mientras duermes", "Filtro de consultas básicas", "Deriva casos complejos"]
  },
  {
    icon: Calendar,
    title: "Reservas y Recordatorios",
    description: "Sistema de citas online con confirmaciones y anti no-show",
    benefits: ["-80% no-shows", "Agenda siempre llena", "Gestión de cancelaciones"]
  },
  {
    icon: Star,
    title: "Reseñas y Fidelización",
    description: "Solicita reseñas post-tratamiento y programa recordatorios de mantenimiento",
    benefits: ["+300% reseñas/mes", "Clientes que vuelven", "Marketing automático"]
  },
];

const SectorClinicasEstetica = () => {
  return (
    <PageLayout>
      <SEOHead
        title="IA para Clínicas Estéticas - Chatbots, Citas y Fidelización"
        description="Automatiza tu clínica de estética con IA: chatbot para consultas de tratamientos, sistema de citas con recordatorios y solicitud de reseñas. Desde 790€."
        canonical="/sectores/clinicas-estetica"
        keywords="ia clinica estetica, chatbot medicina estetica, automatizar clinica belleza, citas automaticas estetica, marketing clinica estetica"
      />
      <LocalBusinessSchema />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Sectores', url: '/industrias' },
        { name: 'Clínicas Estéticas', url: '/sectores/clinicas-estetica' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-accent w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-primary w-64 h-64 bottom-0 right-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Sparkles className="w-3 h-3 mr-1" /> Clínicas Estéticas
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              IA que llena tu agenda de <span className="text-gradient-primary">tratamientos</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbot que responde consultas de tratamientos 24/7. Reservas online con recordatorios. 
              Reseñas y fidelización automática.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria?vertical=clinica">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría para clínicas
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
              Retos del sector <span className="text-gradient-secondary">estético</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { problem: "Consultas repetitivas sobre tratamientos", solution: "Bot con info de todos tus servicios", icon: MessageSquare },
              { problem: "No-shows que te cuestan dinero", solution: "Recordatorios 24-48h antes", icon: Clock },
              { problem: "Clientes que no vuelven", solution: "Recordatorios de mantenimiento", icon: Heart },
              { problem: "Pocas reseñas online", solution: "Solicitud automática post-tratamiento", icon: Star },
              { problem: "Agenda manual difícil de gestionar", solution: "Reservas online sincronizadas", icon: Calendar },
              { problem: "Atención fuera de horario", solution: "Chatbot 24/7", icon: Bot },
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
              Soluciones para <span className="text-gradient-primary">clínicas de estética</span>
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
              { value: "-80%", label: "No-shows" },
              { value: "+300%", label: "Reseñas/mes" },
              { value: "+40%", label: "Clientes recurrentes" },
              { value: "24/7", label: "Atención" },
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
              ¿Lista para automatizar tu clínica?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Te analizamos gratis y te decimos exactamente qué automatizaciones necesitas.
            </p>
            <Link to="/auditoria?vertical=clinica">
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

export default SectorClinicasEstetica;
