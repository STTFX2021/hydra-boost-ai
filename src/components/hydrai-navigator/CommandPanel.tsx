import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ExternalLink, Volume2, VolumeX, MessageCircle, Cpu, Mail } from "lucide-react";
import { RadarAnimation } from "./RadarAnimation";
import { MissionCards } from "./MissionCards";
import { MissionTimer } from "./MissionTimer";
import { DemoMode } from "./DemoMode";
import { AlexInterface } from "./AlexInterface";
import { AlexMetricsChart } from "./AlexMetricsChart";
import { EmailGenerator } from "./EmailGenerator";
import { ConversationArea } from "./ConversationArea";
import { ChannelSelector } from "./ChannelSelector";
import { UrgencySelector } from "./UrgencySelector";
import { Recommendation } from "./Recommendation";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { QuickActions } from "./QuickActions";
import { NavigatorState, Mission, Channel, Urgency } from "./types";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import type { NavigatorSfx } from "./sfx";

interface CommandPanelProps {
  state: NavigatorState;
  sfx?: NavigatorSfx;
  isAILoading?: boolean;
  onClose: () => void;
  onSelectMission: (mission: Mission) => void;
  onStartFreeChat?: () => void;
  onSendChatMessage?: (message: string) => void;
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
  sfx,
  isAILoading = false,
  onClose,
  onSelectMission,
  onStartFreeChat,
  onSendChatMessage,
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
  const [showEmailGenerator, setShowEmailGenerator] = useState(false);

  const handleMissionSelect = useCallback(
    (mission: Mission) => {
      sfx?.click();
      setTimerActive(true);
      setShowDemoMode(false);
      onSelectMission(mission);
    },
    [onSelectMission, sfx]
  );

  const handleTimerComplete = useCallback(() => {
    setTimerCompleted(true);
    sfx?.complete();
  }, [sfx]);

  const isMissionActive = state.step !== "welcome" && state.step !== "closed";
  const isChatMode = state.step === "chat";

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
            {/* Header - Alex Branding */}
            <div className="flex-shrink-0 p-4 border-b border-primary/20 bg-gradient-to-r from-background via-primary/5 to-background">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-cyan-500/20 flex items-center justify-center border border-primary/40"
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={() => sfx?.hover()}
                    animate={{ boxShadow: ["0 0 10px rgba(0,200,255,0.2)", "0 0 20px rgba(0,200,255,0.4)", "0 0 10px rgba(0,200,255,0.2)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Terminal className="w-5 h-5 text-primary" />
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border border-background"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">Alex</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                        ARCHITECT
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        {showEmailGenerator ? "EMAIL GEN" : isChatMode ? "ANÁLISIS" : "Solutions Architect"}
                      </span>
                      <motion.div
                        className={`w-1.5 h-1.5 rounded-full ${showEmailGenerator ? "bg-accent" : isChatMode ? "bg-primary" : "bg-green-400"}`}
                        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Sound toggle */}
                  {sfx && (
                    <motion.button
                      onClick={() => sfx.setEnabled(!sfx.enabled)}
                      onMouseEnter={() => sfx.hover()}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={sfx.enabled ? "Sonido: On" : "Sonido: Off"}
                      title={sfx.enabled ? "Sonido: On" : "Sonido: Off"}
                    >
                      {sfx.enabled ? (
                        <Volume2 className="w-4 h-4 text-primary" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-[10px] font-mono ${sfx.enabled ? "text-primary" : "text-muted-foreground"}`}>
                        {sfx.enabled ? "ON" : "OFF"}
                      </span>
                    </motion.button>
                  )}

                  <motion.button
                    onClick={onClose}
                    onMouseEnter={() => sfx?.hover()}
                    className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                </div>
              </div>

              {/* Timer - always visible when active */}
              {isMissionActive && (
                <div className="mb-3">
                  <MissionTimer isActive={timerActive} duration={45} onComplete={handleTimerComplete} />
                </div>
              )}

              {/* Radar */}
              <RadarAnimation />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
              {/* Email Generator Mode */}
              {showEmailGenerator && sfx && (
                <EmailGenerator onBack={() => setShowEmailGenerator(false)} />
              )}

              {/* Welcome / Mission Selection */}
              {!showEmailGenerator && state.step === "welcome" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <span className="text-primary font-mono text-xs mr-1">▶</span>
                    <span className="text-sm">{state.messages[0]?.content}</span>
                  </div>

                  {/* Demo Mode */}
                  {showDemoMode && sfx && (
                    <DemoMode
                      sfx={sfx}
                      onStartRealMission={() => setShowDemoMode(false)}
                      onDiscordClick={onDiscordClick}
                    />
                  )}

                  <MissionCards onSelect={handleMissionSelect} sfx={sfx} />

                  {/* Email Generator Button */}
                  <motion.button
                    onClick={() => {
                      sfx?.click();
                      setShowEmailGenerator(true);
                    }}
                    onMouseEnter={() => sfx?.hover()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 hover:border-accent/50 text-foreground font-medium transition-all duration-200"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4 text-accent" />
                    <span>Generar Email de Ventas</span>
                  </motion.button>

                  {/* Free Chat Button */}
                  {onStartFreeChat && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2"
                    >
                      <motion.button
                        onClick={() => {
                          sfx?.click();
                          setShowDemoMode(false);
                          onStartFreeChat();
                        }}
                        onMouseEnter={() => sfx?.hover()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-muted/60 to-muted/40 border border-border/50 hover:border-primary/50 text-foreground font-medium transition-all duration-200"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span>O pregúntame lo que quieras</span>
                      </motion.button>
                      <p className="text-[10px] text-muted-foreground text-center mt-2">
                        Chat libre sobre IA, automatizaciones, servicios...
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Alex Chat Mode - Technical conversational interface */}
              {!showEmailGenerator && isChatMode && sfx && onSendChatMessage && (
                <div className="flex-1 min-h-[300px] flex flex-col">
                  <AlexMetricsChart />
                  <div className="flex-1 mt-3">
                    <AlexInterface
                      messages={state.messages}
                      isLoading={isAILoading}
                      onSendMessage={onSendChatMessage}
                      sfx={sfx}
                      placeholder="Describe tu problema de negocio..."
                    />
                  </div>
                </div>
              )}

              {/* Legacy flows for backward compatibility */}
              {state.step === "ask_business" && (
                <div className="space-y-4">
                  <ConversationArea
                    messages={state.messages}
                    inputEnabled
                    onSubmit={(v) => {
                      sfx?.click();
                      onSetBusiness(v);
                    }}
                    placeholder="Ej: Restaurante, Clínica dental, E-commerce..."
                  />
                </div>
              )}

              {state.step === "ask_channel" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <ChannelSelector
                    sfx={sfx}
                    onSelect={(channel) => {
                      sfx?.click();
                      onSetChannel(channel);
                    }}
                  />
                </div>
              )}

              {state.step === "ask_urgency" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <UrgencySelector
                    sfx={sfx}
                    onSelect={(urgency) => {
                      sfx?.click();
                      onSetUrgency(urgency);
                    }}
                  />
                </div>
              )}

              {/* Recommendation */}
              {state.step === "recommendation" && state.mission && state.urgency && (
                <Recommendation
                  mission={state.mission}
                  urgency={state.urgency}
                  onCaptureLeadClick={() => {
                    sfx?.click();
                    onGoToLeadCapture();
                  }}
                  onSkip={() => {
                    sfx?.click();
                    onClose();
                  }}
                  onDiscordClick={onDiscordClick}
                />
              )}

              {/* Lead Capture */}
              {state.step === "lead_capture" && (
                <div className="space-y-4">
                  <ConversationArea messages={state.messages} />
                  <LeadCaptureForm
                    onSubmit={(data) => {
                      sfx?.click();
                      onSaveLead(data);
                    }}
                    onSkip={() => {
                      sfx?.click();
                      onSkipLeadCapture();
                    }}
                  />
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
                        : "¡Listo! Nos vemos en Discord."}
                    </p>
                    <motion.button
                      onMouseEnter={() => sfx?.hover()}
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
                  onMouseEnter={() => sfx?.hover()}
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
              <QuickActions onDiscordClick={onDiscordClick} sfx={sfx} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
