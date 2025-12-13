import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statuses = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
const statusLabels: Record<string, string> = {
  new: "Nuevo", contacted: "Contactado", qualified: "Cualificado",
  proposal: "Propuesta", won: "Ganado", lost: "Perdido"
};
const statusColors: Record<string, string> = {
  new: "primary", contacted: "secondary", qualified: "warning",
  proposal: "accent", won: "success", lost: "destructive"
};

const AdminLeads = () => {
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: typeof statuses[number] }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      toast.success("Estado actualizado");
    },
  });

  if (isLoading) return <div className="text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Leads Pipeline</h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <div key={status} className="kanban-column">
            <h3 className={`font-semibold mb-4 badge-${statusColors[status]} inline-flex`}>
              {statusLabels[status]} ({leads?.filter(l => l.status === status).length || 0})
            </h3>
            <div className="space-y-3">
              {leads?.filter(l => l.status === status).map((lead) => (
                <div key={lead.id} className="kanban-card">
                  <h4 className="font-medium text-sm">{lead.name}</h4>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                  {lead.business_name && <p className="text-xs text-muted-foreground">{lead.business_name}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    {lead.score && <span className="badge-primary text-xs">Score: {lead.score}</span>}
                    {lead.vertical && <span className="text-xs text-muted-foreground">{lead.vertical}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(new Date(lead.created_at), "d MMM", { locale: es })}
                  </p>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value as typeof statuses[number] })}
                    className="mt-2 w-full text-xs bg-muted border border-border rounded px-2 py-1"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeads;
