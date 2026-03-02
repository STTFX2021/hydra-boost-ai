import { QuestionnaireStep } from "./types";

export const LOCAL_QUESTIONS: QuestionnaireStep[] = [
  {
    id: "monthly_queries",
    question: "¿Cuántas consultas o reservas recibes al mes aproximadamente?",
    options: [
      { label: "Menos de 50", value: "less_50" },
      { label: "50-200", value: "50_200" },
      { label: "Más de 200", value: "more_200" },
    ],
    type: "options",
  },
  {
    id: "has_web",
    question: "¿Tienes web actualmente?",
    options: [
      { label: "Sí", value: "yes" },
      { label: "No", value: "no" },
      { label: "Tengo pero es antigua", value: "outdated" },
    ],
    type: "options",
  },
  {
    id: "after_hours",
    question: "¿Respondes clientes fuera de tu horario laboral?",
    options: [
      { label: "Sí, siempre", value: "always" },
      { label: "A veces", value: "sometimes" },
      { label: "No, los pierdo", value: "never" },
    ],
    type: "options",
  },
  {
    id: "whatsapp_usage",
    question: "¿Usas WhatsApp para atender clientes?",
    options: [
      { label: "Sí, todo el día", value: "heavy" },
      { label: "Poco", value: "light" },
      { label: "No", value: "no" },
    ],
    type: "options",
  },
  {
    id: "booking_system",
    question: "¿Tienes sistema de reservas online?",
    options: [
      { label: "Sí, funciona bien", value: "good" },
      { label: "Sí, pero mal", value: "bad" },
      { label: "No, todo manual", value: "manual" },
    ],
    type: "options",
  },
  {
    id: "repetitive_hours",
    question: "¿Cuánto tiempo al día dedicas a tareas repetitivas (responder dudas, confirmar citas...)?",
    options: [
      { label: "Menos de 1h", value: "less_1h" },
      { label: "1-3h", value: "1_3h" },
      { label: "Más de 3h", value: "more_3h" },
    ],
    type: "options",
  },
  {
    id: "main_problem",
    question: "¿Cuál es tu mayor problema ahora mismo?",
    options: [
      { label: "Conseguir más clientes", value: "more_clients" },
      { label: "Retener clientes existentes", value: "retain" },
      { label: "Ahorrar tiempo en operaciones", value: "save_time" },
      { label: "Todo a la vez", value: "all" },
    ],
    type: "options",
  },
  {
    id: "timeline",
    question: "¿Para cuándo necesitas solución?",
    options: [
      { label: "Esta semana", value: "this_week" },
      { label: "Este mes", value: "this_month" },
      { label: "Estoy explorando", value: "exploring" },
    ],
    type: "options",
  },
  {
    id: "contact_info",
    question: "Perfecto. ¿Me das tu nombre y email para enviarte tu auditoría gratuita personalizada?",
    type: "contact",
  },
];

export const ENTERPRISE_QUESTIONS: QuestionnaireStep[] = [
  {
    id: "company_size",
    question: "¿Cuántas personas trabajan en tu empresa?",
    options: [
      { label: "5-20", value: "5_20" },
      { label: "20-100", value: "20_100" },
      { label: "+100", value: "100_plus" },
    ],
    type: "options",
  },
  {
    id: "processes",
    question: "¿Cuáles son tus principales procesos que más tiempo consumen?",
    options: [
      { label: "Gestión de leads", value: "leads" },
      { label: "Onboarding de clientes", value: "onboarding" },
      { label: "Reportes y datos", value: "reports" },
      { label: "Atención al cliente", value: "support" },
    ],
    type: "options",
  },
  {
    id: "tools",
    question: "¿Qué herramientas usas actualmente?",
    options: [
      { label: "CRM (HubSpot/Salesforce)", value: "crm" },
      { label: "Slack/Teams", value: "comms" },
      { label: "Google Workspace", value: "google" },
      { label: "Otro stack", value: "other" },
    ],
    type: "options",
  },
  {
    id: "documented",
    question: "¿Tienes flujos de trabajo documentados?",
    options: [
      { label: "Sí, bien documentados", value: "yes" },
      { label: "Parcialmente", value: "partial" },
      { label: "Todo en la cabeza del equipo", value: "no" },
    ],
    type: "options",
  },
  {
    id: "hour_cost",
    question: "¿Cuánto cuesta a tu empresa cada hora que se pierde en tareas manuales?",
    options: [
      { label: "€50-100/h", value: "50_100" },
      { label: "€100-300/h", value: "100_300" },
      { label: "€300+/h", value: "300_plus" },
    ],
    type: "options",
  },
  {
    id: "prev_automation",
    question: "¿Has intentado automatizar antes?",
    options: [
      { label: "Sí, con éxito", value: "yes_success" },
      { label: "Sí, sin resultado", value: "yes_fail" },
      { label: "No todavía", value: "no" },
    ],
    type: "options",
  },
  {
    id: "budget",
    question: "¿Cuál es tu presupuesto estimado para automatización este año?",
    options: [
      { label: "Menos de €5k", value: "less_5k" },
      { label: "€5k-20k", value: "5k_20k" },
      { label: "€20k+", value: "20k_plus" },
      { label: "Depende del ROI", value: "roi_based" },
    ],
    type: "options",
  },
  {
    id: "success_metric",
    question: "¿Qué resultado mediría el éxito para ti en 6 meses?",
    type: "text",
  },
  {
    id: "contact_info",
    question: "Excelente. ¿Me das tus datos para preparar el diagnóstico técnico?",
    type: "contact",
  },
];

export function calculateLocalScore(answers: Record<string, string>): { hours: number; message: string } {
  let hours = 0;
  if (answers.after_hours === "never") hours += 3;
  else if (answers.after_hours === "sometimes") hours += 1.5;
  if (answers.booking_system === "manual") hours += 4;
  else if (answers.booking_system === "bad") hours += 2;
  if (answers.repetitive_hours === "more_3h") hours += 8;
  else if (answers.repetitive_hours === "1_3h") hours += 4;
  else hours += 2;
  if (answers.whatsapp_usage === "heavy") hours += 3;
  if (answers.monthly_queries === "more_200") hours += 3;
  else if (answers.monthly_queries === "50_200") hours += 1.5;

  const weeklyHours = Math.round(hours);
  return {
    hours: weeklyHours,
    message: `¡Listo! Basándome en tus respuestas, tienes potencial de automatizar hasta ${weeklyHours} horas/semana y capturar leads que ahora estás perdiendo. Te envío tu informe en menos de 24h. Mientras tanto, ¿quieres agendar una llamada de 20 minutos?`,
  };
}

export function calculateEnterpriseScore(answers: Record<string, string>): { savings: number; message: string; company: string } {
  let hourlyRate = 75;
  if (answers.hour_cost === "100_300") hourlyRate = 200;
  else if (answers.hour_cost === "300_plus") hourlyRate = 400;

  let hoursPerMonth = 40;
  if (answers.company_size === "20_100") hoursPerMonth = 80;
  else if (answers.company_size === "100_plus") hoursPerMonth = 160;
  if (answers.documented === "no") hoursPerMonth *= 1.3;

  const monthlySavings = Math.round(hoursPerMonth * hourlyRate * 0.4);

  return {
    savings: monthlySavings,
    message: `Excelente. Vuestra empresa tiene potencial de recuperar fácilmente €${monthlySavings.toLocaleString()} mensuales automatizando los procesos que mencionas. Voy a preparar un diagnóstico técnico detallado. ¿Cuándo tienes 30 minutos para una llamada con nuestro equipo técnico?`,
    company: answers.company_name || "tu empresa",
  };
}
