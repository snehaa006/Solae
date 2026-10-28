import { useReveal } from "../../hooks/useReveal";
import { px, unsplash } from "../../lib/format";
import { Edge } from "../edges";

/* pin: "a postcard from summer" — the founders' note */
export function FoundersPostcard() {
  const [card, reveal] = useReveal<HTMLElement>();
  return (
    <section className="postcard-sec" aria-labelledby="postcard-title">
      <div className="postcard-sec__bg" aria-hidden="true"><img src={unsplash("1540206395-68808572332f")} alt="" loading="lazy" /></div>
      <div className="wrap">
        <article ref={card} className={`postcard ${reveal}`}>
          <div className="postcard__msg">
            <p className="t-label t-soft">a note from the founders</p>
            <h2 id="postcard-title" className="t-headline">a postcard from summer</h2>
            <p>hi from the shore! we started solae because every swimsuit we tried either slipped, showed too much, or didn't match anything. so we made our own — plain, comfy, and matching all the way down to the shorts.</p>
            <p className="t-hand">wish you were here x</p>
          </div>
          <div className="postcard__side">
            <div className="postcard__stamp stamp-wrap">
              <div className="stamp"><div className="stamp__inner">
                <img src={unsplash("1468413253725-0d5181091126", 400)} alt="palm trees over a white sand beach" loading="lazy" />
                <p className="t-label">₹ 26 · india</p>
              </div></div>
            </div>
            <svg className="postmark" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path id="pm-arc" d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0" fill="none" />
              <text fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="3" fill="currentColor"><textPath href="#pm-arc">SOLAE · DROP 01 · SUMMER 2026 ·</textPath></text>
              <text x="60" y="66" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="20" fill="currentColor">the shore</text>
            </svg>
            <div className="postcard__lines"><div>to: you</div><div>the beach, the pool, the boardwalk</div><div>somewhere sunny</div></div>
            <a className="btn btn--ink" href="#catalog" style={{ alignSelf: "flex-start" }}>shop drop 01</a>
          </div>
          <figure className="postcard__photo polaroid">
            <span className="tape" aria-hidden="true" />
            <img src={px("8926075", 500)} alt="two girls smiling together at the beach" loading="lazy" />
            <figcaption>best friends</figcaption>
          </figure>
        </article>
      </div>
      <Edge shape="wave" className="edge--flip edge--bottom" />
    </section>
  );
}
