import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Download } from "lucide-react";

const AdminAssessments = () => {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["admin-assessments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assessments")
        .select("*, leads(name, email)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const exportCSV = () => {
    if (!assessments) return;
    const headers = ["Fecha", "Lead", "Email", "Score", "Prioridad", "Recomendaciones"];
    const rows = assessments.map((a) => [
      format(new Date(a.created_at), "yyyy-MM-dd"),
      a.leads?.name || "",
      a.leads?.email || "",
      a.score || 0,
      a.priority || "",
      a.recommendations_text || "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auditorias-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  if (isLoading) return <div className="text-muted-foreground">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Auditorías</h2>
        <Button onClick={exportCSV} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <div className="space-y-4">
        {assessments?.map((assessment) => (
          <div key={assessment.id} className="card-premium">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold">{assessment.leads?.name || "Sin lead"}</h4>
                <p className="text-sm text-muted-foreground">{assessment.leads?.email}</p>
              </div>
              <div className="text-right">
                <span className={`badge-${assessment.priority === "high" ? "success" : assessment.priority === "medium" ? "warning" : "destructive"}`}>
                  {assessment.priority === "high" ? "Alta" : assessment.priority === "medium" ? "Media" : "Baja"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(assessment.created_at), "d MMM yyyy", { locale: es })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient-primary">{assessment.score}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>
            {assessment.recommendations_text && (
              <div>
                <h5 className="text-sm font-medium mb-2">Recomendaciones:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {assessment.recommendations_text.split("\n").map((rec, i) => (
                    <li key={i}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAssessments;
