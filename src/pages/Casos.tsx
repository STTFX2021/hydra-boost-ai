import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Zap, TrendingUp, Shield, Gamepad2, 
  ExternalLink, Code, Brain, Server, Palette
} from "lucide-react";

const projects = [
  {
    id: "orochi",
    title: "Orochi AI Trading",
    subtitle: "Sistema de trading algorítmico para XAUUSD",
    category: "Ingeniería Avanzada",
    icon: TrendingUp,
    color: "primary",
    description: "Sistema de trading automatizado impulsado por IA para el mercado de oro (XAUUSD). Análisis técnico avanzado, gestión de riesgo y ejecución automática de operaciones.",
    technologies: ["Python", "TensorFlow", "MetaTrader 5", "AWS", "PostgreSQL"],
    metrics: [
      { label: "Precisión predicción", value: "78%" },
      { label: "Operaciones/día", value: "50+" },
      { label: "Uptime", value: "99.9%" },
    ],
    capabilities: [
      "Modelos de ML para predicción de precios",
      "Backtesting con datos históricos (5+ años)",
      "Gestión de riesgo automatizada",
      "Dashboard de monitorización en tiempo real",
      "Alertas y notificaciones inteligentes",
    ],
  },
  {
    id: "argus",
    title: "ARGUS AI Integration",
    subtitle: "Sistema de seguridad empresarial con Knowledge Graph",
    category: "Enterprise / Seguridad",
    icon: Shield,
    color: "secondary",
    description: "Plataforma de integración de IA para análisis de seguridad empresarial. Knowledge graphs, procesamiento de lenguaje natural y detección de amenazas en tiempo real.",
    technologies: ["AWS", "Neo4j", "Python", "FastAPI", "React", "Kubernetes"],
    metrics: [
      { label: "Nodos procesados", value: "1M+" },
      { label: "Tiempo respuesta", value: "<100ms" },
      { label: "Integraciones", value: "15+" },
    ],
    capabilities: [
      "Knowledge Graph para relaciones de datos",
      "NLP para análisis de documentos",
      "Detección de anomalías con ML",
      "API RESTful escalable",
      "Despliegue multi-cloud",
    ],
  },
  {
    id: "prank-brawlers",
    title: "Prank Brawlers",
    subtitle: "Videojuego multijugador con IA generativa",
    category: "Producto / Gaming",
    icon: Gamepad2,
    color: "accent",
    description: "Juego multijugador competitivo con elementos generados por IA. Desarrollo completo desde concepto hasta lanzamiento, incluyendo marketing y monetización.",
    technologies: ["Unity", "C#", "Node.js", "Firebase", "Stable Diffusion"],
    metrics: [
      { label: "Usuarios beta", value: "5K+" },
      { label: "Retención D7", value: "45%" },
      { label: "Assets IA", value: "500+" },
    ],
    capabilities: [
      "Desarrollo de juego end-to-end",
      "Generación de assets con IA",
      "Sistema multijugador en tiempo real",
      "Economía in-game balanceada",
      "Estrategia de marketing y UA",
    ],
  },
];

const capabilities = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Modelos predictivos, NLP, visión por computador",
  },
  {
    icon: Server,
    title: "Backend Escalable",
    description: "APIs, microservicios, bases de datos, cloud",
  },
  {
    icon: Code,
    title: "Desarrollo Full-Stack",
    description: "Web apps, mobile, dashboards, integraciones",
  },
  {
    icon: Palette,
    title: "Producto & UX",
    description: "Diseño, prototipado, testing, lanzamiento",
  },
];

const Casos = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-accent w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-primary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-accent mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Lo que <span className="text-gradient-accent">sabemos construir</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Proyectos que demuestran nuestra capacidad técnica. Desde trading algorítmico hasta videojuegos.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="section-container">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div key={project.id} id={project.id} className="scroll-mt-24">
                <div className="grid lg:grid-cols-5 gap-12">
                  {/* Left: Info */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center`}>
                        <project.icon className={`w-6 h-6 text-${project.color}`} />
                      </div>
                      <div>
                        <span className={`badge-${project.color} text-xs`}>{project.category}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl font-display font-bold mb-2">{project.title}</h2>
                    <p className="text-primary mb-4">{project.subtitle}</p>
                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Stack Tecnológico</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs bg-muted text-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Capacidades Demostradas</h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {project.capabilities.map((cap, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Metrics Card */}
                  <div className="lg:col-span-2">
                    <div className="card-premium h-full flex flex-col justify-center">
                      <h4 className="font-display font-semibold mb-6 text-center">Métricas del Proyecto</h4>
                      <div className="space-y-6">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-3xl font-display font-bold text-gradient-primary">
                              {metric.value}
                            </div>
                            <div className="text-sm text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {index < projects.length - 1 && (
                  <div className="border-t border-border/30 mt-24" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Nuestras <span className="text-gradient-primary">capacidades</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No solo hacemos chatbots. Tenemos experiencia en desarrollo de software complejo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="card-premium text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display font-semibold mb-2">{cap.title}</h4>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-muted-foreground mb-8">
              Cuéntanos tu idea. Desde MVPs hasta sistemas enterprise.
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
