import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";

const LABEL = {
  es: "Solicitar auditoría gratuita",
  en: "Request free audit",
  de: "Kostenloses Audit anfordern",
  ru: "Запросить бесплатный аудит",
} as const;

export const MobileStickyCTA = () => {
  const { language } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 right-0 p-3 bg-card/95 backdrop-blur-xl border-t border-border/50 z-40 md:hidden">
          <Link to="/auditoria-gratis" className="block">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-sm shadow-lg">
              {LABEL[language as keyof typeof LABEL] ?? LABEL.es}
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
