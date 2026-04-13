import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import type { StackItem } from "@/data/agentConversion";

interface Props {
  stack: StackItem[];
}

export function AgentStack({ stack }: Props) {
  return (
    <section className="section-padding section-alt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Stack <span className="text-gradient-hydrai">habitual</span>
          </h2>
          <p className="text-sm text-muted-foreground">Herramientas que componen esta implementación.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {stack.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-border/30 bg-card/60 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <Cpu className="w-4 h-4 text-primary" />
              <div>
                <span className="text-sm font-semibold text-foreground block">{s.name}</span>
                <span className="text-[10px] text-muted-foreground">{s.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
