import { motion } from "framer-motion";
import { AlertTriangle, Zap, TrendingUp } from "lucide-react";
import type { AgentData } from "@/data/agents";

interface Props {
  agent: AgentData;
}

export function AgentProblemSolution({ agent }: Props) {
  const blocks = [
    {
      icon: AlertTriangle,
      label: "El problema",
      text: agent.problem,
      accent: "text-destructive/80",
      border: "border-destructive/20",
      bg: "bg-destructive/5",
    },
    {
      icon: Zap,
      label: "La solución",
      text: agent.solution,
      accent: "text-primary",
      border: "border-primary/20",
      bg: "bg-primary/5",
    },
    {
      icon: TrendingUp,
      label: "El resultado",
      text: agent.resultMetric,
      accent: "text-success",
      border: "border-success/20",
      bg: "bg-success/5",
    },
  ];

  return (
    <section className="section-padding section-alt">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`card-premium p-8 border ${b.border}`}
              >
                <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${b.accent}`} />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${b.accent} block mb-3`}>
                  {b.label}
                </span>
                <p className="text-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
