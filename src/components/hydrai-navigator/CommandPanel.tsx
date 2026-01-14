import { motion, AnimatePresence } from "framer-motion";
import { X, Compass } from "lucide-react";
import { RadarAnimation } from "./RadarAnimation";
import { MissionCards } from "./MissionCards";
import { ConversationArea } from "./ConversationArea";
import { ChannelSelector } from "./ChannelSelector";
import { UrgencySelector } from "./UrgencySelector";
import { Recommendation } from "./Recommendation";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { QuickActions } from "./QuickActions";
import { NavigatorState, Mission, Channel, Urgency } from "./types";

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
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
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">HydrAI Navigator</div>
                    <div className="text-xs text-primary font-mono">Modo: TURBO</div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

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
                  <MissionCards onSelect={onSelectMission} />
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
                      ¡Listo! Nos vemos en Discord.
                    </p>
                    <button
                      onClick={() => {
                        onDiscordClick();
                        window.open("https://discord.gg/KrymATqa", "_blank");
                      }}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                    >
                      Ir a Discord →
                    </button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="flex-shrink-0 p-4 border-t border-border/30 bg-black/20">
              <QuickActions onDiscordClick={onDiscordClick} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
