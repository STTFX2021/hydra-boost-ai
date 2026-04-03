import { motion } from "framer-motion";
import { useLandingTranslation } from "@/lib/i18n";

const TECHNOLOGIES = [
  { name: "n8n", icon: "⚙️" },
  { name: "Supabase", icon: "🗄️" },
  { name: "OpenAI", icon: "🤖" },
  { name: "Anthropic", icon: "🧠" },
  { name: "Make", icon: "🔄" },
  { name: "WhatsApp", icon: "💬" },
  { name: "Discord", icon: "🎮" },
  { name: "Vercel", icon: "▲" },
];

export const TrustBar = () => {
  const { language } = useLandingTranslation();

  const content = {
    es: { title: "Tecnologías que usamos para automatizar tu negocio" },
    en: { title: "Technologies we use to automate your business" },
    fr: { title: "Technologies que nous utilisons pour automatiser votre entreprise" },
    de: { title: "Technologien, die wir zur Automatisierung Ihres Unternehmens verwenden" },
    pt: { title: "Tecnologias que usamos para automatizar seu negócio" },
    it: { title: "Tecnologie che usiamo per automatizzare la tua azienda" },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <section className="py-12 border-y border-border/20 overflow-hidden">
      <div className="section-container">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8"
        >
          {t.title}
        </motion.p>

        {/* Infinite scroll effect */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -50 * TECHNOLOGIES.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-default shrink-0"
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className="font-medium text-sm whitespace-nowrap">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
