import { motion } from "framer-motion";
import {
  PhoneOff, Globe, CalendarX, Loader2, AlertCircle,
  Brain, Target, BarChart3, Map,
  MonitorSmartphone, MessageSquare, CalendarCheck, Bot, Workflow, Database, Send,
  TrendingUp, Users, BellRing, Sparkles, Clock, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Step = {
  id: number;
  badge: string;
  title: string;
  text: string;
  accent: string; // tailwind text-* token class
  ring: string; // tailwind border/ring class
  chips: { icon: React.ComponentType<{ className?: string }>; label: string }[];
};

const steps: Step[] = [
  {
    id: 1,
    badge: "Step 01",
    title: "Client arrives with problems",
    text: "Tell us what is blocking your growth.",
    accent: "text-destructive",
    ring: "border-destructive/30",
    chips: [
      { icon: PhoneOff, label: "Missed calls" },
      { icon: AlertCircle, label: "No leads" },
      { icon: Globe, label: "Outdated website" },
      { icon: CalendarX, label: "Lost bookings" },
      { icon: Loader2, label: "Manual work" },
    ],
  },
  {
    id: 2,
    badge: "Step 02",
    title: "HydrAI analyzes the business",
    text: "We study your business and detect the best opportunities.",
    accent: "text-primary",
    ring: "border-primary/30",
    chips: [
      { icon: Brain, label: "AI brain" },
      { icon: Map, label: "Strategy map" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Target, label: "Planning" },
    ],
  },
  {
    id: 3,
    badge: "Step 03",
    title: "We build the solution",
    text: "We build a system designed to grow your business.",
    accent: "text-secondary",
    ring: "border-secondary/30",
    chips: [
      { icon: MonitorSmartphone, label: "High-converting site" },
      { icon: Bot, label: "Smart chatbot" },
      { icon: CalendarCheck, label: "Booking automation" },
      { icon: MessageSquare, label: "WhatsApp flows" },
      { icon: Database, label: "CRM integration" },
      { icon: Sparkles, label: "AI assistants" },
      { icon: Workflow, label: "Lead funnels" },
    ],
  },
  {
    id: 4,
    badge: "Step 04",
    title: "Business grows",
    text: "More clients. Less chaos. Automatic growth.",
    accent: "text-success",
    ring: "border-success/30",
    chips: [
      { icon: Users, label: "More leads" },
      { icon: CalendarCheck, label: "More bookings" },
      { icon: Sparkles, label: "Happy customers" },
      { icon: BellRing, label: "Notifications" },
      { icon: TrendingUp, label: "Rising charts" },
      { icon: Clock, label: "24/7 activity" },
      { icon: Send, label: "Auto outreach" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export const GrowthSystemSection = () => {
  return (
    <section
      id="how-we-build"
      aria-label="How We Build Growth Systems"
      className="section-padding relative overflow-hidden section-alt"
    >
      <div className="glow-orb-primary w-[500px] h-[500px] -top-40 -right-40 opacity-60" />
      <div className="glow-orb-secondary w-[400px] h-[400px] bottom-0 -left-32 opacity-50" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT — Copy */}
          <div className="lg:sticky lg:top-28">
            <div className="badge-primary mb-6 inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              How it works
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              How We Build
              <span className="text-gradient-hydrai block">Growth Systems</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              You tell us your goals, problems, and bottlenecks. We create the perfect website
              and automation system for your business.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/auditoria-gratis">
                <Button size="lg" className="btn-neon group">
                  Get Free Audit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/casos">
                <Button size="lg" variant="outline" className="btn-outline-neon">
                  View Results
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "7d", l: "Avg setup" },
                { v: "24/7", l: "Always on" },
                { v: "+120", l: "Businesses" },
              ].map((s) => (
                <div key={s.l} className="text-center p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                  <p className="text-2xl font-display font-bold text-gradient-hydrai">{s.v}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Animated 4 steps */}
          <div className="relative">
            {/* vertical connector */}
            <div
              className="absolute left-6 top-4 bottom-4 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--destructive) / 0.4), hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), hsl(var(--success) / 0.5))",
              }}
              aria-hidden
            />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative sm:pl-16"
                >
                  {/* node */}
                  <div
                    className={`hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-full items-center justify-center border-2 ${step.ring} bg-card shadow-lg`}
                  >
                    <span className={`text-sm font-display font-bold ${step.accent}`}>
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`absolute inset-0 rounded-full ${step.ring} animate-ping opacity-40`}
                      aria-hidden
                    />
                  </div>

                  <div
                    className={`card-premium p-6 md:p-7 rounded-2xl border ${step.ring} hover:translate-y-[-2px] transition-transform duration-300`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono uppercase tracking-wider ${step.accent}`}>
                        {step.badge}
                      </span>
                      <span className="sm:hidden text-xs font-mono text-muted-foreground">
                        {step.id}/4
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-5">
                      {step.text}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {step.chips.map((chip, idx) => {
                        const Icon = chip.icon;
                        return (
                          <motion.span
                            key={chip.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/40 border border-border/60 text-foreground/90 hover:bg-muted/60 transition-colors"
                          >
                            <Icon className={`w-3.5 h-3.5 ${step.accent}`} />
                            {chip.label}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
