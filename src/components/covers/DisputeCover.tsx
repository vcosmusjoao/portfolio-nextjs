import { FaGavel } from "react-icons/fa";

/**
 * Recreates the agent's own verdict badge (the most recognizable piece of
 * its UI) instead of a screenshot of the demo form - a plain textarea +
 * button doesn't read as a project on its own the way a live badge does.
 */
export default function DisputeCover() {
  return (
    <div className="relative w-full h-44 rounded-sm mb-4 overflow-hidden border border-line bg-void flex flex-col items-center justify-center gap-3">
      <div
        aria-hidden="true"
        className="absolute w-40 h-40 rounded-full bg-[radial-gradient(closest-side,var(--color-signal-positive),transparent)] opacity-25"
      />

      <FaGavel
        aria-hidden="true"
        className="absolute text-fg-faint/20 text-7xl rotate-[-20deg]"
      />

      <span className="relative z-10 rounded-full border border-signal-positive/60 bg-signal-positive/10 px-4 py-1.5 font-fira-code text-sm font-semibold uppercase tracking-wide text-signal-positive shadow-[0_0_20px_2px] shadow-signal-positive/25">
        Fight
      </span>
      <span className="relative z-10 font-fira-code text-xs text-fg-dim">90% confidence</span>
    </div>
  );
}
