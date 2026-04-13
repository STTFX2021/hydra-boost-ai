/**
 * Extended conversion data for each agent.
 * Separated from base agent data for maintainability.
 */

export interface VerticalProposition {
  vertical: string;
  value: string;
}

export interface IdealSector {
  name: string;
  reason: string;
}

export interface SubstitutesBlock {
  replaces: string[];
  accelerates: string[];
  prevents: string[];
}

export interface ImpactMetric {
  label: string;
  value: string;
  context: string;
}

export interface DeliveryInfo {
  setup: string;
  integrations: string;
  testing: string;
  support: string;
  iteration: string;
  deploymentTime: "rápido" | "medio" | "avanzado";
  deploymentDays: string;
}

export interface StackItem {
  name: string;
  role: string;
}

export interface Signal {
  text: string;
}

export interface NextStep {
  label: string;
  href: string;
  type: "primary" | "secondary" | "link";
}

export interface RelatedLink {
  label: string;
  href: string;
  description: string;
}

export interface AgentConversionData {
  verticalPropositions: VerticalProposition[];
  idealSectors: IdealSector[];
  substitutes: SubstitutesBlock;
  impactMetrics: ImpactMetric[];
  delivery: DeliveryInfo;
  stack: StackItem[];
  signals: Signal[];
  nextSteps: NextStep[];
  relatedLinks: RelatedLink[];
}

export const AGENT_CONVERSION_DATA: Record<string, AgentConversionData> = {
  "captacion-leads": {
    verticalPropositions: [
      { vertical: "Restaurantes", value: "Captura reservas desde WhatsApp, web y Google Maps sin perder ninguna." },
      { vertical: "Clínicas", value: "Cada consulta sobre tratamientos se convierte en un lead con datos completos." },
      { vertical: "Inmobiliarias", value: "Leads de portales, RRSS y web centralizados y respondidos al instante." },
    ],
    idealSectors: [
      { name: "Restaurantes y hostelería", reason: "Alto volumen de consultas por WhatsApp fuera de horario." },
      { name: "Clínicas y centros de salud", reason: "Leads de alto valor que requieren respuesta inmediata." },
      { name: "Inmobiliarias", reason: "Múltiples fuentes de leads que necesitan centralización." },
      { name: "E-commerce", reason: "Visitantes web que abandonan sin dejar datos." },
      { name: "Servicios profesionales", reason: "Consultas por formulario que se pierden por falta de seguimiento." },
    ],
    substitutes: {
      replaces: ["Revisión manual de formularios", "Copiar/pegar datos entre plataformas", "Respuestas manuales fuera de horario"],
      accelerates: ["Tiempo de primera respuesta", "Registro en CRM", "Clasificación inicial del lead"],
      prevents: ["Leads perdidos por falta de respuesta", "Datos incompletos o erróneos", "Oportunidades que caducan"],
    },
    impactMetrics: [
      { label: "Tiempo de respuesta", value: "< 3s", context: "vs. media de 5h en respuesta manual" },
      { label: "Leads capturados", value: "+80-130%", context: "en negocios con tráfico web y WhatsApp activo" },
      { label: "Datos completos", value: "95%+", context: "de los leads registrados con todos los campos necesarios" },
      { label: "Cobertura horaria", value: "24/7", context: "sin necesidad de turnos extra" },
    ],
    delivery: {
      setup: "Configuración de canales, flujos de captura y plantillas de respuesta",
      integrations: "Conexión con WhatsApp Business, web, CRM y notificaciones",
      testing: "Pruebas end-to-end con leads de test en todos los canales",
      support: "Soporte técnico durante 30 días post-lanzamiento",
      iteration: "Ajustes de flujo y mensajes según resultados reales",
      deploymentTime: "rápido",
      deploymentDays: "5-10 días hábiles",
    },
    stack: [
      { name: "n8n", role: "Orquestación de flujos" },
      { name: "WhatsApp Business API", role: "Canal de captura y respuesta" },
      { name: "Supabase", role: "Base de datos de leads" },
      { name: "Webhooks", role: "Conexión entre canales" },
      { name: "IA / LLM", role: "Extracción inteligente de datos" },
      { name: "Email (Resend)", role: "Notificaciones al equipo" },
    ],
    signals: [
      { text: "Recibes consultas por WhatsApp o web y no siempre puedes responder rápido" },
      { text: "Pierdes leads porque llegan fuera de horario" },
      { text: "Copias datos manualmente de formularios a tu CRM o hoja de cálculo" },
      { text: "No tienes visibilidad de cuántos leads llegas a capturar realmente" },
      { text: "Tu equipo comercial se queja de que los leads llegan incompletos o tarde" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Cualificación", href: "/agentes-ia/cualificacion-comercial", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Cualificación Comercial", href: "/agentes-ia/cualificacion-comercial", description: "Complementa la captación con scoring automático." },
      { label: "Agente de Seguimiento por WhatsApp", href: "/agentes-ia/seguimiento-whatsapp", description: "Haz follow-up a los leads que capturas." },
      { label: "Arquitectura IA", href: "/arquitectura", description: "Conoce cómo se integran los agentes en un sistema completo." },
      { label: "Casos de éxito", href: "/casos", description: "Resultados reales con clientes similares." },
    ],
  },
  "cualificacion-comercial": {
    verticalPropositions: [
      { vertical: "Servicios B2B", value: "Filtra leads por presupuesto, urgencia y fit para que tu equipo solo trabaje oportunidades reales." },
      { vertical: "Inmobiliarias", value: "Evalúa automáticamente zona, presupuesto y tipo de propiedad antes de asignar agente." },
      { vertical: "Clínicas", value: "Clasifica pacientes por tratamiento, urgencia y capacidad de pago." },
    ],
    idealSectors: [
      { name: "Empresas de servicios B2B", reason: "Ciclos de venta largos donde cualificar bien ahorra semanas." },
      { name: "Inmobiliarias", reason: "Alto volumen de leads con diferente nivel de seriedad." },
      { name: "Consultoría", reason: "Necesita filtrar por presupuesto y complejidad de proyecto." },
      { name: "Clínicas y estética", reason: "Diferente valor por tipo de tratamiento." },
    ],
    substitutes: {
      replaces: ["Llamadas de cualificación manuales", "Criterios subjetivos de cada vendedor", "Hojas de cálculo con scoring manual"],
      accelerates: ["Asignación de leads al vendedor correcto", "Tiempo entre captura y primer contacto comercial", "Priorización del pipeline"],
      prevents: ["Vendedores trabajando leads que no van a cerrar", "Leads de alto valor que se enfrían", "Inconsistencia en la evaluación comercial"],
    },
    impactMetrics: [
      { label: "Tiempo de cualificación", value: "-70%", context: "frente a cualificación manual por teléfono" },
      { label: "Precisión del scoring", value: "85%+", context: "tasa de acierto en prioridad de leads" },
      { label: "Velocidad de asignación", value: "< 1 min", context: "desde captura hasta asignación al vendedor" },
    ],
    delivery: {
      setup: "Definición de criterios de scoring con tu equipo comercial",
      integrations: "Conexión con CRM, canales de entrada y notificaciones",
      testing: "Validación con muestra real de leads históricos",
      support: "Soporte y ajustes durante 30 días",
      iteration: "Refinamiento del modelo según feedback del equipo",
      deploymentTime: "medio",
      deploymentDays: "10-15 días hábiles",
    },
    stack: [
      { name: "n8n", role: "Orquestación de scoring y routing" },
      { name: "Supabase", role: "Almacenamiento y consulta de leads" },
      { name: "IA / LLM", role: "Análisis semántico de intención" },
      { name: "CRM", role: "Destino de leads cualificados" },
      { name: "Email (Resend)", role: "Notificaciones a vendedores" },
      { name: "APIs", role: "Enriquecimiento de datos" },
    ],
    signals: [
      { text: "Tu equipo dedica más del 40% de su tiempo a leads que no cierran" },
      { text: "No tienes criterios claros y uniformes para evaluar leads" },
      { text: "Los mejores leads a veces se asignan al vendedor equivocado" },
      { text: "Quieres priorizar tu pipeline pero no tienes un sistema objetivo" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Captación", href: "/agentes-ia/captacion-leads", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Captación de Leads", href: "/agentes-ia/captacion-leads", description: "Asegúrate de capturar todos los leads antes de cualificarlos." },
      { label: "Agente de CRM y Lead Routing", href: "/agentes-ia/crm-lead-routing", description: "Sincroniza y enruta leads a tu CRM." },
      { label: "Arquitectura IA", href: "/arquitectura", description: "Sistema completo de automatización." },
    ],
  },
  "seguimiento-whatsapp": {
    verticalPropositions: [
      { vertical: "Restaurantes", value: "Recordatorios de reserva y reactivación de clientes que no vuelven." },
      { vertical: "Clínicas", value: "Follow-up post-consulta y recordatorios de citas de seguimiento." },
      { vertical: "Inmobiliarias", value: "Secuencias de seguimiento para compradores que vieron propiedades pero no avanzaron." },
    ],
    idealSectors: [
      { name: "Cualquier negocio con ventas consultivas", reason: "Ciclos de venta que requieren múltiples contactos." },
      { name: "Clínicas y salud", reason: "Pacientes que necesitan recordatorios y seguimiento." },
      { name: "Inmobiliarias", reason: "Compradores que necesitan tiempo y seguimiento para decidir." },
      { name: "Restaurantes", reason: "Confirmación de reservas y reactivación de clientes." },
    ],
    substitutes: {
      replaces: ["Follow-up manual por WhatsApp", "Recordatorios escritos a mano", "Post-its con tareas de seguimiento"],
      accelerates: ["Reactivación de leads dormidos", "Confirmación de citas y reservas", "Velocidad de cierre comercial"],
      prevents: ["Leads que se pierden por falta de seguimiento", "Oportunidades olvidadas", "No-shows por falta de recordatorio"],
    },
    impactMetrics: [
      { label: "Leads reactivados", value: "+30-45%", context: "de leads que habían dejado de responder" },
      { label: "No-shows reducidos", value: "-40%", context: "con recordatorios programados" },
      { label: "Tiempo ahorrado", value: "15-20h/mes", context: "en seguimiento manual del equipo" },
    ],
    delivery: {
      setup: "Diseño de secuencias de follow-up y mensajes clave",
      integrations: "WhatsApp Business API, CRM, calendarios",
      testing: "Pruebas con leads reales en entorno controlado",
      support: "Soporte técnico 30 días post-lanzamiento",
      iteration: "Optimización de mensajes según tasas de respuesta",
      deploymentTime: "rápido",
      deploymentDays: "5-10 días hábiles",
    },
    stack: [
      { name: "WhatsApp Business API", role: "Canal de seguimiento" },
      { name: "n8n", role: "Orquestación de secuencias" },
      { name: "IA / LLM", role: "Personalización de mensajes" },
      { name: "Supabase", role: "Historial de interacciones" },
      { name: "CRM", role: "Estado del lead" },
    ],
    signals: [
      { text: "Tienes leads que pidieron info pero nunca les hiciste follow-up" },
      { text: "Tu equipo no tiene tiempo de hacer seguimiento a todos los contactos" },
      { text: "Sabes que WhatsApp funciona pero no tienes un sistema automatizado" },
      { text: "Los no-shows en citas o reservas te cuestan dinero" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Atención 24/7", href: "/agentes-ia/atencion-24-7", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Captación de Leads", href: "/agentes-ia/captacion-leads", description: "Captura los leads que luego recibirán seguimiento." },
      { label: "Agente de Gestión de Citas", href: "/agentes-ia/gestion-citas", description: "Agenda citas automáticamente tras el follow-up." },
      { label: "Casos de éxito", href: "/casos", description: "Resultados de seguimiento automatizado." },
    ],
  },
  "atencion-24-7": {
    verticalPropositions: [
      { vertical: "Restaurantes", value: "Responde preguntas sobre menú, horarios, alérgenos y reservas a cualquier hora." },
      { vertical: "E-commerce", value: "Resuelve consultas de pedidos, devoluciones y tallas sin espera." },
      { vertical: "Clínicas", value: "Informa sobre tratamientos, precios y preparación previa 24/7." },
    ],
    idealSectors: [
      { name: "Restaurantes y hostelería", reason: "Consultas frecuentes sobre carta, horarios y reservas." },
      { name: "E-commerce", reason: "Alto volumen de preguntas repetitivas sobre pedidos." },
      { name: "Clínicas", reason: "Pacientes que buscan información fuera de horario." },
      { name: "Servicios profesionales", reason: "Consultas previas a la contratación." },
    ],
    substitutes: {
      replaces: ["Respuestas manuales a preguntas repetitivas", "Línea telefónica con horario limitado", "FAQs estáticas que nadie lee"],
      accelerates: ["Tiempo de resolución de consultas", "Satisfacción del cliente", "Capacidad de atención sin contratar personal"],
      prevents: ["Clientes frustrados por falta de respuesta", "Reseñas negativas por atención lenta", "Oportunidades perdidas fuera de horario"],
    },
    impactMetrics: [
      { label: "Consultas resueltas", value: "70-85%", context: "sin intervención humana" },
      { label: "Tiempo de respuesta", value: "< 5s", context: "en cualquier horario" },
      { label: "Satisfacción", value: "4.5+/5", context: "valoración media de clientes atendidos por IA" },
    ],
    delivery: {
      setup: "Entrenamiento con base de conocimiento del negocio",
      integrations: "Web chat, WhatsApp, email, CRM",
      testing: "Testing con escenarios reales y edge cases",
      support: "Soporte técnico y mejoras 30 días",
      iteration: "Ampliación de base de conocimiento según nuevas preguntas",
      deploymentTime: "medio",
      deploymentDays: "10-15 días hábiles",
    },
    stack: [
      { name: "IA / LLM", role: "Comprensión y generación de respuestas" },
      { name: "Supabase", role: "Base de conocimiento y logs" },
      { name: "WhatsApp Business API", role: "Canal de atención" },
      { name: "n8n", role: "Escaladas y notificaciones" },
      { name: "Email (Resend)", role: "Notificaciones y seguimiento" },
    ],
    signals: [
      { text: "Recibes las mismas preguntas una y otra vez" },
      { text: "Pierdes clientes porque no puedes atender fuera de horario" },
      { text: "Tu equipo dedica demasiado tiempo a consultas que podrían automatizarse" },
      { text: "Has recibido reseñas negativas por tiempo de respuesta" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Soporte Interno", href: "/agentes-ia/soporte-interno", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Gestión de Citas", href: "/agentes-ia/gestion-citas", description: "Agenda citas desde la conversación de atención." },
      { label: "Agente de Captación de Leads", href: "/agentes-ia/captacion-leads", description: "Convierte consultas en leads registrados." },
      { label: "Chatbots IA", href: "/servicios/chatbots-ia", description: "Conoce nuestra oferta completa de chatbots." },
    ],
  },
  "gestion-citas": {
    verticalPropositions: [
      { vertical: "Clínicas", value: "Gestión completa de agenda: agendar, confirmar, reprogramar y recordar sin recepcionista." },
      { vertical: "Gimnasios", value: "Reserva de clases y sesiones de entrenamiento personal automatizadas." },
      { vertical: "Restaurantes", value: "Reservas de mesa gestionadas automáticamente con confirmación y recordatorio." },
    ],
    idealSectors: [
      { name: "Clínicas y centros de salud", reason: "Alta tasa de no-shows que se reduce con recordatorios." },
      { name: "Gimnasios y centros deportivos", reason: "Gestión de clases y entrenadores." },
      { name: "Restaurantes", reason: "Reservas y confirmaciones automatizadas." },
      { name: "Consultoría y servicios", reason: "Agenda de reuniones sin coordinación manual." },
    ],
    substitutes: {
      replaces: ["Llamadas telefónicas para confirmar citas", "Agenda manual en papel o Excel", "Recepcionista dedicada a gestionar cambios"],
      accelerates: ["Agendamiento desde cualquier canal", "Confirmación y recordatorio", "Reprogramación de cancelaciones"],
      prevents: ["No-shows costosos", "Agenda desactualizada", "Dobles reservas"],
    },
    impactMetrics: [
      { label: "No-shows reducidos", value: "-35-45%", context: "con recordatorios automáticos por WhatsApp" },
      { label: "Tiempo de gestión", value: "-80%", context: "en tareas de agenda y coordinación" },
      { label: "Citas agendadas 24/7", value: "100%", context: "cobertura sin personal adicional" },
    ],
    delivery: {
      setup: "Configuración de calendario, horarios y reglas de disponibilidad",
      integrations: "Google Calendar, WhatsApp, email, web",
      testing: "Pruebas de flujo completo: reserva → confirmación → recordatorio",
      support: "Soporte técnico 30 días post-lanzamiento",
      iteration: "Ajustes de intervalos y mensajes según resultados",
      deploymentTime: "rápido",
      deploymentDays: "5-10 días hábiles",
    },
    stack: [
      { name: "Google Calendar", role: "Gestión de agenda" },
      { name: "WhatsApp Business API", role: "Confirmaciones y recordatorios" },
      { name: "n8n", role: "Automatización de flujos" },
      { name: "Supabase", role: "Registro de citas" },
      { name: "Email (Resend)", role: "Confirmaciones por email" },
    ],
    signals: [
      { text: "Tienes más de 5 no-shows al mes" },
      { text: "Tu recepcionista dedica más de 2h/día a gestionar agenda" },
      { text: "Los clientes no pueden agendar fuera de horario" },
      { text: "Las cancelaciones de último momento te generan huecos sin cubrir" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Seguimiento", href: "/agentes-ia/seguimiento-whatsapp", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Atención 24/7", href: "/agentes-ia/atencion-24-7", description: "Atiende consultas y agenda citas desde la conversación." },
      { label: "Sectores: Clínicas", href: "/sectores/clinicas-estetica", description: "Soluciones completas para clínicas." },
      { label: "Sectores: Gimnasios", href: "/sectores/gimnasios", description: "Automatización para centros deportivos." },
    ],
  },
  "crm-lead-routing": {
    verticalPropositions: [
      { vertical: "Empresas multicanal", value: "Centraliza leads de web, portales, RRSS y WhatsApp en un solo pipeline limpio." },
      { vertical: "Inmobiliarias", value: "Leads de Idealista, Fotocasa y web propios sincronizados y asignados por zona." },
      { vertical: "Franquicias", value: "Routing por ubicación geográfica y capacidad de cada sede." },
    ],
    idealSectors: [
      { name: "Inmobiliarias", reason: "Múltiples portales y fuentes de leads que necesitan unificarse." },
      { name: "Empresas con equipos comerciales", reason: "Asignación justa y eficiente de leads." },
      { name: "Franquicias y multi-sede", reason: "Routing geográfico automático." },
      { name: "Empresas en crecimiento", reason: "CRM siempre limpio sin esfuerzo manual." },
    ],
    substitutes: {
      replaces: ["Copiar datos entre plataformas manualmente", "Asignación de leads 'a ojo'", "CRM desactualizado o con duplicados"],
      accelerates: ["Sincronización de datos entre sistemas", "Asignación al vendedor correcto", "Visibilidad del pipeline"],
      prevents: ["Leads perdidos entre plataformas", "Duplicados en CRM", "Vendedores sin leads o sobrecargados"],
    },
    impactMetrics: [
      { label: "Leads perdidos", value: "→ 0", context: "con centralización automática" },
      { label: "Tiempo de sync", value: "< 30s", context: "entre sistemas conectados" },
      { label: "Duplicados", value: "-95%", context: "detección y fusión automática" },
    ],
    delivery: {
      setup: "Mapeo de fuentes de datos y reglas de routing",
      integrations: "CRM, portales, web, Google Sheets, APIs",
      testing: "Verificación con datos reales de múltiples fuentes",
      support: "Soporte técnico 30 días",
      iteration: "Ajuste de reglas según feedback del equipo",
      deploymentTime: "medio",
      deploymentDays: "10-15 días hábiles",
    },
    stack: [
      { name: "n8n", role: "Orquestación y sincronización" },
      { name: "Supabase", role: "Base de datos central" },
      { name: "CRM", role: "Destino de leads organizados" },
      { name: "APIs", role: "Conexión con portales y fuentes" },
      { name: "Google Sheets", role: "Reporting y exportación" },
      { name: "Webhooks", role: "Sincronización en tiempo real" },
    ],
    signals: [
      { text: "Tienes leads en más de 2 plataformas diferentes sin sincronizar" },
      { text: "Pierdes tiempo copiando datos entre sistemas" },
      { text: "No sabes cuántos leads tienes realmente porque están dispersos" },
      { text: "La asignación de leads es manual y a veces injusta" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Cualificación", href: "/agentes-ia/cualificacion-comercial", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Cualificación Comercial", href: "/agentes-ia/cualificacion-comercial", description: "Puntúa los leads antes de enrutarlos." },
      { label: "Agente de Captación de Leads", href: "/agentes-ia/captacion-leads", description: "Asegúrate de capturar todos los leads primero." },
      { label: "Arquitectura IA", href: "/arquitectura", description: "Sistema completo de automatización." },
    ],
  },
  "automatizacion-emails": {
    verticalPropositions: [
      { vertical: "E-commerce", value: "Secuencias de carrito abandonado, bienvenida y recompra automáticas." },
      { vertical: "Servicios B2B", value: "Nurturing de leads con caso de éxito y oferta personalizada." },
      { vertical: "Clínicas", value: "Reactivación de pacientes dormidos con ofertas segmentadas." },
    ],
    idealSectors: [
      { name: "E-commerce", reason: "ROI directo en recuperación de carritos y recompra." },
      { name: "Servicios B2B", reason: "Ciclos de venta largos que requieren nurturing." },
      { name: "Clínicas y estética", reason: "Pacientes que necesitan recordatorios y reactivación." },
      { name: "SaaS y tecnología", reason: "Onboarding y engagement automatizado." },
    ],
    substitutes: {
      replaces: ["Enviar emails uno a uno", "Secuencias genéricas sin personalización", "Campañas manuales que nadie actualiza"],
      accelerates: ["Velocidad de nurturing", "Personalización a escala", "Cadencia de comunicación"],
      prevents: ["Leads que se olvidan de ti", "Emails con baja apertura", "Esfuerzo manual desproporcionado"],
    },
    impactMetrics: [
      { label: "Open rate", value: "+40-60%", context: "vs. emails genéricos sin personalización IA" },
      { label: "Click rate", value: "+25-35%", context: "con contenido adaptado al perfil del lead" },
      { label: "Leads reactivados", value: "15-25%", context: "de bases de datos dormidas" },
    ],
    delivery: {
      setup: "Diseño de secuencias, triggers y plantillas de email",
      integrations: "Resend, CRM, base de datos, analytics",
      testing: "Pruebas de entregabilidad y A/B testing inicial",
      support: "Soporte técnico y métricas durante 30 días",
      iteration: "Optimización de asuntos, copy y horarios según datos",
      deploymentTime: "medio",
      deploymentDays: "10-15 días hábiles",
    },
    stack: [
      { name: "Email (Resend)", role: "Envío y tracking de emails" },
      { name: "n8n", role: "Orquestación de secuencias" },
      { name: "IA / LLM", role: "Generación de copy personalizado" },
      { name: "Supabase", role: "Segmentación y datos de leads" },
      { name: "CRM", role: "Estado del lead y triggers" },
    ],
    signals: [
      { text: "Tus emails tienen un open rate por debajo del 20%" },
      { text: "No tienes secuencias automatizadas de bienvenida o nurturing" },
      { text: "Envías los mismos emails a toda tu base sin segmentar" },
      { text: "Tienes una base de datos de contactos que no trabajas" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Seguimiento WhatsApp", href: "/agentes-ia/seguimiento-whatsapp", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Seguimiento por WhatsApp", href: "/agentes-ia/seguimiento-whatsapp", description: "Complementa email con WhatsApp." },
      { label: "Agente de Captación de Leads", href: "/agentes-ia/captacion-leads", description: "Alimenta tus secuencias con leads nuevos." },
      { label: "Blog: Automatización IA", href: "/blog/automatizacion-ia-negocio-local", description: "Guía completa de automatización." },
    ],
  },
  "documentacion-resumenes": {
    verticalPropositions: [
      { vertical: "Legal", value: "Contratos de 50 páginas resumidos con cláusulas clave y riesgos." },
      { vertical: "Consultoría", value: "Informes de mercado procesados y KPIs extraídos automáticamente." },
      { vertical: "Empresas", value: "Actas de reunión transcritas, resumidas y distribuidas." },
    ],
    idealSectors: [
      { name: "Despachos legales", reason: "Alto volumen de documentación que requiere síntesis." },
      { name: "Consultoría", reason: "Informes y reportes que hay que procesar rápidamente." },
      { name: "Administración y operaciones", reason: "Documentación interna que acumula sin procesar." },
      { name: "Cualquier empresa con reporting", reason: "Reportes automáticos a partir de datos." },
    ],
    substitutes: {
      replaces: ["Lectura manual de documentos largos", "Resúmenes hechos a mano", "Extracción manual de datos de PDFs"],
      accelerates: ["Comprensión de documentos complejos", "Generación de reportes", "Distribución de información clave"],
      prevents: ["Información importante que pasa desapercibida", "Retrasos por lectura lenta", "Errores de interpretación"],
    },
    impactMetrics: [
      { label: "Tiempo de lectura", value: "-90%", context: "en documentos de más de 20 páginas" },
      { label: "Datos extraídos", value: "95%+ precisión", context: "en extracción de cifras y cláusulas clave" },
      { label: "Reportes generados", value: "Automático", context: "sin intervención manual" },
    ],
    delivery: {
      setup: "Configuración de tipos de documentos y formatos de salida",
      integrations: "Email, almacenamiento, herramientas de reporting",
      testing: "Pruebas con documentos reales del cliente",
      support: "Soporte técnico 30 días",
      iteration: "Ajuste de formatos y precisión según feedback",
      deploymentTime: "medio",
      deploymentDays: "10-15 días hábiles",
    },
    stack: [
      { name: "IA / LLM", role: "Comprensión y generación de resúmenes" },
      { name: "n8n", role: "Flujo de procesamiento" },
      { name: "Supabase", role: "Almacenamiento de resultados" },
      { name: "APIs", role: "Entrada de documentos" },
      { name: "Email (Resend)", role: "Distribución de resúmenes" },
    ],
    signals: [
      { text: "Tu equipo dedica más de 5h/semana a leer y resumir documentos" },
      { text: "Tienes documentos acumulados sin procesar" },
      { text: "Necesitas extraer datos de PDFs o contratos regularmente" },
      { text: "La información clave llega tarde por falta de síntesis" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Compliance", href: "/agentes-ia/compliance-documental", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Compliance Documental", href: "/agentes-ia/compliance-documental", description: "Revisión legal automatizada." },
      { label: "Agente de Soporte Interno", href: "/agentes-ia/soporte-interno", description: "Centraliza conocimiento para tu equipo." },
      { label: "Arquitectura IA", href: "/arquitectura", description: "Cómo se integran los agentes." },
    ],
  },
  "soporte-interno": {
    verticalPropositions: [
      { vertical: "Empresas en crecimiento", value: "Onboarding de empleados 3x más rápido con acceso centralizado a procesos." },
      { vertical: "E-commerce", value: "Equipo de soporte con acceso instantáneo a políticas y respuestas." },
      { vertical: "Consultoría", value: "Metodologías y plantillas accesibles al instante." },
    ],
    idealSectors: [
      { name: "Empresas con >10 empleados", reason: "Las preguntas internas crecen con el equipo." },
      { name: "E-commerce y retail", reason: "Equipos de atención que necesitan respuestas consistentes." },
      { name: "Consultoría y servicios", reason: "Acceso rápido a metodologías y plantillas." },
      { name: "Empresas con alta rotación", reason: "Onboarding que no depende de una persona." },
    ],
    substitutes: {
      replaces: ["Preguntar al compañero que 'sabe de eso'", "Buscar en carpetas compartidas sin orden", "Manuales en PDF que nadie lee"],
      accelerates: ["Onboarding de nuevos empleados", "Resolución de dudas internas", "Acceso a procesos y políticas"],
      prevents: ["Interrupciones constantes al equipo senior", "Información inconsistente entre empleados", "Conocimiento que se pierde cuando alguien se va"],
    },
    impactMetrics: [
      { label: "Tickets internos", value: "-70-85%", context: "preguntas repetitivas resueltas por IA" },
      { label: "Tiempo de onboarding", value: "-60%", context: "nuevos empleados productivos más rápido" },
      { label: "Satisfacción interna", value: "4.3+/5", context: "valoración del equipo sobre el sistema" },
    ],
    delivery: {
      setup: "Carga de documentación, FAQs y procesos internos",
      integrations: "Chat interno, email, herramientas de equipo",
      testing: "Pruebas con preguntas reales del equipo",
      support: "Soporte y ampliación de KB durante 30 días",
      iteration: "Nuevas respuestas se añaden automáticamente",
      deploymentTime: "medio",
      deploymentDays: "10-15 días hábiles",
    },
    stack: [
      { name: "IA / LLM", role: "Comprensión y generación de respuestas" },
      { name: "Supabase", role: "Base de conocimiento" },
      { name: "n8n", role: "Escaladas y notificaciones" },
      { name: "Email (Resend)", role: "Distribución de respuestas" },
      { name: "APIs", role: "Conexión con herramientas internas" },
    ],
    signals: [
      { text: "Tu equipo senior pierde tiempo respondiendo las mismas preguntas" },
      { text: "El onboarding de nuevos empleados tarda semanas" },
      { text: "La información importante está dispersa en carpetas, chats y emails" },
      { text: "Cuando alguien se va, su conocimiento se pierde" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Documentación", href: "/agentes-ia/documentacion-resumenes", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Documentación y Resúmenes", href: "/agentes-ia/documentacion-resumenes", description: "Genera resúmenes de documentos para alimentar la KB." },
      { label: "Agente de Atención 24/7", href: "/agentes-ia/atencion-24-7", description: "Misma tecnología aplicada a clientes externos." },
      { label: "Arquitectura IA", href: "/arquitectura", description: "Sistema completo." },
    ],
  },
  "compliance-documental": {
    verticalPropositions: [
      { vertical: "Inmobiliarias", value: "Contratos de compraventa revisados automáticamente antes de enviar al cliente." },
      { vertical: "Consultoría", value: "Propuestas comerciales verificadas contra políticas internas." },
      { vertical: "Empresas reguladas", value: "Documentación revisada contra normativa sectorial." },
    ],
    idealSectors: [
      { name: "Inmobiliarias", reason: "Alto volumen de contratos que requieren revisión legal." },
      { name: "Empresas reguladas", reason: "Normativa cambiante que requiere vigilancia continua." },
      { name: "Consultoría y servicios", reason: "Propuestas y contratos que deben cumplir políticas." },
      { name: "Cualquier empresa con contratos", reason: "Reducción de riesgo legal." },
    ],
    substitutes: {
      replaces: ["Revisión legal manual palabra por palabra", "Checklists en papel para compliance", "Esperar días por revisión del abogado"],
      accelerates: ["Detección de cláusulas de riesgo", "Comparación con normativa", "Generación de reportes de cumplimiento"],
      prevents: ["Firmar contratos con cláusulas perjudiciales", "Incumplimientos normativos", "Penalizaciones por errores documentales"],
    },
    impactMetrics: [
      { label: "Velocidad de revisión", value: "10x más rápido", context: "vs. revisión manual tradicional" },
      { label: "Riesgos detectados", value: "95%+", context: "tasa de detección de cláusulas problemáticas" },
      { label: "Coste de revisión", value: "-60-70%", context: "reducción en horas de revisión legal" },
    ],
    delivery: {
      setup: "Configuración de normativa aplicable y tipos de documentos",
      integrations: "Email, almacenamiento de documentos, notificaciones",
      testing: "Validación con documentos reales y cláusulas conocidas",
      support: "Soporte técnico y actualizaciones normativas",
      iteration: "Ampliación de reglas según nuevos tipos de documento",
      deploymentTime: "avanzado",
      deploymentDays: "15-25 días hábiles",
    },
    stack: [
      { name: "IA / LLM", role: "Análisis semántico de documentos" },
      { name: "n8n", role: "Flujo de revisión y alertas" },
      { name: "Supabase", role: "Base de reglas y normativa" },
      { name: "Email (Resend)", role: "Alertas de riesgo" },
      { name: "APIs", role: "Fuentes normativas" },
      { name: "Dashboards", role: "Visibilidad de cumplimiento" },
    ],
    signals: [
      { text: "Has firmado algún contrato sin revisión legal completa" },
      { text: "Tu abogado tarda días en revisar documentos urgentes" },
      { text: "No tienes un proceso sistemático de revisión documental" },
      { text: "La normativa de tu sector ha cambiado recientemente" },
    ],
    nextSteps: [
      { label: "Solicitar auditoría gratuita", href: "/auditoria-gratis", type: "primary" },
      { label: "Hablar por WhatsApp", href: "https://wa.me/34666666666", type: "secondary" },
      { label: "Ver Agente de Documentación", href: "/agentes-ia/documentacion-resumenes", type: "link" },
    ],
    relatedLinks: [
      { label: "Agente de Documentación y Resúmenes", href: "/agentes-ia/documentacion-resumenes", description: "Resume documentos antes de la revisión legal." },
      { label: "Agente de Soporte Interno", href: "/agentes-ia/soporte-interno", description: "Centraliza políticas y procedimientos." },
      { label: "Contacto", href: "/contacto", description: "Habla con nuestro equipo." },
    ],
  },
};

export function getAgentConversionData(slug: string): AgentConversionData | undefined {
  return AGENT_CONVERSION_DATA[slug];
}
