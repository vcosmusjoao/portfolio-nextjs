"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "portfolio.sound";
const MIN_GAP_MS = 25;

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  /** One keystroke. Silent unless the user has switched sound on. */
  click: () => void;
  /** Increments each time sound is switched on — lets the hero re-type once. */
  armedCount: number;
}

const SoundContext = createContext<SoundContextValue | null>(null);

function createAudioContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return Ctor ? new Ctor() : null;
}

/** A short burst of white noise, reused for every keystroke. */
function createNoise(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function blip(ctx: AudioContext, freq: number, at: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.02, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + 0.07);
}

/**
 * Keystroke sound, synthesised with the Web Audio API — no audio files.
 *
 * Off by default. The AudioContext is only created inside a user gesture,
 * which is what browser autoplay policies require; a preference saved from an
 * earlier visit waits for the first click or keypress before it can sound.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [armedCount, setArmedCount] = useState(0);
  // Mirrors `enabled` so two clicks within one render can't read a stale value.
  const enabledRef = useRef(false);
  const setEnabled = useCallback((value: boolean) => {
    enabledRef.current = value;
    setEnabledState(value);
  }, []);
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const lastClickRef = useRef(0);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
      if (ctxRef.current) noiseRef.current = createNoise(ctxRef.current);
    }
    void ctxRef.current?.resume();
    return ctxRef.current;
  }, []);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (stored !== "on") return;

    setEnabled(true);
    const unlock = () => ensureContext();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [ensureContext, setEnabled]);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    setEnabled(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    if (!next) return;

    const ctx = ensureContext();
    if (ctx) {
      blip(ctx, 660, ctx.currentTime);
      blip(ctx, 990, ctx.currentTime + 0.07);
    }
    setArmedCount((n) => n + 1);
  }, [ensureContext, setEnabled]);

  const click = useCallback(() => {
    const ctx = ctxRef.current;
    const noise = noiseRef.current;
    if (!enabledRef.current || !ctx || !noise || ctx.state !== "running") return;

    const now = performance.now();
    if (now - lastClickRef.current < MIN_GAP_MS) return;
    lastClickRef.current = now;

    const source = ctx.createBufferSource();
    source.buffer = noise;
    source.playbackRate.value = 0.85 + Math.random() * 0.3;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800 + Math.random() * 800;

    const gain = ctx.createGain();
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(t);
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle, click, armedCount }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}
