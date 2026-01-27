import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Sparkles, Copy, CheckCircle, ArrowLeft, 
  User, Building2, AlertTriangle, Target, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EmailGeneratorProps {
  onBack: () => void;
}

interface EmailForm {
  clientName: string;
  clientBusiness: string;
  problem: string;
  objective: string;
}

const problemTemplates = [
  { id: "pricing", label: "No quiere bajar el precio", icon: "💰" },
  { id: "timing", label: "Dice que no es el momento", icon: "⏰" },
  { id: "competitor", label: "Está comparando con competencia", icon: "🔄" },
  { id: "trust", label: "No confía en la tecnología", icon: "🤖" },
  { id: "budget", label: "Excede su presupuesto", icon: "📊" },
  { id: "custom", label: "Otro problema específico", icon: "✍️" },
];

export function EmailGenerator({ onBack }: EmailGeneratorProps) {
  const [step, setStep] = useState<"form" | "generating" | "result">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<EmailForm>({
    clientName: "",
    clientBusiness: "",
    problem: "",
    objective: "",
  });

  const generateEmail = useCallback(async () => {
    if (!form.clientName || !form.problem) {
      toast.error("Completa al menos el nombre y el problema");
      return;
    }

    setStep("generating");
    setIsLoading(true);

    try {
      const prompt = `Actúa como Alex, Senior Solutions Architect & Business Strategist de HydrAI Labs. 
Escribe un email de ventas persuasivo para este cliente:

- Nombre: ${form.clientName}
- Negocio: ${form.clientBusiness || "No especificado"}
- Problema/Objeción: ${form.problem}
- Objetivo: ${form.objective || "Cerrar la venta de automatización IA"}

INSTRUCCIONES:
1. Usa tu lógica de ingeniero para validar el problema técnicamente
2. Combínala con persuasión comercial orientada a ROI
3. Estructura: Gancho técnico → Diagnóstico → Solución → Beneficio comercial → CTA
4. Tono: Profesional, directo, sin palabras vacías
5. Incluye datos o métricas específicas cuando sea posible
6. Cierra con una pregunta que invite a la acción
7. Máximo 200 palabras

Genera SOLO el email, sin explicaciones adicionales.`;

      const { data, error } = await supabase.functions.invoke("navigator-chat", {
        body: {
          messages: [{ role: "user", content: prompt }],
          context: { mode: "email_generator" },
        },
      });

      if (error) throw error;

      setGeneratedEmail(data?.content || "Error generando el email. Inténtalo de nuevo.");
      setStep("result");
    } catch (error) {
      console.error("Email generation error:", error);
      toast.error("Error al generar el email");
      setStep("form");
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      toast.success("Email copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Error al copiar");
    }
  }, [generatedEmail]);

  const resetForm = () => {
    setForm({ clientName: "", clientBusiness: "", problem: "", objective: "" });
    setGeneratedEmail("");
    setStep("form");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/30">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <motion.div 
          className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-accent/30 to-secondary/20 flex items-center justify-center border border-accent/40"
          animate={{ boxShadow: ["0 0 10px rgba(255,0,150,0.3)", "0 0 20px rgba(255,0,150,0.5)", "0 0 10px rgba(255,0,150,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Mail className="w-5 h-5 text-accent" />
        </motion.div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">Email Generator</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
              ALEX AI
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono">
            Emails de ventas con lógica de ingeniero + persuasión comercial
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 overflow-y-auto space-y-4"
          >
            {/* Client Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4 text-primary" />
                Nombre del cliente *
              </label>
              <Input
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                placeholder="Ej: Carlos García"
                className="bg-background/60 border-border/50"
              />
            </div>

            {/* Business */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Building2 className="w-4 h-4 text-primary" />
                Tipo de negocio
              </label>
              <Input
                value={form.clientBusiness}
                onChange={(e) => setForm({ ...form, clientBusiness: e.target.value })}
                placeholder="Ej: Clínica dental, Restaurante..."
                className="bg-background/60 border-border/50"
              />
            </div>

            {/* Problem Templates */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Problema / Objeción *
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {problemTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setForm({ ...form, problem: template.label })}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      form.problem === template.label
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="mr-1">{template.icon}</span>
                    {template.label}
                  </button>
                ))}
              </div>
              <Textarea
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                placeholder="Describe la objeción o problema específico..."
                className="bg-background/60 border-border/50 min-h-[60px]"
              />
            </div>

            {/* Objective */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Target className="w-4 h-4 text-success" />
                Objetivo del email
              </label>
              <Input
                value={form.objective}
                onChange={(e) => setForm({ ...form, objective: e.target.value })}
                placeholder="Ej: Agendar llamada, Cerrar venta..."
                className="bg-background/60 border-border/50"
              />
            </div>

            <Button
              onClick={generateEmail}
              disabled={!form.clientName || !form.problem}
              className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generar Email con Alex
            </Button>
          </motion.div>
        )}

        {step === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 flex items-center justify-center mb-4"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255,0,150,0.3)",
                  "0 0 40px rgba(255,0,150,0.5)",
                  "0 0 20px rgba(255,0,150,0.3)"
                ],
                rotate: [0, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </motion.div>
            <p className="text-sm text-muted-foreground font-mono">
              Alex está redactando tu email...
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Combinando lógica técnica + persuasión comercial
            </p>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="bg-muted/30 rounded-xl border border-border/50 p-4">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-xs font-mono text-accent">EMAIL GENERADO</span>
                  <div className="flex-1" />
                  <span className="text-[10px] text-success font-mono">✓ LISTO</span>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {generatedEmail}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Nuevo Email
              </Button>
              <Button
                onClick={copyToClipboard}
                className="flex-1 bg-gradient-to-r from-primary to-cyan-500"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
