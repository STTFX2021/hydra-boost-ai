import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AgentWorkflowNode } from "@/data/agents";

interface Props {
  nodes: AgentWorkflowNode[];
}

const nodeColors: Record<string, { bg: string; border: string; dot: string }> = {
  trigger: { bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-500" },
  process: { bg: "bg-primary/10", border: "border-primary/30", dot: "bg-primary" },
  decision: { bg: "bg-violet-500/10", border: "border-violet-500/30", dot: "bg-violet-500" },
  action: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-500" },
  output: { bg: "bg-cyan-400/10", border: "border-cyan-400/30", dot: "bg-cyan-400" },
};

const typeLabels: Record<string, string> = {
  trigger: "Trigger",
  process: "Proceso",
  decision: "Decisión",
  action: "Acción",
  output: "Resultado",
};

export function AgentWorkflow({ nodes }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % nodes.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nodes.length]);

  const handleNodeClick = (i: number) => {
    setActiveIdx(i);
    setIsAutoPlaying(false);
  };

  return (
    <section id="workflow" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Cómo funciona <span className="text-gradient-hydrai">paso a paso</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualiza el flujo completo del agente, desde el trigger hasta el resultado final.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Workflow nodes */}
          <div className="relative">
            <div className="flex flex-col gap-3">
              {nodes.map((node, i) => {
                const colors = nodeColors[node.type] || nodeColors.process;
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-4 cursor-pointer group"
                    onClick={() => handleNodeClick(i)}
                  >
                    {/* Connector line + dot */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? `${colors.dot} border-transparent scale-125 shadow-lg`
                            : isPast
                            ? `${colors.dot} border-transparent opacity-60`
                            : `bg-transparent ${colors.border}`
                        }`}
                      />
                      {i < nodes.length - 1 && (
                        <div
                          className={`w-px h-12 transition-colors duration-300 ${
                            isPast ? "bg-primary/30" : "bg-border/30"
                          }`}
                        />
                      )}
                    </div>

                    {/* Node card */}
                    <div
                      className={`flex-1 rounded-xl border p-4 transition-all duration-300 ${
                        isActive
                          ? `${colors.bg} ${colors.border} shadow-lg`
                          : "bg-card/30 border-border/20 hover:border-border/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.bg} ${colors.border} border`}
                        >
                          {typeLabels[node.type]}
                        </span>
                        <span className="font-display font-semibold text-sm">{node.label}</span>
                      </div>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-muted-foreground mt-2 leading-relaxed"
                          >
                            {node.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card-premium p-8"
                >
                  {(() => {
                    const node = nodes[activeIdx];
                    const colors = nodeColors[node.type] || nodeColors.process;
                    return (
                      <>
                        <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-5`}>
                          <div className={`w-5 h-5 rounded-full ${colors.dot}`} />
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2`}>
                          Paso {activeIdx + 1} de {nodes.length}
                        </span>
                        <h3 className="text-xl font-display font-bold mb-3">{node.label}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">{node.description}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${colors.bg} ${colors.border} border`}>
                            {typeLabels[node.type]}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-8">
                          <div className="h-1 bg-border/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${((activeIdx + 1) / nodes.length) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                            <span>Inicio</span>
                            <span>Resultado</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex justify-center gap-2 mt-4">
                {nodes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleNodeClick(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeIdx ? "bg-primary w-6" : "bg-border/40 hover:bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
