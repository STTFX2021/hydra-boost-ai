import { useParams, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead, BreadcrumbSchema } from "@/components/seo";
import { getAgentBySlug } from "@/data/agents";
import {
  AgentHero,
  AgentProblemSolution,
  AgentWorkflow,
  AgentSteps,
  AgentIntegrations,
  AgentUseCases,
  AgentFAQ,
  AgentCTA,
} from "@/components/agents";

export default function AgentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const agent = slug ? getAgentBySlug(slug) : undefined;

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
        <AgentWorkflow nodes={agent.workflowNodes} />
        <AgentSteps steps={agent.steps} />
        <AgentIntegrations integrations={agent.integrations} />
        <AgentUseCases useCases={agent.useCases} />
        <AgentFAQ faqs={agent.faqs} agentName={agent.name} />
        <AgentCTA agent={agent} />
      </PageLayout>
    </>
  );
}
