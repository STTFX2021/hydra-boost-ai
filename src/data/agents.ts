import {
  BarChart3, MessageSquare, Zap, Headphones, CalendarCheck, Database,
  Mail, BrainCircuit, Settings, Scale,
} from "lucide-react";

export interface AgentStep {
  name: string;
  description: string;
  tool: string;
  result: string;
}

export interface AgentUseCase {
  industry: string;
  scenario: string;
  result: string;
}

export interface AgentFAQ {
  question: string;
  answer: string;
}

export interface AgentWorkflowNode {
  id: string;
  label: string;
  type: "trigger" | "process" | "decision" | "action" | "output";
  description: string;
}

export interface AgentIntegration {
  name: string;
  category: string;
}

export interface AgentData {
  slug: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  subheadline: string;
  problem: string;
  solution: string;
  resultMetric: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  workflowNodes: AgentWorkflowNode[];
  steps: AgentStep[];
  integrations: AgentIntegration[];
  useCases: AgentUseCase[];
  faqs: AgentFAQ[];
}

export const AGENTS_DATA: AgentData[] = [
  {
    slug: "captacion-leads",
    name: "Agente de Captación de Leads",
    category: "Ventas",
    icon: BarChart3,
    headline: "Captura cada lead automáticamente, 24/7",
    subheadline: "Tu negocio nunca duerme. Este agente detecta, captura y registra cada lead que llega por web, WhatsApp o redes sociales antes de que se enfríe.",
    problem: "Pierdes leads porque no respondes a tiempo. Los visitantes llegan fuera de horario y se van sin dejar datos.",
    solution: "Un agente IA que detecta cada interacción entrante, extrae datos clave y los registra automáticamente en tu CRM o base de datos, con respuesta instantánea.",
    resultMetric: "+127% más leads capturados",
    description: "Captura y registra leads desde WhatsApp, web y redes sociales de forma automática.",
    seoTitle: "Agente IA de Captación de Leads | HydrAI Labs",
    seoDescription: "Captura automáticamente cada lead de WhatsApp, web y redes. Respuesta instantánea 24/7 y registro en CRM. +127% más leads capturados.",
    seoKeywords: "captación leads ia, agente captación automática, lead capture bot, automatización leads",
    workflowNodes: [
      { id: "1", label: "Visitante llega", type: "trigger", description: "Un visitante entra por web, WhatsApp o RRSS" },
      { id: "2", label: "Detección IA", type: "process", description: "El agente detecta la interacción en tiempo real" },
      { id: "3", label: "Extracción de datos", type: "process", description: "Extrae nombre, email, teléfono e intención" },
      { id: "4", label: "Respuesta inmediata", type: "action", description: "Envía mensaje personalizado al visitante" },
      { id: "5", label: "Registro en CRM", type: "action", description: "Crea el lead en tu base de datos automáticamente" },
      { id: "6", label: "Notificación al equipo", type: "action", description: "Alerta a tu equipo comercial en tiempo real" },
      { id: "7", label: "Lead capturado", type: "output", description: "Lead registrado, respondido y asignado sin intervención" },
    ],
    steps: [
      { name: "Detección multicanal", description: "El agente monitoriza web, WhatsApp, Instagram y formularios en paralelo.", tool: "Webhooks + APIs", result: "Ningún lead pasa desapercibido" },
      { name: "Extracción inteligente", description: "Analiza el mensaje o formulario y extrae datos clave automáticamente.", tool: "IA + NLP", result: "Datos limpios y estructurados" },
      { name: "Respuesta instantánea", description: "Envía un mensaje personalizado de bienvenida en menos de 3 segundos.", tool: "WhatsApp API / Email", result: "El lead siente atención inmediata" },
      { name: "Clasificación automática", description: "Asigna tags, canal de origen y nivel de interés inicial.", tool: "Motor de reglas IA", result: "Lead pre-cualificado desde el primer contacto" },
      { name: "Registro en CRM", description: "Crea o actualiza el registro del lead en tu sistema.", tool: "Supabase / CRM API", result: "Base de datos siempre actualizada" },
      { name: "Notificación al equipo", description: "Alerta al vendedor asignado con resumen del lead.", tool: "Email / Slack / WhatsApp", result: "Tu equipo actúa rápido" },
    ],
    integrations: [
      { name: "WhatsApp", category: "Canal" },
      { name: "Formularios web", category: "Canal" },
      { name: "Instagram", category: "Canal" },
      { name: "Email", category: "Canal" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "CRM", category: "Gestión" },
      { name: "Google Sheets", category: "Datos" },
    ],
    useCases: [
      { industry: "Restaurante", scenario: "Un cliente pregunta por WhatsApp a las 23:00 si hay mesa. El agente responde, captura sus datos y los registra.", result: "Reserva confirmada sin intervención humana" },
      { industry: "Clínica estética", scenario: "Una persona rellena un formulario web pidiendo info sobre tratamientos. El agente responde al instante con precios y agenda.", result: "+60% de conversión de formularios a cita" },
      { industry: "Inmobiliaria", scenario: "Un comprador contacta por Instagram. El agente extrae ubicación deseada, presupuesto y datos de contacto.", result: "Lead cualificado en segundos, no en horas" },
    ],
    faqs: [
      { question: "¿Cuánto tarda en implementarse?", answer: "Entre 5 y 10 días hábiles, incluyendo configuración, integración con tus canales y pruebas." },
      { question: "¿Necesito tener un CRM?", answer: "No es obligatorio. Podemos usar una base de datos propia o integrarlo con tu CRM existente (HubSpot, Pipedrive, etc.)." },
      { question: "¿Funciona con WhatsApp?", answer: "Sí. Se integra con la API oficial de WhatsApp Business para captura y respuesta automática." },
      { question: "¿Sustituye a mi equipo comercial?", answer: "No. Lo potencia. El agente captura y organiza; tu equipo cierra la venta con mejor información." },
      { question: "¿Qué pasa si el lead necesita atención humana?", answer: "El agente detecta intención compleja y escala automáticamente a un humano con todo el contexto." },
    ],
  },
  {
    slug: "cualificacion-comercial",
    name: "Agente de Cualificación Comercial",
    category: "Ventas",
    icon: MessageSquare,
    headline: "Cualifica leads en segundos, no en días",
    subheadline: "Tu equipo solo habla con leads que valen la pena. Este agente evalúa, puntúa y enruta cada lead automáticamente.",
    problem: "Tu equipo pierde tiempo con leads no cualificados. No hay criterio uniforme y los mejores leads se enfrían esperando.",
    solution: "Un agente IA que analiza cada lead con scoring inteligente, aplica criterios de cualificación y los enruta al vendedor adecuado.",
    resultMetric: "70% menos tiempo en cualificación manual",
    description: "Cualifica leads automáticamente con scoring IA y los enruta al vendedor adecuado.",
    seoTitle: "Agente IA de Cualificación Comercial | HydrAI Labs",
    seoDescription: "Cualifica leads automáticamente con scoring IA. Enruta al vendedor adecuado y reduce un 70% el tiempo de cualificación manual.",
    seoKeywords: "cualificación leads ia, scoring comercial automático, lead qualification bot",
    workflowNodes: [
      { id: "1", label: "Lead entrante", type: "trigger", description: "Un nuevo lead llega al sistema" },
      { id: "2", label: "Análisis IA", type: "process", description: "Evalúa perfil, intención y datos disponibles" },
      { id: "3", label: "Scoring", type: "process", description: "Asigna puntuación según criterios configurados" },
      { id: "4", label: "¿Cualificado?", type: "decision", description: "Si score > umbral → prioridad alta" },
      { id: "5", label: "Enrutamiento", type: "action", description: "Asigna al vendedor óptimo según zona/vertical" },
      { id: "6", label: "Notificación", type: "action", description: "Alerta con ficha resumen al vendedor" },
      { id: "7", label: "Lead listo", type: "output", description: "El vendedor recibe un lead cualificado con contexto" },
    ],
    steps: [
      { name: "Recepción del lead", description: "El lead entra por cualquier canal y se centraliza en el sistema.", tool: "Webhooks + API", result: "Punto único de entrada" },
      { name: "Enriquecimiento de datos", description: "Se cruzan datos con fuentes externas para completar el perfil.", tool: "APIs de enriquecimiento", result: "Perfil completo del lead" },
      { name: "Scoring inteligente", description: "Se aplica un modelo de puntuación basado en criterios de negocio.", tool: "Motor IA de scoring", result: "Puntuación objetiva y consistente" },
      { name: "Clasificación", description: "Se asigna prioridad (alta, media, baja) y vertical.", tool: "Reglas de negocio IA", result: "Lead categorizado automáticamente" },
      { name: "Enrutamiento al vendedor", description: "Se asigna al comercial adecuado por zona, idioma o especialidad.", tool: "Motor de routing", result: "El mejor vendedor para cada lead" },
      { name: "Briefing automático", description: "El vendedor recibe una ficha con contexto, puntuación y recomendación.", tool: "Email / CRM / Slack", result: "Conversación informada desde el primer contacto" },
    ],
    integrations: [
      { name: "CRM", category: "Gestión" },
      { name: "Email", category: "Canal" },
      { name: "WhatsApp", category: "Canal" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "Google Sheets", category: "Datos" },
      { name: "APIs", category: "Enriquecimiento" },
    ],
    useCases: [
      { industry: "Empresa de servicios", scenario: "Llegan 50 leads al mes. El agente puntúa cada uno y el equipo solo dedica tiempo a los 15 con más potencial.", result: "70% menos tiempo invertido en leads fríos" },
      { industry: "Inmobiliaria", scenario: "Leads de portales inmobiliarios se evalúan por presupuesto, zona y urgencia antes de asignar agente.", result: "Los mejores agentes trabajan los mejores leads" },
      { industry: "Clínica estética", scenario: "Leads de campañas de Instagram se cualifican por tratamiento, presupuesto y disponibilidad.", result: "Reducción del 50% en llamadas improductivas" },
    ],
    faqs: [
      { question: "¿Cómo se definen los criterios de cualificación?", answer: "Los configuramos contigo según tu negocio: presupuesto, zona, urgencia, vertical, canal de entrada y cualquier criterio relevante." },
      { question: "¿Se puede personalizar el scoring?", answer: "Sí. El modelo se adapta a tus prioridades comerciales y se ajusta con el tiempo." },
      { question: "¿Funciona con mi CRM actual?", answer: "Sí. Se integra con HubSpot, Pipedrive, Salesforce o cualquier CRM con API." },
      { question: "¿Qué pasa con los leads de baja puntuación?", answer: "Entran en un flujo de nurturing automático para reactivarlos cuando estén listos." },
    ],
  },
  {
    slug: "seguimiento-whatsapp",
    name: "Agente de Seguimiento por WhatsApp",
    category: "Ventas",
    icon: Zap,
    headline: "Follow-up automático que convierte leads fríos en clientes",
    subheadline: "El 80% de las ventas requiere seguimiento. Este agente hace follow-up inteligente por WhatsApp sin que tu equipo pierda tiempo.",
    problem: "Leads que se enfrían porque nadie les hace seguimiento. Tu equipo no tiene tiempo o se olvida.",
    solution: "Un agente IA que programa y ejecuta secuencias de follow-up personalizadas por WhatsApp, adaptándose al comportamiento del lead.",
    resultMetric: "+45% tasa de conversión",
    description: "Follow-up automático multicanal que convierte leads fríos en clientes.",
    seoTitle: "Agente IA de Seguimiento por WhatsApp | HydrAI Labs",
    seoDescription: "Follow-up automático e inteligente por WhatsApp. Convierte leads fríos en clientes con secuencias personalizadas. +45% de conversión.",
    seoKeywords: "seguimiento whatsapp ia, follow up automático, nurturing whatsapp bot",
    workflowNodes: [
      { id: "1", label: "Lead sin respuesta", type: "trigger", description: "Un lead no ha respondido en X horas/días" },
      { id: "2", label: "Análisis de contexto", type: "process", description: "Revisa historial, interés y momento" },
      { id: "3", label: "Selección de mensaje", type: "process", description: "Elige el mensaje óptimo según la secuencia" },
      { id: "4", label: "Envío por WhatsApp", type: "action", description: "Envía mensaje personalizado por WhatsApp" },
      { id: "5", label: "¿Responde?", type: "decision", description: "Si responde → escalada humana. Si no → siguiente paso" },
      { id: "6", label: "Registro de interacción", type: "action", description: "Actualiza CRM con resultado del seguimiento" },
      { id: "7", label: "Lead reactivado", type: "output", description: "Lead cálido y listo para conversación comercial" },
    ],
    steps: [
      { name: "Detección de inactividad", description: "El agente detecta leads que no han respondido según los tiempos configurados.", tool: "Motor de reglas", result: "Ningún lead se queda sin seguimiento" },
      { name: "Personalización del mensaje", description: "Genera un mensaje contextualizado según historial y perfil del lead.", tool: "IA generativa", result: "Mensajes naturales, no genéricos" },
      { name: "Envío por WhatsApp", description: "Envía el mensaje por la API oficial de WhatsApp Business.", tool: "WhatsApp Business API", result: "Entrega garantizada en el canal preferido" },
      { name: "Monitorización de respuesta", description: "Escucha si el lead responde y clasifica la respuesta.", tool: "Webhooks + NLP", result: "Respuestas detectadas al instante" },
      { name: "Escalada o siguiente paso", description: "Si hay interés → escala a humano. Si no → avanza en la secuencia.", tool: "Motor de decisión IA", result: "Cada lead recibe la atención correcta" },
    ],
    integrations: [
      { name: "WhatsApp", category: "Canal principal" },
      { name: "CRM", category: "Gestión" },
      { name: "n8n", category: "Automatización" },
      { name: "Supabase", category: "Base de datos" },
      { name: "Calendarios", category: "Agendar" },
    ],
    useCases: [
      { industry: "Restaurante", scenario: "Clientes que reservaron pero no confirmaron reciben un recordatorio personalizado por WhatsApp.", result: "-40% de no-shows en reservas" },
      { industry: "Clínica estética", scenario: "Leads de campañas que pidieron info pero no agendaron reciben 3 mensajes progresivos.", result: "+35% de leads reactivados" },
      { industry: "Inmobiliaria", scenario: "Compradores que visitaron propiedades pero no avanzaron reciben seguimiento con nuevas opciones.", result: "Más cierres con leads que parecían perdidos" },
    ],
    faqs: [
      { question: "¿Los mensajes parecen automáticos?", answer: "No. Están diseñados para sonar naturales y personalizados según el contexto de cada lead." },
      { question: "¿Puedo controlar la frecuencia de los mensajes?", answer: "Sí. Tú defines los intervalos, horarios y número máximo de contactos por lead." },
      { question: "¿Cumple con la normativa de WhatsApp?", answer: "Sí. Usamos la API oficial de WhatsApp Business con todas las políticas de opt-in." },
      { question: "¿Qué pasa cuando el lead responde?", answer: "El agente detecta la respuesta y escala a tu equipo con todo el contexto." },
    ],
  },
  {
    slug: "atencion-24-7",
    name: "Agente de Atención 24/7",
    category: "Atención al Cliente",
    icon: Headphones,
    headline: "Atención al cliente inteligente, sin horarios",
    subheadline: "Resuelve consultas, gestiona quejas y escala cuando es necesario. Tu negocio atiende incluso cuando tu equipo duerme.",
    problem: "No puedes atender fuera de horario. Las consultas se acumulan y los clientes se frustran.",
    solution: "Un chatbot conversacional con IA que entiende el contexto, resuelve dudas frecuentes, gestiona quejas y escala automáticamente.",
    resultMetric: "0 consultas sin responder",
    description: "Chatbot conversacional que resuelve consultas, gestiona quejas y escala cuando es necesario.",
    seoTitle: "Agente IA de Atención al Cliente 24/7 | HydrAI Labs",
    seoDescription: "Chatbot IA que atiende clientes 24/7. Resuelve consultas, gestiona quejas y escala automáticamente. 0 consultas sin responder.",
    seoKeywords: "chatbot atención cliente, atención 24 7 ia, agente soporte automático",
    workflowNodes: [
      { id: "1", label: "Cliente contacta", type: "trigger", description: "Mensaje por web, WhatsApp o email" },
      { id: "2", label: "Comprensión IA", type: "process", description: "Analiza intención, tono y urgencia" },
      { id: "3", label: "¿Puede resolver?", type: "decision", description: "Si es FAQ → responde. Si no → escala" },
      { id: "4", label: "Respuesta automática", type: "action", description: "Responde con información precisa y útil" },
      { id: "5", label: "Escalada humana", type: "action", description: "Transfiere a un agente con contexto completo" },
      { id: "6", label: "Registro y feedback", type: "action", description: "Guarda interacción y solicita valoración" },
      { id: "7", label: "Cliente atendido", type: "output", description: "Consulta resuelta o escalada con eficiencia" },
    ],
    steps: [
      { name: "Recepción multicanal", description: "Recibe mensajes de web, WhatsApp, Instagram y email en un solo punto.", tool: "APIs multicanal", result: "Canal unificado de atención" },
      { name: "Análisis de intención", description: "La IA comprende qué necesita el cliente y clasifica la consulta.", tool: "NLP avanzado", result: "Respuesta relevante, no genérica" },
      { name: "Base de conocimiento", description: "Busca en tu base de datos de respuestas, productos y políticas.", tool: "Vector DB + IA", result: "Respuestas precisas y actualizadas" },
      { name: "Respuesta conversacional", description: "Genera una respuesta natural adaptada al tono del cliente.", tool: "IA generativa", result: "Experiencia fluida y profesional" },
      { name: "Escalada inteligente", description: "Si no puede resolver, transfiere con todo el contexto al equipo.", tool: "Motor de escalada", result: "El agente humano no empieza de cero" },
      { name: "Aprendizaje continuo", description: "Cada interacción mejora las respuestas futuras del agente.", tool: "Feedback loop", result: "Mejor con cada conversación" },
    ],
    integrations: [
      { name: "WhatsApp", category: "Canal" },
      { name: "Email", category: "Canal" },
      { name: "Formularios web", category: "Canal" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "CRM", category: "Gestión" },
    ],
    useCases: [
      { industry: "Restaurante", scenario: "Clientes preguntan por horarios, menú, alérgenos y reservas a cualquier hora.", result: "100% de consultas respondidas al instante" },
      { industry: "E-commerce", scenario: "Consultas sobre estado de pedidos, devoluciones y tallas se resuelven sin espera.", result: "-80% de tickets de soporte" },
      { industry: "Clínica estética", scenario: "Pacientes preguntan por tratamientos, precios y preparación previa.", result: "Más citas agendadas con menos esfuerzo" },
    ],
    faqs: [
      { question: "¿Puede responder preguntas específicas de mi negocio?", answer: "Sí. Se entrena con tu base de conocimiento: productos, servicios, precios, políticas, horarios, etc." },
      { question: "¿Qué pasa si no sabe responder?", answer: "Escala automáticamente a tu equipo con todo el contexto de la conversación." },
      { question: "¿Se integra con mi sistema de tickets?", answer: "Sí. Puede crear, actualizar y cerrar tickets en tu sistema existente." },
      { question: "¿Soporta varios idiomas?", answer: "Sí. Puede atender en español, inglés y otros idiomas según tus necesidades." },
    ],
  },
  {
    slug: "gestion-citas",
    name: "Agente de Gestión de Citas",
    category: "Operaciones",
    icon: CalendarCheck,
    headline: "Agendar, confirmar y recordar sin intervención humana",
    subheadline: "Los no-shows cuestan dinero. Este agente gestiona todo el ciclo de citas: agenda, confirma, reprograma y envía recordatorios.",
    problem: "No-shows, citas perdidas, cancelaciones de último momento y agenda manual ineficiente.",
    solution: "Un agente IA que gestiona el ciclo completo de citas, integrado con tu calendario y canales de comunicación.",
    resultMetric: "-40% no-shows",
    description: "Agenda, confirma, reprograma y recuerda citas sin intervención humana.",
    seoTitle: "Agente IA de Gestión de Citas | HydrAI Labs",
    seoDescription: "Gestión automática de citas con IA. Agenda, confirma, reprograma y envía recordatorios. -40% de no-shows garantizado.",
    seoKeywords: "gestión citas ia, agendar citas automático, recordatorio citas bot, no shows reducir",
    workflowNodes: [
      { id: "1", label: "Solicitud de cita", type: "trigger", description: "Cliente pide cita por web, WhatsApp o teléfono" },
      { id: "2", label: "Consulta disponibilidad", type: "process", description: "Revisa calendario y slots disponibles" },
      { id: "3", label: "Propuesta de horarios", type: "action", description: "Ofrece opciones al cliente" },
      { id: "4", label: "Confirmación", type: "action", description: "Agenda la cita y confirma a ambas partes" },
      { id: "5", label: "Recordatorio", type: "action", description: "Envía recordatorios antes de la cita" },
      { id: "6", label: "¿Confirma o cancela?", type: "decision", description: "Si cancela → ofrece reprogramar" },
      { id: "7", label: "Cita gestionada", type: "output", description: "Cita confirmada, recordada y sin no-show" },
    ],
    steps: [
      { name: "Solicitud entrante", description: "El cliente solicita cita por cualquier canal disponible.", tool: "WhatsApp / Web / Email", result: "Solicitud capturada al instante" },
      { name: "Verificación de disponibilidad", description: "El agente consulta tu calendario en tiempo real.", tool: "Google Calendar / API", result: "Solo ofrece horarios reales" },
      { name: "Agendamiento automático", description: "Confirma la cita y la registra en el calendario.", tool: "Google Calendar", result: "Cita agendada sin intervención" },
      { name: "Confirmación doble", description: "Envía confirmación al cliente y al profesional.", tool: "WhatsApp / Email", result: "Ambas partes informadas" },
      { name: "Recordatorios programados", description: "Envía recordatorios 24h y 2h antes de la cita.", tool: "Automatización n8n", result: "Menos olvidos, menos no-shows" },
      { name: "Gestión de cambios", description: "Si el cliente quiere reprogramar, el agente gestiona el cambio.", tool: "Motor de decisión", result: "Flexibilidad sin esfuerzo manual" },
    ],
    integrations: [
      { name: "Google Calendar", category: "Calendario" },
      { name: "WhatsApp", category: "Canal" },
      { name: "Email", category: "Canal" },
      { name: "n8n", category: "Automatización" },
      { name: "Supabase", category: "Base de datos" },
      { name: "Calendarios", category: "Agenda" },
    ],
    useCases: [
      { industry: "Clínica estética", scenario: "Pacientes agendan, reprograman y reciben recordatorios automáticos de sus tratamientos.", result: "-40% no-shows en consultas" },
      { industry: "Gimnasio", scenario: "Clases y sesiones de entrenamiento personal se gestionan sin recepcionista.", result: "Agenda 24/7 sin personal adicional" },
      { industry: "Restaurante", scenario: "Reservas de mesa gestionadas automáticamente con confirmación y recordatorio.", result: "Más mesas ocupadas, menos cancelaciones" },
    ],
    faqs: [
      { question: "¿Se sincroniza con Google Calendar?", answer: "Sí. Se integra con Google Calendar, Outlook y otros sistemas de calendario." },
      { question: "¿Puede gestionar múltiples profesionales?", answer: "Sí. Cada profesional tiene su propia agenda y el agente respeta las disponibilidades individuales." },
      { question: "¿Envía recordatorios por WhatsApp?", answer: "Sí. Recordatorios automáticos por WhatsApp, SMS o email según tu preferencia." },
      { question: "¿Qué pasa si el cliente cancela?", answer: "El agente ofrece automáticamente reprogramar y libera el slot en el calendario." },
    ],
  },
  {
    slug: "crm-lead-routing",
    name: "Agente de CRM y Lead Routing",
    category: "Operaciones",
    icon: Database,
    headline: "Tu CRM siempre actualizado, tus leads siempre bien asignados",
    subheadline: "Se acabaron los datos dispersos. Este agente sincroniza información entre plataformas y asigna leads al pipeline correcto.",
    problem: "Datos dispersos entre plataformas, asignaciones manuales lentas y leads que caen entre las grietas.",
    solution: "Un agente que centraliza datos, sincroniza plataformas y enruta leads automáticamente al pipeline y vendedor correctos.",
    resultMetric: "CRM siempre actualizado al instante",
    description: "Sincroniza datos entre plataformas y asigna leads al pipeline correcto automáticamente.",
    seoTitle: "Agente IA de CRM y Lead Routing | HydrAI Labs",
    seoDescription: "Sincronización automática de CRM y routing inteligente de leads. Datos siempre actualizados, leads siempre bien asignados.",
    seoKeywords: "crm automatización, lead routing ia, sincronización crm, asignación leads automática",
    workflowNodes: [
      { id: "1", label: "Nuevo dato/lead", type: "trigger", description: "Entra un lead o se actualiza un dato" },
      { id: "2", label: "Normalización", type: "process", description: "Limpia y estandariza los datos" },
      { id: "3", label: "Sincronización", type: "action", description: "Actualiza todas las plataformas conectadas" },
      { id: "4", label: "Clasificación", type: "process", description: "Asigna pipeline según tipo y vertical" },
      { id: "5", label: "Routing", type: "action", description: "Enruta al vendedor óptimo" },
      { id: "6", label: "Actualización CRM", type: "action", description: "Registra el estado en tiempo real" },
      { id: "7", label: "Datos sincronizados", type: "output", description: "Todo el equipo trabaja con la misma información" },
    ],
    steps: [
      { name: "Captura de cambios", description: "Detecta nuevos leads o actualizaciones en cualquier plataforma.", tool: "Webhooks + APIs", result: "Cambios detectados al instante" },
      { name: "Normalización de datos", description: "Limpia duplicados, formatos y campos incompletos.", tool: "Motor de limpieza IA", result: "Base de datos limpia y fiable" },
      { name: "Sincronización cruzada", description: "Actualiza CRM, hojas de cálculo y otras herramientas en paralelo.", tool: "n8n + APIs", result: "Una sola fuente de verdad" },
      { name: "Asignación inteligente", description: "Enruta cada lead al pipeline y vendedor correcto automáticamente.", tool: "Reglas de routing IA", result: "Asignación instantánea y justa" },
      { name: "Alertas y dashboards", description: "Notifica al equipo y actualiza métricas de pipeline en tiempo real.", tool: "Email / Slack / Dashboard", result: "Visibilidad total del embudo" },
    ],
    integrations: [
      { name: "CRM", category: "Gestión" },
      { name: "Google Sheets", category: "Datos" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "APIs", category: "Conectores" },
      { name: "Email", category: "Notificación" },
      { name: "WhatsApp", category: "Canal" },
    ],
    useCases: [
      { industry: "Empresa de servicios", scenario: "Leads de 5 fuentes distintas se centralizan automáticamente y se asignan por zona.", result: "0 leads perdidos entre plataformas" },
      { industry: "Inmobiliaria", scenario: "Propiedades y leads de múltiples portales se sincronizan en un solo CRM.", result: "Gestión unificada sin trabajo manual" },
      { industry: "E-commerce", scenario: "Pedidos, devoluciones y consultas se vinculan al perfil del cliente automáticamente.", result: "Visión 360° del cliente" },
    ],
    faqs: [
      { question: "¿Se integra con mi CRM actual?", answer: "Sí. Soportamos HubSpot, Pipedrive, Salesforce, Zoho y cualquier CRM con API." },
      { question: "¿Elimina duplicados?", answer: "Sí. Detecta y fusiona registros duplicados automáticamente." },
      { question: "¿Puedo definir reglas de routing personalizadas?", answer: "Sí. Las reglas se configuran según tus criterios: zona, vertical, carga de trabajo, especialidad." },
      { question: "¿Es bidireccional la sincronización?", answer: "Sí. Cambios en cualquier plataforma se reflejan en las demás." },
    ],
  },
  {
    slug: "automatizacion-emails",
    name: "Agente de Automatización de Emails",
    category: "Marketing",
    icon: Mail,
    headline: "Emails que convierten, sin escribir uno a uno",
    subheadline: "Secuencias de nurturing, bienvenida y reactivación con personalización IA. Más aperturas, más clics, más conversiones.",
    problem: "Emails genéricos con baja apertura. Secuencias manuales que nadie mantiene al día.",
    solution: "Un agente IA que genera, personaliza y envía secuencias de email adaptadas al perfil y comportamiento de cada lead.",
    resultMetric: "+60% open rate",
    description: "Sequences de nurturing, bienvenida y reactivación con personalización IA.",
    seoTitle: "Agente IA de Automatización de Emails | HydrAI Labs",
    seoDescription: "Automatización de email marketing con IA. Secuencias personalizadas de nurturing, bienvenida y reactivación. +60% de open rate.",
    seoKeywords: "automatización emails ia, email marketing bot, nurturing automático, sequences ia",
    workflowNodes: [
      { id: "1", label: "Trigger de secuencia", type: "trigger", description: "Lead entra, compra, se inactiva..." },
      { id: "2", label: "Segmentación", type: "process", description: "Clasifica al lead por perfil y comportamiento" },
      { id: "3", label: "Generación de contenido", type: "process", description: "IA genera el email personalizado" },
      { id: "4", label: "Envío programado", type: "action", description: "Se envía en el momento óptimo" },
      { id: "5", label: "Tracking", type: "process", description: "Monitoriza apertura, clics y respuestas" },
      { id: "6", label: "¿Interacción?", type: "decision", description: "Si abre/clica → siguiente paso. Si no → alternativa" },
      { id: "7", label: "Conversión", type: "output", description: "Lead avanzado en el funnel" },
    ],
    steps: [
      { name: "Definición de triggers", description: "Se configuran los eventos que activan cada secuencia.", tool: "Motor de reglas", result: "Emails enviados en el momento justo" },
      { name: "Segmentación inteligente", description: "Cada lead recibe la secuencia adecuada según su perfil.", tool: "IA de segmentación", result: "Contenido relevante para cada persona" },
      { name: "Generación de copy", description: "La IA genera asuntos y cuerpos de email personalizados.", tool: "IA generativa", result: "Emails que suenan humanos" },
      { name: "Envío optimizado", description: "Se envía en el horario con más probabilidad de apertura.", tool: "Resend / SMTP", result: "Máxima entregabilidad y apertura" },
      { name: "Análisis de resultados", description: "Se trackea apertura, clics, respuestas y conversiones.", tool: "Analytics integrado", result: "Mejora continua basada en datos" },
    ],
    integrations: [
      { name: "Resend", category: "Email" },
      { name: "Email", category: "Canal" },
      { name: "n8n", category: "Automatización" },
      { name: "Supabase", category: "Base de datos" },
      { name: "CRM", category: "Gestión" },
      { name: "Google Sheets", category: "Datos" },
    ],
    useCases: [
      { industry: "E-commerce", scenario: "Carrito abandonado → secuencia de 3 emails con descuento progresivo.", result: "+25% recuperación de carritos" },
      { industry: "Empresa de servicios", scenario: "Leads de formulario reciben secuencia de bienvenida + caso de éxito.", result: "+40% de leads que piden demo" },
      { industry: "Clínica estética", scenario: "Pacientes que no vuelven reciben emails de reactivación con ofertas personalizadas.", result: "Clientes dormidos que vuelven a reservar" },
    ],
    faqs: [
      { question: "¿Los emails parecen automáticos?", answer: "No. La IA genera contenido personalizado que suena natural y adaptado a cada lead." },
      { question: "¿Puedo aprobar los emails antes de enviarlos?", answer: "Sí. Puedes configurar flujos con aprobación manual o dejarlos en modo automático." },
      { question: "¿Qué herramienta de envío usan?", answer: "Resend por defecto, pero se puede integrar con cualquier servicio SMTP o plataforma de email." },
      { question: "¿Se puede medir el ROI?", answer: "Sí. Se trackean aperturas, clics, conversiones y atribución por secuencia." },
    ],
  },
  {
    slug: "documentacion-resumenes",
    name: "Agente de Documentación y Resúmenes",
    category: "Conocimiento",
    icon: BrainCircuit,
    headline: "De documentos largos a insights accionables en segundos",
    subheadline: "Este agente lee, resume, extrae datos clave y genera reportes automáticos. Horas de lectura convertidas en segundos.",
    problem: "Horas leyendo y sintetizando información. Documentos largos que nadie procesa a tiempo.",
    solution: "Un agente IA que procesa documentos, extrae información relevante, genera resúmenes y crea reportes estructurados.",
    resultMetric: "Resúmenes en segundos",
    description: "Resume documentos, extrae insights y genera reportes automáticos.",
    seoTitle: "Agente IA de Documentación y Resúmenes | HydrAI Labs",
    seoDescription: "Agente IA que resume documentos, extrae insights y genera reportes automáticos. Horas de lectura convertidas en segundos.",
    seoKeywords: "resumen documentos ia, extracción datos automática, reportes ia, documentación automática",
    workflowNodes: [
      { id: "1", label: "Documento recibido", type: "trigger", description: "Se sube o recibe un documento" },
      { id: "2", label: "Análisis de contenido", type: "process", description: "IA lee y comprende el documento completo" },
      { id: "3", label: "Extracción de datos", type: "process", description: "Identifica datos clave, cifras y conclusiones" },
      { id: "4", label: "Generación de resumen", type: "action", description: "Crea resumen estructurado y ejecutivo" },
      { id: "5", label: "Reporte automático", type: "action", description: "Genera reporte en formato solicitado" },
      { id: "6", label: "Entrega", type: "output", description: "Resumen y datos listos para usar" },
    ],
    steps: [
      { name: "Ingesta de documento", description: "Sube PDFs, documentos Word, emails o textos al sistema.", tool: "Upload / Email / API", result: "Documento capturado y procesado" },
      { name: "Lectura inteligente", description: "La IA procesa el contenido completo con comprensión semántica.", tool: "NLP avanzado", result: "Comprensión total del documento" },
      { name: "Extracción de datos clave", description: "Identifica cifras, fechas, nombres, cláusulas y conclusiones.", tool: "IA de extracción", result: "Datos estructurados y utilizables" },
      { name: "Generación de resumen", description: "Crea un resumen ejecutivo adaptado a tu necesidad.", tool: "IA generativa", result: "Resumen claro y accionable" },
      { name: "Exportación", description: "Genera el output en PDF, Google Docs, email o tu formato preferido.", tool: "Exportadores", result: "Listo para compartir o archivar" },
    ],
    integrations: [
      { name: "Email", category: "Entrada" },
      { name: "Google Sheets", category: "Datos" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "APIs", category: "Conectores" },
      { name: "Documentos/PDF", category: "Archivos" },
    ],
    useCases: [
      { industry: "Legal", scenario: "Contratos de 50 páginas se resumen automáticamente con cláusulas clave y riesgos.", result: "Revisión 10x más rápida" },
      { industry: "Consultoría", scenario: "Informes de mercado se procesan y se extraen KPIs automáticamente.", result: "Insights listos para presentar al cliente" },
      { industry: "Empresa de servicios", scenario: "Actas de reunión se transcriben, resumen y distribuyen automáticamente.", result: "Cero seguimientos perdidos" },
    ],
    faqs: [
      { question: "¿Qué formatos de documento soporta?", answer: "PDF, Word, texto plano, emails y contenido web. Se amplía según necesidad." },
      { question: "¿Puede extraer datos de tablas?", answer: "Sí. Procesa tablas dentro de documentos y las convierte en datos estructurados." },
      { question: "¿Se puede personalizar el formato del resumen?", answer: "Sí. Se configura según tus necesidades: ejecutivo, detallado, por secciones, etc." },
      { question: "¿Es seguro para documentos confidenciales?", answer: "Sí. Los documentos se procesan de forma segura y no se almacenan más allá del procesamiento." },
    ],
  },
  {
    slug: "soporte-interno",
    name: "Agente de Soporte Interno",
    category: "Automatización",
    icon: Settings,
    headline: "Resuelve dudas internas sin interrumpir al equipo",
    subheadline: "Tu equipo pierde horas respondiendo las mismas preguntas. Este agente centraliza el conocimiento y responde automáticamente.",
    problem: "Preguntas internas que interrumpen el trabajo. Información dispersa y sin documentar.",
    solution: "Un agente IA que centraliza el conocimiento de la empresa, responde dudas del equipo y automatiza respuestas a preguntas repetitivas.",
    resultMetric: "-80% tickets internos",
    description: "Resuelve dudas del equipo, centraliza conocimiento y automatiza respuestas repetitivas.",
    seoTitle: "Agente IA de Soporte Interno | HydrAI Labs",
    seoDescription: "Agente IA que centraliza conocimiento y resuelve dudas del equipo automáticamente. -80% de tickets internos.",
    seoKeywords: "soporte interno ia, knowledge base bot, automatización interna, help desk ia",
    workflowNodes: [
      { id: "1", label: "Pregunta interna", type: "trigger", description: "Un empleado tiene una duda o necesita info" },
      { id: "2", label: "Búsqueda en KB", type: "process", description: "Busca en la base de conocimiento" },
      { id: "3", label: "¿Respuesta disponible?", type: "decision", description: "Si existe → responde. Si no → escala" },
      { id: "4", label: "Respuesta automática", type: "action", description: "Envía respuesta con la información encontrada" },
      { id: "5", label: "Escalada a experto", type: "action", description: "Redirige al responsable con contexto" },
      { id: "6", label: "Actualización KB", type: "action", description: "Nuevas respuestas alimentan la base de conocimiento" },
      { id: "7", label: "Duda resuelta", type: "output", description: "Equipo más productivo con menos interrupciones" },
    ],
    steps: [
      { name: "Consulta del empleado", description: "El empleado hace una pregunta por chat, Slack o el portal.", tool: "Chat / Slack / Web", result: "Pregunta recibida al instante" },
      { name: "Búsqueda semántica", description: "El agente busca en la base de conocimiento con comprensión semántica.", tool: "Vector DB + NLP", result: "Encuentra la respuesta más relevante" },
      { name: "Respuesta contextualizada", description: "Genera una respuesta clara y adaptada a la pregunta.", tool: "IA generativa", result: "Respuesta útil sin jerga innecesaria" },
      { name: "Escalada si necesario", description: "Si no hay respuesta, redirige al experto con contexto.", tool: "Motor de escalada", result: "El experto sabe qué se necesita" },
      { name: "Aprendizaje", description: "Las nuevas respuestas se añaden a la base de conocimiento.", tool: "Feedback loop", result: "Cada pregunta mejora el sistema" },
    ],
    integrations: [
      { name: "Email", category: "Canal" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "APIs", category: "Conectores" },
      { name: "Documentos/PDF", category: "Archivos" },
    ],
    useCases: [
      { industry: "Empresa de servicios", scenario: "Nuevos empleados consultan políticas, procesos y herramientas sin molestar a compañeros.", result: "Onboarding 3x más rápido" },
      { industry: "E-commerce", scenario: "El equipo de soporte consulta políticas de devolución y garantía sin buscar en manuales.", result: "Respuestas consistentes en todo el equipo" },
      { industry: "Consultoría", scenario: "Consultores acceden a metodologías, plantillas y mejores prácticas al instante.", result: "Más tiempo para el cliente, menos para buscar" },
    ],
    faqs: [
      { question: "¿Cómo se alimenta la base de conocimiento?", answer: "Se carga con tus documentos, FAQs, manuales y políticas. Se actualiza automáticamente con nuevas respuestas." },
      { question: "¿Se integra con Slack o Teams?", answer: "Sí. El agente responde directamente en el canal de comunicación de tu equipo." },
      { question: "¿Es seguro para información interna?", answer: "Sí. Los datos se procesan de forma segura y con accesos controlados." },
      { question: "¿Mejora con el tiempo?", answer: "Sí. Cada interacción enriquece la base de conocimiento y mejora las respuestas futuras." },
    ],
  },
  {
    slug: "compliance-documental",
    name: "Agente de Compliance Documental",
    category: "Legal",
    icon: Scale,
    headline: "Revisión legal automatizada, riesgos detectados al instante",
    subheadline: "Este agente revisa documentos contra normativa, detecta riesgos y genera alertas antes de que sea un problema.",
    problem: "Revisión legal lenta y propensa a errores. Documentos que se firman sin revisar al detalle.",
    solution: "Un agente IA que analiza documentos contra normativa aplicable, detecta cláusulas de riesgo y genera alertas automáticas.",
    resultMetric: "Revisión 10x más rápida",
    description: "Revisa documentos contra normativa, detecta riesgos y genera alertas.",
    seoTitle: "Agente IA de Compliance Documental | HydrAI Labs",
    seoDescription: "Revisión legal automatizada con IA. Analiza documentos contra normativa, detecta riesgos y genera alertas. 10x más rápido.",
    seoKeywords: "compliance ia, revisión legal automática, detección riesgos documentos, compliance documental",
    workflowNodes: [
      { id: "1", label: "Documento a revisar", type: "trigger", description: "Se sube un contrato, política o documento legal" },
      { id: "2", label: "Análisis normativo", type: "process", description: "Compara contra normativa aplicable" },
      { id: "3", label: "Detección de riesgos", type: "process", description: "Identifica cláusulas peligrosas o ausentes" },
      { id: "4", label: "¿Riesgo detectado?", type: "decision", description: "Si hay riesgo → alerta. Si no → aprobación" },
      { id: "5", label: "Alerta de riesgo", type: "action", description: "Notifica al equipo legal con detalle" },
      { id: "6", label: "Reporte de compliance", type: "action", description: "Genera reporte con hallazgos y recomendaciones" },
      { id: "7", label: "Documento revisado", type: "output", description: "Revisión completa con riesgos identificados" },
    ],
    steps: [
      { name: "Carga del documento", description: "Se sube el documento a revisar al sistema.", tool: "Upload / Email", result: "Documento listo para análisis" },
      { name: "Parsing del contenido", description: "Extrae texto, cláusulas, fechas y datos relevantes.", tool: "OCR + NLP", result: "Contenido estructurado y analizable" },
      { name: "Comparación normativa", description: "Compara cada cláusula contra la normativa aplicable.", tool: "IA legal + DB normativa", result: "Cumplimiento verificado punto a punto" },
      { name: "Detección de riesgos", description: "Identifica cláusulas peligrosas, ausentes o ambiguas.", tool: "Motor de detección IA", result: "Riesgos visibles antes de firmar" },
      { name: "Generación de reporte", description: "Crea un reporte con hallazgos, riesgos y recomendaciones.", tool: "Generador de reportes", result: "Informe profesional listo para actuar" },
      { name: "Notificación", description: "Alerta al equipo legal o responsable con los hallazgos.", tool: "Email / Slack", result: "Nadie firma sin revisar" },
    ],
    integrations: [
      { name: "Documentos/PDF", category: "Archivos" },
      { name: "Email", category: "Canal" },
      { name: "Supabase", category: "Base de datos" },
      { name: "n8n", category: "Automatización" },
      { name: "APIs", category: "Normativa" },
      { name: "Google Sheets", category: "Datos" },
    ],
    useCases: [
      { industry: "Inmobiliaria", scenario: "Contratos de compraventa se revisan automáticamente antes de enviar al cliente.", result: "0 contratos firmados con cláusulas de riesgo" },
      { industry: "Consultoría", scenario: "Propuestas comerciales se verifican contra políticas internas antes de enviar.", result: "Menos errores legales en propuestas" },
      { industry: "Empresa de servicios", scenario: "Contratos de proveedores se analizan para detectar penalizaciones ocultas.", result: "Negociaciones más seguras y mejor informadas" },
    ],
    faqs: [
      { question: "¿Sustituye a un abogado?", answer: "No. Es una herramienta de apoyo que acelera la revisión y detecta riesgos. La decisión final es siempre humana." },
      { question: "¿Qué normativa aplica?", answer: "Se configura según tu sector y jurisdicción: GDPR, normativa española, sector-específica, etc." },
      { question: "¿Puede revisar contratos en varios idiomas?", answer: "Sí. Soporta español, inglés y otros idiomas según configuración." },
      { question: "¿Se actualiza con cambios normativos?", answer: "Sí. La base normativa se actualiza periódicamente para reflejar cambios regulatorios." },
    ],
  },
];

export function getAgentBySlug(slug: string): AgentData | undefined {
  return AGENTS_DATA.find((a) => a.slug === slug);
}

export function getAdjacentAgents(slug: string): { prev?: AgentData; next?: AgentData } {
  const idx = AGENTS_DATA.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? AGENTS_DATA[idx - 1] : undefined,
    next: idx < AGENTS_DATA.length - 1 ? AGENTS_DATA[idx + 1] : undefined,
  };
}
