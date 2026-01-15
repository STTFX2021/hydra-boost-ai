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

// Initiative messages based on context
const INITIATIVE_PROMPTS: Record<string, string> = {
  default: "Un usuario acaba de abrir el Navigator. Da un saludo breve y directo (máx 15 palabras), invítalo a elegir su misión.",
  "/precios": "El usuario está en la página de precios. Pregunta directamente qué pack le interesa o qué quiere lograr.",
  "/servicios": "El usuario está viendo servicios. Pregunta qué automatización le interesa más o qué problema quiere resolver.",
  "/contacto": "El usuario está en contacto. Ofrece ayuda inmediata: '¿Tienes dudas? Te las resuelvo aquí mismo.'",
  "/casos": "El usuario ve casos de éxito. Pregunta qué tipo de negocio tiene para mostrarle resultados relevantes.",
  "/auditoria": "El usuario quiere auditoría. Di que empezamos ahora mismo: '¿Qué negocio analizamos?'",
  leads: "El usuario quiere más clientes. Pregunta brevemente qué negocio tiene.",
  bookings: "El usuario quiere más reservas. Pregunta qué tipo de citas gestiona.",
  automation: "El usuario quiere automatizar todo. Pregunta qué proceso le quita más tiempo.",
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

      const message = data?.content || "Soy HydrAI Navigator. Elige misión y te doy el plan.";
      
      // Initialize history with this as the first assistant message
      chatHistoryRef.current = [{ role: "assistant", content: message }];

      return message;
    } catch (err) {
      console.error("Initiative message error:", err);
      return "Soy HydrAI Navigator. Elige misión y te digo el plan en 45s.";
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
