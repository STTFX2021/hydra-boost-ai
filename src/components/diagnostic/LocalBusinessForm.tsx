import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const sectors = [
  { id: "restaurante", label: "Restaurante / Bar", icon: "🍽️" },
  { id: "clinica", label: "Clínica / Centro de salud", icon: "🏥" },
  { id: "inmobiliaria", label: "Inmobiliaria / Agencia", icon: "🏠" },
  { id: "gimnasio", label: "Gimnasio / Centro fitness", icon: "💪" },
  { id: "peluqueria", label: "Peluquería / Estética", icon: "💈" },
  { id: "taller", label: "Taller / Mecánica", icon: "🚗" },
  { id: "academia", label: "Academia / Formación", icon: "🎓" },
  { id: "tienda", label: "Tienda / Comercio", icon: "🛍️" },
  { id: "otro", label: "Otro negocio local", icon: "📦" },
];

const volumeOptions = [
  { id: "low", label: "Menos de 20" },
  { id: "medium", label: "Entre 20 y 100" },
  { id: "high", label: "Más de 100" },
  { id: "unknown", label: "No lo sé" },
];

const problems = [
  { id: "manual_replies", label: "Respondo mensajes y llamadas manualmente todo el día", icon: "📞" },
  { id: "manual_bookings", label: "Gestiono las reservas o citas a mano y se me escapan", icon: "📅" },
  { id: "ghost_leads", label: "Tengo clientes que preguntan y luego no compran", icon: "👻" },
  { id: "old_web", label: "Mi web es antigua o no tengo web", icon: "🌐" },
  { id: "no_online_clients", label: "No consigo nuevos clientes por internet", icon: "📣" },
  { id: "no_whatsapp", label: "No estoy en WhatsApp Business o no lo aprovecho", icon: "💬" },
  { id: "no_social", label: "No tengo presencia en redes sociales", icon: "📸" },
  { id: "no_online_pay", label: "Pierdo ventas porque no cobro online", icon: "💸" },
];

const channels = [
  { id: "whatsapp", label: "WhatsApp", icon: "📱" },
  { id: "email", label: "Email", icon: "📧" },
  { id: "phone", label: "Teléfono", icon: "📞" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "facebook", label: "Facebook", icon: "📘" },
  { id: "web", label: "Web", icon: "🌐" },
  { id: "none", label: "Ninguno en concreto", icon: "" },
];

export function LocalBusinessForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    sector: "",
    city: "",
    volume: "",
    problems: [] as string[],
    channels: [] as string[],
    name: "",
    phone: "",
    email: "",
    business: "",
    message: "",
    privacy: false,
  });

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleArray = (field: "problems" | "channels", id: string) => {
    setFormData((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id] };
    });
  };

  const canAdvanceStep0 = formData.sector && formData.city.trim() && formData.volume;
  const canAdvanceStep1 = formData.problems.length > 0 && formData.channels.length > 0;
  const canSubmit = formData.name.trim() && formData.phone.trim() && formData.email.trim() && formData.business.trim() && formData.privacy;

  const N8N_WEBHOOK_URL = "https://hydrai.app.n8n.cloud/webhook/hydrai/lead";

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Completa todos los campos obligatorios.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Guardar lead en Supabase
      const { error: leadError } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        business_name: formData.business.trim(),
        city: formData.city.trim(),
        vertical: formData.sector,
        source: "auditoria-gratis",
        score: 70,
        status: "new",
        tags: [...formData.problems, ...formData.channels, `vol_${formData.volume}`],
      });

      if (leadError) throw leadError;

      // 2. Enviar al webhook de n8n (POST directo)
      try {
        const n8nPayload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          business_name: formData.business.trim(),
          sector: formData.sector,
          city: formData.city.trim(),
          message: formData.message.trim() || `Sector: ${formData.sector}, Ciudad: ${formData.city}, Problemas: ${formData.problems.join(", ")}`,
          problems: formData.problems,
          channels: formData.channels,
          volume: formData.volume,
          source: "auditoria-gratis",
          page: window.location.href,
        };

        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(n8nPayload),
        });

        if (!n8nResponse.ok) {
          console.error(`[auditoria-gratis] n8n webhook error: ${n8nResponse.status}`, await n8nResponse.text());
        }
      } catch (n8nErr) {
        console.error("[auditoria-gratis] n8n webhook call failed:", n8nErr);
      }

      setShowConfirmation(true);
    } catch (error) {
      console.error(error);
      toast.error(
        <div className="space-y-2">
          <p>Hubo un problema técnico. Contáctanos directamente en WhatsApp:</p>
          <a href="https://wa.me/34634425921" target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-[#25D366] text-white rounded-lg text-sm font-medium">
            Abrir WhatsApp →
          </a>
        </div>,
        { duration: 10000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto text-center py-12"
      >
        <span className="text-6xl block mb-6">✅</span>
        <h2 className="text-3xl font-display font-bold mb-4">¡Solicitud recibida!</h2>
        <p className="text-lg text-muted-foreground mb-2">
          Genial <span className="text-foreground font-semibold">{formData.name.split(" ")[0]}</span>.
          Estamos preparando tu informe personalizado.
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          Te contactamos por WhatsApp en menos de 24 horas.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Mientras tanto, puedes ver cómo hemos ayudado a otros negocios como el tuyo.
        </p>
        <Link to="/casos">
          <Button className="bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90">
            Ver casos de éxito
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground">Paso {step + 1} de {totalSteps}</span>
          <span className="text-xs font-mono text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <motion.div
        className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 shadow-xl"
        style={{ boxShadow: "0 0 40px rgba(0, 200, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.4)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* ─── STEP 0 ─── */}
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">Cuéntanos sobre tu negocio</h3>
                  <p className="text-sm text-muted-foreground mb-6">Sin tecnicismos. Solo lo básico.</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">¿A qué te dedicas?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {sectors.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setFormData((p) => ({ ...p, sector: s.id }))}
                        className={`p-3 rounded-xl border text-left text-sm transition-all ${
                          formData.sector === s.id
                            ? "border-primary bg-primary/10 shadow-[0_0_16px_rgba(0,200,255,0.15)]"
                            : "border-border/50 hover:border-primary/40 bg-muted/20"
                        }`}
                      >
                        <span className="text-lg block mb-1">{s.icon}</span>
                        <span className="text-xs">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">¿En qué ciudad estás?</p>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                    placeholder="Ej: Madrid, Barcelona, Sevilla..."
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">¿Cuántos clientes nuevos recibes al mes aproximadamente?</p>
                  <div className="flex flex-wrap gap-2">
                    {volumeOptions.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setFormData((p) => ({ ...p, volume: v.id }))}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                          formData.volume === v.id
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/40"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 1 ─── */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">¿Qué quieres mejorar?</h3>
                  <p className="text-sm text-muted-foreground mb-6">Puedes marcar varias opciones.</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">¿Cuál es tu mayor problema ahora mismo?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {problems.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => toggleArray("problems", p.id)}
                        className={`p-3 rounded-xl border text-left text-sm transition-all ${
                          formData.problems.includes(p.id)
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/40 bg-muted/20"
                        }`}
                      >
                        <span className="mr-2">{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">¿Qué canales usas ahora para comunicarte con clientes?</p>
                  <div className="flex flex-wrap gap-2">
                    {channels.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => toggleArray("channels", c.id)}
                        className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                          formData.channels.includes(c.id)
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/40"
                        }`}
                      >
                        {c.icon} {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 2 ─── */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">¿Dónde te enviamos el informe?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Te preparamos un informe gratuito con exactamente qué automatizaciones aplicar a tu negocio y cuánto podrías ahorrar.
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Nombre completo *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Ej: María García"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">WhatsApp o teléfono *</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="Ej: +34 612 345 678"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Te contactamos por WhatsApp para enviarte el informe. Sin spam.
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Ej: maria@mirestaurante.com"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Nombre de tu negocio *</label>
                  <Input
                    value={formData.business}
                    onChange={(e) => setFormData((p) => ({ ...p, business: e.target.value }))}
                    placeholder="Ej: Restaurante La Paella"
                    className="bg-background/60 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Mensaje opcional</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="¿Algo que quieras contarnos antes de la auditoría? (opcional)"
                    className="bg-background/60 border-border/50 focus:border-primary/50 min-h-[80px]"
                  />
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacy}
                    onCheckedChange={(v) => setFormData((p) => ({ ...p, privacy: v === true }))}
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    He leído y acepto la{" "}
                    <Link to="/privacidad" className="text-primary hover:underline" target="_blank">
                      política de privacidad
                    </Link>.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="border-border/50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={step === 0 ? !canAdvanceStep0 : !canAdvanceStep1}
                  className="bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canSubmit}
                  className="bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Quiero mi auditoría gratuita 🚀"
                  )}
                </Button>
              )}
            </div>

            {step === 2 && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Sin compromiso. Respuesta en menos de 24 horas. No es una llamada de ventas.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
