/**
 * The boot cover: a dark panel whose top edge is a bright scanline. It slides
 * down and the page appears behind the line, like a CRT drawing its first
 * frame.
 *
 * Static markup, hidden unless the <head> script adds `booting` to <html>, so
 * crawlers and visitors without JavaScript never see it. All motion lives in
 * globals.css.
 */
export default function BootSequence() {
  return (
    <div className="boot-cover" aria-hidden="true">
      <div className="boot-panel" />
      <div className="boot-log font-fira-code">
        <p>&gt; power on</p>
        <p>&gt; mount joaovcosta.dev</p>
        <p>&gt; ready</p>
      </div>
    </div>
  );
}
