import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, WebPageSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowRight, ArrowLeft, Zap, CheckCircle2, 
  Building2, MapPin, MessageSquare, AlertCircle,
  Clock, Send, Info
} from "lucide-react";

// ... (contenido similar a Auditoria.tsx pero con URL /auditoria-gratis)

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

const AuditoriaGratis = () => {
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
    score += Math.min(formData.channels.length * 6, 30);
    const hours = parseInt(formData.hoursPerWeek) || 0;
    if (hours >= 20) score += 30;
    else if (hours >= 10) score += 25;
    else if (hours >= 5) score += 15;
    else score += 10;
    if (["mensajes", "tiempo", "reservas"].includes(formData.mainProblem)) score += 20;
    else if (["no-shows", "leads"].includes(formData.mainProblem)) score += 18;
    else score += 12;
    if (["clinica", "restaurante", "peluqueria"].includes(formData.vertical)) score += 20;
    else if (["taller", "inmobiliaria"].includes(formData.vertical)) score += 15;
    else score += 10;
    return Math.min(score, 100);
  };

  const getRecommendations = (score: number) => {
    const recs: string[] = [];
    if (!formData.channels.includes("web")) {
      recs.push("Web Presencia IA-Ready: Tu negocio necesita presencia online profesional");
    }
    if (formData.channels.includes("whatsapp") || formData.channels.includes("instagram")) {
      recs.push("Web + Chatbot 24/7: Automatiza respuestas en WhatsApp/Instagram con IA");
    }
    if (formData.mainProblem === "no-shows" || formData.mainProblem === "reservas") {
      recs.push("Automatiza tu Agenda: Sistema de reservas con recordatorios anti no-show");
    }
    if (formData.mainProblem === "resenas") {
      recs.push("Reputación Autopilot: Solicita reseñas automáticamente");
    }
    if (formData.mainProblem === "leads" || formData.mainProblem === "trafico") {
      recs.push("Captura de Leads: Convierte visitantes en clientes");
    }
    if (formData.mainProblem === "mensajes" || formData.mainProblem === "tiempo") {
      recs.push("Chatbot IA 24/7: Responde preguntas frecuentes automáticamente");
    }
    if (score >= 60) {
      recs.push("Plan Mantenimiento: Optimización continua");
    }
    if (recs.length === 0) {
      recs.push("Diagnóstico personalizado: Tu caso requiere análisis detallado");
    }
    return recs.slice(0, 4);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const score = calculateScore();
    const priority = score >= 70 ? "high" : score >= 50 ? "medium" : "low";
    const recommendations = getRecommendations(score);

    try {
      const { data: lead, error: leadError } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        business_name: formData.businessName || formData.city,
        city: formData.city,
        vertical: formData.vertical,
        source: "audit-gratis",
        score,
        status: "new",
      }).select().single();

      if (leadError) throw leadError;

      await supabase.from("assessments").insert({
        lead_id: lead.id,
        payload_json: formData,
        score,
        priority,
        recommendations_text: recommendations.join("\n"),
      });

      setResult({ score, priority, recommendations });
      setShowResults(true);
      toast.success("¡Auditoría completada!");
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar. Inténtalo de nuevo.");
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
                    formData.vertical === v.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
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
                  placeholder="Ej: Madrid, Barcelona..."
                  className="input-premium"
                />
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
                    formData.channels.includes(c.id) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
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
                    formData.mainProblem === p.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
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
            <h3 className="text-xl font-display font-bold mb-6">¿Cuántas horas semanales dedicas a atender mensajes?</h3>
            <Input
              type="number"
              min="0"
              value={formData.hoursPerWeek}
              onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
              placeholder="Ej: 10"
              className="input-premium text-lg"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-xl font-display font-bold mb-6">¿Dónde te enviamos los resultados?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Tu nombre *</label>
                <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-premium" required />
              </div>
              <div>
                <label className="block text-sm mb-2">Email *</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-premium" required />
              </div>
              <div>
                <label className="block text-sm mb-2">Teléfono (opcional)</label>
                <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-premium" />
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
        <SEOHead
          title="Resultado de tu Auditoría IA Gratuita"
          description="Descubre qué automatizaciones necesita tu negocio según tu puntuación personalizada."
          canonical="/auditoria-gratis"
          noindex
        />
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
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground mb-6">¿Quieres que te expliquemos el resultado?</p>
                <Link to="/contacto">
                  <Button className="btn-neon">
                    Hablar con un experto
                    <ArrowRight className="ml-2 w-4 h-4" />
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
    <PageLayout>
      <SEOHead
        title="Auditoría IA Gratuita - Descubre cómo Automatizar tu Negocio"
        description="Auditoría gratuita de 3 minutos para negocios locales. Descubre qué chatbots y automatizaciones necesitas para captar más clientes."
        canonical="/auditoria-gratis"
        keywords="auditoria ia gratis, automatizar negocio local, chatbot gratis, diagnostico ia negocio"
      />
      <WebPageSchema
        name="Auditoría IA Gratuita para Negocios"
        description="Descubre en 3 minutos qué automatizaciones necesita tu negocio."
        url="/auditoria-gratis"
      />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: '/' },
        { name: 'Auditoría Gratis', url: '/auditoria-gratis' }
      ]} />

      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> Gratis · 3 minutos
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Auditoría <span className="text-gradient-primary">IA Gratuita</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Descubre en 3 minutos cómo la IA puede transformar tu negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((step, i) => (
                <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i === currentStep ? "bg-primary text-primary-foreground" : i < currentStep ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
              ))}
            </div>

            <div className="card-premium neon-border p-8">
              {renderStep()}
              <div className="flex justify-between mt-8">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={() => setCurrentStep((s) => s - 1)}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Anterior
                  </Button>
                ) : <div />}
                {currentStep < steps.length - 1 ? (
                  <Button className="btn-neon" onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>
                    Siguiente <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button className="btn-neon" onClick={handleSubmit} disabled={!canProceed() || loading}>
                    {loading ? "Enviando..." : "Obtener diagnóstico"} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditoriaGratis;
