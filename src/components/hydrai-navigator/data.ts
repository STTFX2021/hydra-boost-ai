import { Automation, Pack, Mission, Urgency } from "./types";

export const AUTOMATIONS: Automation[] = [
  {
    id: "opportunity-engine",
    name: "Opportunity Engine",
    description: "Detecta oportunidades de venta automáticamente desde múltiples canales",
    forMissions: ["leads", "automation"],
  },
  {
    id: "radar",
    name: "Radar",
    description: "Monitoriza menciones y conversaciones relevantes para tu negocio",
    forMissions: ["leads", "automation"],
  },
  {
    id: "lead-engine",
    name: "Lead Engine",
    description: "Captura y cualifica leads 24/7 sin intervención manual",
    forMissions: ["leads"],
  },
  {
    id: "nutricion",
    name: "Sistema de Nutrición",
    description: "Secuencias automatizadas para convertir leads en clientes",
    forMissions: ["leads", "automation"],
  },
  {
    id: "sales-message-factory",
    name: "Sales Message Factory",
    description: "Genera mensajes de venta personalizados con IA",
    forMissions: ["leads", "automation"],
  },
  {
    id: "bookings",
    name: "Sistema de Reservas",
    description: "Agenda inteligente con confirmaciones y recordatorios automáticos",
    forMissions: ["bookings"],
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Métricas en tiempo real de todas tus automatizaciones",
    forMissions: ["leads", "bookings", "automation"],
  },
  {
    id: "ops-24-7",
    name: "Ops 24/7",
    description: "Operaciones continuas sin descanso, respuestas inmediatas",
    forMissions: ["automation"],
  },
  {
    id: "predictive-ops",
    name: "Predictive Ops",
    description: "Anticipa problemas y optimiza flujos antes de que fallen",
    forMissions: ["automation"],
  },
  {
    id: "agents-rol",
    name: "Agents por Rol",
    description: "Agentes IA especializados: ventas, soporte, onboarding",
    forMissions: ["leads", "bookings", "automation"],
  },
  {
    id: "dynamic-workflow",
    name: "Dynamic Workflow Creator",
    description: "Crea flujos personalizados sin código",
    forMissions: ["automation"],
  },
];

export const PACKS: Pack[] = [
  {
    id: "starter",
    name: "Starter",
    price: "199€/mes",
    description: "Perfecto para empezar a automatizar tu negocio",
    forMissions: ["leads", "bookings"],
    urgencyWeight: { today: 0.5, week: 1, exploring: 1.5 },
  },
  {
    id: "pro",
    name: "Pro",
    price: "499€/mes",
    description: "Para negocios que quieren escalar rápido",
    forMissions: ["leads", "bookings", "automation"],
    urgencyWeight: { today: 1, week: 1.2, exploring: 0.8 },
  },
  {
    id: "autonomous",
    name: "Autonomous",
    price: "999€/mes",
    description: "Automatización total. Tu negocio en piloto automático",
    forMissions: ["automation"],
    urgencyWeight: { today: 1.5, week: 1, exploring: 0.5 },
  },
];

export const MISSION_LABELS: Record<Mission, { title: string; icon: string; description: string }> = {
  leads: {
    title: "Quiero más clientes",
    icon: "🎯",
    description: "Leads cualificados en automático",
  },
  bookings: {
    title: "Quiero más reservas",
    icon: "📅",
    description: "Agenda llena sin esfuerzo",
  },
  automation: {
    title: "Automatizar todo",
    icon: "⚡",
    description: "Operaciones 24/7",
  },
};

export const CHANNEL_LABELS: Record<string, string> = {
  web: "Web",
  whatsapp: "WhatsApp",
  email: "Email",
  instagram: "Instagram",
  google: "Google",
};

export const URGENCY_LABELS: Record<Urgency, string> = {
  today: "Hoy mismo",
  week: "Esta semana",
  exploring: "Explorando opciones",
};

export function getRecommendedPack(mission: Mission, urgency: Urgency): Pack {
  const validPacks = PACKS.filter((p) => p.forMissions.includes(mission));
  
  // Sort by urgency weight
  validPacks.sort((a, b) => {
    return (b.urgencyWeight[urgency] || 1) - (a.urgencyWeight[urgency] || 1);
  });
  
  return validPacks[0] || PACKS[1]; // Default to Pro
}

export function getTopAutomations(mission: Mission, count: number = 2): Automation[] {
  return AUTOMATIONS.filter((a) => a.forMissions.includes(mission)).slice(0, count);
}

export const BOT_MESSAGES = {
  welcome: "Soy HydrAI Navigator. Elige una misión y te digo el plan en 45s.",
  askBusiness: "¿Qué negocio tienes?",
  askChannel: "¿Qué canal te importa más?",
  askUrgency: "¿Cuál es tu urgencia?",
  leadCapture: "¿Te aviso cuando esté listo el plan? (opcional)",
  final: "Nos vemos en Discord. Te atendemos en minutos.",
  guarantee: "Depende del negocio; hacemos auditoría y te proponemos el plan realista.",
};
