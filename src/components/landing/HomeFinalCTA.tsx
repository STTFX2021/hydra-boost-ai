import { ArrowRight, Mic, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SarahIntroDialog } from "@/components/landing/SarahIntroDialog";
import { useTranslation } from "@/lib/i18n";

const COPY={es:{title:"Cada conversación debería mover tu negocio.",description:"Prueba a Sarah como cliente de una pizzería o cuéntanos qué proceso quieres automatizar, conectar o convertir en producto.",talk:"Habla con Sarah",project:"Cuéntanos tu proyecto"},en:{title:"Every conversation should move your business forward.",description:"Try Sarah as a pizzeria customer or tell us which process you want to automate, connect or turn into a product.",talk:"Talk to Sarah",project:"Tell us about your project"},de:{title:"Jedes Gespräch sollte Ihr Unternehmen voranbringen.",description:"Testen Sie Sarah als Pizzeria-Kunde oder erzählen Sie uns, welchen Prozess Sie automatisieren, verbinden oder in ein Produkt verwandeln möchten.",talk:"Mit Sarah sprechen",project:"Erzählen Sie uns von Ihrem Projekt"},ru:{title:"Каждый разговор должен двигать ваш бизнес вперёд.",description:"Попробуйте Сару как клиент пиццерии или расскажите, какой процесс вы хотите автоматизировать, связать или превратить в продукт.",talk:"Поговорить с Сарой",project:"Рассказать о проекте"}} as const;

export const HomeFinalCTA = () => { const {language}=useTranslation(); const copy=COPY[language as keyof typeof COPY]??COPY.es; return (
  <section className="section-padding relative overflow-hidden" aria-labelledby="home-final-cta-title">
    <div className="glow-orb-primary left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 opacity-10" />
    <div className="section-container relative z-10">
      <div className="gradient-border overflow-hidden rounded-[2rem] bg-card/70 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
          <PhoneCall className="h-7 w-7" />
        </div>
        <h2 id="home-final-cta-title" className="mx-auto mt-7 max-w-3xl text-3xl font-bold md:text-5xl">
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
          {copy.description}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <SarahIntroDialog
            trigger={
              <Button size="lg" className="btn-neon btn-depth w-full sm:w-auto">
                <Mic className="mr-2 h-5 w-5" />
                {copy.talk}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            }
          />
          <Link to="/contacto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {copy.project}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
); };
