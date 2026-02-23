import { useState, useEffect } from "react";

const steps = [
  {
    icon: "👤",
    title: "Visitante llega a tu web",
    effect: "pulse",
  },
  {
    icon: "🤖",
    title: "IA captura y califica el lead",
    effect: "typing",
    badge: "Respondiendo en 2s",
  },
  {
    icon: "📱",
    title: "Notificación a tu equipo",
    effect: "ping",
    badge: "Lead enviado ✓",
  },
];

export default function AutomationAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl bg-gray-900 shadow-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
      <div className="absolute inset-0 flex items-center justify-between p-6 sm:p-8">
        {/* Left: Vertical flow */}
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          {steps.map((step, i) => (
            <div key={i}>
              {/* Step card */}
              <div
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-500 ${
                  activeStep >= i
                    ? "bg-[#00B4D8]/15 border border-[#00B4D8]/40 shadow-[0_0_15px_rgba(0,180,216,0.15)]"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <span
                  className={`text-xl sm:text-2xl transition-transform duration-500 ${
                    activeStep === i ? "scale-125" : ""
                  }`}
                  style={
                    step.effect === "pulse" && activeStep === i
                      ? { animation: "pulse 1.5s ease-in-out infinite" }
                      : step.effect === "ping" && activeStep === i
                      ? { animation: "bounce 0.6s ease-in-out infinite" }
                      : undefined
                  }
                >
                  {step.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-white text-xs sm:text-sm font-medium leading-tight">
                    {step.title}
                    {step.effect === "typing" && activeStep === i && (
                      <span className="text-[#00B4D8] ml-1">{dots}</span>
                    )}
                  </p>
                  {step.badge && activeStep >= i && (
                    <span
                      className={`inline-block mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-full transition-opacity duration-300 ${
                        step.effect === "ping"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-[#00B4D8]/20 text-[#00B4D8]"
                      } ${activeStep >= i ? "opacity-100" : "opacity-0"}`}
                    >
                      {step.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="flex justify-start ml-5 sm:ml-6">
                  <div className="relative w-0.5 h-4 sm:h-6 bg-white/10 overflow-hidden rounded-full">
                    <div
                      className={`absolute top-0 left-0 w-full bg-[#00B4D8] rounded-full transition-all duration-700 ${
                        activeStep > i ? "h-full" : "h-0"
                      }`}
                      style={{
                        animation: activeStep > i ? undefined : "fillLine 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Floating stat */}
        <div className="hidden sm:flex flex-col items-center justify-center ml-6 bg-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-xl px-5 py-4 shadow-[0_0_20px_rgba(0,180,216,0.1)]">
          <span className="text-3xl lg:text-4xl font-bold text-[#00B4D8]">24/7</span>
          <span className="text-xs text-gray-400 mt-1 text-center leading-tight">
            Atención
            <br />
            automática
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fillLine {
          0%, 100% { height: 0; }
          50% { height: 100%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
