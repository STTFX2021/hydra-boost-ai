import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Zap, ExternalLink,
  Flame, UtensilsCrossed, Stethoscope, Car, Hotel, BarChart3, Home
} from "lucide-react";

const Casos = () => {
  const projects = [
    {
      id: "atelier-embers",
      title: "Atelier of Embers",
      type: "Tienda de velas artesanales y artesanía",
      icon: Flame,
      description: "Web e-commerce con catálogo de productos, integración de pagos y sistema de pedidos automatizado. Chatbot para consultas sobre personalización.",
      tags: ["#web", "#chatbot", "#ecommerce"],
      color: "primary",
    },
    {
      id: "chic-bookings",
      title: "Chic Bookings",
      type: "Sistema de reservas para restaurante / salón",
      icon: UtensilsCrossed,
      description: "Sistema elegante de reservas online con confirmaciones automáticas, gestión de mesas y recordatorios anti no-show por WhatsApp.",
      tags: ["#web", "#automatizaciones", "#reservas"],
      color: "secondary",
    },
    {
      id: "smile-studio",
      title: "Smile Studio Hub",
      type: "Clínica dental moderna",
      icon: Stethoscope,
      description: "Web profesional con sistema de citas, chatbot para resolver dudas frecuentes sobre tratamientos y automatización de recordatorios.",
      tags: ["#web", "#chatbot", "#automatizaciones"],
      color: "accent",
    },
    {
      id: "autoquote-hub",
      title: "AutoQuote Hub",
      type: "Taller mecánico con presupuestos rápidos",
      icon: Car,
      description: "Landing de captación con formulario inteligente que genera presupuestos orientativos automáticos según el tipo de servicio y vehículo.",
      tags: ["#web", "#automatizaciones", "#leads"],
      color: "primary",
    },
    {
      id: "sol-reservas",
      title: "Sol Reservas IA",
      type: "Motor de reservas para hoteles",
      icon: Hotel,
      description: "Sistema de reservas inteligente con chatbot multiidioma, check-in automático y seguimiento post-estancia para reseñas.",
      tags: ["#chatbot", "#automatizaciones", "#reservas"],
      color: "secondary",
    },
    {
      id: "insight-narrator",
      title: "Insight Narrator",
      type: "Interpretación de dashboards con IA",
      icon: BarChart3,
      description: "Capa de IA que analiza los datos de negocio y genera informes narrativos automáticos con recomendaciones accionables.",
      tags: ["#automatizaciones", "#ia", "#analytics"],
      color: "accent",
    },
    {
      id: "tu-hogar-madrid",
      title: "tu-hogar-madrid",
      type: "Inmobiliaria vivienda en Madrid",
      icon: Home,
      description: "Web de captación con filtros avanzados, chatbot para cualificación de leads y automatización de envío de fichas de propiedades.",
      tags: ["#web", "#chatbot", "#leads"],
      color: "primary",
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-accent w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-primary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-accent mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Casos de Éxito
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Proyectos que <span className="text-gradient-accent">demuestran resultados</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ejemplos de lo que Hydra Services puede hacer por tu negocio: webs, chatbots y automatizaciones reales.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              
              return (
                <div key={project.id} className="card-premium group flex flex-col">
                  <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center mb-4 group-hover:bg-${project.color}/20 transition`}>
                    <IconComponent className={`w-6 h-6 text-${project.color}`} />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">{project.type}</span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-3">{project.title}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="badge-primary text-xs">{tag}</span>
                    ))}
                  </div>
                  
                  <Button size="sm" variant="ghost" disabled className="w-full">
                    Ver demo (próximamente)
                    <ExternalLink className="ml-2 w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-muted-foreground mb-8">
              Cuéntanos tu idea y te proponemos la mejor solución para tu negocio.
            </p>
            <Link to="/contacto">
              <Button size="lg" className="btn-neon text-lg px-8">
                Hablemos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Casos;
