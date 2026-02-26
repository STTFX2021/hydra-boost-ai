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
  if (url.length === 0) return false;
  if (url.startsWith("PASTE_URL")) return false;
  if (url.includes("YOUR_VIDEO_ID")) return false;
  return true;
};

// Discord invite URL for HydrAI Labs community
export const DISCORD_INVITE_URL = "https://discord.gg/uBd28UuhvP";

// Pricing page demo video URL - YouTube embed (privacy-enhanced)
export const PRICING_DEMO_VIDEO_URL =
  "https://www.youtube-nocookie.com/embed/jvHA_QbYqf4?rel=0&modestbranding=1&autoplay=0&iv_load_policy=3";

// Hero demo video ID (YouTube)
export const HERO_DEMO_VIDEO_ID = "IcD68znrU_c";

// Booking/Calendar URL - replace with your actual Calendly/Cal.com URL
export const BOOKING_URL = "https://calendly.com/hydrailabs/consulta";
