export type ProjectCategory =
  | "Inteligencia conversacional"
  | "Hostelería"
  | "Inmobiliaria y reformas"
  | "Belleza y salud"
  | "Deporte"
  | "Comercio y proyectos personales";

export type ProjectStatus = "Producto propio" | "Implementación web" | "Demo funcional" | "Concepto demostrativo";

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  capabilities: string[];
  href: string;
  external: boolean;
}

export const PROJECT_CATEGORIES: Array<"Todos" | ProjectCategory> = [
  "Todos",
  "Inteligencia conversacional",
  "Hostelería",
  "Inmobiliaria y reformas",
  "Belleza y salud",
  "Deporte",
  "Comercio y proyectos personales",
];

export const PROJECT_SHOWCASE: ProjectShowcaseItem[] = [
  {
    id: "vozra",
    title: "Vozra",
    category: "Inteligencia conversacional",
    status: "Producto propio",
    description: "Plataforma de inteligencia conversacional para atención, reservas, pedidos, memoria y lógica operacional.",
    capabilities: ["Agentes de voz", "Reservas y pedidos", "Reglas del negocio"],
    href: "/arquitectura",
    external: false,
  },
  {
    id: "vozra-pid",
    title: "Vozra PID",
    category: "Inteligencia conversacional",
    status: "Producto propio",
    description: "Demostración en vivo de Sarah para probar pedidos inteligentes directos desde el navegador.",
    capabilities: ["Conversación por voz", "Pedidos estructurados", "Solicitud de llamada"],
    href: "https://sarah-speaks-direct.lovable.app",
    external: true,
  },
  {
    id: "la-locanda",
    title: "La Locanda",
    category: "Hostelería",
    status: "Implementación web",
    description: "Experiencia digital para carta, personalización de productos y pedidos de una pizzería.",
    capabilities: ["Carta digital", "Personalización", "Pedidos online"],
    href: "https://locanda-connect.lovable.app",
    external: true,
  },
  {
    id: "la-cruz-tapas",
    title: "La Cruz Tapas",
    category: "Hostelería",
    status: "Demo funcional",
    description: "Propuesta digital para reservas, carta gastronómica, maridajes y pedidos desde mesa.",
    capabilities: ["Reservas", "Carta digital", "Pedidos desde mesa"],
    href: "https://cruzatapas-digital-chic.lovable.app/",
    external: true,
  },
  {
    id: "village-heritage-reserve",
    title: "The Village La Heredia",
    category: "Hostelería",
    status: "Demo funcional",
    description: "Experiencia web para un bistró y wine bar con presentación, reservas y propuesta gastronómica.",
    capabilities: ["Presentación de marca", "Reservas", "Experiencia gastronómica"],
    href: "https://village-heritage-reserve.lovable.app",
    external: true,
  },
  {
    id: "tu-hogar-21",
    title: "Tu Hogar 21",
    category: "Inmobiliaria y reformas",
    status: "Demo funcional",
    description: "Portal inmobiliario con búsqueda avanzada, captación y herramientas de cualificación.",
    capabilities: ["Buscador de propiedades", "Filtros", "Captación de contactos"],
    href: "https://tu-hogar-21-nextgen.lovable.app",
    external: true,
  },
  {
    id: "obra-smart-ai",
    title: "Obra Smart AI",
    category: "Inmobiliaria y reformas",
    status: "Demo funcional",
    description: "Solución web para empresas de reformas con captación, presentación de servicios y presupuestos.",
    capabilities: ["Captación", "Servicios", "Solicitud de presupuesto"],
    href: "https://obra-smart-ai.lovable.app",
    external: true,
  },
  {
    id: "body-harmony-leads",
    title: "Vitality Hub",
    category: "Belleza y salud",
    status: "Demo funcional",
    description: "Web de captación y reservas para bienestar con chatbot especializado y enfoque responsable.",
    capabilities: ["Servicios", "Reservas", "Chatbot informativo"],
    href: "https://body-harmony-leads.lovable.app",
    external: true,
  },
  {
    id: "radiant-quest-chat",
    title: "Radiant Quest",
    category: "Belleza y salud",
    status: "Demo funcional",
    description: "Experiencia digital para una clínica con información, citas y atención conversacional.",
    capabilities: ["Citas", "Información de servicios", "Chatbot"],
    href: "https://radiant-quest-chat.lovable.app",
    external: true,
  },
  {
    id: "barrio-beauty-boost",
    title: "Barrio Beauty",
    category: "Belleza y salud",
    status: "Demo funcional",
    description: "Propuesta web para belleza local orientada a visibilidad, servicios y reservas.",
    capabilities: ["Servicios", "Reservas", "Captación local"],
    href: "https://barrio-beauty-boost.lovable.app",
    external: true,
  },
  {
    id: "glow-reserve-pro",
    title: "Glow Reserve Pro",
    category: "Belleza y salud",
    status: "Demo funcional",
    description: "Sistema visual de reservas para negocios de belleza y servicios profesionales.",
    capabilities: ["Calendario", "Reservas", "Confirmaciones"],
    href: "https://glow-reserve-pro.lovable.app",
    external: true,
  },
  {
    id: "crossfit-connect-pro",
    title: "CrossFit Connect Pro",
    category: "Deporte",
    status: "Demo funcional",
    description: "Plataforma para un box de CrossFit con clases, miembros y seguimiento de actividad.",
    capabilities: ["Reserva de clases", "Membresías", "Seguimiento"],
    href: "https://crossfit-connect-pro.lovable.app/",
    external: true,
  },
  {
    id: "atelier-creations",
    title: "Atelier Creations Collective",
    category: "Comercio y proyectos personales",
    status: "Concepto demostrativo",
    description: "Tienda digital para productos artesanales con catálogo, personalización y pedidos.",
    capabilities: ["E-commerce", "Catálogo", "Personalización"],
    href: "https://atelier-creations-collective.lovable.app",
    external: true,
  },
  {
    id: "brisa-color-sell",
    title: "Brisa Color Sell",
    category: "Comercio y proyectos personales",
    status: "Concepto demostrativo",
    description: "Proyecto visual de comercio online orientado a producto, marca y conversión.",
    capabilities: ["Catálogo", "Marca", "Venta online"],
    href: "https://brisa-color-sell.lovable.app",
    external: true,
  },
];
