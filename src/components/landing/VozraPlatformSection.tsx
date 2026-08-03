import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Gauge,
  Mic,
  Hotel,
  Pizza,
  Settings2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SarahIntroDialog } from "@/components/landing/SarahIntroDialog";
import { productLinks } from "@/config/productLinks";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es: { eyebrow:"Ecosistema Vozra · Producto HydrAI Labs", title:"Un único cerebro. Productos especializados.", description:"Vozra, Vozra PID y Roomy conectan conversaciones, reglas del negocio, clientes y sistemas desde un único Control Center.", portal:"Ver portal cliente", talk:"Habla con Sarah", try:"Probar ahora", dashboard:"Abrir dashboard", learn:"Conocer la solución", memory:"Memoria del cliente", memoryDetail:"Contexto, preferencias e historial.", rules:"Reglas configurables", rulesDetail:"Cada negocio define su operación.", trace:"Trazabilidad", traceDetail:"Decisiones y acciones supervisables.", products:[
    {title:"Inteligencia conversacional para reservas",description:"Especializada en gestionar reservas de restaurante, consultas, cambios, cancelaciones, grupos y preferencias.",features:["Multilingüe","Múltiples llamadas simultáneas","Memoria a corto y largo plazo","Atención 24/7"]},
    {title:"Pedidos para recoger y a domicilio",description:"Especializada en tomar pedidos por teléfono, confirmar productos, extras, recogida o dirección de entrega y enviar el pedido estructurado.",features:["Multilingüe","Múltiples llamadas simultáneas","Memoria a corto y largo plazo","Atención 24/7"]},
    {title:"Room service para hoteles",description:"Especializada en atender al huésped, presentar la carta, confirmar pedidos y coordinar la entrega a la habitación.",features:["Multilingüe","Múltiples llamadas simultáneas","Memoria a corto y largo plazo","Atención 24/7"]},
    {title:"Configuración, supervisión y resultados",description:"Centraliza clientes, conversaciones, reservas, pedidos, permisos, integraciones y resultados.",features:["Operación multiempresa","Clientes y memoria","Portal de resultados","Usuarios y permisos"]}]},
  en: { eyebrow:"Vozra ecosystem · A HydrAI Labs product", title:"One intelligence core. Specialized products.", description:"Vozra, Vozra PID and Roomy connect conversations, business rules, customers and systems from one Control Center.", portal:"Open client portal", talk:"Talk to Sarah", try:"Try now", dashboard:"Open dashboard", learn:"Explore the solution", memory:"Customer memory", memoryDetail:"Context, preferences and history.", rules:"Configurable rules", rulesDetail:"Each business defines its operations.", trace:"Traceability", traceDetail:"Decisions and actions you can supervise.", products:[
    {title:"Conversational intelligence for bookings",description:"Specialized in restaurant bookings, enquiries, changes, cancellations, groups and preferences.",features:["Multilingual","Multiple concurrent calls","Short- and long-term memory","24/7 service"]},
    {title:"Pickup and delivery orders",description:"Specialized in taking phone orders, confirming products, extras, pickup or delivery details and sending a structured order.",features:["Multilingual","Multiple concurrent calls","Short- and long-term memory","24/7 service"]},
    {title:"Room service for hotels",description:"Specialized in assisting guests, presenting the menu, confirming orders and coordinating delivery to the room.",features:["Multilingual","Multiple concurrent calls","Short- and long-term memory","24/7 service"]},
    {title:"Configuration, supervision and results",description:"Centralizes customers, conversations, bookings, orders, permissions, integrations and results.",features:["Multi-business operations","Customers and memory","Results portal","Users and permissions"]}]},
  de: { eyebrow:"Vozra-Ökosystem · Ein HydrAI-Labs-Produkt", title:"Ein intelligenter Kern. Spezialisierte Produkte.", description:"Vozra, Vozra PID und Roomy verbinden Gespräche, Geschäftsregeln, Kunden und Systeme in einem Control Center.", portal:"Kundenportal öffnen", talk:"Mit Sarah sprechen", try:"Jetzt testen", dashboard:"Dashboard öffnen", learn:"Lösung entdecken", memory:"Kundengedächtnis", memoryDetail:"Kontext, Präferenzen und Verlauf.", rules:"Konfigurierbare Regeln", rulesDetail:"Jedes Unternehmen definiert seine Abläufe.", trace:"Nachvollziehbarkeit", traceDetail:"Überprüfbare Entscheidungen und Aktionen.", products:[
    {title:"Conversational Intelligence für Reservierungen",description:"Spezialisiert auf Restaurantreservierungen, Anfragen, Änderungen, Stornierungen, Gruppen und Präferenzen.",features:["Mehrsprachig","Mehrere gleichzeitige Anrufe","Kurz- und Langzeitgedächtnis","24/7-Service"]},
    {title:"Abhol- und Lieferbestellungen",description:"Spezialisiert auf telefonische Bestellungen, Produkte, Extras, Abholung oder Lieferadresse und strukturierte Übergabe.",features:["Mehrsprachig","Mehrere gleichzeitige Anrufe","Kurz- und Langzeitgedächtnis","24/7-Service"]},
    {title:"Roomservice für Hotels",description:"Spezialisiert auf Gästebetreuung, Menüpräsentation, Bestellbestätigung und Lieferung aufs Zimmer.",features:["Mehrsprachig","Mehrere gleichzeitige Anrufe","Kurz- und Langzeitgedächtnis","24/7-Service"]},
    {title:"Konfiguration, Kontrolle und Ergebnisse",description:"Zentralisiert Kunden, Gespräche, Reservierungen, Bestellungen, Rechte, Integrationen und Ergebnisse.",features:["Mehrbetriebsfähig","Kunden und Gedächtnis","Ergebnisportal","Benutzer und Rechte"]}]},
  ru: { eyebrow:"Экосистема Vozra · Продукт HydrAI Labs", title:"Единый интеллект. Специализированные продукты.", description:"Vozra, Vozra PID и Roomy объединяют разговоры, бизнес-правила, клиентов и системы в едином Control Center.", portal:"Открыть портал клиента", talk:"Поговорить с Сарой", try:"Попробовать", dashboard:"Открыть панель", learn:"Подробнее о решении", memory:"Память о клиенте", memoryDetail:"Контекст, предпочтения и история.", rules:"Настраиваемые правила", rulesDetail:"Каждый бизнес определяет свои процессы.", trace:"Прослеживаемость", traceDetail:"Контролируемые решения и действия.", products:[
    {title:"Разговорный ИИ для бронирований",description:"Специализирован на бронировании столиков, вопросах, изменениях, отменах, группах и предпочтениях гостей.",features:["Многоязычность","Несколько звонков одновременно","Краткосрочная и долгосрочная память","Обслуживание 24/7"]},
    {title:"Заказы на самовывоз и доставку",description:"Специализирован на телефонных заказах, подтверждении блюд и дополнений, самовывозе или адресе доставки и структурированной передаче заказа.",features:["Многоязычность","Несколько звонков одновременно","Краткосрочная и долгосрочная память","Обслуживание 24/7"]},
    {title:"Room service для отелей",description:"Специализирован на обслуживании гостей, показе меню, подтверждении заказа и доставке в номер.",features:["Многоязычность","Несколько звонков одновременно","Краткосрочная и долгосрочная память","Обслуживание 24/7"]},
    {title:"Настройка, контроль и результаты",description:"Объединяет клиентов, разговоры, бронирования, заказы, права, интеграции и результаты.",features:["Несколько компаний","Клиенты и память","Портал результатов","Пользователи и права"]}]},
} as const;

const products = [
  {
    name: "Vozra",
    title: "Reservas y atención inteligente",
    description: "Gestiona consultas, solicitudes de reserva, cambios, grupos, preferencias y excepciones operativas.",
    icon: CalendarDays,
    features: ["Atención telefónica", "Reservas y cambios", "Grupos y preferencias", "Restricciones alimentarias"],
    tone: "primary",
    href: "/restaurantes-ia-reservas-whatsapp-costa-del-sol",
    kind: "internal",
  },
  {
    name: "Vozra PID",
    title: "Pedidos Inteligentes Directos",
    description: "Recoge pedidos por teléfono, confirma productos y extras y entrega la información estructurada al negocio.",
    icon: Pizza,
    features: ["Carta y precios", "Extras y modificadores", "Recogida o entrega", "Confirmación del pedido"],
    tone: "success",
    href: "/vozra-pid",
    kind: "internal",
  },
  {
    name: "Roomy",
    title: "Room service para hoteles",
    description: "Atiende al huésped, presenta la carta, confirma el pedido y coordina la entrega a la habitación.",
    icon: Hotel,
    features: ["Multilingüe", "Múltiples llamadas simultáneas", "Memoria a corto y largo plazo", "Atención 24/7"],
    tone: "primary",
    href: "/roomy",
    kind: "internal",
  },
  {
    name: "Vozra Control Center",
    title: "Configuración, supervisión y resultados",
    description: "Centraliza implementaciones, clientes, conversaciones, reservas, pedidos, permisos, integraciones y resultados.",
    icon: Gauge,
    features: ["Operación multiempresa", "Clientes y memoria", "Portal de resultados", "Usuarios y permisos"],
    tone: "secondary",
    href: productLinks.vozraApp,
    kind: "external",
  },
] as const;

export const VozraPlatformSection = () => {
  const { language } = useTranslation();
  const copy = COPY[language as keyof typeof COPY] ?? COPY.es;
  const localizedProducts = products.map((product, index) => ({ ...product, ...copy.products[index] }));
  return (
  <section id="vozra" className="section-padding relative overflow-hidden" aria-labelledby="vozra-platform-title">
    <div className="absolute inset-0 bg-grid-hydrai opacity-55" aria-hidden />
    <div className="section-container relative z-10">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Settings2 className="h-4 w-4" />
            {copy.eyebrow}
          </div>
          <h2 id="vozra-platform-title" className="text-3xl font-bold md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            {copy.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={productLinks.vozraPortal} target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full border-white/15 bg-background/55 sm:w-auto">
              {copy.portal}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <SarahIntroDialog
            trigger={
              <Button className="btn-neon btn-depth w-full sm:w-auto">
                <Mic className="mr-2 h-4 w-4" />
                {copy.talk}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {localizedProducts.map((product) => {
          const Icon = product.icon;
          const toneClasses = {
            primary: "border-primary/25 bg-primary/10 text-primary",
            success: "border-success/25 bg-success/10 text-success",
            secondary: "border-secondary/25 bg-secondary/10 text-secondary",
          }[product.tone];

          const content = (
            <>
              {product.name === "Vozra" ? (
                <div className="flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/75 px-4">
                  <img src="/brand/vozra/vozra-logo-official.svg" alt="Vozra — inteligencia conversacional para reservas" className="h-24 w-full object-contain" />
                </div>
              ) : product.name === "Vozra PID" ? (
                <div className="flex h-24 items-center overflow-hidden rounded-2xl border border-white/10 bg-black/75 px-4">
                  <img src="/brand/vozra-pid/vozra-pid-logo.webp" alt="Vozra PID" width={256} height={256} loading="lazy" decoding="async" className="h-20 w-full object-contain" />
                </div>
              ) : product.name === "Roomy" ? (
                <div className="flex h-24 items-center overflow-hidden rounded-2xl border border-white/10 bg-black/75 px-4">
                  <img src="/brand/roomy/roomy-logo.webp" alt="Roomy — Room Service Inteligente" width={256} height={256} loading="lazy" decoding="async" className="h-24 w-full object-contain" />
                </div>
              ) : (
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${toneClasses}`}>
                  <Icon className="h-7 w-7" />
                </div>
              )}
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{product.name}</p>
              <h3 className="mt-2 text-2xl font-bold">{product.title}</h3>
              <p className="mt-4 min-h-[84px] leading-7 text-muted-foreground">{product.description}</p>
              <ul className="mt-6 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-primary">
                {(product.kind as string) === "sarah" ? copy.try : product.kind === "external" ? copy.dashboard : copy.learn}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </>
          );

          if ((product.kind as string) === "sarah") {
            return (
              <SarahIntroDialog
                key={product.name}
                trigger={
                  <button type="button" className="card-elevated card-elevated-hover block w-full p-7 text-left">
                    {content}
                  </button>
                }
              />
            );
          }

          if (product.kind === "external") {
            return (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="card-elevated card-elevated-hover block p-7"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={product.name} to={product.href} className="card-elevated card-elevated-hover block p-7">
              {content}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-card/55 p-6 backdrop-blur-xl md:grid-cols-3 md:p-8">
        <div className="flex items-center gap-3">
          <UsersRound className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">{copy.memory}</p>
            <p className="text-xs text-muted-foreground">{copy.memoryDetail}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Settings2 className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">{copy.rules}</p>
            <p className="text-xs text-muted-foreground">{copy.rulesDetail}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Gauge className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">{copy.trace}</p>
            <p className="text-xs text-muted-foreground">{copy.traceDetail}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
