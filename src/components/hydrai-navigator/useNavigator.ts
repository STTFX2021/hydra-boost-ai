import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  NavigatorState, 
  NavigatorStep, 
  Mission, 
  Channel, 
  Urgency,
  ConversationMessage 
} from "./types";
import { BOT_MESSAGES, getRecommendedPack } from "./data";

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

  const open = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: true,
      step: "welcome",
      messages: [],
    }));
    addMessage("bot", BOT_MESSAGES.welcome);
    logEvent("opened");
  }, [addMessage, logEvent]);

  const close = useCallback(() => {
    setState(initialState);
  }, []);

  const selectMission = useCallback((mission: Mission) => {
    setState((prev) => ({
      ...prev,
      mission,
      step: "ask_business",
    }));
    addMessage("user", `Misión: ${mission}`);
    addMessage("bot", BOT_MESSAGES.askBusiness);
    logEvent("mission_selected", { mission });
  }, [addMessage, logEvent]);

  const setBusiness = useCallback((business: string) => {
    setState((prev) => ({
      ...prev,
      business,
      step: "ask_channel",
    }));
    addMessage("user", business);
    addMessage("bot", BOT_MESSAGES.askChannel);
  }, [addMessage]);

  const setChannel = useCallback((channel: Channel) => {
    setState((prev) => ({
      ...prev,
      channel,
      step: "ask_urgency",
    }));
    addMessage("user", channel);
    addMessage("bot", BOT_MESSAGES.askUrgency);
  }, [addMessage]);

  const setUrgency = useCallback((urgency: Urgency) => {
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
    addMessage("bot", BOT_MESSAGES.leadCapture);
  }, [addMessage]);

  const skipLeadCapture = useCallback(() => {
    setState((prev) => ({ ...prev, step: "final" }));
    addMessage("bot", BOT_MESSAGES.final);
  }, [addMessage]);

  const saveLead = useCallback(async (data: { name: string; business: string; contact: string }) => {
    setState((prev) => ({ ...prev, leadData: data, step: "final" }));
    addMessage("bot", BOT_MESSAGES.final);

    try {
      // Try leads table first
      const leadPayload = {
        name: data.name,
        email: data.contact.includes("@") ? data.contact : `${data.contact}@placeholder.com`,
        phone: data.contact.includes("@") ? null : data.contact,
        business_name: data.business,
        source: "hydrai_navigator",
        vertical: state.mission,
        tags: [state.channel, state.urgency].filter(Boolean),
      };

      const { error: leadError } = await supabase.from("leads").insert(leadPayload);
      
      if (leadError) {
        // Fallback to contact_submissions
        await supabase.from("contact_submissions").insert({
          name: data.name,
          email: data.contact.includes("@") ? data.contact : "no-email@placeholder.com",
          phone: data.contact.includes("@") ? null : data.contact,
          message: `Navigator Lead: ${state.mission} | ${state.business} | ${state.channel} | ${state.urgency}`,
        });
      }

      logEvent("lead_saved", { ...data, mission: state.mission });
    } catch (error) {
      console.warn("Lead save failed:", error);
      // Continue anyway - don't block the user
    }
  }, [state.mission, state.business, state.channel, state.urgency, addMessage, logEvent]);

  const handleDiscordClick = useCallback(() => {
    logEvent("discord_clicked", { mission: state.mission, pack: state.recommendedPack });
  }, [state.mission, state.recommendedPack, logEvent]);

  return {
    state,
    open,
    close,
    selectMission,
    setBusiness,
    setChannel,
    setUrgency,
    goToLeadCapture,
    skipLeadCapture,
    saveLead,
    handleDiscordClick,
  };
}
