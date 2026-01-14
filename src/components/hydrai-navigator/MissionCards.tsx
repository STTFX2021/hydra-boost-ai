import { motion } from "framer-motion";
import { Target, Calendar, Zap } from "lucide-react";
import { Mission } from "./types";
import { MISSION_LABELS } from "./data";

interface MissionCardsProps {
  onSelect: (mission: Mission) => void;
}

const MISSION_ICONS: Record<Mission, React.ReactNode> = {
  leads: <Target className="w-6 h-6" />,
  bookings: <Calendar className="w-6 h-6" />,
  automation: <Zap className="w-6 h-6" />,
};

export function MissionCards({ onSelect }: MissionCardsProps) {
  const missions: Mission[] = ["leads", "bookings", "automation"];

  return (
    <div className="grid gap-3">
      {missions.map((mission, index) => {
        const { title, description } = MISSION_LABELS[mission];
        return (
          <motion.button
            key={mission}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(mission)}
            className="group relative flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-primary/20 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 text-left"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/5 to-transparent" />
            
            {/* Icon */}
            <div className="relative flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              {MISSION_ICONS[mission]}
            </div>

            {/* Content */}
            <div className="relative flex-1 min-w-0">
              <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </div>
              <div className="text-sm text-muted-foreground">
                {description}
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              className="relative text-primary/50 group-hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
            >
              →
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
