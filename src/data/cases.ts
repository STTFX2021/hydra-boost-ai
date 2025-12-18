import { Flame, UtensilsCrossed, Stethoscope, Car, Hotel, BarChart3, Home } from "lucide-react";
import atelierEmbers from "@/assets/cases/atelier-embers.jpg";
import chicBookings from "@/assets/cases/chic-bookings.jpg";
import smileStudio from "@/assets/cases/smile-studio.jpg";
import autoquoteHub from "@/assets/cases/autoquote-hub.jpg";
import solReservas from "@/assets/cases/sol-reservas.jpg";
import insightNarrator from "@/assets/cases/insight-narrator.jpg";
import tuHogarMadrid from "@/assets/cases/tu-hogar-madrid.jpg";

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
}

export const cases: Case[] = [
  {
    id: "atelier-embers",
    title: "Atelier of Embers",
    type: {
      es: "Tienda de velas artesanales y artesanía",
      en: "Artisan candle shop and crafts"
    },
    icon: Flame,
    description: {
      es: "Web e-commerce con catálogo de productos, integración de pagos y sistema de pedidos automatizado. Chatbot para consultas sobre personalización.",
      en: "E-commerce website with product catalog, payment integration and automated order system. Chatbot for customization queries."
    },
    tags: ["#web", "#chatbot", "#ecommerce"],
    color: "primary",
    imageUrl: atelierEmbers,
    imageAlt: {
      es: "Atelier of Embers – tienda de velas artesanales",
      en: "Atelier of Embers – artisan candle shop"
    },
    demoUrl: "https://atelier-creations-collective.lovable.app"
  },
  {
    id: "chic-bookings",
    title: "Chic Bookings",
    type: {
      es: "Sistema de reservas para restaurante / salón",
      en: "Restaurant / salon booking system"
    },
    icon: UtensilsCrossed,
    description: {
      es: "Sistema elegante de reservas online con confirmaciones automáticas, gestión de mesas y recordatorios anti no-show por WhatsApp.",
      en: "Elegant online booking system with automatic confirmations, table management and WhatsApp anti no-show reminders."
    },
    tags: ["#web", "#automatizaciones", "#reservas"],
    color: "secondary",
    imageUrl: chicBookings,
    imageAlt: {
      es: "Chic Bookings – sistema de reservas elegante",
      en: "Chic Bookings – elegant booking system"
    },
    demoUrl: "https://glow-reserve-pro.lovable.app"
  },
  {
    id: "smile-studio",
    title: "Smile Studio Hub",
    type: {
      es: "Clínica dental moderna",
      en: "Modern dental clinic"
    },
    icon: Stethoscope,
    description: {
      es: "Web profesional con sistema de citas, chatbot para resolver dudas frecuentes sobre tratamientos y automatización de recordatorios.",
      en: "Professional website with appointment system, chatbot for treatment FAQs and automated reminders."
    },
    tags: ["#web", "#chatbot", "#automatizaciones"],
    color: "accent",
    imageUrl: smileStudio,
    imageAlt: {
      es: "Smile Studio Hub – clínica dental moderna",
      en: "Smile Studio Hub – modern dental clinic"
    },
    demoUrl: "https://radiant-quest-chat.lovable.app"
  },
  {
    id: "autoquote-hub",
    title: "AutoQuote Hub",
    type: {
      es: "Taller mecánico con presupuestos rápidos",
      en: "Mechanic shop with quick quotes"
    },
    icon: Car,
    description: {
      es: "Landing de captación con formulario inteligente que genera presupuestos orientativos automáticos según el tipo de servicio y vehículo.",
      en: "Lead capture landing with smart form that generates automatic estimates based on service type and vehicle."
    },
    tags: ["#web", "#automatizaciones", "#leads"],
    color: "primary",
    imageUrl: autoquoteHub,
    imageAlt: {
      es: "AutoQuote Hub – taller mecánico online",
      en: "AutoQuote Hub – online mechanic shop"
    },
    demoUrl: "https://pro-auto-care.lovable.app"
  },
  {
    id: "sol-reservas",
    title: "Sol Reservas IA",
    type: {
      es: "Motor de reservas para hoteles",
      en: "Hotel booking engine"
    },
    icon: Hotel,
    description: {
      es: "Sistema de reservas inteligente con chatbot multiidioma, check-in automático y seguimiento post-estancia para reseñas.",
      en: "Smart booking system with multilingual chatbot, automatic check-in and post-stay review follow-up."
    },
    tags: ["#chatbot", "#automatizaciones", "#reservas"],
    color: "secondary",
    imageUrl: solReservas,
    imageAlt: {
      es: "Sol Reservas IA – motor de reservas hoteleras",
      en: "Sol Reservas IA – hotel booking engine"
    },
    demoUrl: "https://costa-booker-bot.lovable.app"
  },
  {
    id: "insight-narrator",
    title: "KPI Narrator",
    type: {
      es: "Interpretación de dashboards con IA",
      en: "AI dashboard interpretation"
    },
    icon: BarChart3,
    description: {
      es: "Capa de IA que analiza los datos de negocio y genera informes narrativos automáticos con recomendaciones accionables.",
      en: "AI layer that analyzes business data and generates automatic narrative reports with actionable recommendations."
    },
    tags: ["#automatizaciones", "#ia", "#analytics"],
    color: "accent",
    imageUrl: insightNarrator,
    imageAlt: {
      es: "KPI Narrator – análisis de dashboards con IA",
      en: "KPI Narrator – AI dashboard analysis"
    },
    demoUrl: "https://causal-narrate.lovable.app"
  },
  {
    id: "tu-hogar-madrid",
    title: "Tu Hogar Madrid",
    type: {
      es: "Portal inmobiliario para clase media en Madrid",
      en: "Real estate portal for middle class in Madrid"
    },
    icon: Home,
    description: {
      es: "Web de captación con filtros avanzados, buscador inteligente, calculadora de hipoteca y chatbot para cualificación de leads.",
      en: "Lead capture website with advanced filters, smart search, mortgage calculator and chatbot for lead qualification."
    },
    tags: ["#web", "#inmobiliaria", "#leadgen"],
    color: "primary",
    imageUrl: tuHogarMadrid,
    imageAlt: {
      es: "Tu Hogar Madrid – portal inmobiliario",
      en: "Tu Hogar Madrid – real estate portal"
    },
    demoUrl: "https://tu-hogar-madrid.lovable.app"
  },
];
