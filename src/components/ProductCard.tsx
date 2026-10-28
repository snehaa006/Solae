import { Link } from "react-router";
import { COLORS, dot, type Product } from "../data/catalog";
import { useCart } from "../context/cart";
import { useReveal } from "../hooks/useReveal";
import { inr } from "../lib/format";
import { PlusIcon } from "./icons";
import { Photo } from "./Photo";

const MAX_SW = 6;

interface ProductCardProps {
  product: Product;
  /** position in the grid, staggers the reveal */
  index?: number;
  hidden?: boolean;
}

export function ProductCard({ product: p, index = 0, hidden }: ProductCardProps) {
  const { add } = useCart();
  const [ref, reveal] = useReveal<HTMLElement>();
  return (
    <article ref={ref} className={`card ${reveal}`} data-cat={p.cat} style={{ "--i": index }} hidden={hidden}>
      <div className="card__media">
        <Photo product={p} className="frame-wavy" w={700} />
        <div className="card__badges">
          {p.badges.map(([t, tone]) => <span key={t} className={`badge badge--${tone}`}>{t}</span>)}
        </div>
      </div>
      <h3 className="card__name"><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
      <p className="card__price">{inr(p.price)}</p>
      <div className="swatches" aria-label={`${p.colors.length} colours: ${p.colors.map(k => COLORS[k].name).join(", ")}`}>
        {p.colors.slice(0, MAX_SW).map(k => <span key={k} className="swatch" style={{ "--c": dot(k) }} title={COLORS[k].name} />)}
        {p.colors.length > MAX_SW && <span className="swatch-more">+{p.colors.length - MAX_SW}</span>}
      </div>
      <button className="btn btn--ghost btn--sm card__add" type="button" aria-label={`add ${p.name} to bag`} onClick={() => add(p.id)}>
        <PlusIcon />add to bag
      </button>
    </article>
  );
}
