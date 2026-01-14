import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Calendar, Zap } from "lucide-react";
import { Mission } from "./types";
import { MISSION_LABELS } from "./data";
import type { NavigatorSfx } from "./sfx";

interface MissionCardsProps {
  onSelect: (mission: Mission) => void;
  sfx?: Pick<NavigatorSfx, "hover" | "click">;
}

const MISSION_ICONS: Record<Mission, React.ReactNode> = {
  leads: <Target className="w-6 h-6" />,
  bookings: <Calendar className="w-6 h-6" />,
  automation: <Zap className="w-6 h-6" />,
};

export function MissionCards({ onSelect, sfx }: MissionCardsProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const missions: Mission[] = ["leads", "bookings", "automation"];

  const handleSelect = (mission: Mission) => {
    setSelectedMission(mission);
    sfx?.click();
    // Lock-in animation before calling onSelect
    setTimeout(() => {
      onSelect(mission);
    }, 400);
  };

  return (
    <div className="grid gap-3">
      {missions.map((mission, index) => {
        const { title, description } = MISSION_LABELS[mission];
        const isSelected = selectedMission === mission;
        const isOther = selectedMission && selectedMission !== mission;

        return (
          <motion.button
            key={mission}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isOther ? 0.3 : 1,
              x: 0,
              scale: isSelected ? 1.02 : 1,
            }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(mission)}
            onMouseEnter={() => sfx?.hover()}
            disabled={!!selectedMission}
            className={`
              group relative flex items-center gap-4 p-4 rounded-xl 
              bg-black/40 border transition-all duration-300 text-left
              ${
                isSelected
                  ? "border-primary shadow-lg shadow-primary/30"
                  : "border-primary/20 hover:border-primary/60 hover:bg-primary/10"
              }
              disabled:cursor-not-allowed
            `}
          >
            {/* Lock-in glow effect */}
            {isSelected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-xl bg-primary/20"
              />
            )}

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />

            {/* Icon */}
            <motion.div
              className={`
                relative flex-shrink-0 w-12 h-12 rounded-lg 
                flex items-center justify-center text-primary
                ${isSelected ? "bg-primary/40" : "bg-primary/20"}
              `}
              whileHover={{ scale: 1.1, y: -2 }}
              animate={
                isSelected
                  ? {
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary) / 0)",
                        "0 0 20px 5px hsl(var(--primary) / 0.5)",
                        "0 0 0 0 hsl(var(--primary) / 0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              {MISSION_ICONS[mission]}
            </motion.div>

            {/* Content */}
            <div className="relative flex-1 min-w-0">
              <motion.div
                className={`font-semibold transition-colors ${
                  isSelected
                    ? "text-primary"
                    : "text-foreground group-hover:text-primary"
                }`}
                whileHover={{ x: 2 }}
              >
                {title}
              </motion.div>
              <div className="text-sm text-muted-foreground">{description}</div>
            </div>

            {/* Arrow / Check */}
            <motion.div
              className={`relative transition-colors ${
                isSelected
                  ? "text-primary"
                  : "text-primary/50 group-hover:text-primary"
              }`}
              whileHover={{ x: 5 }}
              animate={isSelected ? { scale: [1, 1.3, 1] } : {}}
            >
              {isSelected ? "✓" : "→"}
            </motion.div>

            {/* Border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isSelected ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

