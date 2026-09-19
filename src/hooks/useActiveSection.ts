import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently under a thin band just
 * above the middle of the viewport.
 *
 * A short last section (like Contact) can never reach that band, so at the
 * very bottom of the page the last id wins.
 */
export default function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    setActive(null);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    const atBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActive(sections[sections.length - 1].id);
      }
    };
    window.addEventListener("scroll", atBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", atBottom);
    };
    // `key` stands in for `ids` so a new array with the same ids doesn't re-subscribe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
