export interface Testimonial {
  id: string;
  name: string;
  business: {
    es: string;
    en: string;
  };
  location: string;
  quote: {
    es: string;
    en: string;
  };
  caseSlug: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María García",
    business: {
      es: "Atelier of Embers - Tienda de velas",
      en: "Atelier of Embers - Candle shop"
    },
    location: "Barcelona",
    quote: {
      es: "Desde que tenemos la web con el chatbot, vendemos un 40% más sin estar pendientes del móvil. Los clientes hacen pedidos personalizados a cualquier hora.",
      en: "Since we have the website with the chatbot, we sell 40% more without being glued to our phones. Customers place custom orders at any time."
    },
    caseSlug: "atelier-embers",
    rating: 5
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    business: {
      es: "Chic Bookings - Restaurante",
      en: "Chic Bookings - Restaurant"
    },
    location: "Madrid",
    quote: {
      es: "Los no-shows bajaron un 70% con los recordatorios automáticos. Ya no perdemos mesas ni tiempo llamando para confirmar.",
      en: "No-shows dropped 70% with automatic reminders. We no longer lose tables or waste time calling to confirm."
    },
    caseSlug: "chic-bookings",
    rating: 5
  },
  {
    id: "3",
    name: "Dra. Ana Martínez",
    business: {
      es: "Smile Studio Hub - Clínica dental",
      en: "Smile Studio Hub - Dental clinic"
    },
    location: "Valencia",
    quote: {
      es: "El chatbot responde las mismas preguntas que antes nos quitaban 2 horas al día. Ahora nos enfocamos en los pacientes.",
      en: "The chatbot answers the same questions that used to take 2 hours of our day. Now we focus on patients."
    },
    caseSlug: "smile-studio",
    rating: 5
  },
  {
    id: "4",
    name: "Miguel Ángel López",
    business: {
      es: "AutoQuote Hub - Taller mecánico",
      en: "AutoQuote Hub - Mechanic shop"
    },
    location: "Sevilla",
    quote: {
      es: "El formulario de presupuestos nos genera leads cualificados. Sabemos qué necesitan antes de que lleguen al taller.",
      en: "The quote form generates qualified leads for us. We know what they need before they arrive at the shop."
    },
    caseSlug: "autoquote-hub",
    rating: 5
  },
  {
    id: "5",
    name: "Elena Fernández",
    business: {
      es: "Sol Reservas IA - Hotel boutique",
      en: "Sol Reservas IA - Boutique hotel"
    },
    location: "Costa del Sol",
    quote: {
      es: "El check-in automático y el seguimiento post-estancia nos han conseguido el doble de reseñas en Google. Increíble.",
      en: "Automatic check-in and post-stay follow-up got us double the Google reviews. Incredible."
    },
    caseSlug: "sol-reservas",
    rating: 5
  },
  {
    id: "6",
    name: "Pablo Sánchez",
    business: {
      es: "Tu Hogar Madrid - Inmobiliaria",
      en: "Tu Hogar Madrid - Real estate"
    },
    location: "Madrid",
    quote: {
      es: "La calculadora de hipoteca y el chatbot cualifican los leads antes de que me contacten. Solo hablo con compradores reales.",
      en: "The mortgage calculator and chatbot qualify leads before they contact me. I only talk to real buyers."
    },
    caseSlug: "tu-hogar-madrid",
    rating: 5
  }
];
