import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Headphones, PhoneCall, ShoppingBag } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { SARAH_DEMO_URL, VOZRA_RAPID_DEMO_URL, isExternalUrl } from "@/lib/productLinks";

const features = [
  "Toma pedidos por teléfono sin interrumpir al equipo",
  "Comprende productos, tamaños, extras y modificaciones",
  "Distingue recogida y entrega a domicilio",
  "Confirma los datos antes de cerrar el pedido",
  "Entrega el pedido estructurado al negocio",
  "Escala a una persona cuando no puede resolver con seguridad",
];

const DemoButton = ({ href, label, secondary = false }: { href: string; label: string; secondary?: boolean }) => {
  const button = (
    <Button size="lg" variant={secondary ? "outline" : "default"} className={secondary ? "btn-outline-neon px-8" : "btn-neon px-8"}>
      <PhoneCall className="mr-2 h-5 w-5" /> {label}
    </Button>
  );

  if (isExternalUrl(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{button}</a>;
  }

  return <Link to={href}>{button}</Link>;
};

export default function VozraRapid() {
  return (
    <>
      <SEOHead
        title="Vozra Rapid | Pedidos telefónicos inteligentes | HydrAI Labs"
        description="Vozra Rapid atiende llamadas, estructura pedidos y los entrega al negocio para recogida o entrega a domicilio."
        canonical="/vozra/rapid"
        keywords="vozra rapid, pedidos telefónicos ia, agente voz pizzerías, pedidos inteligentes directos"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Vozra", url: "/vozra" },
        { name: "Vozra Rapid", url: "/vozra/rapid" },
      ]} />

      <PageLayout>
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="section-container grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="badge-primary mb-6 inline-flex">Pedidos inteligentes directos</span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                Cada llamada convertida en un <span className="text-gradient-hydrai">pedido claro y accionable</span>.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Vozra Rapid atiende al cliente, interpreta la carta, confirma los datos y envía el pedido al canal operativo definido por el negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoButton href={VOZRA_RAPID_DEMO_URL} label="Probar Vozra Rapid" />
                <DemoButton href={SARAH_DEMO_URL} label="Hablar con Sarah" secondary />
              </div>
            </div>

            <div className="card-premium p-8 text-center">
              <img src="/brand/vozra/vozra-app-icon.svg" alt="Vozra Rapid" className="mx-auto h-32 w-32 object-contain mb-5" />
              <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground">Vozra</p>
              <h2 className="text-3xl font-display font-bold mt-2">Rapid</h2>
              <p className="text-primary mt-2">Pedidos inteligentes directos</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/10">
          <div className="section-container grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="badge-secondary mb-4 inline-flex">Flujo operacional</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">No es un contestador. Es un proceso completo.</h2>
              <p className="text-muted-foreground">La solución se configura con la carta, precios, reglas y canales reales de cada establecimiento.</p>
            </div>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="card-premium flex items-start gap-3 p-4">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="card-premium p-8 md:p-12 grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center"><Headphones className="h-7 w-7 text-primary" /></div>
              <div>
                <h2 className="text-2xl font-display font-bold">¿Quieres probar el flujo con tu propia carta?</h2>
                <p className="text-muted-foreground mt-2">Preparamos una demostración ajustada a tu tipo de negocio y forma de recibir pedidos.</p>
              </div>
              <Link to="/contacto?motivo=implantacion-vozra-rapid">
                <Button className="btn-neon">Solicitar implantación <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
