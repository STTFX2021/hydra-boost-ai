import { PageLayout } from "@/components/layout/PageLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from "@/components/seo";
import { ArrowRight, CheckCircle2, Phone, MessageSquare, AlertTriangle, Sparkles } from "lucide-react";

const URL = "https://hydrailabs.com/restaurantes-ia-reservas-whatsapp-costa-del-sol";

const PAIN = [
  "Llamadas perdidas en horas punta",
  "WhatsApps sin responder",
  "Reservas apuntadas a mano",
  "Clientes que preguntan disponibilidad y se van",
  "Cambios, alergias y grupos gestionados sin control",
  "Falta de seguimiento después del primer contacto",
];

const SOLUTION = [
  "Chatbot WhatsApp para reservas",
  "Agente de voz IA para llamadas",
  "Captura de nombre, teléfono, fecha, hora y número de personas",
  "Avisos automáticos al equipo",
  "Escalado a responsable en casos delicados",
  "Registro de preferencias, alergias y notas importantes",
];

const FAQ = [
  { question: "¿La IA confirma reservas automáticamente?", answer: "No necesariamente. Puede recoger la solicitud, validar datos y avisar al equipo. La confirmación final depende de la configuración y disponibilidad real del restaurante." },
  { question: "¿Puede responder WhatsApp?", answer: "Sí. Podemos crear flujos para responder consultas, recoger solicitudes de reserva, clasificar clientes y avisar al equipo." },
  { question: "¿Puede atender llamadas?", answer: "Sí. HydrAI Labs trabaja con agentes de voz IA para llamadas de restaurantes, especialmente para recoger datos y reducir llamadas perdidas." },
  { question: "¿Qué pasa con alergias o grupos grandes?", answer: "Los casos delicados pueden escalarse a un responsable. La IA no debe prometer seguridad alimentaria ni disponibilidad sin validación humana." },
  { question: "¿Sirve para restaurantes pequeños?", answer: "Sí. La primera automatización puede ser sencilla: capturar solicitudes, responder preguntas frecuentes y avisar al equipo." },
  { question: "¿Cuánto tarda en implementarse?", answer: "Depende del sistema, pero una primera versión puede plantearse como MVP para validar rápido antes de escalar." },
  { question: "¿Trabajáis en Costa del Sol?", answer: "Sí. HydrAI Labs trabaja con negocios locales e internacionales en Costa del Sol." },
  { question: "¿La auditoría es gratuita?", answer: "Sí. La auditoría inicial es gratuita y sirve para detectar qué proceso conviene automatizar primero." },
];

const RestaurantesIAReservasWhatsappCostaDelSol = () => (
  <PageLayout>
    <Helmet>
      <title>IA para reservas de restaurantes en Costa del Sol | HydrAI Labs</title>
      <meta name="description" content="Automatiza reservas, WhatsApp y llamadas en restaurantes con asistentes IA. HydrAI Labs ayuda a restaurantes de Costa del Sol a captar más reservas y responder más rápido." />
      <link rel="canonical" href={URL} />
      <meta property="og:title" content="IA para reservas de restaurantes en Costa del Sol | HydrAI Labs" />
      <meta property="og:description" content="Automatiza reservas, WhatsApp y llamadas en restaurantes con asistentes IA en Costa del Sol." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="website" />
    </Helmet>

    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" },
      { name: "Restaurantes IA Reservas WhatsApp Costa del Sol", url: "/restaurantes-ia-reservas-whatsapp-costa-del-sol" },
    ]} />
    <FAQSchema items={FAQ} />
    <ServiceSchema
      name="IA para reservas de restaurantes en Costa del Sol"
      description="Asistentes IA para restaurantes: WhatsApp, llamadas, captura de reservas, avisos al equipo y registro de alergias."
      url="/restaurantes-ia-reservas-whatsapp-costa-del-sol"
    />

    {/* Hero */}
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="section-container relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <span className="badge-primary inline-flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4" /> Restaurantes · Costa del Sol
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
          ¿Tu restaurante pierde reservas por <span className="text-gradient-primary">no responder a tiempo</span>?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          HydrAI Labs crea asistentes IA para restaurantes que responden WhatsApp, llamadas y solicitudes
          de reserva, capturan datos del cliente y avisan al equipo antes de que el cliente se vaya a otro sitio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link to="/auditoria-gratis">
            <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[260px]">
              Quiero revisar mis reservas gratis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <a href="#solucion">
            <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6 h-12">
              Ver qué puede automatizar
            </Button>
          </a>
        </div>
        <p className="text-xs text-muted-foreground">Diagnóstico gratuito · Sin compromiso · Respuesta en menos de 24h</p>
      </div>
    </section>

    {/* Dolor */}
    <section className="py-20 bg-muted/30">
      <div className="section-container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Dónde se escapan tus reservas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN.map((p) => (
            <div key={p} className="rounded-2xl border border-destructive/30 bg-card p-6 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Solución */}
    <section id="solucion" className="py-20">
      <div className="section-container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Qué automatizamos para tu restaurante</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTION.map((s) => (
            <div key={s} className="rounded-2xl border border-border/60 bg-card p-6 flex gap-3 hover:border-primary/40 transition-all">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Ejemplo conversación */}
    <section className="py-20 bg-muted/30">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-center mb-10">Ejemplo de conversación</h2>
        <div className="space-y-3">
          {[
            { who: "Cliente", text: "Hola, quiero reservar para 4 esta noche.", primary: false },
            { who: "IA", text: "Perfecto. ¿A qué hora os gustaría venir?", primary: true },
            { who: "Cliente", text: "A las 21:00.", primary: false },
            { who: "IA", text: "Genial. ¿A nombre de quién la anoto?", primary: true },
            { who: "IA", text: "Tengo anotada la solicitud. El equipo revisará disponibilidad antes de confirmarla.", primary: true },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.primary ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${m.primary ? "bg-primary/10 border border-primary/30" : "bg-card border border-border/60"}`}>
                <p className="text-xs font-semibold mb-1 text-muted-foreground">{m.who}</p>
                <p className="text-foreground text-sm">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Diferenciador */}
    <section className="py-20">
      <div className="section-container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">No es un chatbot genérico</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          HydrAI Labs no vende bots genéricos. Creamos sistemas de atención y reservas diseñados para
          restaurantes reales: llamadas, WhatsApp, horarios, grupos, alergias, cocina, sala y responsables.
        </p>
      </div>
    </section>

    {/* Vozra */}
    <section className="py-20 bg-muted/30">
      <div className="section-container max-w-3xl mx-auto">
        <div className="rounded-2xl border border-primary/40 bg-card p-8 md:p-12 space-y-4">
          <span className="badge-primary inline-flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" /> Vozra
          </span>
          <h2 className="text-3xl font-display font-bold">Vozra: agente IA para restaurantes</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vozra es el sistema de voz y reservas de HydrAI Labs para restaurantes. Está diseñado para
            recoger solicitudes, entender preferencias, detectar casos delicados y avisar al equipo
            cuando hace falta intervención humana.
          </p>
        </div>
      </div>
    </section>

    {/* CTA Final */}
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="section-container max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          ¿Quieres saber cuántas reservas puedes estar perdiendo?
        </h2>
        <p className="text-secondary-foreground/80 text-lg">
          Te hacemos una revisión gratuita y te decimos qué parte de tu atención al cliente deberías automatizar primero.
        </p>
        <Link to="/auditoria-gratis">
          <Button size="lg" className="btn-neon text-base px-8 h-12">
            Solicitar revisión gratuita <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <details key={i} className="group rounded-xl border border-border/60 bg-card overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-5 text-foreground font-medium hover:text-primary transition-colors list-none">
                {f.question}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{f.answer}</div>
            </details>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 text-center space-y-3">
          <p className="text-sm text-muted-foreground">Sigue explorando</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/auditoria-gratis" className="text-primary hover:underline">Auditoría gratis</Link>
            <span className="text-border">·</span>
            <Link to="/chatbots-whatsapp-negocios-locales" className="text-primary hover:underline">Chatbots WhatsApp</Link>
            <span className="text-border">·</span>
            <Link to="/agentes-ia-voz-restaurantes" className="text-primary hover:underline">Agentes de voz IA</Link>
            <span className="text-border">·</span>
            <Link to="/automatizacion-ia-restaurantes-costa-del-sol" className="text-primary hover:underline">Automatización IA Restaurantes</Link>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default RestaurantesIAReservasWhatsappCostaDelSol;
