import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Timer, CheckCircle2 } from "lucide-react";

interface MissionTimerProps {
  isActive: boolean;
  duration?: number; // seconds
  onComplete?: () => void;
}

export function MissionTimer({ isActive, duration = 45, onComplete }: MissionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
      setIsCompleted(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);

  const progress = ((duration - timeLeft) / duration) * 100;

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-black/40 border border-primary/30"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-400"
          >
            <CheckCircle2 className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-primary"
          >
            <Timer className="w-4 h-4" />
          </motion.div>
        )}
      </div>

      {/* Timer display */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono text-muted-foreground">
            {isCompleted ? "Misión completada" : "Tiempo estimado"}
          </span>
          <span className={`text-xs font-bold font-mono ${isCompleted ? 'text-green-400' : 'text-primary'}`}>
            {isCompleted ? "✓ Listo" : `${timeLeft}s`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isCompleted ? 'bg-green-400' : 'bg-primary'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
