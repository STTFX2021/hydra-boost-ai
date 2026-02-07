import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowRight, CheckCircle2, Loader2, Lock, Shield, Server, Zap, 
  Database, Cloud, GitBranch, Activity, AlertTriangle, FileCode,
  Network, Cpu, HardDrive
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLandingTranslation } from "@/lib/i18n";
import { z } from "zod";

interface LeadFormMultiStepProps {
  variant?: "inline" | "modal";
  onSuccess?: () => void;
}

// Enterprise validation schemas
const step1Schema = z.object({
  email: z.string()
    .email("Please enter a valid corporate email")
    .min(1, "Email is required")
    .refine(
      (email) => !email.includes("gmail.com") && !email.includes("hotmail.com") && !email.includes("yahoo.com"),
      { message: "Please use your corporate email for enterprise audits" }
    ).or(z.string().email("Please enter a valid email")), // Fallback for SMBs
  company_size: z.string().min(1, "Please select company size"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  job_title: z.string().min(2, "Job title is required for technical coordination"),
  business_name: z.string().min(2, "Company name is required"),
  vertical: z.string().min(1, "Please select your industry vertical"),
});

const step3Schema = z.object({
  current_stack: z.string().min(1, "Please describe your current tech stack"),
  monthly_events: z.string().min(1, "Please select event volume"),
  data_sources: z.string().min(1, "Please select primary data sources"),
  deployment_preference: z.string().min(1, "Please select deployment preference"),
});

const step4Schema = z.object({
  security_tier: z.string().min(1, "Please select security requirements"),
  compliance_frameworks: z.array(z.string()).optional(),
  sla_tier: z.string().min(1, "Please select SLA tier"),
  budget_range: z.string().min(1, "Please indicate budget range"),
});

export const LeadFormMultiStep = ({ variant = "inline", onSuccess }: LeadFormMultiStepProps) => {
  const { language } = useLandingTranslation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    company_size: "",
    name: "",
    job_title: "",
    business_name: "",
    vertical: "",
    phone: "",
    current_stack: "",
    monthly_events: "",
    data_sources: "",
    api_count: "",
    deployment_preference: "",
    security_tier: "",
    compliance_frameworks: [] as string[],
    sla_tier: "",
    budget_range: "",
    critical_integrations: "",
    timeline: "",
    additional_requirements: "",
  });

  const content = {
    es: {
      // Step 1 - Enterprise Qualification
      step1Title: "Auditoría de Infraestructura IA",
      step1Subtitle: "Evaluación técnica enterprise para automatización inteligente",
      step1Badge: "Valorado en €2,500 — Acceso de cortesía",
      emailLabel: "Email corporativo",
      emailPlaceholder: "nombre@empresa.com",
      companySizeLabel: "Tamaño de la organización",
      companySizes: {
        startup: "Startup (1-10 empleados)",
        smb: "PYME (11-50 empleados)",
        midmarket: "Mid-Market (51-200 empleados)",
        enterprise: "Enterprise (201-1000 empleados)",
        largeEnterprise: "Large Enterprise (1000+ empleados)",
      },
      
      // Step 2 - Technical Contact
      step2Title: "Contacto Técnico",
      step2Subtitle: "Información del responsable de la evaluación",
      nameLabel: "Nombre completo",
      namePlaceholder: "Nombre Apellido",
      jobTitleLabel: "Cargo / Rol",
      jobTitlePlaceholder: "CTO, VP Engineering, IT Director...",
      companyLabel: "Nombre de la empresa",
      companyPlaceholder: "Empresa S.L.",
      verticalLabel: "Vertical de negocio",
      verticals: {
        fintech: "Fintech / Servicios Financieros",
        healthcare: "Healthcare / Life Sciences",
        ecommerce: "E-commerce / Retail",
        saas: "SaaS / Software",
        manufacturing: "Manufacturing / Industrial IoT",
        logistics: "Logistics / Supply Chain",
        hospitality: "Hospitality / F&B",
        realestate: "Real Estate / PropTech",
        professional: "Professional Services",
        other: "Otro sector",
      },
      phoneLabel: "Teléfono directo (opcional)",
      
      // Step 3 - Technical Stack Assessment
      step3Title: "Análisis de Stack Técnico",
      step3Subtitle: "Evaluación de tu arquitectura actual para diseñar integraciones óptimas",
      currentStackLabel: "Stack tecnológico actual",
      currentStackPlaceholder: "Ej: AWS/GCP, PostgreSQL, Node.js, React, Kubernetes, Redis...",
      monthlyEventsLabel: "Volumen de eventos/transacciones mensual",
      monthlyEvents: {
        low: "< 10K eventos/mes",
        medium: "10K - 100K eventos/mes",
        high: "100K - 1M eventos/mes",
        enterprise: "1M - 10M eventos/mes",
        hyperscale: "> 10M eventos/mes",
      },
      dataSourcesLabel: "Fuentes de datos primarias",
      dataSources: {
        sql: "SQL Databases (PostgreSQL, MySQL, MSSQL)",
        nosql: "NoSQL (MongoDB, DynamoDB, Redis)",
        warehouse: "Data Warehouse (Snowflake, BigQuery, Redshift)",
        streaming: "Streaming (Kafka, Kinesis, Pub/Sub)",
        legacy: "Legacy Systems (SAP, Oracle, Mainframe)",
        mixed: "Arquitectura híbrida/multi-cloud",
      },
      apiCountLabel: "Número de APIs/servicios a integrar",
      apiCountPlaceholder: "Ej: 15-20 APIs internas + 5 externas",
      deploymentLabel: "Preferencia de despliegue",
      deploymentOptions: {
        cloud: "Cloud-native (nuestro hosting)",
        hybrid: "Híbrido (componentes en tu infra)",
        onprem: "On-premise (tu datacenter)",
        multicloud: "Multi-cloud (AWS + GCP + Azure)",
      },
      
      // Step 4 - Security & Compliance
      step4Title: "Seguridad & Compliance",
      step4Subtitle: "Requisitos de seguridad empresarial y cumplimiento normativo",
      securityTierLabel: "Nivel de seguridad requerido",
      securityTiers: {
        standard: "Standard — HTTPS, OAuth 2.0, encriptación en tránsito",
        enhanced: "Enhanced — 2FA, VPN, encriptación at-rest, logs de auditoría",
        enterprise: "Enterprise — SSO/SAML, RBAC, vault secrets, WAF",
        regulated: "Regulated — Air-gapped, HSM, audit trail inmutable, pen testing",
      },
      complianceLabel: "Frameworks de compliance aplicables",
      complianceOptions: {
        gdpr: "GDPR (Protección de datos EU)",
        soc2: "SOC 2 Type II",
        iso27001: "ISO 27001",
        hipaa: "HIPAA (Healthcare)",
        pci: "PCI-DSS (Pagos)",
        ccpa: "CCPA (California)",
        ens: "ENS (España)",
        none: "Sin requisitos específicos",
      },
      slaLabel: "Tier de SLA requerido",
      slaTiers: {
        standard: "Standard — 99% uptime, soporte L1 en horario laboral",
        business: "Business — 99.5% uptime, soporte L2 en 4h, 8x5",
        enterprise: "Enterprise — 99.9% uptime, L3 en 1h, 24x7, TAM dedicado",
        mission: "Mission Critical — 99.99% uptime, DR activo-activo, SRE on-call",
      },
      budgetLabel: "Rango de presupuesto anual (€)",
      budgetRanges: {
        starter: "€10K - €25K/año",
        growth: "€25K - €75K/año",
        scale: "€75K - €150K/año",
        enterprise: "€150K - €500K/año",
        custom: "€500K+ (Proyecto enterprise custom)",
      },
      criticalLabel: "Integraciones críticas (sistemas que DEBEN conectarse)",
      criticalPlaceholder: "Ej: SAP S/4HANA, Salesforce, WhatsApp Business API, custom ERP...",
      timelineLabel: "Timeline esperado para go-live",
      timelines: {
        urgent: "< 30 días (Fast-track)",
        standard: "1-3 meses",
        planned: "3-6 meses",
        strategic: "6-12 meses (Proyecto estratégico)",
      },
      additionalLabel: "Requisitos adicionales o contexto",
      additionalPlaceholder: "Cualquier detalle técnico, restricciones, o contexto relevante para la auditoría...",
      
      // Navigation & Actions
      continueBtn: "Continuar →",
      backBtn: "← Volver",
      submitBtn: "Solicitar Auditoría Enterprise",
      submittingBtn: "Procesando solicitud...",
      privacyNote: "🔒 Información confidencial. NDA disponible bajo petición.",
      stepIndicator: "Fase",
      of: "de",
      
      // Success
      successTitle: "Auditoría Técnica Programada ✓",
      successMessage: "Un arquitecto de soluciones senior revisará tu caso y te contactará en las próximas 24h laborables con un análisis preliminar y propuesta de scope.",
      successNextSteps: "Próximos pasos: Recibirás un email con acceso al portal de cliente y calendario para agendar la sesión de discovery técnico.",
      
      // Validation
      validationError: "Por favor, completa los campos requeridos",
      emailError: "Usa tu email corporativo para auditorías enterprise",
    },
    en: {
      // Step 1 - Enterprise Qualification
      step1Title: "AI Infrastructure Audit",
      step1Subtitle: "Enterprise-grade technical assessment for intelligent automation",
      step1Badge: "Valued at €2,500 — Complimentary access",
      emailLabel: "Corporate email",
      emailPlaceholder: "name@company.com",
      companySizeLabel: "Organization size",
      companySizes: {
        startup: "Startup (1-10 employees)",
        smb: "SMB (11-50 employees)",
        midmarket: "Mid-Market (51-200 employees)",
        enterprise: "Enterprise (201-1000 employees)",
        largeEnterprise: "Large Enterprise (1000+ employees)",
      },
      
      // Step 2 - Technical Contact
      step2Title: "Technical Contact",
      step2Subtitle: "Information about the evaluation lead",
      nameLabel: "Full name",
      namePlaceholder: "First Last",
      jobTitleLabel: "Job Title / Role",
      jobTitlePlaceholder: "CTO, VP Engineering, IT Director...",
      companyLabel: "Company name",
      companyPlaceholder: "Company Inc.",
      verticalLabel: "Business vertical",
      verticals: {
        fintech: "Fintech / Financial Services",
        healthcare: "Healthcare / Life Sciences",
        ecommerce: "E-commerce / Retail",
        saas: "SaaS / Software",
        manufacturing: "Manufacturing / Industrial IoT",
        logistics: "Logistics / Supply Chain",
        hospitality: "Hospitality / F&B",
        realestate: "Real Estate / PropTech",
        professional: "Professional Services",
        other: "Other sector",
      },
      phoneLabel: "Direct phone (optional)",
      
      // Step 3 - Technical Stack Assessment
      step3Title: "Technical Stack Analysis",
      step3Subtitle: "Evaluating your current architecture to design optimal integrations",
      currentStackLabel: "Current technology stack",
      currentStackPlaceholder: "E.g.: AWS/GCP, PostgreSQL, Node.js, React, Kubernetes, Redis...",
      monthlyEventsLabel: "Monthly event/transaction volume",
      monthlyEvents: {
        low: "< 10K events/month",
        medium: "10K - 100K events/month",
        high: "100K - 1M events/month",
        enterprise: "1M - 10M events/month",
        hyperscale: "> 10M events/month",
      },
      dataSourcesLabel: "Primary data sources",
      dataSources: {
        sql: "SQL Databases (PostgreSQL, MySQL, MSSQL)",
        nosql: "NoSQL (MongoDB, DynamoDB, Redis)",
        warehouse: "Data Warehouse (Snowflake, BigQuery, Redshift)",
        streaming: "Streaming (Kafka, Kinesis, Pub/Sub)",
        legacy: "Legacy Systems (SAP, Oracle, Mainframe)",
        mixed: "Hybrid/multi-cloud architecture",
      },
      apiCountLabel: "Number of APIs/services to integrate",
      apiCountPlaceholder: "E.g.: 15-20 internal APIs + 5 external",
      deploymentLabel: "Deployment preference",
      deploymentOptions: {
        cloud: "Cloud-native (our hosting)",
        hybrid: "Hybrid (components in your infra)",
        onprem: "On-premise (your datacenter)",
        multicloud: "Multi-cloud (AWS + GCP + Azure)",
      },
      
      // Step 4 - Security & Compliance
      step4Title: "Security & Compliance",
      step4Subtitle: "Enterprise security requirements and regulatory compliance",
      securityTierLabel: "Required security level",
      securityTiers: {
        standard: "Standard — HTTPS, OAuth 2.0, encryption in transit",
        enhanced: "Enhanced — 2FA, VPN, at-rest encryption, audit logs",
        enterprise: "Enterprise — SSO/SAML, RBAC, vault secrets, WAF",
        regulated: "Regulated — Air-gapped, HSM, immutable audit trail, pen testing",
      },
      complianceLabel: "Applicable compliance frameworks",
      complianceOptions: {
        gdpr: "GDPR (EU Data Protection)",
        soc2: "SOC 2 Type II",
        iso27001: "ISO 27001",
        hipaa: "HIPAA (Healthcare)",
        pci: "PCI-DSS (Payments)",
        ccpa: "CCPA (California)",
        ens: "ENS (Spain)",
        none: "No specific requirements",
      },
      slaLabel: "Required SLA tier",
      slaTiers: {
        standard: "Standard — 99% uptime, L1 support business hours",
        business: "Business — 99.5% uptime, L2 support in 4h, 8x5",
        enterprise: "Enterprise — 99.9% uptime, L3 in 1h, 24x7, dedicated TAM",
        mission: "Mission Critical — 99.99% uptime, active-active DR, SRE on-call",
      },
      budgetLabel: "Annual budget range (€)",
      budgetRanges: {
        starter: "€10K - €25K/year",
        growth: "€25K - €75K/year",
        scale: "€75K - €150K/year",
        enterprise: "€150K - €500K/year",
        custom: "€500K+ (Custom enterprise project)",
      },
      criticalLabel: "Critical integrations (systems that MUST connect)",
      criticalPlaceholder: "E.g.: SAP S/4HANA, Salesforce, WhatsApp Business API, custom ERP...",
      timelineLabel: "Expected go-live timeline",
      timelines: {
        urgent: "< 30 days (Fast-track)",
        standard: "1-3 months",
        planned: "3-6 months",
        strategic: "6-12 months (Strategic project)",
      },
      additionalLabel: "Additional requirements or context",
      additionalPlaceholder: "Any technical details, constraints, or relevant context for the audit...",
      
      // Navigation & Actions
      continueBtn: "Continue →",
      backBtn: "← Back",
      submitBtn: "Request Enterprise Audit",
      submittingBtn: "Processing request...",
      privacyNote: "🔒 Confidential information. NDA available upon request.",
      stepIndicator: "Phase",
      of: "of",
      
      // Success
      successTitle: "Technical Audit Scheduled ✓",
      successMessage: "A senior solutions architect will review your case and contact you within 24 business hours with a preliminary analysis and scope proposal.",
      successNextSteps: "Next steps: You'll receive an email with access to the client portal and calendar to schedule the technical discovery session.",
      
      // Validation
      validationError: "Please complete the required fields",
      emailError: "Use your corporate email for enterprise audits",
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  const validateStep1 = () => {
    try {
      step1Schema.parse({ 
        email: formData.email,
        company_size: formData.company_size 
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

  const validateStep2 = () => {
    try {
      step2Schema.parse({
        name: formData.name,
        job_title: formData.job_title,
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
        current_stack: formData.current_stack,
        monthly_events: formData.monthly_events,
        data_sources: formData.data_sources,
        deployment_preference: formData.deployment_preference,
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

  const validateStep4 = () => {
    try {
      step4Schema.parse({
        security_tier: formData.security_tier,
        compliance_frameworks: formData.compliance_frameworks,
        sla_tier: formData.sla_tier,
        budget_range: formData.budget_range,
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

  const handleContinue = (nextStep: number) => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    else if (step === 3) isValid = validateStep3();
    
    if (isValid) setStep(nextStep);
    else toast.error(t.validationError);
  };

  const handleSubmit = async () => {
    if (!validateStep4()) {
      toast.error(t.validationError);
      return;
    }

    setIsLoading(true);

    try {
      const technicalReport = `
## 🔍 ENTERPRISE INFRASTRUCTURE AUDIT REQUEST

### Organization Profile
- **Company:** ${formData.business_name}
- **Size:** ${formData.company_size}
- **Vertical:** ${formData.vertical}
- **Contact:** ${formData.name} (${formData.job_title})
- **Email:** ${formData.email}
${formData.phone ? `- **Phone:** ${formData.phone}` : ''}

---

### Technical Architecture Assessment

#### Current Stack
\`\`\`
${formData.current_stack}
\`\`\`

#### Data Infrastructure
- **Event Volume:** ${formData.monthly_events}
- **Primary Data Sources:** ${formData.data_sources}
- **API/Service Count:** ${formData.api_count || 'Not specified'}
- **Deployment Preference:** ${formData.deployment_preference}

#### Critical Integrations Required
${formData.critical_integrations || 'To be discussed'}

---

### Security & Compliance Requirements

- **Security Tier:** ${formData.security_tier}
- **Compliance Frameworks:** ${formData.compliance_frameworks.length > 0 ? formData.compliance_frameworks.join(', ') : 'None specified'}
- **SLA Requirements:** ${formData.sla_tier}

---

### Project Parameters

- **Budget Range:** ${formData.budget_range}
- **Timeline:** ${formData.timeline || 'Flexible'}

#### Additional Context
${formData.additional_requirements || 'None provided'}

---
*Submitted via Enterprise Audit Form*
*Priority: ${formData.company_size === 'enterprise' || formData.company_size === 'largeEnterprise' ? 'HIGH' : 'STANDARD'}*
      `.trim();

      const { error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: technicalReport,
          source: "enterprise_audit_v2",
          vertical: formData.vertical,
          business_name: formData.business_name,
          tags: [
            `size:${formData.company_size}`,
            `security:${formData.security_tier}`,
            `budget:${formData.budget_range}`,
            `sla:${formData.sla_tier}`,
          ],
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      console.error("Error submitting enterprise audit:", err);
      toast.error(language === "es" 
        ? "Error al procesar. Nuestro equipo ha sido notificado." 
        : "Processing error. Our team has been notified."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompliance = (framework: string) => {
    setFormData(prev => ({
      ...prev,
      compliance_frameworks: prev.compliance_frameworks.includes(framework)
        ? prev.compliance_frameworks.filter(f => f !== framework)
        : [...prev.compliance_frameworks, framework]
    }));
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
          className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-success" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3">{t.successTitle}</h3>
        <p className="text-muted-foreground mb-4">{t.successMessage}</p>
        <p className="text-sm text-primary bg-primary/10 rounded-lg p-4">
          {t.successNextSteps}
        </p>
      </motion.div>
    );
  }

  return (
    <div className={`${variant === "inline" ? "card-premium p-6 md:p-8" : ""}`}>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-muted-foreground">
            {t.stepIndicator} {step} {t.of} 4
          </span>
          <span className="text-xs font-mono text-primary">
            {Math.round((step / 4) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {[
            { icon: Shield, label: "Qualify" },
            { icon: Server, label: "Contact" },
            { icon: Database, label: "Stack" },
            { icon: Lock, label: "Security" },
          ].map((s, i) => (
            <div 
              key={i}
              className={`flex flex-col items-center gap-1 ${i + 1 <= step ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <s.icon className="w-4 h-4" />
              <span className="text-[10px] font-medium hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Enterprise Qualification */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-5"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                <Zap className="w-3 h-3" />
                {t.step1Badge}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.step1Title}</h3>
              <p className="text-muted-foreground text-sm">{t.step1Subtitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">{t.emailLabel} *</Label>
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`py-5 ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">{t.companySizeLabel} *</Label>
                <Select
                  value={formData.company_size}
                  onValueChange={(value) => setFormData({ ...formData, company_size: value })}
                >
                  <SelectTrigger className={`py-5 ${errors.company_size ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select size..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.companySizes).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.company_size && <p className="text-xs text-destructive mt-1">{errors.company_size}</p>}
              </div>
            </div>

            <Button 
              onClick={() => handleContinue(2)} 
              className="btn-neon w-full py-6 text-base"
            >
              {t.continueBtn}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {t.privacyNote}
            </p>
          </motion.div>
        )}

        {/* STEP 2: Technical Contact */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <button
              onClick={() => setStep(1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.backBtn}
            </button>

            <div className="text-center mb-4">
              <Server className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-bold">{t.step2Title}</h3>
              <p className="text-sm text-muted-foreground">{t.step2Subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">{t.nameLabel} *</Label>
                <Input
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`py-4 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">{t.jobTitleLabel} *</Label>
                <Input
                  placeholder={t.jobTitlePlaceholder}
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  className={`py-4 ${errors.job_title ? 'border-destructive' : ''}`}
                />
                {errors.job_title && <p className="text-xs text-destructive mt-1">{errors.job_title}</p>}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">{t.companyLabel} *</Label>
              <Input
                placeholder={t.companyPlaceholder}
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                className={`py-4 ${errors.business_name ? 'border-destructive' : ''}`}
              />
              {errors.business_name && <p className="text-xs text-destructive mt-1">{errors.business_name}</p>}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">{t.verticalLabel} *</Label>
              <Select
                value={formData.vertical}
                onValueChange={(value) => setFormData({ ...formData, vertical: value })}
              >
                <SelectTrigger className={`py-4 ${errors.vertical ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select vertical..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.verticals).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vertical && <p className="text-xs text-destructive mt-1">{errors.vertical}</p>}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">{t.phoneLabel}</Label>
              <Input
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="py-4"
              />
            </div>

            <Button 
              onClick={() => handleContinue(3)} 
              className="btn-neon w-full py-5 text-base"
            >
              {t.continueBtn}
            </Button>
          </motion.div>
        )}

        {/* STEP 3: Technical Stack Assessment */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <button
              onClick={() => setStep(2)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.backBtn}
            </button>

            <div className="text-center mb-4">
              <Database className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-bold">{t.step3Title}</h3>
              <p className="text-sm text-muted-foreground">{t.step3Subtitle}</p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                {t.currentStackLabel} *
              </Label>
              <Textarea
                placeholder={t.currentStackPlaceholder}
                value={formData.current_stack}
                onChange={(e) => setFormData({ ...formData, current_stack: e.target.value })}
                className={`min-h-[80px] ${errors.current_stack ? 'border-destructive' : ''}`}
              />
              {errors.current_stack && <p className="text-xs text-destructive mt-1">{errors.current_stack}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {t.monthlyEventsLabel} *
                </Label>
                <Select
                  value={formData.monthly_events}
                  onValueChange={(value) => setFormData({ ...formData, monthly_events: value })}
                >
                  <SelectTrigger className={`py-4 ${errors.monthly_events ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select volume..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.monthlyEvents).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  {t.dataSourcesLabel} *
                </Label>
                <Select
                  value={formData.data_sources}
                  onValueChange={(value) => setFormData({ ...formData, data_sources: value })}
                >
                  <SelectTrigger className={`py-4 ${errors.data_sources ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select sources..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.dataSources).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Network className="w-4 h-4" />
                {t.apiCountLabel}
              </Label>
              <Input
                placeholder={t.apiCountPlaceholder}
                value={formData.api_count}
                onChange={(e) => setFormData({ ...formData, api_count: e.target.value })}
                className="py-4"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                {t.deploymentLabel} *
              </Label>
              <Select
                value={formData.deployment_preference}
                onValueChange={(value) => setFormData({ ...formData, deployment_preference: value })}
              >
                <SelectTrigger className={`py-4 ${errors.deployment_preference ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select deployment..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.deploymentOptions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={() => handleContinue(4)} 
              className="btn-neon w-full py-5 text-base"
            >
              {t.continueBtn}
            </Button>
          </motion.div>
        )}

        {/* STEP 4: Security & Compliance */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <button
              onClick={() => setStep(3)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.backBtn}
            </button>

            <div className="text-center mb-4">
              <Lock className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-bold">{t.step4Title}</h3>
              <p className="text-sm text-muted-foreground">{t.step4Subtitle}</p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.securityTierLabel} *
              </Label>
              <Select
                value={formData.security_tier}
                onValueChange={(value) => setFormData({ ...formData, security_tier: value })}
              >
                <SelectTrigger className={`py-4 ${errors.security_tier ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select security level..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.securityTiers).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <FileCode className="w-4 h-4" />
                {t.complianceLabel}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(t.complianceOptions).map(([key, label]) => (
                  <div 
                    key={key}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      formData.compliance_frameworks.includes(key) 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleCompliance(key)}
                  >
                    <Checkbox 
                      checked={formData.compliance_frameworks.includes(key)}
                      className="pointer-events-none"
                    />
                    <span className="text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {t.slaLabel} *
                </Label>
                <Select
                  value={formData.sla_tier}
                  onValueChange={(value) => setFormData({ ...formData, sla_tier: value })}
                >
                  <SelectTrigger className={`py-4 ${errors.sla_tier ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select SLA..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.slaTiers).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {t.budgetLabel} *
                </Label>
                <Select
                  value={formData.budget_range}
                  onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
                >
                  <SelectTrigger className={`py-4 ${errors.budget_range ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select budget..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.budgetRanges).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                {t.criticalLabel}
              </Label>
              <Input
                placeholder={t.criticalPlaceholder}
                value={formData.critical_integrations}
                onChange={(e) => setFormData({ ...formData, critical_integrations: e.target.value })}
                className="py-4"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">{t.timelineLabel}</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
              >
                <SelectTrigger className="py-4">
                  <SelectValue placeholder="Select timeline..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.timelines).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">{t.additionalLabel}</Label>
              <Textarea
                placeholder={t.additionalPlaceholder}
                value={formData.additional_requirements}
                onChange={(e) => setFormData({ ...formData, additional_requirements: e.target.value })}
                className="min-h-[60px]"
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              className="btn-neon w-full py-6 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {t.submittingBtn}
                </>
              ) : (
                <>
                  {t.submitBtn}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {t.privacyNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
