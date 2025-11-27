import { useState, useEffect } from "react";

export default function useTypingEffect(text, speed = 80) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}
