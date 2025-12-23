// Portfolio project links - replace PASTE_URL placeholders with actual URLs
export const PORTFOLIO_LINKS = {
  tradeVortex: "", // https://discord.gg/5dD8zASY
  argusAI: "", //
  xauusdOrochi: "", // PASTE_URL_3
  prankBrawlers: "", // PASTE_URL_4
  other: "", // PASTE_URL_5
};

// Check if a URL is valid and not a placeholder
export const isValidUrl = (url: string): boolean => {
  return url.length > 0 && !url.startsWith("PASTE_URL");
};

// Discord invite URL for HydrAI Labs community
// TODO: Replace with actual Discord server invite link when available
export const DISCORD_INVITE_URL = "https://discord.gg/hydrailabs";
