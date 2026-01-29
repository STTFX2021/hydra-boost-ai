import { motion } from "framer-motion";
import { Globe, MessageSquare, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "Webs Profesionales",
    description: "Nodos de captación optimizados conectados a tu sistema automatizado.",
    features: [
      "Landing optimizada para conversión",
      "SEO base + formularios inteligentes",
      "Integración con Event Bus",
      "Analytics y tracking automático",
    ],
    price: "Consultar",
    cta: "Ver Ejemplos",
    href: "/casos",
  },
  {
    icon: MessageSquare,
    title: "Agentes Conversacionales",
    description: "No son chatbots simples — son agentes integrados en tu arquitectura.",
    features: [
      "WhatsApp Business + Instagram + Web",
      "Captan, filtran y clasifican leads",
      "Agendan citas automáticamente",
      "Conectados a CRM/Supabase",
    ],
    price: "Consultar",
    cta: "Probar Demo",
    href: "/contacto",
  },
  {
    icon: RefreshCw,
    title: "Orquestación de Procesos",
    description: "Workflows que conectan herramientas, datos y acciones sin intervención.",
    features: [
      "Lead → CRM → Seguimiento automático",
      "Booking + Recordatorios + Confirmación",
      "Pagos → Email → Facturación",
      "Reportes automáticos diarios/semanales",
    ],
    price: "Consultar",
    cta: "Ver Flujos",
    href: "/servicios",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const BaseImplementations = () => {
  return (
    <section id="implementaciones" className="section-padding bg-muted/10">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            🏪 Implementaciones Base
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Automatizaciones Conectadas <span className="text-gradient-primary">para Negocios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            No vendemos herramientas sueltas. Cada implementación es un nodo 
            dentro de tu arquitectura automatizada que capta, procesa y actúa.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="card-premium group flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-5">{service.description}</p>
              
              <ul className="space-y-2 mb-6 flex-1">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-success mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">Implementación desde</span>
                  <span className="font-display font-semibold text-primary">{service.price}</span>
                </div>
                <Link to={service.href}>
                  <Button variant="outline" className="w-full btn-outline-neon group/btn">
                    {service.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-display font-semibold mb-8">
            Implementaciones en Negocios Reales
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { sector: "Restaurante", desc: "Web + WhatsApp Bot + Reservas" },
              { sector: "Salón de Belleza", desc: "Booking + Recordatorios + Pagos" },
              { sector: "Servicios Profesionales", desc: "Lead Engine + CRM + Follow-up" },
            ].map((item, i) => (
              <div key={i} className="card-premium p-5 text-center">
                <div className="w-full h-32 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">{i === 0 ? "🍽️" : i === 1 ? "💇" : "💼"}</span>
                </div>
                <p className="font-semibold text-sm text-primary">{item.sector}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/casos">
            <Button variant="link" className="text-primary">
              Ver todos los casos →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
