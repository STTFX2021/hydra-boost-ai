import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ChatbotVsPersona = () => (
  <PageLayout>
    <SEOHead
      title="Chatbot de IA vs Persona: Cuándo Usar Cada Uno en tu Negocio Local"
      description="No se trata de elegir entre chatbot o persona. Se trata de saber qué tareas debe gestionar cada uno para que tu negocio sea más eficiente."
      canonical="/blog/chatbot-vs-persona-atencion-cliente"
      ogType="article"
      publishedTime="2026-02-15"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Chatbot de IA vs Persona: Cuándo Usar Cada Uno en tu Negocio Local",
        datePublished: "2026-02-15",
        author: { "@type": "Organization", name: "HydrAI Labs" },
        publisher: { "@type": "Organization", name: "HydrAI Labs" }
      })}</script>
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Chatbot vs Persona", url: "/blog/chatbot-vs-persona-atencion-cliente" }
    ]} />

    <article className="section-padding">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent">Guías</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> 5 min</span>
          <span className="text-xs text-muted-foreground">15 febrero 2026</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8">
          Chatbot de IA vs Persona: Cuándo Usar Cada Uno en tu Negocio Local
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>La pregunta más frecuente que nos hacen los dueños de negocios locales es: ¿el chatbot va a sustituir a mi equipo?</p>
          <p>La respuesta es no. El chatbot hace lo que una persona no puede hacer: estar disponible las 24 horas, responder al mismo tiempo a 50 clientes diferentes y no olvidar ningún seguimiento.</p>
          <p>La persona hace lo que el chatbot no puede: empatizar, resolver situaciones complejas y construir relaciones de confianza.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Lo que el chatbot hace mejor que una persona</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Responder siempre en menos de 30 segundos</li>
            <li>Gestionar 50 conversaciones simultáneas</li>
            <li>No olvidar ningún seguimiento</li>
            <li>Trabajar a las 3am sin coste adicional</li>
            <li>Recopilar datos estructurados de cada interacción</li>
            <li>Nunca tener un mal día</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Lo que una persona hace mejor que el chatbot</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Empatizar con un cliente frustrado o preocupado</li>
            <li>Negociar precios o condiciones especiales</li>
            <li>Resolver problemas que no están en el guion</li>
            <li>Detectar matices emocionales en la conversación</li>
            <li>Construir una relación de confianza a largo plazo</li>
            <li>Tomar decisiones que requieren criterio humano</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">El modelo híbrido que funciona en negocios locales</h2>
          <p>El modelo más eficiente combina ambos. El chatbot gestiona la primera línea: responde preguntas frecuentes, agenda citas, recoge datos y filtra consultas. Cuando detecta una situación compleja o un lead de alto valor, escala automáticamente a una persona.</p>
          <p>En la práctica, esto significa que tu equipo solo gestiona el 20% de las conversaciones — las que realmente necesitan atención humana. El otro 80% se resuelve automáticamente con el mismo nivel de calidad.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Ejemplos reales por sector</h2>
          <p><strong className="text-foreground">Restaurante:</strong> El chatbot gestiona reservas, horarios y carta. Escala al encargado cuando un cliente pide mesa para grupo grande o tiene petición especial.</p>
          <p><strong className="text-foreground">Clínica:</strong> El chatbot agenda citas y responde sobre tratamientos. Escala al doctor cuando el paciente describe síntomas que requieren valoración médica.</p>
          <p><strong className="text-foreground">Inmobiliaria:</strong> El chatbot cualifica leads por presupuesto y zona. Escala al agente cuando el lead confirma que quiere visitar un piso concreto.</p>
          <p><strong className="text-foreground">Gimnasio:</strong> El chatbot muestra precios y ofrece prueba gratuita. Escala al comercial cuando el lead muestra alta intención de compra.</p>
        </div>

        <div className="card-premium text-center p-10 neon-border mt-12">
          <h2 className="text-2xl font-display font-bold mb-3">¿Quieres ver cómo funcionaría el modelo híbrido en tu negocio?</h2>
          <p className="text-muted-foreground mb-6">Auditoría gratuita. Te diseñamos el flujo chatbot + persona ideal para tu sector.</p>
          <Link to="/auditoria-gratis">
            <Button size="lg" className="btn-neon text-lg px-8">
              Auditoría gratuita <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  </PageLayout>
);

export default ChatbotVsPersona;
