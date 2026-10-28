import { Link } from "react-router";
import { px } from "../../lib/format";
import { Logo } from "../Logo";

/* pin: "the late checkout" — editorial spread; the headline ends where the chosen logo's sun rises out of the window's edge */
export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero__sun" aria-hidden="true"><Logo slot="hero" /></div>
      <h1 id="hero-title" className="hero__title t-headline t-mega">made for the sun</h1>
      <div className="hero__grid">
        <div className="hero__main">
          <div className="frame"><img src={px("10486115", 1800)} alt="three friends in one-piece swimsuits laughing together on the beach" fetchPriority="high" /></div>
        </div>
        <aside className="hero__side">
          <h2 className="t-headline">the suit you forget you're wearing</h2>
          <div className="frame"><img src={px("32181630", 900)} alt="a girl in heart sunglasses peeking through a sprinkle-donut pool float" /></div>
          <p>modest swim sets for teen girls: a one-piece and shorts that match.</p>
          <div className="hero__ctas">
            <Link className="btn" to="/shop">shop drop 01</Link>
            <a className="btn btn--ghost" href="#about">our story</a>
          </div>
        </aside>
      </div>
    </section>
  );
}
