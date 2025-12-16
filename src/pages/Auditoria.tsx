import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowRight, ArrowLeft, Zap, CheckCircle2, 
  Building2, MapPin, MessageSquare, AlertCircle,
  Clock, Send, Info
} from "lucide-react";

const verticals = [
  { id: "restaurante", label: "Restaurante / Cafetería / Hostelería", icon: "🍽️" },
  { id: "clinica", label: "Clínica (Fisio/Dental/Podología/Salud)", icon: "🏥" },
  { id: "taller", label: "Taller Mecánico / Neumáticos", icon: "🚗" },
  { id: "peluqueria", label: "Peluquería / Barbería / Estética", icon: "✂️" },
  { id: "inmobiliaria", label: "Inmobiliaria / Alquiler Vacacional", icon: "🏢" },
  { id: "servicios-domicilio", label: "Servicios a Domicilio (limpieza, reformas...)", icon: "🏠" },
  { id: "otro", label: "Otro tipo de negocio", icon: "📦" },
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
  { id: "trafico", label: "Poco tráfico / visibilidad online", icon: "📉" },
];

const steps = [
  { title: "Tipo de negocio", icon: Building2 },
  { title: "Ubicación", icon: MapPin },
  { title: "Canales", icon: MessageSquare },
  { title: "Problema", icon: AlertCircle },
  { title: "Tiempo", icon: Clock },
  { title: "Contacto", icon: Send },
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
    businessName: "",
    channels: [] as string[],
    mainProblem: "",
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
    
    // Channels (max 30) - more channels = more opportunity
    score += Math.min(formData.channels.length * 6, 30);

    // Hours per week (max 30) - more hours = more need for automation
    const hours = parseInt(formData.hoursPerWeek) || 0;
    if (hours >= 20) score += 30;
    else if (hours >= 10) score += 25;
    else if (hours >= 5) score += 15;
    else score += 10;

    // Problem type (max 20)
    if (["mensajes", "tiempo", "reservas"].includes(formData.mainProblem)) score += 20;
    else if (["no-shows", "leads"].includes(formData.mainProblem)) score += 18;
    else score += 12;

    // Vertical bonus (max 20)
    if (["clinica", "restaurante", "peluqueria"].includes(formData.vertical)) score += 20;
    else if (["taller", "inmobiliaria"].includes(formData.vertical)) score += 15;
    else score += 10;

    return Math.min(score, 100);
  };

  const getRecommendations = (score: number) => {
    const recs: string[] = [];

    // Always recommend web if they don't have one
    if (!formData.channels.includes("web")) {
      recs.push("Web Presencia IA-Ready: Tu negocio necesita presencia online profesional para captar clientes 24/7");
    }

    if (formData.channels.includes("whatsapp") || formData.channels.includes("instagram")) {
      recs.push("Web + Chatbot 24/7: Automatiza respuestas en WhatsApp/Instagram con IA");
    }
    
    if (formData.mainProblem === "no-shows" || formData.mainProblem === "reservas") {
      recs.push("Automatiza tu Agenda: Sistema de reservas con recordatorios anti no-show");
    }
    
    if (formData.mainProblem === "resenas") {
      recs.push("Reputación Autopilot: Solicita reseñas automáticamente tras cada servicio");
    }
    
    if (formData.mainProblem === "leads" || formData.mainProblem === "trafico") {
      recs.push("Captura de Leads: Convierte visitantes en clientes con formularios inteligentes");
    }
    
    if (formData.mainProblem === "mensajes" || formData.mainProblem === "tiempo") {
      recs.push("Chatbot IA 24/7: Responde preguntas frecuentes automáticamente");
    }

    if (score >= 60) {
      recs.push("Plan Mantenimiento: Optimización continua de tu web y automatizaciones");
    }

    if (recs.length === 0) {
      recs.push("Diagnóstico personalizado: Tu caso requiere análisis detallado con un experto");
    }

    return recs.slice(0, 4);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const score = calculateScore();
    const priority = score >= 70 ? "high" : score >= 50 ? "medium" : "low";
    const recommendations = getRecommendations(score);

    let dataWasSaved = false;
    let notificationFailed = false;

    try {
      // Step 1: Create lead
      const { data: lead, error: leadError } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        business_name: formData.businessName || formData.city,
        city: formData.city,
        vertical: formData.vertical,
        source: "audit",
        score,
        status: "new",
      }).select().single();

      if (leadError) {
        console.error("Lead insert error:", leadError);
        throw leadError;
      }

      // Step 2: Create assessment
      const { error: assessmentError } = await supabase.from("assessments").insert({
        lead_id: lead.id,
        payload_json: formData,
        score,
        priority,
        recommendations_text: recommendations.join("\n"),
      });

      if (assessmentError) {
        console.error("Assessment insert error:", assessmentError);
        throw assessmentError;
      }

      dataWasSaved = true;

      // Step 3: Trigger notification (best-effort)
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

      setResult({ score, priority, recommendations });
      setShowResults(true);
      
      if (notificationFailed) {
        toast.success("¡Auditoría guardada!");
      } else {
        toast.success("¡Auditoría completada!");
      }

    } catch (error: any) {
      console.error("Audit submission error:", error);

      if (!dataWasSaved) {
        try {
          const { error: fallbackError } = await supabase.from("contact_submissions").insert({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone?.trim() || null,
            message: `[AUDIT] Vertical: ${formData.vertical}, City: ${formData.city}, Problem: ${formData.mainProblem}, Score: ${score}`,
          });

          if (fallbackError) {
            toast.error("Error al guardar. Por favor contacta directamente.");
          } else {
            setResult({ score, priority, recommendations });
            setShowResults(true);
            toast.warning("Tu auditoría se ha guardado. Te contactaremos pronto.");
          }
        } catch {
          toast.error("Error crítico. Por favor contacta directamente.");
        }
      } else {
        setResult({ score, priority, recommendations });
        setShowResults(true);
        toast.warning("Auditoría guardada.");
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <h3 className="text-xl font-display font-bold mb-6">¿Dónde está tu negocio?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nombre del negocio (opcional)</label>
                <Input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Ej: Peluquería María"
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Ciudad / Zona *</label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ej: Madrid, Barcelona, Valencia..."
                  className="input-premium"
                />
              </div>
            </div>
            
            {/* Info box about reputation */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">En la auditoría revisaremos tu reputación online</p>
                  <p className="text-xs text-muted-foreground">
                    Analizaremos tu presencia en Google, reseñas, rating y ticket medio estimado para proponerte mejoras personalizadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
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

      case 3:
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

      case 4:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Cuántas horas semanales dedicas a atender mensajes y llamadas?</h3>
            <Input
              type="number"
              min="0"
              value={formData.hoursPerWeek}
              onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
              placeholder="Ej: 10"
              className="input-premium text-lg"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Incluye tiempo en teléfono, WhatsApp, redes sociales, email...
            </p>
          </div>
        );

      case 5:
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
      case 2: return formData.channels.length > 0;
      case 3: return !!formData.mainProblem;
      case 4: return !!formData.hoursPerWeek;
      case 5: return !!formData.name && !!formData.email;
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
