import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Gauge, PhoneCall, ShoppingBag } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

const products = [
  {
    title: "Vozra Reserve",
    description: "Atención telefónica, consultas, solicitudes de reserva, cambios y cancelaciones con reglas operativas configurables.",
    icon: CalendarCheck,
    to: "/vozra/reserve",
  },
  {
    title: "Vozra Rapid",
    description: "Pedidos telefónicos estructurados para recogida o entrega, con carta, modificadores, confirmación y envío al negocio.",
    icon: ShoppingBag,
    to: "/vozra/rapid",
  },
  {
    title: "Vozra Control Center",
    description: "Configuración, supervisión, clientes, horarios, políticas, pedidos, reservas y trazabilidad desde un único panel.",
    icon: Gauge,
    to: "/contacto?motivo=control-center",
  },
];

export default function Vozra() {
  return (
    <>
      <SEOHead
        title="Vozra | Inteligencia conversacional para hostelería | HydrAI Labs"
        description="Vozra conecta llamadas, reservas, pedidos, clientes y reglas operativas para restaurantes y negocios de hostelería."
        canonical="/vozra"
        keywords="vozra, inteligencia conversacional hostelería, agente voz restaurantes, reservas ia, pedidos telefónicos ia"
      />
      <BreadcrumbSchema items={[{ name: "Inicio", url: "/" }, { name: "Vozra", url: "/vozra" }]} />

      <PageLayout>
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid opacity-[0.03]" />
          <div className="section-container relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="badge-primary mb-6 inline-flex">Plataforma propia de HydrAI Labs</span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                Conversaciones conectadas con la <span className="text-gradient-hydrai">operación real</span> de tu negocio.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Vozra atiende, estructura la información, aplica las reglas del negocio y deriva a una persona cuando la situación lo exige.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto?motivo=demo-vozra">
                  <Button size="lg" className="btn-neon px-8">
                    Solicitar una demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/vozra/rapid">
                  <Button size="lg" variant="outline" className="btn-outline-neon px-8">
                    Probar Vozra Rapid
                  </Button>
                </Link>
              </div>
            </div>

            <div className="card-premium p-8">
              <div className="flex items-center gap-4 mb-6">
                <img src="/brand/vozra/vozra-app-icon.svg" alt="Vozra" className="h-20 w-20 object-contain" />
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">Vozra</p>
                  <h2 className="text-2xl font-display font-bold">Inteligencia conversacional para negocios</h2>
                </div>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3"><PhoneCall className="h-5 w-5 text-primary shrink-0" /> Atiende llamadas y conserva el contexto.</div>
                <div className="flex gap-3"><Gauge className="h-5 w-5 text-primary shrink-0" /> Aplica políticas, validaciones y escalado humano.</div>
                <div className="flex gap-3"><CalendarCheck className="h-5 w-5 text-primary shrink-0" /> Conecta la conversación con reservas, pedidos y sistemas.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/10">
          <div className="section-container">
            <div className="max-w-3xl mb-12">
              <span className="badge-secondary mb-4 inline-flex">Una plataforma. Varios módulos.</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Soluciones especializadas sobre un núcleo común.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {products.map(({ title, description, icon: Icon, to }) => (
                <Link key={title} to={to} className="card-premium group p-7 hover:border-primary/40 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">Ver solución <ArrowRight className="ml-2 h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
