import { Link } from "react-router";
import { byId, type ProductId } from "../../data/catalog";
import { ProductCard } from "../ProductCard";
import { SectionHead } from "../SectionHead";

const PICKS: ProductId[] = ["tidepool", "cabana", "shallows", "boardwalk"];

/* four pieces on framed cards; a second photo and "shop now" on hover */
export function Catalog() {
  return (
    <section id="catalog" className="section wrap" aria-labelledby="catalog-title">
      <SectionHead id="catalog-title" label="drop 01 · the catalog">your new favourite <em>swim set</em> starts here</SectionHead>
      <div className="grid-products">
        {PICKS.map(id => <ProductCard key={id} product={byId(id)} />)}
      </div>
      <div className="catalog__more"><Link className="btn btn--ghost" to="/shop">shop everything</Link></div>
    </section>
  );
}
