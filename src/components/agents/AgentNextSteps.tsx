import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { NextStep } from "@/data/agentConversion";

interface Props {
  steps: NextStep[];
}

export function AgentNextSteps({ steps }: Props) {
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
            Siguiente paso <span className="text-gradient-hydrai">recomendado</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const isExternal = step.href.startsWith("http");
            const icon =
              step.type === "primary" ? <ArrowRight className="w-4 h-4" /> :
              step.type === "secondary" ? <MessageCircle className="w-4 h-4" /> :
              <ExternalLink className="w-4 h-4" />;

            if (isExternal) {
              return (
                <motion.a
                  key={i}
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Button
                    size="lg"
                    variant={step.type === "primary" ? "default" : "outline"}
                    className={step.type === "primary" ? "btn-neon" : "border-border/50 hover:bg-card"}
                  >
                    {step.label}
                    {icon}
                  </Button>
                </motion.a>
              );
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={step.href}>
                  <Button
                    size="lg"
                    variant={step.type === "primary" ? "default" : step.type === "secondary" ? "outline" : "ghost"}
                    className={
                      step.type === "primary" ? "btn-neon" :
                      step.type === "secondary" ? "border-border/50 hover:bg-card" :
                      "text-primary hover:text-primary/80"
                    }
                  >
                    {step.label}
                    {icon}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
