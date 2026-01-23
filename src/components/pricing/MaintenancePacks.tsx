import { Settings } from "lucide-react";

interface MaintenancePacksProps {
  language: 'es' | 'en';
}

export const MaintenancePacks = ({ language }: MaintenancePacksProps) => {
  const packs = [
    {
      name: language === 'es' ? "Básico" : "Basic",
      price: "49",
      desc: language === 'es' ? "Soporte email, ajustes menores" : "Email support, minor tweaks",
    },
    {
      name: "Standard",
      price: "99",
      desc: language === 'es' ? "Soporte prioritario, optimización mensual" : "Priority support, monthly optimization",
    },
    {
      name: "Premium",
      price: "149",
      desc: language === 'es' ? "Soporte dedicado, updates de modelos, ajustes ilimitados" : "Dedicated support, model updates, unlimited tweaks",
    },
  ];

  return (
    <section className="section-padding bg-muted/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="badge-secondary mb-4 inline-flex">
              <Settings className="w-3 h-3 mr-1" /> {language === 'es' ? 'Mantenimiento' : 'Maintenance'}
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Evolution & Maintenance Pack
            </h2>
            <p className="text-muted-foreground">
              {language === 'es'
                ? 'Updates de modelos IA, soporte técnico y ajustes mensuales.'
                : 'AI model updates, technical support and monthly tweaks.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packs.map((mp, i) => (
              <div key={i} className="card-premium text-center">
                <h4 className="font-display font-bold mb-1">{mp.name}</h4>
                <div className="text-2xl font-bold text-primary mb-2">
                  {mp.price}€
                  <span className="text-sm text-muted-foreground">
                    /{language === 'es' ? 'mes' : 'mo'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{mp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
