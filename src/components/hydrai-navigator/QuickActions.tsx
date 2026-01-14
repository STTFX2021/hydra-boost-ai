import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ExternalLink, DollarSign, Cpu } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";
import type { NavigatorSfx } from "./sfx";

interface QuickActionsProps {
  onDiscordClick?: () => void;
  sfx?: Pick<NavigatorSfx, "hover" | "click">;
}

export function QuickActions({ onDiscordClick, sfx }: QuickActionsProps) {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Ver precios",
      icon: <DollarSign className="w-4 h-4" />,
      onClick: () => navigate("/precios"),
    },
    {
      label: "Automatizaciones",
      icon: <Cpu className="w-4 h-4" />,
      onClick: () => navigate("/servicios"),
    },
    {
      label: "Entrar a Discord",
      icon: <ExternalLink className="w-4 h-4" />,
      onClick: () => {
        onDiscordClick?.();
        window.open(DISCORD_INVITE_URL, "_blank");
      },
      highlight: true,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onMouseEnter={() => sfx?.hover()}
          onClick={() => {
            sfx?.click();
            action.onClick();
          }}
          whileHover={{
            scale: 1.05,
            y: -1,
            boxShadow: action.highlight
              ? "0 4px 12px hsl(var(--primary) / 0.4)"
              : "0 4px 12px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
            transition-colors duration-200 relative overflow-hidden
            ${action.highlight ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"}
          `}
        >
          {/* Glow effect on hover for highlight button */}
          {action.highlight && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          )}
          <span className="relative">{action.icon}</span>
          <span className="relative">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

