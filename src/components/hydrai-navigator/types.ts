export type Mission = "leads" | "bookings" | "automation";

export type Urgency = "today" | "week" | "exploring";

export type Channel = "web" | "whatsapp" | "email" | "instagram" | "google";

export type NavigatorStep = 
  | "closed"
  | "welcome"
  | "chat"
  | "mission_selected"
  | "ask_business"
  | "ask_channel"
  | "ask_urgency"
  | "recommendation"
  | "lead_capture"
  | "final";

export interface ConversationMessage {
  id: string;
  type: "bot" | "user" | "system";
  content: string;
  timestamp: Date;
}

export interface NavigatorState {
  isOpen: boolean;
  step: NavigatorStep;
  mission: Mission | null;
  business: string;
  channel: Channel | null;
  urgency: Urgency | null;
  messages: ConversationMessage[];
  leadData: {
    name: string;
    business: string;
    contact: string;
  };
  recommendedPack: "starter" | "pro" | "autonomous" | null;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  forMissions: Mission[];
}

export interface Pack {
  id: "starter" | "pro" | "autonomous";
  name: string;
  price: string;
  description: string;
  forMissions: Mission[];
  urgencyWeight: Record<Urgency, number>;
}
