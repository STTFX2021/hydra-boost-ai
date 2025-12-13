import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { user, isAdmin, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="card-premium text-center p-8 max-w-md">
          <h1 className="text-2xl font-display font-bold mb-4 text-destructive">403 - Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">
            No tienes permisos de administrador para acceder a esta página.
          </p>
          <a href="/" className="text-primary hover:underline">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
