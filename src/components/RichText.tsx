import { Fragment } from "react";

/**
 * Renders a translated string where **double-asterisk** spans are emphasised.
 * Keeps dictionary sentences readable in both languages instead of splitting
 * them into separate JSX fragments per emphasis.
 *
 * Emphasis lifts the text up the foreground ladder rather than turning it
 * cyan: the accent is reserved for interaction and the live cursor.
 */
export default function RichText({ children }: { children: string }) {
  const parts = children.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        // Odd indices are the captured (emphasised) groups.
        i % 2 === 1 ? (
          <span key={i} className="text-fg font-medium">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
