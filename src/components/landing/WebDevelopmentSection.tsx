import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

const COPY={es:{eyebrow:"{copy.eyebrow}",title:"{copy.title}",description:"Diseñamos webs, aplicaciones y paneles conectados con la operación real de tu empresa. Construimos el sistema que capta, organiza y mueve el trabajo.",bullets:["Diseño responsive y optimizado para conversión","SEO técnico y estructura escalable","Conexión con formularios, CRM, reservas y pedidos","Automatizaciones y agentes integrados desde el inicio"],projects:"{copy.projects}",contact:"{copy.contact}",connected:"{copy.connected}",connectedDetail:"{copy.connectedDetail}",items:[["Webs corporativas","Posicionamiento, captación y conversión."],["E-commerce","Catálogo, pedidos y pagos."],["Aplicaciones y paneles","Herramientas internas y control operativo."],["Integraciones","Datos, CRM, automatizaciones y APIs."]]},
en:{eyebrow:"Business-focused web development",title:"The digital infrastructure that turns conversations into results.",description:"We design websites, applications and dashboards connected to your real operations. We build the system that captures, organizes and moves work.",bullets:["Responsive design optimized for conversion","Technical SEO and scalable structure","Connection to forms, CRM, bookings and orders","Automations and agents integrated from the start"],projects:"View projects",contact:"Tell us about your project",connected:"Everything connected",connectedDetail:"Web, conversation, data and automation in one architecture.",items:[["Corporate websites","Positioning, acquisition and conversion."],["E-commerce","Catalog, orders and payments."],["Applications and dashboards","Internal tools and operational control."],["Integrations","Data, CRM, automations and APIs."]]},
de:{eyebrow:"Geschäftsorientierte Webentwicklung",title:"Die digitale Infrastruktur, die Gespräche in Ergebnisse verwandelt.",description:"Wir entwickeln Websites, Anwendungen und Dashboards, die mit Ihren realen Abläufen verbunden sind und Arbeit erfassen, organisieren und bewegen.",bullets:["Responsives, conversion-optimiertes Design","Technisches SEO und skalierbare Struktur","Verbindung mit Formularen, CRM, Reservierungen und Bestellungen","Automatisierungen und Agenten von Anfang an integriert"],projects:"Projekte ansehen",contact:"Erzählen Sie uns von Ihrem Projekt",connected:"Alles verbunden",connectedDetail:"Web, Gespräch, Daten und Automatisierung in einer Architektur.",items:[["Unternehmenswebsites","Positionierung, Akquise und Conversion."],["E-Commerce","Katalog, Bestellungen und Zahlungen."],["Anwendungen und Dashboards","Interne Werkzeuge und operative Kontrolle."],["Integrationen","Daten, CRM, Automatisierungen und APIs."]]},
ru:{eyebrow:"Веб-разработка для бизнеса",title:"Цифровая инфраструктура, которая превращает разговоры в результаты.",description:"Мы создаём сайты, приложения и панели, связанные с реальными операциями компании. Система привлекает, организует и двигает работу.",bullets:["Адаптивный дизайн с оптимизацией конверсии","Техническое SEO и масштабируемая структура","Связь с формами, CRM, бронированиями и заказами","Автоматизации и агенты интегрированы с самого начала"],projects:"Посмотреть проекты",contact:"Расскажите о проекте",connected:"Всё связано",connectedDetail:"Веб, разговор, данные и автоматизация в единой архитектуре.",items:[["Корпоративные сайты","Позиционирование, привлечение и конверсия."],["Электронная коммерция","Каталог, заказы и платежи."],["Приложения и панели","Внутренние инструменты и операционный контроль."],["Интеграции","Данные, CRM, автоматизации и API."]]}} as const;

const capabilities = [
  { icon: Globe2, title: "Webs corporativas", detail: "Posicionamiento, captación y conversión." },
  { icon: ShoppingCart, title: "E-commerce", detail: "Catálogo, pedidos y pagos." },
  { icon: LayoutDashboard, title: "Aplicaciones y paneles", detail: "Herramientas internas y control operativo." },
  { icon: Database, title: "Integraciones", detail: "Datos, CRM, automatizaciones y APIs." },
];

export const WebDevelopmentSection = () => { const { language }=useTranslation(); const copy=COPY[language as keyof typeof COPY]??COPY.es; const localized=capabilities.map((item,i)=>({...item,title:copy.items[i][0],detail:copy.items[i][1]})); return (
  <section id="desarrollo-web" className="section-padding section-alt-subtle" aria-labelledby="web-development-title">
    <div className="section-container">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            <Code2 className="h-4 w-4" />
            Desarrollo web orientado a negocio
          </div>
          <h2 id="web-development-title" className="text-3xl font-bold md:text-5xl">
            La infraestructura digital que convierte conversaciones en resultados.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            {copy.description}
          </p>

          <ul className="mt-7 space-y-3">
            {copy.bullets].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/casos">
              <Button className="w-full sm:w-auto">
                Ver proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" className="w-full sm:w-auto">
                Cuéntanos tu proyecto
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 blur-2xl" />
          <div className="relative grid gap-4 sm:grid-cols-2">
            {localized.map(({ icon: Icon, title, detail }, index) => (
              <article
                key={title}
                className={`card-elevated card-elevated-hover p-6 ${index === 1 || index === 2 ? "sm:translate-y-6" : ""}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>

          <div className="relative mx-auto mt-10 flex max-w-md items-center gap-4 rounded-2xl border border-primary/20 bg-background/70 p-4 shadow-xl backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Blocks className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Todo conectado</p>
              <p className="text-xs text-muted-foreground">Web, conversación, datos y automatización en una sola arquitectura.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
); };
