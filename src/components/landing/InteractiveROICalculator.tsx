import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Users, Clock, Euro, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

export const InteractiveROICalculator = () => {
  const [consultas, setConsultas] = useState(100);
  const [sinResponder, setSinResponder] = useState(30);
  const [valorCliente, setValorCliente] = useState(200);

  const clientesPerdidos = Math.round(consultas * (sinResponder / 100));
  const ingresoPerdidoMes = clientesPerdidos * valorCliente;
  const ingresoPerdidoAnual = ingresoPerdidoMes * 12;
  const recuperable = Math.round(ingresoPerdidoMes * 0.7);

  return (
    <section className="section-padding relative overflow-hidden" id="calculadora-roi">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="glow-orb-primary w-[400px] h-[400px] top-0 right-0 opacity-20" />
      
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge-primary mb-4 inline-flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculadora de ROI
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            ¿Cuánto tiempo/dinero estás perdiendo?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mueve los sliders y descubre cuánto podrías recuperar automatizando tu negocio
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <div className="card-premium p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Inputs */}
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-4">
                    <Users className="w-4 h-4 text-primary" />
                    Consultas que recibes al mes
                  </label>
                  <Slider value={[consultas]} onValueChange={(v) => setConsultas(v[0])} min={10} max={500} step={10} className="mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">10</span>
                    <span className="text-3xl font-bold text-gradient-primary">{consultas}</span>
                    <span className="text-sm text-muted-foreground">500</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-4">
                    <Clock className="w-4 h-4 text-destructive" />
                    % que no puedes responder fuera de horario
                  </label>
                  <Slider value={[sinResponder]} onValueChange={(v) => setSinResponder(v[0])} min={0} max={80} step={5} className="mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">0%</span>
                    <span className="text-3xl font-bold text-destructive">{sinResponder}%</span>
                    <span className="text-sm text-muted-foreground">80%</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-4">
                    <Euro className="w-4 h-4 text-success" />
                    Valor promedio por cliente (€)
                  </label>
                  <Slider value={[valorCliente]} onValueChange={(v) => setValorCliente(v[0])} min={50} max={2000} step={50} className="mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">€50</span>
                    <span className="text-3xl font-bold text-gradient-primary">€{valorCliente}</span>
                    <span className="text-sm text-muted-foreground">€2.000</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="card-premium p-6 text-center border-destructive/30 bg-destructive/5">
                  <p className="text-xs text-muted-foreground mb-1">Clientes que pierdes al mes</p>
                  <p className="text-4xl font-bold text-destructive">{clientesPerdidos}</p>
                </div>

                <div className="card-premium p-6 text-center border-destructive/30">
                  <p className="text-xs text-muted-foreground mb-1">Ingreso perdido al mes</p>
                  <p className="text-3xl font-bold text-destructive">€{ingresoPerdidoMes.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">€{ingresoPerdidoAnual.toLocaleString()} al año</p>
                </div>

                <motion.div
                  className="card-premium p-6 text-center border-success/40 bg-success/5"
                  animate={{ boxShadow: ["0 0 0 0 hsl(var(--success) / 0)", "0 0 20px 5px hsl(var(--success) / 0.15)", "0 0 0 0 hsl(var(--success) / 0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Recuperable con HydrAI</p>
                  <p className="text-4xl font-bold text-success">€{recuperable.toLocaleString()}/mes</p>
                </motion.div>

                <Link to="/auditoria-gratis" className="block">
                  <Button size="lg" className="btn-neon w-full text-base py-6 group">
                    Quiero recuperar ese dinero
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
