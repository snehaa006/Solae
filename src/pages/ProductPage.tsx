import { Link, useParams } from "react-router";
import { byId, portById, portOf, PRODUCTS, type Product, type ProductId } from "../data/catalog";
import { BuyPanel } from "../components/product/BuyPanel";
import { Postcards } from "../components/product/Postcards";
import { ProductCard } from "../components/ProductCard";
import { usePageMeta } from "../hooks/usePageMeta";

const PAIR_WITH_SUIT: ProductId[] = ["boardwalk", "drift", "white-one", "shoreline"];
const PAIR_WITH_PIECE: ProductId[] = ["tidepool", "cabana", "off-shoulder", "flounce"];

/* /product/<id>: photos as swipeable postcards beside the buy panel */
export function ProductPage() {
  const { id } = useParams();
  const p = byId(id) ?? PRODUCTS[0];
  usePageMeta(`${p.name} — SOLAE`);
  // a new product starts with fresh choices and the first postcard
  return <ProductView key={p.id} product={p} />;
}

function ProductView({ product: p }: { product: Product }) {
  const port = portById(portOf(p));
  const pairs = p.cat === "swimsuits" ? PAIR_WITH_SUIT : PAIR_WITH_PIECE;
  return (
    <main id="main" className="wrap">
      <nav className="crumbs" aria-label="breadcrumb">
        <Link to="/">home</Link><span aria-hidden="true">/</span>
        <Link to="/shop">shop</Link><span aria-hidden="true">/</span>
        <Link to={`/shop/${port.id}`}>{port.place}</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{p.name}</span>
      </nav>
      <section className="pdp" aria-label="product">
        <Postcards product={p} port={port} />
        <BuyPanel product={p} port={port} />
      </section>

      <section className="section" aria-labelledby="pair-title">
        <div className="catalog__head" style={{ marginBottom: "var(--space-l)" }}>
          <p className="t-hand" aria-hidden="true" style={{ color: "var(--brick)" }}>complete the look</p>
          <h2 id="pair-title" className="t-wide t-wide--l">pairs well with</h2>
        </div>
        <div className="grid-products">
          {pairs.map((pid, i) => <ProductCard key={pid} product={byId(pid)} index={i} />)}
        </div>
      </section>
    </main>
  );
}
