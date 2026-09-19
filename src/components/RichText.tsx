import { Fragment, type ReactNode } from "react";

/**
 * Renders a translated string with a tiny inline syntax, so dictionary
 * sentences stay whole in both languages instead of being split into JSX:
 *
 *   **emphasis**   `code`   [label](https://url or /path)
 *
 * Emphasis lifts the text up the foreground ladder rather than turning it
 * cyan: the accent is reserved for interaction, which is why links get it.
 */
const TOKEN = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
const SAFE_HREF = /^(https?:\/\/|\/)/;

export default function RichText({ children }: { children: string }) {
  const out: ReactNode[] = [];
  let last = 0;

  for (const match of Array.from(children.matchAll(TOKEN))) {
    const [whole, bold, code, label, href] = match;
    const at = match.index ?? 0;
    if (at > last) out.push(<Fragment key={last}>{children.slice(last, at)}</Fragment>);

    if (bold !== undefined) {
      out.push(<span key={at} className="text-fg font-medium">{bold}</span>);
    } else if (code !== undefined) {
      out.push(
        <code key={at} className="font-fira-code text-[0.9em] text-fg bg-surface-3 px-1 py-0.5 rounded-xs">
          {code}
        </code>,
      );
    } else if (SAFE_HREF.test(href)) {
      const external = href.startsWith("http");
      out.push(
        <a
          key={at}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="text-accent hover:text-accent-bright underline underline-offset-2 decoration-accent/40"
        >
          {label}
        </a>,
      );
    } else {
      out.push(<Fragment key={at}>{label}</Fragment>);
    }
    last = at + whole.length;
  }

  if (last < children.length) out.push(<Fragment key={last}>{children.slice(last)}</Fragment>);
  return <>{out}</>;
}
