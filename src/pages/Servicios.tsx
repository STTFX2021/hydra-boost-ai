import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Bot, Calendar, Star, Users, MessageSquare, TrendingUp, 
  ArrowRight, CheckCircle2, Clock, Zap, Shield
} from "lucide-react";

const services = [
  {
    id: "ai-receptionist",
    icon: Bot,
    title: "AI Recepcionista 24/7",
    subtitle: "WhatsApp, Instagram y Facebook",
    description: "Un asistente de IA que responde mensajes de tus clientes en segundos, las 24 horas del día, los 7 días de la semana.",
    features: [
      "Respuesta instantánea en WhatsApp, IG y FB",
      "Preguntas frecuentes automatizadas",
      "Cualificación de leads automática",
      "Derivación inteligente a humanos",
      "Multiidioma (ES, EN, más)",
    ],
    deliverables: ["Bot configurado y entrenado", "Dashboard de métricas", "Soporte continuo"],
    time: "48-72h",
    kpis: ["Tiempo de respuesta < 30s", "-70% mensajes sin responder", "+40% conversión de leads"],
  },
  {
    id: "reservations",
    icon: Calendar,
    title: "Reservas + Anti No-Show",
    subtitle: "Sistema de citas inteligente",
    description: "Sistema de reservas automatizado con recordatorios y confirmaciones que reducen los no-shows hasta un 80%.",
    features: [
      "Calendario online sincronizado",
      "Recordatorios automáticos (WhatsApp/SMS)",
      "Confirmación con un clic",
      "Gestión de lista de espera",
      "Reagendamiento automático",
    ],
    deliverables: ["Sistema de reservas activo", "Integración con tu calendario", "Flujos de recordatorio"],
    time: "24-48h",
    kpis: ["-80% no-shows", "+25% ocupación", "Menos llamadas manuales"],
  },
  {
    id: "reputation",
    icon: Star,
    title: "Reputación Autopilot",
    subtitle: "Más reseñas 5 estrellas",
    description: "Automatiza la solicitud de reseñas en el momento perfecto y responde a todas las reseñas de forma inteligente.",
    features: [
      "Solicitud automática post-servicio",
      "Filtro de satisfacción previo",
      "Respuesta automática a reseñas",
      "Monitorización multi-plataforma",
      "Alertas de reseñas negativas",
    ],
    deliverables: ["Flujos de solicitud activos", "Plantillas de respuesta", "Dashboard de reputación"],
    time: "24h",
    kpis: ["+300% nuevas reseñas/mes", "4.8+ rating promedio", "100% reseñas respondidas"],
  },
  {
    id: "lead-capture",
    icon: Users,
    title: "Lead Capture Sin Web",
    subtitle: "Captura desde redes sociales",
    description: "Captura leads directamente desde Instagram, Facebook y WhatsApp sin necesidad de tener una web.",
    features: [
      "Formularios en stories/posts",
      "Bot de captura en DMs",
      "Integración con CRM",
      "Etiquetado automático",
      "Seguimiento automatizado",
    ],
    deliverables: ["Flujos de captura activos", "CRM básico configurado", "Automatizaciones"],
    time: "48h",
    kpis: ["+50% leads capturados", "0 leads perdidos", "Seguimiento 100% automático"],
  },
  {
    id: "reactivation",
    icon: MessageSquare,
    title: "Reactivación de Clientes",
    subtitle: "Recupera clientes inactivos",
    description: "Campañas automatizadas para recuperar clientes que no han vuelto en X tiempo con ofertas personalizadas.",
    features: [
      "Segmentación por inactividad",
      "Mensajes personalizados",
      "Ofertas dinámicas",
      "A/B testing automático",
      "Tracking de conversión",
    ],
    deliverables: ["Campañas configuradas", "Segmentos definidos", "Plantillas de mensaje"],
    time: "24-48h",
    kpis: ["+20% clientes reactivados", "ROI 10x promedio", "Automatización total"],
  },
  {
    id: "dashboard",
    icon: TrendingUp,
    title: "Dashboard KPI",
    subtitle: "Métricas claras, sin Excel",
    description: "Panel de control en tiempo real con todas las métricas de tu negocio: reservas, leads, reseñas y más.",
    features: [
      "Métricas en tiempo real",
      "Gráficos visuales",
      "Comparativas período",
      "Alertas personalizadas",
      "Exportación de datos",
    ],
    deliverables: ["Dashboard personalizado", "Acceso web/móvil", "Formación incluida"],
    time: "72h",
    kpis: ["Decisiones basadas en datos", "Tiempo ahorrado en reportes", "Visibilidad total"],
  },
];

const Servicios = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Soluciones Productizadas
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-primary">Servicios</span> de automatización
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Soluciones llave en mano para automatizar la captación, atención y gestión de tu negocio local. 
              Sin complicaciones. Resultados medibles.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-2">{service.title}</h2>
                  <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <h4 className="font-semibold mb-3">Qué incluye:</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contacto">
                    <Button className="btn-neon">
                      Solicitar este servicio
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className={`card-premium ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Entregables</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Tiempo de implementación:</span>
                      <span className="font-semibold">{service.time}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">KPIs esperados</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.kpis.map((kpi, i) => (
                          <span key={i} className="badge-success text-xs">{kpi}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container relative z-10">
          <div className="card-premium text-center p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Haz nuestra auditoría gratuita y te diremos qué servicios necesitas.
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                Auditoría AI gratis (3 min)
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Servicios;
