import { motion } from "framer-motion";
import { ArrowRight, Bot, Headphones, BarChart3, Settings, Scale, BrainCircuit, Mail, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AGENTS = [
  { icon: BarChart3, title: "Ventas", desc: "Captación y cualificación automática de leads", color: "from-primary/20 to-primary/5" },
  { icon: Headphones, title: "Atención al Cliente", desc: "Soporte 24/7 multicanal con IA conversacional", color: "from-secondary/20 to-secondary/5" },
  { icon: Mail, title: "Marketing", desc: "Campañas automatizadas y nurturing inteligente", color: "from-primary/15 to-secondary/10" },
  { icon: Settings, title: "Operaciones", desc: "Reservas, citas y gestión de procesos internos", color: "from-secondary/15 to-primary/10" },
  { icon: Users, title: "Recursos Humanos", desc: "Onboarding, screening y comunicación interna", color: "from-primary/20 to-primary/5" },
  { icon: Scale, title: "Legal & Compliance", desc: "Revisión documental y alertas normativas", color: "from-secondary/20 to-secondary/5" },
  { icon: BrainCircuit, title: "Conocimiento", desc: "Documentación inteligente y base de conocimiento", color: "from-primary/15 to-secondary/10" },
  { icon: Bot, title: "Automatización", desc: "Workflows complejos sin intervención humana", color: "from-secondary/15 to-primary/10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const AgentsTeaser = () => {
  return (
    <section className="section-padding relative overflow-hidden section-alt">
      <div className="glow-orb-secondary w-[500px] h-[500px] -top-48 -right-48 opacity-[0.05]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge-secondary mb-4 inline-flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" />
            Biblioteca de Agentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Agentes IA para <span className="text-gradient-hydrai">cada área de tu negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones modulares que se integran en tu operativa existente y empiezan a generar resultados desde el día 1
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {AGENTS.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl border border-border/40 p-6 transition-all duration-300 hover:border-primary/25 cursor-default overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 8%))",
                  boxShadow: "0 4px 20px hsl(0 0% 0% / 0.3)",
                }}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5">{agent.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/agentes-ia">
            <Button variant="outline" size="lg" className="btn-outline-neon group/btn">
              Explorar todos los agentes
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
