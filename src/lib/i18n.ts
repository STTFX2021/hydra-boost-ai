import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'es' | 'en';

// Detect browser language
const detectBrowserLanguage = (): Language => {
  const storedLang = localStorage.getItem('hydrai-language');
  if (storedLang) {
    try {
      const parsed = JSON.parse(storedLang);
      if (parsed.state?.language === 'es' || parsed.state?.language === 'en') {
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
  }
  
  return 'es'; // fallback
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Language, any> = {
  es: {
    brand: 'HydrAI Labs',
    nav: { 
      home: 'Inicio', 
      services: 'Servicios', 
      industries: 'Automatizaciones', 
      pricing: 'Precios', 
      cases: 'Casos', 
      resources: 'Recursos', 
      contact: 'Contacto', 
      login: 'Admin', 
      audit: 'Auditoría Gratis' 
    },
    hero: { 
      title: 'Creamos webs y automatizaciones IA que traen clientes mientras duermes', 
      subtitle: 'Agencia de Inteligencia Artificial para negocios locales y pymes: páginas web profesionales, chatbots 24/7 y automatizaciones que responden, reservan y hacen seguimiento por ti.', 
      priceTag: 'Packs desde 497 € + IVA · Entregas rápidas · Soporte humano + IA',
      badge: 'Automatización con IA',
      cta1: 'Auditoría AI gratis (3 min)', 
      cta2: 'Reservar llamada' 
    },
    stats: {
      response: 'Respuesta < 60s',
      responseLabel: 'Tiempo medio de respuesta',
      noShows: 'Menos no-shows',
      noShowsLabel: 'Con recordatorios de cita',
      bookings: 'Más reservas',
      bookingsLabel: 'Con automatización',
      satisfaction: 'Alta satisfacción',
      satisfactionLabel: 'Nuestros clientes'
    },
    homeServices: {
      title: 'Webs, chatbots y automatizaciones a medida',
      subtitle: 'Creamos páginas web que convierten, añadimos chatbots 24/7, y automatizamos reservas, recordatorios y reseñas para tu negocio local.',
      ribbon: '🎄 Oferta Navidad: hasta -20% en packs Web + Chatbot y Automatiza tu Agenda',
      webPresencia: {
        title: 'Web Presencia IA-Ready',
        description: 'Landing o web corporativa 1–3 páginas para negocio local, optimizada para móvil y preparada para conectar chatbots y automatizaciones.',
        price: 'Desde 497 € + IVA'
      },
      webChatbot: {
        title: 'Web + Chatbot 24/7',
        description: 'Web + chatbot IA 24/7 que responde preguntas frecuentes, recoge datos y genera oportunidades.',
        price: 'Desde 790 € + IVA'
      },
      automatiza: {
        title: 'Automatiza tu Agenda',
        description: 'Automatizaciones para reservas, recordatorios de citas, follow-up y solicitud de reseñas.',
        price: 'Desde 1.290 € + IVA'
      },
      mantenimiento: {
        title: 'Mantenimiento & Optimización',
        description: 'Cambios en la web, mejora continua y revisión de automatizaciones.',
        price: 'Desde 49 €/mes'
      }
    },
    howItWorks: { 
      title: '¿Cómo funciona?', 
      step1: { num: '01', title: 'Diagnóstico', description: 'Analizamos tu negocio en 15 minutos.' }, 
      step2: { num: '02', title: 'Implementación', description: 'Configuramos en 48-72h.' }, 
      step3: { num: '03', title: 'Optimización', description: 'Mejora continua garantizada.' } 
    },
    cta: { 
      title: '¿Listo para automatizar?', 
      subtitle: 'Empieza con una auditoría gratuita.', 
      button: 'Solicitar auditoría gratis' 
    },
    footer: { 
      description: 'Automatización inteligente para negocios locales.', 
      links: 'Enlaces', 
      legal: 'Legal', 
      privacy: 'Privacidad', 
      terms: 'Términos', 
      cookies: 'Cookies', 
      rights: 'Todos los derechos reservados.' 
    },
    contact: { 
      title: 'Contacto', 
      heroTitle: 'Hablemos de tu proyecto',
      heroSubtitle: 'Respondemos en menos de 24h. Sin compromisos.',
      formTitle: 'Envíanos un mensaje',
      whatsapp: 'WhatsApp',
      email: 'Email',
      location: 'Ubicación',
      locationValue: '100% Remoto (España)',
      responseTime: 'Tiempo de respuesta',
      responseTimeValue: '< 24 horas laborables',
      auditCta: '¿Prefieres una auditoría?',
      auditCtaSubtitle: 'Descubre gratis cómo la IA puede ayudarte.',
      form: { 
        name: 'Nombre', 
        email: 'Email', 
        phone: 'Teléfono (opcional)', 
        phonePlaceholder: '+34 634 425 921',
        message: 'Mensaje', 
        messagePlaceholder: 'Cuéntanos sobre tu negocio y qué necesitas...',
        submit: 'Enviar mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado! Te responderemos pronto.', 
        error: 'Error al enviar el mensaje. Inténtalo de nuevo.' 
      } 
    },
    services: {
      badge: 'Packs de Agencia',
      title: 'Lo que hacemos por ti',
      subtitle: 'HydrAI Labs crea webs, chatbots y automatizaciones a medida para negocios locales y pymes. Sin complicaciones. Resultados medibles.',
      ribbon: '🎄 Oferta Navidad: hasta -20% en packs Web + Chatbot y Automatiza tu Agenda',
      includes: 'Qué incluye:',
      deliverables: 'Entregables',
      implementTime: 'Tiempo de implementación:',
      expectedKpis: 'KPIs esperados',
      requestService: 'Solicitar este servicio',
      ctaTitle: '¿No sabes por dónde empezar?',
      ctaSubtitle: 'Haz nuestra auditoría gratuita y te diremos qué servicios necesitas.',
      ctaButton: 'Auditoría AI gratis (3 min)',
      webPresencia: {
        title: 'Web Presencia IA-Ready',
        subtitle: 'Landing o web corporativa',
        description: 'Web corporativa o landing page optimizada para móvil, preparada para integrar chatbots y automatizaciones. Ideal para restaurantes, clínicas, talleres, inmobiliarias…',
        features: [
          '1–3 secciones clave (inicio, servicios, contacto)',
          'Formulario de contacto o botón directo a WhatsApp',
          'Configuración básica de SEO local (título, descripción, mapa, etc.)',
          'Diseño responsive y moderno',
          'Hosting y dominio no incluidos (te asesoramos)'
        ],
        deliverables: ['Web lista para producción', 'Panel de administración básico', 'Guía de uso'],
        time: '5-7 días',
        price: 'Desde 497 € + IVA',
        kpis: ['Presencia online profesional', 'Leads capturados 24/7', 'Base para futuras automatizaciones']
      },
      webChatbot: {
        title: 'Web + Chatbot 24/7',
        subtitle: 'Tu asistente virtual siempre disponible',
        description: 'Tu web + un asistente virtual que responde 24/7, recoge datos y guía a los clientes hacia la reserva o la consulta.',
        features: [
          'Chatbot IA entrenado con la info de tu negocio',
          'Disponible en web (widget) y preparado para WhatsApp/Redes',
          'Consulta rápida de horarios, servicios, precios orientativos',
          'Captura de leads automática',
          'Derivación inteligente a humano cuando es necesario'
        ],
        deliverables: ['Web completa', 'Chatbot configurado y entrenado', 'Dashboard de conversaciones'],
        time: '7-10 días',
        price: 'Desde 790 € + IVA',
        kpis: ['Respuesta < 30s 24/7', '-70% mensajes sin responder', '+40% conversión de leads']
      },
      automatiza: {
        title: 'Automatiza tu Agenda',
        subtitle: 'Reservas, recordatorios y reseñas en piloto automático',
        description: 'Automatizaciones que conectan formulario, chatbot, calendario, email y WhatsApp para que las reservas se gestionen solas.',
        features: [
          'Confirmaciones y recordatorios automáticos (WhatsApp/Email)',
          'Mensajes anti no-show',
          'Pedir reseñas en el momento correcto',
          'Integración con Google Calendar o similar',
          'Seguimiento post-servicio automatizado'
        ],
        deliverables: ['Sistema de reservas activo', 'Flujos de automatización configurados', 'Dashboard de métricas'],
        time: '10-14 días',
        price: 'Desde 1.290 € + IVA',
        kpis: ['-80% no-shows', '+300% reseñas/mes', 'Gestión 100% automática']
      },
      reputacion: {
        title: 'Reputación en Piloto Automático',
        subtitle: 'Más reseñas 5 estrellas sin esfuerzo',
        description: 'Automatiza la solicitud de reseñas en el momento perfecto y responde a todas las reseñas de forma inteligente.',
        features: [
          'Solicitud automática post-servicio',
          'Filtro de satisfacción previo',
          'Respuestas sugeridas por IA',
          'Recordatorios a clientes satisfechos',
          'Alertas de reseñas negativas'
        ],
        deliverables: ['Flujos de solicitud activos', 'Plantillas de respuesta', 'Dashboard de reputación'],
        time: '3-5 días',
        price: 'Consultar',
        kpis: ['+300% nuevas reseñas/mes', '4.8+ rating promedio', '100% reseñas respondidas']
      },
      leadCapture: {
        title: 'Captura de Clientes sin Web',
        subtitle: 'Para negocios que aún no tienen web',
        description: 'Servicio para negocios que todavía no tienen web: chatbot + landings simples + automatizaciones mínimas para empezar a captar leads.',
        features: [
          'Bot de captura en WhatsApp/Instagram/Facebook',
          'Landing page simple de captación',
          'Integración con CRM básico',
          'Etiquetado automático de leads',
          'Seguimiento automatizado'
        ],
        deliverables: ['Flujos de captura activos', 'CRM básico configurado', 'Automatizaciones mínimas'],
        time: '5-7 días',
        price: 'Consultar',
        kpis: ['+50% leads capturados', '0 leads perdidos', 'Seguimiento 100% automático']
      },
      mantenimiento: {
        title: 'Mantenimiento & Optimización',
        subtitle: 'Tu web y automatizaciones siempre al día',
        description: 'Cambios en la web, mejora continua y revisión de automatizaciones para que todo funcione perfectamente mes a mes.',
        features: [
          'Cambios menores en contenido y diseño',
          'Revisión mensual de automatizaciones',
          'Optimización de chatbot según feedback',
          'Soporte técnico prioritario',
          'Informes mensuales de rendimiento'
        ],
        deliverables: ['Soporte continuo', 'Informes mensuales', 'Mejoras incrementales'],
        time: 'Mensual',
        price: 'Desde 49 €/mes',
        kpis: ['Web siempre actualizada', 'Automatizaciones optimizadas', 'Soporte cuando lo necesites']
      }
    },
    pricing: { 
      badge: 'Precios transparentes',
      title: 'Packs claros, sin letra pequeña', 
      subtitle: 'Elige el pack que mejor se adapte a tu negocio. Precios fijos, entrega rápida.', 
      ribbon: '🎄 Oferta Navidad: hasta -20% en packs Web + Chatbot y Automatiza tu Agenda',
      popular: 'Más popular',
      oneTimePayment: 'pago único',
      monthly: 'mes',
      request: 'Solicitar',
      monthlyPlansTitle: 'Planes mensuales',
      talkToHuman: '¿Necesitas algo más personalizado?',
      talkToHumanButton: 'Hablar con un humano',
      faqTitle: 'Preguntas frecuentes',
      ctaTitle: '¿Aún tienes dudas?',
      ctaSubtitle: 'Haz nuestra auditoría gratuita y te diremos qué pack necesitas.',
      ctaButton: 'Auditoría AI gratis',
      packs: {
        webPresencia: {
          name: 'Web Presencia IA-Ready',
          description: 'Tu web profesional lista para conectar chatbots y automatizaciones',
          features: [
            'Web corporativa 1–3 páginas',
            'Diseño responsive y moderno',
            'Formulario de contacto / WhatsApp',
            'SEO local básico',
            'Preparada para chatbot futuro'
          ]
        },
        webChatbot: {
          name: 'Web + Chatbot 24/7',
          description: 'Tu web + asistente virtual que responde, captura leads y guía clientes',
          features: [
            'Todo lo de Web Presencia +',
            'Chatbot IA 24/7 entrenado',
            'Widget en web + WhatsApp ready',
            'Captura automática de leads',
            'Dashboard de conversaciones',
            'Soporte 30 días incluido'
          ]
        },
        automatiza: {
          name: 'Automatiza tu Agenda',
          description: 'Sistema completo de reservas, recordatorios y solicitud de reseñas',
          features: [
            'Todo lo de Web + Chatbot +',
            'Sistema de reservas online',
            'Recordatorios automáticos (WhatsApp/Email)',
            'Mensajes anti no-show',
            'Solicitud de reseñas post-servicio',
            'Integración Google Calendar',
            'Dashboard de métricas'
          ]
        }
      },
      monthlyPlans: {
        mantenimiento: {
          name: 'Plan Mantenimiento',
          description: 'Cambios menores, soporte técnico y revisión mensual de automatizaciones.'
        },
        crecimiento: {
          name: 'Plan Crecimiento',
          description: 'Todo lo de Mantenimiento + optimización de chatbot, mejoras de conversión e informes detallados.'
        }
      },
      faqs: [
        {
          q: '¿Qué incluye el precio?',
          a: 'Todo lo listado en cada pack. Sin costes ocultos. Hosting y dominio no incluidos (te asesoramos para elegir el mejor).'
        },
        {
          q: '¿Cuánto tarda la entrega?',
          a: 'Web Presencia: 5-7 días. Web + Chatbot: 7-10 días. Automatiza tu Agenda: 10-14 días. Depende de tu rapidez enviando contenido.'
        },
        {
          q: '¿Puedo actualizar mi pack más adelante?',
          a: 'Sí, puedes empezar con Web Presencia y añadir chatbot o automatizaciones cuando quieras. Solo pagas la diferencia.'
        },
        {
          q: '¿Qué pasa después de la entrega?',
          a: 'Tienes 30 días de soporte incluido. Después puedes contratar un plan mensual o pedir ajustes puntuales.'
        },
        {
          q: '¿Ofrecéis descuentos?',
          a: 'Sí, tenemos ofertas puntuales y descuentos por pago anual en los planes mensuales. Pregúntanos.'
        }
      ]
    },
    industries: {
      badge: 'Automatizaciones IA',
      title: 'Automatizaciones IA para captar, convertir y operar sin fricción',
      subtitle: 'Leads → nutrición → citas → seguimiento → reporting → ejecución 24/7',
      sectorTitle: 'Plantillas por Sector',
      sectorSubtitle: 'Ejemplos de automatizaciones adaptadas a industrias específicas.',
      apply: 'Aplicar plantilla',
      packs: 'Packs recomendados:',
      packWebPresencia: 'Web Presencia',
      packWebChatbot: 'Web + Chatbot',
      packAutomatiza: 'Automatiza tu Agenda'
    },
    cases: { 
      badge: 'Casos de Éxito',
      title: 'Proyectos que demuestran resultados', 
      subtitle: 'Ejemplos de lo que HydrAI Labs puede hacer por tu negocio: webs, chatbots y automatizaciones reales.',
      viewDemo: 'Ver demo',
      comingSoon: 'Ver demo (próximamente)',
      ctaTitle: '¿Tienes un proyecto en mente?',
      ctaSubtitle: 'Cuéntanos tu idea y te proponemos la mejor solución para tu negocio.',
      ctaButton: 'Hablemos',
      testimonialsTitle: 'Lo que dicen nuestros clientes',
      testimonialsSubtitle: 'Historias reales de negocios que ya están usando webs, chatbots y automatizaciones hechas por HydrAI Labs.'
    },
    resources: {
      badge: 'Herramientas',
      title: 'Herramientas y Partners',
      subtitle: 'Las tecnologías que usamos para construir tus soluciones',
      description: 'En HydrAI Labs nos apoyamos en las mejores herramientas del mercado para crear webs, chatbots y automatizaciones de alta calidad. Estas son algunas de las tecnologías que utilizamos:',
      aiSection: 'Inteligencia Artificial',
      aiDescription: 'Modelos de IA de última generación para chatbots inteligentes',
      devSection: 'Desarrollo & Hosting',
      devDescription: 'Plataformas modernas para webs rápidas y escalables',
      automationSection: 'Automatización',
      automationDescription: 'Conectamos todas tus herramientas sin código',
      integrationSection: 'Integraciones',
      integrationDescription: 'Conectamos con las apps que ya usas'
    },
    audit: { 
      badge: 'Gratis · 3 minutos',
      title: 'Auditoría AI Gratuita', 
      subtitle: 'Descubre en 3 min cómo la IA puede transformar tu negocio.', 
      submit: 'Obtener diagnóstico', 
      next: 'Siguiente', 
      prev: 'Anterior',
      sending: 'Enviando...',
      steps: {
        business: 'Tipo de negocio',
        location: 'Ubicación',
        channels: 'Canales',
        problem: 'Problema',
        time: 'Tiempo',
        contact: 'Contacto'
      },
      questions: {
        businessType: '¿Qué tipo de negocio tienes?',
        location: '¿Dónde está tu negocio?',
        businessName: 'Nombre del negocio (opcional)',
        businessNamePlaceholder: 'Ej: Peluquería María',
        city: 'Ciudad / Zona *',
        cityPlaceholder: 'Ej: Madrid, Barcelona, Valencia...',
        reputationInfo: 'En la auditoría revisaremos tu reputación online',
        reputationInfoDetail: 'Analizaremos tu presencia en Google, reseñas, rating y ticket medio estimado para proponerte mejoras personalizadas.',
        channels: '¿Qué canales usas actualmente?',
        channelsHint: 'Selecciona todos los que apliquen',
        mainProblem: '¿Cuál es tu principal problema?',
        hoursPerWeek: '¿Cuántas horas semanales dedicas a atender mensajes y llamadas?',
        hoursHint: 'Incluye tiempo en teléfono, WhatsApp, redes sociales, email...',
        contactTitle: '¿Dónde te enviamos los resultados?',
        name: 'Tu nombre *',
        namePlaceholder: 'Nombre',
        email: 'Email *',
        emailPlaceholder: 'tu@email.com',
        phone: 'Teléfono (opcional)',
        phonePlaceholder: '+34 634 425 921'
      },
      verticals: {
        restaurante: 'Restaurante / Cafetería / Hostelería',
        clinica: 'Clínica (Fisio/Dental/Podología/Salud)',
        taller: 'Taller Mecánico / Neumáticos',
        peluqueria: 'Peluquería / Barbería / Estética',
        inmobiliaria: 'Inmobiliaria / Alquiler Vacacional',
        serviciosDomicilio: 'Servicios a Domicilio (limpieza, reformas...)',
        otro: 'Otro tipo de negocio'
      },
      channels: {
        telefono: 'Teléfono',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        facebook: 'Facebook',
        email: 'Email',
        web: 'Formulario web'
      },
      problems: {
        noShows: 'No-shows / Citas perdidas',
        mensajes: 'Demasiados mensajes sin responder',
        reservas: 'Dificultad para gestionar reservas',
        leads: 'Pérdida de leads / clientes potenciales',
        resenas: 'Pocas reseñas online',
        tiempo: 'Falta de tiempo para atender',
        trafico: 'Poco tráfico / visibilidad online'
      },
      results: {
        scoreTitle: 'Tu Puntuación de Automatización',
        priorityHigh: 'Prioridad Alta',
        priorityMedium: 'Prioridad Media',
        priorityLow: 'Prioridad Baja',
        recommendationsTitle: 'Recomendaciones Personalizadas',
        nextStepsTitle: '¿Qué sigue?',
        scheduleCall: 'Agendar llamada gratuita',
        scheduleCallDesc: 'Te explicamos cómo implementar estas mejoras',
        backToHome: 'Volver al inicio',
        thanks: '¡Gracias por completar la auditoría!',
        thanksSubtitle: 'Te contactaremos pronto con más información.'
      }
    },
    admin: { 
      dashboard: 'Dashboard', 
      leads: 'Leads', 
      assessments: 'Auditorías', 
      blog: 'Blog', 
      settings: 'Configuración', 
      logout: 'Cerrar sesión' 
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
      audit: 'Free Audit' 
    },
    hero: { 
      title: 'We build AI-powered websites and automations that bring clients while you sleep', 
      subtitle: 'AI agency for local businesses and SMEs: professional websites, 24/7 chatbots and automations that answer, book and follow up for you.', 
      priceTag: 'Packs from €497 + VAT · Fast delivery · Human + AI support',
      badge: 'AI Automation',
      cta1: 'Free AI Audit (3 min)', 
      cta2: 'Book a call' 
    },
    stats: {
      response: 'Response < 60s',
      responseLabel: 'Average response time',
      noShows: 'Fewer no-shows',
      noShowsLabel: 'With appointment reminders',
      bookings: 'More bookings',
      bookingsLabel: 'With automation',
      satisfaction: 'High satisfaction',
      satisfactionLabel: 'Our clients'
    },
    homeServices: {
      title: 'Custom websites, chatbots and automations',
      subtitle: 'We create websites that convert, add 24/7 chatbots, and automate bookings, reminders and reviews for your local business.',
      ribbon: '🎄 Christmas Offer: up to -20% on Web + Chatbot and Automate Your Agenda packs',
      webPresencia: {
        title: 'AI-Ready Web Presence',
        description: 'Landing or corporate website 1–3 pages for local business, mobile-optimized and ready to connect chatbots and automations.',
        price: 'From €497 + VAT'
      },
      webChatbot: {
        title: 'Web + 24/7 Chatbot',
        description: 'Website + 24/7 AI chatbot that answers FAQs, collects data and generates opportunities.',
        price: 'From €790 + VAT'
      },
      automatiza: {
        title: 'Automate Your Agenda',
        description: 'Automations for bookings, appointment reminders, follow-up and review requests.',
        price: 'From €1,290 + VAT'
      },
      mantenimiento: {
        title: 'Maintenance & Optimization',
        description: 'Website changes, continuous improvement and automation review.',
        price: 'From €49/month'
      }
    },
    howItWorks: { 
      title: 'How it works', 
      step1: { num: '01', title: 'Diagnosis', description: 'We analyze your business in 15 minutes.' }, 
      step2: { num: '02', title: 'Implementation', description: 'We set up in 48-72h.' }, 
      step3: { num: '03', title: 'Optimization', description: 'Continuous improvement guaranteed.' } 
    },
    cta: { 
      title: 'Ready to automate?', 
      subtitle: 'Start with a free audit.', 
      button: 'Request free audit' 
    },
    footer: { 
      description: 'Smart automation for local businesses.', 
      links: 'Links', 
      legal: 'Legal', 
      privacy: 'Privacy', 
      terms: 'Terms', 
      cookies: 'Cookies', 
      rights: 'All rights reserved.' 
    },
    contact: { 
      title: 'Contact', 
      heroTitle: "Let's talk about your project",
      heroSubtitle: 'We respond in less than 24h. No commitments.',
      formTitle: 'Send us a message',
      whatsapp: 'WhatsApp',
      email: 'Email',
      location: 'Location',
      locationValue: '100% Remote (Spain)',
      responseTime: 'Response time',
      responseTimeValue: '< 24 business hours',
      auditCta: 'Prefer an audit?',
      auditCtaSubtitle: 'Discover for free how AI can help you.',
      form: { 
        name: 'Name', 
        email: 'Email', 
        phone: 'Phone (optional)', 
        phonePlaceholder: '+34 634 425 921',
        message: 'Message', 
        messagePlaceholder: 'Tell us about your business and what you need...',
        submit: 'Send message', 
        sending: 'Sending...',
        success: 'Message sent! We will respond soon.', 
        error: 'Error sending message. Please try again.' 
      } 
    },
    services: {
      badge: 'Agency Packs',
      title: 'What we do for you',
      subtitle: 'HydrAI Labs creates custom websites, chatbots and automations for local businesses and SMEs. No complications. Measurable results.',
      ribbon: '🎄 Christmas Offer: up to -20% on Web + Chatbot and Automate Your Agenda packs',
      includes: 'What\'s included:',
      deliverables: 'Deliverables',
      implementTime: 'Implementation time:',
      expectedKpis: 'Expected KPIs',
      requestService: 'Request this service',
      ctaTitle: "Don't know where to start?",
      ctaSubtitle: 'Take our free audit and we\'ll tell you which services you need.',
      ctaButton: 'Free AI Audit (3 min)',
      webPresencia: {
        title: 'AI-Ready Web Presence',
        subtitle: 'Landing or corporate website',
        description: 'Corporate website or landing page optimized for mobile, ready to integrate chatbots and automations. Ideal for restaurants, clinics, workshops, real estate...',
        features: [
          '1–3 key sections (home, services, contact)',
          'Contact form or direct WhatsApp button',
          'Basic local SEO setup (title, description, map, etc.)',
          'Responsive modern design',
          'Hosting and domain not included (we advise you)'
        ],
        deliverables: ['Production-ready website', 'Basic admin panel', 'User guide'],
        time: '5-7 days',
        price: 'From €497 + VAT',
        kpis: ['Professional online presence', 'Leads captured 24/7', 'Base for future automations']
      },
      webChatbot: {
        title: 'Web + 24/7 Chatbot',
        subtitle: 'Your virtual assistant always available',
        description: 'Your website + a virtual assistant that responds 24/7, collects data and guides clients to booking or inquiry.',
        features: [
          'AI chatbot trained with your business info',
          'Available on web (widget) and ready for WhatsApp/Social',
          'Quick lookup of hours, services, estimated prices',
          'Automatic lead capture',
          'Smart handoff to human when needed'
        ],
        deliverables: ['Complete website', 'Configured and trained chatbot', 'Conversations dashboard'],
        time: '7-10 days',
        price: 'From €790 + VAT',
        kpis: ['Response < 30s 24/7', '-70% unanswered messages', '+40% lead conversion']
      },
      automatiza: {
        title: 'Automate Your Agenda',
        subtitle: 'Bookings, reminders and reviews on autopilot',
        description: 'Automations that connect form, chatbot, calendar, email and WhatsApp so bookings manage themselves.',
        features: [
          'Automatic confirmations and reminders (WhatsApp/Email)',
          'Anti no-show messages',
          'Request reviews at the right time',
          'Google Calendar integration or similar',
          'Automated post-service follow-up'
        ],
        deliverables: ['Active booking system', 'Configured automation flows', 'Metrics dashboard'],
        time: '10-14 days',
        price: 'From €1,290 + VAT',
        kpis: ['-80% no-shows', '+300% reviews/month', '100% automatic management']
      },
      reputacion: {
        title: 'Reputation on Autopilot',
        subtitle: 'More 5-star reviews effortlessly',
        description: 'Automate review requests at the perfect time and respond to all reviews intelligently.',
        features: [
          'Automatic post-service request',
          'Prior satisfaction filter',
          'AI-suggested responses',
          'Reminders to satisfied customers',
          'Negative review alerts'
        ],
        deliverables: ['Active request flows', 'Response templates', 'Reputation dashboard'],
        time: '3-5 days',
        price: 'Contact us',
        kpis: ['+300% new reviews/month', '4.8+ average rating', '100% reviews responded']
      },
      leadCapture: {
        title: 'Lead Capture Without Website',
        subtitle: 'For businesses without a website yet',
        description: 'Service for businesses that don\'t have a website yet: chatbot + simple landings + minimal automations to start capturing leads.',
        features: [
          'Capture bot on WhatsApp/Instagram/Facebook',
          'Simple capture landing page',
          'Basic CRM integration',
          'Automatic lead tagging',
          'Automated follow-up'
        ],
        deliverables: ['Active capture flows', 'Basic CRM configured', 'Minimal automations'],
        time: '5-7 days',
        price: 'Contact us',
        kpis: ['+50% leads captured', '0 leads lost', '100% automatic follow-up']
      },
      mantenimiento: {
        title: 'Maintenance & Optimization',
        subtitle: 'Your website and automations always up to date',
        description: 'Website changes, continuous improvement and automation review so everything works perfectly month after month.',
        features: [
          'Minor content and design changes',
          'Monthly automation review',
          'Chatbot optimization based on feedback',
          'Priority technical support',
          'Monthly performance reports'
        ],
        deliverables: ['Ongoing support', 'Monthly reports', 'Incremental improvements'],
        time: 'Monthly',
        price: 'From €49/month',
        kpis: ['Always updated website', 'Optimized automations', 'Support when you need it']
      }
    },
    pricing: { 
      badge: 'Transparent pricing',
      title: 'Clear packs, no fine print', 
      subtitle: 'Choose the pack that best fits your business. Fixed prices, fast delivery.', 
      ribbon: '🎄 Christmas Offer: up to -20% on Web + Chatbot and Automate Your Agenda packs',
      popular: 'Most popular',
      oneTimePayment: 'one-time payment',
      monthly: 'month',
      request: 'Request',
      monthlyPlansTitle: 'Monthly plans',
      talkToHuman: 'Need something more personalized?',
      talkToHumanButton: 'Talk to a human',
      faqTitle: 'Frequently asked questions',
      ctaTitle: 'Still have doubts?',
      ctaSubtitle: 'Take our free audit and we\'ll tell you which pack you need.',
      ctaButton: 'Free AI Audit',
      packs: {
        webPresencia: {
          name: 'AI-Ready Web Presence',
          description: 'Your professional website ready to connect chatbots and automations',
          features: [
            'Corporate website 1–3 pages',
            'Responsive modern design',
            'Contact form / WhatsApp',
            'Basic local SEO',
            'Ready for future chatbot'
          ]
        },
        webChatbot: {
          name: 'Web + 24/7 Chatbot',
          description: 'Your website + virtual assistant that responds, captures leads and guides clients',
          features: [
            'Everything in Web Presence +',
            'Trained 24/7 AI chatbot',
            'Web widget + WhatsApp ready',
            'Automatic lead capture',
            'Conversations dashboard',
            '30 days support included'
          ]
        },
        automatiza: {
          name: 'Automate Your Agenda',
          description: 'Complete booking, reminder and review request system',
          features: [
            'Everything in Web + Chatbot +',
            'Online booking system',
            'Automatic reminders (WhatsApp/Email)',
            'Anti no-show messages',
            'Post-service review request',
            'Google Calendar integration',
            'Metrics dashboard'
          ]
        }
      },
      monthlyPlans: {
        mantenimiento: {
          name: 'Maintenance Plan',
          description: 'Minor changes, technical support and monthly automation review.'
        },
        crecimiento: {
          name: 'Growth Plan',
          description: 'Everything in Maintenance + chatbot optimization, conversion improvements and detailed reports.'
        }
      },
      faqs: [
        {
          q: 'What\'s included in the price?',
          a: 'Everything listed in each pack. No hidden costs. Hosting and domain not included (we advise you to choose the best).'
        },
        {
          q: 'How long does delivery take?',
          a: 'Web Presence: 5-7 days. Web + Chatbot: 7-10 days. Automate Your Agenda: 10-14 days. Depends on how fast you send content.'
        },
        {
          q: 'Can I upgrade my pack later?',
          a: 'Yes, you can start with Web Presence and add chatbot or automations whenever you want. You only pay the difference.'
        },
        {
          q: 'What happens after delivery?',
          a: 'You have 30 days of support included. After that you can hire a monthly plan or request specific adjustments.'
        },
        {
          q: 'Do you offer discounts?',
          a: 'Yes, we have occasional offers and discounts for annual payment on monthly plans. Ask us.'
        }
      ]
    },
    industries: {
      badge: 'AI Automations',
      title: 'AI Automations to capture, convert and operate without friction',
      subtitle: 'Leads → nurturing → appointments → follow-up → reporting → 24/7 execution',
      sectorTitle: 'Templates by Sector',
      sectorSubtitle: 'Examples of automations adapted to specific industries.',
      apply: 'Apply template',
      packs: 'Recommended packs:',
      packWebPresencia: 'Web Presence',
      packWebChatbot: 'Web + Chatbot',
      packAutomatiza: 'Automate Your Agenda'
    },
    cases: { 
      badge: 'Success Cases',
      title: 'Projects that demonstrate results', 
      subtitle: 'Examples of what HydrAI Labs can do for your business: real websites, chatbots and automations.',
      viewDemo: 'View demo',
      comingSoon: 'View demo (coming soon)',
      ctaTitle: 'Have a project in mind?',
      ctaSubtitle: 'Tell us your idea and we\'ll propose the best solution for your business.',
      ctaButton: "Let's talk",
      testimonialsTitle: 'What our clients say',
      testimonialsSubtitle: 'Real stories from businesses already using websites, chatbots and automations built by HydrAI Labs.'
    },
    resources: {
      badge: 'Tools',
      title: 'Tools and Partners',
      subtitle: 'The technologies we use to build your solutions',
      description: 'At HydrAI Labs we rely on the best tools in the market to create high-quality websites, chatbots and automations. Here are some of the technologies we use:',
      aiSection: 'Artificial Intelligence',
      aiDescription: 'State-of-the-art AI models for intelligent chatbots',
      devSection: 'Development & Hosting',
      devDescription: 'Modern platforms for fast and scalable websites',
      automationSection: 'Automation',
      automationDescription: 'We connect all your tools without code',
      integrationSection: 'Integrations',
      integrationDescription: 'We connect with the apps you already use'
    },
    audit: { 
      badge: 'Free · 3 minutes',
      title: 'Free AI Audit', 
      subtitle: 'Discover in 3 min how AI can transform your business.', 
      submit: 'Get diagnosis', 
      next: 'Next', 
      prev: 'Previous',
      sending: 'Sending...',
      steps: {
        business: 'Business type',
        location: 'Location',
        channels: 'Channels',
        problem: 'Problem',
        time: 'Time',
        contact: 'Contact'
      },
      questions: {
        businessType: 'What type of business do you have?',
        location: 'Where is your business located?',
        businessName: 'Business name (optional)',
        businessNamePlaceholder: 'Ex: Mary\'s Hair Salon',
        city: 'City / Area *',
        cityPlaceholder: 'Ex: Madrid, Barcelona, Valencia...',
        reputationInfo: 'We will review your online reputation in the audit',
        reputationInfoDetail: 'We will analyze your Google presence, reviews, rating and estimated average ticket to suggest personalized improvements.',
        channels: 'What channels do you currently use?',
        channelsHint: 'Select all that apply',
        mainProblem: 'What is your main problem?',
        hoursPerWeek: 'How many hours per week do you spend answering messages and calls?',
        hoursHint: 'Include time on phone, WhatsApp, social media, email...',
        contactTitle: 'Where should we send the results?',
        name: 'Your name *',
        namePlaceholder: 'Name',
        email: 'Email *',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone (optional)',
        phonePlaceholder: '+34 634 425 921'
      },
      verticals: {
        restaurante: 'Restaurant / Cafe / Hospitality',
        clinica: 'Clinic (Physio/Dental/Podiatry/Health)',
        taller: 'Mechanic Shop / Tires',
        peluqueria: 'Hair Salon / Barber / Aesthetics',
        inmobiliaria: 'Real Estate / Vacation Rental',
        serviciosDomicilio: 'Home Services (cleaning, renovations...)',
        otro: 'Other type of business'
      },
      channels: {
        telefono: 'Phone',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
        facebook: 'Facebook',
        email: 'Email',
        web: 'Web form'
      },
      problems: {
        noShows: 'No-shows / Missed appointments',
        mensajes: 'Too many unanswered messages',
        reservas: 'Difficulty managing bookings',
        leads: 'Loss of leads / potential clients',
        resenas: 'Few online reviews',
        tiempo: 'Lack of time to attend',
        trafico: 'Low traffic / online visibility'
      },
      results: {
        scoreTitle: 'Your Automation Score',
        priorityHigh: 'High Priority',
        priorityMedium: 'Medium Priority',
        priorityLow: 'Low Priority',
        recommendationsTitle: 'Personalized Recommendations',
        nextStepsTitle: "What's next?",
        scheduleCall: 'Schedule free call',
        scheduleCallDesc: 'We explain how to implement these improvements',
        backToHome: 'Back to home',
        thanks: 'Thank you for completing the audit!',
        thanksSubtitle: 'We will contact you soon with more information.'
      }
    },
    admin: { 
      dashboard: 'Dashboard', 
      leads: 'Leads', 
      assessments: 'Audits', 
      blog: 'Blog', 
      settings: 'Settings', 
      logout: 'Logout' 
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
};

export function useTranslation() {
  const { language, setLanguage } = useI18n();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
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
    let result = translations[language];
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
    let result = translations[language];
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
