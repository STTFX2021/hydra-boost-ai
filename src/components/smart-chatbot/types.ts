export type BusinessType = "local" | "enterprise" | "ecommerce" | "agency";

export type QuestionnaireStep = {
  id: string;
  question: string;
  options?: { label: string; value: string }[];
  type: "options" | "text" | "contact";
};

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  options?: { label: string; value: string }[];
  timestamp: Date;
}

export interface QuestionnaireState {
  businessType: BusinessType | null;
  currentStep: number;
  answers: Record<string, string>;
  completed: boolean;
}
