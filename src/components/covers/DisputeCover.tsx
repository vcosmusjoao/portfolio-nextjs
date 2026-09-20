function Row({
  label,
  value,
  valueClass = "text-signal-positive",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <p className="flex items-baseline justify-between gap-4 text-fg-muted">
      <span>{label}</span>
      <span className={valueClass}>{value}</span>
    </p>
  );
}

/**
 * Recreates the agent's own terminal output finishing a triage run, instead
 * of a generic badge-and-glow - ties the cover to the actual LangGraph
 * pipeline (classify -> assess -> decide -> draft) and to the site's
 * terminal voice, and stays legible at any container height.
 */
export default function DisputeCover({ className = "h-44" }: { className?: string }) {
  return (
    <div
      className={`relative w-full ${className} rounded-sm mb-4 overflow-hidden border border-line bg-void flex items-center justify-center px-6`}
    >
      <div className="font-fira-code text-xs sm:text-sm leading-relaxed w-full max-w-[15rem] mx-auto">
        <p className="text-fg-dim mb-2">
          <span className="text-accent">$</span> triage --case #4471
        </p>
        <Row label="classify" value="done" />
        <Row label="assess" value="done" />
        <Row label="decide" value="FIGHT · 90%" valueClass="text-signal-positive font-semibold" />
        <Row label="draft" value="letter ready" />
        <p className="mt-2 text-fg-dim motion-safe:animate-pulse">_</p>
      </div>
    </div>
  );
}
