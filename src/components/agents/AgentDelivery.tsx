import { motion } from "framer-motion";
import { Package, Plug, TestTube2, Headphones, RefreshCw, Clock } from "lucide-react";
import type { DeliveryInfo } from "@/data/agentConversion";

interface Props {
  delivery: DeliveryInfo;
}

const deploymentColors = {
  "rápido": { text: "text-success", bg: "bg-success/10", label: "Despliegue rápido" },
  "medio": { text: "text-amber-400", bg: "bg-amber-400/10", label: "Despliegue medio" },
  "avanzado": { text: "text-primary", bg: "bg-primary/10", label: "Despliegue avanzado" },
};

export function AgentDelivery({ delivery }: Props) {
  const dColor = deploymentColors[delivery.deploymentTime];

  const items = [
    { icon: Package, label: "Setup", text: delivery.setup },
    { icon: Plug, label: "Integraciones", text: delivery.integrations },
    { icon: TestTube2, label: "Testing", text: delivery.testing },
    { icon: Headphones, label: "Soporte", text: delivery.support },
    { icon: RefreshCw, label: "Iteración", text: delivery.iteration },
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
            Qué incluye la <span className="text-gradient-hydrai">implementación</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Deployment badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${dColor.bg} border border-current/10`}>
              <Clock className={`w-4 h-4 ${dColor.text}`} />
              <span className={`text-sm font-semibold ${dColor.text}`}>{dColor.label}</span>
              <span className="text-xs text-muted-foreground">· {delivery.deploymentDays}</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-premium p-4 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">{item.label}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
