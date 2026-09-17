import { FaGavel } from "react-icons/fa";

/**
 * Recreates the agent's own verdict badge (the most recognizable piece of
 * its UI) instead of a screenshot of the demo form - a plain textarea +
 * button doesn't read as a project on its own the way a live badge does.
 */
export default function DisputeCover() {
  return (
    <div className="relative w-full h-44 rounded-md mb-4 overflow-hidden border border-text/10 bg-black flex flex-col items-center justify-center gap-3">
      <div
        aria-hidden="true"
        className="absolute w-40 h-40 rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(52,211,153,0.25), transparent)",
        }}
      />

      <FaGavel
        aria-hidden="true"
        className="absolute text-highlight/10 text-7xl rotate-[-20deg]"
      />

      <span
        className="relative z-10 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-1.5 font-fira-code text-sm font-semibold uppercase tracking-wide text-emerald-400"
        style={{ boxShadow: "0 0 20px 2px rgba(52,211,153,0.25)" }}
      >
        Fight
      </span>
      <span className="relative z-10 font-fira-code text-xs text-text/50">90% confidence</span>
    </div>
  );
}
