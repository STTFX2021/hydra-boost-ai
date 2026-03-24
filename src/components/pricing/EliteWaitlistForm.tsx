import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, CheckCircle2, Loader2, Building2, Users, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Language } from "@/lib/i18n";

interface EliteWaitlistFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
}

const sectors = {
  es: [
    "Restauración / Hostelería",
    "Inmobiliaria",
    "Clínica / Salud",
    "E-commerce / Retail",
    "Servicios Profesionales",
    "Educación / Formación",
    "Tecnología / SaaS",
    "Otro",
  ],
  en: [
    "Restaurant / Hospitality",
    "Real Estate",
    "Clinic / Healthcare",
    "E-commerce / Retail",
    "Professional Services",
    "Education / Training",
    "Technology / SaaS",
    "Other",
  ],
};

const teamSizes = [
  "1-5",
  "6-15",
  "16-50",
  "51-100",
  "100+",
];

export const EliteWaitlistForm = ({ open, onOpenChange, language }: EliteWaitlistFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "",
    teamSize: "",
    challenge: "",
  });

  const t = {
    title: language === 'es' ? 'Solicitud de Acceso Elite' : 'Elite Access Request',
    subtitle: language === 'es' 
      ? 'Completa el formulario para unirte a nuestra lista de espera exclusiva'
      : 'Complete the form to join our exclusive waitlist',
    name: language === 'es' ? 'Nombre completo' : 'Full name',
    email: language === 'es' ? 'Email corporativo' : 'Corporate email',
    company: language === 'es' ? 'Empresa' : 'Company',
    sector: language === 'es' ? 'Sector' : 'Industry',
    sectorPlaceholder: language === 'es' ? 'Selecciona tu sector' : 'Select your industry',
    teamSize: language === 'es' ? 'Tamaño del equipo' : 'Team size',
    teamSizePlaceholder: language === 'es' ? 'Selecciona' : 'Select',
    challenge: language === 'es' ? '¿Cuál es tu mayor reto operativo?' : 'What is your biggest operational challenge?',
    challengePlaceholder: language === 'es' 
      ? 'Describe brevemente el problema que quieres resolver con automatización...'
      : 'Briefly describe the problem you want to solve with automation...',
    submit: language === 'es' ? 'Solicitar Acceso' : 'Request Access',
    successTitle: language === 'es' ? '¡Solicitud Enviada!' : 'Request Sent!',
    successMessage: language === 'es'
      ? 'Revisaremos tu solicitud y te contactaremos en 24-48h para evaluar si Elite es el programa adecuado para tu empresa.'
      : 'We will review your request and contact you within 24-48h to evaluate if Elite is the right program for your company.',
    close: language === 'es' ? 'Cerrar' : 'Close',
    required: language === 'es' ? 'Campo requerido' : 'Required field',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company || !formData.sector || !formData.teamSize) {
      toast.error(t.required);
      return;
    }

    setIsSubmitting(true);

    try {
      const eliteMessage = `[ELITE WAITLIST]\nEmpresa: ${formData.company}\nSector: ${formData.sector}\nEquipo: ${formData.teamSize}\nReto: ${formData.challenge}`;

      // Save to leads table with elite tag
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        business_name: formData.company,
        vertical: formData.sector,
        source: "elite_waitlist",
        tags: ["elite", "waitlist", `team_${formData.teamSize}`],
      });

      if (error) throw error;

      // Save full details + send notifications in parallel
      await Promise.allSettled([
        supabase.from("contact_submissions").insert({
          name: formData.name,
          email: formData.email,
          message: eliteMessage,
        }),
        supabase.functions.invoke("lead-intake", {
          body: {
            nombre: formData.name,
            email: formData.email,
            tipo_negocio: formData.sector,
            mensaje: eliteMessage,
            fuente: "elite_waitlist",
            pagina: window.location.href,
          },
        }),
      ]);

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting elite waitlist:", error);
      toast.error(language === 'es' ? 'Error al enviar. Inténtalo de nuevo.' : 'Error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", company: "", sector: "", teamSize: "", challenge: "" });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border-accent/30 p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
            >
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    HydrAI Elite
                  </span>
                </div>
                <DialogTitle className="text-2xl font-display">{t.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {t.subtitle}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="elite-name" className="text-sm font-medium">
                      {t.name} *
                    </Label>
                    <Input
                      id="elite-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-muted/30 border-border/50 focus:border-accent"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="elite-email" className="text-sm font-medium">
                      {t.email} *
                    </Label>
                    <Input
                      id="elite-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-muted/30 border-border/50 focus:border-accent"
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="elite-company" className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    {t.company} *
                  </Label>
                  <Input
                    id="elite-company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-muted/30 border-border/50 focus:border-accent"
                    required
                  />
                </div>

                {/* Sector & Team Size row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      {t.sector} *
                    </Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(value) => setFormData({ ...formData, sector: value })}
                    >
                      <SelectTrigger className="bg-muted/30 border-border/50 focus:border-accent">
                        <SelectValue placeholder={t.sectorPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors[language].map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {t.teamSize} *
                    </Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                    >
                      <SelectTrigger className="bg-muted/30 border-border/50 focus:border-accent">
                        <SelectValue placeholder={t.teamSizePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} {language === 'es' ? 'personas' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Challenge */}
                <div className="space-y-2">
                  <Label htmlFor="elite-challenge" className="text-sm font-medium">
                    {t.challenge}
                  </Label>
                  <Textarea
                    id="elite-challenge"
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder={t.challengePlaceholder}
                    className="bg-muted/30 border-border/50 focus:border-accent min-h-[80px] resize-none"
                    rows={3}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon text-base py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === 'es' ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {t.submit}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </motion.div>
              
              <h3 className="text-2xl font-display font-bold mb-3">{t.successTitle}</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {t.successMessage}
              </p>
              
              <Button onClick={handleClose} variant="outline" className="btn-outline-neon">
                {t.close}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
