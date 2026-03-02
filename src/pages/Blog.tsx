import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";

const articles = [
  {
    slug: "chatbot-whatsapp-restaurante",
    title: "Cómo un Restaurante en Madrid Redujo los No-Shows un 40% con un Chatbot de WhatsApp",
    excerpt: "Un restaurante de cocina mediterránea en Madrid perdía 3-4 mesas por servicio por no-shows. En 30 días con un chatbot de WhatsApp redujo las ausencias un 40%.",
    category: "Casos de Éxito",
    categoryColor: "bg-success/20 text-success",
    readTime: "5 min",
    date: "28 febrero 2026",
  },
  {
    slug: "scraping-leads-inmobiliaria",
    title: "Cómo las Inmobiliarias Usan Apify para Encontrar Propietarios que Quieren Vender",
    excerpt: "El scraping ético de datos públicos permite a las inmobiliarias identificar propietarios con intención de vender antes de que contacten a la competencia.",
    category: "Tecnología",
    categoryColor: "bg-primary/20 text-primary",
    readTime: "6 min",
    date: "25 febrero 2026",
  },
  {
    slug: "automatizacion-ia-negocio-local",
    title: "5 Procesos que Todo Negocio Local Puede Automatizar con IA Hoy Mismo",
    excerpt: "Chatbots, recordatorios, captación de leads y gestión de reseñas. Estos son los 5 procesos que más tiempo consumen en negocios locales y que se pueden automatizar desde 197€.",
    category: "Guías",
    categoryColor: "bg-accent/20 text-accent",
    readTime: "7 min",
    date: "20 febrero 2026",
  },
  {
    slug: "chatbot-vs-persona-atencion-cliente",
    title: "Chatbot de IA vs Persona: Cuándo Usar Cada Uno en tu Negocio Local",
    excerpt: "No se trata de elegir entre chatbot o persona. Se trata de saber qué tareas debe gestionar cada uno para que tu negocio sea más eficiente.",
    category: "Guías",
    categoryColor: "bg-accent/20 text-accent",
    readTime: "5 min",
    date: "15 febrero 2026",
  },
];

const Blog = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Blog | HydrAI Labs — Automatización IA para Negocios Locales"
        description="Guías, casos de éxito y artículos sobre automatización IA, chatbots y marketing digital para negocios locales en España."
        canonical="/blog"
        keywords="blog automatizacion ia, chatbot negocios, marketing digital negocios locales"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Blog", url: "/blog" },
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -right-48" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Blog de <span className="text-gradient-primary">Automatización IA</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Guías prácticas, casos de éxito reales y artículos sobre cómo la IA transforma negocios locales en España.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {articles.map((article) => (
              <Link key={article.slug} to={`/blog/${article.slug}`} className="group">
                <article className="card-premium h-full flex flex-col hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${article.categoryColor}`}>
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-display font-bold mb-3 group-hover:text-primary transition line-clamp-3">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </div>
                    <span>{article.date}</span>
                  </div>
                  <span className="text-primary text-sm font-semibold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Quieres ver la IA en acción?
            </h2>
            <p className="text-muted-foreground mb-8">
              Solicita tu auditoría gratuita y recibe recomendaciones personalizadas para tu negocio.
            </p>
            <Link to="/auditoria-gratis">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría gratuita
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
