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
    brand: 'HydrAI Services',
    nav: { home: 'Inicio', services: 'Servicios', industries: 'Industrias', pricing: 'Precios', cases: 'Casos', resources: 'Recursos', contact: 'Contacto', login: 'Admin', audit: 'Auditoría Gratis' },
    hero: { 
      title: 'Convertimos reseñas en reservas usando IA', 
      subtitle: 'Sin apps raras. Sin líos. Resultados medibles.', 
      cta1: 'Auditoría AI gratis (3 min)', 
      cta2: 'Reservar llamada' 
    },
    stats: {
      response: 'Respuesta < 60s',
      noShows: 'Menos no-shows',
      bookings: 'Más reservas',
      satisfaction: 'Alta satisfacción'
    },
    services: { 
      title: 'Soluciones de IA para negocios locales', 
      subtitle: 'Automatizamos lo que te quita tiempo.',
      web: {
        title: 'Creación de Páginas Web',
        subtitle: 'Web corporativa + Landing de conversión',
        description: 'Diseñamos y desarrollamos páginas web optimizadas para conversión. SEO incluido, integración con CRM y analítica avanzada.',
        features: [
          'Diseño responsive y moderno',
          'SEO técnico y on-page optimizado',
          'Integración con CRM y leads',
          'Analítica con Google Analytics 4',
          'Blog CMS incluido (opcional)',
          'Velocidad de carga optimizada'
        ],
        deliverables: ['Web lista para producción', 'Panel de administración', 'Documentación técnica'],
        time: '5-10 días',
        kpis: ['Tiempo carga < 2s', '+30% conversión', 'Leads capturados 24/7']
      }
    },
    howItWorks: { title: '¿Cómo funciona?', step1: { title: 'Diagnóstico', description: 'Analizamos tu negocio en 15 minutos.' }, step2: { title: 'Implementación', description: 'Configuramos en 48-72h.' }, step3: { title: 'Optimización', description: 'Mejora continua garantizada.' } },
    forWho: { title: '¿Para quién es?', subtitle: 'Negocios locales con volumen de mensajes.' },
    faq: { title: 'Preguntas frecuentes' },
    cta: { title: '¿Listo para automatizar?', subtitle: 'Empieza con una auditoría gratuita.', button: 'Solicitar auditoría gratis' },
    footer: { description: 'Automatización inteligente para negocios locales.', links: 'Enlaces', legal: 'Legal', privacy: 'Privacidad', terms: 'Términos', cookies: 'Cookies', rights: 'Todos los derechos reservados.' },
    contact: { title: 'Contacto', subtitle: 'Respondemos en menos de 24h.', form: { name: 'Nombre', email: 'Email', phone: 'Teléfono', message: 'Mensaje', submit: 'Enviar mensaje', success: '¡Mensaje enviado!', error: 'Error al enviar.' } },
    pricing: { 
      title: 'Precios transparentes', 
      subtitle: 'Sin letra pequeña.', 
      popular: 'Más popular',
      webAddon: 'Add-on: Web corporativa desde 997€'
    },
    audit: { title: 'Auditoría AI Gratuita', subtitle: 'Descubre en 3 min cómo la IA puede transformar tu negocio.', submit: 'Obtener diagnóstico', next: 'Siguiente', prev: 'Anterior' },
    industries: { title: 'Soluciones por industria', subtitle: 'Plantillas optimizadas.', apply: 'Aplicar plantilla' },
    cases: { title: 'Lo que sabemos construir', subtitle: 'Proyectos que demuestran nuestra capacidad.' },
    portfolio: {
      title: 'Nuestros Productos',
      subtitle: 'Proyectos propios y colaboraciones',
      viewProject: 'Ver proyecto',
      comingSoon: 'Próximamente'
    },
    blog: { title: 'Recursos', subtitle: 'Artículos y guías.', readMore: 'Leer más' },
    admin: { dashboard: 'Dashboard', leads: 'Leads', assessments: 'Auditorías', blog: 'Blog', settings: 'Configuración', logout: 'Cerrar sesión' },
    common: { loading: 'Cargando...', error: 'Error', success: 'Éxito', save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar', add: 'Añadir', search: 'Buscar', back: 'Volver' },
  },
  en: {
    brand: 'HydrAI Services',
    nav: { home: 'Home', services: 'Services', industries: 'Industries', pricing: 'Pricing', cases: 'Cases', resources: 'Resources', contact: 'Contact', login: 'Admin', audit: 'Free Audit' },
    hero: { 
      title: 'We turn reviews into bookings using AI', 
      subtitle: 'No weird apps. No hassle. Measurable results.', 
      cta1: 'Free AI Audit (3 min)', 
      cta2: 'Book a call' 
    },
    stats: {
      response: 'Response < 60s',
      noShows: 'Fewer no-shows',
      bookings: 'More bookings',
      satisfaction: 'High satisfaction'
    },
    services: { 
      title: 'AI Solutions for Local Businesses', 
      subtitle: 'We automate what takes your time.',
      web: {
        title: 'Website Creation',
        subtitle: 'Corporate site + Conversion landing',
        description: 'We design and develop conversion-optimized websites. SEO included, CRM integration, and advanced analytics.',
        features: [
          'Responsive modern design',
          'Technical and on-page SEO',
          'CRM and leads integration',
          'Google Analytics 4 tracking',
          'Blog CMS included (optional)',
          'Optimized load speed'
        ],
        deliverables: ['Production-ready website', 'Admin panel', 'Technical documentation'],
        time: '5-10 days',
        kpis: ['Load time < 2s', '+30% conversion', 'Leads captured 24/7']
      }
    },
    howItWorks: { title: 'How it works', step1: { title: 'Diagnosis', description: 'We analyze your business in 15 minutes.' }, step2: { title: 'Implementation', description: 'We set up in 48-72h.' }, step3: { title: 'Optimization', description: 'Continuous improvement.' } },
    forWho: { title: 'Who is it for?', subtitle: 'Local businesses with message volume.' },
    faq: { title: 'FAQ' },
    cta: { title: 'Ready to automate?', subtitle: 'Start with a free audit.', button: 'Request free audit' },
    footer: { description: 'Smart automation for local businesses.', links: 'Links', legal: 'Legal', privacy: 'Privacy', terms: 'Terms', cookies: 'Cookies', rights: 'All rights reserved.' },
    contact: { title: 'Contact', subtitle: 'We respond in less than 24h.', form: { name: 'Name', email: 'Email', phone: 'Phone', message: 'Message', submit: 'Send message', success: 'Message sent!', error: 'Error sending.' } },
    pricing: { 
      title: 'Transparent pricing', 
      subtitle: 'No fine print.', 
      popular: 'Most popular',
      webAddon: 'Add-on: Corporate website from €997'
    },
    audit: { title: 'Free AI Audit', subtitle: 'Discover in 3 min how AI can transform your business.', submit: 'Get diagnosis', next: 'Next', prev: 'Previous' },
    industries: { title: 'Solutions by industry', subtitle: 'Optimized templates.', apply: 'Apply template' },
    cases: { title: 'What we can build', subtitle: 'Projects that demonstrate our capability.' },
    portfolio: {
      title: 'Our Products',
      subtitle: 'Own projects and collaborations',
      viewProject: 'View project',
      comingSoon: 'Coming soon'
    },
    blog: { title: 'Resources', subtitle: 'Articles and guides.', readMore: 'Read more' },
    admin: { dashboard: 'Dashboard', leads: 'Leads', assessments: 'Audits', blog: 'Blog', settings: 'Settings', logout: 'Logout' },
    common: { loading: 'Loading...', error: 'Error', success: 'Success', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', add: 'Add', search: 'Search', back: 'Back' },
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
  
  return { t, language, setLanguage };
}
