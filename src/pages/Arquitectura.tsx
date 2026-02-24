import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Database, 
  Zap, 
  Users, 
  Bell, 
  Activity,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

type EventStatus = "idle" | "processing" | "success" | "error";

interface EventNode {
  id: string;
  name: string;
  icon: typeof Globe;
  status: EventStatus;
  eventsProcessed: number;
  lastEvent?: string;
}

interface LiveEvent {
  id: string;
  type: string;
  source: string;
  timestamp: Date;
  status: "processing" | "completed" | "routed";
}

const eventTypes = [
  { type: "lead.new", source: "WhatsApp", color: "bg-green-500" },
  { type: "booking.created", source: "Web Form", color: "bg-blue-500" },
  { type: "payment.received", source: "Stripe", color: "bg-purple-500" },
  { type: "support.ticket", source: "Instagram", color: "bg-pink-500" },
  { type: "lead.qualified", source: "CRM", color: "bg-cyan-500" },
  { type: "alert.p1", source: "Monitor", color: "bg-orange-500" },
];

const initialNodes: EventNode[] = [
  { id: "intake", name: "Lead Intake", icon: Globe, status: "idle", eventsProcessed: 0 },
  { id: "eventbus", name: "Event Bus", icon: Zap, status: "idle", eventsProcessed: 0 },
  { id: "orchestrator", name: "Orchestrator", icon: Activity, status: "idle", eventsProcessed: 0 },
  { id: "leads-worker", name: "Leads Worker", icon: Users, status: "idle", eventsProcessed: 0 },
  { id: "ops-worker", name: "OPS Worker", icon: Database, status: "idle", eventsProcessed: 0 },
  { id: "notifications", name: "Notifications", icon: Bell, status: "idle", eventsProcessed: 0 },
];

// Component descriptions
const componentDetails = {
  es: {
    intake: {
      title: "Lead Intake",
      description: "Punto de entrada para todos los leads y eventos del sistema.",
      bullets: [
        "Recibe eventos de WhatsApp, Web, Instagram, APIs",
        "Normaliza y valida datos de entrada",
        "Asigna timestamps y IDs únicos",
        "Enruta al Event Bus para procesamiento"
      ]
    },
    eventbus: {
      title: "Event Bus",
      description: "Columna vertebral del sistema que distribuye eventos.",
      bullets: [
        "Pub/Sub para comunicación desacoplada",
        "Garantiza entrega de mensajes",
        "Permite replay de eventos históricos",
        "Escala horizontalmente sin límites"
      ]
    },
    orchestrator: {
      title: "Orchestrator",
      description: "Cerebro que decide qué hacer con cada evento.",
      bullets: [
        "Evalúa reglas de negocio en tiempo real",
        "Prioriza eventos por urgencia (P0/P1/P2)",
        "Distribuye trabajo a Workers especializados",
        "Maneja reintentos y fallbacks"
      ]
    },
    leadsWorker: {
      title: "Leads Worker",
      description: "Especializado en procesamiento de leads.",
      bullets: [
        "Cualificación automática con IA",
        "Scoring y priorización de leads",
        "Asignación a vendedores",
        "Trigger de secuencias de nurturing"
      ]
    },
    opsWorker: {
      title: "OPS Worker",
      description: "Maneja operaciones de negocio.",
      bullets: [
        "Procesa pagos y facturación",
        "Gestiona reservas y cancelaciones",
        "Actualiza inventario en tiempo real",
        "Sincroniza con ERPs externos"
      ]
    },
    notifications: {
      title: "Notifications",
      description: "Sistema de notificaciones multi-canal.",
      bullets: [
        "Email, SMS, WhatsApp, Push",
        "Templates personalizados por idioma",
        "Scheduling inteligente",
        "Tracking de entrega y apertura"
      ]
    }
  },
  en: {
    intake: {
      title: "Lead Intake",
      description: "Entry point for all leads and system events.",
      bullets: [
        "Receives events from WhatsApp, Web, Instagram, APIs",
        "Normalizes and validates input data",
        "Assigns timestamps and unique IDs",
        "Routes to Event Bus for processing"
      ]
    },
    eventbus: {
      title: "Event Bus",
      description: "System backbone that distributes events.",
      bullets: [
        "Pub/Sub for decoupled communication",
        "Guarantees message delivery",
        "Allows historical event replay",
        "Scales horizontally without limits"
      ]
    },
    orchestrator: {
      title: "Orchestrator",
      description: "Brain that decides what to do with each event.",
      bullets: [
        "Evaluates business rules in real-time",
        "Prioritizes events by urgency (P0/P1/P2)",
        "Distributes work to specialized Workers",
        "Handles retries and fallbacks"
      ]
    },
    leadsWorker: {
      title: "Leads Worker",
      description: "Specialized in lead processing.",
      bullets: [
        "Automatic AI qualification",
        "Lead scoring and prioritization",
        "Sales rep assignment",
        "Nurturing sequence trigger"
      ]
    },
    opsWorker: {
      title: "OPS Worker",
      description: "Handles business operations.",
      bullets: [
        "Processes payments and billing",
        "Manages bookings and cancellations",
        "Updates inventory in real-time",
        "Syncs with external ERPs"
      ]
    },
    notifications: {
      title: "Notifications",
      description: "Multi-channel notification system.",
      bullets: [
        "Email, SMS, WhatsApp, Push",
        "Language-specific templates",
        "Smart scheduling",
        "Delivery and open tracking"
      ]
    }
  }
};

export default function Arquitectura() {
  const { language } = useTranslation();
  const [isRunning, setIsRunning] = useState(true);
  const [nodes, setNodes] = useState<EventNode[]>(initialNodes);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  const details = componentDetails[language as keyof typeof componentDetails] || componentDetails.es;

  const content = {
    es: {
      badge: "Arquitectura Enterprise en Vivo",
      title: "Event Bus &",
      titleHighlight: "Orchestrators",
      subtitle: "Observa cómo procesamos miles de eventos sin intervención humana. Esta visualización muestra la arquitectura real que opera 24/7.",
      pauseBtn: "Pausar Simulación",
      startBtn: "Iniciar Simulación",
      processing: "Procesando eventos...",
      paused: "Simulación pausada",
      eventsProcessed: "Eventos Procesados",
      uptime: "Uptime",
      activeWorkers: "Workers Activos",
      flowTitle: "Flujo de Eventos en Tiempo Real",
      liveEventsTitle: "Eventos en Vivo",
      componentsTitle: "¿Qué hace cada componente?",
      ctaTitle: "¿Quieres Esta Arquitectura en Tu Negocio?",
      ctaSubtitle: "Diseñamos arquitecturas personalizadas que procesan tus eventos, automatizan operaciones y escalan sin límites.",
      ctaButton: "Solicitar Auditoría Enterprise",
      statusIdle: "En espera",
      statusProcessing: "Procesando",
      statusSuccess: "Completado",
      statusError: "Error",
      events: "eventos",
      waitingEvents: "Esperando eventos...",
    },
    en: {
      badge: "Live Enterprise Architecture",
      title: "Event Bus &",
      titleHighlight: "Orchestrators",
      subtitle: "Watch how we process thousands of events without human intervention. This visualization shows the real architecture operating 24/7.",
      pauseBtn: "Pause Simulation",
      startBtn: "Start Simulation",
      processing: "Processing events...",
      paused: "Simulation paused",
      eventsProcessed: "Events Processed",
      uptime: "Uptime",
      activeWorkers: "Active Workers",
      flowTitle: "Real-Time Event Flow",
      liveEventsTitle: "Live Events",
      componentsTitle: "What does each component do?",
      ctaTitle: "Want This Architecture for Your Business?",
      ctaSubtitle: "We design custom architectures that process your events, automate operations and scale without limits.",
      ctaButton: "Request Enterprise Audit",
      statusIdle: "Idle",
      statusProcessing: "Processing",
      statusSuccess: "Completed",
      statusError: "Error",
      events: "events",
      waitingEvents: "Waiting for events...",
    }
  };

  const t = content[language as keyof typeof content] || content.es;

  // Simulate live event processing
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const eventId = `evt_${Date.now()}`;
      
      const newEvent: LiveEvent = {
        id: eventId,
        type: randomEvent.type,
        source: randomEvent.source,
        timestamp: new Date(),
        status: "processing",
      };

      setLiveEvents(prev => [newEvent, ...prev].slice(0, 8));
      setTotalEvents(prev => prev + 1);

      const animateFlow = async () => {
        setActiveConnections(["intake-eventbus"]);
        setNodes(prev => prev.map(n => 
          n.id === "intake" ? { ...n, status: "processing", lastEvent: randomEvent.type } : n
        ));
        
        await new Promise(r => setTimeout(r, 400));
        
        setActiveConnections(["eventbus-orchestrator"]);
        setNodes(prev => prev.map(n => {
          if (n.id === "intake") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === "eventbus") return { ...n, status: "processing", lastEvent: randomEvent.type };
          return n;
        }));

        await new Promise(r => setTimeout(r, 400));

        const isLeadEvent = randomEvent.type.includes("lead");
        const workerConnection = isLeadEvent ? "orchestrator-leads" : "orchestrator-ops";
        setActiveConnections([workerConnection, "orchestrator-notifications"]);
        setNodes(prev => prev.map(n => {
          if (n.id === "eventbus") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === "orchestrator") return { ...n, status: "processing", lastEvent: randomEvent.type };
          return n;
        }));

        await new Promise(r => setTimeout(r, 400));

        const targetWorker = isLeadEvent ? "leads-worker" : "ops-worker";
        setActiveConnections([]);
        setNodes(prev => prev.map(n => {
          if (n.id === "orchestrator") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === targetWorker) return { ...n, status: "processing", lastEvent: randomEvent.type };
          if (n.id === "notifications") return { ...n, status: "processing" };
          return n;
        }));

        await new Promise(r => setTimeout(r, 500));

        setNodes(prev => prev.map(n => {
          if (n.id === targetWorker) return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === "notifications") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          return n;
        }));

        setLiveEvents(prev => prev.map(e => 
          e.id === eventId ? { ...e, status: "completed" } : e
        ));

        await new Promise(r => setTimeout(r, 800));
        setNodes(prev => prev.map(n => ({ ...n, status: "idle" })));
      };

      animateFlow();
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "processing": return "border-primary bg-primary/20 shadow-lg shadow-primary/30";
      case "success": return "border-success bg-success/20 shadow-lg shadow-success/30";
      case "error": return "border-destructive bg-destructive/20";
      default: return "border-border bg-card";
    }
  };

  const getStatusIcon = (status: EventStatus) => {
    switch (status) {
      case "processing": return <RefreshCw className="w-3 h-3 animate-spin text-primary" />;
      case "success": return <CheckCircle2 className="w-3 h-3 text-success" />;
      case "error": return <AlertCircle className="w-3 h-3 text-destructive" />;
      default: return <Clock className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
      case "processing": return t.statusProcessing;
      case "success": return t.statusSuccess;
      case "error": return t.statusError;
      default: return t.statusIdle;
    }
  };

  return (
    <>
      <SEOHead
        title="Arquitectura Enterprise | Event Bus & Orchestrators | HydrAI Labs"
        description="Visualiza nuestra arquitectura de automatización enterprise: Event Bus, Orchestrators, Workers especializados procesando eventos en tiempo real."
        canonical="/arquitectura"
        keywords="event bus, orchestrator, arquitectura enterprise, automatización, workers, microservicios"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Arquitectura", url: "/arquitectura" },
      ]} />
      
      <PageLayout>
        <div className="pt-24 pb-16">
          {/* Hero */}
          <section className="section-container mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                🏗️ {t.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {t.title} <span className="text-gradient-primary">{t.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t.subtitle}
              </p>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  variant={isRunning ? "outline" : "default"}
                  className="gap-2"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? t.pauseBtn : t.startBtn}
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isRunning ? "bg-success animate-pulse" : "bg-muted-foreground"
                  )} />
                  <span className="text-sm text-muted-foreground">
                    {isRunning ? t.processing : t.paused}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="card-premium p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{totalEvents}</div>
                  <div className="text-xs text-muted-foreground">{t.eventsProcessed}</div>
                </div>
                <div className="card-premium p-4 text-center">
                  <div className="text-2xl font-bold text-success">99.9%</div>
                  <div className="text-xs text-muted-foreground">{t.uptime}</div>
                </div>
                <div className="card-premium p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">6</div>
                  <div className="text-xs text-muted-foreground">{t.activeWorkers}</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Interactive Diagram */}
          <section className="section-container mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Diagram */}
              <div className="lg:col-span-2">
                <div className="card-elevated p-8 relative overflow-hidden min-h-[500px]">
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{
                      backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                      backgroundSize: "30px 30px"
                    }} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display font-semibold mb-8 text-center">
                      {t.flowTitle}
                    </h3>

                    <div className="flex flex-col items-center gap-4">
                      <NodeComponent node={nodes.find(n => n.id === "intake")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} getStatusLabel={getStatusLabel} t={t} />
                      
                      <motion.div 
                        className={cn(
                          "w-0.5 h-8 transition-all duration-300",
                          activeConnections.includes("intake-eventbus") ? "bg-primary" : "bg-border"
                        )}
                        animate={activeConnections.includes("intake-eventbus") ? { 
                          boxShadow: "0 0 10px hsl(var(--primary))" 
                        } : {}}
                      />

                      <NodeComponent node={nodes.find(n => n.id === "eventbus")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} getStatusLabel={getStatusLabel} highlight t={t} />
                      
                      <motion.div 
                        className={cn(
                          "w-0.5 h-8 transition-all duration-300",
                          activeConnections.includes("eventbus-orchestrator") ? "bg-primary" : "bg-border"
                        )}
                      />

                      <NodeComponent node={nodes.find(n => n.id === "orchestrator")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} getStatusLabel={getStatusLabel} highlight t={t} />
                      
                      <div className="flex items-start justify-center w-full max-w-lg">
                        <div className="flex-1 flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-0.5 h-8 transition-all duration-300",
                              activeConnections.includes("orchestrator-leads") ? "bg-primary" : "bg-border"
                            )}
                          />
                          <NodeComponent node={nodes.find(n => n.id === "leads-worker")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} getStatusLabel={getStatusLabel} t={t} />
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-0.5 h-8 transition-all duration-300",
                              activeConnections.includes("orchestrator-ops") ? "bg-primary" : "bg-border"
                            )}
                          />
                          <NodeComponent node={nodes.find(n => n.id === "ops-worker")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} getStatusLabel={getStatusLabel} t={t} />
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-0.5 h-8 transition-all duration-300",
                              activeConnections.includes("orchestrator-notifications") ? "bg-secondary" : "bg-border"
                            )}
                          />
                          <NodeComponent node={nodes.find(n => n.id === "notifications")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} getStatusLabel={getStatusLabel} t={t} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Events Feed */}
              <div className="lg:col-span-1">
                <div className="card-elevated p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold">{t.liveEventsTitle}</h3>
                    <Badge variant="outline" className="gap-1">
                      <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                      Live
                    </Badge>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    <AnimatePresence mode="popLayout">
                      {liveEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: "auto" }}
                          exit={{ opacity: 0, x: 20 }}
                          className="p-3 rounded-lg bg-muted/30 border border-border/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <code className="text-xs font-mono text-primary">{event.type}</code>
                            {event.status === "completed" ? (
                              <CheckCircle2 className="w-3 h-3 text-success" />
                            ) : (
                              <RefreshCw className="w-3 h-3 text-primary animate-spin" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{event.source}</span>
                            <span className="text-xs text-muted-foreground">
                              {event.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {liveEvents.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        {t.waitingEvents}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Each Component Does */}
          <section className="section-container mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
              {t.componentsTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(details).map(([key, detail], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-elevated card-elevated-hover p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold">{detail.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-4">{detail.description}</p>
                  <ul className="space-y-2">
                    {detail.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground font-medium">
                        <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t.ctaSubtitle}
              </p>
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon btn-depth gap-2">
                  {t.ctaButton}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

// Node Component
interface NodeComponentProps {
  node: EventNode;
  getStatusColor: (status: EventStatus) => string;
  getStatusIcon: (status: EventStatus) => React.ReactNode;
  getStatusLabel: (status: EventStatus) => string;
  highlight?: boolean;
  t: { events: string };
}

function NodeComponent({ node, getStatusColor, getStatusIcon, getStatusLabel, highlight, t }: NodeComponentProps) {
  return (
    <motion.div
      layout
      className={cn(
        "px-6 py-4 rounded-xl border-2 transition-all duration-300 min-w-[160px]",
        getStatusColor(node.status),
        highlight && "border-dashed"
      )}
    >
      <div className="flex items-center gap-3">
        <node.icon className={cn(
          "w-5 h-5",
          node.status === "processing" ? "text-primary" : 
          node.status === "success" ? "text-success" : "text-muted-foreground"
        )} />
        <div>
          <div className="font-semibold text-sm">{node.name}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {getStatusIcon(node.status)}
            <span>{node.eventsProcessed} {t.events}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
