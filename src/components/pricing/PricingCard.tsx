import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Star, Crown } from "lucide-react";

interface PricingCardProps {
  id: string;
  name: string;
  price: string;
  priceAnnual: string;
  badge: string | null;
  idealFor: string;
  features: string[];
  steps: string[];
  language: 'es' | 'en';
}

export const PricingCard = ({
  id,
  name,
  price,
  priceAnnual,
  badge,
  idealFor,
  features,
  steps,
  language,
}: PricingCardProps) => {
  const isPopular = badge === (language === 'es' ? 'Más popular' : 'Most popular');
  const isPremium = badge === 'Premium';

  return (
    <div
      className={`relative card-premium flex flex-col overflow-visible ${
        isPopular ? 'border-primary neon-border' : isPremium ? 'border-accent' : ''
      }`}
    >
      {/* Badge centrado perfectamente */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg ${
              isPremium
                ? 'bg-accent text-accent-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {isPremium ? <Crown className="w-3 h-3" /> : <Star className="w-3 h-3" />}
            {badge}
          </span>
        </div>
      )}

      <div className="mb-4 pt-2">
        <h3 className="text-xl font-display font-bold">{name}</h3>
        <p className="text-sm text-primary/80 mt-1 font-medium">
          {language === 'es' ? 'Ideal para:' : 'Ideal for:'} {idealFor}
        </p>
      </div>

      <div className="mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-display font-bold">{price}€</span>
          <span className="text-muted-foreground text-sm">/{language === 'es' ? 'mes' : 'mo'}</span>
        </div>
        <p className="text-xs text-success mt-1">
          {language === 'es'
            ? `Anual: ${priceAnnual}€ (2 meses gratis)`
            : `Annual: €${priceAnnual} (2 months free)`}
        </p>
      </div>

      {/* Qué obtienes */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          {language === 'es' ? 'Qué obtienes:' : 'What you get:'}
        </p>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cómo funciona */}
      <div className="mb-6 flex-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          {language === 'es' ? 'Cómo funciona:' : 'How it works:'}
        </p>
        <ol className="space-y-1.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 font-semibold">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <Link to="/contacto">
        <Button className={`w-full ${badge ? 'btn-neon' : 'btn-outline-neon'}`}>
          {language === 'es' ? 'Solicitar' : 'Request'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
};
