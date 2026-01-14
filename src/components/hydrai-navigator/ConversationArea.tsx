import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConversationMessage } from "./types";

interface ConversationAreaProps {
  messages: ConversationMessage[];
  inputEnabled?: boolean;
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export function ConversationArea({ 
  messages, 
  inputEnabled = false, 
  onSubmit,
  placeholder = "Escribe aquí..." 
}: ConversationAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && onSubmit) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 p-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[85%] px-3 py-2 rounded-lg text-sm
                  ${msg.type === "bot" 
                    ? "bg-muted/40 text-foreground border border-border/30" 
                    : msg.type === "user"
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-accent/20 text-accent-foreground text-xs italic"
                  }
                `}
              >
                {msg.type === "bot" && (
                  <span className="text-primary font-mono text-xs mr-1">▶</span>
                )}
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      {inputEnabled && onSubmit && (
        <form onSubmit={handleSubmit} className="p-2 border-t border-border/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-border/50 focus:border-primary focus:outline-none text-sm placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
