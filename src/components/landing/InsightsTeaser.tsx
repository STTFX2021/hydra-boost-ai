import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const INSIGHTS = [
  {
    slug: "chatbot-whatsapp-restaurante",
    tag: "Caso de Éxito",
    tagClass: "badge-success",
    title: "Restaurante redujo no-shows un 40% con chatbot WhatsApp",
    readTime: "5 min",
  },
  {
    slug: "automatizacion-ia-negocio-local",
    tag: "Guía",
    tagClass: "badge-primary",
    title: "5 procesos que todo negocio local puede automatizar con IA",
    readTime: "7 min",
  },
  {
    slug: "chatbot-vs-persona-atencion-cliente",
    tag: "Análisis",
    tagClass: "badge-secondary",
    title: "Chatbot de IA vs Persona: cuándo usar cada uno",
    readTime: "5 min",
  },
];

export const InsightsTeaser = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <span className="badge-primary mb-4 inline-flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Recursos y <span className="text-gradient-hydrai">casos reales</span>
            </h2>
          </div>
          <Link to="/blog" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all shrink-0">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {INSIGHTS.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${item.slug}`} className="group block h-full">
                <article className="card-premium h-full flex flex-col p-6 hover:border-primary/30 transition-all">
                  <span className={`${item.tagClass} mb-4 self-start`}>{item.tag}</span>
                  <h3 className="font-display font-semibold text-lg mb-4 group-hover:text-primary transition-colors leading-snug flex-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </div>
                    <span className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
