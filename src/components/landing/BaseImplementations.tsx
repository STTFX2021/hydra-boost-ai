import { motion } from "framer-motion";
import { Globe, MessageSquare, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLandingTranslation } from "@/lib/i18n";

const icons = [Globe, MessageSquare, RefreshCw];
const hrefs = ["/casos", "/contacto", "/servicios"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" as const
    } 
  },
};

const portfolioVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.3 }
  },
};

export const BaseImplementations = () => {
  const { landing } = useLandingTranslation();
  const t = landing.base;

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
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t.title} <span className="text-gradient-primary">{t.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {t.services.map((service: { title: string; description: string; features: string[]; cta: string }, i: number) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="card-premium group flex flex-col h-full"
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-5">{service.description}</p>
                
                <ul className="space-y-2 mb-6 flex-1">
                  {service.features.map((feature: string, j: number) => (
                    <motion.li 
                      key={j} 
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * j }}
                    >
                      <span className="text-success mt-0.5">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground">{t.implementationFrom}</span>
                    <span className="font-display font-semibold text-primary">{t.consult}</span>
                  </div>
                  <Link to={hrefs[i]}>
                    <Button variant="outline" className="w-full btn-outline-neon group/btn">
                      {service.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Portfolio Teaser */}
        <motion.div
          variants={portfolioVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-display font-semibold mb-8">
            {t.portfolioTitle}
          </h3>
          <motion.div 
            className="grid sm:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.portfolioItems.map((item: { sector: string; desc: string }, i: number) => (
              <motion.div 
                key={i} 
                className="card-premium p-5 text-center"
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-full h-32 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">{i === 0 ? "🍽️" : i === 1 ? "💇" : "💼"}</span>
                </div>
                <p className="font-semibold text-sm text-primary">{item.sector}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <Link to="/casos">
            <Button variant="link" className="text-primary">
              {t.viewAllCases}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
