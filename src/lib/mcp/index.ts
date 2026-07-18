import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeadsTool from "./tools/list-leads";
import listAssessmentsTool from "./tools/list-assessments";
import listBlogPostsTool from "./tools/list-blog-posts";

// Build the OAuth issuer from the project ref so it stays import-safe (no
// runtime env read at module top level) and points at the direct supabase.co
// host, not the Lovable Cloud proxy.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "hydrailabs-mcp",
  title: "HydrAI Labs MCP",
  version: "0.1.0",
  instructions:
    "Tools for the HydrAI Labs website. Use `list_leads` to inspect recent leads, `list_assessments` for diagnostic submissions, and `list_blog_posts` for content planning. All tools act as the signed-in user and respect row-level security (admin access required for leads and assessments).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeadsTool, listAssessmentsTool, listBlogPostsTool],
});
