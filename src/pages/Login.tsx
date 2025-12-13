import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogIn, UserPlus, ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/admin");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        toast.success("¡Bienvenido!");
      } else {
        const redirectUrl = `${window.location.origin}/admin`;
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { full_name: fullName.trim() },
          },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Revisa tu email para confirmar.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.message?.includes("User already registered")) {
        toast.error("Este email ya está registrado. Inicia sesión.");
      } else if (error.message?.includes("Invalid login credentials")) {
        toast.error("Email o contraseña incorrectos.");
      } else {
        toast.error(error.message || "Error de autenticación");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glow-orb-primary w-96 h-96 -top-48 -left-48 fixed" />
      <div className="glow-orb-secondary w-64 h-64 bottom-0 right-0 fixed" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="card-premium neon-border">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              {isLogin ? "Acceso Admin" : "Crear cuenta"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {isLogin ? "Panel de administración HydrAI Services" : "Regístrate para acceder al panel"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Nombre completo</label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                  className="input-premium"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input-premium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-premium"
                required
                minLength={6}
              />
            </div>

            <Button type="submit" className="btn-neon w-full" disabled={loading}>
              {loading ? (
                "Procesando..."
              ) : isLogin ? (
                <>
                  <LogIn className="mr-2 w-4 h-4" />
                  Iniciar sesión
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 w-4 h-4" />
                  Crear cuenta
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
