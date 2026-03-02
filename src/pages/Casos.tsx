import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, ExternalLink, Star, CheckCircle2 } from "lucide-react";
import { cases } from "@/data/cases";
import { testimonials } from "@/data/testimonials";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

const Casos = () => {
  const { language } = useTranslation();

  const content = {
    es: {
      badge: "Portfolio de Automatizaciones",
      title: "Proyectos",
      titleHighlight: "en Producción",
      subtitle: "Casos reales de automatización con IA. Cada proyecto incluye web, chatbot y/o automatizaciones funcionando 24/7.",
      viewDemo: "Ver proyecto",
      comingSoon: "Próximamente",
      testimonialsTitle: "Lo que dicen nuestros clientes",
      testimonialsSubtitle: "Resultados reales de negocios que confiaron en nosotros",
      ctaTitle: "¿Listo para tu proyecto?",
      ctaSubtitle: "Agenda una auditoría gratuita y te mostramos exactamente qué podemos automatizar.",
      ctaButton: "Solicitar Auditoría Técnica",
    },
    en: {
      badge: "Automation Portfolio",
      title: "Projects",
      titleHighlight: "in Production",
      subtitle: "Real AI automation cases. Each project includes website, chatbot and/or automations running 24/7.",
      viewDemo: "View project",
      comingSoon: "Coming soon",
      testimonialsTitle: "What our clients say",
      testimonialsSubtitle: "Real results from businesses that trusted us",
      ctaTitle: "Ready for your project?",
      ctaSubtitle: "Schedule a free audit and we'll show you exactly what we can automate.",
      ctaButton: "Request Technical Audit",
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <>
      <SEOHead
        title="Casos de Éxito | HydrAI Labs"
        description="Resultados reales de negocios locales que automatizaron con HydrAI Labs. Restaurantes, clínicas, inmobiliarias."
        canonical="/casos"
        keywords="casos exito ia, portfolio automatizacion, testimonios chatbot, resultados ia negocios"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Casos de Éxito", url: "/casos" }
      ]} />
      
      <PageLayout>
        {/* Hero */}
        <section aria-label="Casos de éxito" className="relative section-padding overflow-hidden">
          <div className="glow-orb-accent w-96 h-96 -top-48 -right-48" />
          <div className="glow-orb-primary w-64 h-64 bottom-0 left-0" />
          
          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="badge-accent mb-6 inline-flex">
                <Zap className="w-3 h-3 mr-1" /> {t.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {t.title} <span className="text-gradient-accent">{t.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section aria-label="Proyectos" className="section-padding">
          <div className="section-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((project) => {
                const IconComponent = project.icon;
                const isComingSoon = project.demoUrl === '#';
                const features = project.features?.[language as 'es' | 'en'] || project.features?.es;
                
                return (
                  <div key={project.id} className="card-elevated card-elevated-hover group flex flex-col overflow-hidden p-6">
                    {/* Image */}
                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.imageAlt[language as 'es' | 'en']}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={400}
                        height={192}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    </div>
                    
                    <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center mb-4 group-hover:bg-${project.color}/20 transition`}>
                      <IconComponent className={`w-6 h-6 text-${project.color}`} />
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground">{project.type[language as 'es' | 'en']}</span>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-3">{project.title}</h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description[language as 'es' | 'en']}
                    </p>

                    {/* Features bullets */}
                    {features && features.length > 0 && (
                      <ul className="space-y-2 mb-4 flex-1">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="badge-primary text-xs">{tag}</span>
                      ))}
                    </div>
                    
                    {isComingSoon ? (
                      <Button size="sm" variant="ghost" disabled className="w-full opacity-60 cursor-not-allowed">
                        {t.comingSoon}
                        <ExternalLink className="ml-2 w-3 h-3" />
                      </Button>
                    ) : (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${t.viewDemo}: ${project.title}`}
                        className="w-full"
                      >
                        <Button size="sm" variant="ghost" className="w-full group/btn hover:bg-primary/10">
                          {t.viewDemo}
                          <ExternalLink className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-label="Testimonios" className="section-padding bg-muted/10">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t.testimonialsTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.testimonialsSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card-elevated card-elevated-hover p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-sm italic text-muted-foreground mb-4">
                    "{testimonial.quote[language as 'es' | 'en']}"
                  </p>
                  
                  {/* Author */}
                  <div className="border-t border-border/30 pt-4">
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.business[language as 'es' | 'en']}</p>
                    <p className="text-xs text-primary">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Solicitar auditoría" className="section-padding">
          <div className="section-container">
            <div className="card-elevated text-center p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.ctaSubtitle}
              </p>
              <Link to="/contacto">
                <Button size="lg" className="btn-neon text-lg px-8 btn-depth">
                  {t.ctaButton}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Casos;
