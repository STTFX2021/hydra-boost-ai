import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "Return HydrAI Labs blog posts (title, slug, excerpt, published state). Useful for content planning and cross-linking suggestions.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Maximum number of posts (default 20)."),
    only_published: z.boolean().optional().describe("If true, return only published posts."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit, only_published }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    let query = sb
      .from("blog_posts")
      .select("id, title, slug, excerpt, published, published_at, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (only_published) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
