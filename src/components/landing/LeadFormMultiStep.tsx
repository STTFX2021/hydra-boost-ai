import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle2, Loader2, Lock, Shield, Server, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLandingTranslation } from "@/lib/i18n";
import { z } from "zod";

interface LeadFormMultiStepProps {
  variant?: "inline" | "modal";
  onSuccess?: () => void;
}

// Validation schemas
const step1Schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  business_name: z.string().optional(),
  vertical: z.string().min(1, "Please select your industry"),
});

const step3Schema = z.object({
  current_systems: z.string().optional(),
  monthly_events: z.string().min(1, "Please select event volume"),
  integrations: z.string().optional(),
  security_requirements: z.string().optional(),
  compliance_needs: z.string().optional(),
  sla_expectations: z.string().optional(),
});

export const LeadFormMultiStep = ({ variant = "inline", onSuccess }: LeadFormMultiStepProps) => {
  const { language } = useLandingTranslation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    business_name: "",
    vertical: "",
    phone: "",
    current_systems: "",
    monthly_events: "",
    integrations: "",
    security_requirements: "",
    compliance_needs: "",
    sla_expectations: "",
  });

  const content = {
    es: {
      step1Title: "Auditoría Técnica de Automatización",
      step1Subtitle: "Análisis profesional de tu infraestructura y oportunidades de automatización",
      emailPlaceholder: "tu@email.com",
      continueBtn: "Continuar",
      step2Title: "Información de tu Empresa",
      namePlaceholder: "Tu nombre",
      businessPlaceholder: "Nombre de tu empresa",
      phonePlaceholder: "Teléfono (opcional)",
      industryPlaceholder: "Selecciona tu industria",
      industries: {
        restaurante: "Restaurante / Hostelería",
        clinica: "Clínica / Salud",
        ecommerce: "Ecommerce / Retail",
        servicios: "Servicios Profesionales",
        inmobiliaria: "Inmobiliaria",
        saas: "SaaS / Tecnología",
        manufacturing: "Manufactura / Industrial",
        otro: "Otro",
      },
      step3Title: "Análisis Técnico",
      step3Subtitle: "Información para evaluar tu arquitectura actual",
      currentSystemsLabel: "Sistemas actuales (CRM, ERP, etc.)",
      currentSystemsPlaceholder: "Ej: HubSpot, SAP, Salesforce, Google Sheets...",
      monthlyEventsLabel: "Volumen mensual de eventos/transacciones",
      monthlyEvents: {
        low: "< 1,000 eventos/mes",
        medium: "1,000 - 10,000 eventos/mes",
        high: "10,000 - 100,000 eventos/mes",
        enterprise: "> 100,000 eventos/mes",
      },
      integrationsLabel: "Integraciones requeridas",
      integrationsPlaceholder: "Ej: WhatsApp, Stripe, APIs internas...",
      securityLabel: "Requisitos de seguridad",
      securityOptions: {
        standard: "Estándar (HTTPS, auth básica)",
        enhanced: "Mejorada (2FA, encriptación)",
        enterprise: "Enterprise (SSO, audit logs, SOC2)",
      },
      complianceLabel: "Necesidades de compliance",
      compliancePlaceholder: "Ej: GDPR, HIPAA, PCI-DSS, ISO 27001...",
      slaLabel: "Expectativas de SLA",
      slaOptions: {
        standard: "99% uptime (8h respuesta)",
        business: "99.5% uptime (4h respuesta)",
        enterprise: "99.9% uptime (1h respuesta, 24/7)",
      },
      submitBtn: "Solicitar Auditoría Técnica",
      privacyNote: "Tus datos están seguros. Análisis confidencial.",
      successTitle: "¡Auditoría Programada! 🎯",
      successMessage: "Nuestro equipo técnico revisará tu caso y te contactará en menos de 24h con un análisis preliminar.",
      backBtn: "← Volver",
      stepIndicator: "Paso",
      of: "de",
      validationError: "Por favor corrige los errores",
    },
    en: {
      step1Title: "Technical Automation Audit",
      step1Subtitle: "Professional analysis of your infrastructure and automation opportunities",
      emailPlaceholder: "your@email.com",
      continueBtn: "Continue",
      step2Title: "Company Information",
      namePlaceholder: "Your name",
      businessPlaceholder: "Company name",
      phonePlaceholder: "Phone (optional)",
      industryPlaceholder: "Select your industry",
      industries: {
        restaurante: "Restaurant / Hospitality",
        clinica: "Clinic / Healthcare",
        ecommerce: "Ecommerce / Retail",
        servicios: "Professional Services",
        inmobiliaria: "Real Estate",
        saas: "SaaS / Technology",
        manufacturing: "Manufacturing / Industrial",
        otro: "Other",
      },
      step3Title: "Technical Analysis",
      step3Subtitle: "Information to evaluate your current architecture",
      currentSystemsLabel: "Current systems (CRM, ERP, etc.)",
      currentSystemsPlaceholder: "E.g.: HubSpot, SAP, Salesforce, Google Sheets...",
      monthlyEventsLabel: "Monthly event/transaction volume",
      monthlyEvents: {
        low: "< 1,000 events/month",
        medium: "1,000 - 10,000 events/month",
        high: "10,000 - 100,000 events/month",
        enterprise: "> 100,000 events/month",
      },
      integrationsLabel: "Required integrations",
      integrationsPlaceholder: "E.g.: WhatsApp, Stripe, internal APIs...",
      securityLabel: "Security requirements",
      securityOptions: {
        standard: "Standard (HTTPS, basic auth)",
        enhanced: "Enhanced (2FA, encryption)",
        enterprise: "Enterprise (SSO, audit logs, SOC2)",
      },
      complianceLabel: "Compliance needs",
      compliancePlaceholder: "E.g.: GDPR, HIPAA, PCI-DSS, ISO 27001...",
      slaLabel: "SLA expectations",
      slaOptions: {
        standard: "99% uptime (8h response)",
        business: "99.5% uptime (4h response)",
        enterprise: "99.9% uptime (1h response, 24/7)",
      },
      submitBtn: "Request Technical Audit",
      privacyNote: "Your data is secure. Confidential analysis.",
      successTitle: "Audit Scheduled! 🎯",
      successMessage: "Our technical team will review your case and contact you within 24h with a preliminary analysis.",
      backBtn: "← Back",
      stepIndicator: "Step",
      of: "of",
      validationError: "Please fix the errors",
    },
    fr: {
      step1Title: "Audit Technique d'Automatisation",
      step1Subtitle: "Analyse professionnelle de votre infrastructure et opportunités d'automatisation",
      emailPlaceholder: "votre@email.com",
      continueBtn: "Continuer",
      step2Title: "Information de l'Entreprise",
      namePlaceholder: "Votre nom",
      businessPlaceholder: "Nom de l'entreprise",
      phonePlaceholder: "Téléphone (optionnel)",
      industryPlaceholder: "Sélectionnez votre industrie",
      industries: {
        restaurante: "Restaurant / Hôtellerie",
        clinica: "Clinique / Santé",
        ecommerce: "E-commerce / Retail",
        servicios: "Services Professionnels",
        inmobiliaria: "Immobilier",
        saas: "SaaS / Technologie",
        manufacturing: "Fabrication / Industrie",
        otro: "Autre",
      },
      step3Title: "Analyse Technique",
      step3Subtitle: "Informations pour évaluer votre architecture actuelle",
      currentSystemsLabel: "Systèmes actuels (CRM, ERP, etc.)",
      currentSystemsPlaceholder: "Ex: HubSpot, SAP, Salesforce, Google Sheets...",
      monthlyEventsLabel: "Volume mensuel d'événements/transactions",
      monthlyEvents: {
        low: "< 1 000 événements/mois",
        medium: "1 000 - 10 000 événements/mois",
        high: "10 000 - 100 000 événements/mois",
        enterprise: "> 100 000 événements/mois",
      },
      integrationsLabel: "Intégrations requises",
      integrationsPlaceholder: "Ex: WhatsApp, Stripe, APIs internes...",
      securityLabel: "Exigences de sécurité",
      securityOptions: {
        standard: "Standard (HTTPS, auth basique)",
        enhanced: "Amélioré (2FA, cryptage)",
        enterprise: "Enterprise (SSO, logs d'audit, SOC2)",
      },
      complianceLabel: "Besoins de conformité",
      compliancePlaceholder: "Ex: RGPD, HIPAA, PCI-DSS, ISO 27001...",
      slaLabel: "Attentes SLA",
      slaOptions: {
        standard: "99% uptime (réponse 8h)",
        business: "99.5% uptime (réponse 4h)",
        enterprise: "99.9% uptime (réponse 1h, 24/7)",
      },
      submitBtn: "Demander l'Audit Technique",
      privacyNote: "Vos données sont sécurisées. Analyse confidentielle.",
      successTitle: "Audit Programmé! 🎯",
      successMessage: "Notre équipe technique examinera votre cas et vous contactera dans les 24h.",
      backBtn: "← Retour",
      stepIndicator: "Étape",
      of: "sur",
      validationError: "Veuillez corriger les erreurs",
    },
    de: {
      step1Title: "Technisches Automatisierungs-Audit",
      step1Subtitle: "Professionelle Analyse Ihrer Infrastruktur und Automatisierungsmöglichkeiten",
      emailPlaceholder: "ihre@email.com",
      continueBtn: "Weiter",
      step2Title: "Unternehmensinformationen",
      namePlaceholder: "Ihr Name",
      businessPlaceholder: "Unternehmensname",
      phonePlaceholder: "Telefon (optional)",
      industryPlaceholder: "Wählen Sie Ihre Branche",
      industries: {
        restaurante: "Restaurant / Gastronomie",
        clinica: "Klinik / Gesundheit",
        ecommerce: "E-Commerce / Retail",
        servicios: "Professionelle Dienstleistungen",
        inmobiliaria: "Immobilien",
        saas: "SaaS / Technologie",
        manufacturing: "Fertigung / Industrie",
        otro: "Andere",
      },
      step3Title: "Technische Analyse",
      step3Subtitle: "Informationen zur Bewertung Ihrer aktuellen Architektur",
      currentSystemsLabel: "Aktuelle Systeme (CRM, ERP, etc.)",
      currentSystemsPlaceholder: "Z.B.: HubSpot, SAP, Salesforce, Google Sheets...",
      monthlyEventsLabel: "Monatliches Event-/Transaktionsvolumen",
      monthlyEvents: {
        low: "< 1.000 Events/Monat",
        medium: "1.000 - 10.000 Events/Monat",
        high: "10.000 - 100.000 Events/Monat",
        enterprise: "> 100.000 Events/Monat",
      },
      integrationsLabel: "Erforderliche Integrationen",
      integrationsPlaceholder: "Z.B.: WhatsApp, Stripe, interne APIs...",
      securityLabel: "Sicherheitsanforderungen",
      securityOptions: {
        standard: "Standard (HTTPS, Basis-Auth)",
        enhanced: "Erweitert (2FA, Verschlüsselung)",
        enterprise: "Enterprise (SSO, Audit-Logs, SOC2)",
      },
      complianceLabel: "Compliance-Anforderungen",
      compliancePlaceholder: "Z.B.: DSGVO, HIPAA, PCI-DSS, ISO 27001...",
      slaLabel: "SLA-Erwartungen",
      slaOptions: {
        standard: "99% Uptime (8h Antwort)",
        business: "99.5% Uptime (4h Antwort)",
        enterprise: "99.9% Uptime (1h Antwort, 24/7)",
      },
      submitBtn: "Technisches Audit anfordern",
      privacyNote: "Ihre Daten sind sicher. Vertrauliche Analyse.",
      successTitle: "Audit geplant! 🎯",
      successMessage: "Unser technisches Team wird Ihren Fall prüfen und Sie innerhalb von 24h kontaktieren.",
      backBtn: "← Zurück",
      stepIndicator: "Schritt",
      of: "von",
      validationError: "Bitte korrigieren Sie die Fehler",
    },
    pt: {
      step1Title: "Auditoria Técnica de Automação",
      step1Subtitle: "Análise profissional da sua infraestrutura e oportunidades de automação",
      emailPlaceholder: "seu@email.com",
      continueBtn: "Continuar",
      step2Title: "Informações da Empresa",
      namePlaceholder: "Seu nome",
      businessPlaceholder: "Nome da empresa",
      phonePlaceholder: "Telefone (opcional)",
      industryPlaceholder: "Selecione sua indústria",
      industries: {
        restaurante: "Restaurante / Hospitalidade",
        clinica: "Clínica / Saúde",
        ecommerce: "E-commerce / Varejo",
        servicios: "Serviços Profissionais",
        inmobiliaria: "Imobiliária",
        saas: "SaaS / Tecnologia",
        manufacturing: "Manufatura / Industrial",
        otro: "Outro",
      },
      step3Title: "Análise Técnica",
      step3Subtitle: "Informações para avaliar sua arquitetura atual",
      currentSystemsLabel: "Sistemas atuais (CRM, ERP, etc.)",
      currentSystemsPlaceholder: "Ex: HubSpot, SAP, Salesforce, Google Sheets...",
      monthlyEventsLabel: "Volume mensal de eventos/transações",
      monthlyEvents: {
        low: "< 1.000 eventos/mês",
        medium: "1.000 - 10.000 eventos/mês",
        high: "10.000 - 100.000 eventos/mês",
        enterprise: "> 100.000 eventos/mês",
      },
      integrationsLabel: "Integrações necessárias",
      integrationsPlaceholder: "Ex: WhatsApp, Stripe, APIs internas...",
      securityLabel: "Requisitos de segurança",
      securityOptions: {
        standard: "Padrão (HTTPS, auth básica)",
        enhanced: "Aprimorada (2FA, criptografia)",
        enterprise: "Enterprise (SSO, logs de auditoria, SOC2)",
      },
      complianceLabel: "Necessidades de compliance",
      compliancePlaceholder: "Ex: LGPD, HIPAA, PCI-DSS, ISO 27001...",
      slaLabel: "Expectativas de SLA",
      slaOptions: {
        standard: "99% uptime (resposta 8h)",
        business: "99.5% uptime (resposta 4h)",
        enterprise: "99.9% uptime (resposta 1h, 24/7)",
      },
      submitBtn: "Solicitar Auditoria Técnica",
      privacyNote: "Seus dados estão seguros. Análise confidencial.",
      successTitle: "Auditoria Agendada! 🎯",
      successMessage: "Nossa equipe técnica analisará seu caso e entrará em contato em até 24h.",
      backBtn: "← Voltar",
      stepIndicator: "Passo",
      of: "de",
      validationError: "Por favor corrija os erros",
    },
    it: {
      step1Title: "Audit Tecnico di Automazione",
      step1Subtitle: "Analisi professionale della tua infrastruttura e opportunità di automazione",
      emailPlaceholder: "tua@email.com",
      continueBtn: "Continua",
      step2Title: "Informazioni Aziendali",
      namePlaceholder: "Il tuo nome",
      businessPlaceholder: "Nome dell'azienda",
      phonePlaceholder: "Telefono (opzionale)",
      industryPlaceholder: "Seleziona la tua industria",
      industries: {
        restaurante: "Ristorante / Ospitalità",
        clinica: "Clinica / Salute",
        ecommerce: "E-commerce / Retail",
        servicios: "Servizi Professionali",
        inmobiliaria: "Immobiliare",
        saas: "SaaS / Tecnologia",
        manufacturing: "Manifattura / Industria",
        otro: "Altro",
      },
      step3Title: "Analisi Tecnica",
      step3Subtitle: "Informazioni per valutare la tua architettura attuale",
      currentSystemsLabel: "Sistemi attuali (CRM, ERP, etc.)",
      currentSystemsPlaceholder: "Es: HubSpot, SAP, Salesforce, Google Sheets...",
      monthlyEventsLabel: "Volume mensile di eventi/transazioni",
      monthlyEvents: {
        low: "< 1.000 eventi/mese",
        medium: "1.000 - 10.000 eventi/mese",
        high: "10.000 - 100.000 eventi/mese",
        enterprise: "> 100.000 eventi/mese",
      },
      integrationsLabel: "Integrazioni richieste",
      integrationsPlaceholder: "Es: WhatsApp, Stripe, API interne...",
      securityLabel: "Requisiti di sicurezza",
      securityOptions: {
        standard: "Standard (HTTPS, auth base)",
        enhanced: "Migliorata (2FA, crittografia)",
        enterprise: "Enterprise (SSO, audit log, SOC2)",
      },
      complianceLabel: "Necessità di compliance",
      compliancePlaceholder: "Es: GDPR, HIPAA, PCI-DSS, ISO 27001...",
      slaLabel: "Aspettative SLA",
      slaOptions: {
        standard: "99% uptime (risposta 8h)",
        business: "99.5% uptime (risposta 4h)",
        enterprise: "99.9% uptime (risposta 1h, 24/7)",
      },
      submitBtn: "Richiedi Audit Tecnico",
      privacyNote: "I tuoi dati sono al sicuro. Analisi confidenziale.",
      successTitle: "Audit Programmato! 🎯",
      successMessage: "Il nostro team tecnico esaminerà il tuo caso e ti contatterà entro 24h.",
      backBtn: "← Indietro",
      stepIndicator: "Passo",
      of: "di",
      validationError: "Per favore correggi gli errori",
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  const validateStep1 = () => {
    try {
      step1Schema.parse({ email: formData.email });
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        e.errors.forEach(err => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateStep2 = () => {
    try {
      step2Schema.parse({
        name: formData.name,
        business_name: formData.business_name,
        vertical: formData.vertical,
      });
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        e.errors.forEach(err => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateStep3 = () => {
    try {
      step3Schema.parse({
        monthly_events: formData.monthly_events,
      });
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        e.errors.forEach(err => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleStep1Continue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Continue = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      toast.error(t.validationError);
      return;
    }

    setIsLoading(true);

    try {
      const technicalDetails = `
## Technical Audit Request

**Industry:** ${formData.vertical}
**Company:** ${formData.business_name || 'N/A'}

### Current Systems
${formData.current_systems || 'Not specified'}

### Event Volume
${formData.monthly_events}

### Required Integrations
${formData.integrations || 'Not specified'}

### Security Requirements
${formData.security_requirements || 'Standard'}

### Compliance Needs
${formData.compliance_needs || 'Not specified'}

### SLA Expectations
${formData.sla_expectations || 'Standard'}
      `.trim();

      const { error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: technicalDetails,
          source: "technical_audit_form",
          vertical: formData.vertical,
          business_name: formData.business_name,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      console.error("Error submitting audit request:", err);
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
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-colors ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          {t.stepIndicator} {step} {t.of} 3
        </span>
      </div>

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
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.step1Title}</h3>
              <p className="text-muted-foreground text-sm">{t.step1Subtitle}</p>
            </div>

            <div>
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`py-6 text-base ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            <Button 
              onClick={handleStep1Continue} 
              className="btn-neon w-full py-6 text-base"
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
            </div>

            <div className="text-center mb-4">
              <Server className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-bold">{t.step2Title}</h3>
            </div>

            <div>
              <Input
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`py-5 ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>

            <Input
              placeholder={t.businessPlaceholder}
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              className="py-5"
            />

            <div>
              <Select
                value={formData.vertical}
                onValueChange={(value) => setFormData({ ...formData, vertical: value })}
              >
                <SelectTrigger className={`py-5 ${errors.vertical ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder={t.industryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.industries).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vertical && <p className="text-sm text-destructive mt-1">{errors.vertical}</p>}
            </div>

            <Input
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="py-5"
            />

            <Button 
              onClick={handleStep2Continue} 
              className="btn-neon w-full py-6 text-base"
            >
              {t.continueBtn}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.backBtn}
              </button>
            </div>

            <div className="text-center mb-4">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-bold">{t.step3Title}</h3>
              <p className="text-sm text-muted-foreground">{t.step3Subtitle}</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.currentSystemsLabel}</label>
              <Input
                placeholder={t.currentSystemsPlaceholder}
                value={formData.current_systems}
                onChange={(e) => setFormData({ ...formData, current_systems: e.target.value })}
                className="py-5"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.monthlyEventsLabel}</label>
              <Select
                value={formData.monthly_events}
                onValueChange={(value) => setFormData({ ...formData, monthly_events: value })}
              >
                <SelectTrigger className={`py-5 ${errors.monthly_events ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select volume" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.monthlyEvents).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.monthly_events && <p className="text-sm text-destructive mt-1">{errors.monthly_events}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.integrationsLabel}</label>
              <Input
                placeholder={t.integrationsPlaceholder}
                value={formData.integrations}
                onChange={(e) => setFormData({ ...formData, integrations: e.target.value })}
                className="py-5"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.securityLabel}</label>
              <Select
                value={formData.security_requirements}
                onValueChange={(value) => setFormData({ ...formData, security_requirements: value })}
              >
                <SelectTrigger className="py-5">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.securityOptions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.complianceLabel}</label>
              <Input
                placeholder={t.compliancePlaceholder}
                value={formData.compliance_needs}
                onChange={(e) => setFormData({ ...formData, compliance_needs: e.target.value })}
                className="py-5"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t.slaLabel}</label>
              <Select
                value={formData.sla_expectations}
                onValueChange={(value) => setFormData({ ...formData, sla_expectations: value })}
              >
                <SelectTrigger className="py-5">
                  <SelectValue placeholder="Select SLA" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.slaOptions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSubmit} 
              className="btn-neon w-full py-6 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {language === "es" ? "Enviando..." : "Sending..."}
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
