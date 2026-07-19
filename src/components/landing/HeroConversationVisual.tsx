import type { ComponentType } from "react";
import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const COPY={
es:{system:"Sistema conversacional",listening:"{copy.listening}",cards:[["Llamada entrante","Cliente identificado","Historial, preferencias y contexto disponibles al instante."],["Reserva","Solicitud estructurada","Viernes, 21:00 · 4 personas · terraza."],["Pedido","Enviado al negocio","Productos, extras y entrega preparados para cocina."],["Supervisión","Revisión humana","La IA escala cuando detecta riesgo o una decisión reservada."]],rules:"Reglas aplicadas",result:"Resultado verificable"},
en:{system:"Conversational system",listening:"Listening and acting",cards:[["Incoming call","Customer identified","History, preferences and context available instantly."],["Booking","Structured request","Friday, 9:00 PM · 4 guests · terrace."],["Order","Sent to the business","Products, extras and delivery details ready for the kitchen."],["Supervision","Human review","AI escalates when it detects risk or a reserved decision."]],rules:"Rules applied",result:"Verifiable result"},
de:{system:"Gesprächssystem",listening:"Hört zu und handelt",cards:[["Eingehender Anruf","Kunde erkannt","Verlauf, Präferenzen und Kontext sofort verfügbar."],["Reservierung","Strukturierte Anfrage","Freitag, 21:00 · 4 Personen · Terrasse."],["Bestellung","An Betrieb gesendet","Produkte, Extras und Lieferdaten für die Küche vorbereitet."],["Aufsicht","Menschliche Prüfung","Die KI übergibt bei Risiko oder vorbehaltenen Entscheidungen."]],rules:"Regeln angewendet",result:"Überprüfbares Ergebnis"},
ru:{system:"Разговорная система",listening:"Слушает и действует",cards:[["Входящий звонок","Клиент определён","История, предпочтения и контекст доступны мгновенно."],["Бронирование","Структурированный запрос","Пятница, 21:00 · 4 гостя · терраса."],["Заказ","Отправлен бизнесу","Позиции, дополнения и доставка подготовлены для кухни."],["Контроль","Проверка человеком","ИИ передаёт случай человеку при риске или зарезервированном решении."]],rules:"Правила применены",result:"Проверяемый результат"}} as const;

const Waveform = () => (
  <div className="flex h-12 items-center justify-center gap-1" aria-hidden="true">
    {[20, 34, 46, 28, 54, 38, 22, 44, 30].map((height, index) => (
      <span
        key={`${height}-${index}`}
        className="w-1 animate-pulse rounded-full bg-gradient-to-t from-primary to-secondary"
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
  icon: ComponentType<{ className?: string }>;
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
    primary: "border-primary/20 bg-primary/10 text-primary",
    success: "border-success/20 bg-success/10 text-success",
    warning: "border-warning/20 bg-warning/10 text-warning",
  }[tone];

  return (
    <div
      className={`absolute z-20 w-[180px] rounded-2xl border border-border/60 bg-card/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:w-[210px] sm:p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-xl border p-2 ${toneClasses}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
            {eyebrow}
          </p>
          <p className="mt-1 text-xs font-semibold text-foreground sm:text-sm">{title}</p>
          <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{detail}</p>
        </div>
      </div>
    </div>
  );
};

export const HeroConversationVisual = () => { const {language}=useTranslation(); const copy=COPY[language as keyof typeof COPY]??COPY.es; return (
  <div className="relative mx-auto h-[480px] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-border/50 bg-card/45 shadow-2xl shadow-black/40 backdrop-blur-xl sm:h-[510px]">
    <div className="absolute inset-0 bg-grid opacity-40" />
    <div className="glow-orb-primary left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 opacity-20" />
    <div className="glow-orb-secondary -right-20 top-16 h-56 w-56 opacity-15" />

    <div className="absolute left-1/2 top-1/2 z-10 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/25 bg-background/75 shadow-[0_0_90px_hsl(var(--primary)/0.20)] backdrop-blur-xl sm:h-52 sm:w-52">
      <div className="animate-pulse-slow absolute inset-4 rounded-full border border-secondary/25" />
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px] sm:tracking-[0.24em]">
          {copy.system}
        </p>
        <Waveform />
        <p className="text-xs font-semibold text-foreground sm:text-sm">Escuchando y actuando</p>
      </div>
    </div>

    <div className="absolute left-[18%] top-[25%] h-px w-[24%] rotate-[12deg] bg-gradient-to-r from-transparent via-primary/60 to-primary/10" />
    <div className="absolute right-[17%] top-[29%] h-px w-[24%] -rotate-[12deg] bg-gradient-to-l from-transparent via-secondary/60 to-secondary/10" />
    <div className="absolute bottom-[26%] left-[18%] h-px w-[24%] -rotate-[12deg] bg-gradient-to-r from-transparent via-success/50 to-success/10" />
    <div className="absolute bottom-[25%] right-[18%] h-px w-[24%] rotate-[12deg] bg-gradient-to-l from-transparent via-warning/50 to-warning/10" />

    <FloatingCard
      className="animate-float left-3 top-5 sm:left-5 sm:top-6"
      eyebrow={copy.cards[0][0]}
      title={copy.cards[0][1]}
      detail={copy.cards[0][2]}
      icon={PhoneCall}
    />

    <FloatingCard
      className="animate-float delay-200 right-3 top-20 sm:right-5 sm:top-16"
      eyebrow={copy.cards[1][0]}
      title={copy.cards[1][1]}
      detail={copy.cards[1][2]}
      icon={CalendarCheck}
      tone="success"
    />

    <FloatingCard
      className="animate-float delay-300 bottom-16 left-3 sm:bottom-12 sm:left-5"
      eyebrow={copy.cards[2][0]}
      title={copy.cards[2][1]}
      detail={copy.cards[2][2]}
      icon={ShoppingBag}
      tone="success"
    />

    <FloatingCard
      className="animate-float delay-500 bottom-5 right-3 sm:bottom-6 sm:right-5"
      eyebrow={copy.cards[3][0]}
      title={copy.cards[3][1]}
      detail={copy.cards[3][2]}
      icon={AlertTriangle}
      tone="warning"
    />

    <div className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur md:flex">
      <UserRoundCheck className="h-3.5 w-3.5 text-primary" />
      {copy.rules}
      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
      {copy.result}
    </div>
  </div>
); };
