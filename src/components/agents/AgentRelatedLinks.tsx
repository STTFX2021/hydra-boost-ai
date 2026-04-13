import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { RelatedLink } from "@/data/agentConversion";

interface Props {
  links: RelatedLink[];
}

export function AgentRelatedLinks({ links }: Props) {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explora más <span className="text-gradient-hydrai">soluciones</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {links.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={link.href}
                className="card-premium p-5 flex flex-col h-full group hover:border-primary/30 transition-all block"
              >
                <h3 className="font-display font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                  {link.label}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{link.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3 group-hover:gap-2 transition-all">
                  Ver más <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
