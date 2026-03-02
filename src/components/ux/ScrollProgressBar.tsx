import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary z-[90]"
      style={{ width: `${progress}%` }}
    />
  );
};
