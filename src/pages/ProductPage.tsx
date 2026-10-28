import { Fragment } from "react";
import { useParams, useSearchParams } from "react-router";
import { byId, FACTS, portById, portOf, PRODUCTS, type Product, type ProductId } from "../data/catalog";
import { REVIEWS, SAMPLE_REVIEWS } from "../data/reviews";
import { Sprite } from "../components/icons";
import { Postcards } from "../components/product/Postcards";
import { ProductInfo } from "../components/product/ProductInfo";
import { Reviews } from "../components/product/Reviews";
import { ProductCard } from "../components/ProductCard";
import { usePageMeta } from "../hooks/usePageMeta";

const pairsFor = (p: Product): ProductId[] => p.cat === "swimsuits"
  ? ["boardwalk", "drift", "white-one", p.sig ? "tidepool" : "off-shoulder"]
  : ["tidepool", "cabana", "off-shoulder", "flounce"];

/* /product/<id> (ref: k2o): the postcard stack beside a minimal panel, then a facts strip,
   the reviews and "pairs well with". /product/<id>?reviews=sample previews the reviews layout. */
export function ProductPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const p = byId(id) ?? PRODUCTS[0];
  usePageMeta(`${p.name} — SOLAE`);
  const reviews = REVIEWS[p.id] ?? (params.get("reviews") === "sample" ? SAMPLE_REVIEWS : []);
  const rating = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;
  const port = portById(portOf(p));

  return (
    <main id="main">
      {/* keyed by product, so a new piece starts with fresh choices and the first postcard */}
      <section key={p.id} className="pdp wrap" aria-label="product">
        <Postcards product={p} port={port} />
        <ProductInfo product={p} reviewCount={reviews.length} rating={rating} />
      </section>
      <div className="pdp-strip wrap">
        {FACTS[p.cat].map((f, i) => <Fragment key={f}>{i > 0 && <Sprite id="i-sun-solo" />}<span>{f}</span></Fragment>)}
      </div>
      <Reviews reviews={reviews} rating={rating} />
      <section className="section wrap" aria-labelledby="pair-title">
        <h2 id="pair-title" className="t-h2 catalog__title">pairs well with</h2>
        <div className="grid-products">
          {pairsFor(p).map(pid => <ProductCard key={pid} product={byId(pid)} />)}
        </div>
      </section>
    </main>
  );
}
