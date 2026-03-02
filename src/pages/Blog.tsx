import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

const Blog = () => {
  const { t, language } = useTranslation();

  return (
    <>
      <SEOHead
        title="Blog | HydrAI Labs"
        description="Artículos sobre automatización IA, chatbots y marketing digital para negocios locales en España."
        canonical="/blog"
        keywords="herramientas ia, stack tecnologico, openai negocios, automatizacion herramientas"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Recursos", url: "/blog" },
        ]}
      />
      <BlogContent />
    </>
  );
};

const BlogContent = () => {
  const { t, language } = useTranslation();

  const tools = [
    {
      name: "OpenAI / ChatGPT",
      description:
        language === "es"
          ? "Inteligencia artificial conversacional para chatbots y procesamiento de lenguaje natural."
          : "Conversational AI for chatbots and natural language processing.",
      logo: "🤖",
      url: "https://openai.com",
    },
    {
      name: "Lovable",
      description:
        language === "es"
          ? "Desarrollo de aplicaciones web con IA. La plataforma donde construimos tus soluciones."
          : "AI-powered web application development. The platform where we build your solutions.",
      logo: "💜",
      url: "https://lovable.dev",
    },
    {
      name: "Supabase",
      description:
        language === "es"
          ? "Base de datos y autenticación. Backend escalable para tus aplicaciones."
          : "Database and authentication. Scalable backend for your applications.",
      logo: "⚡",
      url: "https://supabase.com",
    },
    {
      name: "Make / Zapier",
      description:
        language === "es"
          ? "Automatización de flujos de trabajo. Conectamos todas tus herramientas."
          : "Workflow automation. We connect all your tools.",
      logo: "🔗",
      url: "https://make.com",
    },
    {
      name: "Google Calendar",
      description:
        language === "es"
          ? "Integración con calendario para gestión de citas y reservas."
          : "Calendar integration for appointment and booking management.",
      logo: "📅",
      url: "https://calendar.google.com",
    },
    {
      name: "WhatsApp Business",
      description:
        language === "es"
          ? "Canal de comunicación directo con tus clientes. Chatbots y notificaciones."
          : "Direct communication channel with your clients. Chatbots and notifications.",
      logo: "💬",
      url: "https://business.whatsapp.com",
    },
    {
      name: "Notion",
      description:
        language === "es"
          ? "Gestión de proyectos y documentación. Base de conocimiento para chatbots."
          : "Project management and documentation. Knowledge base for chatbots.",
      logo: "📝",
      url: "https://notion.so",
    },
    {
      name: "Resend",
      description:
        language === "es"
          ? "Envío de emails transaccionales. Confirmaciones y notificaciones automáticas."
          : "Transactional email delivery. Automatic confirmations and notifications.",
      logo: "✉️",
      url: "https://resend.com",
    },
    {
      name: "Stripe",
      description:
        language === "es"
          ? "Procesamiento de pagos online. Integración segura para tu negocio."
          : "Online payment processing. Secure integration for your business.",
      logo: "💳",
      url: "https://stripe.com",
    },
    {
      name: "Vercel",
      description:
        language === "es"
          ? "Hosting y despliegue de aplicaciones web. Rendimiento y escalabilidad."
          : "Web application hosting and deployment. Performance and scalability.",
      logo: "▲",
      url: "https://vercel.com",
    },
    {
      name: "Discord",
      description:
        language === "es"
          ? "Notificaciones internas y comunicación de equipo en tiempo real."
          : "Internal notifications and real-time team communication.",
      logo: "🎮",
      url: "https://discordapp.com/api/webhooks/1476563860805648445/LeOqqp-Si20yqpA9bXHo8pa4kA7JKGYCKzS0DW9nkhEh5lQVocguiiMHOw4CQN7kpYmi",
    },
    {
      name: "Google Analytics",
      description:
        language === "es"
          ? "Analítica web. Métricas y seguimiento del rendimiento de tu sitio."
          : "Web analytics. Metrics and performance tracking for your site.",
      logo: "📊",
      url: "https://analytics.google.com",
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -right-48" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-secondary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t("resources.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {t("resources.title").split(" ").slice(0, 2).join(" ")}{" "}
              <span className="text-gradient-secondary">{t("resources.title").split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">{t("resources.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <a
                key={i}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium group hover:border-primary/50 transition-all"
              >
                <div className="text-4xl mb-4">{tool.logo}</div>
                <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                <span className="text-xs text-primary flex items-center gap-1">
                  {language === "es" ? "Visitar" : "Visit"} <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why these tools */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              {language === "es" ? "¿Por qué estas herramientas?" : "Why these tools?"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === "es"
                ? "Elegimos cada herramienta por su fiabilidad, escalabilidad y capacidad de integración. Esto nos permite crear soluciones que funcionan hoy y crecen contigo mañana."
                : "We choose each tool for its reliability, scalability and integration capabilities. This allows us to create solutions that work today and grow with you tomorrow."}
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="card-premium">
                <h4 className="font-semibold mb-2">{language === "es" ? "Escalabilidad" : "Scalability"}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "es"
                    ? "Todas las herramientas pueden crecer con tu negocio sin límites."
                    : "All tools can grow with your business without limits."}
                </p>
              </div>
              <div className="card-premium">
                <h4 className="font-semibold mb-2">{language === "es" ? "Integración" : "Integration"}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "es"
                    ? "APIs abiertas que permiten conectar cualquier sistema externo."
                    : "Open APIs that allow connecting any external system."}
                </p>
              </div>
              <div className="card-premium">
                <h4 className="font-semibold mb-2">{language === "es" ? "Soporte" : "Support"}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "es"
                    ? "Herramientas con comunidades activas y documentación excelente."
                    : "Tools with active communities and excellent documentation."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === "es" ? "¿Quieres ver la IA en acción?" : "Want to see AI in action?"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === "es"
                ? "Haz nuestra auditoría gratuita y recibe recomendaciones personalizadas."
                : "Take our free audit and receive personalized recommendations."}
            </p>
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t("nav.audit")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
