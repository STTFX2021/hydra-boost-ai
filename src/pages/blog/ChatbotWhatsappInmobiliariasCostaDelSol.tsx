import { PageLayout } from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

const URL = "https://hydrailabs.com/blog/chatbot-whatsapp-inmobiliarias-costa-del-sol";

const FAQ = [
  { question: "¿Por qué importa la velocidad de respuesta?", answer: "En inmobiliaria, el primero que responde con información útil suele cerrar la visita. La diferencia entre minutos y horas marca la conversión." },
  { question: "¿Qué información debe cualificar el bot?", answer: "Zona, presupuesto, tipo de operación (compra o alquiler), tamaño, idioma del cliente y nivel de urgencia." },
  { question: "¿Sustituye al comercial?", answer: "No. Cualifica y avisa al comercial con el lead listo para llamarlo o pasarlo a WhatsApp humano." },
];

const Post = () => (
  <PageLayout>
    <Helmet>
      <title>Chatbot WhatsApp para inmobiliarias en Costa del Sol | HydrAI Labs</title>
      <meta name="description" content="Cómo un chatbot de WhatsApp cualifica leads inmobiliarios en Costa del Sol por presupuesto, zona, idioma y tipo de operación antes de perderlos." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="Chatbot WhatsApp para inmobiliarias en Costa del Sol | HydrAI Labs" />
      <meta property="og:description" content="Cualifica leads inmobiliarios antes de perderlos con un chatbot de WhatsApp." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Chatbot WhatsApp inmobiliarias", url: "/blog/chatbot-whatsapp-inmobiliarias-costa-del-sol" },
    ]} />
    <FAQSchema items={FAQ} />

    <article className="section-padding pt-32">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">
          Chatbot WhatsApp para inmobiliarias: cómo clasificar leads antes de perderlos
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>En inmobiliaria, un lead que pregunta por una propiedad y no recibe respuesta en pocos minutos se enfría. En Costa del Sol, donde compiten muchas agencias por el mismo tipo de cliente internacional, la velocidad de respuesta es ventaja directa.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Leads que preguntan y no reciben seguimiento</h2>
          <p>El portal manda el lead, llega por WhatsApp o email, y se mezcla con otras 200 conversaciones del día. Sin un sistema que filtre y avise, el comercial no sabe a quién atender primero.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Cualificación por presupuesto, zona, operación e idioma</h2>
          <p>El chatbot recoge en segundos los datos clave que el comercial necesita:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Compra o alquiler, y plazo</li>
            <li>Zona o zonas de interés</li>
            <li>Presupuesto aproximado</li>
            <li>Tipo de propiedad (piso, villa, ático, comercial)</li>
            <li>Idioma del cliente para asignar al comercial adecuado</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Avisos al comercial</h2>
          <p>Cuando el lead pasa el filtro mínimo, el bot avisa al comercial responsable con la ficha completa. No se trabajan leads dudosos a ciegas: se priorizan los que tienen intención clara.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Seguimiento automático</h2>
          <p>Los leads que no avanzan reciben mensajes de seguimiento espaciados con nuevas propiedades que encajan con su búsqueda. Sin perseguir al cliente, pero sin desaparecer.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Por qué la velocidad de respuesta importa</h2>
          <p>Estudios del sector inmobiliario muestran que la probabilidad de cerrar una visita cae drásticamente después de la primera hora sin contacto. Automatizar la primera respuesta no es lujo: es defensa básica de la inversión en captación.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Enlaces útiles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><Link to="/automatizacion-ia-inmobiliarias-costa-del-sol" className="text-primary hover:underline">Automatización IA para inmobiliarias en Costa del Sol</Link></li>
            <li><Link to="/chatbots-whatsapp-negocios-locales" className="text-primary hover:underline">Chatbots WhatsApp para negocios locales</Link></li>
            <li><Link to="/auditoria-gratis" className="text-primary hover:underline">Auditoría gratuita</Link></li>
          </ul>
        </div>

        <h2 className="text-2xl font-display font-bold text-foreground mt-16 mb-6">Preguntas frecuentes</h2>
        <div className="space-y-4 mb-12">
          {FAQ.map((f, i) => (
            <details key={i} className="group rounded-xl border border-border/60 bg-card overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-5 text-foreground font-medium list-none">
                {f.question}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-muted-foreground text-sm">{f.answer}</div>
            </details>
          ))}
        </div>

        <div className="card-premium text-center p-10 neon-border">
          <h2 className="text-2xl font-display font-bold mb-3">¿Tu inmobiliaria pierde leads por responder tarde?</h2>
          <p className="text-muted-foreground mb-6">Te lo revisamos gratis y te decimos qué automatizar primero.</p>
          <Link to="/auditoria-gratis">
            <Button size="lg" className="btn-neon">
              Solicitar auditoría gratuita <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  </PageLayout>
);

export default Post;
