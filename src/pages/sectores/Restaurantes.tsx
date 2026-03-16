import { PageLayout } from "@/components/layout/PageLayout";
import { LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  UtensilsCrossed, Bot, CheckCircle2, ArrowRight, 
  MessageSquare, Phone, Ghost, Megaphone
} from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto cuesta automatizar un restaurante?",
    answer: "El chatbot de reservas parte desde 295€ de implementación. La web profesional desde 197€. El paquete completo con chatbot, web y campañas de WhatsApp cuesta 850€. Sin cuotas mensuales obligatorias en los servicios individuales."
  },
  {
    question: "¿Cuánto tiempo tarda en estar funcionando?",
    answer: "El chatbot de WhatsApp y reservas está operativo en 48 horas. La web completa en 5-7 días. Tú solo necesitas darnos acceso a tu número de WhatsApp Business y tu carta."
  },
  {
    question: "¿Necesito saber de tecnología?",
    answer: "No. Nosotros configuramos todo. Tú recibes las reservas en tu móvil como siempre, pero sin tener que responder manualmente. Si algo falla, te avisamos antes de que lo notes."
  },
  {
    question: "¿Funciona con mi sistema de reservas actual?",
    answer: "Sí. Nos integramos con los sistemas más habituales: TheFork, Cover Manager, Google Reserve y cualquier sistema propio. Si tienes un sistema específico, lo analizamos en la auditoría gratuita."
  },
  {
    question: "¿Qué pasa si el chatbot no sabe responder algo?",
    answer: "El chatbot escala automáticamente al dueño o encargado por WhatsApp cuando encuentra una pregunta que no puede gestionar. Siempre hay un humano como respaldo."
  }
];

const services = [
  {
    name: "Chatbot de Reservas 24/7",
    price: "Desde 295€",
    description: "Tu cliente escribe por WhatsApp, Instagram o la web a cualquier hora. El chatbot confirma la reserva, pregunta alergias, manda recordatorio 2 horas antes y gestiona cancelaciones. Todo sin que toques el teléfono.",
    result: "-40% no-shows desde el primer mes",
    icon: Bot,
  },
  {
    name: "Campañas WhatsApp para Mesas Vacías",
    price: "Desde 350€",
    description: "Los lunes por la mañana el sistema detecta qué días de la semana tienen pocas reservas y manda automáticamente una oferta por WhatsApp a tus clientes anteriores. Tú no haces nada.",
    result: "+35% ocupación entre semana",
    icon: MessageSquare,
  },
  {
    name: "Web Profesional con Reservas Online",
    price: "Desde 197€",
    description: "Web que carga en menos de 2 segundos, aparece en Google cuando buscan restaurantes en tu zona y tiene sistema de reservas integrado que funciona solo.",
    result: "+127% reservas online en 60 días",
    icon: UtensilsCrossed,
  },
];

const SectorRestaurantes = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Automatización IA para Restaurantes | HydrAI Labs</title>
        <meta name="description" content="Soluciones de IA para restaurantes: chatbot WhatsApp para reservas, pedidos online sin comisiones y automatización de marketing. Costa del Sol y Málaga." />
        <link rel="canonical" href="https://hydrailabs.com/sectores/restaurantes" />
        <meta property="og:title" content="Automatización IA para Restaurantes | HydrAI Labs" />
        <meta property="og:description" content="Soluciones de IA para restaurantes: chatbot WhatsApp para reservas, pedidos online sin comisiones y automatización de marketing. Costa del Sol y Málaga." />
        <meta property="og:url" content="https://hydrailabs.com/sectores/restaurantes" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Automatización IA para Restaurantes | HydrAI Labs" />
        <meta name="twitter:description" content="Soluciones de IA para restaurantes: chatbot WhatsApp para reservas, pedidos online sin comisiones y automatización de marketing. Costa del Sol y Málaga." />
      </Helmet>
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
              Tu Restaurante Lleno de Mesas{" "}
              <span className="text-gradient-primary">Sin Gestionar Nada Manualmente</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbot que responde reservas a las 3am, campañas de WhatsApp que llenan mesas vacías
              y recordatorios automáticos que eliminan los no-shows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria?vertical=restaurante">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría para restaurantes
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

      {/* Problem */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Te suena <span className="text-gradient-secondary">familiar</span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone, emoji: "📞",
                title: "El teléfono no para pero tú no puedes atenderlo todo",
                text: "Clientes que llaman para reservar mientras estás en cocina o atendiendo mesas. Reservas que se pierden porque nadie coge el teléfono."
              },
              {
                icon: Ghost, emoji: "👻",
                title: "No-shows que te destrozan el servicio",
                text: "Mesas reservadas que no aparecen sin avisar. Pérdida media de 3-4 mesas por servicio. Sin sistema de recordatorios automáticos."
              },
              {
                icon: Megaphone, emoji: "📣",
                title: "Mesas vacías entre semana que no sabes cómo llenar",
                text: "Los fines de semana van solos pero los martes y miércoles el restaurante está medio vacío y no tienes tiempo de hacer marketing."
              },
            ].map((item, i) => (
              <div key={i} className="card-premium">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-display font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
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
              Automatizamos tu restaurante <span className="text-gradient-primary">en 48 horas</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="card-premium flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-1">{s.name}</h3>
                <span className="text-primary font-semibold text-sm mb-3">{s.price}</span>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{s.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle2 className="w-4 h-4" /> {s.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "-40%", label: "Reducción de no-shows" },
              { value: "+127%", label: "Más reservas online" },
              { value: "24/7", label: "Atención sin personal extra" },
              { value: "48h", label: "Tiempo de implementación" },
            ].map((stat, i) => (
              <div key={i} className="card-premium">
                <div className="stat-value text-2xl md:text-3xl mb-1">{stat.value}</div>
                <div className="stat-label text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              En 3 pasos tu restaurante <span className="text-gradient-primary">trabaja solo</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1", title: "Auditoría gratuita de 30 minutos",
                text: "Analizamos cómo gestionas las reservas ahora y cuántas mesas estás perdiendo por no tener automatización. Sin compromiso."
              },
              {
                step: "2", title: "Implementamos en 48 horas",
                text: "Configuramos el chatbot con el nombre de tu restaurante, tu carta, tus horarios y tu forma de trabajar. Sin que toques nada técnico."
              },
              {
                step: "3", title: "Tu restaurante trabaja solo",
                text: "Desde el día 1 el sistema gestiona reservas, manda recordatorios y llena mesas vacías mientras tú te concentras en la cocina y el servicio."
              },
            ].map((item, i) => (
              <div key={i} className="card-premium text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary font-display font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-display font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/20">
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
              ¿Cuántas mesas estás perdiendo cada semana?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Auditoría gratuita de 30 minutos. Te decimos exactamente cuánto puedes ganar automatizando tu restaurante.
            </p>
            <Link to="/auditoria?vertical=restaurante">
              <Button size="lg" className="btn-neon text-lg px-8">
                Quiero mi auditoría gratuita
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
