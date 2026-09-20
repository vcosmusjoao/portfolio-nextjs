import { useState, useEffect, useRef } from "react";

/**
 * @param onChar called once per typed character; kept in a ref so passing a
 *   new function does not restart the typing.
 * @param replayKey change it to type the lines again from the start.
 * @param instant skip the animation and show the finished lines — used when
 *   the visitor has already watched them type earlier in the session.
 */
export default function useTerminalEffect(
  lines: string[],
  speed = 40,
  delayBetween = 600,
  onChar?: (char: string) => void,
  replayKey = 0,
  instant = false,
) {
  const [output, setOutput] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const onCharRef = useRef(onChar);
  onCharRef.current = onChar;

  useEffect(() => {
    if (instant) {
      setOutput(lines);
      setDone(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    // Belt-and-suspenders alongside clearInterval/clearTimeout below: guards
    // against a timer callback that's already queued on the event loop when
    // cleanup runs (e.g. a language switch mid-type) from writing stale
    // output into the next run's state.
    let cancelled = false;

    setOutput(lines.map(() => ""));

    const typeNextLine = () => {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const currentLine = lines[lineIndex];

      intervalId = setInterval(() => {
        if (cancelled) return;
        charIndex++;

        const typed = currentLine[charIndex - 1];
        if (typed && typed !== " ") onCharRef.current?.(typed);

        setOutput((prev) => {
          const copy = [...prev];
          copy[lineIndex] = currentLine.slice(0, charIndex);
          return copy;
        });

        if (charIndex >= currentLine.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            if (cancelled) return;
            lineIndex++;
            charIndex = 0;
            typeNextLine();
          }, delayBetween);
        }
      }, speed);
    };

    typeNextLine();

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      setOutput([]);
      setDone(false);
    };
  // Re-run (and re-type) when the lines change — e.g. on a language switch.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join(" "), speed, delayBetween, replayKey, instant]);

  return { output, done };
}
