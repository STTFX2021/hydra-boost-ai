import { motion } from "framer-motion";
import { Radar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface DiagnosticButtonProps {
  className?: string;
  size?: "default" | "lg";
}

export function DiagnosticButton({ className = "", size = "default" }: DiagnosticButtonProps) {
  const isLarge = size === "lg";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Link to="/auditoria">
        <motion.button
          className={`
            relative group overflow-hidden
            ${isLarge ? "px-8 py-4" : "px-6 py-3"}
            rounded-xl font-display font-semibold
            bg-gradient-to-r from-primary via-cyan-400 to-primary
            bg-[length:200%_100%]
            text-primary-foreground
            border border-primary/30
            transition-all duration-300
            hover:shadow-[0_0_30px_rgba(0,200,255,0.5)]
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
          `}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{
              x: ["-200%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />

          {/* Button content */}
          <span className={`relative flex items-center gap-2 ${isLarge ? "text-lg" : "text-base"}`}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Radar className={isLarge ? "w-5 h-5" : "w-4 h-4"} />
            </motion.div>
            <span>Obtener Diagnóstico de Automatización</span>
            <Sparkles className={`${isLarge ? "w-5 h-5" : "w-4 h-4"} opacity-80`} />
          </span>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </Link>

      {/* Micro-text */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-muted-foreground font-mono flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span>Evaluación técnica de viabilidad</span>
        <span className="text-primary">•</span>
        <span>2 min</span>
      </motion.p>

      {/* Value proposition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20"
      >
        <Sparkles className="w-3 h-3 text-accent" />
        <span className="text-[10px] font-medium text-accent">
          Acceso de Cortesía (Valorado en 150€)
        </span>
      </motion.div>
    </div>
  );
}
