import { Fragment } from "react";

/**
 * Renders a translated string where **double-asterisk** spans become the
 * cyan highlight. Keeps dictionary sentences readable in both languages
 * instead of splitting them into separate JSX fragments per emphasis.
 */
export default function RichText({ children }: { children: string }) {
  const parts = children.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        // Odd indices are the captured (emphasised) groups.
        i % 2 === 1 ? (
          <span key={i} className="text-highlight">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
