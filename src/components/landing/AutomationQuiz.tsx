import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QUIZ_STEPS = [
  {
    question: "¿Qué tipo de negocio tienes?",
    options: [
      { label: "🍽️ Restaurante / Hostelería", value: "restaurant", score: 85 },
      { label: "💊 Clínica / Centro de salud", value: "clinic", score: 80 },
      { label: "🏠 Inmobiliaria", value: "real_estate", score: 90 },
      { label: "💪 Gimnasio / Fitness", value: "gym", score: 75 },
    ],
  },
  {
    question: "¿Cuántos empleados tienes?",
    options: [
      { label: "👤 Solo yo", value: "1", score: 60 },
      { label: "👥 2-5 personas", value: "2_5", score: 75 },
      { label: "👥👥 6-20 personas", value: "6_20", score: 85 },
      { label: "🏢 +20 personas", value: "20_plus", score: 95 },
    ],
  },
  {
    question: "¿Cuál es tu mayor dolor?",
    options: [
      { label: "📞 No puedo responder todo", value: "responses", score: 90 },
      { label: "📉 Pierdo clientes por falta de seguimiento", value: "followup", score: 85 },
      { label: "⏰ Paso demasiado tiempo en tareas repetitivas", value: "time", score: 80 },
      { label: "📊 No tengo datos de mi negocio", value: "data", score: 70 },
    ],
  },
];

export const AutomationQuiz = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    if (step < QUIZ_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const totalScore = Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1));
  const progress = ((step + (completed ? 1 : 0)) / QUIZ_STEPS.length) * 100;

  const reset = () => {
    setStep(0);
    setScores([]);
    setCompleted(false);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quiz Rápido
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Cuánto puedes automatizar?
          </h2>
          <p className="text-lg text-muted-foreground">3 preguntas → resultado instantáneo</p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>

          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                <h3 className="text-xl font-semibold text-center mb-6">{QUIZ_STEPS[step].question}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {QUIZ_STEPS[step].options.map((opt) => (
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
                {/* Score Gauge */}
                <div className="relative w-48 h-48 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <motion.circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${totalScore * 2.51} ${251 - totalScore * 2.51}`}
                      initial={{ strokeDasharray: "0 251" }}
                      animate={{ strokeDasharray: `${totalScore * 2.51} ${251 - totalScore * 2.51}` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--success))" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-4xl font-bold text-gradient-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {totalScore}%
                    </motion.span>
                    <span className="text-xs text-muted-foreground">automatizable</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground">
                  Tu negocio puede automatizar el <span className="font-bold text-foreground">{totalScore}%</span> de sus operaciones repetitivas
                </p>

                <div className="flex gap-3 justify-center">
                  <Link to="/auditoria-gratis">
                    <Button size="lg" className="btn-neon group">
                      Auditoría gratuita
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={reset}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Repetir
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
