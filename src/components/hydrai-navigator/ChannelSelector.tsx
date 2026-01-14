import { motion } from "framer-motion";
import { Globe, MessageCircle, Mail, Instagram } from "lucide-react";
import { Channel } from "./types";
import { CHANNEL_LABELS } from "./data";

interface ChannelSelectorProps {
  onSelect: (channel: Channel) => void;
}

const CHANNEL_ICONS: Record<Channel, React.ReactNode> = {
  web: <Globe className="w-4 h-4" />,
  whatsapp: <MessageCircle className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  google: <Globe className="w-4 h-4" />,
};

export function ChannelSelector({ onSelect }: ChannelSelectorProps) {
  const channels: Channel[] = ["web", "whatsapp", "email", "instagram", "google"];

  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((channel, index) => (
        <motion.button
          key={channel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(channel)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all text-sm"
        >
          {CHANNEL_ICONS[channel]}
          {CHANNEL_LABELS[channel]}
        </motion.button>
      ))}
    </div>
  );
}
