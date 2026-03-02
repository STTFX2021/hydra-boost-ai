import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, Minimize2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage, BusinessType, QuestionnaireState } from "./types";
import { LOCAL_QUESTIONS, ENTERPRISE_QUESTIONS, calculateLocalScore, calculateEnterpriseScore } from "./questionnaires";
import { toast } from "sonner";

const WELCOME_MESSAGE = "¡Hola! Soy el asistente de HydrAI Labs 🤖\n\nAntes de ayudarte, cuéntame: ¿qué tipo de negocio tienes?";

const BUSINESS_OPTIONS = [
  { label: "🏪 Negocio Local", value: "local" as BusinessType },
  { label: "🏢 Empresa / Enterprise", value: "enterprise" as BusinessType },
  { label: "🛒 E-commerce", value: "ecommerce" as BusinessType },
  { label: "💼 Agencia o Consultoría", value: "agency" as BusinessType },
];

export const SmartChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireState>({
    businessType: null,
    currentStep: -1,
    answers: {},
    completed: false,
  });
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [showContactForm, setShowContactForm] = useState(false);
  const [freeChat, setFreeChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<Array<{ role: "user" | "assistant"; content: string }>>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = useCallback((role: "user" | "assistant", content: string, options?: { label: string; value: string }[]) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      options,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
    chatHistoryRef.current.push({ role, content });
    return msg;
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      addMessage("assistant", WELCOME_MESSAGE, BUSINESS_OPTIONS.map(o => ({ label: o.label, value: o.value })));
    }
  };

  const sendToAI = async (userMessage: string) => {
    setIsLoading(true);
    try {
      chatHistoryRef.current.push({ role: "user", content: userMessage });
      const { data, error } = await supabase.functions.invoke("navigator-chat", {
        body: {
          messages: chatHistoryRef.current,
          context: {
            page: window.location.pathname,
            questionnaireType: questionnaire.businessType,
            questionnaireStep: questionnaire.currentStep,
          },
        },
      });
      if (error) throw error;
      const reply = data?.content || "¿Puedes repetirme eso?";
      chatHistoryRef.current.push({ role: "assistant", content: reply });
      addMessage("assistant", reply);
    } catch (err) {
      console.error("Chat error:", err);
      addMessage("assistant", "Ups, hubo un problema. ¿Puedes intentarlo de nuevo?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessTypeSelect = (type: BusinessType) => {
    addMessage("user", BUSINESS_OPTIONS.find(o => o.value === type)?.label || type);
    
    if (type === "ecommerce" || type === "agency") {
      setFreeChat(true);
      const msg = type === "ecommerce" 
        ? "¡Genial! Para e-commerce tenemos soluciones de recuperación de carritos, seguimiento de pedidos y campañas automáticas. ¿Qué es lo que más te interesa?"
        : "¡Perfecto! Trabajamos con varias agencias ayudándoles a escalar operaciones. ¿Qué procesos te gustaría automatizar?";
      addMessage("assistant", msg);
      setQuestionnaire(prev => ({ ...prev, businessType: type }));
      return;
    }

    setQuestionnaire(prev => ({ ...prev, businessType: type, currentStep: 0 }));
    const questions = type === "local" ? LOCAL_QUESTIONS : ENTERPRISE_QUESTIONS;
    const firstQ = questions[0];
    addMessage("assistant", firstQ.question, firstQ.options);
  };

  const handleOptionSelect = (value: string, label: string) => {
    addMessage("user", label);
    const questions = questionnaire.businessType === "local" ? LOCAL_QUESTIONS : ENTERPRISE_QUESTIONS;
    const currentQ = questions[questionnaire.currentStep];

    const newAnswers = { ...questionnaire.answers, [currentQ.id]: value };
    const nextStep = questionnaire.currentStep + 1;

    if (nextStep >= questions.length) {
      // Questionnaire complete
      setQuestionnaire(prev => ({ ...prev, answers: newAnswers, currentStep: nextStep, completed: true }));
      setShowContactForm(true);
      const contactQ = questions[questions.length - 1];
      addMessage("assistant", contactQ.question);
      return;
    }

    const nextQ = questions[nextStep];
    setQuestionnaire(prev => ({ ...prev, answers: newAnswers, currentStep: nextStep }));

    if (nextQ.type === "contact") {
      setShowContactForm(true);
      addMessage("assistant", nextQ.question);
    } else if (nextQ.type === "text") {
      addMessage("assistant", nextQ.question);
    } else {
      addMessage("assistant", nextQ.question, nextQ.options);
    }
  };

  const handleContactSubmit = async () => {
    if (!contactForm.name || !contactForm.email) {
      toast.error("Por favor, introduce tu nombre y email");
      return;
    }

    addMessage("user", `${contactForm.name} — ${contactForm.email}${contactForm.phone ? ` — ${contactForm.phone}` : ""}`);
    setShowContactForm(false);

    // Calculate score
    if (questionnaire.businessType === "local") {
      const result = calculateLocalScore(questionnaire.answers);
      addMessage("assistant", result.message);
    } else if (questionnaire.businessType === "enterprise") {
      const result = calculateEnterpriseScore(questionnaire.answers);
      addMessage("assistant", result.message);
    }

    // Save lead to Supabase
    try {
      await supabase.from("leads").insert({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        business_name: contactForm.company || null,
        source: "smart_chatbot",
        vertical: questionnaire.businessType,
        tags: [questionnaire.businessType || "unknown"],
      });

      await supabase.from("assessments").insert({
        payload_json: {
          businessType: questionnaire.businessType,
          answers: questionnaire.answers,
          contact: contactForm,
        },
        score: questionnaire.businessType === "local" 
          ? calculateLocalScore(questionnaire.answers).hours * 10 
          : 80,
        priority: questionnaire.answers.timeline === "this_week" || questionnaire.answers.budget === "20k_plus" ? "high" : "medium",
      });
    } catch (err) {
      console.warn("Lead save failed:", err);
    }

    // Send to n8n + Resend via lead-intake (best-effort)
    try {
      await supabase.functions.invoke("lead-intake", {
        body: {
          nombre: contactForm.name,
          email: contactForm.email,
          telefono: contactForm.phone || "",
          tipo_negocio: questionnaire.businessType || "unknown",
          mensaje: `Chatbot audit - Respuestas: ${JSON.stringify(questionnaire.answers)}`,
          fuente: "chatbot",
          pagina: window.location.href,
        },
      });
    } catch { /* best-effort */ }

    setFreeChat(true);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");

    // If in text-answer step of questionnaire
    if (!freeChat && questionnaire.currentStep >= 0 && !showContactForm) {
      const questions = questionnaire.businessType === "local" ? LOCAL_QUESTIONS : ENTERPRISE_QUESTIONS;
      const currentQ = questions[questionnaire.currentStep];
      if (currentQ?.type === "text") {
        handleOptionSelect(msg, msg);
        return;
      }
    }

    addMessage("user", msg);
    await sendToAI(msg);
  };

  const currentOptions = (() => {
    if (questionnaire.businessType === null && messages.length <= 1) {
      return BUSINESS_OPTIONS.map(o => ({ label: o.label, value: o.value }));
    }
    const lastAssistantMsg = [...messages].reverse().find(m => m.role === "assistant");
    return lastAssistantMsg?.options || null;
  })();

  const showOptions = currentOptions && !freeChat && !showContactForm;

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            aria-label="Abrir chat de soporte"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full shadow-2xl z-50 flex items-center justify-center"
            style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat inteligente HydrAI"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? "auto" : "min(600px, 85vh)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-border/50"
            style={{ boxShadow: "0 0 50px hsl(var(--primary) / 0.2)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente HydrAI Labs</h3>
                  <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online • Responde en ~2s
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20">
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Option Buttons */}
                  {showOptions && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2">
                      {currentOptions.map((opt) => (
                        <motion.button
                          key={opt.value}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (questionnaire.businessType === null) {
                              handleBusinessTypeSelect(opt.value as BusinessType);
                            } else {
                              handleOptionSelect(opt.value, opt.label);
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-sm font-medium text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Contact Form */}
                  {showContactForm && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 p-3 rounded-xl bg-muted/50 border border-border/50">
                      <Input placeholder="Tu nombre *" value={contactForm.name} onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))} className="bg-background" />
                      <Input placeholder="Email *" type="email" value={contactForm.email} onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))} className="bg-background" />
                      <Input placeholder="WhatsApp (opcional) 📱" value={contactForm.phone} onChange={(e) => setContactForm(p => ({ ...p, phone: e.target.value }))} className="bg-background" />
                      {questionnaire.businessType === "enterprise" && (
                        <Input placeholder="Empresa" value={contactForm.company} onChange={(e) => setContactForm(p => ({ ...p, company: e.target.value }))} className="bg-background" />
                      )}
                      <div className="flex gap-2 pt-1">
                        <Button onClick={handleContactSubmit} disabled={!contactForm.name || !contactForm.email} className="flex-1" size="sm">
                          <Send className="w-4 h-4 mr-2" /> Enviar
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => { setShowContactForm(false); setFreeChat(true); addMessage("assistant", "Sin problema. ¿En qué más puedo ayudarte?"); }}>
                          Omitir
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
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

                {/* Input - show when free chat or text step */}
                {(freeChat || (!showOptions && !showContactForm)) && (
                  <div className="p-4 border-t border-border bg-card flex-shrink-0">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Escribe tu mensaje..."
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="bg-primary hover:bg-primary/90">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground mt-2">
                      Powered by HydrAI Labs
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
