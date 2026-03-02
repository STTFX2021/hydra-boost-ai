import { useState, useEffect } from "react";

const steps = [
  { icon: "🌐", label: "Lead entra" },
  { icon: "🧠", label: "IA analiza" },
  { icon: "✅", label: "Se califica" },
  { icon: "🚀", label: "Va a tu CRM" },
];

const stats = [
  { value: "< 2s", label: "Tiempo de respuesta" },
  { value: "+127%", label: "Leads automatizados" },
  { value: "24/7", label: "Sin interrupciones" },
];

export default function WorkflowAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const [leadCount, setLeadCount] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeadCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl bg-gray-900 shadow-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
      <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-8">
        {/* Horizontal workflow */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1 min-w-0">
              <div
                className={`flex flex-col items-center gap-1.5 px-2 py-2 sm:px-3 sm:py-3 rounded-xl transition-all duration-500 w-full ${
                  activeStep === i
                    ? "bg-[#00B4D8]/15 border border-[#00B4D8]/40 shadow-[0_0_20px_rgba(0,180,216,0.2)] scale-105"
                    : activeStep > i
                    ? "bg-white/5 border border-[#00B4D8]/20"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <span
                  className={`text-lg sm:text-2xl transition-transform duration-300 ${
                    activeStep === i ? "scale-110" : ""
                  }`}
                >
                  {step.icon}
                </span>
                <span className="text-[10px] sm:text-xs text-white font-medium text-center leading-tight">
                  {step.label}
                </span>
              </div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="flex items-center mx-0.5 sm:mx-1 flex-shrink-0">
                  <div
                    className={`h-0.5 w-3 sm:w-6 rounded transition-colors duration-500 ${
                      activeStep > i ? "bg-[#00B4D8]" : "bg-white/20"
                    }`}
                  />
                  <div
                    className={`w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] transition-colors duration-500 ${
                      activeStep > i ? "border-l-[#00B4D8]" : "border-l-white/20"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Processing counter */}
        <div className="text-center mb-5">
          <p className="text-sm text-gray-400">
            Procesando lead{" "}
            <span className="text-[#00B4D8] font-mono font-semibold">
              #{leadCount}
            </span>
            <span className="inline-block w-4 text-left animate-pulse">...</span>
          </p>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/10 pt-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-[#00B4D8]">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
