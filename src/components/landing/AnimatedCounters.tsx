import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Building2, Euro, Star, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Clock, value: 847, suffix: "", label: "horas automatizadas este mes", prefix: "" },
  { icon: Building2, value: 23, suffix: "", label: "negocios transformados", prefix: "" },
  { icon: Euro, value: 128400, suffix: "", label: "recuperados para clientes", prefix: "€" },
  { icon: Star, value: 4.9, suffix: "⭐", label: "valoración media", prefix: "", decimals: 1 },
];

function useCountUp(end: number, duration: number, start: boolean, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start, decimals]);
  return count;
}

export const AnimatedCounters = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(190 100% 50% / 0.04), transparent 60%)" }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Resultados Reales
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Impacto real, <span className="text-gradient-hydrai">números reales</span>
          </h2>
          <p className="text-lg text-muted-foreground">Nuestros resultados · Marbella · Costa del Sol</p>
          <p className="text-sm text-warning mt-3 font-medium">⚡ Solo quedan 3 plazas disponibles este mes</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            const count = useCountUp(stat.value, 2000, inView, stat.decimals || 0);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/40 p-7 text-center transition-all duration-300 hover:border-primary/25 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, hsl(222 40% 10%), hsl(222 40% 8%))",
                  boxShadow: "0 4px 20px hsl(0 0% 0% / 0.25)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient-hydrai mb-2">
                  {stat.prefix}{typeof stat.value === "number" && stat.value > 1000 ? count.toLocaleString() : count}{stat.suffix}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
