import { Check, X, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ComparisonTableProps {
  language: 'es' | 'en';
}

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  starter: FeatureValue;
  pro: FeatureValue;
  autonomous: FeatureValue;
  elite: FeatureValue;
}

interface Category {
  name: string;
  features: Feature[];
}

export const ComparisonTable = ({ language }: ComparisonTableProps) => {
  const isMobile = useIsMobile();

  const categories: Category[] = language === 'es' 
    ? [
        {
          name: "Captación y Leads",
          features: [
            { name: "Formulario web + chat", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Registro automático de leads", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Alertas instantáneas", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Multichannel (WhatsApp, Instagram, etc.)", starter: false, pro: true, autonomous: true, elite: true },
          ],
        },
        {
          name: "Seguimiento y Ventas",
          features: [
            { name: "Follow-up automático", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Plantillas de mensajes", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Scoring y prioridad de leads", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Nutrición de leads", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Agentes de ventas IA", starter: false, pro: "1", autonomous: "3", elite: "Ilimitados" },
          ],
        },
        {
          name: "Operaciones y Control",
          features: [
            { name: "Monitorización 24/7", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Alertas proactivas", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Mantenimiento incluido", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Automatizaciones personalizadas", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Detección de cuellos de botella", starter: false, pro: false, autonomous: true, elite: true },
          ],
        },
        {
          name: "Reporting",
          features: [
            { name: "Resumen de actividad", starter: "Semanal", pro: "Semanal", autonomous: "Diario", elite: "Tiempo real" },
            { name: "Métricas de conversión", starter: false, pro: true, autonomous: true, elite: true },
            { name: "ROI y tiempo ahorrado", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Dashboard ejecutivo", starter: false, pro: false, autonomous: false, elite: true },
          ],
        },
        {
          name: "Soporte",
          features: [
            { name: "Email", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Prioritario", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Canal dedicado", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Account manager", starter: false, pro: false, autonomous: false, elite: true },
          ],
        },
      ]
    : [
        {
          name: "Lead Capture",
          features: [
            { name: "Web form + chat", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Automatic lead registration", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Instant alerts", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Multichannel (WhatsApp, Instagram, etc.)", starter: false, pro: true, autonomous: true, elite: true },
          ],
        },
        {
          name: "Follow-up & Sales",
          features: [
            { name: "Automatic follow-up", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Message templates", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Lead scoring & priority", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Lead nurturing", starter: false, pro: true, autonomous: true, elite: true },
            { name: "AI sales agents", starter: false, pro: "1", autonomous: "3", elite: "Unlimited" },
          ],
        },
        {
          name: "Operations & Control",
          features: [
            { name: "24/7 monitoring", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Proactive alerts", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Maintenance included", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Custom automations", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Bottleneck detection", starter: false, pro: false, autonomous: true, elite: true },
          ],
        },
        {
          name: "Reporting",
          features: [
            { name: "Activity summary", starter: "Weekly", pro: "Weekly", autonomous: "Daily", elite: "Real-time" },
            { name: "Conversion metrics", starter: false, pro: true, autonomous: true, elite: true },
            { name: "ROI & time saved", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Executive dashboard", starter: false, pro: false, autonomous: false, elite: true },
          ],
        },
        {
          name: "Support",
          features: [
            { name: "Email", starter: true, pro: true, autonomous: true, elite: true },
            { name: "Priority", starter: false, pro: true, autonomous: true, elite: true },
            { name: "Dedicated channel", starter: false, pro: false, autonomous: true, elite: true },
            { name: "Account manager", starter: false, pro: false, autonomous: false, elite: true },
          ],
        },
      ];

  const renderValue = (value: FeatureValue) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-success mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
      );
    }
    return <span className="text-sm font-medium text-primary">{value}</span>;
  };

  const plans = [
    { key: 'starter', name: 'Starter', price: '199€' },
    { key: 'pro', name: 'Pro', price: '499€', popular: true },
    { key: 'autonomous', name: 'Autonomous', price: '999€' },
    { key: 'elite', name: 'Elite', price: language === 'es' ? 'A medida' : 'Custom', elite: true },
  ];

  // Mobile: Accordion view
  if (isMobile) {
    return (
      <motion.section 
        className="section-padding"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
              {language === 'es' ? 'Comparar planes' : 'Compare plans'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'es' 
                ? 'Todas las funcionalidades lado a lado' 
                : 'All features side by side'}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {categories.map((category, catIndex) => (
              <AccordionItem 
                key={catIndex} 
                value={`category-${catIndex}`}
                className="border border-border rounded-lg overflow-hidden bg-card/50"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="font-semibold">{category.name}</span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-t border-border bg-muted/30">
                          <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground sticky left-0 bg-muted/30 min-w-[120px]">
                            Feature
                          </th>
                          {plans.map((plan) => (
                            <th 
                              key={plan.key} 
                              className="px-2 py-2 text-center text-xs font-medium"
                            >
                              <div className="flex flex-col items-center gap-0.5">
                                {plan.popular && (
                                  <Star className="w-3 h-3 text-primary" />
                                )}
                                {plan.elite && (
                                  <Sparkles className="w-3 h-3 text-accent" />
                                )}
                                <span className={plan.elite ? 'text-accent' : ''}>{plan.name}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {category.features.map((feature, featIndex) => (
                          <tr key={featIndex} className="border-t border-border/50">
                            <td className="text-left px-3 py-2.5 text-sm text-muted-foreground sticky left-0 bg-card/50">
                              {feature.name}
                            </td>
                            <td className="px-2 py-2.5 text-center">{renderValue(feature.starter)}</td>
                            <td className="px-2 py-2.5 text-center bg-primary/5">{renderValue(feature.pro)}</td>
                            <td className="px-2 py-2.5 text-center">{renderValue(feature.autonomous)}</td>
                            <td className="px-2 py-2.5 text-center bg-accent/5">{renderValue(feature.elite)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    );
  }

  // Desktop: Full table
  return (
    <motion.section 
      className="section-padding"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {language === 'es' ? 'Comparar planes' : 'Compare plans'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'es' 
              ? 'Todas las funcionalidades lado a lado' 
              : 'All features side by side'}
          </p>
        </div>

        <div className="max-w-5xl mx-auto card-premium overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-[200px]"></TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-display font-bold">Starter</span>
                    <span className="text-sm text-muted-foreground">199€/mes</span>
                  </div>
                </TableHead>
                <TableHead className="text-center bg-primary/5 relative">
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground whitespace-nowrap">
                      <Star className="w-3 h-3" />
                      {language === 'es' ? 'Más popular' : 'Most popular'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 pt-2">
                    <span className="font-display font-bold">Pro</span>
                    <span className="text-sm text-muted-foreground">499€/mes</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-display font-bold">Autonomous</span>
                    <span className="text-sm text-muted-foreground">999€/mes</span>
                  </div>
                </TableHead>
                <TableHead className="text-center bg-accent/5">
                  <div className="flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1 font-display font-bold text-accent">
                      <Sparkles className="w-4 h-4" />
                      Elite
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {language === 'es' ? 'A medida' : 'Custom'}
                    </span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, catIndex) => (
                <>
                  <TableRow key={`cat-${catIndex}`} className="bg-muted/30 hover:bg-muted/40">
                    <TableCell colSpan={5} className="font-semibold text-foreground py-3">
                      {category.name}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, featIndex) => (
                    <TableRow key={`feat-${catIndex}-${featIndex}`} className="border-border/50">
                      <TableCell className="text-muted-foreground">{feature.name}</TableCell>
                      <TableCell className="text-center">{renderValue(feature.starter)}</TableCell>
                      <TableCell className="text-center bg-primary/5">{renderValue(feature.pro)}</TableCell>
                      <TableCell className="text-center">{renderValue(feature.autonomous)}</TableCell>
                      <TableCell className="text-center bg-accent/5">{renderValue(feature.elite)}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.section>
  );
};