import {
  Globe,
  MessageCircle,
  Brain,
  Calendar,
  Bell,
  CreditCard,
  ShoppingCart,
  FileText,
  Users,
  Search,
  type LucideIcon,
} from "lucide-react";

export type IndustryId = "restaurants" | "clinics" | "ecommerce" | "services" | "realestate";

export interface FlowStep {
  title: string;
  desc: string;
  event?: string;
  icon: LucideIcon;
}

export interface IndustryFlow {
  label: string;
  headline: string;
  kpi: string;
  benefits: string[];
  steps: FlowStep[];
}

export const INDUSTRY_FLOWS: Record<IndustryId, IndustryFlow> = {
  restaurants: {
    label: "Restaurantes",
    headline: "De 0 a reserva confirmada en 90 segundos",
    kpi: "+127 reservas/mes, -15h trabajo/semana",
    benefits: [
      "Reservas 24/7 sin intervención humana",
      "Reducción de no-shows un 40%",
      "Sugerencias de menú personalizadas",
      "Gestión automática de cancelaciones",
    ],
    steps: [
      { title: "Captura del mensaje", desc: "El cliente envía un mensaje por WhatsApp o web solicitando reserva.", event: "message.received", icon: MessageCircle },
      { title: "IA interpreta intención", desc: "El modelo de lenguaje clasifica la intención: reserva, consulta o queja.", event: "lead.new", icon: Brain },
      { title: "Comprobación de disponibilidad", desc: "Se consulta el calendario en tiempo real y se ofrece la mejor franja.", event: "calendar.check", icon: Calendar },
      { title: "Confirmación automática", desc: "Se confirma la reserva y se envía recordatorio al cliente.", event: "booking.created", icon: Bell },
      { title: "Notificación al equipo", desc: "El restaurante recibe alerta con los detalles de la reserva.", event: "notification.sent", icon: Users },
    ],
  },
  clinics: {
    label: "Clínicas",
    headline: "Citas agendadas sin llamadas perdidas",
    kpi: "+89 citas/mes, 0 llamadas perdidas",
    benefits: [
      "Atención 24/7 sin personal adicional",
      "Recordatorios automáticos por WhatsApp",
      "Reducción de ausencias un 35%",
      "Respuestas a FAQs médicas al instante",
    ],
    steps: [
      { title: "Mensaje del paciente", desc: "Un paciente contacta por WhatsApp fuera de horario.", event: "message.received", icon: MessageCircle },
      { title: "Clasificación IA", desc: "La IA identifica si es urgencia, cita nueva o consulta general.", event: "lead.qualified", icon: Brain },
      { title: "Agenda automática", desc: "Se busca disponibilidad y se agenda la cita directamente.", event: "booking.created", icon: Calendar },
      { title: "Recordatorio enviado", desc: "Se programa un recordatorio 24h antes por WhatsApp.", event: "notification.sent", icon: Bell },
      { title: "Historial actualizado", desc: "La información se sincroniza con el sistema de la clínica.", event: "docs.sent", icon: FileText },
    ],
  },
  ecommerce: {
    label: "Ecommerce",
    headline: "Recupera carritos y vende mientras duermes",
    kpi: "+34% conversión, -60% consultas manuales",
    benefits: [
      "Recuperación automática de carritos abandonados",
      "Soporte 24/7 sin equipo extra",
      "Recomendaciones personalizadas por IA",
      "Tracking de pedidos automatizado",
    ],
    steps: [
      { title: "Carrito abandonado", desc: "Se detecta un carrito sin completar tras 30 minutos.", event: "cart.abandoned", icon: ShoppingCart },
      { title: "Mensaje de recuperación", desc: "Se envía un mensaje personalizado con incentivo.", event: "message.received", icon: MessageCircle },
      { title: "IA resuelve dudas", desc: "Si el cliente responde, la IA atiende consultas de producto.", event: "lead.qualified", icon: Brain },
      { title: "Pago completado", desc: "El cliente finaliza la compra directamente.", event: "payment.received", icon: CreditCard },
      { title: "Confirmación y tracking", desc: "Se envía confirmación y enlace de seguimiento.", event: "notification.sent", icon: Bell },
    ],
  },
  services: {
    label: "Servicios",
    headline: "Responde en <2min y convierte un 70% más",
    kpi: "+70% leads convertidos, respuesta <2min",
    benefits: [
      "Respuesta instantánea 24/7",
      "Calificación automática de leads",
      "Follow-up secuenciado sin esfuerzo",
      "Integración directa con tu CRM",
    ],
    steps: [
      { title: "Lead entrante", desc: "Un potencial cliente llega desde web, redes o anuncios.", event: "lead.new", icon: Globe },
      { title: "Respuesta inmediata", desc: "En menos de 2 minutos recibe un mensaje personalizado.", event: "message.received", icon: MessageCircle },
      { title: "Calificación IA", desc: "La IA evalúa presupuesto, urgencia y fit del lead.", event: "lead.qualified", icon: Brain },
      { title: "Follow-up automático", desc: "Se activa una secuencia de seguimiento multicanal.", event: "notification.sent", icon: Bell },
      { title: "Sync con CRM", desc: "El lead calificado se envía al CRM con toda la información.", event: "docs.sent", icon: FileText },
    ],
  },
  realestate: {
    label: "Inmobiliarias",
    headline: "Más visitas, menos gestión manual",
    kpi: "+95 visitas/mes, -20h trabajo/semana",
    benefits: [
      "Filtrado automático de leads",
      "Agendamiento de visitas sin llamadas",
      "Fichas de propiedades enviadas al instante",
      "Seguimiento post-visita automatizado",
    ],
    steps: [
      { title: "Consulta de propiedad", desc: "Un interesado pregunta por una propiedad en el portal.", event: "lead.new", icon: Search },
      { title: "Chatbot filtra", desc: "La IA califica al lead según presupuesto y preferencias.", event: "lead.qualified", icon: Brain },
      { title: "Envío de ficha", desc: "Se envía automáticamente la ficha detallada de la propiedad.", event: "docs.sent", icon: FileText },
      { title: "Visita agendada", desc: "Se agenda la visita en el calendario del agente.", event: "visit.scheduled", icon: Calendar },
      { title: "Follow-up post-visita", desc: "Después de la visita, se envía encuesta y opciones similares.", event: "notification.sent", icon: Bell },
    ],
  },
};

/** Maps UseCaseTabs tab index to IndustryId */
export const TAB_TO_INDUSTRY: IndustryId[] = [
  "restaurants",
  "clinics",
  "ecommerce",
  "services",
  "realestate",
];
