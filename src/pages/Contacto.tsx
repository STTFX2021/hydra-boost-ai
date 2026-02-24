import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, Mail, MapPin, Clock, ArrowRight, Zap } from "lucide-react";
import { z } from "zod";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().min(10, "Mensaje muy corto").max(2000),
});

const Contacto = () => {
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: si un bot lo rellena, “ok” silencioso (no le das señal)
    if (honeypot.trim().length > 0) {
      toast.success("¡Mensaje enviado! Te responderemos pronto.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setHoneypot("");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      message: formData.message.trim(),
    };

    const validation = contactSchema.safeParse(payload);
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message ?? "Revisa los datos del formulario");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-submit", {
        body: {
          ...validation.data,
          website: honeypot, // honeypot field
          page: typeof window !== "undefined" ? window.location.pathname : "/contacto",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      });

      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error || "Error al enviar");

      toast.success("¡Mensaje enviado! Te responderemos pronto.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setHoneypot("");
    } catch (err: any) {
      console.error("Contact submit error:", err);
      toast.error("No se pudo enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contacto | HydrAI Labs"
        description="Contacta con HydrAI Labs. Respondemos en menos de 24h. Cuéntanos tu proyecto y te ayudamos a automatizar tu negocio con IA. Sin compromiso."
        canonical="/contacto"
        keywords="contacto hydrailabs, consulta ia, presupuesto chatbot, agencia automatizacion contacto"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" },
        ]}
      />

      <PageLayout>
        {/* Hero */}
        <section className="relative section-padding overflow-hidden">
          <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="badge-primary mb-6 inline-flex">
                <Zap className="w-3 h-3 mr-1" /> Contacto
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Hablemos de tu <span className="text-gradient-primary">proyecto</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">Respondemos en menos de 24h. Sin compromisos.</p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section id="contacto" className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
              {/* Formulario */}
              <div className="lg:col-span-3">
                <div className="card-elevated card-elevated-hover p-6">
                  <h2 className="text-xl font-display font-bold mb-6">Envíanos un mensaje</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot anti-spam - invisible to users */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre *</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Tu nombre"
                          className="input-premium"
                          required
                          maxLength={100}
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tu@email.com"
                          className="input-premium"
                          required
                          maxLength={255}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Teléfono (opcional)</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="input-premium"
                        maxLength={50}
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mensaje *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                        className="input-premium min-h-[150px]"
                        required
                        maxLength={2000}
                        disabled={loading}
                      />
                    </div>

                    <Button type="submit" className="btn-neon btn-depth w-full" disabled={loading}>
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          Enviar mensaje
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Info de contacto */}
              <div className="lg:col-span-2 space-y-6">
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevated card-elevated-hover p-4 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 flex items-center justify-center group-hover:bg-[#5865F2]/20 transition">
                    <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Discord</h4>
                    <p className="text-sm text-muted-foreground">Únete a nuestra comunidad</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition" />
                </a>

                <a href="mailto:hola@hydrailabs.com" className="card-elevated card-elevated-hover p-4 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-sm text-muted-foreground">hola@hydrailabs.com</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition" />
                </a>

                <div className="card-elevated card-elevated-hover p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ubicación</h4>
                    <p className="text-sm text-muted-foreground">100% Remoto (España)</p>
                  </div>
                </div>

                <div className="card-elevated card-elevated-hover p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Tiempo de respuesta</h4>
                    <p className="text-sm text-muted-foreground">&lt; 24 horas laborables</p>
                  </div>
                </div>

                <div className="card-premium neon-border text-center p-6">
                  <h4 className="font-display font-semibold mb-2">¿Prefieres una auditoría?</h4>
                  <p className="text-sm text-muted-foreground mb-4">Descubre gratis cómo la IA puede ayudarte.</p>
                  <Link to="/auditoria">
                    <Button className="btn-neon btn-depth w-full">
                      Auditoría gratuita
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investor Hub CTA */}
        <section className="section-container mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-premium neon-border p-8 text-center">
              <div className="badge-accent mb-4 inline-flex">
                <Zap className="w-3 h-3 mr-1" /> Investor Hub
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">Investor Hub</h2>
              <p className="text-muted-foreground mb-6">
                Construimos sistemas con potencial de escala. Únete como partner.
              </p>
              <Link to="/inversores">
                <Button className="btn-neon btn-depth">
                  Acceder al Investor Hub
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Contacto;
