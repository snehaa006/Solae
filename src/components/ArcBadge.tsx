import { useId } from "react";

/** a half-sun badge with its words set round the arc (ref: the beauty site's "vegan" badge) */
export function ArcBadge({ text, className }: { text: string; className?: string }) {
  const arc = useId();
  return (
    <svg className={className ? `arc-badge ${className}` : "arc-badge"} viewBox="0 0 120 64" aria-hidden="true">
      <path className="arc-badge__sun" d="M2 62A58 58 0 0 1 118 62Z" />
      <path id={arc} d="M17 60A43 43 0 0 1 103 60" fill="none" />
      <text className="arc-badge__text"><textPath href={`#${arc}`} startOffset="50%" textAnchor="middle">{text}</textPath></text>
    </svg>
  );
}
