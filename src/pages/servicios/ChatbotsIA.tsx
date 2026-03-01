import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, ServiceSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Bot, MessageSquare, Clock, CheckCircle2, ArrowRight, 
  Zap, Users, TrendingUp, Brain, Headphones
} from "lucide-react";

const faqs = [
  {
    question: "¿Cómo funciona un chatbot con IA para mi negocio?",
    answer: "El chatbot aprende sobre tu negocio, servicios y preguntas frecuentes. Responde automáticamente a clientes 24/7, captura leads y deriva a un humano cuando es necesario."
  },
  {
    question: "¿Cuánto tarda en implementarse?",
    answer: "Entre 7 y 10 días laborables. Incluye entrenamiento con tu información, integración en tu web y configuración de WhatsApp si lo deseas."
  },
  {
    question: "¿Puede responder en WhatsApp e Instagram?",
    answer: "Sí, el chatbot se integra con WhatsApp Business, Instagram Direct y Facebook Messenger, además de tu página web."
  },
  {
    question: "¿Qué pasa si el chatbot no sabe responder?",
    answer: "El bot detecta cuando necesita ayuda humana y deriva la conversación a ti por email, WhatsApp o tu CRM."
  },
  {
    question: "¿Cuánto cuesta mantener el chatbot?",
    answer: "El coste inicial incluye 30 días de soporte. Después puedes contratar un plan de mantenimiento desde 49€/mes o pagar ajustes puntuales."
  }
];

const ChatbotsIA = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Chatbots IA para Negocios - Atención 24/7 con Inteligencia Artificial"
        description="Implementamos chatbots con IA que responden 24/7, capturan leads y automatizan la atención al cliente. Desde 790€. Integración con WhatsApp, web e Instagram."
        canonical="/servicios/chatbots-ia"
        keywords="chatbot ia, chatbot whatsapp, chatbot para empresas, asistente virtual negocio, bot atención cliente, chatbot restaurante"
      />
      <ServiceSchema
        name="Chatbots IA para Negocios"
        description="Chatbots con inteligencia artificial que responden 24/7, capturan leads y automatizan la atención al cliente para negocios locales."
        url="/servicios/chatbots-ia"
        price="790"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Servicios', url: '/servicios' },
        { name: 'Chatbots IA', url: '/servicios/chatbots-ia' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Chatbots con IA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Tu asistente virtual que <span className="text-gradient-primary">nunca duerme</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Chatbots con inteligencia artificial que responden preguntas, capturan leads y reservan citas automáticamente. 
              Disponibles 24/7 en tu web, WhatsApp e Instagram.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  Ver demostración
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Por qué necesitas un <span className="text-gradient-primary">chatbot IA</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tus clientes quieren respuestas inmediatas. Un chatbot con IA las da 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Respuestas 24/7", desc: "Atiende consultas a cualquier hora, incluso fines de semana y festivos" },
              { icon: Users, title: "Captura leads", desc: "Recoge datos de contacto automáticamente para tu equipo comercial" },
              { icon: Brain, title: "Aprende tu negocio", desc: "Entrenamos el bot con tu información específica" },
              { icon: Headphones, title: "Deriva a humano", desc: "Cuando es necesario, transfiere la conversación a una persona" },
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
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Qué incluye el pack <span className="text-gradient-secondary">Web + Chatbot 24/7</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Web profesional optimizada para móvil",
                  "Chatbot IA entrenado con la info de tu negocio",
                  "Integración en web (widget flotante)",
                  "Preparado para WhatsApp Business",
                  "Captura automática de leads",
                  "Dashboard de conversaciones",
                  "Derivación inteligente a humano",
                  "30 días de soporte incluido"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <span className="badge-primary text-lg font-semibold">Desde 790 € + IVA</span>
              </div>
            </div>
            <div className="card-premium neon-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="w-8 h-8 text-primary" />
                <span className="font-display font-bold text-xl">Demo del Chatbot</span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Cliente:</p>
                  <p>Hola, ¿cuál es el horario del restaurante?</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-primary mb-1">Bot:</p>
                  <p>¡Hola! 👋 Estamos abiertos de martes a domingo, de 13:00 a 16:00 y de 20:00 a 23:30. Los lunes descansamos. ¿Quieres reservar mesa?</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground mb-1">Cliente:</p>
                  <p>Sí, para el viernes a las 21h</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-primary mb-1">Bot:</p>
                  <p>Perfecto, ¿para cuántas personas? Y necesito tu nombre y teléfono para confirmar la reserva 📋</p>
                </div>
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
              { value: "< 30s", label: "Tiempo de respuesta promedio" },
              { value: "-70%", label: "Mensajes sin contestar" },
              { value: "+40%", label: "Conversión de leads" },
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
              ¿Listo para automatizar tu atención al cliente?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Descubre gratis cómo un chatbot con IA puede transformar tu negocio.
            </p>
            <Link to="/auditoria-gratis">
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

export default ChatbotsIA;
