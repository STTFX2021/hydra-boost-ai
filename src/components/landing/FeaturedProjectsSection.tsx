import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  HeartPulse,
  Pizza,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";
import { useTranslation } from "@/lib/i18n";

const COPY={es:{eyebrow:"Proyectos destacados",title:"{copy.title}",description:"Diferenciamos con claridad producto propio, implementación y demostración funcional.",all:"{copy.all}",view:"{copy.view}",items:[["Inteligencia conversacional","Plataforma propia para atención, reservas, pedidos, memoria y lógica operacional.","Producto propio"],["Pedidos telefónicos","Demostración conversacional de Sarah para pedidos inteligentes directos.","Producto propio"],["Hostelería","Carta digital, personalización de productos y sistema de pedidos para restauración.","Implementación web"],["Hostelería","Experiencia digital para reservas, carta, maridajes y pedidos desde mesa.","Demo funcional"],["Inmobiliaria","Portal inmobiliario con búsqueda avanzada, captación y herramientas de cualificación.","Demo funcional"],["Belleza y salud","Web de captación, servicios, reservas y chatbot especializado.","Demo funcional"]]},
en:{eyebrow:"Featured projects",title:"Products, implementations and demos you can explore now.",description:"We clearly distinguish our own products, client implementations and functional demos.",all:"View all projects",view:"View project",items:[["Conversational intelligence","Our platform for customer service, bookings, orders, memory and operational logic.","Own product"],["Phone orders","Sarah conversational demo for direct intelligent orders.","Own product"],["Hospitality","Digital menu, product customization and restaurant ordering system.","Web implementation"],["Hospitality","Digital experience for bookings, menu, pairings and table ordering.","Functional demo"],["Real estate","Property portal with advanced search, acquisition and qualification tools.","Functional demo"],["Beauty and health","Lead-generation website, services, bookings and specialized chatbot.","Functional demo"]]},
de:{eyebrow:"Ausgewählte Projekte",title:"Produkte, Implementierungen und Demos, die Sie jetzt erkunden können.",description:"Wir unterscheiden klar zwischen eigenen Produkten, Kundenimplementierungen und funktionalen Demos.",all:"Alle Projekte ansehen",view:"Projekt ansehen",items:[["Conversational Intelligence","Eigene Plattform für Betreuung, Reservierungen, Bestellungen, Gedächtnis und operative Logik.","Eigenes Produkt"],["Telefonbestellungen","Sarah-Demo für direkte intelligente Bestellungen.","Eigenes Produkt"],["Gastronomie","Digitale Karte, Produktanpassung und Bestellsystem für Restaurants.","Webimplementierung"],["Gastronomie","Digitale Erfahrung für Reservierungen, Karte, Pairings und Tischbestellungen.","Funktionale Demo"],["Immobilien","Immobilienportal mit erweiterter Suche, Akquise und Qualifizierung.","Funktionale Demo"],["Beauty und Gesundheit","Website für Akquise, Leistungen, Reservierungen und spezialisierten Chatbot.","Funktionale Demo"]]},
ru:{eyebrow:"Избранные проекты",title:"Продукты, внедрения и демо, которые уже можно посмотреть.",description:"Мы чётко разделяем собственные продукты, клиентские внедрения и функциональные демонстрации.",all:"Все проекты",view:"Посмотреть проект",items:[["Разговорный ИИ","Собственная платформа для обслуживания, бронирований, заказов, памяти и операционной логики.","Собственный продукт"],["Телефонные заказы","Демонстрация Сары для прямых интеллектуальных заказов.","Собственный продукт"],["Гостеприимство","Цифровое меню, настройка блюд и система заказов для ресторана.","Веб-внедрение"],["Гостеприимство","Цифровой опыт для бронирований, меню, сочетаний и заказов за столом.","Функциональное демо"],["Недвижимость","Портал недвижимости с расширенным поиском, привлечением и квалификацией.","Функциональное демо"],["Красота и здоровье","Сайт для привлечения, услуг, бронирований и специализированный чатбот.","Функциональное демо"]]}} as const;

const featuredProjects = [
  {
    title: "Vozra",
    sector: "Inteligencia conversacional",
    description: "Plataforma propia para atención, reservas, pedidos, memoria y lógica operacional.",
    status: "Producto propio",
    icon: Bot,
    href: "/arquitectura",
    external: false,
  },
  {
    title: "Vozra PID",
    sector: "Pedidos telefónicos",
    description: "Demostración conversacional de Sarah para pedidos inteligentes directos.",
    status: "Producto propio",
    icon: Pizza,
    href: VOZRA_RAPID_DEMOS.sarah.url,
    external: true,
  },
  {
    title: "La Locanda",
    sector: "Hostelería",
    description: "Carta digital, personalización de productos y sistema de pedidos para restauración.",
    status: "Implementación web",
    icon: UtensilsCrossed,
    href: "https://locanda-connect.lovable.app",
    external: true,
  },
  {
    title: "La Cruz Tapas",
    sector: "Hostelería",
    description: "Experiencia digital para reservas, carta, maridajes y pedidos desde mesa.",
    status: "Demo funcional",
    icon: UtensilsCrossed,
    href: "https://cruzatapas-digital-chic.lovable.app/",
    external: true,
  },
  {
    title: "Tu Hogar 21",
    sector: "Inmobiliaria",
    description: "Portal inmobiliario con búsqueda avanzada, captación y herramientas de cualificación.",
    status: "Demo funcional",
    icon: Building2,
    href: "https://tu-hogar-21-nextgen.lovable.app",
    external: true,
  },
  {
    title: "Vitality Hub",
    sector: "Belleza y salud",
    description: "Web de captación, servicios, reservas y chatbot especializado con enfoque responsable.",
    status: "Demo funcional",
    icon: HeartPulse,
    href: "https://body-harmony-leads.lovable.app",
    external: true,
  },
] as const;

export const FeaturedProjectsSection = () => { const {language}=useTranslation(); const copy=COPY[language as keyof typeof COPY]??COPY.es; const localized=featuredProjects.map((p,i)=>({...p,sector:copy.items[i][0],description:copy.items[i][1],status:copy.items[i][2]})); return (
  <section id="proyectos" className="section-padding section-alt-subtle" aria-labelledby="featured-projects-title">
    <div className="section-container">
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
          <h2 id="featured-projects-title" className="text-3xl font-bold md:text-5xl">
            Productos, implementaciones y demostraciones que ya puedes explorar.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            {copy.description}
          </p>
        </div>

        <Link to="/casos">
          <Button variant="outline" className="w-full lg:w-auto">
            Ver todos los proyectos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {localized.map((project) => {
          const Icon = project.icon;
          const card = (
            <article className="card-elevated card-elevated-hover group h-full overflow-hidden p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {project.status}
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.sector}</p>
              <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-muted-foreground">{project.description}</p>

              <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-5 text-sm font-semibold text-primary">
                Ver proyecto
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          );

          return project.external ? (
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer">
              {card}
            </a>
          ) : (
            <Link key={project.title} to={project.href}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  </section>
); };
