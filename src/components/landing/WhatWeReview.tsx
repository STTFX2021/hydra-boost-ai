import { motion } from "framer-motion";
import {
  MessageCircle,
  PhoneOff,
  UserPlus,
  CalendarClock,
  Workflow,
  Bot,
} from "lucide-react";

const ITEMS = [
  { icon: MessageCircle, title: "Atención al cliente", desc: "Cómo respondes consultas y cuántas se quedan sin contestar." },
  { icon: PhoneOff, title: "WhatsApp y llamadas perdidas", desc: "Qué oportunidades se escapan fuera de horario o en horas punta." },
  { icon: UserPlus, title: "Captación de leads", desc: "Cómo entran tus contactos desde web, redes y publicidad." },
  { icon: CalendarClock, title: "Reservas y citas", desc: "Cómo se agendan, recuerdan y reprograman tus citas." },
  { icon: Workflow, title: "Seguimiento comercial", desc: "Qué pasa entre 'primer contacto' y 'cliente que paga'." },
  { icon: Bot, title: "Automatización con IA", desc: "Procesos repetitivos automatizables con n8n, Supabase, Vapi y agentes IA." },
];

export const WhatWeReview = () => {
  return (
    <section className="section-padding bg-muted/10">
      <div className="section-container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Qué revisamos en tu negocio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En la auditoría gratuita analizamos seis áreas concretas para detectar dónde pierdes
            tiempo y clientes — y qué se puede automatizar primero.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
