import { motion } from "framer-motion";
import type { AgentIntegration } from "@/data/agents";

interface Props {
  integrations: AgentIntegration[];
}

export function AgentIntegrations({ integrations }: Props) {
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
            Integraciones <span className="text-gradient-hydrai">compatibles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Herramientas y plataformas que se conectan con este agente.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {integrations.map((int, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
            >
              <span className="text-sm font-medium text-foreground">{int.name}</span>
              <span className="text-[10px] text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-muted/50">
                {int.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
