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
  /** One note from the scale below, by index — sweeping the cloud plays a tune. */
  note: (index: number) => void;
  /** A small electric crack for hovering small things like chips. */
  spark: () => void;
  /** Increments each time sound is switched on — lets the hero re-type once. */
  armedCount: number;
}

/**
 * C major pentatonic. It has no semitone clashes, so the notes sound musical
 * in any order — whichever way a visitor sweeps across the cloud.
 */
const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];

const SoundContext = createContext<SoundContextValue | null>(null);

function createAudioContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return Ctor ? new Ctor() : null;
}

/** A burst of white noise, reused for keystrokes (short) and sparks (longer). */
function createNoise(ctx: AudioContext, seconds = 0.03): AudioBuffer {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** One short square tone — the two-note chirp when sound is switched on. */
function chirp(ctx: AudioContext, freq: number, at: number) {
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
  const sparkNoiseRef = useRef<AudioBuffer | null>(null);
  const lastClickRef = useRef(0);
  const lastNoteRef = useRef(0);
  const lastBlipRef = useRef(0);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
      if (ctxRef.current) {
        noiseRef.current = createNoise(ctxRef.current);
        sparkNoiseRef.current = createNoise(ctxRef.current, 0.25);
      }
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
      chirp(ctx, 660, ctx.currentTime);
      chirp(ctx, 990, ctx.currentTime + 0.07);
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

  const note = useCallback((index: number) => {
    const ctx = ctxRef.current;
    if (!enabledRef.current || !ctx || ctx.state !== "running") return;

    const now = performance.now();
    if (now - lastNoteRef.current < 70) return;
    lastNoteRef.current = now;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = SCALE[index % SCALE.length];
    // Short swell then decay, so a quick sweep sounds plucked rather than buzzy.
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  }, []);

  /**
   * A small electric crack, so chips don't sound like the cloud's notes: noise
   * rather than a tone, with a near-instant attack and a bandpass sweeping
   * from high down to low — that fall is what makes it read as a spark.
   */
  const spark = useCallback(() => {
    const ctx = ctxRef.current;
    const noise = sparkNoiseRef.current;
    if (!enabledRef.current || !ctx || !noise || ctx.state !== "running") return;

    const now = performance.now();
    if (now - lastBlipRef.current < 80) return;
    lastBlipRef.current = now;

    const t = ctx.currentTime;
    const source = ctx.createBufferSource();
    source.buffer = noise;
    source.playbackRate.value = 0.9 + Math.random() * 0.35;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.9;
    band.frequency.setValueAtTime(5000 + Math.random() * 1800, t);
    band.frequency.exponentialRampToValueAtTime(650, t + 0.15);

    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 350;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.055, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.19);

    source.connect(band).connect(highpass).connect(gain).connect(ctx.destination);
    source.start(t);
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle, click, note, spark, armedCount }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}
