import type { CSSProperties } from "react";
import { Sprite } from "./icons";

/** a line drawing on a scrap of torn white paper (ref: hand-drawn beach stickers) */
export function PaperSticker({ id, className, style }: { id: string; className?: string; style?: CSSProperties }) {
  return (
    <span className={className ? `paper ${className}` : "paper"} style={style} aria-hidden="true">
      <span className="paper__cut"><Sprite id={id} className="ill" /></span>
    </span>
  );
}
