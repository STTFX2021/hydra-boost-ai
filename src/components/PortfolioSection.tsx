import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { PORTFOLIO_LINKS, isValidUrl } from "@/lib/constants";
import { ExternalLink, TrendingUp, Shield, Gamepad2, Globe, Zap } from "lucide-react";

const projects = [
  {
    id: 'trade-vortex',
    title: 'Trade Vortex / Investor Hub',
    description: 'Plataforma de trading algorítmico con IA para inversores',
    stack: 'Python · TensorFlow · AWS',
    icon: TrendingUp,
    color: 'primary',
    url: PORTFOLIO_LINKS.tradeVortex,
  },
  {
    id: 'argus-ai',
    title: 'ARGUS AI Integration',
    description: 'Sistema de seguridad empresarial con Knowledge Graph',
    stack: 'AWS · Neo4j · FastAPI',
    icon: Shield,
    color: 'secondary',
    url: PORTFOLIO_LINKS.argusAI,
  },
  {
    id: 'xauusd-orochi',
    title: 'XAUUSD Trend Weaver / Orochi',
    description: 'Bot de trading automatizado para mercado de oro',
    stack: 'Python · MetaTrader · ML',
    icon: Zap,
    color: 'accent',
    url: PORTFOLIO_LINKS.xauusdOrochi,
  },
  {
    id: 'prank-brawlers',
    title: 'PRANK / PRANK BRAWLERS',
    description: 'Videojuego multijugador con elementos generados por IA',
    stack: 'Unity · C# · Firebase',
    icon: Gamepad2,
    color: 'primary',
    url: PORTFOLIO_LINKS.prankBrawlers,
  },
];

export const PortfolioSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/10">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="badge-accent mb-4 inline-flex">
            <Globe className="w-3 h-3 mr-1" /> Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('portfolio.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => {
            const hasUrl = isValidUrl(project.url);
            const IconComponent = project.icon;
            
            return (
              <div key={project.id} className="card-premium group flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center mb-4 group-hover:bg-${project.color}/20 transition`}>
                  <IconComponent className={`w-6 h-6 text-${project.color}`} />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 flex-1">{project.description}</p>
                <p className="text-xs text-primary mb-4">{project.stack}</p>
                
                {hasUrl ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="w-full btn-outline-neon">
                      {t('portfolio.viewProject')}
                      <ExternalLink className="ml-2 w-3 h-3" />
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" variant="ghost" disabled className="w-full">
                    {t('portfolio.comingSoon')}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
