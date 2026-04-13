import { useParams, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { getAgentBySlug } from "@/data/agents";
import { getAgentConversionData } from "@/data/agentConversion";
import {
  AgentHero,
  AgentProblemSolution,
  AgentVerticals,
  AgentWorkflow,
  AgentSubstitutes,
  AgentMetrics,
  AgentSteps,
  AgentIdealFor,
  AgentDelivery,
  AgentStack,
  AgentIntegrations,
  AgentUseCases,
  AgentSignals,
  AgentFAQ,
  AgentNextSteps,
  AgentRelatedLinks,
  AgentCTA,
  MobileStickyAgentCTA,
} from "@/components/agents";

export default function AgentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const agent = slug ? getAgentBySlug(slug) : undefined;
  const conversion = slug ? getAgentConversionData(slug) : undefined;

  if (!agent) return <Navigate to="/agentes-ia" replace />;

  return (
    <>
      <SEOHead
        title={agent.seoTitle}
        description={agent.seoDescription}
        canonical={`/agentes-ia/${agent.slug}`}
        keywords={agent.seoKeywords}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Agentes IA", url: "/agentes-ia" },
          { name: agent.name, url: `/agentes-ia/${agent.slug}` },
        ]}
      />

      <PageLayout>
        <AgentHero agent={agent} />
        <AgentProblemSolution agent={agent} />

        {conversion && <AgentVerticals propositions={conversion.verticalPropositions} />}

        <AgentWorkflow nodes={agent.workflowNodes} />

        {conversion && <AgentSubstitutes substitutes={conversion.substitutes} />}
        {conversion && <AgentMetrics metrics={conversion.impactMetrics} />}

        <AgentSteps steps={agent.steps} />

        {conversion && <AgentIdealFor sectors={conversion.idealSectors} />}
        {conversion && <AgentDelivery delivery={conversion.delivery} />}
        {conversion && <AgentStack stack={conversion.stack} />}

        <AgentIntegrations integrations={agent.integrations} />
        <AgentUseCases useCases={agent.useCases} />

        {conversion && <AgentSignals signals={conversion.signals} agentName={agent.name} />}

        <AgentFAQ faqs={agent.faqs} agentName={agent.name} />

        {conversion && <AgentNextSteps steps={conversion.nextSteps} />}
        {conversion && <AgentRelatedLinks links={conversion.relatedLinks} />}

        <AgentCTA agent={agent} />

        {/* Mobile sticky CTA */}
        <MobileStickyAgentCTA agentName={agent.name} />
      </PageLayout>
    </>
  );
}
