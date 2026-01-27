import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatContext {
  mission?: string;
  business?: string;
  channel?: string;
  urgency?: string;
  page?: string;
}

interface UseAIChatReturn {
  isLoading: boolean;
  error: string | null;
  sendMessage: (userMessage: string, context?: ChatContext) => Promise<string>;
  getInitiativeMessage: (context?: ChatContext) => Promise<string>;
  resetChat: () => void;
}

// Alex initiative messages based on context
const INITIATIVE_PROMPTS: Record<string, string> = {
  default: "Un usuario acaba de abrir el chat. Preséntate brevemente como Alex, Solutions Architect de HydrAI Labs. Máx 20 palabras, directo al grano.",
  "/precios": "El usuario está en la página de precios. Pregunta qué tipo de negocio tiene y qué quiere automatizar. Ofrece tu diagnóstico técnico.",
  "/servicios": "El usuario está viendo servicios. Pregunta qué proceso le está quitando más tiempo. Ofrece analizar el cuello de botella.",
  "/contacto": "El usuario quiere contactar. Ofrece resolver sus dudas aquí mismo con tu expertise técnico-comercial.",
  "/casos": "El usuario ve casos de éxito. Pregunta qué tipo de negocio tiene para mostrarle cómo aplicaría la solución en su caso.",
  "/auditoria": "El usuario quiere auditoría. Ofrece empezar el diagnóstico técnico ahora: '¿Qué proceso te está robando más horas?'",
  leads: "El usuario quiere más clientes. Diagnóstico rápido: pregunta cómo gestionan los leads actualmente y en cuánto tiempo responden.",
  bookings: "El usuario quiere más reservas. Pregunta cuántas citas pierden por no responder a tiempo o por gestión manual.",
  automation: "El usuario quiere automatizar todo. Pregunta qué proceso le está quitando más horas semanales para hacer un diagnóstico.",
};

export function useAIChat(): UseAIChatReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatHistoryRef = useRef<ChatMessage[]>([]);

  const sendMessage = useCallback(async (userMessage: string, context?: ChatContext): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message to history
      chatHistoryRef.current.push({ role: "user", content: userMessage });

      const { data, error: fnError } = await supabase.functions.invoke("navigator-chat", {
        body: {
          messages: chatHistoryRef.current,
          context,
        },
      });

      if (fnError) throw fnError;

      const assistantMessage = data?.content || "Cuéntame más. ¿Qué quieres lograr?";
      
      // Add assistant response to history
      chatHistoryRef.current.push({ role: "assistant", content: assistantMessage });

      return assistantMessage;
    } catch (err) {
      console.error("AI chat error:", err);
      setError("Error de conexión");
      return "Vamos al grano. Cuéntame qué quieres automatizar.";
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getInitiativeMessage = useCallback(async (context?: ChatContext): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Determine the best initiative prompt
      let initiativePrompt = INITIATIVE_PROMPTS.default;
      
      if (context?.mission) {
        initiativePrompt = INITIATIVE_PROMPTS[context.mission] || initiativePrompt;
      } else if (context?.page) {
        initiativePrompt = INITIATIVE_PROMPTS[context.page] || initiativePrompt;
      }

      const { data, error: fnError } = await supabase.functions.invoke("navigator-chat", {
        body: {
          messages: [{ role: "user", content: initiativePrompt }],
          context,
        },
      });

      if (fnError) throw fnError;

      const message = data?.content || "Soy Alex, Solutions Architect. Cuéntame qué proceso te está robando tiempo y te doy el diagnóstico.";
      
      // Initialize history with this as the first assistant message
      chatHistoryRef.current = [{ role: "assistant", content: message }];

      return message;
    } catch (err) {
      console.error("Initiative message error:", err);
      return "Soy Alex, Solutions Architect de HydrAI Labs. ¿Qué problema quieres resolver?";
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetChat = useCallback(() => {
    chatHistoryRef.current = [];
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    sendMessage,
    getInitiativeMessage,
    resetChat,
  };
}
