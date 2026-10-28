import { px } from "../../lib/format";
import { Edge } from "../edges";
import { Sprite } from "../icons";

/* pin: "sea & soil" — huge spaced type over the water */
export function Statement() {
  return (
    <section className="statement" aria-labelledby="statement-title">
      <img src={px("35761557", 2000)} alt="" loading="lazy" />
      <Edge shape="wave" className="edge--top" />
      <div className="statement__word">
        <h2 id="statement-title" className="sr-only">sun and salt</h2>
        <span className="t-wide" aria-hidden="true">sun</span>
        <div className="statement__wave" aria-hidden="true">
          <span className="t-wide">and</span><Sprite id="i-wave" viewBox="0 0 220 80" /><span className="t-wide">and</span>
        </div>
        <span className="t-wide" aria-hidden="true">salt</span>
        <div className="statement__cta">
          <p className="t-label">@solae.swim</p>
          <a className="btn btn--ghost-light btn--sm" href="#">follow along</a>
        </div>
      </div>
      <Edge shape="wave" className="edge--flip edge--bottom" />
    </section>
  );
}
