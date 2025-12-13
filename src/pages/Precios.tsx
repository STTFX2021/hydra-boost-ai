import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { CheckCircle2, ArrowRight, Zap, Star, Phone, Globe } from "lucide-react";

const Precios = () => {
  const { t, language } = useTranslation();

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: language === 'en' ? "Try the power of AI in your business" : "Prueba el poder de la IA en tu negocio",
      duration: language === 'en' ? "7 days" : "7 días",
      price: "0",
      priceNote: language === 'en' ? "No commitment" : "Sin compromiso",
      features: language === 'en' ? [
        "1 channel (WhatsApp, IG or FB)",
        "Automatic response bot",
        "Up to 100 conversations",
        "Basic dashboard",
        "Email support",
      ] : [
        "1 canal (WhatsApp, IG o FB)",
        "Bot de respuesta automática",
        "Hasta 100 conversaciones",
        "Dashboard básico",
        "Soporte por email",
      ],
      cta: language === 'en' ? "Start free" : "Empezar gratis",
      featured: false,
    },
    {
      id: "growth",
      name: "Growth",
      description: language === 'en' ? "For businesses that want to grow" : "Para negocios que quieren crecer",
      duration: language === 'en' ? "14 days" : "14 días",
      price: "297",
      priceNote: language === 'en' ? "/month after" : "/mes después",
      features: language === 'en' ? [
        "3 channels included",
        "AI Receptionist 24/7",
        "Booking system",
        "Automatic reminders",
        "Review requests",
        "Full dashboard",
        "Priority support",
        "Basic integrations",
      ] : [
        "3 canales incluidos",
        "AI Recepcionista 24/7",
        "Sistema de reservas",
        "Recordatorios automáticos",
        "Solicitud de reseñas",
        "Dashboard completo",
        "Soporte prioritario",
        "Integraciones básicas",
      ],
      cta: language === 'en' ? "Start trial" : "Empezar prueba",
      featured: true,
    },
    {
      id: "pro",
      name: "Pro",
      description: language === 'en' ? "Complete automation" : "Automatización completa",
      duration: language === 'en' ? "30 days" : "30 días",
      price: "597",
      priceNote: language === 'en' ? "/month after" : "/mes después",
      features: language === 'en' ? [
        "Unlimited channels",
        "Everything in Growth +",
        "Customer reactivation",
        "Integrated CRM",
        "Automatic campaigns",
        "Custom API",
        "Dedicated support",
        "Premium onboarding",
        "Guaranteed SLA",
      ] : [
        "Canales ilimitados",
        "Todo en Growth +",
        "Reactivación de clientes",
        "CRM integrado",
        "Campañas automáticas",
        "API personalizada",
        "Soporte dedicado",
        "Onboarding premium",
        "SLA garantizado",
      ],
      cta: language === 'en' ? "Start trial" : "Empezar prueba",
      featured: false,
    },
  ];

  const faqs = language === 'en' ? [
    {
      q: "How much does it cost after the trial period?",
      a: "The prices shown are monthly after the trial period. No lock-in, you can cancel anytime.",
    },
    {
      q: "Are there hidden costs?",
      a: "No. The price includes everything listed. You would only pay extra for bulk SMS sending or very specific integrations.",
    },
    {
      q: "Can I change plans?",
      a: "Yes, you can upgrade or downgrade at any time. The change applies on your next billing cycle.",
    },
    {
      q: "What happens to my data if I cancel?",
      a: "Your data is yours. We export it in standard format (CSV/JSON) before closing the account.",
    },
    {
      q: "Do you offer annual discounts?",
      a: "Yes, if you pay annually you get 2 months free (equivalent to ~17% discount).",
    },
  ] : [
    {
      q: "¿Cuánto cuesta después del período de prueba?",
      a: "Los precios indicados son mensuales tras el período de prueba. Sin permanencia, puedes cancelar cuando quieras.",
    },
    {
      q: "¿Hay costes ocultos?",
      a: "No. El precio incluye todo lo listado. Solo pagarías aparte si necesitas envío masivo de SMS o integraciones muy específicas.",
    },
    {
      q: "¿Puedo cambiar de plan?",
      a: "Sí, puedes subir o bajar de plan en cualquier momento. El cambio se aplica en tu próximo ciclo de facturación.",
    },
    {
      q: "¿Qué pasa con mis datos si cancelo?",
      a: "Tus datos son tuyos. Te los exportamos en formato estándar (CSV/JSON) antes de cerrar la cuenta.",
    },
    {
      q: "¿Ofrecéis descuentos anuales?",
      a: "Sí, si pagas anualmente tienes 2 meses gratis (equivalente a ~17% de descuento).",
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 left-1/2 -translate-x-1/2" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t('pricing.title')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-primary">{t('pricing.title').split(' ')[0]}</span> {t('pricing.subtitle')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {language === 'en' ? 'Choose the plan that best fits your business. All include a trial period.' : 'Elige el plan que mejor se adapte a tu negocio. Todos incluyen período de prueba.'}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding -mt-16">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`${
                  plan.featured ? "pricing-card-featured" : "pricing-card"
                } flex flex-col`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-4 -translate-y-1/2">
                    <span className="badge-primary flex items-center gap-1">
                      <Star className="w-3 h-3" /> {t('pricing.popular')}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    {plan.price === "0" ? (
                      <span className="text-4xl font-display font-bold text-gradient-primary">{language === 'en' ? 'Free' : 'Gratis'}</span>
                    ) : (
                      <>
                        <span className="text-4xl font-display font-bold">{plan.price}€</span>
                        <span className="text-muted-foreground text-sm">{plan.priceNote}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-primary mt-1">{language === 'en' ? 'Trial' : 'Prueba'} {plan.duration}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.price === "0" ? "/auditoria" : "/contacto"}>
                  <Button className={`w-full ${plan.featured ? "btn-neon" : "btn-outline-neon"}`}>
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Web Add-on */}
          <div className="max-w-2xl mx-auto mt-12">
            <div className="card-premium text-center p-6 border border-primary/30">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-primary" />
                <h4 className="font-display font-bold text-lg">{t('pricing.webAddon')}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'Add a professional website with SEO, CRM integration, and analytics. Compatible with all plans.'
                  : 'Añade una web profesional con SEO, integración CRM y analítica. Compatible con todos los planes.'}
              </p>
              <Link to="/servicios#web-creation">
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Learn more' : 'Saber más'}
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Talk to human */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{language === 'en' ? 'Need something more personalized?' : '¿Necesitas algo más personalizado?'}</p>
            <Link to="/contacto">
              <Button variant="outline" className="border-border hover:border-primary">
                <Phone className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Talk to a human' : 'Hablar con un humano'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              {t('faq.title').split(' ')[0]} <span className="text-gradient-primary">{t('faq.title').split(' ').slice(1).join(' ')}</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card-premium">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === 'en' ? 'Still have doubts?' : '¿Aún tienes dudas?'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === 'en' ? 'Take our free audit and we\'ll tell you which plan you need.' : 'Haz nuestra auditoría gratuita y te diremos qué plan necesitas.'}
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t('nav.audit')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Precios;
