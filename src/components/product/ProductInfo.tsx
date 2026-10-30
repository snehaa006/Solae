import { useState } from "react";
import { byId, COLORS, dot, SHIP_FREE, SIZES, type ColorKey, type Product, type Size } from "../../data/catalog";
import { starRow } from "../../data/reviews";
import { useCart } from "../../context/cart";
import { useToast } from "../../context/toast";
import { sar } from "../../lib/format";

interface ProductInfoProps {
  product: Product;
  reviewCount: number;
  rating: number;
}

/* beside the postcards (ref: k2o): the name, price, colour and size, then one box with
   the set or just the suit, add to bag and three short folds */
export function ProductInfo({ product: p, reviewCount, rating }: ProductInfoProps) {
  const { add, open } = useCart();
  const toast = useToast();
  const isSuit = p.cat === "swimsuits";
  const shorts = byId("boardwalk");
  const [color, setColor] = useState<ColorKey>(p.colors[0]);
  const [size, setSize] = useState<Size>("m");
  const [stitch, setStitch] = useState(p.stitch?.[0] ?? "");
  const [set, setSet] = useState(isSuit);
  // the matching shorts come in the suit's colour
  const shortsColor = shorts.colors.includes(color) ? color : shorts.colors[0];

  const buy = () => {
    add(p.id, color, size, stitch);
    if (set) add(shorts.id, shortsColor, size, "matching set");
    open();
  };

  return (
    <div className="pdp__info">
      {reviewCount > 0 && (
        <a className="pdp__stars" href="#reviews"><span aria-hidden="true">{starRow(rating)}</span> {reviewCount} {reviewCount === 1 ? "review" : "reviews"}</a>
      )}
      <p className="pdp__type t-label">{p.type}</p>
      <h1 className="pdp__name">{p.name}</h1>
      <p className="pdp__price">{sar(p.price)}</p>
      <p className="pdp__blurb">{p.blurb}</p>

      {p.colors.length > 1 && (
        <div className="opt">
          <div className="opt__label t-label"><span>colour: <b>{COLORS[color].name}</b></span></div>
          <div className="swatches" role="radiogroup" aria-label="colour">
            {p.colors.map(k => (
              <button key={k} type="button" className="swatch swatch--lg" role="radio" aria-checked={k === color} aria-label={COLORS[k].name}
                style={{ "--c": dot(k) }} onClick={() => setColor(k)} />
            ))}
          </div>
        </div>
      )}

      <div className="opt">
        <div className="opt__label t-label">
          <span>size: <b>{size.toUpperCase()}</b></span>
          <button type="button" onClick={() => toast("size guide coming soon — we're measuring everything twice")}>size guide</button>
        </div>
        <div className="sizes" role="radiogroup" aria-label="size">
          {SIZES.map(s => (
            <button key={s} type="button" className="size" role="radio" aria-checked={s === size} onClick={() => setSize(s)}>{s.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {p.stitch && (
        <div className="opt">
          <div className="opt__label t-label"><span>down the middle: <b>{stitch}</b></span></div>
          <div className="sizes" role="radiogroup" aria-label="centre seam">
            {p.stitch.map(o => (
              <button key={o} type="button" className="size" role="radio" aria-checked={o === stitch} onClick={() => setStitch(o)}>{o}</button>
            ))}
          </div>
        </div>
      )}

      <div className="pdp__box">
        {isSuit && <>
          <label className="pdp__opt">
            <input type="radio" name="set" value="set" checked={set} onChange={() => setSet(true)} />
            <span><b>the set</b><small>with matching shorts in {COLORS[shortsColor].name}</small></span>
            <span>{sar(p.price + shorts.price)}</span>
          </label>
          <label className="pdp__opt">
            <input type="radio" name="set" value="suit" checked={!set} onChange={() => setSet(false)} />
            <span><b>just the suit</b></span>
            <span>{sar(p.price)}</span>
          </label>
        </>}
        <div className="pdp__buy">
          <button className="btn btn--block" type="button" onClick={buy}>add to bag · <span>{sar(p.price + (set ? shorts.price : 0))}</span></button>
        </div>
        <div className="acc">
          <details><summary>details</summary><div><ul>
            {isSuit && <><li>double-lined, fully opaque when wet</li><li>small removable pads, held in by a second layer of fabric</li></>}
            {p.id === "off-shoulder" && <li>hidden silicone grip at the neckline</li>}
            {p.cat === "shorts" && <><li>knee-length, or just above</li><li>in every suit colour, plus white and black</li></>}
            {p.cat === "cover-ups" && <li>light, quick-dry woven fabric</li>}
            <li>78% recycled nylon, 22% elastane</li>
          </ul></div></details>
          <details><summary>size &amp; fit</summary><div>true to size. between sizes? size up for more coverage.</div></details>
          <details><summary>care &amp; shipping</summary><div>rinse after every swim and dry flat in the shade. ships in 2–4 days across saudi arabia, free over {sar(SHIP_FREE)}.</div></details>
        </div>
      </div>
    </div>
  );
}
