import { PageLayout } from "@/components/layout/PageLayout";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Zap,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Shield,
  ChefHat,
  Scissors,
  Home,
  Dumbbell,
  Briefcase,
  CheckCircle2,
  MapPin,
  Phone,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const faqItems = [
  {
    question: "¿Qué tipo de negocios en Marbella pueden beneficiarse de la automatización IA?",
    answer:
      "Restaurantes, clínicas de estética, inmobiliarias, gimnasios, consultorías y cualquier negocio local que quiera automatizar la atención al cliente, captación de leads o procesos internos.",
  },
  {
    question: "¿Cuánto tiempo se tarda en implementar un sistema de automatización IA?",
    answer:
      "Nuestros sistemas se implementan en un plazo de 5 a 10 días laborables, dependiendo de la complejidad. Incluye configuración, pruebas y formación para tu equipo.",
  },
  {
    question: "¿Es necesario tener conocimientos técnicos para usar los chatbots IA?",
    answer:
      "No. Nuestros sistemas están diseñados para ser completamente intuitivos. Además, ofrecemos formación personalizada y soporte continuo para que tu equipo se sienta cómodo desde el primer día.",
  },
  {
    question: "¿Los chatbots funcionan en WhatsApp y redes sociales?",
    answer:
      "Sí. Integramos chatbots IA en WhatsApp, Instagram, Facebook Messenger, tu página web y cualquier canal que utilice tu negocio para comunicarse con clientes.",
  },
  {
    question: "¿Cuánto cuesta la automatización IA para mi negocio en Marbella?",
    answer:
      "Ofrecemos planes desde 297 €/mes adaptados a las necesidades de cada negocio. La auditoría inicial es completamente gratuita y sin compromiso.",
  },
];

const solutions = [
  {
    icon: Bot,
    title: "Chatbots IA 24/7",
    desc: "Asistentes virtuales inteligentes que responden consultas, reservan citas y cualifican leads automáticamente en cualquier horario, sin intervención humana.",
  },
  {
    icon: Users,
    title: "Captación automática de leads",
    desc: "Sistemas que identifican, atraen y cualifican potenciales clientes de forma automática a través de múltiples canales digitales, aumentando tu cartera sin esfuerzo manual.",
  },
  {
    icon: MessageSquare,
    title: "Automatización de WhatsApp",
    desc: "Respuestas instantáneas, seguimiento de pedidos, confirmación de reservas y campañas personalizadas en WhatsApp Business con inteligencia artificial.",
  },
  {
    icon: Zap,
    title: "CRM inteligente",
    desc: "Gestión automatizada de clientes con puntuación de leads, seguimiento de interacciones, recordatorios y flujos de trabajo que convierten más oportunidades en ventas.",
  },
  {
    icon: TrendingUp,
    title: "Automatización de flujos de trabajo",
    desc: "Eliminamos tareas repetitivas conectando tus herramientas: facturación, inventario, email marketing, redes sociales y más, todo funcionando de forma autónoma.",
  },
];

const industries = [
  {
    icon: ChefHat,
    title: "Restaurantes",
    desc: "Reservas automáticas, pedidos online, gestión de reseñas y respuestas instantáneas a consultas sobre el menú. Ideal para restaurantes en Puerto Banús, el centro de Marbella y la Milla de Oro.",
    link: "/sectores/restaurantes",
  },
  {
    icon: Scissors,
    title: "Salones de belleza y estética",
    desc: "Agendamiento automático de citas, recordatorios por WhatsApp, gestión de cancelaciones y campañas de fidelización para clínicas y centros de estética en Marbella.",
    link: "/sectores/clinicas-estetica",
  },
  {
    icon: Home,
    title: "Inmobiliarias",
    desc: "Cualificación automática de compradores, seguimiento de propiedades, respuestas instantáneas a consultas y scraping inteligente de leads para agencias inmobiliarias en la Costa del Sol.",
    link: "/sectores/inmobiliarias",
  },
  {
    icon: Dumbbell,
    title: "Gimnasios y centros deportivos",
    desc: "Gestión de inscripciones, seguimiento de miembros, renovaciones automáticas y comunicación personalizada para gimnasios y centros de CrossFit en Marbella.",
    link: "/sectores/gimnasios",
  },
  {
    icon: Briefcase,
    title: "Consultoras y servicios profesionales",
    desc: "Captación y cualificación automática de clientes potenciales, agendamiento de reuniones, seguimiento de propuestas y automatización de procesos administrativos.",
    link: "/contacto",
  },
];

const benefits = [
  { icon: TrendingUp, title: "Más leads cualificados", desc: "Capta hasta un 300% más de potenciales clientes con sistemas de automatización inteligente que trabajan las 24 horas." },
  { icon: Clock, title: "Respuesta 24/7", desc: "Tus clientes reciben atención inmediata a cualquier hora del día o de la noche, los 365 días del año, sin necesidad de personal adicional." },
  { icon: Zap, title: "Procesos automatizados", desc: "Elimina hasta 15 horas semanales de tareas repetitivas: facturación, seguimiento, reportes y comunicaciones manuales." },
  { icon: Shield, title: "Más ventas con menos esfuerzo", desc: "Convierte más oportunidades en clientes gracias a seguimientos automatizados, ofertas personalizadas y nurturing inteligente." },
  { icon: Users, title: "Menor carga operativa", desc: "Tu equipo se concentra en lo que importa mientras la IA gestiona las tareas rutinarias y la comunicación con clientes." },
];

const AIAutomationMarbella = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Automatización IA en Marbella | HydrAI Labs</title>
        <meta name="description" content="Agencia de automatización con inteligencia artificial en Marbella. Chatbots WhatsApp, webs y flujos automáticos para negocios locales de Marbella y Golden Mile." />
        <link rel="canonical" href="https://hydrailabs.com/ai-automation-marbella" />
        <meta property="og:title" content="Automatización IA en Marbella | HydrAI Labs" />
        <meta property="og:description" content="Agencia de automatización con inteligencia artificial en Marbella. Chatbots WhatsApp, webs y flujos automáticos para negocios locales de Marbella y Golden Mile." />
        <meta property="og:url" content="https://hydrailabs.com/ai-automation-marbella" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Automatización IA en Marbella | HydrAI Labs" />
        <meta name="twitter:description" content="Agencia de automatización con inteligencia artificial en Marbella. Chatbots WhatsApp, webs y flujos automáticos para negocios locales de Marbella y Golden Mile." />
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://hydrailabs.com/" },
          { name: "Servicios", url: "https://hydrailabs.com/servicios" },
          { name: "Automatización IA Marbella", url: "https://hydrailabs.com/ai-automation-marbella" },
        ]}
      />
      <FAQSchema
        items={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* ─── Section 1: Hero ─── */}
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="glow-orb-primary w-[500px] h-[500px] -top-48 -left-48" />
        <div className="glow-orb-secondary w-[350px] h-[350px] top-1/2 -right-36 opacity-50" />

        <div className="section-container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
              <span className="badge-primary inline-flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Marbella · Costa del Sol
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-foreground">Automatización IA para</span>
              <br />
              <span className="text-gradient-primary">negocios en Marbella</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Automatiza atención al cliente, captación de leads y procesos con inteligencia artificial 24/7.
              Diseñado para negocios locales que quieren crecer sin aumentar costes operativos.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[260px]">
                  Solicitar Auditoría Gratis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="btn-outline-neon text-base px-6 h-12 min-w-[200px]">
                  <Phone className="mr-2 w-4 h-4" />
                  Contactar ahora
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-border/40 mt-8 max-w-lg mx-auto"
            >
              {[
                { value: "+120", label: "Negocios automatizados" },
                { value: "15h", label: "Ahorro semanal medio" },
                { value: "4.9/5", label: "Satisfacción cliente" },
              ].map((m) => (
                <div key={m.label} className="text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-display font-bold text-foreground">{m.value}</span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Problema ─── */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="section-container">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="badge-primary text-sm">
              El problema
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              ¿Tu negocio en Marbella pierde clientes por no responder a tiempo?
            </motion.h2>
            <motion.div variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed space-y-4 text-left max-w-2xl mx-auto">
              <p>
                En una ciudad tan competitiva como Marbella, cada minuto cuenta. Los negocios locales pierden hasta el{" "}
                <strong className="text-foreground">67% de las oportunidades de venta</strong> simplemente porque no responden a
                tiempo a las consultas de los clientes. En la hostelería, el turismo y los servicios profesionales de la Costa del Sol,
                la velocidad de respuesta marca la diferencia entre cerrar una venta o perder un cliente frente a la competencia.
              </p>
              <p>
                Muchos negocios en Marbella todavía gestionan sus comunicaciones de forma manual: mensajes de WhatsApp sin responder
                durante horas, formularios web que nadie revisa hasta el día siguiente, llamadas perdidas fuera del horario comercial y
                procesos internos que consumen demasiado tiempo del equipo. Mientras tanto, los clientes potenciales —turistas,
                residentes internacionales y locales— buscan respuestas inmediatas y se van con quien se las da primero.
              </p>
              <p>
                La realidad es que la atención al cliente manual tiene límites. No puedes estar disponible las 24 horas, no puedes
                responder en 5 idiomas simultáneamente y no puedes hacer seguimiento personalizado a cientos de leads sin que se te
                escape ninguno. Es aquí donde la <strong className="text-foreground">automatización con inteligencia artificial</strong>{" "}
                transforma por completo la manera en que los negocios de Marbella captan y retienen clientes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Solución ─── */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="badge-primary text-sm">
              La solución
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Sistemas de automatización IA diseñados para Marbella
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              En HydrAI Labs implementamos soluciones de inteligencia artificial adaptadas a las necesidades específicas de los
              negocios en Marbella y la Costa del Sol. Nuestros sistemas se integran con tus herramientas actuales y empiezan a
              generar resultados desde la primera semana.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {solutions.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="group rounded-2xl border border-border/60 bg-card p-6 space-y-3 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/servicios">
              <Button variant="outline" className="btn-outline-neon">
                Ver todos los servicios
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Casos de uso por industria ─── */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="section-container">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="badge-primary text-sm">
              Casos de uso
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Automatización IA para cada sector en Marbella
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cada industria tiene necesidades únicas. Diseñamos soluciones personalizadas que se adaptan a tu modelo de negocio
              y a las particularidades del mercado de Marbella.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {industries.map((ind) => (
              <motion.div
                key={ind.title}
                variants={fadeUp}
                className="rounded-2xl border border-border/60 bg-card p-6 space-y-3 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <ind.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">{ind.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
                <Link to={ind.link} className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                  Ver solución <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: Beneficios ─── */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="badge-primary text-sm">
              Beneficios
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              ¿Por qué automatizar tu negocio en Marbella con IA?
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/arquitectura">
              <Button variant="outline" className="btn-outline-neon">
                Ver nuestra arquitectura técnica
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 6: CTA Final ─── */}
      <section className="py-20 lg:py-28 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="glow-orb-primary w-[400px] h-[400px] -bottom-32 -left-32 opacity-30" />
        <div className="glow-orb-accent w-[300px] h-[300px] -top-24 -right-24 opacity-20" />

        <div className="section-container relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold">
              ¿Listo para automatizar tu negocio en Marbella?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-secondary-foreground/80 text-lg leading-relaxed">
              Solicita tu auditoría de automatización gratuita. Analizamos tu negocio, identificamos las oportunidades de
              mejora y te presentamos un plan personalizado para implementar IA en tus procesos. Sin compromiso, sin coste
              inicial y con resultados medibles desde la primera semana.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon text-base px-8 h-12 min-w-[280px]">
                  Solicitar Auditoría Gratis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 text-base px-6 h-12">
                  <Phone className="mr-2 w-4 h-4" />
                  Hablar con un experto
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 pt-4 text-sm text-secondary-foreground/60">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Sin compromiso</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 100% gratuito</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Resultados en 7 días</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div
            className="text-center space-y-4 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Preguntas frecuentes sobre automatización IA en Marbella
            </motion.h2>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {faqItems.map((faq, i) => (
              <motion.details
                key={i}
                variants={fadeUp}
                className="group rounded-xl border border-border/60 bg-card overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-foreground font-medium hover:text-primary transition-colors list-none">
                  {faq.question}
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AIAutomationMarbella;
