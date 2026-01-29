import { motion } from "framer-motion";

const technologies = [
  { name: "n8n", icon: "⚙️" },
  { name: "Supabase", icon: "🗄️" },
  { name: "OpenAI", icon: "🤖" },
  { name: "Anthropic", icon: "🧠" },
  { name: "Make", icon: "🔄" },
  { name: "Discord", icon: "💬" },
];

export const TechStack = () => {
  return (
    <section className="py-12 border-y border-border/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground">
            Construido con las Mejores Herramientas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="font-medium text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
