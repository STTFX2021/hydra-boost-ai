import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

const DEMOS = [
  {
    id: "restaurante",
    label: "🍽️ Restaurante",
    messages: [
      { role: "user" as const, content: "Hola, quiero reservar mesa para 4 personas el sábado" },
      { role: "bot" as const, content: "¡Hola! 👋 Perfecto, mesa para 4 el sábado. ¿Tienes preferencia de horario? Tenemos disponibilidad a las 14:00, 14:30 y 21:00." },
      { role: "user" as const, content: "A las 21:00 por favor" },
      { role: "bot" as const, content: "✅ Reserva confirmada: Sábado 21:00, 4 personas. ¿Algún comensal tiene alergias o intolerancias? Te mando recordatorio 2h antes 📱" },
    ],
  },
  {
    id: "clinica",
    label: "💊 Clínica",
    messages: [
      { role: "user" as const, content: "Buenos días, necesito cita con el dermatólogo" },
      { role: "bot" as const, content: "Buenos días 👋 Te ayudo con la cita de dermatología. Tenemos disponibilidad: Martes 10:00, Miércoles 16:30, Jueves 11:00. ¿Cuál te viene mejor?" },
      { role: "user" as const, content: "El miércoles a las 16:30" },
      { role: "bot" as const, content: "✅ Cita confirmada: Miércoles 16:30 - Dermatología. Te envío recordatorio 24h antes. ¿Es tu primera visita? Si es así, te envío el formulario previo 📋" },
    ],
  },
  {
    id: "salon",
    label: "💇 Salón",
    messages: [
      { role: "user" as const, content: "Hola! Quiero pedir cita para corte y color" },
      { role: "bot" as const, content: "¡Hola! 💇‍♀️ Corte + color, perfecto. ¿Con qué estilista prefieres? María (especialista en color), Carlos (corte creativo) o sin preferencia." },
      { role: "user" as const, content: "Con María por favor" },
      { role: "bot" as const, content: "María tiene hueco el jueves a las 11:00 y el viernes a las 16:00. Duración estimada: 2h. ¿Cuál prefieres? ✨" },
    ],
  },
];

export const SectorDemos = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const demo = DEMOS.find(d => d.id === activeDemo);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Demos en Vivo
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Mira cómo responde el chatbot en tu sector
          </h2>
          <p className="text-lg text-muted-foreground">Haz clic en tu sector para ver una conversación real</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {DEMOS.map((d) => (
            <motion.button
              key={d.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveDemo(activeDemo === d.id ? null : d.id)}
              className={`px-6 py-3 rounded-xl border text-sm font-semibold transition-all ${
                activeDemo === d.id
                  ? "bg-primary/15 border-primary/40 text-foreground"
                  : "bg-card border-border/40 text-muted-foreground hover:border-primary/30"
              }`}
            >
              {d.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {demo && (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="card-premium p-0 overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, hsl(190 100% 50% / 0.15), hsl(260 60% 55% / 0.1))' }}>
                  <div className="flex items-center gap-2 text-foreground">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Demo: {demo.label}</span>
                  </div>
                  <button onClick={() => setActiveDemo(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {demo.messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
