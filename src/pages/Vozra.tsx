import { Link } from "react-router-dom";
import { ArrowRight, Brain, CalendarCheck, Clock3, Gauge, Languages, PhoneCall, ShoppingBag } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { SEOHead, BreadcrumbSchema, ServiceSchema } from "@/components/seo";
import { useTranslation } from "@/lib/i18n";

const COPY = {
  es: {
    seo: "Vozra | Inteligencia conversacional para reservas en restaurantes",
    description: "Vozra atiende llamadas y gestiona solicitudes de reserva, cambios y cancelaciones para restaurantes, con memoria, reglas operativas y supervisión humana.",
    keywords: "Vozra, reservas restaurantes IA, agente de voz restaurantes, inteligencia conversacional hostelería",
    home: "Inicio", badge: "Inteligencia conversacional para restaurantes",
    titleBefore: "Reservas conectadas con la", titleAccent: "operación real", titleAfter: "de tu restaurante.",
    lead: "Vozra atiende llamadas, comprende la solicitud, aplica las reglas del restaurante y mantiene el contexto hasta completar o derivar la gestión.",
    demo: "Solicitar una demo", pidCta: "Conocer Vozra PID",
    cardTitle: "Especializada en reservas de restaurantes",
    benefits: ["Atiende en varios idiomas y múltiples llamadas simultáneas.", "Mantiene memoria a corto y largo plazo.", "Opera 24/7 con políticas, validaciones y escalado humano.", "Gestiona solicitudes de reserva, cambios y cancelaciones."],
    platform: "Un núcleo común. Soluciones especializadas.", modules: "Cada producto resuelve una operación concreta sin perder memoria, reglas ni trazabilidad.",
    view: "Ver solución",
    products: [
      { title: "Vozra", description: "Inteligencia conversacional especializada en reservas para restaurantes: consultas, solicitudes, cambios y cancelaciones.", to: "/vozra", icon: CalendarCheck },
      { title: "Vozra PID", description: "Agente especializado en pedidos para recoger y a domicilio, con carta, extras, confirmación y envío estructurado.", to: "/vozra-pid", icon: ShoppingBag },
      { title: "Vozra Control Center", description: "Configuración y supervisión de clientes, horarios, políticas, reservas, pedidos y trazabilidad desde un único panel.", to: "/contacto?motivo=control-center", icon: Gauge },
    ],
  },
  en: {
    seo: "Vozra | Conversational intelligence for restaurant reservations",
    description: "Vozra answers calls and handles restaurant reservation requests, changes and cancellations with memory, operating rules and human oversight.",
    keywords: "Vozra, AI restaurant reservations, restaurant voice agent, hospitality conversational intelligence",
    home: "Home", badge: "Conversational intelligence for restaurants",
    titleBefore: "Reservations connected to the", titleAccent: "real operations", titleAfter: "of your restaurant.",
    lead: "Vozra answers calls, understands each request, applies the restaurant's rules and preserves context until the request is completed or handed over.",
    demo: "Request a demo", pidCta: "Explore Vozra PID",
    cardTitle: "Specialized in restaurant reservations",
    benefits: ["Serves customers in multiple languages and handles concurrent calls.", "Maintains short- and long-term memory.", "Operates 24/7 with policies, validations and human escalation.", "Handles reservation requests, changes and cancellations."],
    platform: "One shared core. Specialized solutions.", modules: "Each product solves a specific operation while preserving memory, rules and traceability.",
    view: "View solution",
    products: [
      { title: "Vozra", description: "Conversational intelligence specialized in restaurant reservations: enquiries, requests, changes and cancellations.", to: "/vozra", icon: CalendarCheck },
      { title: "Vozra PID", description: "An agent specialized in pickup and delivery orders, including menus, extras, confirmation and structured delivery.", to: "/vozra-pid", icon: ShoppingBag },
      { title: "Vozra Control Center", description: "Configure and supervise customers, hours, policies, reservations, orders and traceability from one dashboard.", to: "/contacto?motivo=control-center", icon: Gauge },
    ],
  },
  de: {
    seo: "Vozra | Conversational Intelligence für Restaurantreservierungen",
    description: "Vozra nimmt Anrufe entgegen und bearbeitet Reservierungsanfragen, Änderungen und Stornierungen mit Gedächtnis, Betriebsregeln und menschlicher Aufsicht.",
    keywords: "Vozra, KI Restaurantreservierungen, Sprachassistent Restaurant, Conversational Intelligence Gastronomie",
    home: "Startseite", badge: "Conversational Intelligence für Restaurants",
    titleBefore: "Reservierungen, verbunden mit dem", titleAccent: "realen Betrieb", titleAfter: "Ihres Restaurants.",
    lead: "Vozra nimmt Anrufe entgegen, versteht die Anfrage, wendet die Regeln des Restaurants an und behält den Kontext bis zum Abschluss oder zur Übergabe bei.",
    demo: "Demo anfragen", pidCta: "Vozra PID entdecken",
    cardTitle: "Spezialisiert auf Restaurantreservierungen",
    benefits: ["Bedient Gäste mehrsprachig und bearbeitet mehrere Anrufe gleichzeitig.", "Verfügt über Kurz- und Langzeitgedächtnis.", "Arbeitet rund um die Uhr mit Regeln, Prüfungen und menschlicher Eskalation.", "Bearbeitet Reservierungsanfragen, Änderungen und Stornierungen."],
    platform: "Ein gemeinsamer Kern. Spezialisierte Lösungen.", modules: "Jedes Produkt löst einen konkreten Ablauf und behält dabei Gedächtnis, Regeln und Nachvollziehbarkeit.",
    view: "Lösung ansehen",
    products: [
      { title: "Vozra", description: "Conversational Intelligence für Restaurantreservierungen: Auskünfte, Anfragen, Änderungen und Stornierungen.", to: "/vozra", icon: CalendarCheck },
      { title: "Vozra PID", description: "Spezialisiert auf Abhol- und Lieferbestellungen mit Speisekarte, Extras, Bestätigung und strukturierter Übergabe.", to: "/vozra-pid", icon: ShoppingBag },
      { title: "Vozra Control Center", description: "Kunden, Zeiten, Richtlinien, Reservierungen, Bestellungen und Nachvollziehbarkeit zentral konfigurieren und überwachen.", to: "/contacto?motivo=control-center", icon: Gauge },
    ],
  },
  ru: {
    seo: "Vozra | Разговорный ИИ для бронирования столиков",
    description: "Vozra принимает звонки и обрабатывает запросы на бронирование, изменения и отмены с памятью, рабочими правилами и контролем человека.",
    keywords: "Vozra, ИИ бронирование ресторанов, голосовой агент ресторана, разговорный ИИ",
    home: "Главная", badge: "Разговорный ИИ для ресторанов",
    titleBefore: "Бронирования, связанные с", titleAccent: "реальной работой", titleAfter: "вашего ресторана.",
    lead: "Vozra принимает звонки, понимает запрос, применяет правила ресторана и сохраняет контекст до завершения или передачи сотруднику.",
    demo: "Запросить демо", pidCta: "Узнать о Vozra PID",
    cardTitle: "Специализация — бронирование в ресторанах",
    benefits: ["Обслуживает на разных языках и одновременно принимает несколько звонков.", "Использует краткосрочную и долгосрочную память.", "Работает 24/7 с правилами, проверками и передачей человеку.", "Обрабатывает запросы на бронирование, изменения и отмены."],
    platform: "Единое ядро. Специализированные решения.", modules: "Каждый продукт решает конкретную задачу, сохраняя память, правила и прослеживаемость.",
    view: "Открыть решение",
    products: [
      { title: "Vozra", description: "Разговорный ИИ для бронирования в ресторанах: вопросы, заявки, изменения и отмены.", to: "/vozra", icon: CalendarCheck },
      { title: "Vozra PID", description: "Агент для заказов навынос и с доставкой: меню, дополнения, подтверждение и структурированная передача.", to: "/vozra-pid", icon: ShoppingBag },
      { title: "Vozra Control Center", description: "Единая панель для настройки и контроля клиентов, расписаний, политик, бронирований, заказов и истории действий.", to: "/contacto?motivo=control-center", icon: Gauge },
    ],
  },
} as const;

const benefitIcons = [Languages, Brain, Clock3, PhoneCall];

export default function Vozra() {
  const { language } = useTranslation();
  const c = COPY[language as keyof typeof COPY] ?? COPY.es;

  return (
    <>
      <SEOHead title={c.seo} description={c.description} canonical="/vozra" keywords={c.keywords} />
      <ServiceSchema name="Vozra" description={c.description} url="/vozra" />
      <BreadcrumbSchema items={[{ name: c.home, url: "/" }, { name: "Vozra", url: "/vozra" }]} />
      <PageLayout>
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid opacity-[0.03]" />
          <div className="section-container relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="badge-primary mb-6 inline-flex">{c.badge}</span>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">{c.titleBefore} <span className="text-gradient-hydrai">{c.titleAccent}</span> {c.titleAfter}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">{c.lead}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto?motivo=demo-vozra"><Button size="lg" className="btn-neon px-8">{c.demo}<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                <Link to="/vozra-pid"><Button size="lg" variant="outline" className="btn-outline-neon px-8">{c.pidCta}</Button></Link>
              </div>
            </div>
            <div className="card-premium p-8">
              <img src="/brand/vozra/vozra-logo-official.svg" alt="Vozra" className="mb-7 h-28 w-auto max-w-full object-contain object-left" />
              <h2 className="text-2xl font-display font-bold mb-6">{c.cardTitle}</h2>
              <div className="space-y-4 text-sm text-muted-foreground">{c.benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <div key={benefit} className="flex gap-3"><Icon className="h-5 w-5 text-primary shrink-0" />{benefit}</div>; })}</div>
            </div>
          </div>
        </section>
        <section className="section-padding bg-muted/10">
          <div className="section-container">
            <div className="max-w-3xl mb-12"><h2 className="text-3xl md:text-5xl font-display font-bold">{c.platform}</h2><p className="mt-5 text-lg text-muted-foreground">{c.modules}</p></div>
            <div className="grid gap-6 md:grid-cols-3">{c.products.map(({ title, description, icon: Icon, to }) => <Link key={title} to={to} className="card-premium group p-7 hover:border-primary/40 transition-colors"><div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5"><Icon className="h-6 w-6 text-primary" /></div><h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3><p className="text-sm text-muted-foreground mb-5">{description}</p><span className="inline-flex items-center text-sm font-medium text-primary">{c.view}<ArrowRight className="ml-2 h-4 w-4" /></span></Link>)}</div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
