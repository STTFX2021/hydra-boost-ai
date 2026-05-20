import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed, Stethoscope, Car, Scissors, Home, Building2,
  ArrowRight, MessageSquare, Zap, Globe, Bot, Calendar,
  Brain, Radar, Target, Mail, Factory, CalendarCheck,
  BarChart3, Clock, TrendingUp, Users, Sparkles, Puzzle, Star, Crown
} from "lucide-react";
import { useTranslation, type Language } from "@/lib/i18n";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";

type Lang = Language;
const pick = <T,>(l: Lang, m: { es: T; en: T; de: T; ru: T }): T => m[l] ?? m.es;

const UI = {
  es: {
    seoTitle: "Sectores | HydrAI Labs",
    seoDesc: "Automatización IA para restaurantes, clínicas, inmobiliarias, gimnasios y más negocios locales en España.",
    breadcrumbHome: "Inicio", breadcrumbInd: "Industrias",
    freeAudit: "Auditoría Gratis", seePricing: "Ver Precios",
    catalogTitle: "Catálogo de Automatizaciones",
    catalogSubtitle: "Cada módulo puede contratarse individualmente o como parte de un pack.",
    packsTitle: "Packs Recomendados",
    packsSubtitle: "Combina automatizaciones con descuento. Incluye setup y soporte.",
    perMonth: "/mes", mostPopular: "Más popular", request: "Solicitar",
    annual: "💡 Pago anual: 2 meses gratis. Pregunta por descuentos para startups.",
    templatesBadge: "Plantillas", templatesTitle: "Plantillas por Sector",
    templatesSubtitle: "Ejemplos de automatizaciones adaptadas a industrias específicas.",
    botFlow: "Flujo del Bot", dataCaptured: "Datos que Captura", expectedResults: "Resultados Esperados",
    conversationExample: "Ejemplo de Conversación",
    ctaTitle: "¿Tu sector no está aquí?",
    ctaDesc: "Creamos automatizaciones personalizadas para cualquier negocio. Cuéntanos tu caso.",
  },
  en: {
    seoTitle: "Industries | HydrAI Labs",
    seoDesc: "AI automation for restaurants, clinics, real estate, gyms and other local businesses in Spain.",
    breadcrumbHome: "Home", breadcrumbInd: "Industries",
    freeAudit: "Free Audit", seePricing: "See Pricing",
    catalogTitle: "Automations Catalog",
    catalogSubtitle: "Each module can be purchased individually or as part of a pack.",
    packsTitle: "Recommended Packs",
    packsSubtitle: "Bundle automations with a discount. Includes setup and support.",
    perMonth: "/mo", mostPopular: "Most popular", request: "Request",
    annual: "💡 Annual payment: 2 months free. Ask about startup discounts.",
    templatesBadge: "Templates", templatesTitle: "Templates by Sector",
    templatesSubtitle: "Examples of automations adapted to specific industries.",
    botFlow: "Bot Flow", dataCaptured: "Data Captured", expectedResults: "Expected Results",
    conversationExample: "Conversation Example",
    ctaTitle: "Your sector not listed?",
    ctaDesc: "We create custom automations for any business. Tell us your case.",
  },
  de: {
    seoTitle: "Branchen | HydrAI Labs",
    seoDesc: "KI-Automatisierung für Restaurants, Kliniken, Immobilien, Fitnessstudios und weitere lokale Unternehmen in Spanien.",
    breadcrumbHome: "Start", breadcrumbInd: "Branchen",
    freeAudit: "Kostenloses Audit", seePricing: "Preise ansehen",
    catalogTitle: "Automatisierungskatalog",
    catalogSubtitle: "Jedes Modul kann einzeln oder als Teil eines Pakets gebucht werden.",
    packsTitle: "Empfohlene Pakete",
    packsSubtitle: "Kombinieren Sie Automatisierungen mit Rabatt. Inklusive Setup und Support.",
    perMonth: "/Mon.", mostPopular: "Am beliebtesten", request: "Anfragen",
    annual: "💡 Jährliche Zahlung: 2 Monate kostenlos. Fragen Sie nach Startup-Rabatten.",
    templatesBadge: "Vorlagen", templatesTitle: "Branchenvorlagen",
    templatesSubtitle: "Beispiele für Automatisierungen, angepasst an bestimmte Branchen.",
    botFlow: "Bot-Ablauf", dataCaptured: "Erfasste Daten", expectedResults: "Erwartete Ergebnisse",
    conversationExample: "Konversationsbeispiel",
    ctaTitle: "Ihre Branche fehlt?",
    ctaDesc: "Wir erstellen maßgeschneiderte Automatisierungen für jedes Unternehmen. Erzählen Sie uns von Ihrem Fall.",
  },
  ru: {
    seoTitle: "Отрасли | HydrAI Labs",
    seoDesc: "ИИ-автоматизация для ресторанов, клиник, агентств недвижимости, фитнес-клубов и других локальных бизнесов в Испании.",
    breadcrumbHome: "Главная", breadcrumbInd: "Отрасли",
    freeAudit: "Бесплатный аудит", seePricing: "Смотреть цены",
    catalogTitle: "Каталог автоматизаций",
    catalogSubtitle: "Каждый модуль можно подключить отдельно или в составе пакета.",
    packsTitle: "Рекомендуемые пакеты",
    packsSubtitle: "Комбинируйте автоматизации со скидкой. Включает настройку и поддержку.",
    perMonth: "/мес", mostPopular: "Самый популярный", request: "Запросить",
    annual: "💡 Годовая оплата: 2 месяца бесплатно. Спросите о скидках для стартапов.",
    templatesBadge: "Шаблоны", templatesTitle: "Шаблоны по отраслям",
    templatesSubtitle: "Примеры автоматизаций, адаптированных под конкретные отрасли.",
    botFlow: "Сценарий бота", dataCaptured: "Собираемые данные", expectedResults: "Ожидаемые результаты",
    conversationExample: "Пример переписки",
    ctaTitle: "Вашей отрасли нет в списке?",
    ctaDesc: "Создаём индивидуальные автоматизации для любого бизнеса. Расскажите о вашей задаче.",
  },
} as const;

const AUTOMATIONS = (language: Lang) => {
  const items = pick(language, {
    es: [
      ["Opportunity Intelligence Engine", "Detecta oportunidades de negocio, puntúa leads y dispara acciones automáticas."],
      ["Radar de Tendencias & Señales", "Señales programadas a Discord, Slack o Email según patrones de mercado."],
      ["Lead Engine (Captura + Scoring)", "Ingesta de leads multicanal + scoring hot/warm/cold + routing automático."],
      ["Nutrición Automática (Email/Brevo)", "Secuencias de emails y seguimiento automático hasta la conversión."],
      ["Sales Message Factory", "Generación de mensajes de ventas para leads hot/warm + reporting automático."],
      ["Bookings & Consultation Management", "Diagnóstico, agenda, recordatorios y follow-up post-cita automatizados."],
      ["Analytics & Insights (Daily/Weekly)", "Reportes automáticos con métricas clave + recomendaciones accionables."],
      ["Operaciones 24/7 (Cola Priorizada)", "Ejecución continua de tareas con sistema de prioridades inteligente."],
      ["Rutinas Predictivas (Predictive Ops)", "Anticipa fallos, tareas pendientes y actúa antes de que sea tarde."],
      ["Agentes por Rol (CEO/CTO/Tribe/Guild)", "Estrategia, innovación y coordinación interna con agentes especializados."],
      ["Dynamic Workflow Creator", "Creación controlada de nuevos workflows y agentes según necesidad."],
      ["Extras (Chrome / Integraciones)", "Extensión Chrome, APIs externas y conectores personalizados."],
    ],
    en: [
      ["Opportunity Intelligence Engine", "Detects business opportunities, scores leads and triggers automatic actions."],
      ["Trends & Signals Radar", "Scheduled signals to Discord, Slack or Email based on market patterns."],
      ["Lead Engine (Capture + Scoring)", "Multichannel lead ingestion + hot/warm/cold scoring + automatic routing."],
      ["Automatic Nurturing (Email/Brevo)", "Email sequences and automatic follow-up until conversion."],
      ["Sales Message Factory", "Sales message generation for hot/warm leads + automatic reporting."],
      ["Bookings & Consultation Management", "Automated diagnosis, scheduling, reminders and post-appointment follow-up."],
      ["Analytics & Insights (Daily/Weekly)", "Automatic reports with key metrics + actionable recommendations."],
      ["24/7 Operations (Priority Queue)", "Continuous task execution with intelligent priority system."],
      ["Predictive Routines (Predictive Ops)", "Anticipates failures, pending tasks and acts before it's too late."],
      ["Role Agents (CEO/CTO/Tribe/Guild)", "Strategy, innovation and internal coordination with specialized agents."],
      ["Dynamic Workflow Creator", "Controlled creation of new workflows and agents as needed."],
      ["Extras (Chrome / Integrations)", "Chrome extension, external APIs and custom connectors."],
    ],
    de: [
      ["Opportunity Intelligence Engine", "Erkennt Geschäftschancen, bewertet Leads und löst automatische Aktionen aus."],
      ["Trend- & Signal-Radar", "Geplante Signale an Discord, Slack oder E-Mail basierend auf Marktmustern."],
      ["Lead Engine (Erfassung + Scoring)", "Multikanal-Lead-Erfassung + Hot/Warm/Cold-Scoring + automatisches Routing."],
      ["Automatisches Nurturing (E-Mail/Brevo)", "E-Mail-Sequenzen und automatische Nachverfolgung bis zur Conversion."],
      ["Sales Message Factory", "Generierung von Verkaufsnachrichten für Hot/Warm-Leads + automatisches Reporting."],
      ["Bookings & Consultation Management", "Automatisierte Diagnose, Terminplanung, Erinnerungen und Nachverfolgung."],
      ["Analytics & Insights (Täglich/Wöchentlich)", "Automatische Berichte mit Schlüsselmetriken + umsetzbaren Empfehlungen."],
      ["24/7-Betrieb (Priorisierte Warteschlange)", "Kontinuierliche Aufgabenausführung mit intelligentem Prioritätssystem."],
      ["Prädiktive Routinen (Predictive Ops)", "Antizipiert Fehler, ausstehende Aufgaben und handelt rechtzeitig."],
      ["Rollen-Agenten (CEO/CTO/Tribe/Guild)", "Strategie, Innovation und interne Koordination mit spezialisierten Agenten."],
      ["Dynamic Workflow Creator", "Kontrollierte Erstellung neuer Workflows und Agenten nach Bedarf."],
      ["Extras (Chrome / Integrationen)", "Chrome-Erweiterung, externe APIs und benutzerdefinierte Konnektoren."],
    ],
    ru: [
      ["Opportunity Intelligence Engine", "Находит бизнес-возможности, оценивает лидов и запускает автоматические действия."],
      ["Радар трендов и сигналов", "Запланированные сигналы в Discord, Slack или Email по рыночным паттернам."],
      ["Lead Engine (захват + скоринг)", "Мультиканальный приём лидов + hot/warm/cold-скоринг + автомаршрутизация."],
      ["Автоматический nurturing (Email/Brevo)", "Цепочки писем и автоматическое сопровождение до конверсии."],
      ["Sales Message Factory", "Генерация продающих сообщений для hot/warm-лидов + автоотчёты."],
      ["Управление бронированиями и консультациями", "Автоматическая диагностика, расписание, напоминания и follow-up."],
      ["Analytics & Insights (ежедневно/еженедельно)", "Автоотчёты с ключевыми метриками + конкретные рекомендации."],
      ["Операции 24/7 (очередь с приоритетами)", "Непрерывное выполнение задач с умной системой приоритетов."],
      ["Прогностические рутины (Predictive Ops)", "Прогнозирует сбои и задачи, действует до того, как станет поздно."],
      ["Ролевые агенты (CEO/CTO/Tribe/Guild)", "Стратегия, инновации и внутренняя координация со специализированными агентами."],
      ["Dynamic Workflow Creator", "Контролируемое создание новых workflow и агентов по необходимости."],
      ["Extras (Chrome / интеграции)", "Chrome-расширение, внешние API и кастомные коннекторы."],
    ],
  });
  const meta = [
    { id: "opportunity-engine", icon: Brain, tag: "WF1 CORE" },
    { id: "radar-tendencias", icon: Radar, tag: "WF2" },
    { id: "lead-engine", icon: Target, tag: null },
    { id: "nutricion-automatica", icon: Mail, tag: null },
    { id: "sales-message-factory", icon: Factory, tag: "WF3" },
    { id: "bookings-management", icon: CalendarCheck, tag: null },
    { id: "analytics-insights", icon: BarChart3, tag: null },
    { id: "ops-24-7", icon: Clock, tag: null },
    { id: "predictive-ops", icon: TrendingUp, tag: null },
    { id: "agentes-rol", icon: Users, tag: null },
    { id: "dynamic-creator", icon: Sparkles, tag: null },
    { id: "extras-integraciones", icon: Puzzle, tag: null },
  ];
  return meta.map((m, i) => ({ ...m, title: items[i][0], description: items[i][1] }));
};

const PACKS = (language: Lang, ui: typeof UI[Lang]) => {
  const data = pick(language, {
    es: {
      starterDesc: "Core + Leads básico + Bookings + Analytics básico",
      starterFeat: ["Opportunity Engine básico", "Lead Engine (hasta 100/mes)", "Bookings Management", "Analytics semanal"],
      proDesc: "Starter + Radar + Sales Factory + Content + 1 Agent (CEO o CTO)",
      proFeat: ["Todo de Starter +", "Radar de Tendencias", "Sales Message Factory", "Nutrición Automática", "1 Agente (CEO o CTO)"],
      autoDesc: "Pro + Ops 24/7 + Predictive Ops + 3 Agents + soporte prioritario",
      autoFeat: ["Todo de Pro +", "Operaciones 24/7", "Rutinas Predictivas", "3 Agentes especializados", "Soporte prioritario", "Dynamic Workflow Creator"],
    },
    en: {
      starterDesc: "Core + Basic Leads + Bookings + Basic Analytics",
      starterFeat: ["Basic Opportunity Engine", "Lead Engine (up to 100/mo)", "Bookings Management", "Weekly Analytics"],
      proDesc: "Starter + Radar + Sales Factory + Content + 1 Agent (CEO or CTO)",
      proFeat: ["Everything in Starter +", "Trends Radar", "Sales Message Factory", "Automatic Nurturing", "1 Agent (CEO or CTO)"],
      autoDesc: "Pro + 24/7 Ops + Predictive Ops + 3 Agents + priority support",
      autoFeat: ["Everything in Pro +", "24/7 Operations", "Predictive Routines", "3 Specialized Agents", "Priority Support", "Dynamic Workflow Creator"],
    },
    de: {
      starterDesc: "Core + Basis-Leads + Bookings + Basis-Analytics",
      starterFeat: ["Basis Opportunity Engine", "Lead Engine (bis 100/Monat)", "Bookings Management", "Wöchentliche Analytics"],
      proDesc: "Starter + Radar + Sales Factory + Content + 1 Agent (CEO oder CTO)",
      proFeat: ["Alles aus Starter +", "Trend-Radar", "Sales Message Factory", "Automatisches Nurturing", "1 Agent (CEO oder CTO)"],
      autoDesc: "Pro + 24/7-Betrieb + Predictive Ops + 3 Agenten + Prioritäts-Support",
      autoFeat: ["Alles aus Pro +", "24/7-Betrieb", "Prädiktive Routinen", "3 spezialisierte Agenten", "Prioritäts-Support", "Dynamic Workflow Creator"],
    },
    ru: {
      starterDesc: "Core + базовые лиды + бронирования + базовая аналитика",
      starterFeat: ["Базовый Opportunity Engine", "Lead Engine (до 100/мес)", "Bookings Management", "Еженедельная аналитика"],
      proDesc: "Starter + Радар + Sales Factory + контент + 1 агент (CEO или CTO)",
      proFeat: ["Всё из Starter +", "Радар трендов", "Sales Message Factory", "Автоматический nurturing", "1 агент (CEO или CTO)"],
      autoDesc: "Pro + операции 24/7 + Predictive Ops + 3 агента + приоритетная поддержка",
      autoFeat: ["Всё из Pro +", "Операции 24/7", "Прогностические рутины", "3 специализированных агента", "Приоритетная поддержка", "Dynamic Workflow Creator"],
    },
  });
  return [
    { id: "starter", name: "Starter", price: "199", period: ui.perMonth, badge: null as string | null, description: data.starterDesc, features: data.starterFeat },
    { id: "pro", name: "Pro", price: "499", period: ui.perMonth, badge: ui.mostPopular, description: data.proDesc, features: data.proFeat },
    { id: "autonomous", name: "Autonomous", price: "999", period: ui.perMonth, badge: "Premium", description: data.autoDesc, features: data.autoFeat },
  ];
};

const INDUSTRIES = (language: Lang) => {
  return pick(language, {
    es: [
      { id: "restaurante", icon: UtensilsCrossed, title: "Restaurante / Cafetería / Hostelería", description: "Automatiza reservas, responde preguntas frecuentes y gestiona la lista de espera.",
        flow: ["Cliente pregunta por mesa", "Bot verifica disponibilidad en tiempo real", "Confirma reserva con detalles", "Recordatorio día anterior", "Post-visita: solicitud de reseña"],
        intake: ["Nombre", "Fecha y hora", "Número de personas", "Preferencias", "Alergias"],
        conversation: { client: "Quiero reservar mesa para 4 el sábado noche", bot: "¡Hola! 🍽️ Para el sábado tenemos disponibilidad a las 20:30 o 22:00. Interior o terraza, ¿qué prefieres?", client2: "22:00 en terraza", bot2: "Perfecto! Mesa para 4, sábado 22:00, terraza. ¿A qué nombre?" },
        kpis: ["-70% no-shows", "+25% ocupación", "FAQ resueltas 24/7"] },
      { id: "clinica", icon: Stethoscope, title: "Clínica Dental / Fisio / Salud", description: "Gestiona citas médicas, recordatorios y seguimiento de pacientes automáticamente.",
        flow: ["Paciente contacta para cita", "Bot verifica tipo de consulta", "Muestra disponibilidad del profesional", "Reserva y confirmación inmediata", "Recordatorio + instrucciones pre-cita"],
        intake: ["Nombre completo", "Tipo de consulta", "Profesional preferido", "Seguro médico"],
        conversation: { client: "Necesito cita con el fisio para dolor de espalda", bot: "Hola! Para dolor de espalda te recomiendo sesión de valoración (45min). Tenemos hueco el lunes 15:00 o miércoles 10:00.", client2: "Miércoles", bot2: "¡Reservado! Miércoles 10:00 valoración fisioterapia. Trae ropa cómoda. Te envío recordatorio el martes. 📋" },
        kpis: ["-60% llamadas", "+30% ocupación", "Seguimiento 100%"] },
      { id: "taller", icon: Car, title: "Taller Mecánico / Neumáticos", description: "Gestiona citas de revisión, presupuestos y seguimiento de reparaciones.",
        flow: ["Cliente pide cita o presupuesto", "Bot identifica tipo de servicio", "Reserva hueco en el taller", "Seguimiento del estado del vehículo", "Notificación cuando está listo"],
        intake: ["Nombre", "Matrícula", "Tipo de vehículo", "Servicio necesario"],
        conversation: { client: "Quiero cambiar las ruedas del coche, matrícula 1234ABC", bot: "¡Hola! Para cambio de neumáticos del 1234ABC, ¿qué medida llevas? También puedo mirarlo si me dices marca y modelo.", client2: "Es un Golf 2019", bot2: "Perfecto, Golf VII. Tenemos 205/55 R16 desde 65€/ud montados. ¿Te viene bien mañana a las 9:00?" },
        kpis: ["+40% citas online", "-50% llamadas", "Presupuestos instantáneos"] },
      { id: "peluqueria", icon: Scissors, title: "Peluquería / Barbería / Estética", description: "Automatiza citas, reduce no-shows y consigue más reseñas sin esfuerzo.",
        flow: ["Cliente escribe por WhatsApp/IG", "Bot muestra servicios y disponibilidad", "Cliente elige fecha y hora", "Confirmación automática + recordatorio 24h antes", "Post-cita: solicitud de reseña automática"],
        intake: ["Nombre", "Teléfono", "Servicio deseado", "Preferencia de fecha/hora"],
        conversation: { client: "Hola! Quiero pedir cita para corte + barba", bot: "¡Hola! 👋 Claro, tenemos disponibilidad mañana a las 10:00, 12:00 o 17:00. ¿Cuál prefieres?", client2: "Las 12", bot2: "Perfecto! ✅ Tienes cita mañana a las 12:00 para corte + barba. Te enviaré un recordatorio. ¿A qué nombre?" },
        kpis: ["-75% no-shows", "+50% reseñas", "-80% tiempo en citas"] },
      { id: "inmobiliaria", icon: Building2, title: "Inmobiliaria / Alquiler Vacacional", description: "Automatiza consultas de propiedades, visitas y check-in de huéspedes.",
        flow: ["Interesado pregunta por propiedad", "Bot envía ficha técnica y fotos", "Propone visita o reserva", "Gestiona documentación básica", "Check-in automático (vacacional)"],
        intake: ["Nombre", "Email", "Tipo de propiedad", "Presupuesto", "Zona preferida"],
        conversation: { client: "Busco piso de 2 hab en centro, máximo 900€/mes", bot: "¡Hola! Tenemos 3 opciones que encajan. ¿Te envío las fichas?", client2: "Sí, por favor", bot2: "Aquí tienes: 1) C/Sol - 850€ 2) Plaza Mayor - 890€ 3) C/Luna - 875€. ¿Quieres agendar una visita?" },
        kpis: ["+50% leads cualificados", "Visitas auto-agendadas", "Check-in sin fricciones"] },
      { id: "servicios-domicilio", icon: Home, title: "Servicios a Domicilio", description: "Limpieza, fontanería, electricistas. Gestiona solicitudes y presupuestos automáticamente.",
        flow: ["Cliente describe el problema", "Bot cualifica urgencia y tipo", "Propone franja horaria disponible", "Confirma visita con profesional asignado", "Seguimiento post-servicio"],
        intake: ["Tipo de servicio", "Dirección", "Descripción del problema", "Urgencia"],
        conversation: { client: "Tengo una fuga de agua en el baño, es urgente", bot: "Entendido, fuga urgente. ¿Puedes enviarme una foto? Tenemos un fontanero disponible en las próximas 2h.", client2: "[foto] Calle Mayor 15, 3º", bot2: "Recibido. Juan llegará entre 16:00-17:00. Te avisará 15min antes. Desplazamiento: 25€ + diagnóstico gratis." },
        kpis: ["Respuesta < 5min", "+60% leads convertidos", "Seguimiento automático"] },
    ],
    en: [
      { id: "restaurante", icon: UtensilsCrossed, title: "Restaurant / Café / Hospitality", description: "Automate bookings, answer FAQs and manage the waiting list.",
        flow: ["Client asks for a table", "Bot checks real-time availability", "Confirms booking with details", "Reminder day before", "Post-visit: review request"],
        intake: ["Name", "Date and time", "Number of guests", "Preferences", "Allergies"],
        conversation: { client: "I want to book a table for 4 on Saturday night", bot: "Hi! 🍽️ For Saturday we have availability at 8:30pm or 10pm. Indoor or terrace, which do you prefer?", client2: "10pm on the terrace", bot2: "Perfect! Table for 4, Saturday 10pm, terrace. Under what name?" },
        kpis: ["-70% no-shows", "+25% occupancy", "FAQs answered 24/7"] },
      { id: "clinica", icon: Stethoscope, title: "Dental / Physio / Health Clinic", description: "Manage medical appointments, reminders and patient follow-up automatically.",
        flow: ["Patient contacts for appointment", "Bot verifies consultation type", "Shows professional's availability", "Immediate booking and confirmation", "Reminder + pre-appointment instructions"],
        intake: ["Full name", "Consultation type", "Preferred professional", "Health insurance"],
        conversation: { client: "I need an appointment with the physio for back pain", bot: "Hi! For back pain I recommend an assessment session (45min). We have slots on Monday 3pm or Wednesday 10am.", client2: "Wednesday", bot2: "Booked! Wednesday 10:00 physio assessment. Wear comfortable clothes. I'll send a reminder on Tuesday. 📋" },
        kpis: ["-60% calls", "+30% occupancy", "100% follow-up"] },
      { id: "taller", icon: Car, title: "Mechanic Shop / Tires", description: "Manage service appointments, quotes and repair tracking.",
        flow: ["Client requests appointment or quote", "Bot identifies service type", "Books slot at the shop", "Vehicle status tracking", "Notification when ready"],
        intake: ["Name", "License plate", "Vehicle type", "Service needed"],
        conversation: { client: "I want to change my car tires, plate 1234ABC", bot: "Hi! For tire change on 1234ABC, what size do you need? I can also check if you tell me make and model.", client2: "It's a 2019 Golf", bot2: "Perfect, Golf VII. We have 205/55 R16 from €65/ea fitted. Does tomorrow at 9:00am work for you?" },
        kpis: ["+40% online bookings", "-50% calls", "Instant quotes"] },
      { id: "peluqueria", icon: Scissors, title: "Hair Salon / Barber / Beauty", description: "Automate appointments, reduce no-shows and get more reviews effortlessly.",
        flow: ["Client writes via WhatsApp/IG", "Bot shows services and availability", "Client chooses date and time", "Auto confirmation + 24h reminder", "Post-appointment: auto review request"],
        intake: ["Name", "Phone", "Desired service", "Date/time preference"],
        conversation: { client: "Hi! I want to book a haircut + beard trim", bot: "Hi! 👋 Sure, we have availability tomorrow at 10:00, 12:00 or 17:00. Which do you prefer?", client2: "12:00", bot2: "Perfect! ✅ You're booked tomorrow at 12:00 for haircut + beard. I'll send you a reminder. What name?" },
        kpis: ["-75% no-shows", "+50% reviews", "-80% booking time"] },
      { id: "inmobiliaria", icon: Building2, title: "Real Estate / Vacation Rental", description: "Automate property inquiries, viewings and guest check-in.",
        flow: ["Lead asks about property", "Bot sends specs and photos", "Proposes viewing or booking", "Manages basic documentation", "Auto check-in (vacation)"],
        intake: ["Name", "Email", "Property type", "Budget", "Preferred area"],
        conversation: { client: "Looking for a 2-bed apartment downtown, max €900/month", bot: "Hi! We have 3 matching options. Shall I send you the details?", client2: "Yes, please", bot2: "Here they are: 1) Sol St - €850 2) Main Square - €890 3) Luna St - €875. Would you like to schedule a viewing?" },
        kpis: ["+50% qualified leads", "Auto-scheduled viewings", "Frictionless check-in"] },
      { id: "servicios-domicilio", icon: Home, title: "Home Services", description: "Cleaning, plumbing, electricians. Manage requests and quotes automatically.",
        flow: ["Client describes the problem", "Bot qualifies urgency and type", "Proposes available time slot", "Confirms visit with assigned pro", "Post-service follow-up"],
        intake: ["Service type", "Address", "Problem description", "Urgency"],
        conversation: { client: "I have a water leak in the bathroom, it's urgent", bot: "Got it, urgent leak. Can you send me a photo? We have a plumber available in the next 2h.", client2: "[photo] 15 Main St, 3rd floor", bot2: "Received. Juan will arrive between 4-5pm. He'll call you 15min before. Callout: €25 + free diagnosis." },
        kpis: ["Response < 5min", "+60% converted leads", "Auto follow-up"] },
    ],
    de: [
      { id: "restaurante", icon: UtensilsCrossed, title: "Restaurant / Café / Gastronomie", description: "Automatisieren Sie Reservierungen, beantworten Sie FAQs und verwalten Sie die Warteliste.",
        flow: ["Gast fragt nach einem Tisch", "Bot prüft Echtzeit-Verfügbarkeit", "Bestätigt Reservierung mit Details", "Erinnerung am Vortag", "Nach dem Besuch: Bewertungsanfrage"],
        intake: ["Name", "Datum und Uhrzeit", "Anzahl der Gäste", "Vorlieben", "Allergien"],
        conversation: { client: "Ich möchte einen Tisch für 4 Personen am Samstagabend reservieren", bot: "Hallo! 🍽️ Für Samstag haben wir 20:30 oder 22:00 frei. Innen oder Terrasse?", client2: "22:00 auf der Terrasse", bot2: "Perfekt! Tisch für 4, Samstag 22:00, Terrasse. Auf welchen Namen?" },
        kpis: ["-70% No-Shows", "+25% Auslastung", "FAQs rund um die Uhr"] },
      { id: "clinica", icon: Stethoscope, title: "Zahnarzt / Physio / Gesundheitsklinik", description: "Verwalten Sie Termine, Erinnerungen und Patienten-Follow-up automatisch.",
        flow: ["Patient nimmt Kontakt auf", "Bot prüft Art der Behandlung", "Zeigt freie Termine des Spezialisten", "Sofortige Buchung und Bestätigung", "Erinnerung + Hinweise vor dem Termin"],
        intake: ["Vollständiger Name", "Behandlungstyp", "Bevorzugter Spezialist", "Krankenversicherung"],
        conversation: { client: "Ich brauche einen Termin beim Physio wegen Rückenschmerzen", bot: "Hallo! Bei Rückenschmerzen empfehle ich eine Befundsitzung (45 Min.). Wir haben Montag 15:00 oder Mittwoch 10:00 frei.", client2: "Mittwoch", bot2: "Gebucht! Mittwoch 10:00 Physio-Befund. Bequeme Kleidung mitbringen. Erinnerung kommt am Dienstag. 📋" },
        kpis: ["-60% Anrufe", "+30% Auslastung", "100% Follow-up"] },
      { id: "taller", icon: Car, title: "KFZ-Werkstatt / Reifen", description: "Verwalten Sie Termine, Kostenvoranschläge und Reparaturverfolgung.",
        flow: ["Kunde fragt nach Termin oder Angebot", "Bot identifiziert die Leistung", "Bucht freien Slot in der Werkstatt", "Verfolgung des Fahrzeugstatus", "Benachrichtigung wenn fertig"],
        intake: ["Name", "Kennzeichen", "Fahrzeugtyp", "Benötigte Leistung"],
        conversation: { client: "Ich möchte Reifen wechseln, Kennzeichen 1234ABC", bot: "Hallo! Für den Reifenwechsel am 1234ABC – welche Größe? Ich kann es auch nachsehen, wenn Sie Marke und Modell nennen.", client2: "Es ist ein Golf 2019", bot2: "Perfekt, Golf VII. Wir haben 205/55 R16 ab 65 €/Stück montiert. Passt morgen 9:00 Uhr?" },
        kpis: ["+40% Online-Termine", "-50% Anrufe", "Sofort-Angebote"] },
      { id: "peluqueria", icon: Scissors, title: "Friseur / Barbier / Kosmetik", description: "Automatisieren Sie Termine, reduzieren Sie No-Shows und sammeln Sie mehr Bewertungen.",
        flow: ["Kunde schreibt über WhatsApp/IG", "Bot zeigt Leistungen und Verfügbarkeit", "Kunde wählt Datum und Uhrzeit", "Automatische Bestätigung + 24h-Erinnerung", "Nach dem Termin: automatische Bewertungsanfrage"],
        intake: ["Name", "Telefon", "Gewünschte Leistung", "Termin-Präferenz"],
        conversation: { client: "Hi! Ich möchte einen Termin für Schnitt + Bart", bot: "Hallo! 👋 Klar, morgen haben wir 10:00, 12:00 oder 17:00 frei. Welche Zeit?", client2: "12:00", bot2: "Perfekt! ✅ Termin morgen 12:00 für Schnitt + Bart. Erinnerung folgt. Auf welchen Namen?" },
        kpis: ["-75% No-Shows", "+50% Bewertungen", "-80% Buchungsaufwand"] },
      { id: "inmobiliaria", icon: Building2, title: "Immobilien / Ferienvermietung", description: "Automatisieren Sie Objektanfragen, Besichtigungen und Gast-Check-in.",
        flow: ["Interessent fragt nach Objekt", "Bot sendet Daten und Fotos", "Schlägt Besichtigung oder Buchung vor", "Verwaltet Basis-Dokumente", "Automatischer Check-in (Urlaub)"],
        intake: ["Name", "E-Mail", "Objekttyp", "Budget", "Bevorzugtes Gebiet"],
        conversation: { client: "Suche 2-Zimmer-Wohnung im Zentrum, max. 900 €/Monat", bot: "Hallo! Wir haben 3 passende Optionen. Soll ich die Details senden?", client2: "Ja, gerne", bot2: "Hier: 1) Sol-Str. – 850 € 2) Plaza Mayor – 890 € 3) Luna-Str. – 875 €. Besichtigung vereinbaren?" },
        kpis: ["+50% qualifizierte Leads", "Automatische Besichtigungen", "Reibungsloser Check-in"] },
      { id: "servicios-domicilio", icon: Home, title: "Dienstleistungen vor Ort", description: "Reinigung, Klempner, Elektriker. Verwalten Sie Anfragen und Angebote automatisch.",
        flow: ["Kunde beschreibt das Problem", "Bot qualifiziert Dringlichkeit und Typ", "Schlägt freien Zeitraum vor", "Bestätigt Besuch mit Fachkraft", "Nach dem Service: Follow-up"],
        intake: ["Leistungstyp", "Adresse", "Problembeschreibung", "Dringlichkeit"],
        conversation: { client: "Ich habe einen Wasserschaden im Bad, es ist dringend", bot: "Verstanden, dringender Wasserschaden. Können Sie ein Foto senden? Klempner ist in den nächsten 2h verfügbar.", client2: "[Foto] Calle Mayor 15, 3. OG", bot2: "Erhalten. Juan kommt zwischen 16:00–17:00. Meldet sich 15 Min. vorher. Anfahrt: 25 € + Diagnose kostenlos." },
        kpis: ["Antwort < 5 Min.", "+60% konvertierte Leads", "Automatisches Follow-up"] },
    ],
    ru: [
      { id: "restaurante", icon: UtensilsCrossed, title: "Ресторан / Кафе / HoReCa", description: "Автоматизируйте бронирования, отвечайте на частые вопросы и ведите лист ожидания.",
        flow: ["Клиент спрашивает столик", "Бот проверяет наличие в реальном времени", "Подтверждает бронь с деталями", "Напоминание за день", "После визита: запрос отзыва"],
        intake: ["Имя", "Дата и время", "Кол-во гостей", "Предпочтения", "Аллергии"],
        conversation: { client: "Хочу столик на 4 в субботу вечером", bot: "Здравствуйте! 🍽️ В субботу свободно в 20:30 или 22:00. Зал или терраса?", client2: "22:00 на террасе", bot2: "Отлично! Столик на 4, суббота 22:00, терраса. На какое имя?" },
        kpis: ["-70% неявок", "+25% загрузки", "FAQ 24/7"] },
      { id: "clinica", icon: Stethoscope, title: "Стоматология / физио / клиника", description: "Управляйте записями, напоминаниями и сопровождением пациентов автоматически.",
        flow: ["Пациент обращается за записью", "Бот уточняет тип приёма", "Показывает свободные слоты специалиста", "Мгновенная запись и подтверждение", "Напоминание + инструкции"],
        intake: ["ФИО", "Тип приёма", "Желаемый специалист", "Страховка"],
        conversation: { client: "Нужна запись к физиотерапевту, болит спина", bot: "Здравствуйте! При болях в спине рекомендую диагностическую сессию (45 мин). Есть пн 15:00 или ср 10:00.", client2: "Среда", bot2: "Записал! Среда 10:00, физио-диагностика. Возьмите удобную одежду. Напомню во вторник. 📋" },
        kpis: ["-60% звонков", "+30% загрузки", "100% follow-up"] },
      { id: "taller", icon: Car, title: "Автосервис / шиномонтаж", description: "Управляйте записями, расчётами и статусом ремонта.",
        flow: ["Клиент пишет о записи или расчёте", "Бот определяет тип услуги", "Бронирует слот в сервисе", "Отслеживает статус авто", "Уведомляет о готовности"],
        intake: ["Имя", "Номер авто", "Тип авто", "Нужная услуга"],
        conversation: { client: "Хочу поменять резину, номер 1234ABC", bot: "Здравствуйте! Для 1234ABC — какой размер? Могу посмотреть, если назовёте марку и модель.", client2: "Это Golf 2019", bot2: "Понял, Golf VII. Есть 205/55 R16 от 65 €/шт с монтажом. Завтра в 9:00 удобно?" },
        kpis: ["+40% онлайн-записей", "-50% звонков", "Мгновенные расчёты"] },
      { id: "peluqueria", icon: Scissors, title: "Парикмахерская / барбершоп / эстетика", description: "Автоматизируйте записи, снижайте неявки и собирайте больше отзывов.",
        flow: ["Клиент пишет в WhatsApp/IG", "Бот показывает услуги и свободные слоты", "Клиент выбирает дату и время", "Автоподтверждение + напоминание за 24 ч", "После записи: автоматический запрос отзыва"],
        intake: ["Имя", "Телефон", "Желаемая услуга", "Предпочтения по времени"],
        conversation: { client: "Привет! Хочу записаться на стрижку и бороду", bot: "Здравствуйте! 👋 Завтра свободно в 10:00, 12:00 или 17:00. Какое время?", client2: "12:00", bot2: "Отлично! ✅ Записал на завтра 12:00, стрижка + борода. Пришлю напоминание. На какое имя?" },
        kpis: ["-75% неявок", "+50% отзывов", "-80% времени на запись"] },
      { id: "inmobiliaria", icon: Building2, title: "Недвижимость / посуточная аренда", description: "Автоматизируйте заявки по объектам, показы и заселение гостей.",
        flow: ["Клиент спрашивает об объекте", "Бот отправляет данные и фото", "Предлагает показ или бронь", "Ведёт базовые документы", "Авто-заселение (посуточно)"],
        intake: ["Имя", "Email", "Тип объекта", "Бюджет", "Желаемый район"],
        conversation: { client: "Ищу 2-комнатную в центре, до 900 €/мес", bot: "Здравствуйте! Есть 3 подходящих варианта. Прислать карточки?", client2: "Да, пожалуйста", bot2: "Вот: 1) ул. Соль — 850 € 2) Пл. Майор — 890 € 3) ул. Луна — 875 €. Запланировать показ?" },
        kpis: ["+50% качественных лидов", "Авто-показы", "Заселение без трения"] },
      { id: "servicios-domicilio", icon: Home, title: "Услуги на дом", description: "Уборка, сантехника, электрика. Принимайте заявки и расчёты автоматически.",
        flow: ["Клиент описывает проблему", "Бот определяет срочность и тип", "Предлагает свободный интервал", "Подтверждает визит со специалистом", "Сопровождение после услуги"],
        intake: ["Тип услуги", "Адрес", "Описание проблемы", "Срочность"],
        conversation: { client: "У меня течёт вода в ванной, срочно", bot: "Понял, срочная течь. Можете прислать фото? Сантехник свободен в ближайшие 2 часа.", client2: "[фото] Calle Mayor 15, 3-й этаж", bot2: "Принято. Хуан приедет с 16:00 до 17:00. Позвонит за 15 минут. Выезд: 25 € + диагностика бесплатно." },
        kpis: ["Ответ < 5 мин", "+60% конверсии лидов", "Авто follow-up"] },
    ],
  });
};

const Industrias = () => {
  const { language } = useTranslation();
  const ui = pick(language as Lang, UI);
  return (
    <>
      <SEOHead
        title={ui.seoTitle}
        description={ui.seoDesc}
        canonical="/industrias"
        keywords="automatizacion restaurantes, chatbot clinicas, ia talleres, peluqueria automatizada, inmobiliaria ia"
      />
      <BreadcrumbSchema items={[
        { name: ui.breadcrumbHome, url: "/" },
        { name: ui.breadcrumbInd, url: "/industrias" },
      ]} />
      <IndustriasContent />
    </>
  );
};

const IndustriasContent = () => {
  const { t, language } = useTranslation();
  const lang = language as Lang;
  const ui = pick(lang, UI);
  const automations = AUTOMATIONS(lang);
  const packs = PACKS(lang, ui);
  const industries = INDUSTRIES(lang);

  const packIcons: Record<string, any> = {
    [t("industries.packWebPresencia")]: Globe,
    [t("industries.packWebChatbot")]: Bot,
    [t("industries.packAutomatiza")]: Calendar,
  };
  const sectorPacks = [t("industries.packWebPresencia"), t("industries.packWebChatbot"), t("industries.packAutomatiza")];

  return (
    <PageLayout>
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-secondary w-96 h-96 -top-48 -left-48" />
        <div className="glow-orb-accent w-64 h-64 bottom-0 right-0" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-secondary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t("industries.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t("industries.title")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">{t("industries.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auditoria-gratis"><Button size="lg" className="btn-neon text-lg px-8">{ui.freeAudit}<ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
              <Link to="/precios"><Button size="lg" variant="outline" className="btn-outline-neon text-lg px-8">{ui.seePricing}</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/5">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{ui.catalogTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{ui.catalogSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {automations.map((a) => (
              <div key={a.id} className="card-elevated card-elevated-hover group transition-all duration-300 p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <a.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-sm leading-tight">{a.title}</h3>
                      {a.tag && <span className="badge-primary text-[10px] px-1.5 py-0.5">{a.tag}</span>}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{ui.packsTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{ui.packsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packs.map((pack) => (
              <div key={pack.id} className={`relative card-elevated card-elevated-hover flex flex-col p-6 ${pack.badge === ui.mostPopular ? 'border-primary neon-border' : pack.badge === 'Premium' ? 'border-accent' : ''}`}>
                {pack.badge && (
                  <div className="absolute top-0 right-4 -translate-y-1/2">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${pack.badge === 'Premium' ? 'bg-accent text-accent-foreground' : 'badge-primary'}`}>
                      {pack.badge === 'Premium' ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                      {pack.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">{pack.price}€</span>
                    <span className="text-muted-foreground text-sm">{pack.period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contacto">
                  <Button className={`w-full ${pack.badge ? 'btn-neon' : 'btn-outline-neon'}`}>
                    {ui.request}<ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">{ui.annual}</p>
        </div>
      </section>

      <section className="section-padding bg-muted/5">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="badge-secondary mb-4 inline-flex">
              <Globe className="w-3 h-3 mr-1" /> {ui.templatesBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{ui.templatesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{ui.templatesSubtitle}</p>
          </div>
          <div className="space-y-24">
            {industries.map((industry) => (
              <div key={industry.id} id={industry.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <industry.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold">{industry.title}</h2>
                    <p className="text-muted-foreground">{industry.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">{t("industries.packs")}</p>
                  <div className="flex flex-wrap gap-2">
                    {sectorPacks.map((pack, i) => {
                      const IconComp = packIcons[pack] || Globe;
                      return (
                        <span key={i} className="badge-primary text-xs flex items-center gap-1">
                          <IconComp className="w-3 h-3" />{pack}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="card-elevated card-elevated-hover p-5">
                      <h4 className="font-display font-semibold mb-4">{ui.botFlow}</h4>
                      <ol className="space-y-3">
                        {industry.flow.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary shrink-0">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="card-elevated card-elevated-hover p-5">
                      <h4 className="font-display font-semibold mb-4">{ui.dataCaptured}</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.intake.map((field, i) => (
                          <span key={i} className="badge-primary text-xs">{field}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-elevated card-elevated-hover p-5">
                      <h4 className="font-display font-semibold mb-4">{ui.expectedResults}</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {industry.kpis.map((kpi, i) => (
                          <div key={i} className="text-center p-3 rounded-xl bg-success/10 border border-success/20">
                            <span className="text-xs font-medium text-success">{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-elevated card-elevated-hover p-5">
                    <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {ui.conversationExample}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 bg-primary text-primary-foreground text-sm">{industry.conversation.client}</div></div>
                      <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2 bg-muted text-foreground text-sm">{industry.conversation.bot}</div></div>
                      <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 bg-primary text-primary-foreground text-sm">{industry.conversation.client2}</div></div>
                      <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2 bg-muted text-foreground text-sm">{industry.conversation.bot2}</div></div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <Link to={`/auditoria-gratis?vertical=${industry.id}`}>
                        <Button className="w-full btn-neon">
                          {t("industries.apply")}<ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="card-elevated text-center p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{ui.ctaTitle}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{ui.ctaDesc}</p>
            <Link to="/contacto">
              <Button size="lg" className="btn-neon text-lg px-8 btn-depth">
                {t("nav.contact")}<ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Industrias;
