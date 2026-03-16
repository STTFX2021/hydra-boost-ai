import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Dumbbell, Bot, CheckCircle2, ArrowRight, 
  MessageSquare, TrendingDown, Calendar
} from "lucide-react";

const faqs = [
  {
    question: "¿Funciona con el software de gestión de mi gimnasio?",
    answer: "Nos integramos con Glofox, Mindbody, Clubspot y otros. También funcionamos con sistemas propios. Lo verificamos en la auditoría gratuita sin coste."
  },
  {
    question: "¿El chatbot puede gestionar pagos y renovaciones?",
    answer: "Sí. Puede recordar renovaciones próximas, gestionar el pago por link directo y avisar cuando una membresía está a punto de caducar. Todo por WhatsApp."
  },
  {
    question: "¿Cuánto tiempo ahorra el sistema al mes?",
    answer: "En gimnasios medianos ahorra entre 40 y 60 horas al mes en gestión de consultas, reservas y seguimiento de bajas. Equivale a casi una semana de trabajo de una persona."
  },
  {
    question: "¿Puedo personalizar las ofertas de reactivación?",
    answer: "Completamente. Tú defines qué oferta ofrecer (descuento, mes gratis, cambio de tarifa) y en qué momento. El sistema lo ejecuta automáticamente."
  },
  {
    question: "¿Cómo sé si el sistema está funcionando?",
    answer: "Tienes un dashboard en tiempo real con consultas recibidas, socios convertidos, bajas reactivadas y clases gestionadas. Informe automático cada lunes en tu email."
  }
];

const services = [
  {
    name: "Chatbot de Conversión de Socios",
    price: "Desde 295€",
    description: "Persona pregunta por WhatsApp o web. El chatbot muestra precios, ofertas activas, hace tour virtual del gimnasio y ofrece prueba gratuita de 3 días. Convierte curiosos en socios.",
    result: "+80% conversión de consultas",
    icon: Bot,
  },
  {
    name: "Sistema de Reactivación de Bajas",
    price: "Desde 350€",
    description: "Cuando un socio se da de baja, el sistema espera 7 días y le manda una oferta personalizada por WhatsApp. Si no responde, intenta email. Si no, un tercer contacto a los 30 días.",
    result: "-30% bajas definitivas",
    icon: TrendingDown,
  },
  {
    name: "Gestión Automática de Clases",
    price: "Desde 197€",
    description: "Socios reservan clase desde WhatsApp. Recordatorio automático 2 horas antes. Si cancela, su plaza se oferta automáticamente a socios en lista de espera.",
    result: "+60% ocupación en clases colectivas",
    icon: Calendar,
  },
];

const SectorGimnasios = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Automatización IA para Gimnasios y CrossFit | HydrAI Labs"
        description="Automatiza tu gimnasio con IA: chatbot WhatsApp, gestión de socios, recordatorios automáticos y captación de leads. Soluciones para gimnasios en Costa del Sol."
        canonical="/sectores/gimnasios"
        keywords="ia gimnasios, chatbot gimnasio, automatizar gimnasio, captacion socios gimnasio, reactivacion bajas gimnasio"
      />
      <LocalBusinessSchema />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Sectores', url: '/industrias' },
        { name: 'Gimnasios', url: '/sectores/gimnasios' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-primary w-64 h-64 bottom-0 right-0" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Dumbbell className="w-3 h-3 mr-1" /> Gimnasios
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Tu Gimnasio Captando Socios Nuevos y Recuperando Bajas{" "}
              <span className="text-gradient-primary">en Piloto Automático</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbot que convierte consultas en membresías, sistema automático que reactiva socios que se dan
              de baja y campañas que llenan las clases colectivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria?vertical=gimnasio">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría para gimnasios
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
              { emoji: "💪", title: "Socios que preguntan precio y desaparecen", text: "Alguien pregunta por WhatsApp cuánto cuesta la mensualidad, le contestas, y nunca más sabes de él. Sin seguimiento automático, sin segunda oportunidad." },
              { emoji: "📉", title: "Bajas en enero que no recuperas nunca", text: "Enero y septiembre son picos de altas pero febrero y octubre son picos de bajas. Sin sistema de reactivación, esos socios van al gimnasio de enfrente." },
              { emoji: "🏋️", title: "Clases colectivas a medio llenar", text: "Yoga a las 7pm con 4 personas cuando caben 15. Sin sistema de reservas ni recordatorios, los socios no aprovechan las clases y acaban dándose de baja." },
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
              Soluciones para <span className="text-gradient-primary">gimnasios</span>
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
              { value: "+80%", label: "Conversión de consultas" },
              { value: "-30%", label: "Reducción de bajas" },
              { value: "+60%", label: "Ocupación en clases" },
              { value: "24/7", label: "Atención y reservas" },
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
              En 3 pasos tu gimnasio <span className="text-gradient-primary">crece solo</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Auditoría gratuita de 30 minutos", text: "Analizamos cuántos socios potenciales pierdes al mes y qué bajas podrías estar reactivando automáticamente." },
              { step: "2", title: "Implementamos en 48 horas", text: "Configuramos chatbot, reactivación y gestión de clases con tus tarifas, horarios y ofertas. Sin que toques nada técnico." },
              { step: "3", title: "Tu gimnasio capta y retiene solo", text: "Desde el día 1 el sistema convierte consultas, reactiva bajas y llena clases colectivas mientras tú gestionas el gimnasio." },
            ].map((item, i) => (
              <div key={i} className="card-premium text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary font-display font-bold text-xl">{item.step}</div>
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
              ¿Cuántos socios potenciales pierdes cada mes?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Auditoría gratuita para gimnasios. Te mostramos exactamente cuánto podrías crecer automatizando captación y retención.
            </p>
            <Link to="/auditoria?vertical=gimnasio">
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

export default SectorGimnasios;
