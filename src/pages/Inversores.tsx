import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Zap, Target, Rocket, Users, ArrowRight, TrendingUp, Calendar, CheckCircle, Brain, Eye, Shield, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const deepTechProjects = [
  {
    id: "orochi",
    title: "Orochi Trading AI",
    icon: Brain,
    tagline: "Trading multimodal con IA avanzada",
    description: "Motor de decisión que combina análisis multi-timeframe (MTF), reinforcement learning (PPO), redes LSTM y gestión de riesgo adaptativa para operar mercados financieros.",
    techStack: ["MTF Analysis", "RL/PPO", "LSTM", "Risk Management"],
    status: "Prototipo funcional",
    nextMilestones: ["Backtesting extendido", "Paper trading 3 meses", "Cuenta real piloto"],
    fundingAccelerates: "Infraestructura cloud, datos históricos premium, validación estadística independiente"
  },
  {
    id: "yolo-cv",
    title: "YOLO Chart Vision",
    icon: Eye,
    tagline: "Computer Vision para análisis técnico",
    description: "Detección visual de estructuras de mercado (order blocks, patrones de precio, zonas de liquidez) usando modelos YOLO entrenados en datasets propietarios.",
    techStack: ["YOLOv8", "Custom Dataset", "Chart Detection", "Pattern Recognition"],
    status: "Dataset en construcción",
    nextMilestones: ["10K imágenes etiquetadas", "Modelo v1 entrenado", "API de inferencia"],
    fundingAccelerates: "Anotadores especializados, GPU compute para entrenamiento, integración con brokers"
  },
  {
    id: "argus",
    title: "ARGUS AI Integration",
    icon: Shield,
    tagline: "Seguridad y compliance automatizado",
    description: "Context Engine que construye un grafo de conocimiento de infraestructura AWS/cloud, automatiza auditorías de seguridad y genera reportes de compliance (SOC2, ISO27001).",
    techStack: ["Knowledge Graph", "AWS Security", "Compliance Automation", "NLP"],
    status: "Concepto validado",
    nextMilestones: ["MVP con 3 clientes piloto", "Integración multi-cloud", "Dashboard ejecutivo"],
    fundingAccelerates: "Equipo de ingeniería, certificaciones de seguridad, partnerships enterprise"
  },
  {
    id: "trade-vortex",
    title: "Trade Vortex Ecosystem",
    icon: Layers,
    tagline: "Venture Studio de fintech/AI",
    description: "Ecosistema que empaqueta y monetiza los activos tecnológicos anteriores. Modelo de negocio: licencias SaaS, señales por suscripción, y consultoría de implementación.",
    techStack: ["SaaS Platform", "API Marketplace", "Subscription Model", "B2B Distribution"],
    status: "Arquitectura diseñada",
    nextMilestones: ["Landing + waitlist", "Primeros 50 early adopters", "Revenue recurrente"],
    fundingAccelerates: "Marketing digital, equipo de ventas B2B, infraestructura escalable"
  }
];

const Inversores = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-secondary w-96 h-96 -bottom-48 -right-48" />

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Investor Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              HydrAI Labs — <span className="text-gradient-primary">Investor Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Automatización inteligente para negocios locales. Construimos el futuro de la productividad para pymes.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="section-padding -mt-8">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Qué estamos construyendo */}
            <div className="card-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Qué estamos construyendo</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                HydrAI Labs es una agencia de automatización con IA enfocada en negocios locales y pymes. Creamos:
              </p>
              <ul className="space-y-3">
                {[
                  "Páginas web profesionales optimizadas para conversión",
                  "Chatbots IA 24/7 que responden, califican y convierten leads",
                  "Automatizaciones de reservas, recordatorios y seguimiento",
                  "Sistemas de gestión de reputación online"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Por qué ahora */}
            <div className="card-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Por qué ahora</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Mercado masivo", desc: "Millones de pymes en España sin presencia digital efectiva" },
                  { title: "IA accesible", desc: "Los costes de IA han bajado 10x en 2 años" },
                  { title: "Demanda creciente", desc: "Post-COVID, la digitalización es prioridad" },
                  { title: "Ventana de oportunidad", desc: "Primeros en ofrecer soluciones completas a precio pyme" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/30">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qué buscamos */}
            <div className="card-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-display font-bold">Qué buscamos</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Estamos abiertos a colaboraciones estratégicas con:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: "Partners estratégicos", desc: "Agencias, consultoras y proveedores de servicios complementarios" },
                  { title: "Inversores ángel", desc: "Capital semilla para acelerar crecimiento y equipo" },
                  { title: "Mentores", desc: "Experiencia en SaaS, agencias o ventas B2B local" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border/50 text-center">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximos hitos */}
            <div className="card-premium p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Próximos hitos</h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: "Q1 2025", milestone: "Lanzamiento web + primeros 10 clientes de pago" },
                  { q: "Q2 2025", milestone: "Producto chatbot estandarizado + 25 clientes" },
                  { q: "Q3 2025", milestone: "Automatizaciones avanzadas + expansión equipo" },
                  { q: "Q4 2025", milestone: "50+ clientes recurrentes + break-even" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                    <span className="text-sm font-mono font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                      {item.q}
                    </span>
                    <span className="text-foreground/90">{item.milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Tech Projects */}
            <div className="card-premium neon-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">Proyectos de Alta Inversión</h2>
                  <p className="text-sm text-muted-foreground">Deep Tech & Fintech AI</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Además de la agencia, desarrollamos tecnología propietaria con potencial de escala significativo:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {deepTechProjects.map((project) => (
                  <div key={project.id} className="p-6 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <project.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold">{project.title}</h3>
                        <p className="text-xs text-muted-foreground">{project.tagline}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground/80 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-muted-foreground shrink-0">Estado:</span>
                        <span className="text-foreground/80">{project.status}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-muted-foreground shrink-0">Próximos hitos:</span>
                        <span className="text-foreground/80">{project.nextMilestones.join(" → ")}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-muted-foreground shrink-0">Financiación acelera:</span>
                        <span className="text-foreground/80">{project.fundingAccelerates}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="card-premium neon-border p-8 text-center">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-3">¿Interesado en colaborar?</h2>
              <p className="text-muted-foreground mb-6">
                Solicita el deck completo o agenda una llamada con el founder para explorar oportunidades.
              </p>
              <Link to="/contacto">
                <Button className="btn-neon">
                  Solicitar deck / Hablar con el founder
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Inversores;
