import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProfileSelectorProps {
  onSelectLocal: () => void;
  onSelectEnterprise: () => void;
}

const localTags = [
  "🍽️ Restaurante",
  "🏥 Clínica",
  "🏠 Inmobiliaria",
  "💪 Gimnasio",
  "💈 Peluquería",
  "🚗 Taller",
];

const enterpriseTags = [
  "⚙️ SaaS",
  "🏦 Fintech",
  "🛒 E-commerce",
  "🏭 Industrial",
  "📊 Servicios profesionales",
];

export function ProfileSelector({ onSelectLocal, onSelectEnterprise }: ProfileSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          ¿Qué tipo de negocio eres?
        </h2>
        <p className="text-muted-foreground text-lg">
          Elige tu perfil para recibir una auditoría adaptada exactamente a ti.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Local Business Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 flex flex-col items-center text-center hover:border-primary/40 transition-all"
          style={{ boxShadow: "0 0 30px rgba(0, 200, 255, 0.05)" }}
        >
          <span className="text-6xl mb-4">🏪</span>
          <h3 className="text-2xl font-display font-bold mb-3">Negocio Local</h3>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            Restaurantes, clínicas, inmobiliarias, gimnasios, peluquerías, talleres, academias
            y cualquier negocio con clientes locales.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {localTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-muted/30 border border-border/30 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button
            onClick={onSelectLocal}
            className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 mt-auto"
          >
            Soy negocio local
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Enterprise Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 flex flex-col items-center text-center hover:border-muted-foreground/30 transition-all"
        >
          <span className="text-6xl mb-4">🏢</span>
          <h3 className="text-2xl font-display font-bold mb-3">Empresa / Enterprise</h3>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            Empresas medianas o grandes que necesitan arquitecturas de automatización avanzadas,
            integraciones complejas y equipos técnicos.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {enterpriseTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-muted/30 border border-border/30 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button
            onClick={onSelectEnterprise}
            variant="outline"
            className="w-full border-border hover:bg-muted/20 mt-auto"
          >
            Soy empresa
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
