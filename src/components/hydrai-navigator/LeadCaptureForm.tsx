import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; business: string; contact: string }) => void;
  onSkip: () => void;
}

export function LeadCaptureForm({ onSubmit, onSkip }: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contact) {
      onSubmit({ name, business, contact });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="text-sm text-muted-foreground mb-3">
        Opcional: Déjame tus datos y te aviso cuando tengamos algo especial.
      </div>

      <Input
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-black/30 border-border/50 focus:border-primary"
      />

      <Input
        placeholder="Tu negocio (opcional)"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        className="bg-black/30 border-border/50 focus:border-primary"
      />

      <Input
        placeholder="Email o WhatsApp"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="bg-black/30 border-border/50 focus:border-primary"
      />

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={!name || !contact}
          className="flex-1"
        >
          <Send className="w-4 h-4 mr-2" />
          Enviar
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onSkip}
          className="text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </motion.form>
  );
}
