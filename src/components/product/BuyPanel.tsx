import { useState } from "react";
import { byId, COLORS, dot, SHIP_FREE, SIZES, type ColorKey, type Port, type Product, type Size } from "../../data/catalog";
import { useCart } from "../../context/cart";
import { useToast } from "../../context/toast";
import { inr } from "../../lib/format";
import { DropIcon, ExchangeIcon, HeartIcon, TruckIcon } from "../icons";
import { Photo } from "../Photo";

/* every suit can be bought as a set with the shorts and the kaftan */
const SET_PIECES = ["boardwalk", "drift"] as const;
type SetPiece = (typeof SET_PIECES)[number];
type SetOpt = "matching" | "white" | "black";
type SetChoice = { on: boolean; opt: SetOpt };

const optsFor = (id: SetPiece): SetOpt[] => (id === "boardwalk" ? ["matching", "white", "black"] : ["matching"]);

export function BuyPanel({ product: p, port }: { product: Product; port: Port }) {
  const { add, open } = useCart();
  const toast = useToast();
  const isSuit = p.cat === "swimsuits";
  const [color, setColor] = useState<ColorKey>(p.colors[0]);
  const [size, setSize] = useState<Size>("m");
  const [stitch, setStitch] = useState(p.stitch?.[0] ?? "");
  const [sets, setSets] = useState<Record<SetPiece, SetChoice>>({
    boardwalk: { on: false, opt: "matching" },
    drift: { on: false, opt: "matching" },
  });
  const setRows: readonly SetPiece[] = isSuit ? SET_PIECES : [];
  const choose = (id: SetPiece, choice: Partial<SetChoice>) => setSets(s => ({ ...s, [id]: { ...s[id], ...choice } }));

  // "match my suit" uses the suit's colour when the set piece comes in it
  const pieceColor = (r: Product, opt: SetOpt): ColorKey => (opt !== "matching" ? opt : r.colors.includes(color) ? color : r.colors[0]);
  const subtotal = p.price + setRows.reduce((n, id) => n + (sets[id].on ? byId(id).price : 0), 0);

  const buy = () => {
    add(p.id, color, size, stitch);
    for (const id of setRows) {
      const st = sets[id];
      if (st.on) add(id, pieceColor(byId(id), st.opt), size, st.opt === "matching" ? "matching set" : "");
    }
    open();
  };

  return (
    <div className="buy">
      <div className="buy__title">
        <p className="t-tag">{p.type} · {port.place}</p>
        <h1 className="t-headline">{p.name}</h1>
        <div className="buy__price">
          <span>{inr(p.price)}</span>
          <span className="stars" aria-label="4.9 out of 5">★★★★★ <span className="t-mute">4.9 · 128 reviews</span></span>
        </div>
      </div>
      <p className="t-lead t-soft">{p.blurb}</p>

      <div className="opt">
        <div className="opt__label">
          <span>colour: <b>{COLORS[color].name}</b></span>
          {p.colors.length > 8 && <span className="t-mute">{p.colors.length} colours</span>}
        </div>
        <div className="swatches" role="radiogroup" aria-label="colour">
          {p.colors.map(k => (
            <button key={k} type="button" className="swatch swatch--lg" role="radio" aria-checked={k === color} aria-label={COLORS[k].name}
              style={{ "--c": dot(k) }} onClick={() => setColor(k)} />
          ))}
        </div>
      </div>

      <div className="opt">
        <div className="opt__label">
          <span>size: <b>{size.toUpperCase()}</b></span>
          <button type="button" onClick={() => toast("size guide coming soon — we're measuring everything twice")}>size &amp; fit guide</button>
        </div>
        <div className="sizes" role="radiogroup" aria-label="size">
          {SIZES.map(s => (
            <button key={s} type="button" className="size" role="radio" aria-checked={s === size} onClick={() => setSize(s)}>{s.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {p.stitch && (
        <div className="opt">
          <div className="opt__label"><span>down the middle: <b>{stitch}</b></span><span className="t-mute">help us decide</span></div>
          <div className="chips" role="radiogroup" aria-label="centre seam">
            {p.stitch.map(o => (
              <button key={o} type="button" className="chip" role="radio" aria-checked={o === stitch} onClick={() => setStitch(o)}>{o}</button>
            ))}
          </div>
        </div>
      )}

      {setRows.length > 0 && (
        <div className="opt">
          <div className="opt__label"><span><b>complete the set</b></span><span className="t-mute">optional</span></div>
          <div className="set">
            {setRows.map(id => {
              const r = byId(id), st = sets[id];
              return (
                <div className="set__row" key={id}>
                  <Photo product={r} w={200} alt="" />
                  <div>
                    <p className="line__name">{r.name}</p>
                    <p className="line__meta">{inr(r.price)} · {COLORS[pieceColor(r, st.opt)].name}</p>
                    <div className="chips" role="radiogroup" aria-label={`${r.name} colour`}>
                      {optsFor(id).map(o => (
                        <button key={o} type="button" className="chip" role="radio" aria-checked={st.opt === o} onClick={() => choose(id, { opt: o, on: true })}>
                          <i style={{ "--c": o === "matching" ? dot(color) : dot(o) }} />{o === "matching" ? "match my suit" : o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input className="check" type="checkbox" aria-label={`add ${r.name}`} checked={st.on} onChange={e => choose(id, { on: e.target.checked })} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="buy__cta">
        <button className="btn" type="button" onClick={buy}>add to bag — {inr(subtotal)}</button>
        <button className="icon-btn icon-btn--outline" type="button" aria-label="save to wishlist" style={{ width: "3.4rem", height: "3.4rem" }}><HeartIcon /></button>
      </div>
      <div className="perks">
        <div><TruckIcon />free shipping over {inr(SHIP_FREE)}</div>
        <div><ExchangeIcon />easy 14-day exchanges</div>
        <div><DropIcon />chlorine &amp; salt resistant</div>
      </div>
      <div className="acc">
        <details open><summary>details</summary><div><ul>
          {isSuit && <><li>double-lined, fully opaque when wet</li><li>small removable pads, held in place by a second layer of fabric</li></>}
          {p.id === "off-shoulder" && <li>off-the-shoulder neckline with a hidden silicone grip</li>}
          {p.stitch && <li>flounces on the straps, basting stitch down the middle (or not — your call)</li>}
          {p.cat === "shorts" && <><li>knee-length, or just above — no riding up</li><li>matches every suit, or pick white or black</li></>}
          {p.cat === "cover-ups" && <><li>light, quick-dry woven fabric</li><li>made to wear over your suit on the walk home</li></>}
          {p.cat === "skirts" && <><li>plain, no print — light, quick-dry woven fabric</li><li>made to wear over your suit on the walk to the beach</li></>}
          <li>78% recycled nylon, 22% elastane</li><li>designed by teens in india</li>
        </ul></div></details>
        <details><summary>fit &amp; pads</summary><div>true to size. if you're between sizes, size up for more coverage. the pads are small and slip out through an inner opening — the second fabric layer keeps them flat and in place while you swim.</div></details>
        <details><summary>care</summary><div>rinse in cool fresh water after every swim. hand wash, dry flat in the shade. no tumble dry, no bleach.</div></details>
        <details><summary>shipping &amp; exchanges</summary><div>ships in 2–4 days across india. free over {inr(SHIP_FREE)}. unworn pieces with hygiene liner intact can be exchanged within 14 days.</div></details>
      </div>
    </div>
  );
}
