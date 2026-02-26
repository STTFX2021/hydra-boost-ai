import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Save, ExternalLink } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    resendApiKey: "",
    discordWebhook: "",
    calendlyLink: "",
    stripeKey: "",
  });

  const handleSave = () => {
    toast.success("Configuración guardada (demo)");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-display font-bold">Configuración</h2>

      <div className="card-premium space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Integraciones</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Resend API Key</label>
              <Input
                type="password"
                value={settings.resendApiKey}
                onChange={(e) => setSettings({ ...settings, resendApiKey: e.target.value })}
                placeholder="re_xxxxx"
                className="input-premium"
              />
              <a
                href="https://resend.com/api-keys"
                target="_blank"
                rel="noopener"
                className="text-xs text-primary flex items-center gap-1 mt-1"
              >
                Obtener API key <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div>
              <label className="block text-sm mb-2">Discord Webhook URL</label>
              <Input
                type="url"
                value={settings.discordWebhook}
                onChange={(e) => setSettings({ ...settings, discordWebhook: e.target.value })}
                placeholder="https://discordapp.com/api/webhooks/1476563860805648445/LeOqqp-Si20yqpA9bXHo8pa4kA7JKGYCKzS0DW9nkhEh5lQVocguiiMHOw4CQN7kpYmi"
                className="input-premium"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Calendly Link</label>
              <Input
                type="url"
                value={settings.calendlyLink}
                onChange={(e) => setSettings({ ...settings, calendlyLink: e.target.value })}
                placeholder="https://calendly.com/tu-link"
                className="input-premium"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Stripe Secret Key (opcional)</label>
              <Input
                type="password"
                value={settings.stripeKey}
                onChange={(e) => setSettings({ ...settings, stripeKey: e.target.value })}
                placeholder="sk_live_xxxxx"
                className="input-premium"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="btn-neon">
          <Save className="w-4 h-4 mr-2" />
          Guardar configuración
        </Button>
      </div>

      <div className="card-premium">
        <h3 className="font-semibold mb-4">Información del proyecto</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Para configurar los secretos de producción, ve a la configuración del proyecto.</p>
          <p>Las integraciones se activan automáticamente cuando agregas las API keys correspondientes.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
