import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Enhanced radar with sweep effect and connecting lines
export function RadarAnimation() {
  const [connections, setConnections] = useState<{ from: number; to: number }[]>([]);

  const dots = [
    { x: 15, y: 25, delay: 0 },
    { x: 35, y: 65, delay: 0.5 },
    { x: 55, y: 30, delay: 1 },
    { x: 75, y: 55, delay: 1.5 },
    { x: 85, y: 20, delay: 2 },
    { x: 25, y: 75, delay: 2.5 },
  ];

  // Randomly create connections between dots
  useEffect(() => {
    const interval = setInterval(() => {
      const from = Math.floor(Math.random() * dots.length);
      let to = Math.floor(Math.random() * dots.length);
      while (to === from) to = Math.floor(Math.random() * dots.length);
      setConnections((prev) => {
        const newConns = [...prev, { from, to }];
        return newConns.slice(-3); // Keep only last 3 connections
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-28 overflow-hidden rounded-xl bg-black/60 border border-primary/30">
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }} 
      />

      {/* Diagonal sweep scanner */}
      <motion.div
        className="absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent origin-left"
        style={{ 
          left: '-50%',
          transformOrigin: 'center',
        }}
        initial={{ rotate: 0, top: '0%' }}
        animate={{ 
          rotate: [0, 15, -15, 0],
          top: ['0%', '100%', '0%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Circular sweep overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.15) 30deg, transparent 60deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Connecting lines between dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn, i) => (
          <motion.line
            key={`${conn.from}-${conn.to}-${i}`}
            x1={`${dots[conn.from].x}%`}
            y1={`${dots[conn.from].y}%`}
            x2={`${dots[conn.to].x}%`}
            y2={`${dots[conn.to].y}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 0.6, 0], pathLength: [0, 1, 1] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Pulsing dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-2 rounded-full bg-primary/30"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              delay: dot.delay,
              repeat: Infinity,
            }}
          />
          {/* Core dot */}
          <motion.div
            className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              delay: dot.delay,
              repeat: Infinity,
            }}
          />
        </motion.div>
      ))}

      {/* Status text */}
      <div className="absolute bottom-2 left-3 flex items-center gap-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono text-primary/60 uppercase tracking-wider">
          Radar activo
        </span>
      </div>

      {/* Signal indicator */}
      <div className="absolute bottom-2 right-3 flex items-center gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-primary/60 rounded-sm"
            style={{ height: bar * 3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, delay: bar * 0.1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-primary/40 rounded-tl" />
      <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-primary/40 rounded-tr" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-primary/40 rounded-bl" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-primary/40 rounded-br" />
    </div>
  );
}
