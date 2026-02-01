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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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

export default function Arquitectura() {
  const [isRunning, setIsRunning] = useState(true);
  const [nodes, setNodes] = useState<EventNode[]>(initialNodes);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  // Simulate live event processing
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const eventId = `evt_${Date.now()}`;
      
      // Add new event
      const newEvent: LiveEvent = {
        id: eventId,
        type: randomEvent.type,
        source: randomEvent.source,
        timestamp: new Date(),
        status: "processing",
      };

      setLiveEvents(prev => [newEvent, ...prev].slice(0, 8));
      setTotalEvents(prev => prev + 1);

      // Animate through nodes
      const animateFlow = async () => {
        // Intake
        setActiveConnections(["intake-eventbus"]);
        setNodes(prev => prev.map(n => 
          n.id === "intake" ? { ...n, status: "processing", lastEvent: randomEvent.type } : n
        ));
        
        await new Promise(r => setTimeout(r, 400));
        
        // Event Bus
        setActiveConnections(["eventbus-orchestrator"]);
        setNodes(prev => prev.map(n => {
          if (n.id === "intake") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === "eventbus") return { ...n, status: "processing", lastEvent: randomEvent.type };
          return n;
        }));

        await new Promise(r => setTimeout(r, 400));

        // Orchestrator routes to worker
        const isLeadEvent = randomEvent.type.includes("lead");
        const workerConnection = isLeadEvent ? "orchestrator-leads" : "orchestrator-ops";
        setActiveConnections([workerConnection, "orchestrator-notifications"]);
        setNodes(prev => prev.map(n => {
          if (n.id === "eventbus") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === "orchestrator") return { ...n, status: "processing", lastEvent: randomEvent.type };
          return n;
        }));

        await new Promise(r => setTimeout(r, 400));

        // Workers process
        const targetWorker = isLeadEvent ? "leads-worker" : "ops-worker";
        setActiveConnections([]);
        setNodes(prev => prev.map(n => {
          if (n.id === "orchestrator") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === targetWorker) return { ...n, status: "processing", lastEvent: randomEvent.type };
          if (n.id === "notifications") return { ...n, status: "processing" };
          return n;
        }));

        await new Promise(r => setTimeout(r, 500));

        // Complete
        setNodes(prev => prev.map(n => {
          if (n.id === targetWorker) return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          if (n.id === "notifications") return { ...n, status: "success", eventsProcessed: n.eventsProcessed + 1 };
          return n;
        }));

        // Update event status
        setLiveEvents(prev => prev.map(e => 
          e.id === eventId ? { ...e, status: "completed" } : e
        ));

        // Reset to idle after delay
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

  return (
    <>
      <SEOHead
        title="Arquitectura Enterprise | Event Bus & Orchestrators | HydrAI Labs"
        description="Visualiza nuestra arquitectura de automatización enterprise: Event Bus, Orchestrators, Workers especializados procesando eventos en tiempo real."
        canonical="/arquitectura"
        keywords="event bus, orchestrator, arquitectura enterprise, automatización, workers, microservicios"
      />
      
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
                🏗️ Arquitectura Enterprise en Vivo
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Event Bus & <span className="text-gradient-primary">Orchestrators</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Observa cómo procesamos miles de eventos sin intervención humana. 
                Esta visualización muestra la arquitectura real que opera 24/7.
              </p>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  variant={isRunning ? "outline" : "default"}
                  className="gap-2"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? "Pausar Simulación" : "Iniciar Simulación"}
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isRunning ? "bg-success animate-pulse" : "bg-muted-foreground"
                  )} />
                  <span className="text-sm text-muted-foreground">
                    {isRunning ? "Procesando eventos..." : "Simulación pausada"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="card-premium p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{totalEvents}</div>
                  <div className="text-xs text-muted-foreground">Eventos Procesados</div>
                </div>
                <div className="card-premium p-4 text-center">
                  <div className="text-2xl font-bold text-success">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="card-premium p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">6</div>
                  <div className="text-xs text-muted-foreground">Workers Activos</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Interactive Diagram */}
          <section className="section-container mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Diagram */}
              <div className="lg:col-span-2">
                <div className="card-premium p-8 relative overflow-hidden min-h-[500px]">
                  {/* Background Grid */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{
                      backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                      backgroundSize: "30px 30px"
                    }} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display font-semibold mb-8 text-center">
                      Flujo de Eventos en Tiempo Real
                    </h3>

                    {/* Diagram Layout */}
                    <div className="flex flex-col items-center gap-4">
                      {/* Row 1: Intake */}
                      <NodeComponent node={nodes.find(n => n.id === "intake")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                      
                      {/* Connection Line */}
                      <motion.div 
                        className={cn(
                          "w-0.5 h-8 transition-all duration-300",
                          activeConnections.includes("intake-eventbus") ? "bg-primary" : "bg-border"
                        )}
                        animate={activeConnections.includes("intake-eventbus") ? { 
                          boxShadow: "0 0 10px hsl(var(--primary))" 
                        } : {}}
                      />

                      {/* Row 2: Event Bus */}
                      <NodeComponent node={nodes.find(n => n.id === "eventbus")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} highlight />
                      
                      {/* Connection Line */}
                      <motion.div 
                        className={cn(
                          "w-0.5 h-8 transition-all duration-300",
                          activeConnections.includes("eventbus-orchestrator") ? "bg-primary" : "bg-border"
                        )}
                      />

                      {/* Row 3: Orchestrator */}
                      <NodeComponent node={nodes.find(n => n.id === "orchestrator")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} highlight />
                      
                      {/* Branching Lines */}
                      <div className="flex items-start justify-center w-full max-w-lg">
                        <div className="flex-1 flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-0.5 h-8 transition-all duration-300",
                              activeConnections.includes("orchestrator-leads") ? "bg-primary" : "bg-border"
                            )}
                          />
                          <NodeComponent node={nodes.find(n => n.id === "leads-worker")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-0.5 h-8 transition-all duration-300",
                              activeConnections.includes("orchestrator-ops") ? "bg-primary" : "bg-border"
                            )}
                          />
                          <NodeComponent node={nodes.find(n => n.id === "ops-worker")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <motion.div 
                            className={cn(
                              "w-0.5 h-8 transition-all duration-300",
                              activeConnections.includes("orchestrator-notifications") ? "bg-secondary" : "bg-border"
                            )}
                          />
                          <NodeComponent node={nodes.find(n => n.id === "notifications")!} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Events Feed */}
              <div className="lg:col-span-1">
                <div className="card-premium p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold">Eventos en Vivo</h3>
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
                        Esperando eventos...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Node Details */}
          <section className="section-container mb-16">
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              Componentes del Sistema
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-premium p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      node.status === "processing" ? "bg-primary/20" : "bg-muted"
                    )}>
                      <node.icon className={cn(
                        "w-5 h-5",
                        node.status === "processing" ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{node.name}</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(node.status)}
                        <span className="text-xs text-muted-foreground capitalize">
                          {node.status === "idle" ? "En espera" : 
                           node.status === "processing" ? "Procesando" :
                           node.status === "success" ? "Completado" : "Error"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Eventos procesados:</span>
                    <span className="font-mono font-semibold text-primary">{node.eventsProcessed}</span>
                  </div>
                  {node.lastEvent && (
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <code className="text-xs text-muted-foreground">{node.lastEvent}</code>
                    </div>
                  )}
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
                ¿Quieres Esta Arquitectura en Tu Negocio?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Diseñamos arquitecturas personalizadas que procesan tus eventos, 
                automatizan operaciones y escalan sin límites.
              </p>
              <Link to="/auditoria">
                <Button size="lg" className="btn-neon gap-2">
                  Solicitar Auditoría Enterprise
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
  highlight?: boolean;
}

function NodeComponent({ node, getStatusColor, getStatusIcon, highlight }: NodeComponentProps) {
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
            <span>{node.eventsProcessed} eventos</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
