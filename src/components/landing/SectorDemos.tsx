import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const COPY = {
  es: {
    badge: "Demos en Vivo",
    title: "Mira cómo responde el chatbot en tu sector",
    sub: "Haz clic en tu sector para ver una conversación real",
    demoLabel: "Demo",
    demos: [
      { id: "restaurante", label: "🍽️ Restaurante", messages: [
        { role: "user", content: "Hola, quiero reservar mesa para 4 personas el sábado" },
        { role: "bot", content: "¡Hola! 👋 Perfecto, mesa para 4 el sábado. ¿Tienes preferencia de horario? Tenemos disponibilidad a las 14:00, 14:30 y 21:00." },
        { role: "user", content: "A las 21:00 por favor" },
        { role: "bot", content: "✅ Reserva confirmada: Sábado 21:00, 4 personas. ¿Algún comensal tiene alergias o intolerancias? Te mando recordatorio 2h antes 📱" },
      ]},
      { id: "clinica", label: "💊 Clínica", messages: [
        { role: "user", content: "Buenos días, necesito cita con el dermatólogo" },
        { role: "bot", content: "Buenos días 👋 Te ayudo con la cita de dermatología. Tenemos disponibilidad: Martes 10:00, Miércoles 16:30, Jueves 11:00. ¿Cuál te viene mejor?" },
        { role: "user", content: "El miércoles a las 16:30" },
        { role: "bot", content: "✅ Cita confirmada: Miércoles 16:30 - Dermatología. Te envío recordatorio 24h antes. ¿Es tu primera visita? Si es así, te envío el formulario previo 📋" },
      ]},
      { id: "salon", label: "💇 Salón", messages: [
        { role: "user", content: "Hola! Quiero pedir cita para corte y color" },
        { role: "bot", content: "¡Hola! 💇‍♀️ Corte + color, perfecto. ¿Con qué estilista prefieres? María (especialista en color), Carlos (corte creativo) o sin preferencia." },
        { role: "user", content: "Con María por favor" },
        { role: "bot", content: "María tiene hueco el jueves a las 11:00 y el viernes a las 16:00. Duración estimada: 2h. ¿Cuál prefieres? ✨" },
      ]},
    ],
  },
  en: {
    badge: "Live Demos",
    title: "See how the chatbot responds in your sector",
    sub: "Click on your sector to see a real conversation",
    demoLabel: "Demo",
    demos: [
      { id: "restaurante", label: "🍽️ Restaurant", messages: [
        { role: "user", content: "Hi, I'd like to book a table for 4 on Saturday" },
        { role: "bot", content: "Hi! 👋 Perfect, table for 4 on Saturday. Any preferred time? We have 14:00, 14:30 and 21:00 available." },
        { role: "user", content: "21:00 please" },
        { role: "bot", content: "✅ Reservation confirmed: Saturday 21:00, 4 guests. Any allergies or dietary restrictions? I'll send a reminder 2h before 📱" },
      ]},
      { id: "clinica", label: "💊 Clinic", messages: [
        { role: "user", content: "Good morning, I need a dermatology appointment" },
        { role: "bot", content: "Good morning 👋 I'll help you book a dermatology slot. Available: Tuesday 10:00, Wednesday 16:30, Thursday 11:00. Which works for you?" },
        { role: "user", content: "Wednesday at 16:30" },
        { role: "bot", content: "✅ Appointment confirmed: Wednesday 16:30 - Dermatology. I'll remind you 24h before. First visit? I'll send the intake form 📋" },
      ]},
      { id: "salon", label: "💇 Salon", messages: [
        { role: "user", content: "Hi! I'd like to book a cut and color" },
        { role: "bot", content: "Hi! 💇‍♀️ Cut + color, perfect. Which stylist? María (color specialist), Carlos (creative cuts) or no preference." },
        { role: "user", content: "With María please" },
        { role: "bot", content: "María has Thursday at 11:00 and Friday at 16:00. Estimated 2h. Which works? ✨" },
      ]},
    ],
  },
  de: {
    badge: "Live-Demos",
    title: "Sehen Sie, wie der Chatbot in Ihrer Branche antwortet",
    sub: "Klicken Sie auf Ihre Branche, um ein echtes Gespräch zu sehen",
    demoLabel: "Demo",
    demos: [
      { id: "restaurante", label: "🍽️ Restaurant", messages: [
        { role: "user", content: "Hallo, ich möchte am Samstag einen Tisch für 4 reservieren" },
        { role: "bot", content: "Hallo! 👋 Gerne, Tisch für 4 am Samstag. Bevorzugte Uhrzeit? Wir haben 14:00, 14:30 und 21:00 frei." },
        { role: "user", content: "21:00 bitte" },
        { role: "bot", content: "✅ Reservierung bestätigt: Samstag 21:00, 4 Personen. Allergien oder Unverträglichkeiten? Erinnerung 2h vorher 📱" },
      ]},
      { id: "clinica", label: "💊 Klinik", messages: [
        { role: "user", content: "Guten Morgen, ich brauche einen Dermatologen-Termin" },
        { role: "bot", content: "Guten Morgen 👋 Verfügbar: Dienstag 10:00, Mittwoch 16:30, Donnerstag 11:00. Was passt?" },
        { role: "user", content: "Mittwoch 16:30" },
        { role: "bot", content: "✅ Termin bestätigt: Mittwoch 16:30 - Dermatologie. Erinnerung 24h vorher. Erstbesuch? Ich schicke das Formular 📋" },
      ]},
      { id: "salon", label: "💇 Salon", messages: [
        { role: "user", content: "Hallo! Ich möchte Schnitt und Farbe buchen" },
        { role: "bot", content: "Hallo! 💇‍♀️ Schnitt + Farbe, perfekt. Welche Stylistin? María (Farb-Spezialistin), Carlos (kreative Schnitte) oder egal." },
        { role: "user", content: "Mit María bitte" },
        { role: "bot", content: "María hat Donnerstag 11:00 und Freitag 16:00 frei. Ca. 2h. Was passt? ✨" },
      ]},
    ],
  },
  ru: {
    badge: "Демо в реальном времени",
    title: "Посмотрите, как чат-бот отвечает в вашей отрасли",
    sub: "Нажмите на свою отрасль, чтобы увидеть реальный диалог",
    demoLabel: "Демо",
    demos: [
      { id: "restaurante", label: "🍽️ Ресторан", messages: [
        { role: "user", content: "Здравствуйте, хочу забронировать столик на 4 человек в субботу" },
        { role: "bot", content: "Здравствуйте! 👋 Конечно, столик на 4 в субботу. Удобное время? Есть свободно: 14:00, 14:30 и 21:00." },
        { role: "user", content: "На 21:00, пожалуйста" },
        { role: "bot", content: "✅ Бронь подтверждена: суббота, 21:00, 4 человека. Есть аллергии или ограничения? Напомню за 2 часа 📱" },
      ]},
      { id: "clinica", label: "💊 Клиника", messages: [
        { role: "user", content: "Добрый день, нужна запись к дерматологу" },
        { role: "bot", content: "Добрый день 👋 Помогу записаться. Свободно: вторник 10:00, среда 16:30, четверг 11:00. Что удобнее?" },
        { role: "user", content: "Среда 16:30" },
        { role: "bot", content: "✅ Запись подтверждена: среда, 16:30 — Дерматология. Напомню за 24 ч. Первый визит? Пришлю анкету 📋" },
      ]},
      { id: "salon", label: "💇 Салон", messages: [
        { role: "user", content: "Здравствуйте! Хочу записаться на стрижку и окрашивание" },
        { role: "bot", content: "Здравствуйте! 💇‍♀️ Стрижка + окрашивание — отлично. К какому мастеру: Мария (специалист по цвету), Карлос (креативная стрижка) или без предпочтений?" },
        { role: "user", content: "К Марии, пожалуйста" },
        { role: "bot", content: "У Марии свободно: четверг 11:00 и пятница 16:00. Длительность ~2 ч. Что удобнее? ✨" },
      ]},
    ],
  },
};

export const SectorDemos = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const demo = t.demos.find(d => d.id === activeDemo);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.sub}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {t.demos.map((d) => (
            <motion.button key={d.id} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActiveDemo(activeDemo === d.id ? null : d.id)}
              className={`px-6 py-3 rounded-xl border text-sm font-semibold transition-all ${
                activeDemo === d.id ? "bg-primary/15 border-primary/40 text-foreground" : "bg-card border-border/40 text-muted-foreground hover:border-primary/30"
              }`}>
              {d.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {demo && (
            <motion.div key={demo.id} initial={{ opacity: 0, y: 20, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }} className="max-w-md mx-auto">
              <div className="card-premium p-0 overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, hsl(190 100% 50% / 0.15), hsl(260 60% 55% / 0.1))' }}>
                  <div className="flex items-center gap-2 text-foreground">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">{t.demoLabel}: {demo.label}</span>
                  </div>
                  <button onClick={() => setActiveDemo(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {demo.messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"
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
