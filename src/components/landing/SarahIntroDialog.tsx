import type { ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, Mic, Pizza, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VOZRA_RAPID_DEMOS } from "@/config/vozraDemos";

interface SarahIntroDialogProps {
  trigger: ReactNode;
}

const examples = [
  "Quiero pedir dos pizzas para recoger.",
  "Añade extra de queso y quita la cebolla.",
  "El pedido es a domicilio y esta es mi dirección.",
];

export const SarahIntroDialog = ({ trigger }: SarahIntroDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto border-border/60 bg-background/95 p-0 shadow-2xl shadow-black/60 backdrop-blur-xl sm:rounded-3xl">
      <div className="relative overflow-hidden rounded-t-3xl border-b border-border/50 bg-card/70 px-6 py-7 sm:px-8">
        <div className="glow-orb-primary -right-20 -top-20 h-56 w-56 opacity-15" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
            <Pizza className="h-7 w-7" />
          </div>
          <DialogHeader className="text-left">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Antes de comenzar</div>
            <DialogTitle className="text-2xl leading-tight sm:text-3xl">Vas a hablar con Sarah</DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-6 sm:text-base">
              Sarah es una recepcionista de pedidos de una pizzería de demostración. Está preparada para atender a un cliente, entender su pedido y recopilar los datos necesarios para enviarlo al negocio.
            </DialogDescription>
          </DialogHeader>
        </div>
      </div>

      <div className="space-y-6 px-6 py-7 sm:px-8">
        <div className="rounded-2xl border border-warning/25 bg-warning/5 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div>
              <p className="font-semibold text-foreground">Prueba centrada exclusivamente en pedidos</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Habla como si estuvieras llamando a una pizzería para hacer un pedido. Preguntas sobre otros negocios, temas generales o funciones que no sean pedidos pueden no entenderse correctamente.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Puedes probar frases como estas</h3>
          <ul className="mt-4 space-y-3">
            {examples.map((example) => (
              <li key={example} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/45 px-4 py-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                “{example}”
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
          <Mic className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>El navegador solicitará permiso para utilizar el micrófono. Habla con naturalidad y espera a que Sarah termine antes de responder.</p>
        </div>
      </div>

      <DialogFooter className="gap-3 border-t border-border/50 bg-card/30 px-6 py-5 sm:px-8">
        <DialogClose asChild>
          <Button variant="outline" className="w-full sm:w-auto">Volver</Button>
        </DialogClose>
        <a href={VOZRA_RAPID_DEMOS.sarah.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button className="btn-neon btn-depth w-full">
            <Mic className="mr-2 h-4 w-4" />
            Entendido, hablar con Sarah
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
