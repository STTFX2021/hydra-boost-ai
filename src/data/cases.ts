import {
  Flame,
  UtensilsCrossed,
  Stethoscope,
  Car,
  Hotel,
  BarChart3,
  Home,
  Scissors,
  Dumbbell,
  Pizza,
  Wine,
  Heart,
} from "lucide-react";
import atelierEmbers from "@/assets/cases/atelier-embers.jpg";
import chicBookings from "@/assets/cases/chic-bookings.jpg";
import smileStudio from "@/assets/cases/smile-studio.jpg";
import autoquoteHub from "@/assets/cases/autoquote-hub.jpg";
import solReservas from "@/assets/cases/sol-reservas.jpg";
import insightNarrator from "@/assets/cases/insight-narrator.jpg";
import tuHogarMadrid from "@/assets/cases/tu-hogar-madrid.jpg";
import razorGrace from "@/assets/cases/razor-grace.jpg";
import crossfitConnect from "@/assets/cases/crossfit-connect.jpg";
import locandaConnect from "@/assets/cases/locanda-connect.jpg";
import cruzaTapas from "@/assets/cases/cruza-tapas.jpg";
import innerSunYoga from "@/assets/cases/inner-sun-yoga.jpg";

export interface Case {
  id: string;
  title: string;
  type: {
    es: string;
    en: string;
  };
  icon: typeof Flame;
  description: {
    es: string;
    en: string;
  };
  tags: string[];
  color: string;
  imageUrl: string;
  imageAlt: {
    es: string;
    en: string;
  };
  demoUrl: string;
  features?: {
    es: string[];
    en: string[];
  };
}

export const cases: Case[] = [
  // NEW LOVABLE PROJECTS
  {
    id: "razor-grace",
    title: "Razor Grace Barbería",
    type: {
      es: "Barbería Premium con Reservas Online",
      en: "Premium Barbershop with Online Booking",
    },
    icon: Scissors,
    description: {
      es: "Sistema completo de reservas con selección de servicios, barberos y horarios. Recordatorios automáticos y gestión de clientes.",
      en: "Complete booking system with service, barber and time slot selection. Automatic reminders and client management.",
    },
    tags: ["#reservas", "#whatsapp", "#automatizaciones"],
    color: "primary",
    imageUrl: razorGrace,
    imageAlt: {
      es: "Razor Grace Barbería – reservas online",
      en: "Razor Grace Barbershop – online booking",
    },
    demoUrl: "https://razor-grace.lovable.app",
    features: {
      es: ["Reservas online 24/7", "Recordatorios WhatsApp anti no-show", "Gestión de turnos y barberos"],
      en: ["24/7 online booking", "WhatsApp anti no-show reminders", "Shift and barber management"],
    },
  },
  {
    id: "crossfit-connect",
    title: "CrossFit Connect Pro",
    type: {
      es: "Gimnasio y Box de CrossFit",
      en: "CrossFit Gym & Box",
    },
    icon: Dumbbell,
    description: {
      es: "Plataforma de gestión para gimnasios con reserva de clases, seguimiento de progreso y comunidad de miembros.",
      en: "Gym management platform with class booking, progress tracking and member community.",
    },
    tags: ["#fitness", "#reservas", "#comunidad"],
    color: "secondary",
    imageUrl: crossfitConnect,
    imageAlt: {
      es: "CrossFit Connect Pro – gestión de gimnasio",
      en: "CrossFit Connect Pro – gym management",
    },
    demoUrl: "https://crossfit-connect-pro.lovable.app",
    features: {
      es: ["Reserva de clases en tiempo real", "Tracking de WODs y PRs", "Gestión de membresías"],
      en: ["Real-time class booking", "WOD and PR tracking", "Membership management"],
    },
  },
  {
    id: "locanda-connect",
    title: "Locanda Pizzería",
    type: {
      es: "Pizzería con Pedidos Online",
      en: "Pizzeria with Online Orders",
    },
    icon: Pizza,
    description: {
      es: "Sistema de pedidos online con carta digital, personalización de pizzas y seguimiento de pedidos en tiempo real.",
      en: "Online ordering system with digital menu, pizza customization and real-time order tracking.",
    },
    tags: ["#pedidos", "#delivery", "#automatizaciones"],
    color: "accent",
    imageUrl: locandaConnect,
    imageAlt: {
      es: "Locanda Pizzería – pedidos online",
      en: "Locanda Pizzeria – online orders",
    },
    demoUrl: "https://locanda-connect.lovable.app",
    features: {
      es: ["Carta digital interactiva", "Personalización de pedidos", "Tracking de delivery en vivo"],
      en: ["Interactive digital menu", "Order customization", "Live delivery tracking"],
    },
  },
  {
    id: "cruza-tapas",
    title: "Cruza Tapas Digital",
    type: {
      es: "Bar de Tapas con Reservas y Pedidos",
      en: "Tapas Bar with Reservations & Orders",
    },
    icon: Wine,
    description: {
      es: "Experiencia gastronómica digital con reservas, carta de tapas y maridajes, y sistema de pedidos desde mesa.",
      en: "Digital dining experience with reservations, tapas & pairing menu, and table ordering system.",
    },
    tags: ["#hostelería", "#reservas", "#pedidos"],
    color: "primary",
    imageUrl: cruzaTapas,
    imageAlt: {
      es: "Cruza Tapas Digital – bar de tapas",
      en: "Cruza Tapas Digital – tapas bar",
    },
    demoUrl: "https://cruzatapas-digital-chic.lovable.app",
    features: {
      es: ["Reservas con selección de zona", "Carta con maridajes sugeridos", "Pedidos desde QR en mesa"],
      en: ["Reservations with zone selection", "Menu with suggested pairings", "QR table ordering"],
    },
  },
  {
    id: "inner-sun-yoga",
    title: "Inner Sun Yoga Studio",
    type: {
      es: "Estudio de Yoga y Bienestar",
      en: "Yoga & Wellness Studio",
    },
    icon: Heart,
    description: {
      es: "Plataforma de reserva de clases de yoga con calendario, instructores y planes de membresía flexibles.",
      en: "Yoga class booking platform with calendar, instructors and flexible membership plans.",
    },
    tags: ["#wellness", "#reservas", "#membresías"],
    color: "secondary",
    imageUrl: innerSunYoga,
    imageAlt: {
      es: "Inner Sun Yoga – estudio de yoga",
      en: "Inner Sun Yoga – yoga studio",
    },
    demoUrl: "https://inner-sun-web.lovable.app",
    features: {
      es: ["Calendario de clases en vivo", "Perfiles de instructores", "Packs y membresías flexibles"],
      en: ["Live class calendar", "Instructor profiles", "Flexible packs & memberships"],
    },
  },
  // EXISTING PROJECTS
  {
    id: "atelier-embers",
    title: "Atelier of Embers",
    type: {
      es: "Tienda de velas artesanales y artesanía",
      en: "Artisan candle shop and crafts",
    },
    icon: Flame,
    description: {
      es: "Web e-commerce con catálogo de productos, integración de pagos y sistema de pedidos automatizado. Chatbot para consultas sobre personalización.",
      en: "E-commerce website with product catalog, payment integration and automated order system. Chatbot for customization queries.",
    },
    tags: ["#web", "#chatbot", "#ecommerce"],
    color: "primary",
    imageUrl: atelierEmbers,
    imageAlt: {
      es: "Atelier of Embers – tienda de velas artesanales",
      en: "Atelier of Embers – artisan candle shop",
    },
    demoUrl: "https://atelier-creations-collective.lovable.app",
    features: {
      es: ["Catálogo de productos", "Pagos integrados", "Chatbot de atención"],
      en: ["Product catalog", "Integrated payments", "Support chatbot"],
    },
  },
  {
    id: "chic-bookings",
    title: "Chic Bookings",
    type: {
      es: "Sistema de reservas para restaurante / salón",
      en: "Restaurant / salon booking system",
    },
    icon: UtensilsCrossed,
    description: {
      es: "Sistema elegante de reservas online con confirmaciones automáticas, gestión de mesas y recordatorios anti no-show por WhatsApp.",
      en: "Elegant online booking system with automatic confirmations, table management and WhatsApp anti no-show reminders.",
    },
    tags: ["#web", "#automatizaciones", "#reservas"],
    color: "secondary",
    imageUrl: chicBookings,
    imageAlt: {
      es: "Chic Bookings – sistema de reservas elegante",
      en: "Chic Bookings – elegant booking system",
    },
    demoUrl: "https://glow-reserve-pro.lovable.app",
    features: {
      es: ["Reservas online 24/7", "Confirmaciones automáticas", "Recordatorios WhatsApp"],
      en: ["24/7 online booking", "Automatic confirmations", "WhatsApp reminders"],
    },
  },
  {
    id: "smile-studio",
    title: "Smile Studio Hub",
    type: {
      es: "Clínica dental moderna",
      en: "Modern dental clinic",
    },
    icon: Stethoscope,
    description: {
      es: "Web profesional con sistema de citas, chatbot para resolver dudas frecuentes sobre tratamientos y automatización de recordatorios.",
      en: "Professional website with appointment system, chatbot for treatment FAQs and automated reminders.",
    },
    tags: ["#web", "#chatbot", "#automatizaciones"],
    color: "accent",
    imageUrl: smileStudio,
    imageAlt: {
      es: "Smile Studio Hub – clínica dental moderna",
      en: "Smile Studio Hub – modern dental clinic",
    },
    demoUrl: "https://radiant-quest-chat.lovable.app",
    features: {
      es: ["Sistema de citas online", "Chatbot FAQ", "Recordatorios automáticos"],
      en: ["Online appointment system", "FAQ chatbot", "Automatic reminders"],
    },
  },
  {
    id: "autoquote-hub",
    title: "AutoQuote Hub",
    type: {
      es: "Taller mecánico con presupuestos rápidos",
      en: "Mechanic shop with quick quotes",
    },
    icon: Car,
    description: {
      es: "Landing de captación con formulario inteligente que genera presupuestos orientativos automáticos según el tipo de servicio y vehículo.",
      en: "Lead capture landing with smart form that generates automatic estimates based on service type and vehicle.",
    },
    tags: ["#web", "#automatizaciones", "#leads"],
    color: "primary",
    imageUrl: autoquoteHub,
    imageAlt: {
      es: "AutoQuote Hub – taller mecánico online",
      en: "AutoQuote Hub – online mechanic shop",
    },
    demoUrl: "https://pro-auto-care.lovable.app",
    features: {
      es: ["Presupuestos automáticos", "Formulario inteligente", "Captación de leads"],
      en: ["Automatic quotes", "Smart form", "Lead capture"],
    },
  },
  {
    id: "sol-reservas",
    title: "Sol Reservas IA",
    type: {
      es: "Motor de reservas para hoteles",
      en: "Hotel booking engine",
    },
    icon: Hotel,
    description: {
      es: "Sistema de reservas inteligente con chatbot multiidioma, check-in automático y seguimiento post-estancia para reseñas.",
      en: "Smart booking system with multilingual chatbot, automatic check-in and post-stay review follow-up.",
    },
    tags: ["#chatbot", "#automatizaciones", "#reservas"],
    color: "secondary",
    imageUrl: solReservas,
    imageAlt: {
      es: "Sol Reservas IA – motor de reservas hoteleras",
      en: "Sol Reservas IA – hotel booking engine",
    },
    demoUrl: "https://costa-booker-bot.lovable.app",
    features: {
      es: ["Chatbot multiidioma", "Check-in automático", "Solicitud de reseñas"],
      en: ["Multilingual chatbot", "Automatic check-in", "Review requests"],
    },
  },
  {
    id: "insight-narrator",
    title: "KPI Narrator",
    type: {
      es: "Interpretación de dashboards con IA",
      en: "AI dashboard interpretation",
    },
    icon: BarChart3,
    description: {
      es: "Capa de IA que analiza los datos de negocio y genera informes narrativos automáticos con recomendaciones accionables.",
      en: "AI layer that analyzes business data and generates automatic narrative reports with actionable recommendations.",
    },
    tags: ["#automatizaciones", "#ia", "#analytics"],
    color: "accent",
    imageUrl: insightNarrator,
    imageAlt: {
      es: "KPI Narrator – análisis de dashboards con IA",
      en: "KPI Narrator – AI dashboard analysis",
    },
    demoUrl: "https://causal-narrate.lovable.app",
    features: {
      es: ["Análisis automático de KPIs", "Informes narrativos", "Recomendaciones IA"],
      en: ["Automatic KPI analysis", "Narrative reports", "AI recommendations"],
    },
  },
  {
    id: "tu-hogar-madrid",
    title: "Tu Hogar Madrid",
    type: {
      es: "Portal inmobiliario ",
      en: "Real estate portal ",
    },
    icon: Home,
    description: {
      es: "Web de captación con filtros avanzados, buscador inteligente, calculadora de hipoteca y chatbot para cualificación de leads.",
      en: "Lead capture website with advanced filters, smart search, mortgage calculator and chatbot for lead qualification.",
    },
    tags: ["#web", "#inmobiliaria", "#leadgen"],
    color: "primary",
    imageUrl: tuHogarMadrid,
    imageAlt: {
      es: "Tu Hogar Madrid – portal inmobiliario",
      en: "Tu Hogar Madrid – real estate portal",
    },
    demoUrl: "https://tu-hogar-21-nextgen.lovable.app",
    features: {
      es: ["Buscador con filtros", "Calculadora hipotecaria", "Chatbot cualificador"],
      en: ["Search with filters", "Mortgage calculator", "Qualifying chatbot"],
    },
  },
];
