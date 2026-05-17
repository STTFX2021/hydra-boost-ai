import { PageLayout } from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

const URL = "https://hydrailabs.com/blog/automatizar-reservas-restaurante-whatsapp";

const FAQ = [
  { question: "¿Puede la IA confirmar la reserva sola?", answer: "Solo si está conectada al sistema de reservas con disponibilidad real. Si no, recoge la solicitud y avisa al equipo para confirmar." },
  { question: "¿Qué datos debe pedir el bot?", answer: "Nombre, teléfono, fecha, hora, número de personas y, opcionalmente, alergias o preferencias." },
  { question: "¿Cuándo debe entrar un humano?", answer: "En grupos grandes, eventos privados, alergias serias, cambios de última hora o cualquier caso fuera de protocolo." },
];

const Post = () => (
  <PageLayout>
    <Helmet>
      <title>Cómo automatizar reservas de restaurante por WhatsApp | HydrAI Labs</title>
      <meta name="description" content="Guía práctica para automatizar reservas de restaurante por WhatsApp sin perder el control: qué datos capturar, cuándo escalar a humano y errores a evitar." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="Cómo automatizar reservas de restaurante por WhatsApp | HydrAI Labs" />
      <meta property="og:description" content="Guía práctica para automatizar reservas de restaurante por WhatsApp sin perder el control." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Automatizar reservas restaurante WhatsApp", url: "/blog/automatizar-reservas-restaurante-whatsapp" },
    ]} />
    <FAQSchema items={FAQ} />

    <article className="section-padding pt-32">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">
          Cómo automatizar reservas de restaurante por WhatsApp sin perder el control
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>WhatsApp es ya el canal principal por el que muchos clientes intentan reservar mesa. Si el restaurante no responde rápido, la reserva se va a otro sitio. Automatizar la primera respuesta no es opcional: es lo que separa la mesa llena de la mesa vacía.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">El problema: WhatsApps sin responder</h2>
          <p>En horas punta, ningún camarero puede dejar de servir mesas para responder mensajes. El resultado son conversaciones de WhatsApp con horas de retraso, clientes que se cansan de esperar y reservas que nunca llegan a entrar en el sistema.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Qué datos debe capturar el bot</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Nombre del cliente</li>
            <li>Teléfono de contacto</li>
            <li>Fecha y hora deseada</li>
            <li>Número de personas</li>
            <li>Notas: alergias, ocasión especial, sillas para niños, accesibilidad</li>
          </ul>
          <p>Capturar estos datos de forma estructurada permite que el equipo de sala revise la solicitud en segundos y confirme con disponibilidad real.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Cuándo debe intervenir un humano</h2>
          <p>La IA está para recoger, clasificar y avisar. No para tomar decisiones que arriesgan la experiencia del cliente. Debe escalar siempre que detecte:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Grupos grandes (8 personas o más)</li>
            <li>Alergias serias o restricciones alimentarias importantes</li>
            <li>Eventos privados, cumpleaños o cenas de empresa</li>
            <li>Cambios de última hora o cancelaciones repetidas</li>
            <li>Cualquier mensaje en tono de queja</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Errores a evitar</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Prometer disponibilidad sin tenerla validada</li>
            <li>Cerrar reservas firmes sin que el equipo de sala las haya visto</li>
            <li>No diferenciar entre solicitud y confirmación</li>
            <li>No avisar al cliente del estado real de su solicitud</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Por qué no conviene confirmar sin conexión real</h2>
          <p>Si el bot confirma reservas sin estar conectado al sistema real de aforo, antes o después se duplican mesas o se aceptan grupos que no caben. La regla es simple: solo se confirma lo que el sistema de reservas puede garantizar. Lo demás se recoge como solicitud y se avisa al equipo.</p>

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
          <h2 className="text-2xl font-display font-bold mb-3">¿Quieres automatizar las reservas de tu restaurante?</h2>
          <p className="text-muted-foreground mb-6">Hacemos una revisión gratuita y te decimos por dónde empezar.</p>
          <Link to="/restaurantes-ia-reservas-whatsapp-costa-del-sol">
            <Button size="lg" className="btn-neon">
              Ver solución para restaurantes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  </PageLayout>
);

export default Post;
