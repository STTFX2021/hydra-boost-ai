import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, ServiceSchema, FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, Smartphone, QrCode, CheckCircle2, ArrowRight, 
  Zap, Clock, CreditCard, ChefHat
} from "lucide-react";

const faqs = [
  {
    question: "¿Cómo funciona el sistema de pedidos online?",
    answer: "El cliente escanea un QR en la mesa o accede desde tu web, ve el menú digital, hace el pedido y paga online. El pedido llega a cocina al instante."
  },
  {
    question: "¿Necesito cambiar mi TPV actual?",
    answer: "No necesariamente. Podemos integrarnos con tu sistema actual o proporcionar una solución independiente que sincroniza los pedidos."
  },
  {
    question: "¿Puedo modificar el menú yo mismo?",
    answer: "Sí, tienes un panel de administración donde puedes cambiar precios, añadir platos, marcar productos agotados y gestionar promociones."
  },
  {
    question: "¿Funciona para delivery y take-away?",
    answer: "Sí, el sistema soporta pedidos en mesa, para llevar y delivery. Cada canal tiene su flujo optimizado."
  },
  {
    question: "¿Cuánto se tarda en implementar?",
    answer: "Entre 10 y 15 días laborables, incluyendo la digitalización del menú, configuración del sistema y formación a tu equipo."
  }
];

const PedidosRestaurantes = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Pedidos Online para Restaurantes - QR, Menú Digital y Pagos"
        description="Sistema de pedidos online para restaurantes: menú digital con QR, comandas a cocina en tiempo real y pago desde mesa. Aumenta ticket medio un 20%. Desde 990€."
        canonical="/servicios/pedidos-online-restaurantes"
        keywords="pedidos online restaurante, menu digital qr, sistema pedidos restaurante, carta digital restaurante, comandas digitales"
      />
      <ServiceSchema
        name="Sistema de Pedidos Online para Restaurantes"
        description="Menú digital con QR, pedidos a cocina en tiempo real, pagos desde mesa y gestión centralizada para restaurantes."
        url="/servicios/pedidos-online-restaurantes"
        price="990"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Servicios', url: '/servicios' },
        { name: 'Pedidos Online Restaurantes', url: '/servicios/pedidos-online-restaurantes' }
      ]} />

      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Restaurantes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Pedidos online que <span className="text-gradient-primary">aumentan tu ticket</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Menú digital con QR, comandas directas a cocina, pagos desde mesa. 
              Menos camareros, más rotación, clientes más satisfechos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auditoria?vertical=restaurante">
                <Button size="lg" className="btn-neon text-lg px-8">
                  Auditoría para restaurantes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">
                  Ver demostración
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Por qué digitalizar los <span className="text-gradient-secondary">pedidos</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: QrCode, title: "Menú QR", desc: "Sin imprimir cartas. Actualiza precios y platos al instante" },
              { icon: Clock, title: "Menos esperas", desc: "El pedido llega a cocina en segundos, sin intermediarios" },
              { icon: CreditCard, title: "Pago en mesa", desc: "El cliente paga cuando quiere, sin esperar al camarero" },
              { icon: ChefHat, title: "Sugerencias IA", desc: "Recomienda platos según preferencias y aumenta ventas" },
            ].map((item, i) => (
              <div key={i} className="card-premium">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Sistema completo de <span className="text-gradient-primary">pedidos digitales</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Menú digital accesible por QR",
                  "Fotos profesionales de cada plato (opcional)",
                  "Categorías, alérgenos y descripciones",
                  "Sistema de comandas a cocina en tiempo real",
                  "Pago integrado (tarjeta, Bizum, etc.)",
                  "Panel de administración para cambios",
                  "Gestión de mesas y turnos",
                  "Informes de ventas y productos estrella",
                  "Integración con TPV (opcional)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <span className="badge-primary text-lg font-semibold">Desde 990 € + IVA</span>
              </div>
            </div>
            <div className="card-premium neon-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-8 h-8 text-primary" />
                <span className="font-display font-bold text-xl">Vista del cliente</span>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-semibold">🍕 Entrantes</span>
                  <span className="text-xs text-muted-foreground">4 platos</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">🥗</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Ensalada César</p>
                    <p className="text-xs text-muted-foreground">Lechuga, pollo, parmesano...</p>
                    <p className="text-primary font-bold mt-1">9,50 €</p>
                  </div>
                  <Button size="sm" className="btn-neon">+</Button>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">🍤</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Gambas al ajillo</p>
                    <p className="text-xs text-muted-foreground">Gambas, ajo, guindilla...</p>
                    <p className="text-primary font-bold mt-1">12,00 €</p>
                  </div>
                  <Button size="sm" className="btn-neon">+</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "+20%", label: "Ticket medio con sugerencias" },
              { value: "-50%", label: "Tiempo de espera del cliente" },
              { value: "+30%", label: "Rotación de mesas" },
            ].map((stat, i) => (
              <div key={i} className="card-premium">
                <div className="stat-value text-3xl md:text-4xl mb-2">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Preguntas <span className="text-gradient-primary">frecuentes</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card-premium">
                  <h3 className="font-display font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container relative z-10">
          <div className="card-premium text-center p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Listo para digitalizar tu restaurante?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Descubre qué solución encaja mejor con tu negocio.
            </p>
            <Link to="/auditoria?vertical=restaurante">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría gratis para restaurantes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PedidosRestaurantes;
