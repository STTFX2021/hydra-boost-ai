import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ScrapingLeadsInmobiliaria = () => (
  <PageLayout>
    <SEOHead
      title="Cómo las Inmobiliarias Usan Apify para Encontrar Propietarios que Quieren Vender"
      description="El scraping ético de datos públicos permite a las inmobiliarias identificar propietarios con intención de vender antes que la competencia."
      canonical="/blog/scraping-leads-inmobiliaria"
      ogType="article"
      publishedTime="2026-02-25"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "Cómo las Inmobiliarias Usan Apify para Encontrar Propietarios que Quieren Vender",
        datePublished: "2026-02-25",
        author: { "@type": "Organization", name: "HydrAI Labs" },
        publisher: { "@type": "Organization", name: "HydrAI Labs" }
      })}</script>
    </Helmet>
    <BreadcrumbSchema items={[
      { name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" },
      { name: "Scraping Leads Inmobiliaria", url: "/blog/scraping-leads-inmobiliaria" }
    ]} />

    <article className="section-padding">
      <div className="section-container max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary text-sm flex items-center gap-1 mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary">Tecnología</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> 6 min</span>
          <span className="text-xs text-muted-foreground">25 febrero 2026</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8">
          Cómo las Inmobiliarias Usan Apify para Encontrar Propietarios que Quieren Vender
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Encontrar propietarios con intención real de vender siempre ha sido el mayor reto para las inmobiliarias. Las llamadas en frío tienen una tasa de éxito inferior al 2%. Los portales inmobiliarios están llenos de los mismos contactos que tienen todas las agencias.</p>
          <p>Existe una tercera vía: identificar señales de intención pública en internet usando herramientas de scraping como Apify, y contactar a esos propietarios antes que la competencia.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Qué es el scraping y qué no es</h2>
          <p>El scraping es la extracción automatizada de datos públicos disponibles en internet. No accede a información privada, no hackea sistemas y no viola la privacidad de nadie.</p>
          <p>En el contexto inmobiliario, significa rastrear:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Anuncios en portales donde propietarios ofrecen su piso en alquiler (señal de que podrían estar interesados en vender)</li>
            <li>Publicaciones en grupos de Facebook de compraventa inmobiliaria local</li>
            <li>Propiedades con cambios de precio recientes que sugieren urgencia en vender</li>
          </ul>
          <p>Todo ello son datos que los propietarios han hecho públicos voluntariamente.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Cómo funciona el proceso con Apify y n8n</h2>
          <p>En HydrAI Labs usamos Apify como motor de scraping y n8n como orquestador del flujo completo:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Apify Actor rastrea los portales y fuentes configuradas diariamente</li>
            <li>Extrae nombre del anuncio, contacto si es público, zona y tipología</li>
            <li>n8n filtra y enriquece los datos</li>
            <li>Se genera un email o mensaje de WhatsApp personalizado para cada propietario</li>
            <li>El agente inmobiliario recibe solo los contactos cualificados</li>
          </ol>
          <p>El resultado es un pipeline que genera 25-40 nuevos contactos de propietarios por semana de forma completamente automática.</p>

          <h2 className="text-2xl font-display font-bold text-foreground mt-10">Resultados reales en una inmobiliaria de Marbella</h2>
          <p>Una inmobiliaria de Marbella implementó este sistema durante 60 días. Los resultados:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>180 propietarios contactados en 2 meses</li>
            <li>23 captaciones de mandato conseguidas</li>
            <li>4 operaciones cerradas en ese período</li>
            <li>ROI de 12x sobre el coste de implementación</li>
          </ul>
          <p>El equipo de agentes pasó de hacer llamadas en frío todo el día a recibir contactos de propietarios interesados directamente.</p>
        </div>

        <div className="card-premium text-center p-10 neon-border mt-12">
          <h2 className="text-2xl font-display font-bold mb-3">¿Tienes una inmobiliaria y quieres implementar este sistema?</h2>
          <p className="text-muted-foreground mb-6">Auditoría gratuita para inmobiliarias. Te mostramos cómo captar propietarios automáticamente.</p>
          <Link to="/auditoria?vertical=inmobiliaria">
            <Button size="lg" className="btn-neon text-lg px-8">
              Solicitar auditoría gratuita <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  </PageLayout>
);

export default ScrapingLeadsInmobiliaria;
