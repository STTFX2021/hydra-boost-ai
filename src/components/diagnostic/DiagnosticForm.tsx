import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Users, Database, BarChart3, 
  AlertTriangle, Target, Loader2, CheckCircle2, Calendar,
  TrendingUp, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DiagnosticResults } from "./DiagnosticResults";

interface DiagnosticFormProps {
  onComplete?: () => void;
}

const questions = [
  {
    id: "focus",
    icon: Users,
    title: "¿En qué área tu equipo pierde más tiempo manualmente?",
    options: [
      { id: "customer_service", label: "Atención al Cliente", icon: "💬" },
      { id: "appointments", label: "Gestión de Citas", icon: "📅" },
      { id: "lead_tracking", label: "Seguimiento de Leads", icon: "👤" },
      { id: "admin_tasks", label: "Tareas Administrativas", icon: "📋" },
    ],
  },
  {
    id: "infrastructure",
    icon: Database,
    title: "¿Dónde gestionas tus clientes hoy?",
    options: [
      { id: "crm_pro", label: "CRM Profesional", icon: "💼" },
      { id: "excel", label: "Excel / Papel", icon: "📊" },
      { id: "whatsapp", label: "WhatsApp / Email", icon: "📱" },
      { id: "none", label: "No tengo sistema", icon: "❌" },
    ],
  },
  {
    id: "volume",
    icon: BarChart3,
    title: "¿Cuántos leads o consultas recibes al mes?",
    options: [
      { id: "low", label: "Menos de 20", icon: "📉" },
      { id: "medium", label: "20 - 100", icon: "📈" },
      { id: "high", label: "Más de 100", icon: "🚀" },
    ],
  },
  {
    id: "pain_point",
    icon: AlertTriangle,
    title: "¿Cuántas ventas pierdes por no responder al instante?",
    options: [
      { id: "few", label: "Pocas", icon: "✅" },
      { id: "some", label: "Un 20-50%", icon: "⚠️" },
      { id: "many", label: "Más del 50%", icon: "🔥" },
      { id: "need_247", label: "Necesito respuesta 24/7", icon: "🌙" },
    ],
  },
  {
    id: "objective",
    icon: Target,
    title: "¿Cuál es tu prioridad principal?",
    options: [
      { id: "reduce_costs", label: "Reducir costes", icon: "💰" },
      { id: "scale_sales", label: "Escalar ventas", icon: "📈" },
      { id: "support_247", label: "Soporte 24/7", icon: "🤖" },
    ],
  },
];

export function DiagnosticForm({ onComplete }: DiagnosticFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", business: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const totalSteps = questions.length + 1; // +1 for contact info
  const progress = ((step + 1) / totalSteps) * 100;
  const isContactStep = step === questions.length;

  const calculateScore = useCallback(() => {
    let baseScore = 75;

    // Volume increases score
    if (answers.volume === "high") baseScore += 10;
    else if (answers.volume === "medium") baseScore += 5;

    // Pain point severity
    if (answers.pain_point === "many" || answers.pain_point === "need_247") baseScore += 10;
    else if (answers.pain_point === "some") baseScore += 5;

    // Infrastructure (less organized = more potential)
    if (answers.infrastructure === "none") baseScore += 5;
    else if (answers.infrastructure === "excel" || answers.infrastructure === "whatsapp") baseScore += 3;

    return Math.min(baseScore, 95);
  }, [answers]);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    const currentQuestion = questions[step];
    if (!isContactStep && !answers[currentQuestion.id]) {
      toast.error("Selecciona una opción");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!contactInfo.name || !contactInfo.email) {
      toast.error("Completa nombre y email");
      return;
    }

    setIsSubmitting(true);
    const finalScore = calculateScore();

    try {
      // Save lead
      const { data: lead, error: leadError } = await supabase.from("leads").insert({
        name: contactInfo.name.trim(),
        email: contactInfo.email.trim(),
        business_name: contactInfo.business || null,
        source: "diagnostic-premium",
        score: finalScore,
        status: "new",
        vertical: answers.focus,
        tags: [answers.objective, answers.infrastructure].filter(Boolean),
      }).select().single();

      if (leadError) throw leadError;

      // Save assessment
      await supabase.from("assessments").insert({
        lead_id: lead.id,
        payload_json: { ...answers, ...contactInfo },
        score: finalScore,
        priority: finalScore >= 80 ? "high" : finalScore >= 60 ? "medium" : "low",
        recommendations_text: JSON.stringify(answers),
      });

      setScore(finalScore);
      setShowResults(true);
      onComplete?.();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) {
    return <DiagnosticResults score={score} answers={answers} contactInfo={contactInfo} />;
  }

  const currentQuestion = questions[step];
  const CurrentIcon = isContactStep ? CheckCircle2 : currentQuestion?.icon;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground">
            Paso {step + 1} de {totalSteps}
          </span>
          <span className="text-xs font-mono text-primary">
            {Math.round(progress)}% completado
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <motion.div
        className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 shadow-xl"
        style={{
          boxShadow: "0 0 40px rgba(0, 200, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border border-primary/30">
                <CurrentIcon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg md:text-xl font-display font-bold text-foreground">
                {isContactStep
                  ? "¿Dónde te enviamos el diagnóstico?"
                  : currentQuestion.title}
              </h2>
            </div>

            {/* Options or Contact Form */}
            {isContactStep ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Tu nombre *</label>
                  <Input
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Carlos García"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Email *</label>
                  <Input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Nombre del negocio (opcional)</label>
                  <Input
                    value={contactInfo.business}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, business: e.target.value }))}
                    placeholder="Ej: Clínica Dental García"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelect(currentQuestion.id, option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-4 rounded-xl border text-left transition-all duration-200
                      ${answers[currentQuestion.id] === option.id
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,200,255,0.2)]"
                        : "border-border/50 hover:border-primary/50 bg-muted/20"
                      }
                    `}
                  >
                    <span className="text-2xl block mb-2">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="border-border/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              ) : (
                <div />
              )}

              {isContactStep ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !contactInfo.name || !contactInfo.email}
                  className="bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      Obtener diagnóstico
                      <Zap className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-success" />
          +500 diagnósticos
        </span>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-primary" />
          Resultados en 2 min
        </span>
      </div>
    </div>
  );
}
