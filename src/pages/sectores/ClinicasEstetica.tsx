import { PageLayout } from "@/components/layout/PageLayout";
import { LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Sparkles, Bot, CheckCircle2, ArrowRight, 
  Calendar, Globe, MessageSquare
} from "lucide-react";

const faqs = [
  {
    question: "¿Es legal usar WhatsApp para contactar pacientes?",
    answer: "Sí, con el consentimiento del paciente que se recoge en el proceso de registro. Cumplimos RGPD en todos los flujos de comunicación. Te asesoramos en la auditoría gratuita."
  },
  {
    question: "¿Se integra con mi software de gestión de clínica?",
    answer: "Nos integramos con los principales software de gestión: Doctoralia, ClinicCloud, Medscape y otros. Si tienes un sistema propio, lo analizamos."
  },
  {
    question: "¿Cuánto tiempo ahorra el chatbot al día?",
    answer: "En clínicas con 20-30 citas al día, el chatbot ahorra entre 2 y 3 horas diarias de gestión telefónica. Equivale a no necesitar una persona a tiempo parcial solo para citas."
  },
  {
    question: "¿Puedo personalizar los mensajes del chatbot?",
    answer: "Completamente. El chatbot habla con el tono de tu clínica, conoce tus tratamientos, precios y protocolos. Lo entrenamos con tu información."
  },
  {
    question: "¿Qué pasa con los pacientes que prefieren llamar?",
    answer: "El teléfono sigue funcionando exactamente igual. El chatbot es un canal adicional, no un sustituto. La mayoría de pacientes nuevos prefiere WhatsApp a llamar."
  }
];

const services = [
  {
    name: "Chatbot de Citas 24/7",
    price: "Desde 295€",
    description: "Paciente escribe por WhatsApp o web, el chatbot muestra disponibilidad real, agenda la cita, pide datos previos y manda recordatorio 24 horas antes. Cero ausencias por olvido.",
    result: "-60% ausencias desde el primer mes",
    icon: Bot,
  },
  {
    name: "Web Profesional con SEO Local",
    price: "Desde 197€",
    description: "Web que aparece cuando buscan 'clínica [tu especialidad] en [tu ciudad]'. Diseño que transmite confianza médica, fotos reales, opiniones y sistema de cita online.",
    result: "+200% visibilidad en Google local",
    icon: Globe,
  },
  {
    name: "Captación de Pacientes por Email y WhatsApp",
    price: "Desde 350€",
    description: "Identificamos personas en tu zona que buscan tus tratamientos y les enviamos una propuesta personalizada. Campaña automática que funciona mientras atiendes consulta.",
    result: "+40 pacientes nuevos al mes",
    icon: MessageSquare,
  },
];

const SectorClinicasEstetica = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Automatización IA para Clínicas de Estética | HydrAI Labs</title>
        <meta name="description" content="Chatbots y automatizaciones para clínicas estéticas y de belleza. Reservas automáticas, recordatorios de cita y captación de pacientes 24/7. Costa del Sol." />
        <link rel="canonical" href="https://hydrailabs.com/sectores/clinicas-estetica" />
        <meta property="og:title" content="Automatización IA para Clínicas de Estética | HydrAI Labs" />
        <meta property="og:description" content="Chatbots y automatizaciones para clínicas estéticas y de belleza. Reservas automáticas, recordatorios de cita y captación de pacientes 24/7. Costa del Sol." />
        <meta property="og:url" content="https://hydrailabs.com/sectores/clinicas-estetica" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Automatización IA para Clínicas de Estética | HydrAI Labs" />
        <meta name="twitter:description" content="Chatbots y automatizaciones para clínicas estéticas y de belleza. Reservas automáticas, recordatorios de cita y captación de pacientes 24/7. Costa del Sol." />
      </Helmet>
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
              <Sparkles className="w-3 h-3 mr-1" /> Clínicas y Estética
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Tu Clínica con la Agenda Llena{" "}
              <span className="text-gradient-primary">Sin Gestionar Citas Manualmente</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbot que agenda citas a cualquier hora, recordatorios automáticos que eliminan ausencias
              y captación de pacientes nuevos en piloto automático.
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
              { emoji: "📅", title: "La agenda se gestiona a mano y consume horas", text: "Tu recepcionista pasa horas al teléfono confirmando, cancelando y reorganizando citas. Tiempo que podría dedicar a los pacientes." },
              { emoji: "👻", title: "Ausencias que destrozan la planificación", text: "Pacientes que no aparecen sin avisar. Huecos en la agenda que no se pueden cubrir a última hora. Ingresos perdidos cada día." },
              { emoji: "🌐", title: "Pacientes nuevos que buscan online y no te encuentran", text: "El 70% de los pacientes busca clínicas en Google antes de llamar. Si no apareces o tu web no transmite confianza, van a la competencia." },
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
              Soluciones para <span className="text-gradient-primary">clínicas y centros de estética</span>
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
              { value: "-60%", label: "Reducción de ausencias" },
              { value: "+200%", label: "Más visibilidad en Google" },
              { value: "24/7", label: "Agenda siempre disponible" },
              { value: "48h", label: "Implementación completa" },
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
              En 3 pasos tu clínica <span className="text-gradient-primary">funciona sola</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Auditoría gratuita de 30 minutos", text: "Analizamos cómo gestionas citas y cuántos pacientes pierdes por ausencias y falta de visibilidad online." },
              { step: "2", title: "Implementamos en 48 horas", text: "Configuramos chatbot, web y campañas con tus tratamientos, precios y protocolos. Sin que toques nada técnico." },
              { step: "3", title: "Tu clínica capta y retiene sola", text: "Desde el día 1 el sistema gestiona citas, recuerda a pacientes y capta nuevos mientras atiendes consulta." },
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
              ¿Cuántas citas pierdes cada semana por ausencias?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Auditoría gratuita de 30 minutos para clínicas. Te mostramos exactamente cuánto puedes recuperar.
            </p>
            <Link to="/auditoria?vertical=clinica">
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

export default SectorClinicasEstetica;
