import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  /** Final value to display. Animates from previous value to this one. */
  value: number;
  /** Format function (e.g. comma separators, %, currency). */
  format?: (n: number) => string;
  className?: string;
  /** How often to refresh the displayed number while counting up (ms). */
  tickMs?: number;
  /** Total duration of the counting tween (ms). */
  durationMs?: number;
}

/**
 * KPI counter that uses transitions.dev's "Number pop-in" effect (snippet 02).
 * Each rendered character is a span so the staggered blur/translate replay
 * works exactly as defined in the skill — last two digits ride 1× / 2× the
 * stagger.
 */
export function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toLocaleString("es-CO"),
  className,
  tickMs = 40,
  durationMs = 900,
}: AnimatedNumberProps) {
  const groupRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(format(value));
  const prevValueRef = useRef<number>(value);

  // Counting tween: ease-out from prev to new value.
  useEffect(() => {
    const from = prevValueRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const current = from + (to - from) * ease(t);
      setDisplay(format(current));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        prevValueRef.current = to;
        setDisplay(format(to));
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, format]);
  void tickMs; // (kept for API surface, raf already self-tunes)

  // Replay the pop-in every time `display` changes — remove class, reflow, re-add.
  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    el.classList.remove("is-animating");
    void el.offsetHeight; // force reflow (as the skill's JS orchestration spec requires)
    el.classList.add("is-animating");
  }, [display]);

  const chars = display.split("");

  return (
    <span ref={groupRef} className={cn("t-digit-group is-animating", className)}>
      {chars.map((ch, i) => {
        const last = chars.length - 1 - i;
        const stagger = last === 1 ? "1" : last === 0 ? "2" : undefined;
        return (
          <span
            key={`${i}-${ch}`}
            className="t-digit"
            data-stagger={stagger}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
