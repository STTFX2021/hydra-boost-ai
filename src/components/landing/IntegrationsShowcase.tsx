import { motion } from "framer-motion";

const INTEGRATIONS = [
  { name: "OpenAI", icon: "🤖", category: "IA" },
  { name: "n8n", icon: "⚙️", category: "Automatización" },
  { name: "Supabase", icon: "🗄️", category: "Backend" },
  { name: "WhatsApp", icon: "💬", category: "Mensajería" },
  { name: "Resend", icon: "📧", category: "Email" },
  { name: "Google Calendar", icon: "📅", category: "Agenda" },
  { name: "Gmail", icon: "✉️", category: "Email" },
  { name: "Stripe", icon: "💳", category: "Pagos" },
  { name: "Webhooks", icon: "🔗", category: "APIs" },
  { name: "CRM", icon: "👥", category: "Ventas" },
  { name: "Make", icon: "🔄", category: "Automatización" },
  { name: "Apify", icon: "🕷️", category: "Scraping" },
  { name: "HeyGen", icon: "🎬", category: "Vídeo IA" },
  { name: "Anthropic", icon: "🧠", category: "IA" },
  { name: "Discord", icon: "💜", category: "Notificaciones" },
  { name: "Vercel", icon: "▲", category: "Deploy" },
];

export const IntegrationsShowcase = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, hsl(190 100% 50% / 0.04), transparent 60%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            🔌 Stack Tecnológico
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Integraciones que <span className="text-gradient-hydrai">potencian tu negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conectamos las mejores herramientas del mercado en un sistema unificado que trabaja por ti 24/7
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {INTEGRATIONS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border/30 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-default"
              style={{
                boxShadow: "0 2px 8px hsl(0 0% 0% / 0.15)",
              }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {item.name}
              </span>
              <span className="text-[10px] text-muted-foreground/70">{item.category}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 h-px mx-auto max-w-lg"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.3), hsl(260 60% 55% / 0.2), transparent)",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-4"
        >
          + más de 200 integraciones disponibles vía API
        </motion.p>
      </div>
    </section>
  );
};
