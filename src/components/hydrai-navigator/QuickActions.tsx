import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ExternalLink, DollarSign, Cpu } from "lucide-react";
import { DISCORD_INVITE_URL } from "@/lib/constants";

interface QuickActionsProps {
  onDiscordClick?: () => void;
}

export function QuickActions({ onDiscordClick }: QuickActionsProps) {
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
          onClick={action.onClick}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
            transition-all duration-200
            ${action.highlight 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          `}
        >
          {action.icon}
          {action.label}
        </motion.button>
      ))}
    </div>
  );
}
