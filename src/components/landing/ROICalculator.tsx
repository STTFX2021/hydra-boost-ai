import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp, Clock, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";

export const ROICalculator = () => {
  const { language } = useLandingTranslation();
  const [horasSemanales, setHorasSemanales] = useState(20);
  const [precioHora, setPrecioHora] = useState(30);

  const ahorroMensual = horasSemanales * 4 * precioHora;
  const ahorroAnual = ahorroMensual * 12;
  const costoPlanMensual = 997;
  const roiMeses = ahorroMensual > 0 ? Math.ceil(costoPlanMensual / ahorroMensual) : 0;
  const roiAnual = ahorroMensual > 0 ? Math.round(((ahorroAnual - costoPlanMensual * 12) / (costoPlanMensual * 12)) * 100) : 0;

  const content = {
    es: {
      title: "Calcula tu ROI en Automatización IA",
      subtitle: "Descubre cuánto puedes ahorrar automatizando tareas manuales",
      horasLabel: "¿Cuántas horas/semana dedicas a tareas manuales repetitivas?",
      horasSuffix: "horas/semana",
      precioLabel: "¿Cuánto vale tu hora de trabajo? (€)",
      ahorroMensual: "Ahorro mensual estimado",
      ahorroAnual: "Ahorro anual estimado",
      roiLabel: "Recuperas inversión en",
      roiSuffix: "meses",
      roiAnualLabel: "ROI anual",
      ctaText: "Agenda tu Diagnóstico Gratis",
      disclaimer: "* Basado en Plan Starter (997€/mes). Resultados pueden variar.",
    },
    en: {
      title: "Calculate Your AI Automation ROI",
      subtitle: "Discover how much you can save by automating manual tasks",
      horasLabel: "How many hours/week do you spend on repetitive manual tasks?",
      horasSuffix: "hours/week",
      precioLabel: "What's your hourly rate? (€)",
      ahorroMensual: "Estimated monthly savings",
      ahorroAnual: "Estimated annual savings",
      roiLabel: "Investment recovery in",
      roiSuffix: "months",
      roiAnualLabel: "Annual ROI",
      ctaText: "Schedule Your Free Diagnosis",
      disclaimer: "* Based on Starter Plan (€997/month). Results may vary.",
    },
    ru: {
      title: "Calculate Your AI Automation ROI",
      subtitle: "Discover how much you can save by automating manual tasks",
      horasLabel: "How many hours/week do you spend on repetitive manual tasks?",
      horasSuffix: "hours/week",
      precioLabel: "What's your hourly rate? (€)",
      ahorroMensual: "Estimated monthly savings",
      ahorroAnual: "Estimated annual savings",
      roiLabel: "Investment recovery in",
      roiSuffix: "months",
      roiAnualLabel: "Annual ROI",
      ctaText: "Schedule Your Free Diagnosis",
      disclaimer: "* Based on Starter Plan (€997/month). Results may vary.",
    },
    de: {
      title: "Berechnen Sie Ihren KI-Automatisierungs-ROI",
      subtitle: "Entdecken Sie, wie viel Sie durch die Automatisierung manueller Aufgaben sparen können",
      horasLabel: "Wie viele Stunden/Woche verbringen Sie mit sich wiederholenden manuellen Aufgaben?",
      horasSuffix: "Stunden/Woche",
      precioLabel: "Was ist Ihr Stundensatz? (€)",
      ahorroMensual: "Geschätzte monatliche Einsparungen",
      ahorroAnual: "Geschätzte jährliche Einsparungen",
      roiLabel: "Investitionsrückgewinnung in",
      roiSuffix: "Monaten",
      roiAnualLabel: "Jährlicher ROI",
      ctaText: "Planen Sie Ihre kostenlose Diagnose",
      disclaimer: "* Basierend auf Starter Plan (997€/Monat). Ergebnisse können variieren.",
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="glow-orb-primary w-[400px] h-[400px] top-0 right-0 opacity-20" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-premium p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Inputs */}
              <div className="space-y-8">
                {/* Horas semanales */}
                <div>
                  <label className="block text-sm font-semibold mb-4">
                    {t.horasLabel}
                  </label>
                  <Slider
                    value={[horasSemanales]}
                    onValueChange={(value) => setHorasSemanales(value[0])}
                    min={5}
                    max={60}
                    step={1}
                    className="mb-3"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">5h</span>
                    <span className="text-3xl font-bold text-gradient-primary">
                      {horasSemanales} <span className="text-lg font-normal text-muted-foreground">{t.horasSuffix}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">60h</span>
                  </div>
                </div>

                {/* Precio hora */}
                <div>
                  <label className="block text-sm font-semibold mb-4">
                    {t.precioLabel}
                  </label>
                  <Slider
                    value={[precioHora]}
                    onValueChange={(value) => setPrecioHora(value[0])}
                    min={10}
                    max={150}
                    step={5}
                    className="mb-3"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">10€</span>
                    <span className="text-3xl font-bold text-gradient-secondary">
                      {precioHora}€<span className="text-lg font-normal text-muted-foreground">/hora</span>
                    </span>
                    <span className="text-sm text-muted-foreground">150€</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="card-premium p-5 text-center border-primary/30">
                    <Euro className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t.ahorroMensual}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gradient-primary">
                      €{ahorroMensual.toLocaleString()}
                    </p>
                  </div>
                  <div className="card-premium p-5 text-center border-success/30">
                    <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t.ahorroAnual}</p>
                    <p className="text-2xl md:text-3xl font-bold text-success">
                      €{ahorroAnual.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="card-premium p-5 text-center border-secondary/30">
                    <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t.roiLabel}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gradient-secondary">
                      {roiMeses} <span className="text-sm font-normal">{t.roiSuffix}</span>
                    </p>
                  </div>
                  <div className="card-premium p-5 text-center border-accent/30">
                    <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t.roiAnualLabel}</p>
                    <p className="text-2xl md:text-3xl font-bold text-accent">
                      +{roiAnual}%
                    </p>
                  </div>
                </div>

                <Link to="/auditoria-gratis" className="block">
                  <Button size="lg" className="btn-neon w-full text-base py-6 group">
                    {t.ctaText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground">
                  {t.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
