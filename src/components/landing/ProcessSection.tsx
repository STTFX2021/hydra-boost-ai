import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Auditoría Inicial",
    description: "Analizamos tus procesos actuales y detectamos oportunidades de automatización",
    time: "30-60 min (gratuita)",
  },
  {
    num: "2",
    title: "Diseño de Arquitectura",
    description: "Proponemos la arquitectura específica con flujos, integraciones y ROI esperado",
    time: "2-5 días hábiles",
  },
  {
    num: "3",
    title: "Implementación por Fases",
    description: "Desarrollamos e integramos los sistemas de forma modular y testeable",
    time: "1-4 semanas (según scope)",
  },
  {
    num: "4",
    title: "Monitoreo y Optimización",
    description: "Supervisamos el sistema, ajustamos y expandimos según necesidades",
    time: "Continuo",
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-muted/10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Cómo <span className="text-gradient-primary">Trabajamos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proceso adaptado según el nivel de arquitectura que necesites
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="card-premium text-center relative z-10 h-full">
                <div className="step-indicator mx-auto mb-4">{step.num}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                <span className="text-xs text-primary/80 font-medium">{step.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
