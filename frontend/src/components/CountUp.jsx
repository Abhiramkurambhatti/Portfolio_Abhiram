import { useEffect, useRef, useState } from "react";

/**
 * Animates a number counting up when it scrolls into view.
 * Accepts a raw string like "8.90", "1+", or "30+" and preserves
 * any non-numeric prefix/suffix and decimal precision.
 */
export default function CountUp({ value, duration = 1500 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    if (!match) {
      setDisplay(String(value));
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = (target * eased).toFixed(decimals);
              setDisplay(`${prefix}${current}${suffix}`);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
