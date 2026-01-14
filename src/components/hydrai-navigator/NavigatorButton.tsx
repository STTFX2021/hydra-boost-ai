import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

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
      {/* Outer pulse glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Inner glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary/40 blur-xl"
        animate={{ opacity: isHovered ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Main pill button */}
      <motion.div 
        className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 border border-primary/50 transition-all duration-300"
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          boxShadow: '0 20px 40px -10px hsl(var(--primary) / 0.5)'
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Play icon with pulse */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Play className="w-5 h-5 fill-current" />
        </motion.div>

        {/* Text */}
        <span className="font-bold text-sm whitespace-nowrap">
          Iniciar Misión
        </span>

        {/* Online indicator with enhanced animation */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-primary-foreground/30">
          <motion.div
            className="relative"
          >
            {/* Ping effect */}
            <motion.div
              className="absolute inset-0 w-2 h-2 rounded-full bg-green-400"
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Core dot */}
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <span className="text-xs font-mono opacity-80">ONLINE</span>
        </div>
      </motion.div>

      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.9
        }}
        className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-lg bg-black/95 border border-primary/30 text-xs whitespace-nowrap pointer-events-none shadow-xl"
      >
        <div className="text-foreground font-medium">Tiempo estimado: 45s</div>
        <div className="text-muted-foreground text-[10px] mt-0.5">Plan + recomendación</div>
        {/* Arrow */}
        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-black/95 border-r border-b border-primary/30 transform rotate-45" />
      </motion.div>
    </motion.button>
  );
}
