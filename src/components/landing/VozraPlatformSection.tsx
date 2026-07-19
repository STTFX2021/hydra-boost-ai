import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Gauge,
  Mic,
  Pizza,
  Settings2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SarahIntroDialog } from "@/components/landing/SarahIntroDialog";
import { VozraRapidLogo } from "@/components/brand/VozraRapidLogo";
import { productLinks } from "@/config/productLinks";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es: { eyebrow:"Ecosistema Vozra · Producto HydrAI Labs", title:"Un único cerebro. Productos especializados.", description:"Vozra y Vozra PID conectan conversaciones, reglas del negocio, clientes y sistemas desde un único Control Center.", portal:"Ver portal cliente", talk:"Habla con Sarah", try:"Probar ahora", dashboard:"Abrir dashboard", learn:"Conocer la solución", memory:"Memoria del cliente", memoryDetail:"Contexto, preferencias e historial.", rules:"Reglas configurables", rulesDetail:"Cada negocio define su operación.", trace:"Trazabilidad", traceDetail:"Decisiones y acciones supervisables.", products:[
    {title:"Reservas y atención inteligente",description:"Gestiona consultas, reservas, cambios, grupos, preferencias y excepciones operativas.",features:["Atención telefónica","Reservas y cambios","Grupos y preferencias","Restricciones alimentarias"]},
    {title:"Pedidos Inteligentes Directos",description:"Recoge pedidos por teléfono, confirma productos y extras y entrega la información estructurada al negocio.",features:["Carta y precios","Extras y modificadores","Recogida o entrega","Confirmación del pedido"]},
    {title:"Configuración, supervisión y resultados",description:"Centraliza clientes, conversaciones, reservas, pedidos, permisos, integraciones y resultados.",features:["Operación multiempresa","Clientes y memoria","Portal de resultados","Usuarios y permisos"]}]},
  en: { eyebrow:"Vozra ecosystem · A HydrAI Labs product", title:"One intelligence core. Specialized products.", description:"Vozra and Vozra PID connect conversations, business rules, customers and systems from one Control Center.", portal:"Open client portal", talk:"Talk to Sarah", try:"Try now", dashboard:"Open dashboard", learn:"Explore the solution", memory:"Customer memory", memoryDetail:"Context, preferences and history.", rules:"Configurable rules", rulesDetail:"Each business defines its operations.", trace:"Traceability", traceDetail:"Decisions and actions you can supervise.", products:[
    {title:"Smart bookings and customer service",description:"Handles enquiries, bookings, changes, groups, preferences and operational exceptions.",features:["Phone support","Bookings and changes","Groups and preferences","Dietary restrictions"]},
    {title:"Direct Intelligent Orders",description:"Takes phone orders, confirms products and extras, and delivers structured information to the business.",features:["Menu and prices","Extras and modifiers","Pickup or delivery","Order confirmation"]},
    {title:"Configuration, supervision and results",description:"Centralizes customers, conversations, bookings, orders, permissions, integrations and results.",features:["Multi-business operations","Customers and memory","Results portal","Users and permissions"]}]},
  de: { eyebrow:"Vozra-Ökosystem · Ein HydrAI-Labs-Produkt", title:"Ein intelligenter Kern. Spezialisierte Produkte.", description:"Vozra und Vozra PID verbinden Gespräche, Geschäftsregeln, Kunden und Systeme in einem Control Center.", portal:"Kundenportal öffnen", talk:"Mit Sarah sprechen", try:"Jetzt testen", dashboard:"Dashboard öffnen", learn:"Lösung entdecken", memory:"Kundengedächtnis", memoryDetail:"Kontext, Präferenzen und Verlauf.", rules:"Konfigurierbare Regeln", rulesDetail:"Jedes Unternehmen definiert seine Abläufe.", trace:"Nachvollziehbarkeit", traceDetail:"Überprüfbare Entscheidungen und Aktionen.", products:[
    {title:"Intelligente Reservierungen und Betreuung",description:"Bearbeitet Anfragen, Reservierungen, Änderungen, Gruppen, Präferenzen und operative Ausnahmen.",features:["Telefonservice","Reservierungen und Änderungen","Gruppen und Präferenzen","Ernährungseinschränkungen"]},
    {title:"Direkte intelligente Bestellungen",description:"Nimmt telefonische Bestellungen auf und übermittelt strukturierte Daten an den Betrieb.",features:["Speisekarte und Preise","Extras und Optionen","Abholung oder Lieferung","Bestellbestätigung"]},
    {title:"Konfiguration, Kontrolle und Ergebnisse",description:"Zentralisiert Kunden, Gespräche, Reservierungen, Bestellungen, Rechte, Integrationen und Ergebnisse.",features:["Mehrbetriebsfähig","Kunden und Gedächtnis","Ergebnisportal","Benutzer und Rechte"]}]},
  ru: { eyebrow:"Экосистема Vozra · Продукт HydrAI Labs", title:"Единый интеллект. Специализированные продукты.", description:"Vozra и Vozra PID объединяют разговоры, бизнес-правила, клиентов и системы в едином Control Center.", portal:"Открыть портал клиента", talk:"Поговорить с Сарой", try:"Попробовать", dashboard:"Открыть панель", learn:"Подробнее о решении", memory:"Память о клиенте", memoryDetail:"Контекст, предпочтения и история.", rules:"Настраиваемые правила", rulesDetail:"Каждый бизнес определяет свои процессы.", trace:"Прослеживаемость", traceDetail:"Контролируемые решения и действия.", products:[
    {title:"Умные бронирования и обслуживание",description:"Обрабатывает вопросы, бронирования, изменения, группы, предпочтения и исключения.",features:["Телефонное обслуживание","Бронирования и изменения","Группы и предпочтения","Пищевые ограничения"]},
    {title:"Прямые интеллектуальные заказы",description:"Принимает заказы по телефону и передаёт бизнесу структурированные данные.",features:["Меню и цены","Дополнения и модификаторы","Самовывоз или доставка","Подтверждение заказа"]},
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

      <div className="grid gap-6 lg:grid-cols-3">
        {localizedProducts.map((product) => {
          const Icon = product.icon;
          const toneClasses = {
            primary: "border-primary/25 bg-primary/10 text-primary",
            success: "border-success/25 bg-success/10 text-success",
            secondary: "border-secondary/25 bg-secondary/10 text-secondary",
          }[product.tone];

          const content = (
            <>
              {product.name === "Vozra PID" ? (
                <div className="flex h-24 items-center overflow-hidden rounded-2xl border border-white/10 bg-black/75 px-4">
                  <VozraRapidLogo className="h-20 w-full" />
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

          if (product.kind === "sarah") {
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
