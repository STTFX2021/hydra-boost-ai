import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Zap, Shield, BarChart3, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { EliteWaitlistForm } from "./EliteWaitlistForm";
import type { Language } from "@/lib/i18n";

interface EliteSectionProps {
  language: Language;
}

export const EliteSection = ({ language }: EliteSectionProps) => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  const forWhom = language === 'es'
    ? [
        "Empresas que quieren crecer sin contratar más",
        "Equipos con caos en leads, seguimiento y operación",
        "Negocios que quieren procesos automáticos y control total",
      ]
    : [
        "Companies that want to grow without hiring more",
        "Teams with chaos in leads, follow-up and operations",
        "Businesses that want automated processes and total control",
      ];

  const includes = language === 'es'
    ? [
        { icon: Zap, text: "Diseño del sistema a medida según tu negocio" },
        { icon: Rocket, text: "Automatización end-to-end: captación → venta → operación" },
        { icon: Users, text: "Multi-agentes por departamento con roles claros" },
        { icon: Shield, text: "Monitorización 24/7 + alertas + mantenimiento" },
        { icon: BarChart3, text: "Reporting ejecutivo: ROI, tiempo ahorrado, oportunidades" },
        { icon: Sparkles, text: "Roadmap 90 días con fases y entregables claros" },
      ]
    : [
        { icon: Zap, text: "Custom system design for your business" },
        { icon: Rocket, text: "End-to-end automation: capture → sale → operation" },
        { icon: Users, text: "Multi-agents per department with clear roles" },
        { icon: Shield, text: "24/7 monitoring + alerts + maintenance" },
        { icon: BarChart3, text: "Executive reporting: ROI, time saved, opportunities" },
        { icon: Sparkles, text: "90-day roadmap with clear phases and deliverables" },
      ];

  const steps = language === 'es'
    ? [
        "Auditoría y mapeo de procesos",
        "Implementación por fases (rápida)",
        "Optimización continua mensual",
        "Escalado: nuevos procesos y canales",
      ]
    : [
        "Process audit and mapping",
        "Fast phased implementation",
        "Monthly continuous optimization",
        "Scaling: new processes and channels",
      ];

  return (
    <motion.section 
      className="section-padding"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative card-premium p-8 md:p-12 border-2 border-accent overflow-visible"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-xl pointer-events-none" />
            
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold bg-accent text-accent-foreground shadow-lg whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'es' ? 'Solo por invitación' : 'By invitation only'}
              </span>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8 pt-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gradient-primary">
                  HydrAI Elite
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {language === 'es'
                    ? 'Tu empresa con un sistema operativo de automatización: ventas, operaciones y crecimiento. Onboarding selectivo.'
                    : 'Your company with an automation operating system: sales, operations and growth. Selective onboarding.'}
                </p>
                <div className="mt-4">
                  <span className="text-2xl font-display font-bold text-accent">
                    {language === 'es' ? 'A medida' : 'Custom'}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Para quién */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    {language === 'es' ? '¿Para quién es?' : 'Who is it for?'}
                  </h3>
                  <ul className="space-y-3">
                    {forWhom.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cómo funciona */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    {language === 'es' ? 'Cómo funciona' : 'How it works'}
                  </h3>
                  <ol className="space-y-3">
                    {steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center shrink-0 font-semibold">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Qué incluye */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 text-center">
                  {language === 'es' ? 'Qué incluye' : 'What\'s included'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                      <item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="btn-neon text-lg px-8"
                  onClick={() => setShowWaitlistForm(true)}
                >
                  {language === 'es' ? 'Solicitar Acceso Elite' : 'Request Elite Access'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  {language === 'es'
                    ? 'Plazas limitadas. Solo aceptamos un número reducido de clientes al mes.'
                    : 'Limited spots. We only accept a reduced number of clients per month.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Waitlist Form Modal */}
      <EliteWaitlistForm
        open={showWaitlistForm}
        onOpenChange={setShowWaitlistForm}
        language={language}
      />
    </motion.section>
  );
};
