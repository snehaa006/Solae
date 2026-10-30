import { Fragment, type ReactNode } from "react";
import { SunMark } from "./icons";

interface TickerProps {
  items: ReactNode[];
  /** what the strip is, for screen readers */
  label: string;
  /** ticker--lg: the big serif band; leave it out for tiny caps */
  className?: string;
}

/** one line of phrases scrolling between little suns (refs: beach bar, sunseeker) */
export function Ticker({ items, label, className }: TickerProps) {
  const run = items.map((item, i) => <Fragment key={i}>{item} <SunMark /> </Fragment>);
  return (
    <div className={className ? `ticker ${className}` : "ticker"} aria-label={label}>
      <div className={className?.includes("ticker--lg") ? "ticker__track" : "ticker__track t-label"}>
        <span>{run}</span>
        <span aria-hidden="true">{run}</span>
      </div>
    </div>
  );
}
