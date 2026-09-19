/**
 * Small monospace fact strip — `66 MODULES · 10 SQUADS · 14 PRODUCTS`.
 *
 * Set `decorative` when the items only restate copy that sits next to it, so a
 * screen reader isn't made to read the same facts twice.
 */
export default function TelemetryLabel({
  items,
  decorative = false,
  className = "",
}: {
  items: string[];
  decorative?: boolean;
  className?: string;
}) {
  return (
    <p
      aria-hidden={decorative || undefined}
      className={`font-fira-code text-[10px] uppercase tracking-[0.18em] text-fg-faint ${className}`}
    >
      {items.join(" · ")}
    </p>
  );
}
