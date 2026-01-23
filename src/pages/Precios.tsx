import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import {
  PricingCard,
  EliteSection,
  VideoDemo,
  IndividualsGrid,
  MaintenancePacks,
  ComparisonTable,
} from "@/components/pricing";

const Precios = () => {
  return (
    <>
      <SEOHead
        title="Precios y Planes de Automatización IA | HydrAI Labs"
        description="Packs de automatización desde 199€/mes. Starter, Pro y Autonomous. Chatbots, reservas, leads y más. Pago anual = 2 meses gratis. Sin permanencia."
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
  const [viewMode, setViewMode] = useState<'packs' | 'individuals'>('packs');

  const packs = [
    {
      id: "starter",
      name: "Starter",
      price: "199",
      priceAnnual: "1.990",
      badge: null,
      idealFor:
        language === 'es'
          ? "Empezar a captar clientes sin perder mensajes ni oportunidades"
          : "Start capturing clients without losing messages or opportunities",
      features:
        language === 'es'
          ? [
              "Captura de leads desde web, formulario o chat",
              "Notificación instantánea al equipo (Discord/Slack/email)",
              "Gestión de reservas y solicitudes",
              "Resumen semanal de actividad",
              "Soporte por email",
            ]
          : [
              "Lead capture from web, form or chat",
              "Instant team notification (Discord/Slack/email)",
              "Booking and request management",
              "Weekly activity summary",
              "Email support",
            ],
      steps:
        language === 'es'
          ? [
              "Un cliente te escribe o deja sus datos",
              "Te llega al instante, todo organizado",
              "Tienes control y seguimiento básico",
            ]
          : [
              "A client writes or leaves their data",
              "You receive it instantly, all organized",
              "You have control and basic tracking",
            ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "499",
      priceAnnual: "4.990",
      badge: language === 'es' ? "Más popular" : "Most popular",
      idealFor:
        language === 'es'
          ? "Aumentar conversiones con seguimiento automático"
          : "Increase conversions with automatic follow-up",
      features:
        language === 'es'
          ? [
              "Todo lo de Starter",
              "Seguimiento automático: recordatorios + mensajes",
              "Radar de oportunidades: tendencias y acciones",
              "Mensajes de venta listos para usar",
              "Nutrición de leads (no se enfrían)",
              "1 agente asistente (ventas u operaciones)",
              "Soporte prioritario",
            ]
          : [
              "Everything in Starter",
              "Automatic follow-up: reminders + messages",
              "Opportunity radar: trends and actions",
              "Ready-to-use sales messages",
              "Lead nurturing (they don't go cold)",
              "1 assistant agent (sales or operations)",
              "Priority support",
            ],
      steps:
        language === 'es'
          ? [
              "Entran leads cada día",
              "El sistema hace seguimiento y prioriza",
              "Tú cierras más con menos esfuerzo",
            ]
          : [
              "Leads come in every day",
              "The system follows up and prioritizes",
              "You close more with less effort",
            ],
    },
    {
      id: "autonomous",
      name: "Autonomous",
      price: "999",
      priceAnnual: "9.990",
      badge: "Premium",
      idealFor:
        language === 'es'
          ? "Operación semi-autónoma + control 24/7"
          : "Semi-autonomous operation + 24/7 control",
      features:
        language === 'es'
          ? [
              "Todo lo de Pro",
              "Monitorización 24/7: alertas si algo falla",
              "Rutinas predictivas: detección de bloqueos",
              "3 agentes especializados (ventas, operaciones, soporte)",
              "Automatizaciones profundas de procesos internos",
              "Canal de soporte dedicado",
            ]
          : [
              "Everything in Pro",
              "24/7 monitoring: alerts if something fails",
              "Predictive routines: bottleneck detection",
              "3 specialized agents (sales, operations, support)",
              "Deep automation of internal processes",
              "Dedicated support channel",
            ],
      steps:
        language === 'es'
          ? [
              "Automatizamos procesos clave",
              "Vigilamos el sistema 24/7",
              "Reducimos errores y te ahorramos horas",
            ]
          : [
              "We automate key processes",
              "We monitor the system 24/7",
              "We reduce errors and save you hours",
            ],
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
              <Zap className="w-3 h-3 mr-1" />{" "}
              {language === 'es' ? 'Precios transparentes' : 'Transparent pricing'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {language === 'es'
                ? 'Elige tu nivel de automatización'
                : 'Choose your automation level'}
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
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  viewMode === 'packs'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {language === 'es' ? 'Paquetes' : 'Packages'}
              </button>
              <button
                onClick={() => setViewMode('individuals')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  viewMode === 'individuals'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {language === 'es' ? 'Individuales' : 'Individual'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <VideoDemo language={language} />

      {/* Packs View */}
      {viewMode === 'packs' && (
        <section className="section-padding -mt-8">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packs.map((pack, index) => (
                <PricingCard
                  key={pack.id}
                  id={pack.id}
                  name={pack.name}
                  price={pack.price}
                  priceAnnual={pack.priceAnnual}
                  badge={pack.badge}
                  idealFor={pack.idealFor}
                  features={pack.features}
                  steps={pack.steps}
                  language={language}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Individuals View */}
      {viewMode === 'individuals' && <IndividualsGrid language={language} />}

      {/* Comparison Table */}
      {viewMode === 'packs' && <ComparisonTable language={language} />}

      {/* Elite Section */}
      <EliteSection language={language} />

      {/* Maintenance Packs */}
      <MaintenancePacks language={language} />

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {language === 'es' ? '¿Necesitas algo personalizado?' : 'Need something custom?'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === 'es'
                ? 'Haz nuestra auditoría gratuita y te recomendamos el mejor plan.'
                : 'Take our free audit and we recommend the best plan.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon text-lg px-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  {language === 'es' ? 'Auditoría Gratis' : 'Free Audit'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
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
