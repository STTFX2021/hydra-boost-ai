import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass, ExternalLink } from "lucide-react";
import { RadarAnimation } from "./RadarAnimation";
import { MissionCards } from "./MissionCards";
import { MissionTimer } from "./MissionTimer";
import { DemoMode } from "./DemoMode";
import { ConversationArea } from "./ConversationArea";
import { ChannelSelector } from "./ChannelSelector";
import { UrgencySelector } from "./UrgencySelector";
import { Recommendation } from "./Recommendation";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { QuickActions } from "./QuickActions";
import { NavigatorState, Mission, Channel, Urgency } from "./types";
import { DISCORD_INVITE_URL } from "@/lib/constants";

interface CommandPanelProps {
  state: NavigatorState;
  onClose: () => void;
  onSelectMission: (mission: Mission) => void;
  onSetBusiness: (business: string) => void;
  onSetChannel: (channel: Channel) => void;
  onSetUrgency: (urgency: Urgency) => void;
  onGoToLeadCapture: () => void;
  onSkipLeadCapture: () => void;
  onSaveLead: (data: { name: string; business: string; contact: string }) => void;
  onDiscordClick: () => void;
}

export function CommandPanel({
  state,
  onClose,
  onSelectMission,
  onSetBusiness,
  onSetChannel,
  onSetUrgency,
  onGoToLeadCapture,
  onSkipLeadCapture,
  onSaveLead,
  onDiscordClick,
}: CommandPanelProps) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [showDemoMode, setShowDemoMode] = useState(true);

  const handleMissionSelect = useCallback((mission: Mission) => {
    setTimerActive(true);
    setShowDemoMode(false);
    onSelectMission(mission);
  }, [onSelectMission]);

  const handleTimerComplete = useCallback(() => {
    setTimerCompleted(true);
  }, []);

  const isMissionActive = state.step !== "welcome" && state.step !== "closed";

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-background/95 backdrop-blur-xl border-l border-primary/20 shadow-2xl shadow-primary/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-border/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Compass className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <div className="font-bold text-foreground">HydrAI Navigator</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary font-mono">Modo: TURBO</span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-[10px] text-green-400 font-mono">ONLINE</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Timer - always visible when active */}
              {isMissionActive && (
                <div className="mb-3">
                  <MissionTimer 
                    isActive={timerActive} 
                    duration={45}
                    onComplete={handleTimerComplete}
                  />
                </div>
              )}

              {/* Radar */}
              <RadarAnimation />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome / Mission Selection */}
              {state.step === "welcome" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <span className="text-primary font-mono text-xs mr-1">▶</span>
                    <span className="text-sm">{state.messages[0]?.content}</span>
                  </div>

                  {/* Demo Mode */}
                  {showDemoMode && (
                    <DemoMode 
                      onStartRealMission={() => setShowDemoMode(false)}
                      onDiscordClick={onDiscordClick}
                    />
                  )}

                  <MissionCards onSelect={handleMissionSelect} />
                </motion.div>
              )}

              {/* Ask Business */}
              {state.step === "ask_business" && (
                <div className="space-y-4">
                  <ConversationArea 
                    messages={state.messages}
                    inputEnabled
                    onSubmit={onSetBusiness}
                    placeholder="Ej: Restaurante, Clínica dental, E-commerce..."
                  />
                </div>
              )}

              {/* Ask Channel */}
              {state.step === "ask_channel" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <ChannelSelector onSelect={onSetChannel} />
                </div>
              )}

              {/* Ask Urgency */}
              {state.step === "ask_urgency" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <UrgencySelector onSelect={onSetUrgency} />
                </div>
              )}

              {/* Recommendation */}
              {state.step === "recommendation" && state.mission && state.urgency && (
                <Recommendation
                  mission={state.mission}
                  urgency={state.urgency}
                  onCaptureLeadClick={onGoToLeadCapture}
                  onSkip={onClose}
                  onDiscordClick={onDiscordClick}
                />
              )}

              {/* Lead Capture */}
              {state.step === "lead_capture" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <LeadCaptureForm onSubmit={onSaveLead} onSkip={onSkipLeadCapture} />
                </div>
              )}

              {/* Final */}
              {state.step === "final" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4"
                  >
                    <p className="text-sm text-muted-foreground mb-4">
                      {timerCompleted 
                        ? "Listo. Tengo tu ruta. ¿Entramos a Discord para arrancar?"
                        : "¡Listo! Nos vemos en Discord."
                      }
                    </p>
                    <motion.button
                      onClick={() => {
                        onDiscordClick();
                        window.open(DISCORD_INVITE_URL, "_blank");
                      }}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ir a Discord →
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile sticky CTA */}
            {isMissionActive && (
              <div className="flex-shrink-0 p-3 border-t border-border/30 bg-black/40 sm:hidden">
                <motion.button
                  onClick={() => {
                    onDiscordClick();
                    window.open(DISCORD_INVITE_URL, "_blank");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Entrar a Discord
                </motion.button>
              </div>
            )}

            {/* Quick Actions Footer */}
            <div className="flex-shrink-0 p-4 border-t border-border/30 bg-black/20 hidden sm:block">
              <QuickActions onDiscordClick={onDiscordClick} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
