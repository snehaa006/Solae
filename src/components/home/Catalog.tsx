import { Link } from "react-router";
import { byId, type ProductId } from "../../data/catalog";
import { ProductCard } from "../ProductCard";

const PICKS: ProductId[] = ["tidepool", "cabana", "shallows", "boardwalk"];

/* four pieces on simple cards; a second photo and "shop now" on hover (ref: k2o) */
export function Catalog() {
  return (
    <section id="catalog" className="section wrap" aria-labelledby="catalog-title">
      <h2 id="catalog-title" className="t-h2 catalog__title">your new favourite swim set starts here</h2>
      <div className="grid-products">
        {PICKS.map(id => <ProductCard key={id} product={byId(id)} />)}
      </div>
      <div className="catalog__more"><Link className="btn btn--ink" to="/shop">shop everything</Link></div>
    </section>
  );
}
