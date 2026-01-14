import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type NavigatorSfx = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  hover: () => void;
  click: () => void;
  complete: () => void;
};

type Tone = {
  freq: number;
  durationMs: number;
  volume?: number;
};

const STORAGE_KEY = "hydrai_navigator_sfx";

function getAudioContextCtor(): typeof AudioContext | null {
  // Safari
  const AnyWindow = window as unknown as { webkitAudioContext?: typeof AudioContext };
  return window.AudioContext ?? AnyWindow.webkitAudioContext ?? null;
}

function createAudioContext(): AudioContext | null {
  const Ctor = getAudioContextCtor();
  if (!Ctor) return null;
  return new Ctor();
}

function playTone(ctx: AudioContext, tone: Tone) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const now = ctx.currentTime;
  const duration = tone.durationMs / 1000;
  const vol = tone.volume ?? 0.05;

  osc.type = "sine";
  osc.frequency.setValueAtTime(tone.freq, now);

  // Envelope: fast attack, quick decay
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(vol, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.02, duration));

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.03);
}

function playSequence(ctx: AudioContext, tones: Tone[], gapMs = 28) {
  let offset = 0;
  tones.forEach((t) => {
    setTimeout(() => playTone(ctx, t), offset);
    offset += t.durationMs + gapMs;
  });
}

export function useNavigatorSfx(): NavigatorSfx {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastHoverAtRef = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "on") setEnabled(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // ignore
    }
  }, [enabled]);

  const ensureContext = useCallback(async () => {
    if (!ctxRef.current) ctxRef.current = createAudioContext();
    const ctx = ctxRef.current;
    if (!ctx) return null;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }
    return ctx;
  }, []);

  const safePlay = useCallback(
    async (
      tones: Tone | Tone[],
      opts?: {
        throttleHover?: boolean;
      }
    ) => {
      if (!enabled) return;

      if (opts?.throttleHover) {
        const now = Date.now();
        if (now - lastHoverAtRef.current < 120) return;
        lastHoverAtRef.current = now;
      }

      const ctx = await ensureContext();
      if (!ctx) return;

      const list = Array.isArray(tones) ? tones : [tones];
      playSequence(ctx, list);
    },
    [enabled, ensureContext]
  );

  return useMemo(
    () => ({
      enabled,
      setEnabled,
      hover: () =>
        safePlay(
          {
            freq: 420,
            durationMs: 22,
            volume: 0.03,
          },
          { throttleHover: true }
        ),
      click: () =>
        safePlay([
          { freq: 520, durationMs: 20, volume: 0.05 },
          { freq: 760, durationMs: 16, volume: 0.04 },
        ]),
      complete: () =>
        safePlay([
          { freq: 440, durationMs: 80, volume: 0.06 },
          { freq: 660, durationMs: 120, volume: 0.06 },
        ]),
    }),
    [enabled, safePlay]
  );
}
