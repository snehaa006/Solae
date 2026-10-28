import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { byId, COLORS, SHIP_FREE } from "../../data/catalog";
import { useCart } from "../../context/cart";
import { useToast } from "../../context/toast";
import { sar } from "../../lib/format";
import { CloseIcon } from "../icons";
import { Photo } from "../Photo";

export function CartDrawer() {
  const { lines, count, total, changeQty, isOpen, close } = useCart();
  const toast = useToast();
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (isOpen) closeBtn.current?.focus(); }, [isOpen]);

  const left = SHIP_FREE - total;
  const shipMsg = total === 0
    ? <>spend {sar(SHIP_FREE)} for free shipping across saudi arabia</>
    : left > 0 ? <>you're <b>{sar(left)}</b> away from free shipping</> : <><b>you've unlocked free shipping</b> ☀</>;

  return (
    <>
      <div className={`scrim${isOpen ? " is-open" : ""}`} onClick={close} />
      <aside className={`drawer${isOpen ? " is-open" : ""}`} aria-label="your bag">
        <div className="drawer__head">
          <h2>your bag</h2>
          <button ref={closeBtn} className="icon-btn" type="button" aria-label="close bag" onClick={close}><CloseIcon /></button>
        </div>
        <div className="drawer__ship">
          <span>{shipMsg}</span>
          <div className="drawer__bar"><i style={{ "--p": Math.min(100, (total / SHIP_FREE) * 100) + "%" }} /></div>
        </div>
        <div className="drawer__items">
          {count === 0 ? (
            <div className="drawer__empty">
              <p className="t-hand">nothing yet</p>
              <p>the sun is out though.</p>
              <Link className="btn btn--ink btn--sm" to="/shop" onClick={close}>shop drop 01</Link>
            </div>
          ) : lines.map(l => {
            const p = byId(l.id);
            return (
              <div className="line" key={l.key}>
                <Photo product={p} w={200} alt="" />
                <div>
                  <p className="line__name">{p.name}</p>
                  <p className="line__meta">{COLORS[l.color].name} · {l.size.toUpperCase()}{l.extra ? " · " + l.extra : ""}</p>
                  <div className="qty">
                    <button type="button" aria-label="decrease" onClick={() => changeQty(l.key, -1)}>−</button>
                    <span>{l.qty}</span>
                    <button type="button" aria-label="increase" onClick={() => changeQty(l.key, 1)}>+</button>
                  </div>
                </div>
                <b>{sar(p.price * l.qty)}</b>
              </div>
            );
          })}
        </div>
        <div className="drawer__foot" hidden={count === 0}>
          <div className="drawer__total"><span>subtotal</span><span>{sar(total)}</span></div>
          <button className="btn btn--block checkout" type="button" onClick={() => toast("this is a mock store — checkout comes next ☀")}>checkout</button>
          <p className="t-small t-mute" style={{ textAlign: "center" }}>taxes included · shipping calculated at checkout</p>
        </div>
      </aside>
    </>
  );
}
