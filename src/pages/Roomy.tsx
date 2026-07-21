import { ArrowRight, CheckCircle2, Hotel, Languages, Menu, Send, ShoppingBag, Timer } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, ServiceSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es:{title:"Roomy: room service inteligente para hoteles",description:"Asistente conversacional multilingüe que atiende al huésped, presenta la carta, confirma el pedido y coordina la entrega a la habitación.",badge:"Room service inteligente",lead:"Convierte cada consulta del huésped en un pedido claro, confirmado y trazable para el hotel.",cta:"Solicitar una demo",how:"Del huésped a la operación",steps:["Atiende al huésped en su idioma desde el canal habilitado.","Consulta carta, horarios, disponibilidad, extras y restricciones.","Confirma habitación, pedido, importe y condiciones antes de enviarlo.","Entrega el pedido estructurado al equipo y mantiene la trazabilidad."],features:["Atención multilingüe","Carta digital configurable","Disponibilidad y horarios","Pedidos a habitación","Restricciones alimentarias","Seguimiento operativo"],seo:"Roomy | Room service inteligente para hoteles"},
  en:{title:"Roomy: intelligent room service for hotels",description:"A multilingual conversational assistant that helps guests, presents the menu, confirms orders and coordinates delivery to the room.",badge:"Intelligent room service",lead:"Turn every guest request into a clear, confirmed and traceable order for the hotel.",cta:"Request a demo",how:"From guest to operations",steps:["Assists guests in their language through the enabled channel.","Checks menus, opening hours, availability, extras and restrictions.","Confirms the room, order, amount and conditions before sending.","Delivers a structured order to the team and preserves traceability."],features:["Multilingual service","Configurable digital menu","Availability and hours","In-room orders","Dietary restrictions","Operational tracking"],seo:"Roomy | Intelligent room service for hotels"},
  de:{title:"Roomy: intelligenter Roomservice für Hotels",description:"Mehrsprachiger Gesprächsassistent, der Gäste betreut, das Menü präsentiert, Bestellungen bestätigt und die Lieferung aufs Zimmer koordiniert.",badge:"Intelligenter Roomservice",lead:"Verwandelt jede Gästeanfrage in eine klare, bestätigte und nachvollziehbare Bestellung.",cta:"Demo anfragen",how:"Vom Gast zum Betrieb",steps:["Betreut Gäste in ihrer Sprache über den verfügbaren Kanal.","Prüft Menü, Öffnungszeiten, Verfügbarkeit, Extras und Einschränkungen.","Bestätigt Zimmer, Bestellung, Betrag und Bedingungen vor dem Versand.","Übergibt die Bestellung strukturiert und nachvollziehbar an das Team."],features:["Mehrsprachiger Service","Konfigurierbares Digitalmenü","Verfügbarkeit und Zeiten","Zimmerbestellungen","Ernährungseinschränkungen","Operative Verfolgung"],seo:"Roomy | Intelligenter Roomservice für Hotels"},
  ru:{title:"Roomy: интеллектуальный room service для отелей",description:"Многоязычный разговорный помощник для гостей: показывает меню, подтверждает заказ и координирует доставку в номер.",badge:"Интеллектуальный room service",lead:"Превращает каждый запрос гостя в понятный, подтверждённый и отслеживаемый заказ.",cta:"Запросить демо",how:"От гостя к операции",steps:["Обслуживает гостя на его языке через доступный канал.","Проверяет меню, часы работы, наличие, дополнения и ограничения.","Подтверждает номер, заказ, сумму и условия перед отправкой.","Передаёт команде структурированный заказ с полной прослеживаемостью."],features:["Многоязычное обслуживание","Настраиваемое цифровое меню","Наличие и часы работы","Заказы в номер","Пищевые ограничения","Контроль операций"],seo:"Roomy | Интеллектуальный room service для отелей"},
} as const;

const icons = [Languages, Menu, Timer, ShoppingBag, CheckCircle2, Send];

const Roomy = () => {
  const { language } = useTranslation();
  const c = COPY[language as keyof typeof COPY] ?? COPY.es;
  return <>
    <SEOHead title={c.seo} description={c.description} canonical="/roomy" keywords="Roomy, room service inteligente, IA para hoteles, asistente virtual hotel, pedidos habitación" />
    <ServiceSchema name="Roomy" description={c.description} url="/roomy" />
    <BreadcrumbSchema items={[{name:"HydrAI Labs",url:"/"},{name:"Roomy",url:"/roomy"}]} />
    <PageLayout>
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 bg-grid-hydrai opacity-50" />
        <div className="section-container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{c.badge}</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">{c.title}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{c.lead}</p>
            <a href="https://wa.me/34634425921?text=Hola%2C%20quiero%20una%20demo%20de%20Roomy" target="_blank" rel="noreferrer">
              <Button size="lg" className="btn-neon btn-depth mt-8"><Hotel className="mr-2 h-5 w-5" />{c.cta}<ArrowRight className="ml-2 h-5 w-5" /></Button>
            </a>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black p-8 shadow-2xl shadow-black/60">
            <img src="/brand/roomy/roomy-logo.jpeg" alt="Roomy — Room Service Inteligente" className="mx-auto w-full max-w-xl" />
          </div>
        </div>
      </section>
      <section className="section-padding section-alt-subtle">
        <div className="section-container">
          <h2 className="text-center text-3xl font-bold md:text-5xl">{c.how}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">{c.steps.map((step,index)=><article key={step} className="card-elevated p-6"><span className="text-sm font-bold text-primary">0{index+1}</span><p className="mt-3 leading-7 text-muted-foreground">{step}</p></article>)}</div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.features.map((feature,index)=>{const Icon=icons[index];return <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card/55 p-5"><Icon className="h-5 w-5 text-primary"/><span className="text-sm font-semibold">{feature}</span></div>})}</div>
        </div>
      </section>
    </PageLayout>
  </>;
};

export default Roomy;
