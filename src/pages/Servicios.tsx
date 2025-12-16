import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, Bot, Calendar, Star, Users, TrendingUp,
  ArrowRight, CheckCircle2, Clock, Zap, Gift
} from "lucide-react";

const Servicios = () => {
  const services = [
    {
      id: "web-presencia",
      icon: Globe,
      title: "Web Presencia IA-Ready",
      subtitle: "Landing o web corporativa",
      description: "Web corporativa o landing page optimizada para móvil, preparada para integrar chatbots y automatizaciones. Ideal para restaurantes, clínicas, talleres, inmobiliarias…",
      features: [
        "1–3 secciones clave (inicio, servicios, contacto)",
        "Formulario de contacto o botón directo a WhatsApp",
        "Configuración básica de SEO local (título, descripción, mapa, etc.)",
        "Diseño responsive y moderno",
        "Hosting y dominio no incluidos (te asesoramos)",
      ],
      deliverables: ["Web lista para producción", "Panel de administración básico", "Guía de uso"],
      time: "5-7 días",
      price: "Desde 497 € + IVA",
      kpis: ["Presencia online profesional", "Leads capturados 24/7", "Base para futuras automatizaciones"],
    },
    {
      id: "web-chatbot",
      icon: Bot,
      title: "Web + Chatbot 24/7",
      subtitle: "Tu asistente virtual siempre disponible",
      description: "Tu web + un asistente virtual que responde 24/7, recoge datos y guía a los clientes hacia la reserva o la consulta.",
      features: [
        "Chatbot IA entrenado con la info de tu negocio",
        "Disponible en web (widget) y preparado para WhatsApp/Redes",
        "Consulta rápida de horarios, servicios, precios orientativos",
        "Captura de leads automática",
        "Derivación inteligente a humano cuando es necesario",
      ],
      deliverables: ["Web completa", "Chatbot configurado y entrenado", "Dashboard de conversaciones"],
      time: "7-10 días",
      price: "Desde 790 € + IVA",
      kpis: ["Respuesta < 30s 24/7", "-70% mensajes sin responder", "+40% conversión de leads"],
    },
    {
      id: "automatiza-agenda",
      icon: Calendar,
      title: "Automatiza tu Agenda",
      subtitle: "Reservas, recordatorios y reseñas en piloto automático",
      description: "Automatizaciones que conectan formulario, chatbot, calendario, email y WhatsApp para que las reservas se gestionen solas.",
      features: [
        "Confirmaciones y recordatorios automáticos (WhatsApp/Email)",
        "Mensajes anti no-show",
        "Pedir reseñas en el momento correcto",
        "Integración con Google Calendar o similar",
        "Seguimiento post-servicio automatizado",
      ],
      deliverables: ["Sistema de reservas activo", "Flujos de automatización configurados", "Dashboard de métricas"],
      time: "10-14 días",
      price: "Desde 1.290 € + IVA",
      kpis: ["-80% no-shows", "+300% reseñas/mes", "Gestión 100% automática"],
    },
    {
      id: "reputacion",
      icon: Star,
      title: "Reputación en Piloto Automático",
      subtitle: "Más reseñas 5 estrellas sin esfuerzo",
      description: "Automatiza la solicitud de reseñas en el momento perfecto y responde a todas las reseñas de forma inteligente.",
      features: [
        "Solicitud automática post-servicio",
        "Filtro de satisfacción previo",
        "Respuestas sugeridas por IA",
        "Recordatorios a clientes satisfechos",
        "Alertas de reseñas negativas",
      ],
      deliverables: ["Flujos de solicitud activos", "Plantillas de respuesta", "Dashboard de reputación"],
      time: "3-5 días",
      price: "Consultar",
      kpis: ["+300% nuevas reseñas/mes", "4.8+ rating promedio", "100% reseñas respondidas"],
    },
    {
      id: "lead-capture",
      icon: Users,
      title: "Captura de Clientes sin Web",
      subtitle: "Para negocios que aún no tienen web",
      description: "Servicio para negocios que todavía no tienen web: chatbot + landings simples + automatizaciones mínimas para empezar a captar leads.",
      features: [
        "Bot de captura en WhatsApp/Instagram/Facebook",
        "Landing page simple de captación",
        "Integración con CRM básico",
        "Etiquetado automático de leads",
        "Seguimiento automatizado",
      ],
      deliverables: ["Flujos de captura activos", "CRM básico configurado", "Automatizaciones mínimas"],
      time: "5-7 días",
      price: "Consultar",
      kpis: ["+50% leads capturados", "0 leads perdidos", "Seguimiento 100% automático"],
    },
    {
      id: "mantenimiento",
      icon: TrendingUp,
      title: "Mantenimiento & Optimización",
      subtitle: "Tu web y automatizaciones siempre al día",
      description: "Cambios en la web, mejora continua y revisión de automatizaciones para que todo funcione perfectamente mes a mes.",
      features: [
        "Cambios menores en contenido y diseño",
        "Revisión mensual de automatizaciones",
        "Optimización de chatbot según feedback",
        "Soporte técnico prioritario",
        "Informes mensuales de rendimiento",
      ],
      deliverables: ["Soporte continuo", "Informes mensuales", "Mejoras incrementales"],
      time: "Mensual",
      price: "Desde 49 €/mes",
      kpis: ["Web siempre actualizada", "Automatizaciones optimizadas", "Soporte cuando lo necesites"],
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Packs de Agencia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Lo que <span className="text-gradient-primary">hacemos por ti</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Hydra Services crea webs, chatbots y automatizaciones a medida para negocios locales y pymes. Sin complicaciones. Resultados medibles.
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

                  <div className="flex items-center gap-4 mb-6">
                    <span className="badge-primary text-sm font-semibold">{service.price}</span>
                  </div>

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
