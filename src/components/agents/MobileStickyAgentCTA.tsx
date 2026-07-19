import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es: { audit: "Auditoría gratis", wa: "WhatsApp" },
  en: { audit: "Free audit", wa: "WhatsApp" },
  de: { audit: "Kostenloses Audit", wa: "WhatsApp" },
  ru: { audit: "Бесплатный аудит", wa: "WhatsApp" },
} as const;

interface Props { agentName: string; }

export function MobileStickyAgentCTA({ agentName }: Props) {
  const { language } = useTranslation();
  const c = COPY[language as keyof typeof COPY] ?? COPY.es;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="px-4 py-3 flex gap-2" style={{ background: "linear-gradient(to top, hsl(222 47% 6% / 0.98), hsl(222 47% 6% / 0.92))", backdropFilter: "blur(12px)", borderTop: "1px solid hsl(222 30% 18%)" }}>
        <Link to="/auditoria-gratis" className="flex-1">
          <Button size="sm" className="btn-neon w-full text-xs">
            {c.audit}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
        <a href="https://wa.me/34634425921" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
          <Button size="sm" variant="outline" className="border-border/50 text-xs">{c.wa}</Button>
        </a>
      </div>
    </div>
  );
}
