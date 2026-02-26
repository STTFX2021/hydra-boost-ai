import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mission, Urgency } from "./types";
import { getRecommendedPack, getTopAutomations, PACKS } from "./data";
import { DISCORD_INVITE_URL } from "@/lib/constants";

interface RecommendationProps {
  mission: Mission;
  urgency: Urgency;
  onCaptureLeadClick: () => void;
  onSkip: () => void;
  onDiscordClick: () => void;
}

export function Recommendation({ 
  mission, 
  urgency, 
  onCaptureLeadClick, 
  onSkip,
  onDiscordClick 
}: RecommendationProps) {
  const pack = getRecommendedPack(mission, urgency);
  const automations = getTopAutomations(mission, 2);

  const steps = [
    "Setup inicial (24-48h)",
    "Activación y pruebas",
    "Optimización continua",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Recommended Pack */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-primary uppercase tracking-wider">
            Pack Recomendado
          </span>
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
            {pack.price}
          </span>
        </div>
        <div className="text-lg font-bold text-foreground mb-1">{pack.name}</div>
        <div className="text-sm text-muted-foreground">{pack.description}</div>
      </div>

      {/* Top Automations */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Automatizaciones incluidas
        </div>
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-2 p-2 rounded-lg bg-muted/20"
          >
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">{auto.name}</div>
              <div className="text-xs text-muted-foreground">{auto.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3-Step Plan */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Plan en 3 pasos
        </div>
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex-1 text-center p-2 rounded-lg bg-muted/20 border border-border/30"
            >
              <div className="text-xs font-bold text-primary mb-1">{i + 1}</div>
              <div className="text-xs text-muted-foreground">{step}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-3 pt-2"
      >
        <Button
          onClick={() => {
            onDiscordClick();
            window.open(DISCORD_INVITE_URL, "_blank", "noopener,noreferrer");
          }}
          className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Entrar al Discord y empezar
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Canal oficial. Te atendemos en minutos.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCaptureLeadClick}
            className="flex-1 px-3 py-2 text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            ¿Te aviso cuando esté listo?
          </button>
          <button
            onClick={onSkip}
            className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
