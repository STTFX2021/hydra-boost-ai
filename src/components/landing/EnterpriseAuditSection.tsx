import { Shield, Zap } from "lucide-react";
import { LeadFormMultiStep } from "./LeadFormMultiStep";
import { useLandingTranslation } from "@/lib/i18n";

const COPY = {
  es: {
    badge: "Auditoría Técnica",
    titleA: "Auditoría de Infraestructura",
    titleB: "Enterprise",
    subtitle: "Evaluación técnica completa de tus oportunidades de automatización. Recibe un análisis detallado de tu stack, requisitos de seguridad y proyecciones de ROI.",
    items: [
      "Revisión completa de la arquitectura del stack",
      "Evaluación de seguridad y cumplimiento",
      "Análisis de complejidad de integraciones",
      "Proyecciones de ROI personalizadas",
      "Recomendaciones priorizadas",
    ],
    valued: "Valorada en 2.500 €",
    valuedSuffix: " — Cortesía para empresas cualificadas",
  },
  en: {
    badge: "Technical Audit",
    titleA: "Enterprise Infrastructure",
    titleB: "Audit",
    subtitle: "Comprehensive technical assessment of your automation opportunities. Get a detailed analysis of your stack, security requirements, and ROI projections.",
    items: [
      "Full stack architecture review",
      "Security & compliance assessment",
      "Integration complexity analysis",
      "Custom ROI projections",
      "Priority recommendations",
    ],
    valued: "Valued at €2,500",
    valuedSuffix: " — Complimentary for qualified enterprises",
  },
  de: {
    badge: "Technisches Audit",
    titleA: "Enterprise-Infrastruktur",
    titleB: "Audit",
    subtitle: "Umfassende technische Bewertung Ihrer Automatisierungschancen. Detaillierte Analyse Ihres Stacks, der Sicherheitsanforderungen und ROI-Prognosen.",
    items: [
      "Vollständige Stack-Architekturprüfung",
      "Sicherheits- und Compliance-Bewertung",
      "Analyse der Integrationskomplexität",
      "Individuelle ROI-Prognosen",
      "Priorisierte Empfehlungen",
    ],
    valued: "Wert: 2.500 €",
    valuedSuffix: " — Kostenlos für qualifizierte Unternehmen",
  },
  ru: {
    badge: "Технический аудит",
    titleA: "Аудит инфраструктуры",
    titleB: "Enterprise",
    subtitle: "Полная техническая оценка возможностей автоматизации. Детальный анализ вашего стека, требований к безопасности и прогнозов ROI.",
    items: [
      "Полный обзор архитектуры стека",
      "Оценка безопасности и соответствия",
      "Анализ сложности интеграций",
      "Индивидуальные прогнозы ROI",
      "Приоритизированные рекомендации",
    ],
    valued: "Стоимость: 2 500 €",
    valuedSuffix: " — Бесплатно для квалифицированных компаний",
  },
} as const;

export const EnterpriseAuditSection = () => {
  const { language } = useLandingTranslation();
  const t = COPY[language as keyof typeof COPY] ?? COPY.es;

  return (
    <section id="audit" aria-label={t.titleA} className="section-padding relative overflow-hidden section-alt">
      <div className="glow-orb-primary w-96 h-96 -top-48 -left-48" />
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="badge-primary mb-6 inline-flex items-center gap-2">
              <Zap className="w-3 h-3" />
              {t.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {t.titleA}
              <span className="text-gradient-primary block">{t.titleB}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{t.subtitle}</p>
            <div className="space-y-4">
              {t.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.valued}</span>
                {t.valuedSuffix}
              </p>
            </div>
          </div>
          <div>
            <LeadFormMultiStep variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
};
