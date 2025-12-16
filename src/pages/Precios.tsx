import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Zap, Star, Phone, Gift } from "lucide-react";

const Precios = () => {
  const packs = [
    {
      id: "web-presencia",
      name: "Web Presencia IA-Ready",
      description: "Tu web profesional lista para conectar chatbots y automatizaciones",
      price: "497",
      priceType: "pago único",
      features: [
        "Web corporativa 1–3 páginas",
        "Diseño responsive y moderno",
        "Formulario de contacto / WhatsApp",
        "SEO local básico",
        "Preparada para chatbot futuro",
      ],
      cta: "Solicitar",
      featured: false,
    },
    {
      id: "web-chatbot",
      name: "Web + Chatbot 24/7",
      description: "Tu web + asistente virtual que responde, captura leads y guía clientes",
      price: "790",
      priceType: "pago único",
      features: [
        "Todo lo de Web Presencia +",
        "Chatbot IA 24/7 entrenado",
        "Widget en web + WhatsApp ready",
        "Captura automática de leads",
        "Dashboard de conversaciones",
        "Soporte 30 días incluido",
      ],
      cta: "Solicitar",
      featured: true,
    },
    {
      id: "automatiza-agenda",
      name: "Automatiza tu Agenda",
      description: "Sistema completo de reservas, recordatorios y solicitud de reseñas",
      price: "1.290",
      priceType: "pago único",
      features: [
        "Todo lo de Web + Chatbot +",
        "Sistema de reservas online",
        "Recordatorios automáticos (WhatsApp/Email)",
        "Mensajes anti no-show",
        "Solicitud de reseñas post-servicio",
        "Integración Google Calendar",
        "Dashboard de métricas",
      ],
      cta: "Solicitar",
      featured: false,
    },
  ];

  const monthlyPlans = [
    {
      id: "mantenimiento",
      name: "Plan Mantenimiento",
      price: "49",
      description: "Cambios menores, soporte técnico y revisión mensual de automatizaciones.",
    },
    {
      id: "crecimiento",
      name: "Plan Crecimiento",
      price: "99",
      description: "Todo lo de Mantenimiento + optimización de chatbot, mejoras de conversión e informes detallados.",
    },
  ];

  const faqs = [
    {
      q: "¿Qué incluye el precio?",
      a: "Todo lo listado en cada pack. Sin costes ocultos. Hosting y dominio no incluidos (te asesoramos para elegir el mejor).",
    },
    {
      q: "¿Cuánto tarda la entrega?",
      a: "Web Presencia: 5-7 días. Web + Chatbot: 7-10 días. Automatiza tu Agenda: 10-14 días. Depende de tu rapidez enviando contenido.",
    },
    {
      q: "¿Puedo actualizar mi pack más adelante?",
      a: "Sí, puedes empezar con Web Presencia y añadir chatbot o automatizaciones cuando quieras. Solo pagas la diferencia.",
    },
    {
      q: "¿Qué pasa después de la entrega?",
      a: "Tienes 30 días de soporte incluido. Después puedes contratar un plan mensual o pedir ajustes puntuales.",
    },
    {
      q: "¿Ofrecéis descuentos?",
      a: "Sí, tenemos ofertas puntuales y descuentos por pago anual en los planes mensuales. Pregúntanos.",
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
              <Zap className="w-3 h-3 mr-1" /> Precios transparentes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-primary">Packs</span> claros, sin letra pequeña
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Elige el pack que mejor se adapte a tu negocio. Precios fijos, entrega rápida.
            </p>
          </div>
        </div>
      </section>

      {/* Christmas Ribbon */}
      <div className="section-container -mt-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/30">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">🎄 Oferta Navidad: hasta -20% en packs Web + Chatbot y Automatiza tu Agenda</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="section-padding -mt-8">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`${
                  pack.featured ? "pricing-card-featured" : "pricing-card"
                } flex flex-col`}
              >
                {pack.featured && (
                  <div className="absolute top-0 right-4 -translate-y-1/2">
                    <span className="badge-primary flex items-center gap-1">
                      <Star className="w-3 h-3" /> Más popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">{pack.price}€</span>
                    <span className="text-muted-foreground text-sm">+ IVA</span>
                  </div>
                  <p className="text-sm text-primary mt-1">{pack.priceType}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contacto">
                  <Button className={`w-full ${pack.featured ? "btn-neon" : "btn-outline-neon"}`}>
                    {pack.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Monthly Plans */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl font-display font-bold text-center mb-8">
              Planes <span className="text-gradient-secondary">mensuales</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {monthlyPlans.map((plan) => (
                <div key={plan.id} className="card-premium">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h4 className="font-display font-bold text-lg">{plan.name}</h4>
                    <span className="text-2xl font-bold text-primary">{plan.price}€</span>
                    <span className="text-sm text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              ))}
            </div>
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
              Haz nuestra auditoría gratuita y te diremos qué pack necesitas.
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
