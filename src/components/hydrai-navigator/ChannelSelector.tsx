import { motion } from "framer-motion";
import { Globe, MessageCircle, Mail, Instagram, Search } from "lucide-react";
import { Channel } from "./types";
import { CHANNEL_LABELS } from "./data";
import type { NavigatorSfx } from "./sfx";

interface ChannelSelectorProps {
  onSelect: (channel: Channel) => void;
  sfx?: Pick<NavigatorSfx, "hover" | "click">;
}

const CHANNEL_ICONS: Record<Channel, React.ReactNode> = {
  web: <Globe className="w-4 h-4" />,
  whatsapp: <MessageCircle className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  google: <Search className="w-4 h-4" />,
};

export function ChannelSelector({ onSelect, sfx }: ChannelSelectorProps) {
  const channels: Channel[] = ["web", "whatsapp", "email", "instagram", "google"];

  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((channel, index) => (
        <motion.button
          key={channel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onMouseEnter={() => sfx?.hover()}
          onClick={() => {
            sfx?.click();
            onSelect(channel);
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0 4px 12px hsl(var(--primary) / 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-colors text-sm relative overflow-hidden"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          />
          <span className="relative text-primary group-hover:scale-110 transition-transform">
            {CHANNEL_ICONS[channel]}
          </span>
          <span className="relative">{CHANNEL_LABELS[channel]}</span>
        </motion.button>
      ))}
    </div>
  );
}

