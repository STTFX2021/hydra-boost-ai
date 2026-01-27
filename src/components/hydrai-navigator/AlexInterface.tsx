import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Terminal, Activity, Zap } from "lucide-react";
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
      {/* Messages area with terminal aesthetic */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        style={{ maxHeight: "calc(100% - 80px)" }}
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
