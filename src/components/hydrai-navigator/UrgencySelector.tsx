import { motion } from "framer-motion";
import { Zap, Clock, Search } from "lucide-react";
import { Urgency } from "./types";
import { URGENCY_LABELS } from "./data";
import type { NavigatorSfx } from "./sfx";

interface UrgencySelectorProps {
  onSelect: (urgency: Urgency) => void;
  sfx?: Pick<NavigatorSfx, "hover" | "click">;
}

const URGENCY_ICONS: Record<Urgency, React.ReactNode> = {
  today: <Zap className="w-4 h-4" />,
  week: <Clock className="w-4 h-4" />,
  exploring: <Search className="w-4 h-4" />,
};

const URGENCY_COLORS: Record<Urgency, string> = {
  today: "text-orange-400 group-hover:text-orange-300",
  week: "text-primary group-hover:text-primary",
  exploring: "text-muted-foreground group-hover:text-foreground",
};

export function UrgencySelector({ onSelect, sfx }: UrgencySelectorProps) {
  const urgencies: Urgency[] = ["today", "week", "exploring"];

  return (
    <div className="flex flex-wrap gap-2">
      {urgencies.map((urgency, index) => (
        <motion.button
          key={urgency}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onMouseEnter={() => sfx?.hover()}
          onClick={() => {
            sfx?.click();
            onSelect(urgency);
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow:
              urgency === "today"
                ? "0 4px 12px rgba(251, 146, 60, 0.3)"
                : "0 4px 12px hsl(var(--primary) / 0.2)",
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
          <span className={`relative transition-colors ${URGENCY_COLORS[urgency]}`}>
            {URGENCY_ICONS[urgency]}
          </span>
          <span className="relative">{URGENCY_LABELS[urgency]}</span>
        </motion.button>
      ))}
    </div>
  );
}

