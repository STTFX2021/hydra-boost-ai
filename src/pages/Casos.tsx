import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, ExternalLink, Star } from "lucide-react";
import { cases } from "@/data/cases";
import { testimonials } from "@/data/testimonials";
import { useTranslation } from "@/lib/i18n";

const Casos = () => {
  const { t, language } = useTranslation();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-accent w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-primary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-accent mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t('cases.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {t('cases.title').split(' ').slice(0, 2).join(' ')} <span className="text-gradient-accent">{t('cases.title').split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('cases.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((project) => {
              const IconComponent = project.icon;
              const isComingSoon = project.demoUrl === '#';
              
              return (
                <div key={project.id} className="card-premium group flex flex-col overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.imageAlt[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  
                  <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center mb-4 group-hover:bg-${project.color}/20 transition`}>
                    <IconComponent className={`w-6 h-6 text-${project.color}`} />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">{project.type[language]}</span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-3">{project.title}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description[language]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="badge-primary text-xs">{tag}</span>
                    ))}
                  </div>
                  
                  {isComingSoon ? (
                    <Button size="sm" variant="ghost" disabled className="w-full opacity-60 cursor-not-allowed">
                      {t('cases.comingSoon')}
                      <ExternalLink className="ml-2 w-3 h-3" />
                    </Button>
                  ) : (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button size="sm" variant="ghost" className="w-full group/btn hover:bg-primary/10">
                        {t('cases.viewDemo')}
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
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('cases.testimonialsTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('cases.testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-premium">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-sm italic text-muted-foreground mb-4">
                  "{testimonial.quote[language]}"
                </p>
                
                {/* Author */}
                <div className="border-t border-border/30 pt-4">
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.business[language]}</p>
                  <p className="text-xs text-primary">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('cases.ctaTitle')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('cases.ctaSubtitle')}
            </p>
            <Link to="/contacto">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t('cases.ctaButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Casos;
