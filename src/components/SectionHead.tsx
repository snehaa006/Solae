import type { ReactNode } from "react";
import { Sprite } from "./icons";

interface SectionHeadProps {
  id: string;
  label: string;
  children: ReactNode;
  /** a line drawing from the sprite, drawn small above the label */
  icon?: string;
}

/** a small line drawing, a label in tiny caps and a serif headline, centred (ref: sunseeker) */
export function SectionHead({ id, label, icon = "i-sun-line", children }: SectionHeadProps) {
  return (
    <header className="sec-head">
      <Sprite id={icon} className="sec-head__icon ill" />
      <p className="t-label">{label}</p>
      <h2 id={id} className="t-headline t-h1">{children}</h2>
    </header>
  );
}
