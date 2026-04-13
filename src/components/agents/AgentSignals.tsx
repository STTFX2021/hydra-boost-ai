import { motion } from "framer-motion";
import { CircleCheck, CircleAlert } from "lucide-react";
import type { Signal } from "@/data/agentConversion";

interface Props {
  signals: Signal[];
  agentName: string;
}

export function AgentSignals({ signals, agentName }: Props) {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Señales de que este agente <span className="text-gradient-hydrai">te conviene</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Si te identificas con 2 o más de estas situaciones, este agente puede ayudarte.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {signals.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-border/20 bg-card/40 hover:border-primary/20 transition-colors"
            >
              <CircleAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{s.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
