/**
 * Analytics helpers — GA4 (gtag.js) + dataLayer fallback.
 * GA4 property: G-DKBJT284EP (configured in index.html).
 *
 * Marca eventos como conversiones desde GA4 → Admin → Eventos.
 * Recomendado marcar: generate_lead, contact, reservation.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const push = (event: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...params });
    }
  } catch {
    /* tracking never breaks UX */
  }
};

/** Auditoría gratis / formularios de lead cualificado. GA4: generate_lead. */
export const trackLead = (params: EventParams = {}) => {
  push("generate_lead", { currency: "EUR", value: 1, ...params });
};

/** Formulario de contacto genérico. */
export const trackContact = (params: EventParams = {}) => {
  push("contact", { currency: "EUR", value: 1, ...params });
};

/** Reserva / booking (restaurantes, clínicas, inmobiliaria). */
export const trackReservation = (params: EventParams = {}) => {
  push("booking_completed", { currency: "EUR", value: 1, ...params });
};

/** Evento genérico. */
export const trackEvent = (name: string, params: EventParams = {}) => {
  push(name, params);
};
