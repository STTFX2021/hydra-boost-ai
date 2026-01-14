import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Wifi } from "lucide-react";

interface NavigatorButtonProps {
  onClick: () => void;
}

export function NavigatorButton({ onClick }: NavigatorButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
      
      {/* Main pill button */}
      <div className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 border border-primary/50 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
        {/* Play icon */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Play className="w-5 h-5 fill-current" />
        </motion.div>

        {/* Text */}
        <span className="font-bold text-sm whitespace-nowrap">
          Iniciar Misión
        </span>

        {/* Online indicator */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-primary-foreground/30">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-xs font-mono opacity-80">ONLINE</span>
        </div>
      </div>

      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-black/90 border border-border/50 text-xs text-muted-foreground whitespace-nowrap pointer-events-none"
      >
        Tiempo estimado: 45s
      </motion.div>
    </motion.button>
  );
}
