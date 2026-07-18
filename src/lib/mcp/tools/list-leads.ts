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
  name: "list_leads",
  title: "List leads",
  description:
    "Return the most recent leads captured by the HydrAI Labs website (audit form, contact form, landings). Requires an admin account — non-admin users receive an empty list due to row-level security.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).optional().describe("Maximum number of leads to return (default 20)."),
    status: z
      .enum(["new", "contacted", "qualified", "proposal", "won", "lost"])
      .optional()
      .describe("Optional status filter."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    let query = sb
      .from("leads")
      .select("id, name, email, phone, status, priority, score, source, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { leads: data ?? [] },
    };
  },
});
