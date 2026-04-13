import { motion } from "framer-motion";
import type { ImpactMetric } from "@/data/agentConversion";

interface Props {
  metrics: ImpactMetric[];
}

export function AgentMetrics({ metrics }: Props) {
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
            Impacto <span className="text-gradient-hydrai">orientativo</span>
          </h2>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Métricas basadas en implementaciones reales. Los resultados pueden variar según negocio, volumen y configuración.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium p-5 text-center"
            >
              <span className="text-2xl md:text-3xl font-display font-bold text-gradient-hydrai block mb-2">
                {m.value}
              </span>
              <span className="text-sm font-semibold text-foreground block mb-1">{m.label}</span>
              <span className="text-[11px] text-muted-foreground leading-tight">{m.context}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
