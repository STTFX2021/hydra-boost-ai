import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

const STORAGE_KEY = "hydrai-analytics-consent";
const COPY = {
  es: { text: "Usamos analítica para medir qué contenidos y formularios funcionan. Puedes aceptar o rechazar las cookies analíticas.", accept: "Aceptar analítica", reject: "Rechazar" },
  en: { text: "We use analytics to measure which content and forms work. You can accept or reject analytics cookies.", accept: "Accept analytics", reject: "Reject" },
  de: { text: "Wir verwenden Analysen, um Inhalte und Formulare zu messen. Sie können Analyse-Cookies akzeptieren oder ablehnen.", accept: "Analyse akzeptieren", reject: "Ablehnen" },
  ru: { text: "Мы используем аналитику для оценки контента и форм. Вы можете принять или отклонить аналитические cookies.", accept: "Принять", reject: "Отклонить" },
} as const;

type Consent = "granted" | "denied";

const updateConsent = (consent: Consent) => {
  window.gtag?.("consent", "update", {
    analytics_storage: consent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

export const AnalyticsConsent = () => {
  const { language } = useTranslation();
  const copy = COPY[language as keyof typeof COPY] ?? COPY.es;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (saved === "granted" || saved === "denied") updateConsent(saved);
    else setOpen(true);
  }, []);

  const choose = (consent: Consent) => {
    localStorage.setItem(STORAGE_KEY, consent);
    updateConsent(consent);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <aside className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur" aria-label="Analytics consent">
      <p className="text-sm text-muted-foreground">{copy.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose("granted")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{copy.accept}</button>
        <button type="button" onClick={() => choose("denied")} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold">{copy.reject}</button>
      </div>
    </aside>
  );
};
