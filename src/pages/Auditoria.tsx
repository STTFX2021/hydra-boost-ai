import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowRight, ArrowLeft, Zap, CheckCircle2, 
  Building2, MapPin, Star, MessageSquare, AlertCircle,
  DollarSign, Clock, Send
} from "lucide-react";
import { z } from "zod";

const verticals = [
  { id: "peluqueria", label: "Peluquería / Barbería / Estética", icon: "✂️" },
  { id: "clinica", label: "Clínica (Fisio/Dental/Podología)", icon: "🏥" },
  { id: "taller", label: "Taller Mecánico / Neumáticos", icon: "🚗" },
  { id: "restaurante", label: "Restaurante / Hostelería", icon: "🍽️" },
  { id: "servicios-domicilio", label: "Servicios a Domicilio", icon: "🏠" },
  { id: "inmobiliaria", label: "Inmobiliaria / Alquiler", icon: "🏢" },
  { id: "otro", label: "Otro", icon: "📦" },
];

const channels = [
  { id: "telefono", label: "Teléfono", icon: "📞" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "facebook", label: "Facebook", icon: "👍" },
  { id: "email", label: "Email", icon: "✉️" },
  { id: "web", label: "Formulario web", icon: "🌐" },
];

const problems = [
  { id: "no-shows", label: "No-shows / Citas perdidas", icon: "❌" },
  { id: "mensajes", label: "Demasiados mensajes sin responder", icon: "💬" },
  { id: "reservas", label: "Dificultad para gestionar reservas", icon: "📅" },
  { id: "leads", label: "Pérdida de leads / clientes potenciales", icon: "👤" },
  { id: "resenas", label: "Pocas reseñas online", icon: "⭐" },
  { id: "tiempo", label: "Falta de tiempo para atender", icon: "⏰" },
];

const steps = [
  { title: "Tipo de negocio", icon: Building2 },
  { title: "Ubicación", icon: MapPin },
  { title: "Reputación", icon: Star },
  { title: "Canales", icon: MessageSquare },
  { title: "Problema", icon: AlertCircle },
  { title: "Negocio", icon: DollarSign },
  { title: "Resultados", icon: CheckCircle2 },
];

const Auditoria = () => {
  const [searchParams] = useSearchParams();
  const preselectedVertical = searchParams.get("vertical");

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<{ score: number; priority: string; recommendations: string[] } | null>(null);

  const [formData, setFormData] = useState({
    vertical: preselectedVertical || "",
    city: "",
    rating: "",
    reviewCount: "",
    channels: [] as string[],
    mainProblem: "",
    avgTicket: "",
    hoursPerWeek: "",
    name: "",
    email: "",
    phone: "",
  });

  const toggleChannel = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(id)
        ? prev.channels.filter((c) => c !== id)
        : [...prev.channels, id],
    }));
  };

  const calculateScore = () => {
    let score = 0;
    
    // Rating (max 25)
    const rating = parseFloat(formData.rating);
    if (rating >= 4.5) score += 25;
    else if (rating >= 4) score += 20;
    else if (rating >= 3.5) score += 15;
    else score += 10;

    // Review count (max 25)
    const reviews = parseInt(formData.reviewCount);
    if (reviews >= 100) score += 25;
    else if (reviews >= 50) score += 20;
    else if (reviews >= 20) score += 15;
    else score += 10;

    // Channels (max 25) - more channels = more opportunity
    score += Math.min(formData.channels.length * 5, 25);

    // Ticket value (max 25)
    const ticket = parseInt(formData.avgTicket);
    if (ticket >= 100) score += 25;
    else if (ticket >= 50) score += 20;
    else if (ticket >= 25) score += 15;
    else score += 10;

    return score;
  };

  const getRecommendations = (score: number) => {
    const recs: string[] = [];

    if (formData.channels.includes("whatsapp") || formData.channels.includes("instagram")) {
      recs.push("AI Recepcionista: Automatiza respuestas en WhatsApp/Instagram 24/7");
    }
    if (formData.mainProblem === "no-shows") {
      recs.push("Sistema Anti No-Show: Recordatorios automáticos que reducen hasta 80% las citas perdidas");
    }
    if (formData.mainProblem === "resenas" || parseFloat(formData.rating) < 4.5) {
      recs.push("Reputación Autopilot: Aumenta tus reseñas 5 estrellas automáticamente");
    }
    if (formData.mainProblem === "leads") {
      recs.push("Lead Capture: Captura y cualifica leads desde redes sin perder ninguno");
    }
    if (formData.mainProblem === "reservas") {
      recs.push("Sistema de Reservas: Citas online integradas con recordatorios");
    }
    if (score >= 70) {
      recs.push("Dashboard KPI: Visibilidad total de tu negocio con métricas en tiempo real");
    }

    if (recs.length === 0) {
      recs.push("Diagnóstico personalizado: Tu caso necesita análisis detallado con un experto");
    }

    return recs;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const score = calculateScore();
    const priority = score >= 70 ? "high" : score >= 50 ? "medium" : "low";
    const recommendations = getRecommendations(score);

    let leadId: string | null = null;
    let dataWasSaved = false;
    let notificationFailed = false;

    try {
      // Step 1: Create lead (primary data save)
      const { data: lead, error: leadError } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        business_name: formData.city,
        city: formData.city,
        vertical: formData.vertical,
        source: "audit",
        score,
        status: "new",
      }).select().single();

      if (leadError) {
        console.error("Lead insert error:", { 
          code: leadError.code, 
          message: leadError.message, 
          details: leadError.details 
        });
        throw leadError;
      }

      leadId = lead.id;

      // Step 2: Create assessment
      const { error: assessmentError } = await supabase.from("assessments").insert({
        lead_id: lead.id,
        payload_json: formData,
        score,
        priority,
        recommendations_text: recommendations.join("\n"),
      });

      if (assessmentError) {
        console.error("Assessment insert error:", { 
          code: assessmentError.code, 
          message: assessmentError.message, 
          details: assessmentError.details 
        });
        throw assessmentError;
      }

      dataWasSaved = true;

      // Step 3: Trigger notification (best-effort, non-blocking)
      try {
        const { error: notifyError } = await supabase.functions.invoke("send-lead-notification", {
          body: {
            type: "assessment",
            data: {
              name: formData.name.trim(),
              email: formData.email.trim(),
              phone: formData.phone?.trim() || null,
              vertical: formData.vertical,
              score,
              priority,
              recommendations: recommendations.join("\n"),
            },
          },
        });

        if (notifyError) {
          console.warn("Notification failed (non-blocking):", notifyError);
          notificationFailed = true;
        }
      } catch (notifyError: any) {
        console.warn("Notification error (non-blocking):", notifyError?.message || notifyError);
        notificationFailed = true;
      }

      // Success
      setResult({ score, priority, recommendations });
      setShowResults(true);
      
      if (notificationFailed) {
        toast.success("¡Auditoría guardada! (Notificación interna pendiente)");
      } else {
        toast.success("¡Auditoría completada!");
      }

    } catch (error: any) {
      console.error("Audit submission error:", {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
      });

      // Fallback: save to contact_submissions if lead/assessment failed
      if (!dataWasSaved) {
        try {
          const { error: fallbackError } = await supabase.from("contact_submissions").insert({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone?.trim() || null,
            message: `[AUDIT FALLBACK] Vertical: ${formData.vertical}, City: ${formData.city}, Score: ${score}, Priority: ${priority}, Recommendations: ${recommendations.join("; ")}`,
          });

          if (fallbackError) {
            console.error("Fallback save error:", fallbackError);
            toast.error("Error al guardar. Por favor contacta directamente.");
          } else {
            console.log("Data saved to contact_submissions as fallback");
            setResult({ score, priority, recommendations });
            setShowResults(true);
            toast.warning("Tu auditoría se ha guardado (modo alternativo). Te contactaremos pronto.");
          }
        } catch (fallbackErr) {
          console.error("Fallback critical error:", fallbackErr);
          toast.error("Error crítico. Por favor contacta directamente.");
        }
      } else {
        // Data was saved but something else failed - show results anyway
        setResult({ score, priority, recommendations });
        setShowResults(true);
        toast.warning("Auditoría guardada, pero hubo un problema menor.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Qué tipo de negocio tienes?</h3>
            <div className="grid grid-cols-2 gap-3">
              {verticals.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setFormData({ ...formData, vertical: v.id })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.vertical === v.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl block mb-1">{v.icon}</span>
                  <span className="text-sm">{v.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Dónde está ubicado tu negocio?</h3>
            <Input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Ej: Madrid, Barcelona, Valencia..."
              className="input-premium"
            />
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Cuál es tu reputación online?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Rating en Google</label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  placeholder="Ej: 4.5"
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Número de reseñas</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.reviewCount}
                  onChange={(e) => setFormData({ ...formData, reviewCount: e.target.value })}
                  placeholder="Ej: 50"
                  className="input-premium"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Qué canales usas actualmente?</h3>
            <p className="text-sm text-muted-foreground mb-4">Selecciona todos los que apliquen</p>
            <div className="grid grid-cols-2 gap-3">
              {channels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleChannel(c.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.channels.includes(c.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-xl block mb-1">{c.icon}</span>
                  <span className="text-sm">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Cuál es tu principal problema?</h3>
            <div className="space-y-3">
              {problems.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setFormData({ ...formData, mainProblem: p.id })}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    formData.mainProblem === p.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Cuéntanos más sobre tu negocio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Ticket medio (€)</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.avgTicket}
                  onChange={(e) => setFormData({ ...formData, avgTicket: e.target.value })}
                  placeholder="Ej: 35"
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Horas semanales atendiendo mensajes/llamadas</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.hoursPerWeek}
                  onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                  placeholder="Ej: 10"
                  className="input-premium"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Dónde te enviamos los resultados?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Tu nombre *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre"
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Teléfono (opcional)</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+34 600 000 000"
                  className="input-premium"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!formData.vertical;
      case 1: return !!formData.city;
      case 2: return !!formData.rating && !!formData.reviewCount;
      case 3: return formData.channels.length > 0;
      case 4: return !!formData.mainProblem;
      case 5: return !!formData.avgTicket;
      case 6: return !!formData.name && !!formData.email;
      default: return true;
    }
  };

  if (showResults && result) {
    return (
      <PageLayout>
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <div className="card-premium neon-border text-center p-8 mb-8">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-display font-bold text-gradient-primary">{result.score}</span>
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">Tu Puntuación de Automatización</h2>
                <div className={`badge-${result.priority === "high" ? "success" : result.priority === "medium" ? "warning" : "destructive"} inline-flex mt-2`}>
                  Prioridad {result.priority === "high" ? "Alta" : result.priority === "medium" ? "Media" : "Baja"}
                </div>
              </div>

              <div className="card-premium mb-8">
                <h3 className="text-xl font-display font-bold mb-4">Recomendaciones Personalizadas</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacto">
                  <Button size="lg" className="btn-neon">
                    Reservar llamada
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="btn-outline-neon">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false}>
      <section className="min-h-screen flex items-center section-padding">
        <div className="section-container w-full">
          <div className="max-w-xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Paso {currentStep + 1} de {steps.length}</span>
                <span className="text-sm text-primary font-medium">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="card-premium mb-8">
              {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Anterior
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  className="btn-neon"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                >
                  Siguiente
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  className="btn-neon"
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                >
                  {loading ? "Procesando..." : "Ver resultados"}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Auditoria;
