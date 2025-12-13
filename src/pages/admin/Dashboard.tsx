import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  ClipboardList, Menu, X, TrendingUp, MessageSquare, Star
} from "lucide-react";
import { User, Session } from "@supabase/supabase-js";
import AdminLeads from "./Leads";
import AdminAssessments from "./Assessments";
import AdminBlog from "./Blog";
import AdminSettings from "./Settings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) navigate("/login");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) navigate("/login");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [leads, assessments, posts] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact" }),
        supabase.from("assessments").select("id", { count: "exact" }),
        supabase.from("blog_posts").select("id", { count: "exact" }),
      ]);
      return {
        leads: leads.count || 0,
        assessments: assessments.count || 0,
        posts: posts.count || 0,
      };
    },
    enabled: !!user,
  });

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/leads", label: "Leads", icon: Users },
    { to: "/admin/assessments", label: "Auditorías", icon: ClipboardList },
    { to: "/admin/blog", label: "Blog", icon: FileText },
    { to: "/admin/settings", label: "Configuración", icon: Settings },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <Link to="/" className="font-display text-lg font-bold text-gradient-primary">
              HydrAI Labs
            </Link>
            <button className="lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive(item.to, item.exact)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="text-xs text-sidebar-foreground/60 mb-2 truncate">{user.email}</div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-sidebar-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-40 h-14 bg-background/80 backdrop-blur border-b border-border flex items-center px-4 gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-display font-semibold">Admin Dashboard</h1>
        </header>

        <main className="p-6">
          <Routes>
            <Route index element={
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold">Bienvenido</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="card-premium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stats?.leads || 0}</div>
                        <div className="text-sm text-muted-foreground">Leads</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-premium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stats?.assessments || 0}</div>
                        <div className="text-sm text-muted-foreground">Auditorías</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-premium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stats?.posts || 0}</div>
                        <div className="text-sm text-muted-foreground">Posts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="assessments" element={<AdminAssessments />} />
            <Route path="blog/*" element={<AdminBlog />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-background/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;
