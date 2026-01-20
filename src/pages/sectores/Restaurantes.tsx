import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, Bot, Calendar, Star, CheckCircle2, ArrowRight, 
  Zap, Clock, MessageSquare, TrendingUp
} from "lucide-react";

const faqs = [
  {
    question: "¿Qué tipo de restaurantes atienden?",
    answer: "Restaurantes, cafeterías, bares, food trucks, franquicias y cualquier negocio de hostelería que quiera automatizar reservas, pedidos o atención al cliente."
  },
  {
    question: "¿Puedo empezar solo con el chatbot y añadir pedidos después?",
    answer: "Sí, puedes empezar con el pack Web + Chatbot para responder preguntas y reservas, y más adelante añadir el sistema de pedidos online."
  },
  {
    question: "¿Cómo ayuda la IA a conseguir más reseñas?",
    answer: "El sistema envía automáticamente un mensaje post-servicio invitando a dejar reseña. Solo lo envía a clientes que han indicado satisfacción."
  },
  {
    question: "¿Funciona con TripAdvisor, Google y TheFork?",
    answer: "Sí, puedes configurar enlaces a las plataformas donde quieras recibir reseñas. El sistema las rota o permite al cliente elegir."
  },
  {
    question: "¿Cuánto cuesta el mantenimiento mensual?",
    answer: "Desde 49€/mes para cambios en menú, soporte técnico y optimización de automatizaciones. Los primeros 30 días están incluidos."
  }
];

const solutions = [
  {
    icon: Bot,
    title: "Chatbot 24/7 para Restaurantes",
    description: "Responde horarios, menú, disponibilidad y toma reservas automáticamente",
    benefits: ["Menos llamadas perdidas", "Reservas fuera de horario", "Respuestas instantáneas"]
  },
  {
    icon: Calendar,
    title: "Gestión de Reservas",
    description: "Sistema de reservas online con recordatorios anti no-show",
    benefits: ["-80% no-shows", "Confirmaciones automáticas", "Sincronización con Google Calendar"]
  },
  {
    icon: Star,
    title: "Reputación Automática",
    description: "Solicita reseñas en el momento perfecto para multiplicar valoraciones",
    benefits: ["+300% reseñas/mes", "Solo clientes satisfechos", "Alertas de reseñas negativas"]
  },
];

const SectorRestaurantes = () => {
  return (
    <PageLayout>
      <SEOHead
        title="IA para Restaurantes - Chatbots, Reservas y Pedidos Automáticos"
        description="Soluciones de IA para restaurantes: chatbot 24/7, sistema de reservas con recordatorios, menú QR y solicitud automática de reseñas. Desde 790€."
        canonical="/sectores/restaurantes"
        keywords="ia restaurantes, chatbot restaurante, reservas automaticas restaurante, menu digital qr, reseñas google restaurante"
      />
      <LocalBusinessSchema />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Sectores', url: '/industrias' },
        { name: 'Restaurantes', url: '/sectores/restaurantes' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-accent w-64 h-64 bottom-0 right-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <UtensilsCrossed className="w-3 h-3 mr-1" /> Restaurantes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              IA que llena mesas y <span className="text-gradient-primary">reduce no-shows</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbots que responden horarios y reservan mesas. Recordatorios que eliminan plantones. 
              Reseñas que llegan solas. Todo en piloto automático.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria?vertical=restaurante">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría gratis para tu restaurante
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/casos">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  Ver casos de éxito
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
              Problemas comunes de <span className="text-gradient-secondary">hostelería</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ¿Te suenan estos problemas? La IA los resuelve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { problem: "Clientes que llaman y no contestas", solution: "Chatbot responde 24/7", icon: MessageSquare },
              { problem: "No-shows que te cuestan dinero", solution: "Recordatorios automáticos", icon: Clock },
              { problem: "Pocas reseñas en Google", solution: "Solicitud post-servicio", icon: Star },
              { problem: "Saturación en horas pico", solution: "Sistema de reservas online", icon: Calendar },
              { problem: "Tiempo perdido respondiendo WhatsApps", solution: "Bot entrenado con tu info", icon: Bot },
              { problem: "Menú desactualizado", solution: "Carta digital editable", icon: UtensilsCrossed },
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
              Soluciones para <span className="text-gradient-primary">tu restaurante</span>
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
              { value: "24/7", label: "Atención" },
              { value: "+20%", label: "Reservas online" },
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
              ¿Listo para automatizar tu restaurante?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Auditoría gratuita: analizamos tu negocio y te decimos exactamente qué necesitas.
            </p>
            <Link to="/auditoria?vertical=restaurante">
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

export default SectorRestaurantes;
