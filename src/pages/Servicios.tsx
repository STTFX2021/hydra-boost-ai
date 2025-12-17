import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, Bot, Calendar, Star, Users, TrendingUp,
  ArrowRight, CheckCircle2, Clock, Zap, Gift
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const Servicios = () => {
  const { t, tArray } = useTranslation();

  const serviceKeys = ['webPresencia', 'webChatbot', 'automatiza', 'reputacion', 'leadCapture', 'mantenimiento'];
  const serviceIcons: Record<string, any> = {
    webPresencia: Globe,
    webChatbot: Bot,
    automatiza: Calendar,
    reputacion: Star,
    leadCapture: Users,
    mantenimiento: TrendingUp,
  };

  const services = serviceKeys.map(key => ({
    id: key,
    icon: serviceIcons[key],
    title: t(`services.${key}.title`),
    subtitle: t(`services.${key}.subtitle`),
    description: t(`services.${key}.description`),
    features: tArray(`services.${key}.features`),
    deliverables: tArray(`services.${key}.deliverables`),
    time: t(`services.${key}.time`),
    price: t(`services.${key}.price`),
    kpis: tArray(`services.${key}.kpis`),
  }));

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb-secondary w-64 h-64 bottom-0 left-0" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t("services.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {t("services.title").split(" ").slice(0, 2).join(" ")} <span className="text-gradient-primary">{t("services.title").split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("services.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Christmas Ribbon */}
      <div className="section-container -mt-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/30">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t("services.ribbon")}</span>
          </div>
        </div>
      </div>

      {/* Services List */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-2">{service.title}</h2>
                  <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <h4 className="font-semibold mb-3">{t("services.includes")}</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="badge-primary text-sm font-semibold">{service.price}</span>
                  </div>

                  <Link to="/contacto">
                    <Button className="btn-neon">
                      {t("services.requestService")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className={`card-premium ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{t("services.deliverables")}</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{t("services.implementTime")}</span>
                      <span className="font-semibold">{service.time}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{t("services.expectedKpis")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.kpis.map((kpi, i) => (
                          <span key={i} className="badge-success text-xs">{kpi}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container relative z-10">
          <div className="card-premium text-center p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("services.ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("services.ctaSubtitle")}
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t("services.ctaButton")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Servicios;
