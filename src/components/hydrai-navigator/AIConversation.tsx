import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ConversationMessage } from "./types";
import type { NavigatorSfx } from "./sfx";

interface AIConversationProps {
  messages: ConversationMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  sfx: NavigatorSfx;
  placeholder?: string;
}

export function AIConversation({
  messages,
  isLoading,
  onSendMessage,
  sfx,
  placeholder = "Escribe tu mensaje...",
}: AIConversationProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        style={{ maxHeight: "calc(100% - 60px)" }}
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
                className={`relative max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.type === "bot"
                    ? "bg-gradient-to-br from-muted/60 to-muted/40 text-foreground border border-border/40 shadow-lg shadow-primary/5"
                    : "bg-gradient-to-br from-primary/30 to-primary/20 text-foreground border border-primary/30"
                }`}
              >
                {msg.type === "bot" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -left-1 -top-1"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                  </motion.span>
                )}
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-muted/40 border border-border/30">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">Procesando...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 h-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          onFocus={() => sfx.hover()}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-10 w-10 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          onMouseEnter={() => sfx.hover()}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
