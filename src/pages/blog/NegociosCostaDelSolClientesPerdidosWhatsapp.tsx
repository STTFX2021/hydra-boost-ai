import { PageLayout } from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

const URL = "https://hydrailabs.com/blog/negocios-costa-del-sol-clientes-perdidos-whatsapp";

const FAQ = [
  { question: "¿Cuánto importa la velocidad de respuesta?", answer: "Mucho. Cuanto más tarda la primera respuesta, más cae la conversión, especialmente en clientes que están comparando varias opciones a la vez." },
  { question: "¿Qué se puede automatizar primero?", answer: "La primera respuesta, la captura de datos clave y el aviso al equipo. El resto puede ir entrando por fases." },
  { question: "¿Sirve para cualquier negocio local?", answer: "Sí. Restaurantes, clínicas, inmobiliarias, gimnasios y servicios profesionales pierden clientes por la misma causa: responder tarde." },
];

const Post = () => (
  <PageLayout>
    <Helmet>
      <title>Clientes perdidos por WhatsApp en Costa del Sol | HydrAI Labs</title>
      <meta name="description" content="Cuántos clientes pierde un negocio local en Costa del Sol por responder tarde en WhatsApp y cómo automatizar la primera respuesta sin perder calidad." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="Clientes perdidos por WhatsApp en Costa del Sol | HydrAI Labs" />
      <meta property="og:description" content="Cuánto cuesta a un negocio local responder tarde en WhatsApp." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Clientes perdidos WhatsApp Costa del Sol", url: "/blog/negocios-costa-del-sol-clientes-perdidos-whatsapp" },
    ]} />
    <FAQSchema items={FAQ} />

    <article className="section-padding pt-32">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">
          Cuántos clientes pierde un negocio local por responder tarde en WhatsApp
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>WhatsApp se ha convertido en el canal principal por el que los clientes contactan con un negocio local en Costa del Sol. Y también en el sitio donde más clientes se pierden silenciosamente, simplemente porque nadie responde a tiempo.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">El problema de la velocidad de respuesta</h2>
          <p>El cliente local o turista no espera. Si pregunta a tres negocios a la vez, va al que conteste primero con información clara. Cada hora sin respuesta es una caída directa en la probabilidad de cerrar.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Sectores afectados</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Restaurantes:</strong> reservas que se van a otro sitio.</li>
            <li><strong>Clínicas:</strong> pacientes que reservan en la primera clínica que confirma.</li>
            <li><strong>Inmobiliarias:</strong> leads que enseguida hablan con otra agencia.</li>
            <li><strong>Gimnasios:</strong> nuevas altas que se enfrían.</li>
            <li><strong>Servicios locales:</strong> presupuestos que nunca se piden formalmente.</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Automatización de la primera respuesta</h2>
          <p>La primera respuesta no necesita ser perfecta, necesita ser inmediata, útil y honesta. Un asistente IA puede saludar, identificar la consulta, capturar datos básicos y avisar al equipo en segundos.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Captura de datos</h2>
          <p>Sin datos estructurados no hay seguimiento. La IA pregunta lo justo: nombre, contacto, qué necesita y para cuándo. El equipo recibe la ficha lista para llamar o contestar por WhatsApp humano.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Seguimiento</h2>
          <p>El cliente que no avanza no debe desaparecer. Mensajes de seguimiento espaciados, sin agobiar, mantienen viva la conversación hasta que el cliente decide.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Ejemplos concretos</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Restaurante en Marbella: solicitud de reserva fuera de horario, respondida en segundos por WhatsApp y entregada al equipo a primera hora.</li>
            <li>Clínica en Málaga: lead de Instagram que pregunta por un tratamiento, cualificado por presupuesto y derivado al departamento adecuado.</li>
            <li>Inmobiliaria en Estepona: cliente internacional que pregunta en inglés por una villa, atendido en su idioma y enviado al comercial responsable de su zona.</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Enlaces útiles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><Link to="/restaurantes-ia-reservas-whatsapp-costa-del-sol" className="text-primary hover:underline">IA para reservas de restaurantes en Costa del Sol</Link></li>
            <li><Link to="/chatbots-whatsapp-negocios-locales" className="text-primary hover:underline">Chatbots WhatsApp para negocios locales</Link></li>
            <li><Link to="/agentes-ia-voz-restaurantes" className="text-primary hover:underline">Agentes de voz IA para restaurantes</Link></li>
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
          <h2 className="text-2xl font-display font-bold mb-3">¿Cuántos clientes pierdes cada semana por responder tarde?</h2>
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
