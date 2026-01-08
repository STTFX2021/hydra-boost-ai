// Portfolio project links - replace PASTE_URL placeholders with actual URLs
export const PORTFOLIO_LINKS = {
  tradeVortex: "", // PASTE_URL_1
  argusAI: "", // PASTE_URL_2
  xauusdOrochi: "", // PASTE_URL_3
  prankBrawlers: "", // PASTE_URL_4
  other: "", // PASTE_URL_5
};

// Check if a URL is valid and not a placeholder
export const isValidUrl = (url: string): boolean => {
  return url.length > 0 && !url.startsWith("PASTE_URL");
};

// Discord invite URL for HydrAI Labs community
export const DISCORD_INVITE_URL = "https://discord.gg/KrymATqa";
