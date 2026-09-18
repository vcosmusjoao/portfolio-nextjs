import Image from "next/image";
import { FiPower } from "react-icons/fi";

/**
 * Recreates Mixórdia's own boot-up intro (mxd wordmark + glowing power
 * button) instead of a screenshot of an internal admin page — closer to
 * what actually makes the brand feel alive.
 */
export default function MixordiaCover() {
  return (
    <div className="relative w-full h-44 rounded-sm mb-4 overflow-hidden border border-line bg-void flex flex-col items-center justify-center gap-5">
      <div
        aria-hidden="true"
        className="absolute bottom-0 w-40 h-24 rounded-full bg-[radial-gradient(closest-side,var(--color-signal-negative),transparent)] opacity-35"
      />

      <Image
        src="/images/projects/mxd-logo.svg"
        alt="Mixórdia"
        width={320}
        height={158}
        className="w-32 relative z-10 select-none pointer-events-none"
        style={{ filter: "grayscale(1) brightness(1.6)", opacity: 0.18 }}
      />

      <div
        aria-hidden="true"
        className="relative z-10 w-9 h-9 rounded-full border-2 border-signal-negative/70 flex items-center justify-center text-signal-negative shadow-[0_0_16px_3px] shadow-signal-negative/45"
      >
        <FiPower className="text-base" />
      </div>
    </div>
  );
}
