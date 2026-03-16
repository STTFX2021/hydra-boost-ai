import { PageLayout } from "@/components/layout/PageLayout";
import { LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Building2, Bot, CheckCircle2, ArrowRight, 
  Phone, Search, MessageSquare
} from "lucide-react";

const faqs = [
  {
    question: "¿Cómo consigue el sistema propietarios que quieren vender?",
    answer: "Usamos Apify para rastrear señales de intención en portales inmobiliarios, redes sociales y directorios. Identificamos propietarios con alta probabilidad de querer vender en los próximos 3-6 meses en tu zona."
  },
  {
    question: "¿El chatbot puede mostrar propiedades del catálogo?",
    answer: "Sí. Se integra con tu CRM o portal y puede mostrar propiedades filtradas por las preferencias del lead: zona, precio, habitaciones. Lead recibe las opciones directamente en WhatsApp."
  },
  {
    question: "¿Cumple con la LOPD el sistema de contacto?",
    answer: "Sí. Solo contactamos a personas que han mostrado intención pública de vender o que han dado su consentimiento. Todos los flujos cumplen RGPD y LOPD."
  },
  {
    question: "¿Funciona con mi CRM actual?",
    answer: "Nos integramos con los CRM más usados en inmobiliarias españolas: Inmovilla, Witei, Salesforce, HubSpot y otros. Lo verificamos en la auditoría gratuita."
  },
  {
    question: "¿Cuánto tiempo tarda en generar primeros resultados?",
    answer: "El chatbot de cualificación genera resultados desde el día 1. Las campañas de captación de propietarios generan primeros contactos en la primera semana de ejecución."
  }
];

const services = [
  {
    name: "Chatbot de Cualificación de Leads",
    price: "Desde 295€",
    description: "Lead llega por web, WhatsApp o portal inmobiliario. El chatbot responde en menos de 30 segundos, pregunta presupuesto, zona, timing y tipología. Solo llegan a tu agente los leads realmente interesados.",
    result: "+300% leads cualificados",
    icon: Bot,
  },
  {
    name: "Scraping de Propietarios + Outreach",
    price: "Desde 497€",
    description: "Identificamos propietarios en tu zona que tienen viviendas para vender basándonos en señales de intención. Les contactamos por email y WhatsApp con propuesta personalizada. Tú recibes los interesados directamente.",
    result: "+25 propietarios contactados/semana",
    icon: Search,
  },
  {
    name: "Seguimiento Automático por WhatsApp",
    price: "Desde 350€",
    description: "Cada lead recibe seguimiento automático en los días 1, 3, 7 y 14 con mensajes personalizados según su perfil. El agente solo interviene cuando el lead responde que está listo para avanzar.",
    result: "+45% conversión de leads a visitas",
    icon: MessageSquare,
  },
];

const SectorInmobiliarias = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Automatización IA para Inmobiliarias | HydrAI Labs</title>
        <meta name="description" content="IA para agencias inmobiliarias: captación automática de leads, chatbot 24/7 para WhatsApp y CRM automatizado. Especialistas en Costa del Sol." />
        <link rel="canonical" href="https://hydrailabs.com/sectores/inmobiliarias" />
        <meta property="og:title" content="Automatización IA para Inmobiliarias | HydrAI Labs" />
        <meta property="og:description" content="IA para agencias inmobiliarias: captación automática de leads, chatbot 24/7 para WhatsApp y CRM automatizado. Especialistas en Costa del Sol." />
        <meta property="og:url" content="https://hydrailabs.com/sectores/inmobiliarias" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Automatización IA para Inmobiliarias | HydrAI Labs" />
        <meta name="twitter:description" content="IA para agencias inmobiliarias: captación automática de leads, chatbot 24/7 para WhatsApp y CRM automatizado. Especialistas en Costa del Sol." />
      </Helmet>
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
              Tu Inmobiliaria Captando Compradores y Vendedores{" "}
              <span className="text-gradient-primary">Mientras Duermes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbot que cualifica leads automáticamente, scraping de propietarios que quieren vender
              y seguimiento por WhatsApp sin trabajo manual.
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
              { emoji: "📞", title: "Leads que llegan fuera de horario y se enfrían", text: "Un comprador interesado llena un formulario a las 10pm. Si no le contestas en menos de 5 minutos, llama a la siguiente inmobiliaria de la lista." },
              { emoji: "🔍", title: "Encontrar propietarios que quieren vender es lento", text: "Horas buscando en portales, llamando a fríos, mandando emails que nadie abre. Sin sistema para identificar propietarios con intención real de vender." },
              { emoji: "💬", title: "El seguimiento de leads se hace a mano o no se hace", text: "Leads que entran en el CRM y nunca reciben seguimiento porque el agente está ocupado con otras visitas. Ventas perdidas por falta de seguimiento sistemático." },
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
              Soluciones para <span className="text-gradient-primary">inmobiliarias</span>
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
              { value: "+300%", label: "Leads cualificados" },
              { value: "30seg", label: "Tiempo de respuesta al lead" },
              { value: "+45%", label: "Conversión a visitas" },
              { value: "24/7", label: "Captación activa" },
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
              En 3 pasos tu inmobiliaria <span className="text-gradient-primary">capta sola</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Auditoría gratuita de 30 minutos", text: "Analizamos cómo captas leads ahora, cuántos se pierden y qué oportunidades de captación de propietarios tienes en tu zona." },
              { step: "2", title: "Implementamos en 48 horas", text: "Configuramos chatbot, scraping y seguimiento automático personalizado para tu zona, tipología y mercado." },
              { step: "3", title: "Tu inmobiliaria capta 24/7", text: "Desde el día 1 el sistema cualifica leads, contacta propietarios y hace seguimiento mientras tú cierras operaciones." },
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
              ¿Cuántos leads se te escapan cada semana?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Auditoría gratuita para inmobiliarias. Te mostramos cuántos compradores y vendedores podrías estar captando automáticamente.
            </p>
            <Link to="/auditoria?vertical=inmobiliaria">
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

export default SectorInmobiliarias;
