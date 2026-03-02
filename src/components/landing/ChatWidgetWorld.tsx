import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLandingTranslation } from "@/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatWidgetWorld = () => {
  const { language } = useLandingTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    es: {
      greeting: "¡Hola! 👋 Soy Alex, Solutions Architect de HydrAI. ¿Qué proceso te está robando más tiempo en tu negocio?",
      placeholder: "Escribe tu mensaje...",
      online: "Online • Responde en ~2s",
      title: "Asistente IA HydrAI",
      powered: "Powered by Claude",
    },
    en: {
      greeting: "Hi! 👋 I'm Alex, Solutions Architect at HydrAI. What process is taking the most time in your business?",
      placeholder: "Type your message...",
      online: "Online • Responds in ~2s",
      title: "HydrAI AI Assistant",
      powered: "Powered by Claude",
    },
    fr: {
      greeting: "Bonjour! 👋 Je suis Alex, Solutions Architect chez HydrAI. Quel processus vous prend le plus de temps dans votre entreprise?",
      placeholder: "Écrivez votre message...",
      online: "En ligne • Répond en ~2s",
      title: "Assistant IA HydrAI",
      powered: "Powered by Claude",
    },
    de: {
      greeting: "Hallo! 👋 Ich bin Alex, Solutions Architect bei HydrAI. Welcher Prozess kostet Sie in Ihrem Unternehmen am meisten Zeit?",
      placeholder: "Schreiben Sie Ihre Nachricht...",
      online: "Online • Antwortet in ~2s",
      title: "HydrAI KI-Assistent",
      powered: "Powered by Claude",
    },
    pt: {
      greeting: "Olá! 👋 Sou Alex, Solutions Architect da HydrAI. Qual processo está tomando mais tempo no seu negócio?",
      placeholder: "Digite sua mensagem...",
      online: "Online • Responde em ~2s",
      title: "Assistente IA HydrAI",
      powered: "Powered by Claude",
    },
    it: {
      greeting: "Ciao! 👋 Sono Alex, Solutions Architect di HydrAI. Quale processo ti sta rubando più tempo nella tua azienda?",
      placeholder: "Scrivi il tuo messaggio...",
      online: "Online • Risponde in ~2s",
      title: "Assistente IA HydrAI",
      powered: "Powered by Claude",
    },
  };

  const t = content[language as keyof typeof content] || content.es;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setMessages([{ role: "assistant", content: t.greeting }]);
      setHasInitialized(true);
    }
  }, [isOpen, hasInitialized, t.greeting]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("navigator-chat", {
        body: {
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: {
            page: window.location.pathname,
          },
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data?.content || "Lo siento, hubo un error. ¿Puedes intentarlo de nuevo?",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Vaya, parece que hay un problema. ¿Puedes intentarlo de nuevo?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            aria-label="Abrir chat de soporte"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full shadow-2xl z-50 flex items-center justify-center group"
            style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
          >
            <MessageCircle className="w-7 h-7" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat de soporte HydrAI"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[380px] bg-card rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-border/50"
            style={{ boxShadow: "0 0 50px hsl(var(--primary) / 0.2)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    {t.online}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  aria-label={isMinimized ? "Expandir chat" : "Minimizar chat"}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  aria-label="Cerrar chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <label htmlFor="chat-input" className="sr-only">Mensaje</label>
                    <Input
                      id="chat-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder={t.placeholder}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      size="icon"
                      className="bg-primary hover:bg-primary/90"
                      aria-label="Enviar mensaje"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground mt-2">
                    {t.powered}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
