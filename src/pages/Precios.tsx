import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Zap, Star, Phone } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Prueba el poder de la IA en tu negocio",
    duration: "7 días",
    price: "0",
    priceNote: "Sin compromiso",
    features: [
      "1 canal (WhatsApp, IG o FB)",
      "Bot de respuesta automática",
      "Hasta 100 conversaciones",
      "Dashboard básico",
      "Soporte por email",
    ],
    cta: "Empezar gratis",
    featured: false,
  },
  {
    id: "growth",
    name: "Growth",
    description: "Para negocios que quieren crecer",
    duration: "14 días",
    price: "297",
    priceNote: "/mes después",
    features: [
      "3 canales incluidos",
      "AI Recepcionista 24/7",
      "Sistema de reservas",
      "Recordatorios automáticos",
      "Solicitud de reseñas",
      "Dashboard completo",
      "Soporte prioritario",
      "Integraciones básicas",
    ],
    cta: "Empezar prueba",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Automatización completa",
    duration: "30 días",
    price: "597",
    priceNote: "/mes después",
    features: [
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
    cta: "Empezar prueba",
    featured: false,
  },
];

const faqs = [
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

const Precios = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 left-1/2 -translate-x-1/2" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Precios Transparentes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-primary">Precios</span> sin letra pequeña
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Elige el plan que mejor se adapte a tu negocio. Todos incluyen período de prueba.
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
                      <Star className="w-3 h-3" /> Más popular
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
                      <span className="text-4xl font-display font-bold text-gradient-primary">Gratis</span>
                    ) : (
                      <>
                        <span className="text-4xl font-display font-bold">{plan.price}€</span>
                        <span className="text-muted-foreground text-sm">{plan.priceNote}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-primary mt-1">Prueba {plan.duration}</p>
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

          {/* Talk to human */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">¿Necesitas algo más personalizado?</p>
            <Link to="/contacto">
              <Button variant="outline" className="border-border hover:border-primary">
                <Phone className="w-4 h-4 mr-2" />
                Hablar con un humano
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
              Preguntas <span className="text-gradient-primary">frecuentes</span>
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
              ¿Aún tienes dudas?
            </h2>
            <p className="text-muted-foreground mb-8">
              Haz nuestra auditoría gratuita y te diremos qué plan necesitas.
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría AI gratis
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
