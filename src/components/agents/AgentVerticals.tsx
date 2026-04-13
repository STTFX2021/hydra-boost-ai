import { motion } from "framer-motion";
import { Target } from "lucide-react";
import type { VerticalProposition } from "@/data/agentConversion";

interface Props {
  propositions: VerticalProposition[];
}

export function AgentVerticals({ propositions }: Props) {
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
            Propuesta de valor <span className="text-gradient-hydrai">por sector</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {propositions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium p-6 border-l-2 border-l-primary/40"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{p.vertical}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
