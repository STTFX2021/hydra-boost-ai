const VOZRA_APP_BASE_URL =
  import.meta.env.VITE_VOZRA_APP_URL?.replace(/\/$/, "") ||
  "https://vozra-insight-engine.lovable.app";

export const productLinks = {
  vozraApp: VOZRA_APP_BASE_URL,
  vozraPortal: `${VOZRA_APP_BASE_URL}/portal`,
  vozraInternal: `${VOZRA_APP_BASE_URL}/auth/login`,
  sarahDemo: `${VOZRA_APP_BASE_URL}/prueba-sarah`,
} as const;
