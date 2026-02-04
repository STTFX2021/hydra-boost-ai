import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2, Loader2, Lock, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLandingTranslation } from "@/lib/i18n";

interface LeadFormMultiStepProps {
  variant?: "inline" | "modal";
  onSuccess?: () => void;
}

export const LeadFormMultiStep = ({ variant = "inline", onSuccess }: LeadFormMultiStepProps) => {
  const { language } = useLandingTranslation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    business_name: "",
    vertical: "",
    phone: "",
    message: "",
  });

  const content = {
    es: {
      step1Title: "Agenda tu Diagnóstico IA Gratis",
      step1Subtitle: "Descubre cómo automatizar 10+ horas/semana en tu negocio",
      emailPlaceholder: "tu@email.com",
      continueBtn: "Continuar",
      step2Title: "Cuéntanos sobre tu negocio",
      namePlaceholder: "Tu nombre",
      businessPlaceholder: "Nombre de tu negocio",
      phonePlaceholder: "Teléfono (opcional)",
      industryPlaceholder: "Selecciona tu industria",
      industries: {
        restaurante: "Restaurante / Hostelería",
        clinica: "Clínica / Salud",
        ecommerce: "Ecommerce",
        servicios: "Servicios Profesionales",
        inmobiliaria: "Inmobiliaria",
        otro: "Otro",
      },
      messagePlaceholder: "¿Qué quieres automatizar? (opcional)",
      submitBtn: "Agendar Diagnóstico",
      privacyNote: "🔒 Tus datos están seguros. 0 spam.",
      successTitle: "¡Perfecto! 🎉",
      successMessage: "Te contactaremos en menos de 24h para agendar tu diagnóstico gratuito.",
      backBtn: "← Volver",
    },
    en: {
      step1Title: "Schedule Your Free AI Diagnosis",
      step1Subtitle: "Discover how to automate 10+ hours/week in your business",
      emailPlaceholder: "your@email.com",
      continueBtn: "Continue",
      step2Title: "Tell us about your business",
      namePlaceholder: "Your name",
      businessPlaceholder: "Business name",
      phonePlaceholder: "Phone (optional)",
      industryPlaceholder: "Select your industry",
      industries: {
        restaurante: "Restaurant / Hospitality",
        clinica: "Clinic / Health",
        ecommerce: "Ecommerce",
        servicios: "Professional Services",
        inmobiliaria: "Real Estate",
        otro: "Other",
      },
      messagePlaceholder: "What do you want to automate? (optional)",
      submitBtn: "Schedule Diagnosis",
      privacyNote: "🔒 Your data is safe. Zero spam.",
      successTitle: "Perfect! 🎉",
      successMessage: "We'll contact you within 24h to schedule your free diagnosis.",
      backBtn: "← Back",
    },
    fr: {
      step1Title: "Planifiez votre Diagnostic IA Gratuit",
      step1Subtitle: "Découvrez comment automatiser 10+ heures/semaine dans votre entreprise",
      emailPlaceholder: "votre@email.com",
      continueBtn: "Continuer",
      step2Title: "Parlez-nous de votre entreprise",
      namePlaceholder: "Votre nom",
      businessPlaceholder: "Nom de l'entreprise",
      phonePlaceholder: "Téléphone (optionnel)",
      industryPlaceholder: "Sélectionnez votre industrie",
      industries: {
        restaurante: "Restaurant / Hôtellerie",
        clinica: "Clinique / Santé",
        ecommerce: "E-commerce",
        servicios: "Services Professionnels",
        inmobiliaria: "Immobilier",
        otro: "Autre",
      },
      messagePlaceholder: "Que voulez-vous automatiser? (optionnel)",
      submitBtn: "Planifier le Diagnostic",
      privacyNote: "🔒 Vos données sont en sécurité. Zéro spam.",
      successTitle: "Parfait! 🎉",
      successMessage: "Nous vous contacterons dans les 24h pour planifier votre diagnostic gratuit.",
      backBtn: "← Retour",
    },
    de: {
      step1Title: "Planen Sie Ihre kostenlose KI-Diagnose",
      step1Subtitle: "Entdecken Sie, wie Sie 10+ Stunden/Woche in Ihrem Unternehmen automatisieren können",
      emailPlaceholder: "ihre@email.com",
      continueBtn: "Weiter",
      step2Title: "Erzählen Sie uns von Ihrem Unternehmen",
      namePlaceholder: "Ihr Name",
      businessPlaceholder: "Unternehmensname",
      phonePlaceholder: "Telefon (optional)",
      industryPlaceholder: "Wählen Sie Ihre Branche",
      industries: {
        restaurante: "Restaurant / Gastronomie",
        clinica: "Klinik / Gesundheit",
        ecommerce: "E-Commerce",
        servicios: "Professionelle Dienstleistungen",
        inmobiliaria: "Immobilien",
        otro: "Andere",
      },
      messagePlaceholder: "Was möchten Sie automatisieren? (optional)",
      submitBtn: "Diagnose planen",
      privacyNote: "🔒 Ihre Daten sind sicher. Kein Spam.",
      successTitle: "Perfekt! 🎉",
      successMessage: "Wir werden Sie innerhalb von 24 Stunden kontaktieren, um Ihre kostenlose Diagnose zu planen.",
      backBtn: "← Zurück",
    },
    pt: {
      step1Title: "Agende seu Diagnóstico IA Grátis",
      step1Subtitle: "Descubra como automatizar 10+ horas/semana no seu negócio",
      emailPlaceholder: "seu@email.com",
      continueBtn: "Continuar",
      step2Title: "Conte-nos sobre seu negócio",
      namePlaceholder: "Seu nome",
      businessPlaceholder: "Nome do negócio",
      phonePlaceholder: "Telefone (opcional)",
      industryPlaceholder: "Selecione sua indústria",
      industries: {
        restaurante: "Restaurante / Hospitalidade",
        clinica: "Clínica / Saúde",
        ecommerce: "E-commerce",
        servicios: "Serviços Profissionais",
        inmobiliaria: "Imobiliária",
        otro: "Outro",
      },
      messagePlaceholder: "O que você quer automatizar? (opcional)",
      submitBtn: "Agendar Diagnóstico",
      privacyNote: "🔒 Seus dados estão seguros. Zero spam.",
      successTitle: "Perfeito! 🎉",
      successMessage: "Entraremos em contato em menos de 24h para agendar seu diagnóstico gratuito.",
      backBtn: "← Voltar",
    },
    it: {
      step1Title: "Prenota la tua Diagnosi IA Gratuita",
      step1Subtitle: "Scopri come automatizzare 10+ ore/settimana nella tua azienda",
      emailPlaceholder: "tua@email.com",
      continueBtn: "Continua",
      step2Title: "Parlaci della tua azienda",
      namePlaceholder: "Il tuo nome",
      businessPlaceholder: "Nome dell'azienda",
      phonePlaceholder: "Telefono (opzionale)",
      industryPlaceholder: "Seleziona la tua industria",
      industries: {
        restaurante: "Ristorante / Ospitalità",
        clinica: "Clinica / Salute",
        ecommerce: "E-commerce",
        servicios: "Servizi Professionali",
        inmobiliaria: "Immobiliare",
        otro: "Altro",
      },
      messagePlaceholder: "Cosa vuoi automatizzare? (opzionale)",
      submitBtn: "Prenota Diagnosi",
      privacyNote: "🔒 I tuoi dati sono al sicuro. Zero spam.",
      successTitle: "Perfetto! 🎉",
      successMessage: "Ti contatteremo entro 24 ore per programmare la tua diagnosi gratuita.",
      backBtn: "← Indietro",
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  const handleSubmit = async () => {
    if (!formData.email || !formData.name) {
      toast.error(language === "es" ? "Por favor completa los campos requeridos" : "Please complete required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Call edge function
      const { error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || `Industria: ${formData.vertical}, Negocio: ${formData.business_name}`,
          source: "lead_form_multistep",
          vertical: formData.vertical,
          business_name: formData.business_name,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      console.error("Error submitting lead:", err);
      toast.error(language === "es" ? "Error al enviar. Inténtalo de nuevo." : "Error submitting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${variant === "inline" ? "card-premium p-8" : ""} text-center`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-success" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3">{t.successTitle}</h3>
        <p className="text-muted-foreground">{t.successMessage}</p>
      </motion.div>
    );
  }

  return (
    <div className={`${variant === "inline" ? "card-premium p-8" : ""}`}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">{t.step1Title}</h3>
              <p className="text-muted-foreground">{t.step1Subtitle}</p>
            </div>

            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="py-6 text-base"
            />

            <Button 
              onClick={() => formData.email && setStep(2)} 
              className="btn-neon w-full py-6 text-base"
              disabled={!formData.email}
            >
              {t.continueBtn}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              {t.privacyNote}
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.backBtn}
              </button>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">{t.step2Title}</h3>

            <Input
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="py-5"
            />

            <Input
              placeholder={t.businessPlaceholder}
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              className="py-5"
            />

            <Select
              value={formData.vertical}
              onValueChange={(value) => setFormData({ ...formData, vertical: value })}
            >
              <SelectTrigger className="py-5">
                <SelectValue placeholder={t.industryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.industries).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="py-5"
            />

            <Textarea
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[80px]"
            />

            <Button 
              onClick={handleSubmit} 
              className="btn-neon w-full py-6 text-base"
              disabled={isLoading || !formData.name}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  {t.submitBtn}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
