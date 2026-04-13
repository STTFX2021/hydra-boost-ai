import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import type { AgentUseCase } from "@/data/agents";

interface Props {
  useCases: AgentUseCase[];
}

export function AgentUseCases({ useCases }: Props) {
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
            Casos de uso <span className="text-gradient-hydrai">reales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ejemplos concretos de cómo este agente transforma distintos tipos de negocio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {uc.industry}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{uc.scenario}</p>

              <div className="rounded-lg bg-success/5 border border-success/10 px-4 py-3">
                <span className="text-xs text-success font-semibold block mb-0.5">Resultado</span>
                <span className="text-sm text-foreground">{uc.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
