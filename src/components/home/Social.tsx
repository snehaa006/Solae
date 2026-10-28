import { useRef } from "react";
import { px } from "../../lib/format";
import { NextIcon, PrevIcon } from "../icons";

const TILES = [
  ["9872701", "a sprinkle donut float on a bright pool", "@ananya.k"],
  ["3149285", "two friends watching the sunset on the beach", "@meera.sea"],
  ["24031225", "a girl paddling a yellow kayak on calm water", "@riya.rides"],
  ["31629322", "a pink flamingo float among tropical plants", "@solae.swim"],
  ["33265997", "a group of girls posing on rocks by the sea", "@tara.goes"],
  ["8926078", "two girls running along the shoreline", "@solae.swim"],
] as const;

/* UGC tiles on a scrolling rail */
export function Social() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="social" aria-labelledby="social-title">
      <div className="wrap social__head">
        <div>
          <h2 id="social-title" className="t-wide t-wide--l" style={{ color: "var(--deep)" }}>on the shore</h2>
          <p className="t-hand">tag us, we repost</p>
        </div>
        <div style={{ display: "flex", gap: ".4rem" }}>
          <button className="icon-btn icon-btn--outline" type="button" aria-label="scroll photos left" onClick={() => scroll(-1)}><PrevIcon /></button>
          <button className="icon-btn icon-btn--outline" type="button" aria-label="scroll photos right" onClick={() => scroll(1)}><NextIcon /></button>
        </div>
      </div>
      <div ref={rail} className="rail" id="social-rail" style={{ maxWidth: "var(--page-max)", marginInline: "auto" }}>
        {TILES.map(([img, alt, handle]) => (
          <a key={img} className="social__tile" href="#">
            <div className="frame-soft"><img src={px(img, 700)} alt={alt} loading="lazy" /></div>
            <span>{handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
