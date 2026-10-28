import { useState } from "react";
import { Link } from "react-router";
import { byId, type Category, type ProductId } from "../../data/catalog";
import { ProductCard } from "../ProductCard";

const PICKS: ProductId[] = ["tidepool", "cabana", "shallows", "off-shoulder", "boardwalk", "drift", "white-one", "shoreline"];

/* the stops on the dotted swirl, each sitting on one of its dots */
const STOPS: { cat: Category; label: string; left: string; top: string }[] = [
  { cat: "swimsuits", label: "swimsuits", left: "5%", top: "70%" },
  { cat: "shorts", label: "matching shorts", left: "28%", top: "28%" },
  { cat: "cover-ups", label: "cover-ups", left: "50%", top: "74%" },
  { cat: "skirts", label: "the skirt", left: "72%", top: "26%" },
];

/* pin: "SUIT" taplink — wavy frames + a dotted map of categories that filters the grid */
export function Catalog() {
  const [filter, setFilter] = useState<Category | null>(null);

  return (
    <section id="catalog" className="section wrap" aria-labelledby="catalog-title">
      <div className="catalog__head">
        <h2 id="catalog-title" className="t-wide t-wide--xl">catalog</h2>
        <p className="t-script">in our shop you'll find…</p>
      </div>
      <div className="catmap" role="group" aria-label="filter by category">
        <svg viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true">
          <path className="swirl" d="M40 100C120 20 170 20 224 38S330 120 400 104 520 22 576 36 700 118 760 100" />
          {[[40, 100], [224, 38], [400, 104], [576, 36], [760, 100]].map(([cx, cy]) => <circle key={cx} className="dot" cx={cx} cy={cy} r="4" />)}
        </svg>
        {STOPS.map(s => (
          <button key={s.cat} type="button" aria-pressed={filter === s.cat} style={{ left: s.left, top: s.top }}
            onClick={() => setFilter(f => (f === s.cat ? null : s.cat))}>{s.label}</button>
        ))}
        <a href="#signatures" className="sr-only">see the signature styles</a>
      </div>
      <div className="grid-products">
        {PICKS.map((id, i) => {
          const p = byId(id);
          return <ProductCard key={id} product={p} index={i} hidden={filter !== null && p.cat !== filter} />;
        })}
      </div>
      <div className="catalog__more">
        <p className="t-hand" aria-hidden="true">there's a map for that</p>
        <Link className="btn btn--ink" to="/shop">open the shop map</Link>
      </div>
    </section>
  );
}
