import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Phone, CheckCircle2, Star, Crown, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { motion } from "framer-motion";

const Precios = () => {
  return (
    <>
      <SEOHead
        title="Precios y Planes de Automatización IA | HydrAI Labs"
        description="Planes de automatización IA desde 497€/mes. Base, Growth y Enterprise. Chatbots, workflows, agentes IA y más."
        canonical="/precios"
        keywords="precios chatbot, coste automatizacion, planes ia negocios, precio chatbot whatsapp"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Precios", url: "/precios" },
        ]}
      />
      <PreciosContent />
    </>
  );
};

const PreciosContent = () => {
  const { language } = useTranslation();

  const plans = [
    {
      id: "base",
      name: "Base",
      price: "497",
      badge: null,
      features: [
        "Chatbot IA en tu web (atención 24/7)",
        "3 workflows automatizados",
        "Integración WhatsApp Business",
        "Dashboard de métricas básico",
        "Soporte por email 48h",
        "Setup completo en 7 días",
      ],
      cta: "Empezar con Base",
    },
    {
      id: "growth",
      name: "Growth",
      price: "997",
      badge: "Más popular",
      features: [
        "Todo lo del plan Base",
        "10 workflows automatizados",
        "Agente IA especializado en tu nicho",
        "Integración CRM + email marketing",
        "Soporte prioritario 24h",
        "Reporting semanal con recomendaciones",
        "Optimización continua del sistema",
      ],
      cta: "Empezar con Growth",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "A medida",
      badge: "Premium",
      features: [
        "Arquitectura Event Bus completa",
        "Workflows y agentes ilimitados",
        "Agentes CEO/CFO/CTO especializados",
        "Integraciones a medida (ERP, POS, etc.)",
        "SLA garantizado + soporte dedicado",
        "Onboarding presencial en España",
      ],
      cta: "Solicitar Propuesta",
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <Zap className="w-3 h-3" /> Precios transparentes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground">
              Elige tu nivel de automatización
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Planes flexibles que crecen con tu negocio. Sin permanencia.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding -mt-8">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const isPopular = plan.badge === "Más popular";
              const isPremium = plan.badge === "Premium";
              const isEnterprise = plan.id === "enterprise";

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl bg-card border p-6 flex flex-col transition-all duration-300 overflow-visible ${
                    isPopular
                      ? "border-primary shadow-neon-md"
                      : isPremium
                      ? "border-secondary/30"
                      : "border-border"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg ${
                          isPremium
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {isPremium ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-4 pt-2">
                    <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
                  </div>

                  <div className="mb-5">
                    {isEnterprise ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-bold text-foreground">A medida</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-display font-bold text-foreground">{plan.price}€</span>
                        <span className="text-muted-foreground text-sm">/mes</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex-1">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contacto">
                    <Button
                      className={`w-full ${
                        isPopular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : isPremium
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          : "border-2 border-primary bg-transparent text-primary hover:bg-primary/10"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="rounded-2xl bg-card border border-border text-center p-12 max-w-2xl mx-auto shadow-card">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              ¿Necesitas algo personalizado?
            </h2>
            <p className="text-muted-foreground mb-8">
              Haz nuestra auditoría gratuita y te recomendamos el mejor plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auditoria">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                  Auditoría Gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10">
                  <Phone className="w-4 h-4 mr-2" />
                  Hablar con humano
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Precios;
