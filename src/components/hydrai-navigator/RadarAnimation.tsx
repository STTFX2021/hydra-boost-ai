import { motion } from "framer-motion";

export function RadarAnimation() {
  return (
    <div className="relative w-full h-24 overflow-hidden rounded-lg bg-black/40 border border-primary/20">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ top: 0 }}
        animate={{ top: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Pulsing dots */}
      {[
        { x: "20%", y: "30%", delay: 0 },
        { x: "60%", y: "50%", delay: 0.5 },
        { x: "80%", y: "25%", delay: 1 },
        { x: "40%", y: "70%", delay: 1.5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{ left: dot.x, top: dot.y }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: dot.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xs font-mono text-primary/70 uppercase tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Escaneando...
        </motion.span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50" />
    </div>
  );
}
