import { motion } from "framer-motion";
import { ArrowRight, Bot, Headphones, BarChart3, Settings, Scale, BrainCircuit, Mail, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const ICONS = [BarChart3, Headphones, Mail, Settings, Users, Scale, BrainCircuit, Bot];
const COLORS = [
  "from-primary/20 to-primary/5",
  "from-secondary/20 to-secondary/5",
  "from-primary/15 to-secondary/10",
  "from-secondary/15 to-primary/10",
  "from-primary/20 to-primary/5",
  "from-secondary/20 to-secondary/5",
  "from-primary/15 to-secondary/10",
  "from-secondary/15 to-primary/10",
];

const COPY = {
  es: {
    badge: "Biblioteca de Agentes",
    title1: "Agentes IA para",
    title2: "cada área de tu negocio",
    sub: "Soluciones modulares que se integran en tu operativa existente y empiezan a generar resultados desde el día 1",
    cta: "Explorar todos los agentes",
    agents: [
      { title: "Ventas", desc: "Captación y cualificación automática de leads" },
      { title: "Atención al Cliente", desc: "Soporte 24/7 multicanal con IA conversacional" },
      { title: "Marketing", desc: "Campañas automatizadas y nurturing inteligente" },
      { title: "Operaciones", desc: "Reservas, citas y gestión de procesos internos" },
      { title: "Recursos Humanos", desc: "Onboarding, screening y comunicación interna" },
      { title: "Legal & Compliance", desc: "Revisión documental y alertas normativas" },
      { title: "Conocimiento", desc: "Documentación inteligente y base de conocimiento" },
      { title: "Automatización", desc: "Workflows complejos sin intervención humana" },
    ],
  },
  en: {
    badge: "Agent Library",
    title1: "AI Agents for",
    title2: "every area of your business",
    sub: "Modular solutions that integrate into your existing operations and start delivering from day 1",
    cta: "Explore all agents",
    agents: [
      { title: "Sales", desc: "Automatic lead capture and qualification" },
      { title: "Customer Support", desc: "24/7 omnichannel support with conversational AI" },
      { title: "Marketing", desc: "Automated campaigns and intelligent nurturing" },
      { title: "Operations", desc: "Bookings, appointments and internal process management" },
      { title: "Human Resources", desc: "Onboarding, screening and internal communication" },
      { title: "Legal & Compliance", desc: "Document review and regulatory alerts" },
      { title: "Knowledge", desc: "Smart documentation and knowledge base" },
      { title: "Automation", desc: "Complex workflows without human intervention" },
    ],
  },
  de: {
    badge: "Agenten-Bibliothek",
    title1: "KI-Agenten für",
    title2: "jeden Bereich Ihres Unternehmens",
    sub: "Modulare Lösungen, die sich in Ihren bestehenden Betrieb integrieren und ab Tag 1 Ergebnisse liefern",
    cta: "Alle Agenten erkunden",
    agents: [
      { title: "Vertrieb", desc: "Automatische Lead-Erfassung und Qualifizierung" },
      { title: "Kundenservice", desc: "24/7 Omnichannel-Support mit Conversational AI" },
      { title: "Marketing", desc: "Automatisierte Kampagnen und intelligentes Nurturing" },
      { title: "Operations", desc: "Buchungen, Termine und interne Prozesse" },
      { title: "Personalwesen", desc: "Onboarding, Screening und interne Kommunikation" },
      { title: "Recht & Compliance", desc: "Dokumentenprüfung und regulatorische Warnungen" },
      { title: "Wissen", desc: "Intelligente Dokumentation und Wissensdatenbank" },
      { title: "Automatisierung", desc: "Komplexe Workflows ohne menschliches Eingreifen" },
    ],
  },
  ru: {
    badge: "Библиотека агентов",
    title1: "ИИ-агенты для",
    title2: "каждой области вашего бизнеса",
    sub: "Модульные решения, интегрируемые в ваши текущие процессы и приносящие результат с первого дня",
    cta: "Посмотреть всех агентов",
    agents: [
      { title: "Продажи", desc: "Автоматический сбор и квалификация лидов" },
      { title: "Клиентский сервис", desc: "Поддержка 24/7 во всех каналах на базе разговорного ИИ" },
      { title: "Маркетинг", desc: "Автоматизированные кампании и умный nurturing" },
      { title: "Операции", desc: "Бронирования, записи и внутренние процессы" },
      { title: "HR", desc: "Онбординг, скрининг и внутренние коммуникации" },
      { title: "Юридический и Compliance", desc: "Проверка документов и оповещения о нормах" },
      { title: "База знаний", desc: "Умная документация и база знаний" },
      { title: "Автоматизация", desc: "Сложные процессы без участия человека" },
    ],
  },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export const AgentsTeaser = () => {
  const { language } = useI18n();
  const t = COPY[language] || COPY.es;
  return (
    <section className="section-padding relative overflow-hidden section-alt">
      <div className="glow-orb-secondary w-[500px] h-[500px] -top-48 -right-48 opacity-[0.05]" />
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="badge-secondary mb-4 inline-flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t.title1} <span className="text-gradient-hydrai">{t.title2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.sub}</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.agents.map((agent, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl border border-border/40 p-6 transition-all duration-300 hover:border-primary/25 cursor-default overflow-hidden"
                style={{ background: "linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 8%))", boxShadow: "0 4px 20px hsl(0 0% 0% / 0.3)" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${COLORS[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5">{agent.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mt-12">
          <Link to="/agentes-ia">
            <Button variant="outline" size="lg" className="btn-outline-neon group/btn">
              {t.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
