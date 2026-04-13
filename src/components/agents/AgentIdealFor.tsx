import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { IdealSector } from "@/data/agentConversion";

interface Props {
  sectors: IdealSector[];
}

export function AgentIdealFor({ sectors }: Props) {
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
            Ideal <span className="text-gradient-hydrai">para</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-premium p-5 flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-display font-semibold text-foreground">{s.name}</span>
                <p className="text-sm text-muted-foreground mt-1">{s.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
