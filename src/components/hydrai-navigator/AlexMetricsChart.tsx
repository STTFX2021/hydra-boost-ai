import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { TrendingUp, Activity, Zap, BarChart3 } from "lucide-react";

// Simulated real-time data generator
const generateDataPoint = (base: number, variance: number) => 
  Math.round(base + (Math.random() - 0.5) * variance);

const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      time: `${i}h`,
      leads: generateDataPoint(20, 15),
      conversion: generateDataPoint(18, 8),
      response: generateDataPoint(50, 30),
    });
  }
  return data;
};

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  color: string;
}

function MetricCard({ label, value, change, positive, icon: Icon, color }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col p-2 rounded-lg bg-muted/20 border border-border/30"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3 h-3 ${color}`} />
        <span className="text-[9px] text-muted-foreground font-mono uppercase">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-foreground">{value}</span>
        <span className={`text-[9px] font-mono ${positive ? "text-success" : "text-destructive"}`}>
          {positive ? "↑" : "↓"}{change}
        </span>
      </div>
    </motion.div>
  );
}

export function AlexMetricsChart() {
  const [data, setData] = useState(generateInitialData);
  const [metrics, setMetrics] = useState({
    leadsToday: 24,
    conversionRate: 18.5,
    avgResponse: 47,
    automationRate: 92,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: `${newData.length}h`,
          leads: generateDataPoint(20, 15),
          conversion: generateDataPoint(18, 8),
          response: generateDataPoint(50, 30),
        });
        return newData;
      });

      // Update metrics with slight variations
      setMetrics((prev) => ({
        leadsToday: Math.max(0, prev.leadsToday + Math.round((Math.random() - 0.4) * 2)),
        conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() - 0.5) * 0.5)),
        avgResponse: Math.max(10, prev.avgResponse + Math.round((Math.random() - 0.5) * 5)),
        automationRate: Math.max(80, Math.min(99, prev.automationRate + (Math.random() - 0.5) * 1)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-2">
        <MetricCard
          label="Leads"
          value={metrics.leadsToday.toString()}
          change="12%"
          positive={true}
          icon={TrendingUp}
          color="text-primary"
        />
        <MetricCard
          label="Conv."
          value={`${metrics.conversionRate.toFixed(1)}%`}
          change="3.2%"
          positive={true}
          icon={BarChart3}
          color="text-cyan-400"
        />
        <MetricCard
          label="Resp."
          value={`${metrics.avgResponse}ms`}
          change="8ms"
          positive={true}
          icon={Zap}
          color="text-success"
        />
        <MetricCard
          label="Auto"
          value={`${metrics.automationRate.toFixed(0)}%`}
          change="2%"
          positive={true}
          icon={Activity}
          color="text-accent"
        />
      </div>

      {/* Mini Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-20 rounded-lg bg-muted/10 border border-border/20 p-2 overflow-hidden"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Activity className="w-3 h-3 text-primary" />
          <span className="text-[9px] font-mono text-muted-foreground">LEADS EN TIEMPO REAL</span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-success ml-auto"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 10%, 6%)",
                border: "1px solid hsl(240, 10%, 18%)",
                borderRadius: "8px",
                fontSize: "10px",
              }}
              labelStyle={{ color: "hsl(185, 100%, 50%)" }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="hsl(185, 100%, 50%)"
              strokeWidth={2}
              fill="url(#leadGradient)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
