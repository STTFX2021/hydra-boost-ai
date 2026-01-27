import { motion } from "framer-motion";
import { 
  TrendingUp, Zap, Calendar, CheckCircle2, 
  ArrowRight, Gauge, Target, BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BOOKING_URL } from "@/lib/constants";

interface DiagnosticResultsProps {
  score: number;
  answers: Record<string, string>;
  contactInfo: { name: string; email: string; business: string };
}

const getRecommendations = (answers: Record<string, string>) => {
  const recommendations = [];

  if (answers.focus === "customer_service") {
    recommendations.push({
      title: "Chatbot IA 24/7",
      description: "Automatiza respuestas frecuentes y libera a tu equipo",
      impact: "Reduce 70% consultas manuales",
    });
  }

  if (answers.focus === "appointments") {
    recommendations.push({
      title: "Sistema de Reservas Inteligente",
      description: "Agenda automática con recordatorios anti no-show",
      impact: "Reduce 85% no-shows",
    });
  }

  if (answers.focus === "lead_tracking") {
    recommendations.push({
      title: "Lead Scoring Automático",
      description: "Prioriza leads por probabilidad de conversión",
      impact: "+40% ratio de cierre",
    });
  }

  if (answers.pain_point === "need_247" || answers.pain_point === "many") {
    recommendations.push({
      title: "Respuesta Instantánea Multi-canal",
      description: "WhatsApp, Web y Email con IA unificada",
      impact: "<200ms tiempo de respuesta",
    });
  }

  if (answers.objective === "scale_sales") {
    recommendations.push({
      title: "Pipeline de Ventas Automatizado",
      description: "Seguimiento automático con secuencias personalizadas",
      impact: "+35% conversión",
    });
  }

  // Default recommendation
  if (recommendations.length === 0) {
    recommendations.push({
      title: "Auditoría Personalizada",
      description: "Tu caso requiere un análisis detallado",
      impact: "Diagnóstico a medida",
    });
  }

  return recommendations.slice(0, 3);
};

export function DiagnosticResults({ score, answers, contactInfo }: DiagnosticResultsProps) {
  const recommendations = getRecommendations(answers);
  
  const chartData = [
    { name: "Optimizable", value: score },
    { name: "Actual", value: 100 - score },
  ];

  const COLORS = ["hsl(185, 100%, 50%)", "hsl(240, 10%, 20%)"];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Loading Animation (brief) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        onAnimationComplete={(e) => {
          if ((e as { opacity: number }).opacity === 0) {
            const el = document.querySelector(".loading-overlay");
            if (el) el.remove();
          }
        }}
      >
        <div className="text-center">
          <motion.div
            className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-primary/30 border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm text-muted-foreground font-mono">
            Calculando potencial de automatización para {contactInfo.business || contactInfo.name}...
          </p>
        </div>
      </motion.div>

      {/* Results Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="bg-card/60 backdrop-blur-sm rounded-2xl border border-primary/30 p-6 md:p-8 shadow-xl"
        style={{
          boxShadow: "0 0 60px rgba(0, 200, 255, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Diagnóstico completado</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Hola {contactInfo.name.split(" ")[0]}, tu análisis está listo
          </h2>
          <p className="text-muted-foreground">
            Basado en tus respuestas, hemos identificado oportunidades clave
          </p>
        </div>

        {/* Score Display with Chart */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          {/* Gauge Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="relative w-40 h-40"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                className="text-3xl font-display font-bold text-primary"
              >
                {score}%
              </motion.span>
              <span className="text-xs text-muted-foreground">Optimización</span>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-border/30"
            >
              <Gauge className="w-6 h-6 text-primary mb-2" />
              <span className="text-lg font-bold">{score >= 80 ? "Alta" : score >= 60 ? "Media" : "Moderada"}</span>
              <span className="text-xs text-muted-foreground">Viabilidad</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 }}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-border/30"
            >
              <TrendingUp className="w-6 h-6 text-success mb-2" />
              <span className="text-lg font-bold">+{Math.round(score * 0.4)}%</span>
              <span className="text-xs text-muted-foreground">ROI Estimado</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 }}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-border/30"
            >
              <Zap className="w-6 h-6 text-warning mb-2" />
              <span className="text-lg font-bold">{Math.round(score * 0.15)}h</span>
              <span className="text-xs text-muted-foreground">Ahorro/Semana</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/20 border border-border/30"
            >
              <Target className="w-6 h-6 text-accent mb-2" />
              <span className="text-lg font-bold">{recommendations.length}</span>
              <span className="text-xs text-muted-foreground">Acciones</span>
            </motion.div>
          </div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9 }}
          className="mb-8"
        >
          <h3 className="flex items-center gap-2 text-lg font-display font-bold mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            Recomendaciones Técnicas
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 + i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/30"
              >
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                  {rec.impact}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            ¿Quieres que te expliquemos cómo implementar estas soluciones?
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 text-lg px-8 group"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consultoría para Entregar Resultados
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3 font-mono">
            Sin compromiso • 30 min • Diagnóstico técnico personalizado
          </p>
        </motion.div>
      </motion.div>

      {/* Alternative CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="text-center mt-6"
      >
        <Link to="/contacto">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            O escríbenos directamente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
