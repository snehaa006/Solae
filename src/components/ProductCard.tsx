import { Link } from "react-router";
import type { Product } from "../data/catalog";
import { px, sar } from "../lib/format";

/* product card: a framed photo, the name in the serif and the price in tiny caps. On hover the
   second photo crossfades in over the first with "shop now"; on touch screens the card is simply a link */
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="card">
      <Link className="card__link" to={`/product/${p.id}`}>
        <div className="card__media frame">
          <img src={px(p.img, 700)} alt={p.alt} loading="lazy" style={{ objectPosition: p.pos }} />
          <div className="card__hover" aria-hidden="true">
            <img src={px(p.gallery[1] ?? p.img, 700)} alt="" loading="lazy" />
            <span className="card__cta">shop now</span>
          </div>
        </div>
        <h3 className="card__name">{p.name}</h3>
        <p className="card__price t-label">{sar(p.price)}</p>
      </Link>
    </article>
  );
}
