import { motion } from "framer-motion";
import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { AGENTS_DATA } from "@/data/agents";

const CATEGORIES = [
  "Ventas", "Atención al Cliente", "Marketing", "Operaciones",
  "Conocimiento", "Automatización", "Legal",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function AgentesIA() {
  return (
    <>
      <SEOHead
        title="Agentes IA | Catálogo de Soluciones IA | HydrAI Labs"
        description="Explora nuestro catálogo de agentes IA: ventas, atención al cliente, marketing, operaciones, legal y más. Soluciones modulares para cada área de tu negocio."
        canonical="/agentes-ia"
        keywords="agentes ia, soluciones ia, chatbot ventas, automatización marketing, agente atención cliente"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Agentes IA", url: "/agentes-ia" },
      ]} />

      <PageLayout>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 30% 30%, hsl(260 60% 55% / 0.06), transparent 60%)," +
                  "radial-gradient(ellipse 50% 40% at 70% 60%, hsl(190 100% 50% / 0.04), transparent 50%)",
              }}
            />
          </div>

          <div className="section-container relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge-secondary mb-6 inline-flex items-center gap-2">
                <Bot className="w-3.5 h-3.5" />
                Catálogo de Soluciones
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Agentes IA que trabajan <br />
                <span className="text-gradient-hydrai">por tu negocio 24/7</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Soluciones modulares y listas para implementar. Haz clic en cada agente para ver cómo funciona paso a paso.
              </p>
            </motion.div>

            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {CATEGORIES.map((cat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-border/40 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                >
                  {cat}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Agent Cards */}
        <section className="section-padding section-alt">
          <div className="section-container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-2 gap-6"
            >
              {AGENTS_DATA.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div key={i} variants={itemVariants}>
                    <Link
                      to={`/agentes-ia/${agent.slug}`}
                      className="group card-premium p-6 flex gap-5 block hover:border-primary/30 transition-all"
                    >
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                            {agent.category}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {agent.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          <div className="rounded-lg bg-destructive/5 border border-destructive/10 px-3 py-2">
                            <span className="text-destructive/70 font-medium block mb-0.5">Problema</span>
                            <span className="text-muted-foreground">{agent.problem.length > 60 ? agent.problem.slice(0, 60) + "…" : agent.problem}</span>
                          </div>
                          <div className="rounded-lg bg-success/5 border border-success/10 px-3 py-2">
                            <span className="text-success font-medium block mb-0.5">Resultado</span>
                            <span className="text-muted-foreground">{agent.resultMetric}</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                          Ver cómo funciona
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto p-10 md:p-16 rounded-3xl border border-primary/20"
              style={{
                background: "linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 8%))",
                boxShadow: "0 0 60px hsl(190 100% 50% / 0.06), 0 0 120px hsl(260 60% 55% / 0.04)",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                ¿Qué agente necesita <span className="text-gradient-hydrai">tu negocio</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Te ayudamos a identificar las automatizaciones con mayor impacto. Auditoría gratuita y sin compromiso.
              </p>
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon text-lg px-10">
                  Solicitar Auditoría Gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
