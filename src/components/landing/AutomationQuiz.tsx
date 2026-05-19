import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const COPY = {
  es: {
    badge: "Quiz Rápido",
    title: "¿Cuánto puedes automatizar?",
    sub: "3 preguntas → resultado instantáneo",
    automatable: "automatizable",
    result: (s: number) => <>Tu negocio puede automatizar el <span className="font-bold text-foreground">{s}%</span> de sus operaciones repetitivas</>,
    cta: "Auditoría gratuita",
    retry: "Repetir",
    steps: [
      { question: "¿Qué tipo de negocio tienes?", options: [
        { label: "🍽️ Restaurante / Hostelería", value: "restaurant", score: 85 },
        { label: "💊 Clínica / Centro de salud", value: "clinic", score: 80 },
        { label: "🏠 Inmobiliaria", value: "real_estate", score: 90 },
        { label: "💪 Gimnasio / Fitness", value: "gym", score: 75 },
      ]},
      { question: "¿Cuántos empleados tienes?", options: [
        { label: "👤 Solo yo", value: "1", score: 60 },
        { label: "👥 2-5 personas", value: "2_5", score: 75 },
        { label: "👥👥 6-20 personas", value: "6_20", score: 85 },
        { label: "🏢 +20 personas", value: "20_plus", score: 95 },
      ]},
      { question: "¿Cuál es tu mayor dolor?", options: [
        { label: "📞 No puedo responder todo", value: "responses", score: 90 },
        { label: "📉 Pierdo clientes por falta de seguimiento", value: "followup", score: 85 },
        { label: "⏰ Paso demasiado tiempo en tareas repetitivas", value: "time", score: 80 },
        { label: "📊 No tengo datos de mi negocio", value: "data", score: 70 },
      ]},
    ],
  },
  en: {
    badge: "Quick Quiz",
    title: "How much can you automate?",
    sub: "3 questions → instant result",
    automatable: "automatable",
    result: (s: number) => <>Your business can automate <span className="font-bold text-foreground">{s}%</span> of its repetitive operations</>,
    cta: "Free audit",
    retry: "Retry",
    steps: [
      { question: "What kind of business do you run?", options: [
        { label: "🍽️ Restaurant / Hospitality", value: "restaurant", score: 85 },
        { label: "💊 Clinic / Health center", value: "clinic", score: 80 },
        { label: "🏠 Real estate", value: "real_estate", score: 90 },
        { label: "💪 Gym / Fitness", value: "gym", score: 75 },
      ]},
      { question: "How many employees do you have?", options: [
        { label: "👤 Just me", value: "1", score: 60 },
        { label: "👥 2-5 people", value: "2_5", score: 75 },
        { label: "👥👥 6-20 people", value: "6_20", score: 85 },
        { label: "🏢 +20 people", value: "20_plus", score: 95 },
      ]},
      { question: "What is your biggest pain?", options: [
        { label: "📞 Can't respond to everything", value: "responses", score: 90 },
        { label: "📉 Losing clients from lack of follow-up", value: "followup", score: 85 },
        { label: "⏰ Too much time on repetitive tasks", value: "time", score: 80 },
        { label: "📊 No data on my business", value: "data", score: 70 },
      ]},
    ],
  },
  de: {
    badge: "Schnelles Quiz",
    title: "Wie viel können Sie automatisieren?",
    sub: "3 Fragen → sofortiges Ergebnis",
    automatable: "automatisierbar",
    result: (s: number) => <>Ihr Unternehmen kann <span className="font-bold text-foreground">{s}%</span> der wiederkehrenden Aufgaben automatisieren</>,
    cta: "Kostenloses Audit",
    retry: "Neu starten",
    steps: [
      { question: "Welche Art von Unternehmen führen Sie?", options: [
        { label: "🍽️ Restaurant / Gastronomie", value: "restaurant", score: 85 },
        { label: "💊 Klinik / Gesundheitszentrum", value: "clinic", score: 80 },
        { label: "🏠 Immobilien", value: "real_estate", score: 90 },
        { label: "💪 Fitnessstudio", value: "gym", score: 75 },
      ]},
      { question: "Wie viele Mitarbeiter haben Sie?", options: [
        { label: "👤 Nur ich", value: "1", score: 60 },
        { label: "👥 2-5 Personen", value: "2_5", score: 75 },
        { label: "👥👥 6-20 Personen", value: "6_20", score: 85 },
        { label: "🏢 +20 Personen", value: "20_plus", score: 95 },
      ]},
      { question: "Was ist Ihr größtes Problem?", options: [
        { label: "📞 Kann nicht auf alles antworten", value: "responses", score: 90 },
        { label: "📉 Verliere Kunden ohne Follow-up", value: "followup", score: 85 },
        { label: "⏰ Zu viel Zeit für Routineaufgaben", value: "time", score: 80 },
        { label: "📊 Keine Daten zu meinem Geschäft", value: "data", score: 70 },
      ]},
    ],
  },
  ru: {
    badge: "Быстрый тест",
    title: "Сколько можно автоматизировать?",
    sub: "3 вопроса → мгновенный результат",
    automatable: "автоматизируемо",
    result: (s: number) => <>Ваш бизнес может автоматизировать <span className="font-bold text-foreground">{s}%</span> повторяющихся операций</>,
    cta: "Бесплатный аудит",
    retry: "Пройти заново",
    steps: [
      { question: "Какой у вас бизнес?", options: [
        { label: "🍽️ Ресторан / Hostelería", value: "restaurant", score: 85 },
        { label: "💊 Клиника / Медцентр", value: "clinic", score: 80 },
        { label: "🏠 Недвижимость", value: "real_estate", score: 90 },
        { label: "💪 Спортзал / Фитнес", value: "gym", score: 75 },
      ]},
      { question: "Сколько у вас сотрудников?", options: [
        { label: "👤 Только я", value: "1", score: 60 },
        { label: "👥 2-5 человек", value: "2_5", score: 75 },
        { label: "👥👥 6-20 человек", value: "6_20", score: 85 },
        { label: "🏢 более 20 человек", value: "20_plus", score: 95 },
      ]},
      { question: "Какая ваша главная боль?", options: [
        { label: "📞 Не успеваю отвечать всем", value: "responses", score: 90 },
        { label: "📉 Теряю клиентов из-за отсутствия follow-up", value: "followup", score: 85 },
        { label: "⏰ Много времени уходит на рутину", value: "time", score: 80 },
        { label: "📊 Нет данных по моему бизнесу", value: "data", score: 70 },
      ]},
    ],
  },
};

// Fix typo in RU labels
COPY.ru.steps[0].options[0].label = "🍽️ Ресторан / Хостелерия";

export const AutomationQuiz = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    if (step < t.steps.length - 1) setStep(step + 1);
    else setCompleted(true);
  };

  const totalScore = Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1));
  const progress = ((step + (completed ? 1 : 0)) / t.steps.length) * 100;

  const reset = () => { setStep(0); setScores([]); setCompleted(false); };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.sub}</p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>

          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <h3 className="text-xl font-semibold text-center mb-6">{t.steps[step].question}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {t.steps[step].options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(opt.score)}
                      className="p-4 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                    >
                      <span className="text-2xl block mb-2">{opt.label.split(" ")[0]}</span>
                      <span className="text-sm font-medium">{opt.label.split(" ").slice(1).join(" ")}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                <div className="relative w-48 h-48 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <motion.circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${totalScore * 2.51} ${251 - totalScore * 2.51}`}
                      initial={{ strokeDasharray: "0 251" }}
                      animate={{ strokeDasharray: `${totalScore * 2.51} ${251 - totalScore * 2.51}` }}
                      transition={{ duration: 1.5, ease: "easeOut" }} />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--success))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span className="text-4xl font-bold text-gradient-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      {totalScore}%
                    </motion.span>
                    <span className="text-xs text-muted-foreground">{t.automatable}</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground">{t.result(totalScore)}</p>

                <div className="flex gap-3 justify-center">
                  <Link to="/auditoria-gratis">
                    <Button size="lg" className="btn-neon group">
                      {t.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={reset}>
                    <RotateCcw className="w-4 h-4 mr-2" /> {t.retry}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
