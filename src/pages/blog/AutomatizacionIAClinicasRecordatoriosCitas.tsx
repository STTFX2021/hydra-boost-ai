import { PageLayout } from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

const URL = "https://hydrailabs.com/blog/automatizacion-ia-clinicas-recordatorios-citas";

const FAQ = [
  { question: "¿La IA puede dar diagnóstico médico?", answer: "No. La IA no debe dar diagnóstico ni recomendaciones clínicas. Esa decisión es siempre del profesional sanitario." },
  { question: "¿Qué tareas sí puede automatizar una clínica?", answer: "Recordatorios de cita, recogida de datos previos, preguntas administrativas frecuentes y seguimiento de pacientes." },
  { question: "¿Reduce los no-shows?", answer: "Los recordatorios automáticos a 48h y 2h ayudan a reducir ausencias, especialmente si permiten cancelar o reprogramar con un solo toque." },
];

const Post = () => (
  <PageLayout>
    <Helmet>
      <title>Automatización IA para clínicas: citas y recordatorios | HydrAI Labs</title>
      <meta name="description" content="Cómo automatizar recordatorios, formularios previos y seguimiento en clínicas con IA. Límites claros: nunca diagnóstico médico, siempre escalado humano." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="Automatización IA para clínicas: citas y recordatorios | HydrAI Labs" />
      <meta property="og:description" content="Menos citas perdidas y más seguimiento en clínicas con automatización IA." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Automatización IA clínicas", url: "/blog/automatizacion-ia-clinicas-recordatorios-citas" },
    ]} />
    <FAQSchema items={FAQ} />

    <article className="section-padding pt-32">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8">
          Automatización IA para clínicas: menos citas perdidas y más seguimiento
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Las clínicas estéticas, dentales y de fisioterapia pierden ingresos cuando los pacientes no acuden a su cita. Y pierden oportunidades cuando un lead nuevo no recibe seguimiento. La IA puede automatizar la parte operativa sin tocar nunca lo clínico.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Recordatorios de citas</h2>
          <p>Un recordatorio a 48h y otro a 2h, ambos con opción de confirmar o reprogramar, reducen los no-shows de forma medible. Si el paciente cancela con tiempo, la clínica puede ofrecer ese hueco a otro paciente en lista de espera.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Preguntas frecuentes</h2>
          <p>Horarios, ubicación, parking, métodos de pago, indicaciones previas: todo eso lo puede responder un bot. Lo importante es que sepa detectar cuándo la pregunta deja de ser administrativa y pasa a ser clínica.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Formularios previos</h2>
          <p>El paciente puede rellenar antecedentes, alergias, medicación y motivo de consulta antes de llegar. El profesional entra en la sala con la información lista, no en un papel a medio rellenar en sala de espera.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Seguimiento de pacientes</h2>
          <p>Tras la cita, mensajes automáticos para preguntar cómo se siente el paciente, recordar cuidados post-tratamiento y proponer la siguiente cita cuando corresponda.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Límites: no dar diagnóstico médico</h2>
          <p>La IA no diagnostica, no recomienda tratamientos ni interpreta síntomas. Esa línea no se cruza. Cualquier mensaje con contenido clínico se escala al equipo sanitario.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Escalado humano</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Cualquier consulta con síntomas o dolor</li>
            <li>Reacciones tras un tratamiento</li>
            <li>Cambios de medicación</li>
            <li>Quejas o reclamaciones</li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Enlaces útiles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><Link to="/automatizacion-ia-clinicas-costa-del-sol" className="text-primary hover:underline">Automatización IA para clínicas en Costa del Sol</Link></li>
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
          <h2 className="text-2xl font-display font-bold mb-3">¿Tu clínica pierde citas o seguimiento?</h2>
          <p className="text-muted-foreground mb-6">Te revisamos los procesos en una auditoría gratuita.</p>
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
