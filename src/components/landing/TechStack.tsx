import { motion } from "framer-motion";
import { useLandingTranslation } from "@/lib/i18n";

const technologies = [
  { name: "n8n", icon: "🔗", desc: "Orquestación de workflows" },
  { name: "Make", icon: "🔧", desc: "Integración de apps sin código" },
  { name: "Supabase", icon: "🗄️", desc: "Backend & base de datos" },
  { name: "OpenAI", icon: "🤖", desc: "Modelos de lenguaje" },
  { name: "Anthropic", icon: "🧠", desc: "IA avanzada" },
  { name: "HeyGen", icon: "🎬", desc: "Vídeos con avatares IA" },
  { name: "Flow", icon: "⚡", desc: "Automatización de flujos visuales" },
  { name: "AntiGravity", icon: "🚀", desc: "Generación de contenido IA" },
  { name: "Ollama", icon: "🤖", desc: "Modelos LLM locales y privados" },
  { name: "Discord", icon: "💬", desc: "Notificaciones en tiempo real" },
];

export const TechStack = () => {
  const { landing } = useLandingTranslation();
  const t = landing.techStack;

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
            {t.title}
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
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default"
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
