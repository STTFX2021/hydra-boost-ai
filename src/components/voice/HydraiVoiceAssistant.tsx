import { useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Mic, MicOff, PhoneOff, X } from "lucide-react";

const ELEVENLABS_AGENT_ID = "agent_9201kwkjhahded5tcj42fkj25thn";

function VoiceAssistantPanel() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const conversation = useConversation({
    serverLocation: "eu-residency",
    onError: () => setError("No hemos podido conectar con el asistente. Inténtalo de nuevo."),
  });

  const startConversation = async () => {
    setError("");

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId: ELEVENLABS_AGENT_ID });
    } catch {
      setError("No hemos podido acceder al micrófono. Revisa los permisos del navegador.");
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
  };

  const connected = conversation.status === "connected";
  const connecting = conversation.status === "connecting";

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-4 flex h-[min(620px,calc(100vh-110px))] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-cyan-300/25 bg-zinc-950 shadow-2xl shadow-cyan-500/15">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="font-semibold text-white">Asistente de voz HydrAI</p>
              <p className="mt-1 text-xs text-cyan-300">
                {connected
                  ? conversation.isSpeaking
                    ? "Hablando"
                    : "Escuchando"
                  : connecting
                    ? "Conectando"
                    : "Disponible"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Cerrar asistente"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-400/10">
              <div className={connected ? "absolute inset-0 animate-ping rounded-full border border-cyan-300/20" : ""} />
              <Mic className="h-11 w-11 text-cyan-300" />
            </div>

            <h2 className="mt-7 text-2xl font-semibold text-white">Habla con HydrAI</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Cuéntanos qué quieres crear, mejorar o automatizar y te orientaremos sobre la solución más adecuada.
            </p>

            <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-5 text-zinc-500">
              Conversarás con un asistente de inteligencia artificial. El micrófono solo se activa cuando tú lo autorizas.
            </p>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
          </div>

          <div className="border-t border-white/10 p-5">
            {!connected ? (
              <button
                type="button"
                onClick={startConversation}
                disabled={connecting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-4 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"
              >
                <Mic className="h-5 w-5" />
                {connecting ? "Conectando..." : "Iniciar conversación"}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => conversation.setMuted(!conversation.isMuted)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 font-medium text-white transition hover:bg-white/5"
                >
                  {conversation.isMuted ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  {conversation.isMuted ? "Activar" : "Silenciar"}
                </button>
                <button
                  type="button"
                  onClick={endConversation}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-500/15 px-4 py-3 font-medium text-red-200 transition hover:bg-red-500/25"
                >
                  <PhoneOff className="h-5 w-5" />
                  Finalizar
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-full border border-cyan-300/35 bg-black px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:border-cyan-300/70"
        aria-label="Abrir asistente de voz HydrAI"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-black">
          <Mic className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">Habla con HydrAI</span>
      </button>
    </div>
  );
}

export function HydraiVoiceAssistant() {
  return (
    <ConversationProvider>
      <VoiceAssistantPanel />
    </ConversationProvider>
  );
}
