import { ArrowRight, CheckCircle2, Mic, PhoneCall, ShoppingBag, Languages, Send } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, ServiceSchema, BreadcrumbSchema } from "@/components/seo";
import { SarahIntroDialog } from "@/components/landing/SarahIntroDialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es:{ title:"Vozra PID: pedidos telefónicos inteligentes y directos", description:"Agente de voz multilingüe para restaurantes que atiende llamadas, comprende el pedido, confirma productos y extras y envía un resumen estructurado al negocio.", badge:"Pedidos Inteligentes Directos", lead:"Convierte cada llamada en un pedido claro, confirmado y preparado para cocina.", demo:"Probar la demo con Sarah", whatsapp:"Hablar por WhatsApp", how:"De la conversación al pedido", steps:["Atiende varias llamadas y conversa en el idioma del cliente.","Consulta carta, precios, tamaños, extras y modificadores.","Confirma recogida o entrega y recopila los datos necesarios.","Repite el pedido, solicita confirmación y lo envía estructurado."], features:["Atención telefónica simultánea","Conversación multilingüe","Carta y precios configurables","Extras y modificadores","Recogida o entrega","Resumen directo al teléfono del negocio"], seo:"Vozra PID | Pedidos telefónicos con inteligencia conversacional"},
  en:{ title:"Vozra PID: intelligent direct phone orders", description:"Multilingual voice agent for restaurants that answers calls, understands orders, confirms products and extras, and sends a structured summary to the business.", badge:"Direct Intelligent Orders", lead:"Turn every call into a clear, confirmed order ready for the kitchen.", demo:"Try the Sarah demo", whatsapp:"Talk on WhatsApp", how:"From conversation to order", steps:["Handles concurrent calls in the customer's language.","Checks the menu, prices, sizes, extras and modifiers.","Confirms pickup or delivery and collects the required details.","Repeats the order, requests confirmation and sends structured data."], features:["Concurrent phone service","Multilingual conversation","Configurable menu and prices","Extras and modifiers","Pickup or delivery","Direct summary to the business phone"], seo:"Vozra PID | Conversational AI for phone orders"},
  de:{ title:"Vozra PID: intelligente direkte Telefonbestellungen", description:"Mehrsprachiger Sprachagent für Restaurants, der Anrufe beantwortet, Bestellungen versteht, Produkte und Extras bestätigt und eine strukturierte Zusammenfassung sendet.", badge:"Direkte intelligente Bestellungen", lead:"Verwandeln Sie jeden Anruf in eine klare, bestätigte und küchenfertige Bestellung.", demo:"Sarah-Demo testen", whatsapp:"Über WhatsApp sprechen", how:"Vom Gespräch zur Bestellung", steps:["Bearbeitet mehrere Anrufe in der Sprache des Kunden.","Prüft Speisekarte, Preise, Größen, Extras und Optionen.","Bestätigt Abholung oder Lieferung und erfasst die nötigen Daten.","Wiederholt die Bestellung, holt die Bestätigung ein und sendet strukturierte Daten."], features:["Parallele Telefonbetreuung","Mehrsprachige Gespräche","Konfigurierbare Karte und Preise","Extras und Optionen","Abholung oder Lieferung","Direkte Zusammenfassung an den Betrieb"], seo:"Vozra PID | Intelligente Telefonbestellungen"},
  ru:{ title:"Vozra PID: интеллектуальные прямые заказы по телефону", description:"Многоязычный голосовой агент для ресторанов: отвечает на звонки, понимает заказ, подтверждает позиции и дополнения и отправляет бизнесу структурированное резюме.", badge:"Прямые интеллектуальные заказы", lead:"Превращает каждый звонок в понятный, подтверждённый и готовый для кухни заказ.", demo:"Попробовать демо с Сарой", whatsapp:"Написать в WhatsApp", how:"От разговора к заказу", steps:["Одновременно обрабатывает звонки на языке клиента.","Проверяет меню, цены, размеры, дополнения и модификаторы.","Уточняет самовывоз или доставку и собирает нужные данные.","Повторяет заказ, получает подтверждение и отправляет структуру."], features:["Одновременная обработка звонков","Многоязычный разговор","Настраиваемые меню и цены","Дополнения и модификаторы","Самовывоз или доставка","Резюме прямо на телефон бизнеса"], seo:"Vozra PID | Интеллектуальные телефонные заказы"},
} as const;

const featureIcons = [PhoneCall, Languages, ShoppingBag, CheckCircle2, Send, Mic];

const VozraPID = () => {
  const { language } = useTranslation();
  const c = COPY[language as keyof typeof COPY] ?? COPY.es;
  return <>
    <SEOHead title={c.seo} description={c.description} canonical="/vozra-pid" keywords="Vozra PID, pedidos telefónicos IA, agente de voz para restaurantes, pedidos inteligentes directos" />
    <ServiceSchema name="Vozra PID" description={c.description} url="/vozra-pid" />
    <BreadcrumbSchema items={[{name:"HydrAI Labs",url:"/"},{name:"Vozra PID",url:"/vozra-pid"}]} />
    <PageLayout>
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 bg-grid-hydrai opacity-50" />
        <div className="section-container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{c.badge}</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">{c.title}</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{c.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SarahIntroDialog trigger={<Button size="lg" className="btn-neon btn-depth"><Mic className="mr-2 h-5 w-5"/>{c.demo}<ArrowRight className="ml-2 h-5 w-5"/></Button>} />
                <a href="https://wa.me/34634425921" target="_blank" rel="noreferrer"><Button size="lg" variant="outline" className="w-full">{c.whatsapp}</Button></a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-black p-8 shadow-2xl shadow-black/60">
              <img src="/brand/vozra-pid/vozra-pid-logo.png" alt="Vozra PID — Pedidos Inteligentes Directos" className="mx-auto w-full max-w-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt-subtle">
        <div className="section-container">
          <h2 className="text-center text-3xl font-bold md:text-5xl">{c.how}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {c.steps.map((step,index)=><article key={step} className="card-elevated p-6"><span className="text-sm font-bold text-primary">0{index+1}</span><p className="mt-3 leading-7 text-muted-foreground">{step}</p></article>)}
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((feature,index)=>{const Icon=featureIcons[index];return <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card/55 p-5"><Icon className="h-5 w-5 text-primary"/><span className="text-sm font-semibold">{feature}</span></div>})}
          </div>
        </div>
      </section>
    </PageLayout>
  </>;
};
export default VozraPID;
