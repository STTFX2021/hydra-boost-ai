export const VOZRA_RAPID_DEMO_URL =
  import.meta.env.VITE_VOZRA_RAPID_DEMO_URL ||
  import.meta.env.VITE_SARAH_DEMO_URL ||
  "/contacto?motivo=demo-vozra-rapid";

export const SARAH_DEMO_URL =
  import.meta.env.VITE_SARAH_DEMO_URL || VOZRA_RAPID_DEMO_URL;

export const VOZRA_RESERVE_DEMO_URL =
  import.meta.env.VITE_VOZRA_RESERVE_DEMO_URL ||
  "/contacto?motivo=demo-vozra-reserve";

export const isExternalUrl = (value: string) => /^https?:\/\//i.test(value);
