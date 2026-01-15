import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ExternalLink, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import type { NavigatorSfx } from "./sfx";

export interface DemoModeProps {
  sfx: NavigatorSfx;
  onStartRealMission: () => void;
  onDiscordClick: () => void;
}

interface DemoMessage {
  type: "user" | "bot";
  content: string;
  delay: number;
}

const DEMO_MESSAGES: DemoMessage[] = [
  { type: "user", content: "Quiero más clientes", delay: 0 },
  { type: "bot", content: "Perfecto. ¿Qué negocio y ciudad?", delay: 2000 },
  { type: "user", content: "Clínica dental Marbella", delay: 4500 },
  { type: "bot", content: "Recomendación: Pro (499€/mes) + Lead Engine + Nutrición + Sales Message Factory. ¿Entramos a Discord?", delay: 7000 },
];

const DEMO_AUTOMATIONS = [
  { id: "lead-engine", name: "Lead Engine", description: "Captura leads 24/7", icon: Target },
  { id: "nutricion", name: "Nutrición IA", description: "Convierte leads en clientes", icon: Zap },
];

export function DemoMode({ onStartRealMission, onDiscordClick }: DemoModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [showFinal, setShowFinal] = useState(false);

  const startDemo = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
    setMessages([]);
    setShowFinal(false);
  }, []);

  const resetDemo = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    setMessages([]);
    setShowFinal(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= DEMO_MESSAGES.length) {
      // Demo completed, show final state
      setTimeout(() => setShowFinal(true), 1000);
      return;
    }

    const timer = setTimeout(() => {
      setMessages((prev) => [...prev, DEMO_MESSAGES[currentStep]]);
      setCurrentStep((prev) => prev + 1);
    }, currentStep === 0 ? 500 : DEMO_MESSAGES[currentStep].delay - DEMO_MESSAGES[currentStep - 1].delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  if (!isPlaying) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={startDemo}
        className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 border border-accent/30 hover:bg-accent/30 hover:border-accent/50 transition-all duration-300"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Play className="w-4 h-4 text-accent fill-accent" />
        </motion.div>
        <span className="text-sm font-medium text-accent">Ver demo 15s</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-3 p-4 rounded-xl bg-black/40 border border-accent/30"
    >
      {/* Demo header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-red-500"
          />
          <span className="text-xs font-mono text-accent uppercase tracking-wider">Demo en curso</span>
        </div>
        <button
          onClick={resetDemo}
          className="p-1 rounded hover:bg-muted/30 transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-2 min-h-[120px]">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  msg.type === "bot"
                    ? "bg-muted/40 text-foreground border border-border/30"
                    : "bg-primary/20 text-primary border border-primary/30"
                }`}
              >
                {msg.type === "bot" && (
                  <span className="text-accent font-mono text-xs mr-1">▶</span>
                )}
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isPlaying && currentStep < DEMO_MESSAGES.length && currentStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-1 px-3 py-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-muted-foreground/50"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Final state */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 pt-2 border-t border-border/30"
          >
            {/* Automation cards */}
            <div className="grid grid-cols-2 gap-2">
              {DEMO_AUTOMATIONS.map((auto) => (
                <motion.div
                  key={auto.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <auto.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">{auto.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{auto.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  onDiscordClick();
                  window.open(DISCORD_INVITE_URL, "_blank");
                }}
                className="flex-1 h-10 bg-primary hover:bg-primary/90"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Entrar a Discord
              </Button>
            </div>
            
            <button
              onClick={() => {
                resetDemo();
                onStartRealMission();
              }}
              className="w-full text-center text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Iniciar mi misión →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
