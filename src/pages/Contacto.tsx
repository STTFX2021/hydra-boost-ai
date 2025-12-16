import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Send, MessageCircle, Mail, MapPin, Clock, ArrowRight, Zap
} from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().optional(),
  message: z.string().trim().min(10, "Mensaje muy corto").max(1000),
});

const Contacto = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        message: formData.message.trim(),
      });

      if (error) throw error;

      // Send notification
      try {
        await supabase.functions.invoke('send-lead-notification', {
          body: {
            type: 'contact',
            data: {
              name: formData.name.trim(),
              email: formData.email.trim(),
              phone: formData.phone?.trim(),
              message: formData.message.trim(),
            }
          }
        });
      } catch (notifError) {
        console.error("Notification error:", notifError);
      }

      toast.success("¡Mensaje enviado! Te responderemos pronto.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            <p className="text-lg text-muted-foreground mb-8">
              Respondemos en menos de 24h. Sin compromisos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding -mt-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-premium">
                <h2 className="text-xl font-display font-bold mb-6">Envíanos un mensaje</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono (opcional)</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 634 425 921"
                      className="input-premium"
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
                      maxLength={1000}
                    />
                  </div>

                  <Button type="submit" className="btn-neon w-full" disabled={loading}>
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

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp */}
              <a
                href="https://wa.me/34634425921"
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition">
                  <MessageCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">+34 634 425 921</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition" />
              </a>

              {/* Email */}
              <a
                href="mailto:hola@hydrailabs.com"
                className="card-premium flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-muted-foreground">hola@hydrailabs.com</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition" />
              </a>

              {/* Location */}
              <div className="card-premium flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold">Ubicación</h4>
                  <p className="text-sm text-muted-foreground">100% Remoto (España)</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="card-premium flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold">Tiempo de respuesta</h4>
                  <p className="text-sm text-muted-foreground">&lt; 24 horas laborables</p>
                </div>
              </div>

              {/* CTA */}
              <div className="card-premium neon-border text-center p-6">
                <h4 className="font-display font-semibold mb-2">¿Prefieres una auditoría?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Descubre gratis cómo la IA puede ayudarte.
                </p>
                <a href="/auditoria">
                  <Button className="btn-neon w-full">
                    Auditoría gratuita
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contacto;
