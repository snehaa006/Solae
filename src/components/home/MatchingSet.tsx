import { Link } from "react-router";
import { byId } from "../../data/catalog";
import { sar } from "../../lib/format";
import { ArcBadge } from "../ArcBadge";

/* refs: the interiors board's "customization? it's our whole vibe…" (a cutout rising out of the
   field) and the beauty site's product feature (a colour-block card, a tiny label, a serif
   headline and a half-circle badge). The suit and the shorts are cut out and stand on the card */
export function MatchingSet() {
  const suit = byId("flounce"), shorts = byId("boardwalk");
  return (
    <section className="set section field field--mist" aria-labelledby="set-title">
      <div className="wrap set__grid">
        <div className="set__card">
          <img className="set__suit" src="/img/cutouts/suit-flounce.webp" alt="the flounce one-piece, with pink ruffles on the straps" loading="lazy" />
          <span className="set__plus" aria-hidden="true">+</span>
          <img className="set__shorts" src="/img/cutouts/shorts.webp" alt="knee-length swim shorts with a drawstring" loading="lazy" />
          <p className="set__tag t-label">the set · {sar(suit.price + shorts.price)}</p>
        </div>
        <div className="set__text">
          <ArcBadge text="MADE TO MATCH" className="set__badge" />
          <p className="t-label">one-piece + shorts</p>
          <h2 id="set-title" className="t-headline">a matching set? <em>it's our whole vibe…</em></h2>
          <p>every one-piece comes with knee-length shorts to match. wear them together for more coverage, or the suit on its own when you want to.</p>
          <div className="set__ctas">
            <Link className="btn" to={`/product/${suit.id}`}>shop the set</Link>
            <Link className="btn btn--ghost" to="/shop/shorts">just the shorts</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
