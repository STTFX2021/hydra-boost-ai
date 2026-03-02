import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowRight, ArrowLeft, Zap, CheckCircle2, 
  Building2, Server, Shield, Settings2, Send,
  Database, Cloud, Lock, FileCheck, AlertTriangle
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { z } from "zod";

// STEP 1: Company Qualification
const companySizes = [
  { id: "1-10", label: "1-10 empleados", tier: "SMB" },
  { id: "11-50", label: "11-50 empleados", tier: "Mid-Market" },
  { id: "51-200", label: "51-200 empleados", tier: "Enterprise" },
  { id: "200+", label: "200+ empleados", tier: "Enterprise+" },
];

const verticals = [
  { id: "saas", label: "SaaS / Software", icon: "💻" },
  { id: "fintech", label: "Fintech / Banca", icon: "🏦" },
  { id: "healthcare", label: "Healthcare / Pharma", icon: "🏥" },
  { id: "ecommerce", label: "E-commerce / Retail", icon: "🛒" },
  { id: "logistics", label: "Logistics / Supply Chain", icon: "🚚" },
  { id: "manufacturing", label: "Manufacturing / Industrial", icon: "🏭" },
  { id: "hospitality", label: "Hospitality / Tourism", icon: "🏨" },
  { id: "professional", label: "Professional Services", icon: "💼" },
  { id: "other", label: "Otro sector", icon: "📦" },
];

// STEP 2: Technical Infrastructure
const infrastructureOptions = [
  { id: "aws", label: "AWS", category: "cloud" },
  { id: "gcp", label: "Google Cloud", category: "cloud" },
  { id: "azure", label: "Azure", category: "cloud" },
  { id: "on-premise", label: "On-Premise", category: "cloud" },
  { id: "hybrid", label: "Hybrid Cloud", category: "cloud" },
];

const crmOptions = [
  { id: "salesforce", label: "Salesforce" },
  { id: "hubspot", label: "HubSpot" },
  { id: "pipedrive", label: "Pipedrive" },
  { id: "zoho", label: "Zoho CRM" },
  { id: "custom", label: "CRM Propio" },
  { id: "none", label: "Sin CRM" },
];

const eventVolumes = [
  { id: "low", label: "<1K eventos/día", volume: 1000 },
  { id: "medium", label: "1K-10K eventos/día", volume: 10000 },
  { id: "high", label: "10K-100K eventos/día", volume: 100000 },
  { id: "enterprise", label: "100K+ eventos/día", volume: 1000000 },
];

// STEP 3: Data Sources & Integrations
const dataSources = [
  { id: "rest-api", label: "REST APIs", icon: "🔌" },
  { id: "webhooks", label: "Webhooks", icon: "🪝" },
  { id: "database", label: "Database Direct", icon: "🗄️" },
  { id: "file-import", label: "File Import (CSV/Excel)", icon: "📁" },
  { id: "streaming", label: "Streaming (Kafka/RabbitMQ)", icon: "📡" },
  { id: "scraping", label: "Web Scraping", icon: "🕷️" },
];

const integrationPriorities = [
  { id: "crm-sync", label: "CRM Synchronization" },
  { id: "lead-routing", label: "Lead Routing & Scoring" },
  { id: "notification", label: "Multi-channel Notifications" },
  { id: "reporting", label: "Automated Reporting" },
  { id: "workflow", label: "Workflow Automation" },
  { id: "ai-processing", label: "AI/ML Data Processing" },
];

// STEP 4: Security & Compliance
const securityTiers = [
  { id: "basic", label: "Basic (API Keys)", level: 1 },
  { id: "oauth", label: "OAuth 2.0", level: 2 },
  { id: "sso", label: "SSO (SAML/OIDC)", level: 3 },
  { id: "enterprise", label: "Enterprise (SSO + RBAC + MFA)", level: 4 },
];

const complianceFrameworks = [
  { id: "gdpr", label: "GDPR", region: "EU" },
  { id: "ccpa", label: "CCPA", region: "US" },
  { id: "hipaa", label: "HIPAA", region: "US" },
  { id: "soc2", label: "SOC 2 Type II", region: "Global" },
  { id: "iso27001", label: "ISO 27001", region: "Global" },
  { id: "pci-dss", label: "PCI-DSS", region: "Global" },
];

const slaRequirements = [
  { id: "99", label: "99% (7.2h downtime/month)" },
  { id: "99.9", label: "99.9% (43min downtime/month)" },
  { id: "99.99", label: "99.99% (4.3min downtime/month)" },
  { id: "custom", label: "Custom SLA Required" },
];

const steps = [
  { title: "Company Profile", icon: Building2 },
  { title: "Infrastructure", icon: Server },
  { title: "Data & Integrations", icon: Database },
  { title: "Security & Compliance", icon: Shield },
  { title: "Contact", icon: Send },
];

// Validation schemas
const step1Schema = z.object({
  companySize: z.string().min(1, "Selecciona el tamaño de empresa"),
  vertical: z.string().min(1, "Selecciona un sector"),
  role: z.string().min(1, "Indica tu rol"),
});

const step2Schema = z.object({
  infrastructure: z.array(z.string()).min(1, "Selecciona al menos una infraestructura"),
  crm: z.string().min(1, "Selecciona tu CRM actual"),
  eventVolume: z.string().min(1, "Indica el volumen de eventos"),
});

const step3Schema = z.object({
  dataSources: z.array(z.string()).min(1, "Selecciona al menos una fuente de datos"),
  integrationPriorities: z.array(z.string()).min(1, "Selecciona al menos una prioridad"),
});

const step4Schema = z.object({
  securityTier: z.string().min(1, "Selecciona un nivel de seguridad"),
  compliance: z.array(z.string()),
  slaRequirement: z.string().min(1, "Selecciona un requisito SLA"),
});

const contactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  company: z.string().min(1, "Nombre de empresa requerido"),
});

const AuditoriaWrapper = () => {
  return (
    <>
      <SEOHead
        title="Auditoría Enterprise | HydrAI Labs"
        description="Auditoría técnica de automatización para empresas. Analiza tu infraestructura, seguridad y obtén un roadmap personalizado."
        canonical="/auditoria"
        keywords="enterprise automation audit, technical infrastructure review, AI automation assessment, compliance audit"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Auditoría Técnica", url: "/auditoria" }
      ]} />
      <Auditoria />
    </>
  );
};

const Auditoria = () => {
  const [searchParams] = useSearchParams();
  const { language } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ 
    score: number; 
    priority: string; 
    recommendations: string[];
    maturityLevel: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Company
    companySize: "",
    vertical: "",
    role: "",
    // Step 2: Infrastructure
    infrastructure: [] as string[],
    crm: "",
    eventVolume: "",
    // Step 3: Data & Integrations
    dataSources: [] as string[],
    integrationPriorities: [] as string[],
    // Step 4: Security
    securityTier: "",
    compliance: [] as string[],
    slaRequirement: "",
    // Step 5: Contact
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const toggleArrayField = (field: keyof typeof formData, id: string) => {
    setFormData((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(id) ? arr.filter((c) => c !== id) : [...arr, id],
      };
    });
  };

  const calculateScore = () => {
    let score = 50; // Base score

    // Company size bonus
    const sizeBonus: Record<string, number> = { "1-10": 5, "11-50": 10, "51-200": 15, "200+": 20 };
    score += sizeBonus[formData.companySize] || 0;

    // Infrastructure maturity
    if (formData.infrastructure.includes("hybrid")) score += 10;
    if (formData.infrastructure.length >= 2) score += 5;

    // Event volume complexity
    const volumeBonus: Record<string, number> = { low: 5, medium: 10, high: 15, enterprise: 20 };
    score += volumeBonus[formData.eventVolume] || 0;

    // Data sources sophistication
    score += Math.min(formData.dataSources.length * 3, 15);

    // Security maturity
    const securityBonus: Record<string, number> = { basic: 5, oauth: 8, sso: 12, enterprise: 15 };
    score += securityBonus[formData.securityTier] || 0;

    // Compliance requirements
    score += Math.min(formData.compliance.length * 2, 10);

    return Math.min(score, 100);
  };

  const getMaturityLevel = (score: number): string => {
    if (score >= 85) return "Enterprise-Ready";
    if (score >= 70) return "Advanced";
    if (score >= 55) return "Intermediate";
    return "Foundational";
  };

  const getRecommendations = (score: number): string[] => {
    const recs: string[] = [];

    // Infrastructure recommendations
    if (!formData.infrastructure.includes("hybrid") && formData.companySize !== "1-10") {
      recs.push("Hybrid Cloud Strategy: Consider multi-cloud architecture for redundancy and cost optimization");
    }

    // Integration recommendations
    if (formData.dataSources.includes("streaming")) {
      recs.push("Real-time Event Processing: Implement Kafka/RabbitMQ pipeline for high-throughput data ingestion");
    }

    if (formData.integrationPriorities.includes("ai-processing")) {
      recs.push("AI/ML Pipeline: Deploy serverless AI processing with automatic scaling for ML workloads");
    }

    // CRM recommendations
    if (formData.crm === "none") {
      recs.push("CRM Implementation: Deploy HubSpot or Salesforce for centralized lead management");
    } else if (formData.crm !== "none") {
      recs.push(`${formData.crm} Integration: Bi-directional sync with automated lead scoring and routing`);
    }

    // Security recommendations
    if (formData.securityTier === "basic" || formData.securityTier === "oauth") {
      recs.push("Security Upgrade: Implement SSO with SAML/OIDC and role-based access control (RBAC)");
    }

    // Compliance recommendations
    if (formData.compliance.length > 0) {
      recs.push(`Compliance Automation: Automated audit trails and data governance for ${formData.compliance.join(", ")}`);
    }

    // SLA recommendations
    if (formData.slaRequirement === "99.99" || formData.slaRequirement === "custom") {
      recs.push("High Availability Architecture: Multi-region deployment with automatic failover");
    }

    // Generic recommendations based on score
    if (score >= 70) {
      recs.push("Advanced Analytics: Real-time dashboards with predictive insights and anomaly detection");
    }

    return recs.slice(0, 6);
  };

  const validateStep = (step: number): boolean => {
    setErrors({});
    
    try {
      switch (step) {
        case 0:
          step1Schema.parse({
            companySize: formData.companySize,
            vertical: formData.vertical,
            role: formData.role,
          });
          break;
        case 1:
          step2Schema.parse({
            infrastructure: formData.infrastructure,
            crm: formData.crm,
            eventVolume: formData.eventVolume,
          });
          break;
        case 2:
          step3Schema.parse({
            dataSources: formData.dataSources,
            integrationPriorities: formData.integrationPriorities,
          });
          break;
        case 3:
          step4Schema.parse({
            securityTier: formData.securityTier,
            compliance: formData.compliance,
            slaRequirement: formData.slaRequirement,
          });
          break;
        case 4:
          contactSchema.parse({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
          });
          break;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error(Object.values(newErrors)[0] || "Por favor completa los campos requeridos");
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setLoading(true);
    const score = calculateScore();
    const priority = score >= 75 ? "high" : score >= 55 ? "medium" : "low";
    const recommendations = getRecommendations(score);
    const maturityLevel = getMaturityLevel(score);

    try {
      // Create lead with technical audit source
      const { data: lead, error: leadError } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        business_name: formData.company,
        vertical: formData.vertical,
        source: "technical_audit",
        score,
        status: "new",
        tags: [formData.companySize, formData.securityTier, ...formData.compliance],
      }).select().single();

      if (leadError) throw leadError;

      // Create assessment with full technical payload
      const { error: assessmentError } = await supabase.from("assessments").insert({
        lead_id: lead.id,
        payload_json: {
          ...formData,
          maturityLevel,
          auditType: "enterprise_infrastructure",
        },
        score,
        priority,
        recommendations_text: recommendations.join("\n"),
      });

      if (assessmentError) throw assessmentError;

      // Trigger notification (best-effort)
      try {
        await supabase.functions.invoke("send-lead-notification", {
          body: {
            type: "technical_audit",
            data: {
              name: formData.name.trim(),
              email: formData.email.trim(),
              company: formData.company,
              score,
              maturityLevel,
              priority,
              recommendations: recommendations.join("\n"),
            },
          },
        });
      } catch (notifyError) {
        console.warn("Notification failed:", notifyError);
      }

      setResult({ score, priority, recommendations, maturityLevel });
      setShowResults(true);
      toast.success("Auditoría técnica completada");

    } catch (error: any) {
      console.error("Audit submission error:", error);
      toast.error("Error al guardar. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Tamaño de Empresa
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {companySizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setFormData({ ...formData, companySize: size.id })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.companySize === size.id
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,200,255,0.2)]"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="block font-medium">{size.label}</span>
                    <span className="text-xs text-muted-foreground">{size.tier}</span>
                  </button>
                ))}
              </div>
              {errors.companySize && <p className="text-destructive text-sm mt-2">{errors.companySize}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sector / Vertical</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {verticals.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setFormData({ ...formData, vertical: v.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.vertical === v.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="text-lg block mb-1">{v.icon}</span>
                    <span className="text-xs">{v.label}</span>
                  </button>
                ))}
              </div>
              {errors.vertical && <p className="text-destructive text-sm mt-2">{errors.vertical}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tu Rol</h3>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Ej: CTO, VP Engineering, Head of Ops..."
                className="input-premium"
              />
              {errors.role && <p className="text-destructive text-sm mt-2">{errors.role}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-primary" />
                Infraestructura Cloud
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Selecciona todas las que apliquen</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {infrastructureOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleArrayField("infrastructure", opt.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.infrastructure.includes(opt.id)
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.infrastructure && <p className="text-destructive text-sm mt-2">{errors.infrastructure}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CRM Actual</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {crmOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, crm: opt.id })}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.crm === opt.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.crm && <p className="text-destructive text-sm mt-2">{errors.crm}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Volumen de Eventos
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {eventVolumes.map((vol) => (
                  <button
                    key={vol.id}
                    onClick={() => setFormData({ ...formData, eventVolume: vol.id })}
                    className={`p-4 rounded-xl border transition-all ${
                      formData.eventVolume === vol.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    {vol.label}
                  </button>
                ))}
              </div>
              {errors.eventVolume && <p className="text-destructive text-sm mt-2">{errors.eventVolume}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Fuentes de Datos
              </h3>
              <p className="text-sm text-muted-foreground mb-4">¿Cómo ingresan datos a tu sistema?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dataSources.map((src) => (
                  <button
                    key={src.id}
                    onClick={() => toggleArrayField("dataSources", src.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.dataSources.includes(src.id)
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="text-lg block mb-1">{src.icon}</span>
                    <span className="text-xs">{src.label}</span>
                  </button>
                ))}
              </div>
              {errors.dataSources && <p className="text-destructive text-sm mt-2">{errors.dataSources}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Prioridades de Integración
              </h3>
              <p className="text-sm text-muted-foreground mb-4">¿Qué automatizaciones te interesan más?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {integrationPriorities.map((pri) => (
                  <button
                    key={pri.id}
                    onClick={() => toggleArrayField("integrationPriorities", pri.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.integrationPriorities.includes(pri.id)
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    {pri.label}
                  </button>
                ))}
              </div>
              {errors.integrationPriorities && <p className="text-destructive text-sm mt-2">{errors.integrationPriorities}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Nivel de Seguridad
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {securityTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setFormData({ ...formData, securityTier: tier.id })}
                    className={`p-4 rounded-xl border transition-all ${
                      formData.securityTier === tier.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="block font-medium">{tier.label}</span>
                    <span className="text-xs text-muted-foreground">Level {tier.level}</span>
                  </button>
                ))}
              </div>
              {errors.securityTier && <p className="text-destructive text-sm mt-2">{errors.securityTier}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Compliance / Normativas
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Selecciona las que apliquen</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {complianceFrameworks.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => toggleArrayField("compliance", comp.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.compliance.includes(comp.id)
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="block font-medium">{comp.label}</span>
                    <span className="text-xs text-muted-foreground">{comp.region}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Requisito SLA
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {slaRequirements.map((sla) => (
                  <button
                    key={sla.id}
                    onClick={() => setFormData({ ...formData, slaRequirement: sla.id })}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      formData.slaRequirement === sla.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm">{sla.label}</span>
                  </button>
                ))}
              </div>
              {errors.slaRequirement && <p className="text-destructive text-sm mt-2">{errors.slaRequirement}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              ¿Dónde enviamos el informe técnico?
            </h3>
            <div>
              <label className="block text-sm mb-2">Nombre completo *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Carlos García"
                className="input-premium"
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2">Email corporativo *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@empresa.com"
                className="input-premium"
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2">Empresa *</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Nombre de tu empresa"
                className="input-premium"
              />
              {errors.company && <p className="text-destructive text-sm mt-1">{errors.company}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2">Teléfono (opcional)</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+34 612 345 678"
                className="input-premium"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults && result) {
    const priorityColors: Record<string, string> = {
      high: "text-success",
      medium: "text-warning",
      low: "text-muted-foreground",
    };

    return (
      <PageLayout>
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="card-premium neon-border p-8 mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center border border-primary/30">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                </div>

                <h2 className="text-3xl font-display font-bold text-center mb-2">
                  Infrastructure Maturity Score
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                  Technical assessment completed
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 rounded-xl bg-muted/20 border border-border/30">
                    <div className="text-5xl font-bold text-gradient-primary mb-2">
                      {result.score}
                    </div>
                    <div className="text-sm text-muted-foreground">Score / 100</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-muted/20 border border-border/30">
                    <div className={`text-2xl font-bold mb-2 ${priorityColors[result.priority]}`}>
                      {result.maturityLevel}
                    </div>
                    <div className="text-sm text-muted-foreground">Maturity Level</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Technical Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/10 border border-border/20">
                        <span className="text-primary font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contacto" className="flex-1">
                    <Button className="w-full btn-neon">
                      Schedule Technical Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/arquitectura" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Architecture Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <PageLayout>
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="badge-accent inline-flex mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise Infrastructure Audit
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Technical Automation Assessment
              </h1>
              <p className="text-muted-foreground">
                Evaluate your infrastructure maturity and get custom automation recommendations
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-xs font-mono text-primary">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1 text-xs ${
                      i <= currentStep ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="card-premium p-6 md:p-8">
              {renderStep()}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border/30">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length - 1 ? (
                  <Button onClick={handleNext} className="bg-gradient-to-r from-primary to-cyan-500">
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary to-cyan-500"
                  >
                    {loading ? (
                      <>Procesando...</>
                    ) : (
                      <>
                        Get Assessment
                        <Zap className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Data encrypted
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                GDPR compliant
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                2-min assessment
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditoriaWrapper;
