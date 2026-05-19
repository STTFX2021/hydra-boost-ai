import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'es' | 'en' | 'de' | 'ru';

// Supported languages with hreflang codes (ISO 639-1 + region where helpful).
// Used by SEOHead to emit <link rel="alternate" hreflang="..."> tags.
export const SUPPORTED_LANGUAGES: ReadonlyArray<Language> = ['es', 'en', 'de', 'ru'];

export const HREFLANG_MAP: Record<Language, string> = {
  es: 'es-ES',
  en: 'en',
  de: 'de',
  ru: 'ru',
};

export const OG_LOCALE_MAP: Record<Language, string> = {
  es: 'es_ES',
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
};

// Default / canonical language (matches existing indexed URLs in Google).
export const DEFAULT_LANGUAGE: Language = 'es';

// Read ?lang=xx from URL on init so hreflang alternates are functional
// (Google can crawl /precios?lang=en and the app loads in English).
const getQueryLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('lang')?.toLowerCase();
    if (q && (SUPPORTED_LANGUAGES as readonly string[]).includes(q)) {
      return q as Language;
    }
  } catch {
    // ignore
  }
  return null;
};

// Detect browser language automatically
const detectBrowserLanguage = (): Language => {
  // 1. URL query param wins (for hreflang + share links)
  const urlLang = getQueryLanguage();
  if (urlLang) return urlLang;

  const storedLang = localStorage.getItem('hydrai-language');
  if (storedLang) {
    try {
      const parsed = JSON.parse(storedLang);
      const validLangs: Language[] = ['es', 'en', 'de', 'ru'];
      if (validLangs.includes(parsed.state?.language)) {
        return parsed.state.language;
      }
    } catch (e) {
      // ignore parse errors
    }
  }
  
  // Check navigator.languages first, then navigator.language
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split('-')[0];
    if (code === 'en') return 'en';
    if (code === 'es') return 'es';
    if (code === 'de') return 'de';
    if (code === 'ru') return 'ru';
  }
  
  return 'es'; // fallback to Spanish
};

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18n = create<I18nState>()(
  persist(
    (set) => ({
      language: detectBrowserLanguage(),
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'hydrai-language' }
  )
);

// Language display names
export const languageNames: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
};

// Landing page translations for the new architecture
const landingTranslations = {
  es: {
    hero: {
      badge: 'Arquitectura de Automatización con IA',
      title1: 'Arquitecturas de Automatización con IA',
      title2: 'que operan tu negocio 24/7',
      subtitle: 'Diseñamos sistemas completos que conectan captación, operaciones y clientes en una arquitectura autónoma. No vendemos herramientas sueltas — construimos el sistema nervioso de tu empresa.',
      levelQuestion: '¿Qué nivel de automatización necesitas?',
      baseTitle: 'Implementaciones Base',
      baseFeatures: ['Webs como nodos de captación', 'Agentes conversacionales', 'Automatizaciones conectadas'],
      baseCta: 'Ver soluciones',
      enterpriseTitle: 'Arquitectura Enterprise',
      enterpriseFeatures: ['Event Bus + Orchestrators', 'Workers especializados', 'Agentes CEO/CFO/CTO'],
      enterpriseCta: 'Ver arquitectura',
      ctaPrimary: 'Solicitar Auditoría de Automatización',
      ctaSecondary: 'Ver Casos Reales',
      stats: ['50+ workflows activos', '10K+ eventos/mes', '99.9% uptime'],
      systemActive: 'Sistema activo procesando eventos...',
      eventsPerMin: '↑ 10 eventos/min',
      workersActive: '3 workers activos',
    },
    base: {
      badge: '🏪 Implementaciones Base',
      title: 'Automatizaciones Conectadas',
      titleHighlight: 'para Negocios',
      subtitle: 'No vendemos herramientas sueltas. Cada implementación es un nodo dentro de tu arquitectura automatizada que capta, procesa y actúa.',
      services: [
        {
          title: 'Webs Profesionales',
          description: 'Nodos de captación optimizados conectados a tu sistema automatizado.',
          features: ['Landing optimizada para conversión', 'SEO base + formularios inteligentes', 'Integración con Event Bus', 'Analytics y tracking automático'],
          cta: 'Ver Ejemplos',
        },
        {
          title: 'Agentes Conversacionales',
          description: 'No son chatbots simples — son agentes integrados en tu arquitectura.',
          features: ['WhatsApp Business + Instagram + Web', 'Captan, filtran y clasifican leads', 'Agendan citas automáticamente', 'Conectados a CRM/Supabase'],
          cta: 'Probar Demo',
        },
        {
          title: 'Orquestación de Procesos',
          description: 'Workflows que conectan herramientas, datos y acciones sin intervención.',
          features: ['Lead → CRM → Seguimiento automático', 'Booking + Recordatorios + Confirmación', 'Pagos → Email → Facturación', 'Reportes automáticos diarios/semanales'],
          cta: 'Ver Flujos',
        },
      ],
      implementationFrom: 'Implementación desde',
      consult: 'Consultar',
      portfolioTitle: 'Implementaciones en Negocios Reales',
      portfolioItems: [
        { sector: 'Restaurante', desc: 'Web + WhatsApp Bot + Reservas' },
        { sector: 'Salón de Belleza', desc: 'Booking + Recordatorios + Pagos' },
        { sector: 'Servicios Profesionales', desc: 'Lead Engine + CRM + Follow-up' },
      ],
      viewAllCases: 'Ver todos los casos →',
    },
    enterprise: {
      badge: '🏢 Arquitectura Enterprise Elite',
      title: 'Sistemas de Automatización a Nivel Enterprise',
      subtitle: 'Event Bus, Orchestrators, Workers especializados y Agentes Autónomos C-Level. Arquitecturas que procesan miles de eventos sin intervención humana.',
      comparisonTitle: 'La Diferencia Enterprise',
      othersTitle: 'Otras Agencias de IA',
      usTitle: 'HydrAI Labs Enterprise',
      othersFeatures: [
        'Chatbot FAQ básico (200 respuestas)',
        'Automatizaciones aisladas y manuales',
        'Plantillas genéricas para todos',
        'Soporte reactivo (9-5 laborables)',
        'Asistentes simples con reglas fijas',
      ],
      usFeatures: [
        'Event Bus que procesa 10K+ eventos/mes',
        'Orchestrator central con workers especializados',
        'Arquitecturas enterprise personalizadas',
        'Auto-remediación SRE Guardian 24/7',
        'Agentes CEO, CFO, CTO, Legal autónomos',
      ],
      automationsTitle: 'Nuestras Automatizaciones Enterprise',
      automations: [
        { icon: '🧠', title: 'Opportunity Intelligence Engine', features: ['Radar de tendencias cada 6h', 'Scoring agresivo de prospectos', 'Mensajes de venta automáticos', 'Búsqueda activa de clientes'], result: '3x conversión pipeline' },
        { icon: '⚙️', title: 'Orchestrator de Eventos', features: ['Event Bus procesa 10K+ eventos/mes', 'Workers especializados (Leads, OPS)', 'Routing inteligente por tipo', 'Auto-remediación P0/P1/P2'], result: '0 downtime, <2min' },
        { icon: '👥', title: 'Agentes C-Level Autónomos', features: ['CEO: Estrategia y prioridades', 'CFO: Decisiones financieras', 'CTO: Research técnico', 'Legal: Compliance automático'], result: '24/7 sin bloqueos' },
        { icon: '📊', title: 'Master Inventory Analyzer', features: ['Análisis de workflows activos', 'Recursos ociosos detectados', 'Reportes de salud diarios', 'Optimización de costos'], result: '40% reducción costos' },
        { icon: '🎯', title: 'Lead Intelligence Engine', features: ['Intake multicanal integrado', 'Clasificación automática con IA', 'Nurturing personalizado', 'Integración CRM/Supabase'], result: '70% menos tiempo' },
        { icon: '🔧', title: 'SRE Guardian System', features: ['Monitoreo continuo 24/7', 'Health checks automáticos', 'Remediación inteligente', 'Alertas multi-canal P0/P1/P2'], result: 'Auto-sanador 24/7' },
      ],
      waitlistTitle: 'Únete a la Lista de Espera',
      waitlistSubtitle: 'Acceso exclusivo para empresas que necesitan arquitecturas enterprise.',
      waitlistCta: 'Solicitar Acceso Enterprise',
    },
    process: {
      title: 'Cómo',
      titleHighlight: 'Trabajamos',
      subtitle: 'Proceso adaptado según el nivel de arquitectura que necesites',
      steps: [
        { num: '1', title: 'Auditoría Inicial', description: 'Analizamos tus procesos actuales y detectamos oportunidades de automatización', time: '30-60 min (gratuita)' },
        { num: '2', title: 'Diseño de Arquitectura', description: 'Proponemos la arquitectura específica con flujos, integraciones y ROI esperado', time: '2-5 días hábiles' },
        { num: '3', title: 'Implementación por Fases', description: 'Desarrollamos e integramos los sistemas de forma modular y testeable', time: '1-4 semanas (según scope)' },
        { num: '4', title: 'Monitoreo y Optimización', description: 'Supervisamos el sistema, ajustamos y expandimos según necesidades', time: 'Continuo' },
      ],
    },
    techStack: {
      title: 'Construido con las Mejores Herramientas',
    },
    finalCta: {
      title: '¿Listo para Ver Tu Empresa en Piloto Automático?',
      subtitle: 'Agenda una auditoría gratuita y te mostraremos exactamente qué procesos podemos automatizar en tu negocio y el ROI esperado.',
      cta: 'Solicitar Auditoría de Automatización →',
      disclaimer: 'No es una llamada de ventas. Es una auditoría técnica real de tus procesos automatizables.',
    },
  },
  en: {
    hero: {
      badge: 'AI Automation Architecture',
      title1: 'AI Automation Architectures',
      title2: 'that run your business 24/7',
      subtitle: 'We design complete systems that connect acquisition, operations and customers in an autonomous architecture. We don\'t sell loose tools — we build your company\'s nervous system.',
      levelQuestion: 'What level of automation do you need?',
      baseTitle: 'Base Implementations',
      baseFeatures: ['Websites as acquisition nodes', 'Conversational agents', 'Connected automations'],
      baseCta: 'View solutions',
      enterpriseTitle: 'Enterprise Architecture',
      enterpriseFeatures: ['Event Bus + Orchestrators', 'Specialized workers', 'CEO/CFO/CTO Agents'],
      enterpriseCta: 'View architecture',
      ctaPrimary: 'Request Automation Audit',
      ctaSecondary: 'View Real Cases',
      stats: ['50+ active workflows', '10K+ events/month', '99.9% uptime'],
      systemActive: 'Active system processing events...',
      eventsPerMin: '↑ 10 events/min',
      workersActive: '3 active workers',
    },
    base: {
      badge: '🏪 Base Implementations',
      title: 'Connected Automations',
      titleHighlight: 'for Businesses',
      subtitle: 'We don\'t sell loose tools. Each implementation is a node within your automated architecture that captures, processes and acts.',
      services: [
        {
          title: 'Professional Websites',
          description: 'Optimized acquisition nodes connected to your automated system.',
          features: ['Conversion-optimized landing', 'Base SEO + smart forms', 'Event Bus integration', 'Automatic analytics and tracking'],
          cta: 'View Examples',
        },
        {
          title: 'Conversational Agents',
          description: 'Not simple chatbots — agents integrated into your architecture.',
          features: ['WhatsApp Business + Instagram + Web', 'Capture, filter and classify leads', 'Automatically schedule appointments', 'Connected to CRM/Supabase'],
          cta: 'Try Demo',
        },
        {
          title: 'Process Orchestration',
          description: 'Workflows that connect tools, data and actions without intervention.',
          features: ['Lead → CRM → Auto follow-up', 'Booking + Reminders + Confirmation', 'Payments → Email → Invoicing', 'Daily/weekly auto reports'],
          cta: 'View Flows',
        },
      ],
      implementationFrom: 'Implementation from',
      consult: 'Contact us',
      portfolioTitle: 'Real Business Implementations',
      portfolioItems: [
        { sector: 'Restaurant', desc: 'Web + WhatsApp Bot + Reservations' },
        { sector: 'Beauty Salon', desc: 'Booking + Reminders + Payments' },
        { sector: 'Professional Services', desc: 'Lead Engine + CRM + Follow-up' },
      ],
      viewAllCases: 'View all cases →',
    },
    enterprise: {
      badge: '🏢 Enterprise Elite Architecture',
      title: 'Enterprise-Level Automation Systems',
      subtitle: 'Event Bus, Orchestrators, Specialized Workers and Autonomous C-Level Agents. Architectures that process thousands of events without human intervention.',
      comparisonTitle: 'The Enterprise Difference',
      othersTitle: 'Other AI Agencies',
      usTitle: 'HydrAI Labs Enterprise',
      othersFeatures: [
        'Basic FAQ chatbot (200 responses)',
        'Isolated and manual automations',
        'Generic templates for everyone',
        'Reactive support (9-5 business)',
        'Simple assistants with fixed rules',
      ],
      usFeatures: [
        'Event Bus processing 10K+ events/month',
        'Central Orchestrator with specialized workers',
        'Personalized enterprise architectures',
        'SRE Guardian 24/7 auto-remediation',
        'Autonomous CEO, CFO, CTO, Legal agents',
      ],
      automationsTitle: 'Our Enterprise Automations',
      automations: [
        { icon: '🧠', title: 'Opportunity Intelligence Engine', features: ['Trend radar every 6h', 'Aggressive prospect scoring', 'Automatic sales messages', 'Active client search'], result: '3x pipeline conversion' },
        { icon: '⚙️', title: 'Event Orchestrator', features: ['Event Bus processes 10K+ events/month', 'Specialized workers (Leads, OPS)', 'Intelligent routing by type', 'P0/P1/P2 auto-remediation'], result: '0 downtime, <2min' },
        { icon: '👥', title: 'Autonomous C-Level Agents', features: ['CEO: Strategy and priorities', 'CFO: Financial decisions', 'CTO: Technical research', 'Legal: Automatic compliance'], result: '24/7 no blockers' },
        { icon: '📊', title: 'Master Inventory Analyzer', features: ['Active workflow analysis', 'Idle resources detected', 'Daily health reports', 'Cost optimization'], result: '40% cost reduction' },
        { icon: '🎯', title: 'Lead Intelligence Engine', features: ['Multichannel intake integrated', 'Automatic AI classification', 'Personalized nurturing', 'CRM/Supabase integration'], result: '70% less time' },
        { icon: '🔧', title: 'SRE Guardian System', features: ['24/7 continuous monitoring', 'Automatic health checks', 'Intelligent remediation', 'Multi-channel P0/P1/P2 alerts'], result: 'Self-healing 24/7' },
      ],
      waitlistTitle: 'Join the Waitlist',
      waitlistSubtitle: 'Exclusive access for companies that need enterprise architectures.',
      waitlistCta: 'Request Enterprise Access',
    },
    process: {
      title: 'How We',
      titleHighlight: 'Work',
      subtitle: 'Process adapted to the level of architecture you need',
      steps: [
        { num: '1', title: 'Initial Audit', description: 'We analyze your current processes and detect automation opportunities', time: '30-60 min (free)' },
        { num: '2', title: 'Architecture Design', description: 'We propose the specific architecture with flows, integrations and expected ROI', time: '2-5 business days' },
        { num: '3', title: 'Phased Implementation', description: 'We develop and integrate systems in a modular and testable way', time: '1-4 weeks (by scope)' },
        { num: '4', title: 'Monitoring & Optimization', description: 'We monitor the system, adjust and expand as needed', time: 'Ongoing' },
      ],
    },
    techStack: {
      title: 'Built with the Best Tools',
    },
    finalCta: {
      title: 'Ready to See Your Business on Autopilot?',
      subtitle: 'Schedule a free audit and we\'ll show you exactly which processes we can automate in your business and the expected ROI.',
      cta: 'Request Automation Audit →',
      disclaimer: 'This is not a sales call. It\'s a real technical audit of your automatable processes.',
    },
  },
  ru: {
    hero: {
      badge: 'AI Automation Architecture',
      title1: 'AI Automation Architectures',
      title2: 'that run your business 24/7',
      subtitle: 'We design complete systems that connect acquisition, operations and customers in an autonomous architecture. We don\'t sell loose tools — we build your company\'s nervous system.',
      levelQuestion: 'What level of automation do you need?',
      baseTitle: 'Base Implementations',
      baseFeatures: ['Websites as acquisition nodes', 'Conversational agents', 'Connected automations'],
      baseCta: 'View solutions',
      enterpriseTitle: 'Enterprise Architecture',
      enterpriseFeatures: ['Event Bus + Orchestrators', 'Specialized workers', 'CEO/CFO/CTO Agents'],
      enterpriseCta: 'View architecture',
      ctaPrimary: 'Request Automation Audit',
      ctaSecondary: 'View Real Cases',
      stats: ['50+ active workflows', '10K+ events/month', '99.9% uptime'],
      systemActive: 'Active system processing events...',
      eventsPerMin: '↑ 10 events/min',
      workersActive: '3 active workers',
    },
    base: {
      badge: '🏪 Base Implementations',
      title: 'Connected Automations',
      titleHighlight: 'for Businesses',
      subtitle: 'We don\'t sell loose tools. Each implementation is a node within your automated architecture that captures, processes and acts.',
      services: [
        {
          title: 'Professional Websites',
          description: 'Optimized acquisition nodes connected to your automated system.',
          features: ['Conversion-optimized landing', 'Base SEO + smart forms', 'Event Bus integration', 'Automatic analytics and tracking'],
          cta: 'View Examples',
        },
        {
          title: 'Conversational Agents',
          description: 'Not simple chatbots — agents integrated into your architecture.',
          features: ['WhatsApp Business + Instagram + Web', 'Capture, filter and classify leads', 'Automatically schedule appointments', 'Connected to CRM/Supabase'],
          cta: 'Try Demo',
        },
        {
          title: 'Process Orchestration',
          description: 'Workflows that connect tools, data and actions without intervention.',
          features: ['Lead → CRM → Auto follow-up', 'Booking + Reminders + Confirmation', 'Payments → Email → Invoicing', 'Daily/weekly auto reports'],
          cta: 'View Flows',
        },
      ],
      implementationFrom: 'Implementation from',
      consult: 'Contact us',
      portfolioTitle: 'Real Business Implementations',
      portfolioItems: [
        { sector: 'Restaurant', desc: 'Web + WhatsApp Bot + Reservations' },
        { sector: 'Beauty Salon', desc: 'Booking + Reminders + Payments' },
        { sector: 'Professional Services', desc: 'Lead Engine + CRM + Follow-up' },
      ],
      viewAllCases: 'View all cases →',
    },
    enterprise: {
      badge: '🏢 Enterprise Elite Architecture',
      title: 'Enterprise-Level Automation Systems',
      subtitle: 'Event Bus, Orchestrators, Specialized Workers and Autonomous C-Level Agents. Architectures that process thousands of events without human intervention.',
      comparisonTitle: 'The Enterprise Difference',
      othersTitle: 'Other AI Agencies',
      usTitle: 'HydrAI Labs Enterprise',
      othersFeatures: [
        'Basic FAQ chatbot (200 responses)',
        'Isolated and manual automations',
        'Generic templates for everyone',
        'Reactive support (9-5 business)',
        'Simple assistants with fixed rules',
      ],
      usFeatures: [
        'Event Bus processing 10K+ events/month',
        'Central Orchestrator with specialized workers',
        'Personalized enterprise architectures',
        'SRE Guardian 24/7 auto-remediation',
        'Autonomous CEO, CFO, CTO, Legal agents',
      ],
      automationsTitle: 'Our Enterprise Automations',
      automations: [
        { icon: '🧠', title: 'Opportunity Intelligence Engine', features: ['Trend radar every 6h', 'Aggressive prospect scoring', 'Automatic sales messages', 'Active client search'], result: '3x pipeline conversion' },
        { icon: '⚙️', title: 'Event Orchestrator', features: ['Event Bus processes 10K+ events/month', 'Specialized workers (Leads, OPS)', 'Intelligent routing by type', 'P0/P1/P2 auto-remediation'], result: '0 downtime, <2min' },
        { icon: '👥', title: 'Autonomous C-Level Agents', features: ['CEO: Strategy and priorities', 'CFO: Financial decisions', 'CTO: Technical research', 'Legal: Automatic compliance'], result: '24/7 no blockers' },
        { icon: '📊', title: 'Master Inventory Analyzer', features: ['Active workflow analysis', 'Idle resources detected', 'Daily health reports', 'Cost optimization'], result: '40% cost reduction' },
        { icon: '🎯', title: 'Lead Intelligence Engine', features: ['Multichannel intake integrated', 'Automatic AI classification', 'Personalized nurturing', 'CRM/Supabase integration'], result: '70% less time' },
        { icon: '🔧', title: 'SRE Guardian System', features: ['24/7 continuous monitoring', 'Automatic health checks', 'Intelligent remediation', 'Multi-channel P0/P1/P2 alerts'], result: 'Self-healing 24/7' },
      ],
      waitlistTitle: 'Join the Waitlist',
      waitlistSubtitle: 'Exclusive access for companies that need enterprise architectures.',
      waitlistCta: 'Request Enterprise Access',
    },
    process: {
      title: 'How We',
      titleHighlight: 'Work',
      subtitle: 'Process adapted to the level of architecture you need',
      steps: [
        { num: '1', title: 'Initial Audit', description: 'We analyze your current processes and detect automation opportunities', time: '30-60 min (free)' },
        { num: '2', title: 'Architecture Design', description: 'We propose the specific architecture with flows, integrations and expected ROI', time: '2-5 business days' },
        { num: '3', title: 'Phased Implementation', description: 'We develop and integrate systems in a modular and testable way', time: '1-4 weeks (by scope)' },
        { num: '4', title: 'Monitoring & Optimization', description: 'We monitor the system, adjust and expand as needed', time: 'Ongoing' },
      ],
    },
    techStack: {
      title: 'Built with the Best Tools',
    },
    finalCta: {
      title: 'Ready to See Your Business on Autopilot?',
      subtitle: 'Schedule a free audit and we\'ll show you exactly which processes we can automate in your business and the expected ROI.',
      cta: 'Request Automation Audit →',
      disclaimer: 'This is not a sales call. It\'s a real technical audit of your automatable processes.',
    },
  },
  de: {
    hero: {
      badge: 'KI-Automatisierungsarchitektur',
      title1: 'KI-Automatisierungsarchitekturen',
      title2: 'die Ihr Geschäft 24/7 betreiben',
      subtitle: 'Wir entwerfen komplette Systeme, die Akquise, Betrieb und Kunden in einer autonomen Architektur verbinden. Wir verkaufen keine Einzelwerkzeuge — wir bauen das Nervensystem Ihres Unternehmens.',
      levelQuestion: 'Welches Automatisierungsniveau benötigen Sie?',
      baseTitle: 'Basis-Implementierungen',
      baseFeatures: ['Websites als Akquise-Knoten', 'Konversationsagenten', 'Verbundene Automatisierungen'],
      baseCta: 'Lösungen ansehen',
      enterpriseTitle: 'Enterprise-Architektur',
      enterpriseFeatures: ['Event Bus + Orchestratoren', 'Spezialisierte Worker', 'CEO/CFO/CTO Agenten'],
      enterpriseCta: 'Architektur ansehen',
      ctaPrimary: 'Automatisierungs-Audit anfordern',
      ctaSecondary: 'Echte Fälle ansehen',
      stats: ['50+ aktive Workflows', '10K+ Events/Monat', '99.9% Uptime'],
      systemActive: 'Aktives System verarbeitet Events...',
      eventsPerMin: '↑ 10 Events/min',
      workersActive: '3 aktive Worker',
    },
    base: {
      badge: '🏪 Basis-Implementierungen',
      title: 'Verbundene Automatisierungen',
      titleHighlight: 'für Unternehmen',
      subtitle: 'Wir verkaufen keine Einzelwerkzeuge. Jede Implementierung ist ein Knoten in Ihrer automatisierten Architektur, der erfasst, verarbeitet und handelt.',
      services: [
        {
          title: 'Professionelle Websites',
          description: 'Optimierte Akquise-Knoten, verbunden mit Ihrem automatisierten System.',
          features: ['Konversionsoptimierte Landing', 'Basis-SEO + intelligente Formulare', 'Event Bus Integration', 'Automatisches Analytics und Tracking'],
          cta: 'Beispiele ansehen',
        },
        {
          title: 'Konversationsagenten',
          description: 'Keine einfachen Chatbots — Agenten, integriert in Ihre Architektur.',
          features: ['WhatsApp Business + Instagram + Web', 'Erfassen, filtern und klassifizieren Leads', 'Automatische Terminplanung', 'Verbunden mit CRM/Supabase'],
          cta: 'Demo testen',
        },
        {
          title: 'Prozess-Orchestrierung',
          description: 'Workflows, die Werkzeuge, Daten und Aktionen ohne Eingriff verbinden.',
          features: ['Lead → CRM → Auto-Follow-up', 'Buchung + Erinnerungen + Bestätigung', 'Zahlungen → E-Mail → Rechnungsstellung', 'Tägliche/wöchentliche Auto-Berichte'],
          cta: 'Flows ansehen',
        },
      ],
      implementationFrom: 'Implementierung ab',
      consult: 'Kontaktieren',
      portfolioTitle: 'Echte Geschäftsimplementierungen',
      portfolioItems: [
        { sector: 'Restaurant', desc: 'Web + WhatsApp Bot + Reservierungen' },
        { sector: 'Schönheitssalon', desc: 'Buchung + Erinnerungen + Zahlungen' },
        { sector: 'Professionelle Dienste', desc: 'Lead Engine + CRM + Follow-up' },
      ],
      viewAllCases: 'Alle Fälle ansehen →',
    },
    enterprise: {
      badge: '🏢 Enterprise Elite Architektur',
      title: 'Automatisierungssysteme auf Enterprise-Niveau',
      subtitle: 'Event Bus, Orchestratoren, Spezialisierte Worker und Autonome C-Level Agenten. Architekturen, die tausende Events ohne menschliches Eingreifen verarbeiten.',
      comparisonTitle: 'Der Enterprise-Unterschied',
      othersTitle: 'Andere KI-Agenturen',
      usTitle: 'HydrAI Labs Enterprise',
      othersFeatures: [
        'Einfacher FAQ-Chatbot (200 Antworten)',
        'Isolierte und manuelle Automatisierungen',
        'Generische Vorlagen für alle',
        'Reaktiver Support (9-17 Uhr)',
        'Einfache Assistenten mit festen Regeln',
      ],
      usFeatures: [
        'Event Bus verarbeitet 10K+ Events/Monat',
        'Zentraler Orchestrator mit spezialisierten Workern',
        'Personalisierte Enterprise-Architekturen',
        'SRE Guardian 24/7 Auto-Remediation',
        'Autonome CEO, CFO, CTO, Legal Agenten',
      ],
      automationsTitle: 'Unsere Enterprise-Automatisierungen',
      automations: [
        { icon: '🧠', title: 'Opportunity Intelligence Engine', features: ['Trend-Radar alle 6h', 'Aggressives Prospect-Scoring', 'Automatische Verkaufsnachrichten', 'Aktive Kundensuche'], result: '3x Pipeline-Konversion' },
        { icon: '⚙️', title: 'Event-Orchestrator', features: ['Event Bus verarbeitet 10K+ Events/Monat', 'Spezialisierte Worker (Leads, OPS)', 'Intelligentes Routing nach Typ', 'P0/P1/P2 Auto-Remediation'], result: '0 Downtime, <2min' },
        { icon: '👥', title: 'Autonome C-Level Agenten', features: ['CEO: Strategie und Prioritäten', 'CFO: Finanzentscheidungen', 'CTO: Technische Forschung', 'Legal: Automatische Compliance'], result: '24/7 ohne Blocker' },
        { icon: '📊', title: 'Master Inventory Analyzer', features: ['Analyse aktiver Workflows', 'Erkannte ungenutzte Ressourcen', 'Tägliche Gesundheitsberichte', 'Kostenoptimierung'], result: '40% Kostenreduktion' },
        { icon: '🎯', title: 'Lead Intelligence Engine', features: ['Integriertes Multikanal-Intake', 'Automatische KI-Klassifikation', 'Personalisiertes Nurturing', 'CRM/Supabase Integration'], result: '70% weniger Zeit' },
        { icon: '🔧', title: 'SRE Guardian System', features: ['Kontinuierliche Überwachung 24/7', 'Automatische Health Checks', 'Intelligente Remediation', 'Multi-Kanal P0/P1/P2 Alerts'], result: 'Selbstheilend 24/7' },
      ],
      waitlistTitle: 'Warteliste beitreten',
      waitlistSubtitle: 'Exklusiver Zugang für Unternehmen, die Enterprise-Architekturen benötigen.',
      waitlistCta: 'Enterprise-Zugang anfordern',
    },
    process: {
      title: 'Wie Wir',
      titleHighlight: 'Arbeiten',
      subtitle: 'Prozess angepasst an das Architekturniveau, das Sie benötigen',
      steps: [
        { num: '1', title: 'Initiales Audit', description: 'Wir analysieren Ihre aktuellen Prozesse und erkennen Automatisierungsmöglichkeiten', time: '30-60 Min (kostenlos)' },
        { num: '2', title: 'Architektur-Design', description: 'Wir schlagen die spezifische Architektur mit Flows, Integrationen und erwartetem ROI vor', time: '2-5 Werktage' },
        { num: '3', title: 'Phasenweise Implementierung', description: 'Wir entwickeln und integrieren Systeme modular und testbar', time: '1-4 Wochen (nach Scope)' },
        { num: '4', title: 'Überwachung & Optimierung', description: 'Wir überwachen das System, passen an und erweitern nach Bedarf', time: 'Fortlaufend' },
      ],
    },
    techStack: {
      title: 'Gebaut mit den Besten Tools',
    },
    finalCta: {
      title: 'Bereit, Ihr Unternehmen auf Autopilot zu sehen?',
      subtitle: 'Planen Sie ein kostenloses Audit und wir zeigen Ihnen genau, welche Prozesse wir automatisieren können und den erwarteten ROI.',
      cta: 'Automatisierungs-Audit anfordern →',
      disclaimer: 'Dies ist kein Verkaufsgespräch. Es ist ein echtes technisches Audit Ihrer automatisierbaren Prozesse.',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslationsType = Record<Language, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyTranslations: TranslationsType = {
  es: {
    brand: 'HydrAI Labs',
    nav: { 
      home: 'Inicio', 
      services: 'Servicios', 
      industries: 'Automatizaciones', 
      pricing: 'Precios', 
      cases: 'Resultados', 
      resources: 'Recursos', 
      contact: 'Contacto', 
      login: 'Admin', 
      audit: 'Auditoría Gratis',
      architecture: 'Arquitectura IA',
    },
    footer: { 
      description: 'Arquitecturas de automatización con IA que operan tu negocio 24/7.', 
      solutions: 'Soluciones',
      solutionsBase: 'Implementaciones Base',
      solutionsEnterprise: 'Arquitectura Enterprise',
      solutionsCases: 'Casos de Uso',
      solutionsProcess: 'Proceso',
      resources: 'Recursos',
      resourcesBlog: 'Blog',
      resourcesCases: 'Casos de Éxito',
      resourcesFaq: 'FAQ',
      resourcesContact: 'Contacto',
      legal: 'Legal', 
      privacy: 'Política de Privacidad', 
      terms: 'Términos de Servicio', 
      cookies: 'Política de Cookies', 
      rights: 'Todos los derechos reservados.',
      email: 'hola@hydrailabs.com',
      location: 'Marbella · Costa del Sol, Spain',
    },
    common: { 
      loading: 'Cargando...', 
      error: 'Error', 
      success: 'Éxito', 
      save: 'Guardar', 
      cancel: 'Cancelar', 
      delete: 'Eliminar', 
      edit: 'Editar', 
      add: 'Añadir', 
      search: 'Buscar', 
      back: 'Volver' 
    },
  },
  en: {
    brand: 'HydrAI Labs',
    nav: { 
      home: 'Home', 
      services: 'Services', 
      industries: 'Automations', 
      pricing: 'Pricing', 
      cases: 'Cases', 
      resources: 'Resources', 
      contact: 'Contact', 
      login: 'Admin', 
      audit: 'Free Audit',
      architecture: 'AI Architecture',
    },
    footer: { 
      description: 'AI automation architectures that run your business 24/7.', 
      solutions: 'Solutions',
      solutionsBase: 'Base Implementations',
      solutionsEnterprise: 'Enterprise Architecture',
      solutionsCases: 'Use Cases',
      solutionsProcess: 'Process',
      resources: 'Resources',
      resourcesBlog: 'Blog',
      resourcesCases: 'Success Cases',
      resourcesFaq: 'FAQ',
      resourcesContact: 'Contact',
      legal: 'Legal', 
      privacy: 'Privacy Policy', 
      terms: 'Terms of Service', 
      cookies: 'Cookie Policy', 
      rights: 'All rights reserved.',
      email: 'hello@hydrailabs.com',
      location: 'Marbella · Costa del Sol, Spain',
    },
    common: { 
      loading: 'Loading...', 
      error: 'Error', 
      success: 'Success', 
      save: 'Save', 
      cancel: 'Cancel', 
      delete: 'Delete', 
      edit: 'Edit', 
      add: 'Add', 
      search: 'Search', 
      back: 'Back' 
    },
  },
  ru: {
    brand: 'HydrAI Labs',
    nav: { 
      home: 'Home', 
      services: 'Services', 
      industries: 'Automations', 
      pricing: 'Pricing', 
      cases: 'Cases', 
      resources: 'Resources', 
      contact: 'Contact', 
      login: 'Admin', 
      audit: 'Free Audit',
      architecture: 'AI Architecture',
    },
    footer: { 
      description: 'AI automation architectures that run your business 24/7.', 
      solutions: 'Solutions',
      solutionsBase: 'Base Implementations',
      solutionsEnterprise: 'Enterprise Architecture',
      solutionsCases: 'Use Cases',
      solutionsProcess: 'Process',
      resources: 'Resources',
      resourcesBlog: 'Blog',
      resourcesCases: 'Success Cases',
      resourcesFaq: 'FAQ',
      resourcesContact: 'Contact',
      legal: 'Legal', 
      privacy: 'Privacy Policy', 
      terms: 'Terms of Service', 
      cookies: 'Cookie Policy', 
      rights: 'All rights reserved.',
      email: 'hello@hydrailabs.com',
      location: 'Marbella · Costa del Sol, Spain',
    },
    common: { 
      loading: 'Loading...', 
      error: 'Error', 
      success: 'Success', 
      save: 'Save', 
      cancel: 'Cancel', 
      delete: 'Delete', 
      edit: 'Edit', 
      add: 'Add', 
      search: 'Search', 
      back: 'Back' 
    },
  },
  de: {
    brand: 'HydrAI Labs',
    nav: { 
      home: 'Start', 
      services: 'Dienste', 
      industries: 'Automatisierungen', 
      pricing: 'Preise', 
      cases: 'Fälle', 
      resources: 'Ressourcen', 
      contact: 'Kontakt', 
      login: 'Admin', 
      audit: 'Kostenloses Audit',
      architecture: 'KI-Architektur',
    },
    footer: { 
      description: 'KI-Automatisierungsarchitekturen, die Ihr Geschäft 24/7 betreiben.', 
      solutions: 'Lösungen',
      solutionsBase: 'Basis-Implementierungen',
      solutionsEnterprise: 'Enterprise-Architektur',
      solutionsCases: 'Anwendungsfälle',
      solutionsProcess: 'Prozess',
      resources: 'Ressourcen',
      resourcesBlog: 'Blog',
      resourcesCases: 'Erfolgsfälle',
      resourcesFaq: 'FAQ',
      resourcesContact: 'Kontakt',
      legal: 'Rechtliches', 
      privacy: 'Datenschutzrichtlinie', 
      terms: 'Nutzungsbedingungen', 
      cookies: 'Cookie-Richtlinie', 
      rights: 'Alle Rechte vorbehalten.',
      email: 'hallo@hydrailabs.com',
      location: 'Marbella · Costa del Sol, Spain',
    },
    common: { 
      loading: 'Laden...', 
      error: 'Fehler', 
      success: 'Erfolg', 
      save: 'Speichern', 
      cancel: 'Abbrechen', 
      delete: 'Löschen', 
      edit: 'Bearbeiten', 
      add: 'Hinzufügen', 
      search: 'Suchen', 
      back: 'Zurück' 
    },
  },
};

export function useTranslation() {
  const { language, setLanguage } = useI18n();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let result = legacyTranslations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  // Get array values
  const tArray = (key: string): string[] => {
    const keys = key.split('.');
    let result = legacyTranslations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return [];
      }
    }
    return Array.isArray(result) ? result : [];
  };

  // Get object values
  const tObject = (key: string): Record<string, unknown> => {
    const keys = key.split('.');
    let result = legacyTranslations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return {};
      }
    }
    return typeof result === 'object' && !Array.isArray(result) ? result : {};
  };
  
  return { t, tArray, tObject, language, setLanguage };
}

// Hook for landing page translations
export function useLandingTranslation() {
  const { language, setLanguage } = useI18n();
  
  const landing = landingTranslations[language];
  
  return { 
    landing, 
    language, 
    setLanguage,
    // Also expose legacy t function for other components
    t: (key: string): string => {
      const keys = key.split('.');
      let result = legacyTranslations[language];
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return key;
        }
      }
      return typeof result === 'string' ? result : key;
    },
  };
}

// ============================================================
// Page-level translations (Contact, Services, Pricing, Index)
// ============================================================

interface ContactCopy {
  badge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successPrefix: string;
  successSuffix: string;
  errorWhatsapp: string;
  errorWhatsappCta: string;
  discordTitle: string;
  discordSubtitle: string;
  emailTitle: string;
  locationTitle: string;
  locationValue: string;
  responseTitle: string;
  responseValue: string;
  auditCardTitle: string;
  auditCardSubtitle: string;
  auditCardCta: string;
  investorBadge: string;
  investorTitle: string;
  investorSubtitle: string;
  investorCta: string;
  seoTitle: string;
  seoDescription: string;
  validationNameShort: string;
  validationEmailInvalid: string;
  validationMessageShort: string;
  validationFormError: string;
  breadcrumbHome: string;
  breadcrumbContact: string;
}

const contactTranslations: Record<Language, ContactCopy> = {
  es: {
    badge: 'Contacto',
    heroTitle: 'Hablemos de tu',
    heroTitleHighlight: 'proyecto',
    heroSubtitle: 'Respondemos en menos de 24h. Sin compromisos.',
    formTitle: 'Envíanos un mensaje',
    nameLabel: 'Nombre *',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Email *',
    emailPlaceholder: 'tu@email.com',
    phoneLabel: 'Teléfono (opcional)',
    phonePlaceholder: '+34 600 000 000',
    messageLabel: 'Mensaje *',
    messagePlaceholder: 'Cuéntanos sobre tu negocio y qué necesitas...',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    successPrefix: '¡Perfecto',
    successSuffix: '! Recibirás respuesta en menos de 24h.',
    errorWhatsapp: 'Hubo un problema técnico. Contáctanos directamente en WhatsApp:',
    errorWhatsappCta: 'Abrir WhatsApp →',
    discordTitle: 'Discord',
    discordSubtitle: 'Únete a nuestra comunidad',
    emailTitle: 'Email',
    locationTitle: 'Ubicación',
    locationValue: '100% Remoto (España)',
    responseTitle: 'Tiempo de respuesta',
    responseValue: '< 24 horas laborables',
    auditCardTitle: '¿Prefieres una auditoría?',
    auditCardSubtitle: 'Descubre gratis cómo la IA puede ayudarte.',
    auditCardCta: 'Auditoría gratuita',
    investorBadge: 'Investor Hub',
    investorTitle: 'Investor Hub',
    investorSubtitle: 'Construimos sistemas con potencial de escala. Únete como partner.',
    investorCta: 'Acceder al Investor Hub',
    seoTitle: 'Contacto | HydrAI Labs',
    seoDescription: 'Habla con HydrAI Labs. Auditoría gratuita de automatización para tu negocio local.',
    validationNameShort: 'Nombre muy corto',
    validationEmailInvalid: 'Email inválido',
    validationMessageShort: 'Mensaje muy corto',
    validationFormError: 'Revisa los datos del formulario',
    breadcrumbHome: 'Inicio',
    breadcrumbContact: 'Contacto',
  },
  en: {
    badge: 'Contact',
    heroTitle: "Let's talk about your",
    heroTitleHighlight: 'project',
    heroSubtitle: 'We reply in under 24h. No strings attached.',
    formTitle: 'Send us a message',
    nameLabel: 'Name *',
    namePlaceholder: 'Your name',
    emailLabel: 'Email *',
    emailPlaceholder: 'you@email.com',
    phoneLabel: 'Phone (optional)',
    phonePlaceholder: '+34 600 000 000',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell us about your business and what you need...',
    send: 'Send message',
    sending: 'Sending...',
    successPrefix: 'Perfect',
    successSuffix: '! You will get a reply in under 24h.',
    errorWhatsapp: 'There was a technical issue. Contact us directly on WhatsApp:',
    errorWhatsappCta: 'Open WhatsApp →',
    discordTitle: 'Discord',
    discordSubtitle: 'Join our community',
    emailTitle: 'Email',
    locationTitle: 'Location',
    locationValue: '100% Remote (Spain)',
    responseTitle: 'Response time',
    responseValue: '< 24 business hours',
    auditCardTitle: 'Prefer an audit?',
    auditCardSubtitle: 'Discover for free how AI can help you.',
    auditCardCta: 'Free audit',
    investorBadge: 'Investor Hub',
    investorTitle: 'Investor Hub',
    investorSubtitle: 'We build systems with scale potential. Join us as a partner.',
    investorCta: 'Access Investor Hub',
    seoTitle: 'Contact | HydrAI Labs',
    seoDescription: 'Talk to HydrAI Labs. Free automation audit for your local business.',
    validationNameShort: 'Name too short',
    validationEmailInvalid: 'Invalid email',
    validationMessageShort: 'Message too short',
    validationFormError: 'Please check the form data',
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact',
  },
  ru: {
    badge: 'Contact',
    heroTitle: "Let's talk about your",
    heroTitleHighlight: 'project',
    heroSubtitle: 'We reply in under 24h. No strings attached.',
    formTitle: 'Send us a message',
    nameLabel: 'Name *',
    namePlaceholder: 'Your name',
    emailLabel: 'Email *',
    emailPlaceholder: 'you@email.com',
    phoneLabel: 'Phone (optional)',
    phonePlaceholder: '+34 600 000 000',
    messageLabel: 'Message *',
    messagePlaceholder: 'Tell us about your business and what you need...',
    send: 'Send message',
    sending: 'Sending...',
    successPrefix: 'Perfect',
    successSuffix: '! You will get a reply in under 24h.',
    errorWhatsapp: 'There was a technical issue. Contact us directly on WhatsApp:',
    errorWhatsappCta: 'Open WhatsApp →',
    discordTitle: 'Discord',
    discordSubtitle: 'Join our community',
    emailTitle: 'Email',
    locationTitle: 'Location',
    locationValue: '100% Remote (Spain)',
    responseTitle: 'Response time',
    responseValue: '< 24 business hours',
    auditCardTitle: 'Prefer an audit?',
    auditCardSubtitle: 'Discover for free how AI can help you.',
    auditCardCta: 'Free audit',
    investorBadge: 'Investor Hub',
    investorTitle: 'Investor Hub',
    investorSubtitle: 'We build systems with scale potential. Join us as a partner.',
    investorCta: 'Access Investor Hub',
    seoTitle: 'Contact | HydrAI Labs',
    seoDescription: 'Talk to HydrAI Labs. Free automation audit for your local business.',
    validationNameShort: 'Name too short',
    validationEmailInvalid: 'Invalid email',
    validationMessageShort: 'Message too short',
    validationFormError: 'Please check the form data',
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact',
  },
  de: {
    badge: 'Kontakt',
    heroTitle: 'Sprechen wir über Ihr',
    heroTitleHighlight: 'Projekt',
    heroSubtitle: 'Wir antworten in unter 24 Std. Unverbindlich.',
    formTitle: 'Senden Sie uns eine Nachricht',
    nameLabel: 'Name *',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail *',
    emailPlaceholder: 'sie@email.com',
    phoneLabel: 'Telefon (optional)',
    phonePlaceholder: '+34 600 000 000',
    messageLabel: 'Nachricht *',
    messagePlaceholder: 'Erzählen Sie uns von Ihrem Unternehmen und Ihren Bedürfnissen...',
    send: 'Nachricht senden',
    sending: 'Senden...',
    successPrefix: 'Perfekt',
    successSuffix: '! Sie erhalten eine Antwort in unter 24 Std.',
    errorWhatsapp: 'Es gab ein technisches Problem. Kontaktieren Sie uns direkt über WhatsApp:',
    errorWhatsappCta: 'WhatsApp öffnen →',
    discordTitle: 'Discord',
    discordSubtitle: 'Treten Sie unserer Community bei',
    emailTitle: 'E-Mail',
    locationTitle: 'Standort',
    locationValue: '100% Remote (Spanien)',
    responseTitle: 'Antwortzeit',
    responseValue: '< 24 Geschäftsstunden',
    auditCardTitle: 'Lieber ein Audit?',
    auditCardSubtitle: 'Entdecken Sie kostenlos, wie KI Ihnen helfen kann.',
    auditCardCta: 'Kostenloses Audit',
    investorBadge: 'Investor Hub',
    investorTitle: 'Investor Hub',
    investorSubtitle: 'Wir bauen skalierbare Systeme. Werden Sie unser Partner.',
    investorCta: 'Zum Investor Hub',
    seoTitle: 'Kontakt | HydrAI Labs',
    seoDescription: 'Sprechen Sie mit HydrAI Labs. Kostenloses Automatisierungs-Audit für Ihr lokales Unternehmen.',
    validationNameShort: 'Name zu kurz',
    validationEmailInvalid: 'Ungültige E-Mail',
    validationMessageShort: 'Nachricht zu kurz',
    validationFormError: 'Bitte überprüfen Sie die Formulardaten',
    breadcrumbHome: 'Start',
    breadcrumbContact: 'Kontakt',
  },
};

export function useContactTranslation(): ContactCopy & { language: Language } {
  const { language } = useI18n();
  return { ...contactTranslations[language], language };
}

// ===== Page SEO meta (Home / Servicios / Precios) =====
export interface PageSEO { title: string; description: string; }
type PageKey = 'home' | 'servicios' | 'precios';

const pageSEOTranslations: Record<Language, Record<PageKey, PageSEO>> = {
  es: {
    home: { title: 'HydrAI Labs | Automatización IA para Negocios Locales en Costa del Sol', description: 'Agencia de automatización con IA en Costa del Sol. Chatbots WhatsApp 24/7, automatizaciones n8n y captación de clientes para restaurantes, clínicas, inmobiliarias y gimnasios.' },
    servicios: { title: 'Servicios de Automatización IA | HydrAI Labs', description: 'Chatbots IA, webs SEO, scraping y campañas automáticas por WhatsApp, Email e Instagram. Desde 197€.' },
    precios: { title: 'Precios y Planes de Automatización IA | HydrAI Labs', description: 'Planes de automatización IA para negocios locales desde implementación básica hasta arquitectura enterprise. Sin sorpresas, sin permanencia. Costa del Sol.' },
  },
  en: {
    home: { title: 'HydrAI Labs | AI Automation for Local Businesses on Costa del Sol', description: 'AI automation agency on Costa del Sol. 24/7 WhatsApp chatbots, n8n automations and lead generation for restaurants, clinics, real estate and gyms.' },
    servicios: { title: 'AI Automation Services | HydrAI Labs', description: 'AI chatbots, SEO websites, scraping and automated WhatsApp, Email & Instagram campaigns. From €197.' },
    precios: { title: 'AI Automation Pricing & Plans | HydrAI Labs', description: 'AI automation plans for local businesses, from basic implementation to enterprise architecture. No surprises, no lock-in. Costa del Sol.' },
  },
  ru: {
    home: { title: 'HydrAI Labs | AI Automation for Local Businesses on Costa del Sol', description: 'AI automation agency on Costa del Sol. 24/7 WhatsApp chatbots, n8n automations and lead generation for restaurants, clinics, real estate and gyms.' },
    servicios: { title: 'AI Automation Services | HydrAI Labs', description: 'AI chatbots, SEO websites, scraping and automated WhatsApp, Email & Instagram campaigns. From €197.' },
    precios: { title: 'AI Automation Pricing & Plans | HydrAI Labs', description: 'AI automation plans for local businesses, from basic implementation to enterprise architecture. No surprises, no lock-in. Costa del Sol.' },
  },
  de: {
    home: { title: 'HydrAI Labs | KI-Automatisierung für lokale Unternehmen an der Costa del Sol', description: 'KI-Automatisierungsagentur an der Costa del Sol. 24/7 WhatsApp-Chatbots, n8n-Automatisierungen und Kundengewinnung für Restaurants, Kliniken, Immobilien und Fitnessstudios.' },
    servicios: { title: 'KI-Automatisierungsdienste | HydrAI Labs', description: 'KI-Chatbots, SEO-Websites, Scraping und automatisierte WhatsApp-, E-Mail- und Instagram-Kampagnen. Ab 197€.' },
    precios: { title: 'Preise und Pläne für KI-Automatisierung | HydrAI Labs', description: 'KI-Automatisierungspläne für lokale Unternehmen, von der Basisimplementierung bis zur Enterprise-Architektur. Keine Überraschungen, keine Bindung.' },
  },
};

export function usePageSEO(page: PageKey): PageSEO & { language: Language } {
  const { language } = useI18n();
  return { ...pageSEOTranslations[language][page], language };
}

// ===== Pricing page copy =====
export interface PricingCopy {
  badge: string; title: string; subtitle: string;
  popular: string; premium: string; perMonth: string; custom: string;
  ctaTitle: string; ctaSubtitle: string; ctaAudit: string; ctaHuman: string;
  plans: Array<{ id: string; name: string; price: string; badge: string | null; features: string[]; cta: string; }>;
}

const pricingTranslations: Record<Language, PricingCopy> = {
  es: {
    badge: 'Precios transparentes', title: 'Elige tu nivel de automatización',
    subtitle: 'Planes flexibles que crecen con tu negocio. Sin permanencia.',
    popular: 'Más popular', premium: 'Premium', perMonth: '/mes', custom: 'A medida',
    ctaTitle: '¿Necesitas algo personalizado?', ctaSubtitle: 'Haz nuestra auditoría gratuita y te recomendamos el mejor plan.',
    ctaAudit: 'Auditoría Gratis', ctaHuman: 'Hablar con humano',
    plans: [
      { id: 'base', name: 'Base', price: '497', badge: null, cta: 'Empezar con Base', features: ['Chatbot IA en tu web (atención 24/7)', '3 workflows automatizados', 'Integración WhatsApp Business', 'Dashboard de métricas básico', 'Soporte por email 48h', 'Setup completo en 7 días'] },
      { id: 'growth', name: 'Growth', price: '997', badge: 'Más popular', cta: 'Empezar con Growth', features: ['Todo lo del plan Base', '10 workflows automatizados', 'Agente IA especializado en tu nicho', 'Integración CRM + email marketing', 'Soporte prioritario 24h', 'Reporting semanal con recomendaciones', 'Optimización continua del sistema'] },
      { id: 'enterprise', name: 'Enterprise', price: 'A medida', badge: 'Premium', cta: 'Solicitar Propuesta', features: ['Arquitectura Event Bus completa', 'Workflows y agentes ilimitados', 'Agentes CEO/CFO/CTO especializados', 'Integraciones a medida (ERP, POS, etc.)', 'SLA garantizado + soporte dedicado', 'Onboarding presencial en España'] },
    ],
  },
  en: {
    badge: 'Transparent pricing', title: 'Choose your automation level',
    subtitle: 'Flexible plans that grow with your business. No lock-in.',
    popular: 'Most popular', premium: 'Premium', perMonth: '/mo', custom: 'Custom',
    ctaTitle: 'Need something custom?', ctaSubtitle: 'Take our free audit and we will recommend the best plan.',
    ctaAudit: 'Free Audit', ctaHuman: 'Talk to a human',
    plans: [
      { id: 'base', name: 'Base', price: '497', badge: null, cta: 'Start with Base', features: ['AI chatbot on your website (24/7)', '3 automated workflows', 'WhatsApp Business integration', 'Basic metrics dashboard', '48h email support', 'Full setup in 7 days'] },
      { id: 'growth', name: 'Growth', price: '997', badge: 'Most popular', cta: 'Start with Growth', features: ['Everything in Base', '10 automated workflows', 'Niche-specialized AI agent', 'CRM + email marketing integration', '24h priority support', 'Weekly reporting with recommendations', 'Continuous system optimization'] },
      { id: 'enterprise', name: 'Enterprise', price: 'Custom', badge: 'Premium', cta: 'Request a Proposal', features: ['Full Event Bus architecture', 'Unlimited workflows and agents', 'Specialized CEO/CFO/CTO agents', 'Custom integrations (ERP, POS, etc.)', 'Guaranteed SLA + dedicated support', 'On-site onboarding in Spain'] },
    ],
  },
  ru: {
    badge: 'Transparent pricing', title: 'Choose your automation level',
    subtitle: 'Flexible plans that grow with your business. No lock-in.',
    popular: 'Most popular', premium: 'Premium', perMonth: '/mo', custom: 'Custom',
    ctaTitle: 'Need something custom?', ctaSubtitle: 'Take our free audit and we will recommend the best plan.',
    ctaAudit: 'Free Audit', ctaHuman: 'Talk to a human',
    plans: [
      { id: 'base', name: 'Base', price: '497', badge: null, cta: 'Start with Base', features: ['AI chatbot on your website (24/7)', '3 automated workflows', 'WhatsApp Business integration', 'Basic metrics dashboard', '48h email support', 'Full setup in 7 days'] },
      { id: 'growth', name: 'Growth', price: '997', badge: 'Most popular', cta: 'Start with Growth', features: ['Everything in Base', '10 automated workflows', 'Niche-specialized AI agent', 'CRM + email marketing integration', '24h priority support', 'Weekly reporting with recommendations', 'Continuous system optimization'] },
      { id: 'enterprise', name: 'Enterprise', price: 'Custom', badge: 'Premium', cta: 'Request a Proposal', features: ['Full Event Bus architecture', 'Unlimited workflows and agents', 'Specialized CEO/CFO/CTO agents', 'Custom integrations (ERP, POS, etc.)', 'Guaranteed SLA + dedicated support', 'On-site onboarding in Spain'] },
    ],
  },
  de: {
    badge: 'Transparente Preise', title: 'Wählen Sie Ihr Automatisierungsniveau',
    subtitle: 'Flexible Pläne, die mit Ihrem Unternehmen wachsen. Ohne Bindung.',
    popular: 'Am beliebtesten', premium: 'Premium', perMonth: '/Monat', custom: 'Individuell',
    ctaTitle: 'Brauchen Sie etwas Individuelles?', ctaSubtitle: 'Machen Sie unser kostenloses Audit und wir empfehlen den besten Plan.',
    ctaAudit: 'Kostenloses Audit', ctaHuman: 'Mit Mensch sprechen',
    plans: [
      { id: 'base', name: 'Base', price: '497', badge: null, cta: 'Mit Base starten', features: ['KI-Chatbot auf Ihrer Website (24/7)', '3 automatisierte Workflows', 'WhatsApp Business Integration', 'Basis-Metrik-Dashboard', 'E-Mail-Support 48h', 'Komplettes Setup in 7 Tagen'] },
      { id: 'growth', name: 'Growth', price: '997', badge: 'Am beliebtesten', cta: 'Mit Growth starten', features: ['Alles aus Base', '10 automatisierte Workflows', 'Auf Ihre Nische spezialisierter KI-Agent', 'CRM + E-Mail-Marketing Integration', 'Prioritäts-Support 24h', 'Wöchentliches Reporting mit Empfehlungen', 'Kontinuierliche Systemoptimierung'] },
      { id: 'enterprise', name: 'Enterprise', price: 'Individuell', badge: 'Premium', cta: 'Angebot anfordern', features: ['Vollständige Event Bus Architektur', 'Unbegrenzte Workflows und Agenten', 'Spezialisierte CEO/CFO/CTO-Agenten', 'Individuelle Integrationen (ERP, POS, etc.)', 'Garantierte SLA + dedizierter Support', 'Vor-Ort-Onboarding in Spanien'] },
    ],
  },
};

export function usePricingTranslation(): PricingCopy & { language: Language } {
  const { language } = useI18n();
  return { ...pricingTranslations[language], language };
}
