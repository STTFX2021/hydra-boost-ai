import { motion } from "framer-motion";
import { Zap, Clock, Search } from "lucide-react";
import { Urgency } from "./types";
import { URGENCY_LABELS } from "./data";

interface UrgencySelectorProps {
  onSelect: (urgency: Urgency) => void;
}

const URGENCY_ICONS: Record<Urgency, React.ReactNode> = {
  today: <Zap className="w-4 h-4" />,
  week: <Clock className="w-4 h-4" />,
  exploring: <Search className="w-4 h-4" />,
};

export function UrgencySelector({ onSelect }: UrgencySelectorProps) {
  const urgencies: Urgency[] = ["today", "week", "exploring"];

  return (
    <div className="flex flex-wrap gap-2">
      {urgencies.map((urgency, index) => (
        <motion.button
          key={urgency}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(urgency)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all text-sm"
        >
          {URGENCY_ICONS[urgency]}
          {URGENCY_LABELS[urgency]}
        </motion.button>
      ))}
    </div>
  );
}
