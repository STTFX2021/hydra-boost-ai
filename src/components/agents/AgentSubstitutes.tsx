import { motion } from "framer-motion";
import { Replace, Zap, ShieldOff } from "lucide-react";
import type { SubstitutesBlock } from "@/data/agentConversion";

interface Props {
  substitutes: SubstitutesBlock;
}

export function AgentSubstitutes({ substitutes }: Props) {
  const blocks = [
    { icon: Replace, label: "Qué sustituye", items: substitutes.replaces, accent: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    { icon: Zap, label: "Qué acelera", items: substitutes.accelerates, accent: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { icon: ShieldOff, label: "Qué evita", items: substitutes.prevents, accent: "text-destructive/80", bg: "bg-destructive/10", border: "border-destructive/20" },
  ];

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
            Qué cambia con este <span className="text-gradient-hydrai">agente</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card-premium p-6 border-t-2 ${b.border}`}
              >
                <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${b.accent}`} />
                </div>
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${b.accent} mb-4`}>{b.label}</h3>
                <ul className="space-y-2.5">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full ${b.bg} shrink-0 mt-1.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
