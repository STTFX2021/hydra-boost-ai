import { PageLayout } from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

const URL = "https://hydrailabs.com/blog/agente-voz-ia-restaurantes-costa-del-sol";

const FAQ = [
  { question: "¿Sustituye al personal de sala?", answer: "No. El agente de voz IA reduce llamadas perdidas y recoge datos, pero las decisiones delicadas siguen siendo del equipo." },
  { question: "¿En qué se diferencia de un contestador?", answer: "Un contestador deja mensajes. Un agente de voz IA conversa, identifica intención, captura datos estructurados y avisa al equipo." },
  { question: "¿Funciona en varios idiomas?", answer: "Sí. Es habitual configurarlo en español e inglés, y se puede ampliar a otros idiomas según el perfil del restaurante." },
];

const Post = () => (
  <PageLayout>
    <Helmet>
      <title>Agente de voz IA para restaurantes en Costa del Sol | HydrAI Labs</title>
      <meta name="description" content="Cómo un agente de voz IA reduce llamadas perdidas en restaurantes de Costa del Sol: reservas, cambios, preguntas frecuentes y escalado a responsable." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="Agente de voz IA para restaurantes en Costa del Sol | HydrAI Labs" />
      <meta property="og:description" content="Cómo reducir llamadas perdidas en restaurantes con agentes de voz IA." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Agente voz IA restaurantes", url: "/blog/agente-voz-ia-restaurantes-costa-del-sol" },
    ]} />
    <FAQSchema items={FAQ} />

    <article className="section-padding pt-32">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">
          Agente de voz IA para restaurantes: cómo reducir llamadas perdidas
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>En Costa del Sol, los restaurantes reciben muchas llamadas en franjas concretas: justo antes del servicio, en plena hora punta y a última hora cuando la cocina ya está bajo presión. Esas llamadas son reservas potenciales que se pierden si nadie puede atenderlas.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Llamadas en horas punta</h2>
          <p>El problema no es la cantidad de llamadas, es que coinciden con el peor momento para responderlas. Un agente de voz IA atiende esas llamadas, identifica la intención del cliente y decide si recoger datos o transferir.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Reservas, cambios y preguntas frecuentes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Solicitud de reserva nueva: recoge fecha, hora, personas, nombre y teléfono.</li>
            <li>Cambio o cancelación: registra la modificación y avisa al equipo.</li>
            <li>Preguntas frecuentes: horario, dirección, parking, menú del día, opciones veganas.</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Escalado a responsable</h2>
          <p>Cuando el cliente pide algo fuera del flujo estándar, el agente no improvisa. Recoge contexto y avisa al responsable para que devuelva la llamada o gestione el caso desde WhatsApp.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Alergias y grupos grandes</h2>
          <p>Casos delicados como alergias serias o reservas de 10 o más personas no se cierran por voz IA. Se recogen como solicitud, se etiquetan como prioritarios y se escalan al equipo. La IA no promete seguridad alimentaria.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Diferencia entre agente de voz y contestador automático</h2>
          <p>Un contestador automático deja un mensaje. Un agente de voz IA conversa, entiende, estructura la información y la entrega lista para que el equipo actúe en segundos. No es lo mismo recibir "alguien llamó" que recibir "reserva para 4 personas, viernes 21:00, Pedro, sin gluten, esperando confirmación".</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Enlaces útiles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><Link to="/restaurantes-ia-reservas-whatsapp-costa-del-sol" className="text-primary hover:underline">IA para reservas de restaurantes en Costa del Sol</Link></li>
            <li><Link to="/agentes-ia-voz-restaurantes" className="text-primary hover:underline">Agentes de voz IA para restaurantes</Link></li>
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
          <h2 className="text-2xl font-display font-bold mb-3">¿Pierdes llamadas en tu restaurante?</h2>
          <p className="text-muted-foreground mb-6">Te ayudamos a evaluarlo en una revisión gratuita.</p>
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
