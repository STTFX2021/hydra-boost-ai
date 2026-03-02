import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "1");
      }
    };

    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-card rounded-2xl shadow-2xl z-[101] p-8 border border-primary/30"
            style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.2)" }}
          >
            <button onClick={close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">¡Espera!</h3>
              <p className="text-muted-foreground mb-6">
                Consigue tu <span className="font-semibold text-foreground">auditoría gratuita</span> en 2 minutos. Te decimos exactamente qué puedes automatizar en tu negocio.
              </p>
              <Link to="/auditoria-gratis" onClick={close}>
                <Button size="lg" className="btn-neon w-full text-base py-5">
                  Quiero mi auditoría gratuita →
                </Button>
              </Link>
              <button onClick={close} className="text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors block mx-auto">
                No, gracias
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
