import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Zap, Star, Phone, Gift } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const Precios = () => {
  const { t, tArray } = useTranslation();

  const packs = [
    {
      id: "web-presencia",
      name: t("pricing.packs.webPresencia.name"),
      description: t("pricing.packs.webPresencia.description"),
      price: "497",
      priceType: t("pricing.oneTimePayment"),
      features: tArray("pricing.packs.webPresencia.features"),
      cta: t("pricing.request"),
      featured: false,
    },
    {
      id: "web-chatbot",
      name: t("pricing.packs.webChatbot.name"),
      description: t("pricing.packs.webChatbot.description"),
      price: "790",
      priceType: t("pricing.oneTimePayment"),
      features: tArray("pricing.packs.webChatbot.features"),
      cta: t("pricing.request"),
      featured: true,
    },
    {
      id: "automatiza-agenda",
      name: t("pricing.packs.automatiza.name"),
      description: t("pricing.packs.automatiza.description"),
      price: "1.290",
      priceType: t("pricing.oneTimePayment"),
      features: tArray("pricing.packs.automatiza.features"),
      cta: t("pricing.request"),
      featured: false,
    },
  ];

  const monthlyPlans = [
    {
      id: "mantenimiento",
      name: t("pricing.monthlyPlans.mantenimiento.name"),
      price: "49",
      description: t("pricing.monthlyPlans.mantenimiento.description"),
    },
    {
      id: "crecimiento",
      name: t("pricing.monthlyPlans.crecimiento.name"),
      price: "99",
      description: t("pricing.monthlyPlans.crecimiento.description"),
    },
  ];

  const faqKeys = ['time', 'includes', 'payment', 'support'];
  const faqs = faqKeys.map(key => ({
    q: t(`pricing.faqs.${key}.q`),
    a: t(`pricing.faqs.${key}.a`),
  }));

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="glow-orb-primary w-96 h-96 -top-48 left-1/2 -translate-x-1/2" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge-primary mb-6 inline-flex">
              <Zap className="w-3 h-3 mr-1" /> {t("pricing.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-primary">{t("pricing.title").split(",")[0]}</span>{t("pricing.title").includes(",") ? "," + t("pricing.title").split(",")[1] : ""}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {t("pricing.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Christmas Ribbon */}
      <div className="section-container -mt-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/30">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t("pricing.ribbon")}</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="section-padding -mt-8">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`${
                  pack.featured ? "pricing-card-featured" : "pricing-card"
                } flex flex-col`}
              >
                {pack.featured && (
                  <div className="absolute top-0 right-4 -translate-y-1/2">
                    <span className="badge-primary flex items-center gap-1">
                      <Star className="w-3 h-3" /> {t("pricing.popular")}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">{pack.price}€</span>
                    <span className="text-muted-foreground text-sm">+ IVA</span>
                  </div>
                  <p className="text-sm text-primary mt-1">{pack.priceType}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contacto">
                  <Button className={`w-full ${pack.featured ? "btn-neon" : "btn-outline-neon"}`}>
                    {pack.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Monthly Plans */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl font-display font-bold text-center mb-8">
              {t("pricing.monthlyPlansTitle").split(" ")[0]} <span className="text-gradient-secondary">{t("pricing.monthlyPlansTitle").split(" ").slice(1).join(" ")}</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {monthlyPlans.map((plan) => (
                <div key={plan.id} className="card-premium">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h4 className="font-display font-bold text-lg">{plan.name}</h4>
                    <span className="text-2xl font-bold text-primary">{plan.price}€</span>
                    <span className="text-sm text-muted-foreground">/{t("pricing.monthly")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Talk to human */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{t("pricing.talkToHuman")}</p>
            <Link to="/contacto">
              <Button variant="outline" className="border-border hover:border-primary">
                <Phone className="w-4 h-4 mr-2" />
                {t("pricing.talkToHumanButton")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/10">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              {t("pricing.faqTitle").split(" ")[0]} <span className="text-gradient-primary">{t("pricing.faqTitle").split(" ").slice(1).join(" ")}</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card-premium">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card-premium text-center p-12 neon-border max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("pricing.ctaTitle")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("pricing.ctaSubtitle")}
            </p>
            <Link to="/auditoria">
              <Button size="lg" className="btn-neon text-lg px-8">
                {t("pricing.ctaButton")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Precios;
