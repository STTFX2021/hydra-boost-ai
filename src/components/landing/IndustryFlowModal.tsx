import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { INDUSTRY_FLOWS, type IndustryId } from "@/lib/industryFlows";
import { cn } from "@/lib/utils";

interface IndustryFlowModalProps {
  open: boolean;
  onClose: () => void;
  industryId: IndustryId;
}

export const IndustryFlowModal = ({ open, onClose, industryId }: IndustryFlowModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const flow = INDUSTRY_FLOWS[industryId];

  // Animate steps sequentially
  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      return;
    }
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flow.steps.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [open, flow.steps.length]);

  const handleAudit = useCallback(() => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("audit");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [onClose]);

  const handleArchitecture = useCallback(() => {
    onClose();
    navigate("/arquitectura");
  }, [onClose, navigate]);

  const step = flow.steps[activeStep];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[92vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-primary/20 bg-background">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {flow.label}
            </span>
          </div>
          <DialogTitle className="text-xl md:text-2xl font-display font-bold">
            {flow.headline}
          </DialogTitle>
          <DialogDescription className="text-primary font-semibold text-base">
            {flow.kpi}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Left: Flow visualization */}
          <div className="space-y-4">
            {/* Step nodes */}
            <div className="flex items-center gap-0 overflow-x-auto pb-2">
              {flow.steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <div key={idx} className="flex items-center flex-shrink-0">
                    <motion.button
                      onClick={() => setActiveStep(idx)}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 cursor-pointer min-w-[72px]",
                        isActive
                          ? "bg-primary/10 border-2 border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                          : isPast
                          ? "bg-primary/5 border-2 border-primary/30"
                          : "bg-muted/30 border-2 border-border/30"
                      )}
                      animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : isPast
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-medium text-center leading-tight max-w-[64px]",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {s.title}
                      </span>
                      {/* Pulse ring */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-primary/40"
                          animate={{ opacity: [0.5, 0], scale: [1, 1.15] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>

                    {/* Connector line */}
                    {idx < flow.steps.length - 1 && (
                      <div className="relative w-6 h-0.5 flex-shrink-0">
                        <div className="absolute inset-0 bg-border/50 rounded-full" />
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-primary rounded-full"
                          animate={{ width: isPast || isActive ? "100%" : "0%" }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active step detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="card-premium p-5 border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm mb-1">
                      Paso {activeStep + 1}: {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                    {step.event && (
                      <code className="mt-2 inline-block px-2.5 py-1 rounded-md bg-muted/50 text-[11px] font-mono text-primary border border-border/50">
                        → {step.event}
                      </code>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Benefits + CTAs */}
          <div className="space-y-5">
            <div>
              <h4 className="font-display font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                Qué gana el cliente
              </h4>
              <ul className="space-y-2.5">
                {flow.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium p-4 space-y-3 border-primary/20">
              <Button onClick={handleAudit} className="w-full gap-2" size="lg">
                Solicitar Auditoría
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleArchitecture}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                Ver arquitectura
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
