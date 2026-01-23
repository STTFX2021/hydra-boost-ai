interface IndividualsGridProps {
  language: 'es' | 'en';
}

export const IndividualsGrid = ({ language }: IndividualsGridProps) => {
  const individuals = [
    { name: "Opportunity Engine", price: "97", from: true },
    { name: "Lead Engine", price: "147", from: true },
    { name: "Bookings Management", price: "97", from: true },
    { name: "Analytics & Insights", price: "127", from: true },
    { name: language === 'es' ? "Nutrición Automática" : "Auto Nurturing", price: "147", from: true },
    { name: "Sales Message Factory", price: "197", from: true },
    { name: language === 'es' ? "Radar de Tendencias" : "Trends Radar", price: "97", from: true },
    { name: language === 'es' ? "Operaciones 24/7" : "24/7 Operations", price: "297", from: true },
    { name: "Predictive Ops", price: "197", from: true },
    { name: language === 'es' ? "Agente por Rol" : "Role Agent", price: "197", from: true },
    { name: "Dynamic Creator", price: "497", from: false },
  ];

  return (
    <section className="section-padding -mt-8">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {individuals.map((item, i) => (
              <div key={i} className="card-premium flex items-center justify-between">
                <span className="font-medium text-sm">{item.name}</span>
                <span className="text-primary font-bold">
                  {item.from && (
                    <span className="text-xs text-muted-foreground mr-1">
                      {language === 'es' ? 'desde' : 'from'}
                    </span>
                  )}
                  {item.price}€
                  <span className="text-xs text-muted-foreground">
                    /{language === 'es' ? 'mes' : 'mo'}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
