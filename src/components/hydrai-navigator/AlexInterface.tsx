import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Terminal, Cpu, Activity, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ConversationMessage } from "./types";
import type { NavigatorSfx } from "./sfx";

interface AlexInterfaceProps {
  messages: ConversationMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  sfx: NavigatorSfx;
  placeholder?: string;
}

// Simulated metrics for the technical dashboard
const metrics = [
  { label: "Latencia", value: "47ms", icon: Zap, color: "text-green-400" },
  { label: "Leads/día", value: "24", icon: TrendingUp, color: "text-primary" },
  { label: "Conversión", value: "18%", icon: BarChart3, color: "text-cyan-400" },
];

export function AlexInterface({
  messages,
  isLoading,
  onSendMessage,
  sfx,
  placeholder = "Cuéntame tu problema de negocio...",
}: AlexInterfaceProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;

      sfx.click();
      onSendMessage(trimmed);
      setInput("");
    },
    [input, isLoading, onSendMessage, sfx]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Alex Header - Technical Identity */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border/30">
        <motion.div 
          className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-cyan-500/20 flex items-center justify-center border border-primary/40"
          animate={{ boxShadow: ["0 0 10px rgba(0,200,255,0.3)", "0 0 20px rgba(0,200,255,0.5)", "0 0 10px rgba(0,200,255,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Terminal className="w-5 h-5 text-primary" />
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">Alex</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
              ARCHITECT
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <Cpu className="w-3 h-3" />
            <span>Solutions Architect & Business Strategist</span>
          </div>
        </div>
      </div>

      {/* Mini Metrics Dashboard */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center p-2 rounded-lg bg-muted/20 border border-border/30"
          >
            <metric.icon className={`w-3.5 h-3.5 ${metric.color} mb-1`} />
            <span className="text-xs font-bold text-foreground">{metric.value}</span>
            <span className="text-[9px] text-muted-foreground font-mono">{metric.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Messages area with terminal aesthetic */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        style={{ maxHeight: "calc(100% - 180px)" }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[90%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  msg.type === "bot"
                    ? "bg-gradient-to-br from-muted/60 via-muted/40 to-primary/5 text-foreground border border-primary/20 shadow-lg shadow-primary/5"
                    : "bg-gradient-to-br from-primary/25 to-cyan-500/15 text-foreground border border-primary/30"
                }`}
              >
                {msg.type === "bot" && (
                  <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-border/30">
                    <Terminal className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-mono text-primary">ALEX://response</span>
                    <Activity className="w-3 h-3 text-green-400 ml-auto" />
                  </div>
                )}
                <div className={msg.type === "bot" ? "font-mono text-[13px]" : ""}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator with terminal style */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/40 border border-primary/20">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-mono">Procesando diagnóstico</span>
              <motion.div 
                className="flex gap-0.5"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-primary">.</span>
                <span className="text-primary">.</span>
                <span className="text-primary">.</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area with technical styling */}
      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <div className="relative">
          <div className="absolute left-3 top-3 flex items-center gap-1.5 text-muted-foreground pointer-events-none">
            <span className="text-[10px] font-mono text-primary">&gt;_</span>
          </div>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="pl-10 pr-12 py-3 min-h-[44px] max-h-[120px] resize-none bg-background/60 border-border/50 focus:border-primary/50 transition-colors font-mono text-sm"
            onFocus={() => sfx.hover()}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 h-8 w-8 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            onMouseEnter={() => sfx.hover()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center font-mono">
          <Zap className="w-3 h-3 inline mr-1 text-primary" />
          Análisis técnico + estrategia comercial = resultados
        </p>
      </form>
    </div>
  );
}
