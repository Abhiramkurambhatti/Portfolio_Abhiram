import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  words = [],
  typingSpeed = 70,
  deletingSpeed = 40,
  pause = 1600,
  className = "",
}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduceMotion.current) {
      setText(words[0] || "");
      return;
    }
    const current = words[wordIndex % words.length] || "";
    let delay = deleting ? deletingSpeed : typingSpeed;

    if (!deleting && text === current) {
      delay = pause;
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      delay = 300;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="tw-caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}
