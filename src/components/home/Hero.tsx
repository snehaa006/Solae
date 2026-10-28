import { Link } from "react-router";
import { px } from "../../lib/format";

/* pin: "the late checkout" — editorial spread */
export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero__title t-headline t-mega">made for the sun</h1>
      <div className="hero__grid">
        <div className="hero__main">
          <div className="frame"><img src={px("10486115", 1800)} alt="three friends in one-piece swimsuits laughing together on the beach" fetchPriority="high" /></div>
          <div className="hero__stamp stamp-wrap" aria-hidden="true">
            <div className="stamp"><div className="stamp__inner">
              <img src={px("27330805", 400)} alt="" />
              <p className="t-label">summer '26 · india</p>
            </div></div>
          </div>
          <div className="hero__foot">
            <p className="t-tag">swim, shorts &amp; cover-ups for girls<br />who'd rather be in the water</p>
            <p className="t-hand" aria-hidden="true">scroll down to explore</p>
          </div>
        </div>
        <aside className="hero__side">
          <p className="t-hand" aria-hidden="true">it's about</p>
          <h2 className="t-headline">the suit you forget you're wearing</h2>
          <div className="frame"><img src={px("32181630", 900)} alt="a girl in heart sunglasses peeking through a sprinkle-donut pool float" /></div>
          <p>plain, double-lined one-pieces with removable pads, knee-length shorts that match, and cover-ups for the walk home. designed by teens, for teens.</p>
          <div className="hero__ctas">
            <Link className="btn" to="/shop">shop drop 01</Link>
            <a className="btn btn--ghost" href="#about">our story</a>
          </div>
        </aside>
      </div>
    </section>
  );
}
