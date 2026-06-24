import { useState, useEffect } from "react";

export default function useTerminalEffect(lines: string[], speed = 40, delayBetween = 600) {
  const [output, setOutput] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;

    setOutput(lines.map(() => "")); // prepara as linhas vazias

    const typeNextLine = () => {
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const currentLine = lines[lineIndex];

      const interval = setInterval(() => {
        charIndex++;

        setOutput((prev) => {
          const copy = [...prev];
          copy[lineIndex] = currentLine.slice(0, charIndex);
          return copy;
        });

        if (charIndex >= currentLine.length) {
          clearInterval(interval);
          setTimeout(() => {
            lineIndex++;
            charIndex = 0;
            typeNextLine();
          }, delayBetween);
        }
      }, speed);
    };

    typeNextLine();

    // ← cleanup REAL opcional
    return () => {
      setOutput([]);
      setDone(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { output, done };
}
