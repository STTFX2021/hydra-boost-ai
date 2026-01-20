import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Zap, Star, Phone, Crown, Settings } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

const Precios = () => {
  const { t, language } = useTranslation();
  const [viewMode, setViewMode] = useState<'packs' | 'individuals'>('packs');

  return (
    <>
      <SEOHead
        title="Precios y Planes de Automatización IA | HydrAI Labs"
        description="Packs de automatización desde 199€/mes. Starter, Pro y Autonomous. Chatbots, reservas, leads y más. Pago anual = 2 meses gratis. Sin permanencia."
        canonical="/precios"
        keywords="precios chatbot, coste automatizacion, planes ia negocios, precio chatbot whatsapp"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Precios", url: "/precios" }
      ]} />
      <PreciosContent />
    </>
  );
};

const PreciosContent = () => {
  const { t, language } = useTranslation();
  const [viewMode, setViewMode] = useState<'packs' | 'individuals'>('packs');

  const packs = [
    {
      id: "starter",
      name: "Starter",
      price: "199",
      priceAnnual: "1.990",
      badge: null,
      description: language === 'es' 
        ? "Core + Leads básico + Bookings + Analytics básico"
        : "Core + Basic Leads + Bookings + Basic Analytics",
      features: language === 'es' 
        ? ["Opportunity Engine básico", "Lead Engine (hasta 100/mes)", "Bookings Management", "Analytics semanal", "Soporte email"]
        : ["Basic Opportunity Engine", "Lead Engine (up to 100/mo)", "Bookings Management", "Weekly Analytics", "Email support"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "499",
      priceAnnual: "4.990",
      badge: language === 'es' ? "Más popular" : "Most popular",
      description: language === 'es' 
        ? "Starter + Radar + Sales Factory + Nutrición + 1 Agent"
        : "Starter + Radar + Sales Factory + Nurturing + 1 Agent",
      features: language === 'es' 
        ? ["Todo de Starter +", "Radar de Tendencias", "Sales Message Factory", "Nutrición Automática", "1 Agente (CEO o CTO)", "Soporte prioritario"]
        : ["Everything in Starter +", "Trends Radar", "Sales Message Factory", "Automatic Nurturing", "1 Agent (CEO or CTO)", "Priority support"],
    },
    {
      id: "autonomous",
      name: "Autonomous",
      price: "999",
      priceAnnual: "9.990",
      badge: "Premium",
      description: language === 'es' 
        ? "Pro + Ops 24/7 + Predictive + 3 Agents + soporte dedicado"
        : "Pro + 24/7 Ops + Predictive + 3 Agents + dedicated support",
      features: language === 'es' 
        ? ["Todo de Pro +", "Operaciones 24/7", "Rutinas Predictivas", "3 Agentes especializados", "Dynamic Workflow Creator", "Soporte dedicado"]
        : ["Everything in Pro +", "24/7 Operations", "Predictive Routines", "3 Specialized Agents", "Dynamic Workflow Creator", "Dedicated support"],
    },
  ];

  const individuals = [
    { name: "Opportunity Engine", price: "97", from: true },
    { name: "Lead Engine", price: "147", from: true },
    { name: "Bookings Management", price: "97", from: true },
    { name: "Analytics & Insights", price: "127", from: true },
    { name: "Nutrición Automática", price: "147", from: true },
    { name: "Sales Message Factory", price: "197", from: true },
    { name: "Radar de Tendencias", price: "97", from: true },
    { name: "Operaciones 24/7", price: "297", from: true },
    { name: "Predictive Ops", price: "197", from: true },
    { name: "Agente por Rol", price: "197", from: true },
    { name: "Dynamic Creator", price: "497", from: false },
  ];

  const maintenancePacks = [
    { name: language === 'es' ? "Básico" : "Basic", price: "49", desc: language === 'es' ? "Soporte email, ajustes menores" : "Email support, minor tweaks" },
    { name: "Standard", price: "99", desc: language === 'es' ? "Soporte prioritario, optimización mensual" : "Priority support, monthly optimization" },
    { name: "Premium", price: "149", desc: language === 'es' ? "Soporte dedicado, updates de modelos, ajustes ilimitados" : "Dedicated support, model updates, unlimited tweaks" },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 left-1/2 -translate-x-1/2" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {language === 'es' ? 'Precios transparentes' : 'Transparent pricing'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {language === 'es' ? 'Elige tu nivel de automatización' : 'Choose your automation level'}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {language === 'es' 
                ? 'Packs con descuento o automatizaciones individuales. Pago anual = 2 meses gratis.'
                : 'Discounted packs or individual automations. Annual payment = 2 months free.'}
            </p>

            {/* Toggle */}
            <div className="inline-flex rounded-full p-1 bg-muted/30 border border-border">
              <button
                onClick={() => setViewMode('packs')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'packs' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {language === 'es' ? 'Paquetes' : 'Packages'}
              </button>
              <button
                onClick={() => setViewMode('individuals')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'individuals' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {language === 'es' ? 'Individuales' : 'Individual'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packs View */}
      {viewMode === 'packs' && (
        <section className="section-padding -mt-8">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packs.map((pack) => (
                <div
                  key={pack.id}
                  className={`relative card-premium flex flex-col ${
                    pack.badge === (language === 'es' ? 'Más popular' : 'Most popular') ? 'border-primary neon-border' : pack.badge === 'Premium' ? 'border-accent' : ''
                  }`}
                >
                  {pack.badge && (
                    <div className="absolute top-0 right-4 -translate-y-1/2">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        pack.badge === 'Premium' ? 'bg-accent text-accent-foreground' : 'badge-primary'
                      }`}>
                        {pack.badge === 'Premium' ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                        {pack.badge}
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
                      <span className="text-muted-foreground text-sm">/{language === 'es' ? 'mes' : 'mo'}</span>
                    </div>
                    <p className="text-xs text-success mt-1">
                      {language === 'es' ? `Anual: ${pack.priceAnnual}€ (2 meses gratis)` : `Annual: €${pack.priceAnnual} (2 months free)`}
                    </p>
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
                    <Button className={`w-full ${pack.badge ? 'btn-neon' : 'btn-outline-neon'}`}>
                      {language === 'es' ? 'Solicitar' : 'Request'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Individuals View */}
      {viewMode === 'individuals' && (
        <section className="section-padding -mt-8">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {individuals.map((item, i) => (
                  <div key={i} className="card-premium flex items-center justify-between">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-primary font-bold">
                      {item.from && <span className="text-xs text-muted-foreground mr-1">{language === 'es' ? 'desde' : 'from'}</span>}
                      {item.price}€<span className="text-xs text-muted-foreground">/{language === 'es' ? 'mes' : 'mo'}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Evolution & Maintenance Pack */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="badge-secondary mb-4 inline-flex">
                <Settings className="w-3 h-3 mr-1" /> {language === 'es' ? 'Mantenimiento' : 'Maintenance'}
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                {language === 'es' ? 'Evolution & Maintenance Pack' : 'Evolution & Maintenance Pack'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'es' 
                  ? 'Updates de modelos IA, soporte técnico y ajustes mensuales.'
                  : 'AI model updates, technical support and monthly tweaks.'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {maintenancePacks.map((mp, i) => (
                <div key={i} className="card-premium text-center">
                  <h4 className="font-display font-bold mb-1">{mp.name}</h4>
                  <div className="text-2xl font-bold text-primary mb-2">{mp.price}€<span className="text-sm text-muted-foreground">/{language === 'es' ? 'mes' : 'mo'}</span></div>
                  <p className="text-xs text-muted-foreground">{mp.desc}</p>
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
              {language === 'es' ? '¿Necesitas algo personalizado?' : 'Need something custom?'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === 'es' ? 'Haz nuestra auditoría gratuita y te recomendamos el mejor plan.' : 'Take our free audit and we recommend the best plan.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8">
                  {language === 'es' ? 'Auditoría Gratis' : 'Free Audit'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon">
                  <Phone className="w-4 h-4 mr-2" />
                  {language === 'es' ? 'Hablar con humano' : 'Talk to a human'}
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
