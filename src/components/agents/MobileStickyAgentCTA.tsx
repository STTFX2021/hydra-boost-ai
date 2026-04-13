import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  agentName: string;
}

export function MobileStickyAgentCTA({ agentName }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div
        className="px-4 py-3 flex gap-2"
        style={{
          background: "linear-gradient(to top, hsl(222 47% 6% / 0.98), hsl(222 47% 6% / 0.92))",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid hsl(222 30% 18%)",
        }}
      >
        <Link to="/auditoria-gratis" className="flex-1">
          <Button size="sm" className="btn-neon w-full text-xs">
            Auditoría gratis
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
        <a href="https://wa.me/34666666666" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
          <Button size="sm" variant="outline" className="border-border/50 text-xs">
            WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
