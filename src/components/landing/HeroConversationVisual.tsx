import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

const Waveform = () => (
  <div className="flex h-12 items-center justify-center gap-1" aria-hidden="true">
    {[20, 34, 46, 28, 54, 38, 22, 44, 30].map((height, index) => (
      <span
        key={`${height}-${index}`}
        className="w-1 rounded-full bg-gradient-to-t from-primary to-secondary animate-pulse"
        style={{
          height,
          animationDelay: `${index * 110}ms`,
          animationDuration: `${900 + index * 70}ms`,
        }}
      />
    ))}
  </div>
);

interface FloatingCardProps {
  className: string;
  eyebrow: string;
  title: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "warning";
}

const FloatingCard = ({
  className,
  eyebrow,
  title,
  detail,
  icon: Icon,
  tone = "primary",
}: FloatingCardProps) => {
  const toneClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  }[tone];

  return (
    <div
      className={`absolute z-20 w-[210px] rounded-2xl border border-border/60 bg-card/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-xl border p-2 ${toneClasses}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
        </div>
      </div>
    </div>
  );
};

export const HeroConversationVisual = () => (
  <div className="relative mx-auto h-[510px] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-border/50 bg-card/45 shadow-2xl shadow-black/40 backdrop-blur-xl">
    <div className="absolute inset-0 bg-grid opacity-40" />
    <div className="glow-orb-primary left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 opacity-20" />
    <div className="glow-orb-secondary -right-20 top-16 h-56 w-56 opacity-15" />

    <div className="absolute left-1/2 top-1/2 z-10 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/25 bg-background/75 shadow-[0_0_90px_hsl(var(--primary)/0.20)] backdrop-blur-xl">
      <div className="absolute inset-4 rounded-full border border-secondary/25 animate-pulse-slow" />
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Sistema conversacional
        </p>
        <Waveform />
        <p className="text-sm font-semibold text-foreground">Escuchando y actuando</p>
      </div>
    </div>

    <div className="absolute left-[18%] top-[25%] h-px w-[24%] rotate-[12deg] bg-gradient-to-r from-transparent via-primary/60 to-primary/10" />
    <div className="absolute right-[17%] top-[29%] h-px w-[24%] -rotate-[12deg] bg-gradient-to-l from-transparent via-secondary/60 to-secondary/10" />
    <div className="absolute bottom-[26%] left-[18%] h-px w-[24%] -rotate-[12deg] bg-gradient-to-r from-transparent via-success/50 to-success/10" />
    <div className="absolute bottom-[25%] right-[18%] h-px w-[24%] rotate-[12deg] bg-gradient-to-l from-transparent via-warning/50 to-warning/10" />

    <FloatingCard
      className="left-5 top-6 animate-float"
      eyebrow="Llamada entrante"
      title="Cliente identificado"
      detail="Historial, preferencias y contexto disponibles al instante."
      icon={PhoneCall}
    />

    <FloatingCard
      className="right-5 top-16 animate-float delay-200"
      eyebrow="Reserva"
      title="Solicitud estructurada"
      detail="Viernes, 21:00 · 4 personas · terraza."
      icon={CalendarCheck}
      tone="success"
    />

    <FloatingCard
      className="bottom-12 left-5 animate-float delay-300"
      eyebrow="Pedido"
      title="Enviado al negocio"
      detail="Productos, extras y entrega preparados para cocina."
      icon={ShoppingBag}
      tone="success"
    />

    <FloatingCard
      className="bottom-6 right-5 animate-float delay-500"
      eyebrow="Supervisión"
      title="Revisión humana solicitada"
      detail="La IA escala cuando detecta riesgo o una decisión reservada."
      icon={AlertTriangle}
      tone="warning"
    />

    <div className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur md:flex">
      <UserRoundCheck className="h-3.5 w-3.5 text-primary" />
      Reglas aplicadas
      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
      Resultado verificable
    </div>
  </div>
);
