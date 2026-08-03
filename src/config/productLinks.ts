const VOZRA_APP_BASE_URL =
  import.meta.env.VITE_VOZRA_APP_URL?.replace(/\/$/, "") ||
  "https://panel.hydrailabs.com";

const SARAH_DEMO_BASE_URL =
  import.meta.env.VITE_SARAH_DEMO_URL?.replace(/\/$/, "") ||
  "https://sarah.hydrailabs.com";

export const productLinks = {
  vozraApp: VOZRA_APP_BASE_URL,
  vozraPortal: `${VOZRA_APP_BASE_URL}/portal`,
  vozraInternal: `${VOZRA_APP_BASE_URL}/auth/login`,
  sarahDemo: SARAH_DEMO_BASE_URL,
} as const;
