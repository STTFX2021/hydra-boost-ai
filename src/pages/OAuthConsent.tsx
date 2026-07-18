import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";

// The `supabase.auth.oauth` namespace is currently in beta; declare the
// minimal surface we use here so TS compiles without depending on unreleased
// SDK type updates.
type OAuthResult = {
  redirect_url?: string;
  redirect_to?: string;
  client?: { name?: string; client_id?: string; redirect_uri?: string };
  scope?: string;
  scopes?: string[];
};
type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
};

function getOAuth(): OAuthNamespace | null {
  const authAny = (supabase.auth as unknown as { oauth?: OAuthNamespace });
  return authAny.oauth ?? null;
}

function isSameOriginPath(value: string | null): value is string {
  return !!value && value.startsWith("/") && !value.startsWith("//");
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Falta el parámetro authorization_id");
      const oauth = getOAuth();
      if (!oauth) return setError("La API OAuth de Supabase no está disponible en este proyecto.");

      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }

      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    const oauth = getOAuth();
    if (!oauth) return;
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("El servidor de autorización no devolvió URL de redirección.");
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="card-premium max-w-md w-full">
          <h1 className="text-xl font-display font-bold mb-2">No se pudo cargar la autorización</h1>
          <p className="text-sm text-muted-foreground mb-6">{error}</p>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Cargando solicitud de autorización…
        </div>
      </div>
    );
  }

  const clientName = details.client?.name ?? "una aplicación externa";
  const scopes = details.scopes ?? (details.scope ? details.scope.split(/\s+/) : []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glow-orb-primary w-96 h-96 -top-48 -left-48 fixed" />
      <div className="w-full max-w-md relative z-10">
        <div className="card-premium neon-border">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold">Conectar {clientName} a HydrAI Labs</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {clientName} podrá invocar las herramientas MCP de esta app actuando como tú.
            </p>
          </div>

          <div className="space-y-3 text-sm mb-6">
            <p className="text-muted-foreground">
              Esto <strong>no</strong> omite las políticas de acceso ni el row-level security de la base de datos.
            </p>
            {scopes.length > 0 && (
              <div>
                <p className="font-medium mb-1">Permisos solicitados</p>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {scopes.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {details.client?.redirect_uri && (
              <p className="text-xs text-muted-foreground break-all">
                Redirect URI: <code>{details.client.redirect_uri}</code>
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aprobar"}
            </Button>
            <Button className="flex-1" variant="outline" disabled={busy} onClick={() => decide(false)}>
              Denegar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
