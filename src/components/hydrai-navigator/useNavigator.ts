import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  NavigatorState, 
  Mission, 
  Channel, 
  Urgency,
  ConversationMessage 
} from "./types";
import { getRecommendedPack } from "./data";
import { useAIChat } from "./useAIChat";

const initialState: NavigatorState = {
  isOpen: false,
  step: "closed",
  mission: null,
  business: "",
  channel: null,
  urgency: null,
  messages: [],
  leadData: { name: "", business: "", contact: "" },
  recommendedPack: null,
};

export function useNavigator() {
  const [state, setState] = useState<NavigatorState>(initialState);
  const location = useLocation();
  const { isLoading: isAILoading, sendMessage: sendAIMessage, getInitiativeMessage, resetChat } = useAIChat();

  const addMessage = useCallback((type: "bot" | "user" | "system", content: string) => {
    const message: ConversationMessage = {
      id: crypto.randomUUID(),
      type,
      content,
      timestamp: new Date(),
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    return message;
  }, []);

  const logEvent = useCallback(async (eventType: string, payload?: Record<string, unknown>) => {
    try {
      await supabase.from("event_logs").insert({
        event_type: `navigator_${eventType}`,
        payload: { ...payload, page_url: location.pathname },
        status: "success",
      });
    } catch (error) {
      console.warn("Event log failed:", error);
    }
  }, [location.pathname]);

  const getContext = useCallback(() => ({
    mission: state.mission || undefined,
    business: state.business || undefined,
    channel: state.channel || undefined,
    urgency: state.urgency || undefined,
    page: location.pathname,
  }), [state.mission, state.business, state.channel, state.urgency, location.pathname]);

  const open = useCallback(async () => {
    resetChat();
    setState((prev) => ({
      ...prev,
      isOpen: true,
      step: "welcome",
      messages: [],
    }));
    logEvent("opened");

    // Get AI initiative message based on current page
    const initMessage = await getInitiativeMessage({ page: location.pathname });
    addMessage("bot", initMessage);
  }, [addMessage, logEvent, resetChat, getInitiativeMessage, location.pathname]);

  const close = useCallback(() => {
    setState(initialState);
    resetChat();
  }, [resetChat]);

  const selectMission = useCallback(async (mission: Mission) => {
    setState((prev) => ({
      ...prev,
      mission,
      step: "chat",
    }));
    addMessage("user", `Misión: ${mission === "leads" ? "Más clientes" : mission === "bookings" ? "Más reservas" : "Automatizar todo"}`);
    logEvent("mission_selected", { mission });

    // Get AI response for selected mission
    const context = { mission, page: location.pathname };
    const response = await sendAIMessage(
      `He elegido la misión: ${mission}. Quiero ${mission === "leads" ? "más clientes" : mission === "bookings" ? "más reservas" : "automatizar mi negocio"}.`,
      context
    );
    addMessage("bot", response);
  }, [addMessage, logEvent, sendAIMessage, location.pathname]);

  // Start free chat mode without selecting a mission
  const startFreeChat = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      step: "chat",
    }));
    addMessage("user", "Quiero chatear libremente");
    logEvent("free_chat_started");

    const response = await sendAIMessage(
      "Hola, quiero hablar contigo de cualquier tema relacionado con automatizaciones, IA o servicios de HydrAI Labs.",
      { page: location.pathname }
    );
    addMessage("bot", response);
  }, [addMessage, logEvent, sendAIMessage, location.pathname]);

  const sendChatMessage = useCallback(async (userMessage: string) => {
    addMessage("user", userMessage);
    
    const context = getContext();
    const response = await sendAIMessage(userMessage, context);
    addMessage("bot", response);

    // Check if we should show recommendation based on conversation progress
    const messageCount = state.messages.length;
    if (messageCount >= 4 && state.mission && !state.recommendedPack) {
      // After 2-3 exchanges, show recommendation
      const pack = getRecommendedPack(state.mission, state.urgency || "week");
      setState((prev) => ({
        ...prev,
        step: "recommendation",
        recommendedPack: pack.id,
      }));
      logEvent("recommendation_shown", { 
        mission: state.mission, 
        pack: pack.id 
      });
    }
  }, [addMessage, sendAIMessage, getContext, state.messages.length, state.mission, state.urgency, state.recommendedPack, logEvent]);

  const setBusiness = useCallback(async (business: string) => {
    setState((prev) => ({
      ...prev,
      business,
    }));
    addMessage("user", business);
    
    const context = { ...getContext(), business };
    const response = await sendAIMessage(`Mi negocio es: ${business}`, context);
    addMessage("bot", response);
  }, [addMessage, sendAIMessage, getContext]);

  const setChannel = useCallback(async (channel: Channel) => {
    setState((prev) => ({
      ...prev,
      channel,
    }));
    addMessage("user", channel);
    
    const context = { ...getContext(), channel };
    const response = await sendAIMessage(`El canal que más me importa es: ${channel}`, context);
    addMessage("bot", response);
  }, [addMessage, sendAIMessage, getContext]);

  const setUrgency = useCallback(async (urgency: Urgency) => {
    const mission = state.mission || "leads";
    const pack = getRecommendedPack(mission, urgency);
    
    setState((prev) => ({
      ...prev,
      urgency,
      step: "recommendation",
      recommendedPack: pack.id,
    }));
    addMessage("user", urgency);
    logEvent("recommendation_shown", { 
      mission, 
      urgency, 
      pack: pack.id 
    });
  }, [state.mission, addMessage, logEvent]);

  const goToLeadCapture = useCallback(() => {
    setState((prev) => ({ ...prev, step: "lead_capture" }));
    addMessage("bot", "¿Te aviso cuando esté listo el plan? (opcional)");
  }, [addMessage]);

  const skipLeadCapture = useCallback(() => {
    setState((prev) => ({ ...prev, step: "final" }));
    addMessage("bot", "Perfecto. Nos vemos en Discord. Te atendemos en minutos.");
  }, [addMessage]);

  const saveLead = useCallback(async (data: { name: string; business: string; contact: string }) => {
    setState((prev) => ({ ...prev, leadData: data, step: "final" }));
    addMessage("bot", `Genial ${data.name}. Te avisamos pronto. Mientras, nos vemos en Discord.`);

    try {
      const leadPayload = {
        name: data.name,
        email: data.contact.includes("@") ? data.contact : `${data.contact}@placeholder.com`,
        phone: data.contact.includes("@") ? null : data.contact,
        business_name: data.business || state.business,
        source: "hydrai_navigator",
        vertical: state.mission,
        tags: [state.channel, state.urgency].filter(Boolean),
      };

      const navMessage = `Navigator Lead: ${state.mission} | ${state.business} | ${state.channel} | ${state.urgency}`;
      const contactEmail = data.contact.includes("@") ? data.contact : `${data.contact}@placeholder.com`;

      const { error: leadError } = await supabase.from("leads").insert(leadPayload);
      
      if (leadError) {
        await supabase.from("contact_submissions").insert({
          name: data.name,
          email: contactEmail,
          phone: data.contact.includes("@") ? null : data.contact,
          message: navMessage,
        });
      }

      // Send notification (best-effort)
      try {
        await supabase.functions.invoke("lead-intake", {
          body: {
            nombre: data.name,
            email: contactEmail,
            telefono: data.contact.includes("@") ? "" : data.contact,
            tipo_negocio: data.business || state.business || "",
            mensaje: navMessage,
            fuente: "hydrai_navigator",
            pagina: window.location.href,
          },
        });
      } catch { /* best-effort */ }

      logEvent("lead_saved", { ...data, mission: state.mission });
    } catch (error) {
      console.warn("Lead save failed:", error);
    }
  }, [state.mission, state.business, state.channel, state.urgency, addMessage, logEvent]);

  const handleDiscordClick = useCallback(() => {
    logEvent("discord_clicked", { mission: state.mission, pack: state.recommendedPack });
  }, [state.mission, state.recommendedPack, logEvent]);

  return {
    state,
    isAILoading,
    open,
    close,
    selectMission,
    startFreeChat,
    sendChatMessage,
    setBusiness,
    setChannel,
    setUrgency,
    goToLeadCapture,
    skipLeadCapture,
    saveLead,
    handleDiscordClick,
  };
}
