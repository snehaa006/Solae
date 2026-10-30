import { useId, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/format";

/** how many times the phrases repeat along the wave; enough to outrun the path while it scrolls */
const RUNS = 5;

/* a curved band with the phrases running along it, laid across the seam between two sections
   (ref: the beauty site's "newness that will brighten your day" ribbon) */
export function WaveTicker({ items, label }: { items: string[]; label: string }) {
  const lane = useId();
  const text = useRef<SVGTextElement>(null);
  const [unit, setUnit] = useState(0);
  const run = items.map(t => `${t}  ☼  `).join("");

  // one run's length along the path, so the loop can jump back by exactly that much
  useLayoutEffect(() => {
    if (text.current && !prefersReducedMotion()) setUnit(text.current.getComputedTextLength() / RUNS);
  }, []);

  return (
    <div className="wave-sep" role="note" aria-label={label}>
      <svg className="wave-tick" viewBox="0 0 1440 200" aria-hidden="true">
        <path id={lane} className="wave-tick__band" d="M-40 140C200 30 420 20 640 92S1080 190 1480 56" />
        <text ref={text} className="wave-tick__text" dy="8">
          <textPath href={`#${lane}`}>
            {run.repeat(RUNS)}
            {unit > 0 && <animate attributeName="startOffset" from="0" to={-unit} dur="22s" repeatCount="indefinite" />}
          </textPath>
        </text>
      </svg>
      <p className="sr-only">{items.join(", ")}</p>
    </div>
  );
}
