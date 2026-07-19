import { ArrowRight, BrainCircuit, Headphones, Mic, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroConversationVisual } from "@/components/landing/HeroConversationVisual";
import { SarahIntroDialog } from "@/components/landing/SarahIntroDialog";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es: {
    badge: "Inteligencia conversacional para negocios",
    title: "El futuro de tu negocio",
    highlight: "habla por ti.",
    description: "Creamos sistemas conversacionales altamente especializados para tu negocio. Atienden llamadas, gestionan reservas, toman pedidos y conectan cada conversación con la operación real de tu empresa.",
    talk: "Habla con Sarah", demo: "Solicitar una demo",
    proofs: ["Atención continua", "Reglas de negocio", "Supervisión humana"],
  },
  en: {
    badge: "Conversational intelligence for business",
    title: "The future of your business",
    highlight: "speaks for you.",
    description: "We build highly specialized conversational systems for your business. They answer calls, manage bookings, take orders and connect every conversation to your real operations.",
    talk: "Talk to Sarah", demo: "Request a demo",
    proofs: ["Always available", "Business rules", "Human oversight"],
  },
  de: {
    badge: "Conversational Intelligence für Unternehmen",
    title: "Die Zukunft Ihres Unternehmens",
    highlight: "spricht für Sie.",
    description: "Wir entwickeln hochspezialisierte Gesprächssysteme für Ihr Unternehmen. Sie beantworten Anrufe, verwalten Reservierungen, nehmen Bestellungen auf und verbinden jedes Gespräch mit Ihren realen Abläufen.",
    talk: "Mit Sarah sprechen", demo: "Demo anfordern",
    proofs: ["Ständige Erreichbarkeit", "Geschäftsregeln", "Menschliche Aufsicht"],
  },
  ru: {
    badge: "Разговорный ИИ для бизнеса",
    title: "Будущее вашего бизнеса",
    highlight: "говорит за вас.",
    description: "Мы создаём специализированные разговорные системы для бизнеса. Они отвечают на звонки, управляют бронированиями, принимают заказы и связывают каждый разговор с реальными операциями компании.",
    talk: "Поговорить с Сарой", demo: "Запросить демо",
    proofs: ["Постоянная доступность", "Бизнес-правила", "Контроль человека"],
  },
} as const;

const icons = [Headphones, BrainCircuit, ShieldCheck];

export const HydrAIHero = () => {
  const { language } = useTranslation();
  const c = COPY[language as keyof typeof COPY] ?? COPY.es;

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40" aria-labelledby="home-hero-title">
      <div className="absolute inset-0 bg-mesh-hydrai" />
      <div className="glow-orb-primary -left-40 top-20 h-96 w-96 opacity-10" />
      <div className="glow-orb-secondary -right-32 top-10 h-80 w-80 opacity-10" />

      <div className="section-container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] xl:gap-20">
          <div className="max-w-2xl">
            <div className="badge-primary mb-6 inline-flex items-center gap-2">
              <Mic className="h-3.5 w-3.5" />
              {c.badge}
            </div>

            <h1 id="home-hero-title" className="text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl xl:text-7xl">
              {c.title}
              <span className="mt-2 block text-gradient-hydrai text-glow-violet">{c.highlight}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">{c.description}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <SarahIntroDialog trigger={<Button size="lg" className="btn-neon btn-depth w-full sm:w-auto"><Mic className="mr-2 h-5 w-5" />{c.talk}<ArrowRight className="ml-2 h-5 w-5" /></Button>} />
              <Link to="/contacto"><Button size="lg" variant="outline" className="w-full border-border/70 bg-background/40 sm:w-auto">{c.demo}</Button></Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {c.proofs.map((label, index) => {
                const Icon = icons[index];
                return <div key={label} className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 text-primary"><Icon className="h-4 w-4" /></span>{label}</div>;
              })}
            </div>
          </div>
          <HeroConversationVisual />
        </div>
      </div>
    </section>
  );
};
