import { useReveal } from "../../hooks/useReveal";
import { px, unsplash } from "../../lib/format";
import { Edge } from "../edges";

const NOTES = [
  ["the short", "knee-length, or just above. match your suit, or keep it white or black."],
  ["the cover-up", "a kaftan for every suit, plus the white one that goes with everything."],
  ["the skirt", "plain, ties at the side, made for the walk to the beach."],
] as const;

/* pin: "the late checkout" lower spread — a cream sheet floating on the sea */
export function Lookbook() {
  const [sheet, reveal] = useReveal<HTMLElement>();
  return (
    <section id="lookbook" className="spread" aria-labelledby="sheet-title">
      <Edge shape="torn" />
      <div className="spread__bg" aria-hidden="true"><img src={unsplash("1505118380757-91f5f5632de0")} alt="" loading="lazy" /></div>
      <div className="wrap">
        <article ref={sheet} className={`sheet ${reveal}`}>
          <div className="sheet__top t-label"><span>lookbook · drop 01</span><span>no. 01 — summer 2026</span></div>
          <div className="sheet__intro">
            <p className="t-hand" aria-hidden="true">it's about</p>
            <h2 id="sheet-title" className="t-headline">the suit that stays put</h2>
            <p>we test every piece in the sea, in the pool and on the walk home. if it slips, rides up or goes see-through, it doesn't make the drop.</p>
          </div>
          <svg className="sheet__arrow" style={{ left: "30%", top: "8%" }} viewBox="0 0 140 90" aria-hidden="true">
            <path className="swirl" d="M6 70C30 80 60 70 64 46S40 18 58 10s54 6 72 34" />
            <path d="M122 34l8 10-12 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <figure className="sheet__hero"><div className="frame"><img src={px("28681548", 1000)} alt="a girl in a black off-the-shoulder one-piece standing in calm sea water" loading="lazy" /></div></figure>
          <div className="sheet__note">
            <div className="frame"><img src={px("38523164", 600)} alt="a striped swim top laid flat beside cherries and a shell" loading="lazy" /></div>
            <div className="note"><b>the suit</b><span>removable pads, held in by a second layer of fabric. small padding, never shifts.</span></div>
          </div>
          <figure className="sheet__flat"><div className="frame"><img src={px("36188914", 900)} alt="a striped towel beside a bright turquoise pool" loading="lazy" /></div></figure>
          <div className="sheet__notes">
            {NOTES.map(([title, text]) => <div className="note" key={title}><b>{title}</b><span>{text}</span></div>)}
          </div>
          <div className="sheet__end">
            <h3 className="t-headline">no two summers are ever the same</h3>
            <a className="btn btn--ink" href="#catalog">shop the lookbook</a>
          </div>
        </article>
      </div>
      <Edge shape="tornAlt" className="edge--flip edge--bottom" style={{ color: "#DCEAF4" }} />
    </section>
  );
}
