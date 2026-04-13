import { motion } from "framer-motion";
import type { AgentStep } from "@/data/agents";

interface Props {
  steps: AgentStep[];
}

export function AgentSteps({ steps }: Props) {
  return (
    <section className="section-padding section-alt">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Paso a <span className="text-gradient-hydrai">paso</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada etapa del proceso, las herramientas implicadas y el resultado parcial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="card-premium p-6 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold group-hover:text-primary transition-colors">
                  {step.name}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                    {step.tool}
                  </span>
                </div>
                <p className="text-xs text-success font-medium">→ {step.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
