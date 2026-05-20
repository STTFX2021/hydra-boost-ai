import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es: { wait: "¡Espera!", body1: "Consigue tu", body2: "auditoría gratuita", body3: "en 2 minutos. Te decimos exactamente qué puedes automatizar en tu negocio.", cta: "Quiero mi auditoría gratuita →", no: "No, gracias" },
  en: { wait: "Wait!", body1: "Get your", body2: "free audit", body3: "in 2 minutes. We'll tell you exactly what you can automate in your business.", cta: "I want my free audit →", no: "No, thanks" },
  de: { wait: "Warten Sie!", body1: "Holen Sie sich Ihr", body2: "kostenloses Audit", body3: "in 2 Minuten. Wir sagen Ihnen genau, was Sie in Ihrem Unternehmen automatisieren können.", cta: "Ich will mein kostenloses Audit →", no: "Nein, danke" },
  ru: { wait: "Подождите!", body1: "Получите ваш", body2: "бесплатный аудит", body3: "за 2 минуты. Мы точно скажем, что можно автоматизировать в вашем бизнесе.", cta: "Хочу бесплатный аудит →", no: "Нет, спасибо" },
} as const;

export const ExitIntentPopup = () => {
  const { language } = useTranslation();
  const c = COPY[language as keyof typeof COPY] ?? COPY.es;
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    if (sessionStorage.getItem("exit_popup_shown")) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "1");
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [dismissed]);

  const close = () => { setShow(false); setDismissed(true); };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-card rounded-2xl shadow-2xl z-[101] p-8 border border-primary/30" style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.2)" }}>
            <button onClick={close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"><Zap className="w-8 h-8 text-primary" /></div>
              <h3 className="text-2xl font-display font-bold mb-3">{c.wait}</h3>
              <p className="text-muted-foreground mb-6">
                {c.body1} <span className="font-semibold text-foreground">{c.body2}</span> {c.body3}
              </p>
              <Link to="/auditoria-gratis" onClick={close}>
                <Button size="lg" className="btn-neon w-full text-base py-5">{c.cta}</Button>
              </Link>
              <button onClick={close} className="text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors block mx-auto">{c.no}</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
