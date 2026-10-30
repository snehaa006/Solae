import { Link } from "react-router";
import { px } from "../../lib/format";
import { Logo } from "../Logo";

/* ref: the swimwear thank-you card. Two cards over a beach photo: cabana stripes with three tiny
   caps and the headline, the chosen logo's sun rising out of its bottom edge and a retro sticker;
   then a framed butter card with the handle, a note on tape, one short paragraph and the buttons */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero__bg" src={px("10486115", 2000)} alt="three friends in one-piece swimsuits laughing together on the beach" fetchPriority="high" />
      <div className="wrap hero__stack">
        <div className="hero__cabana cabana">
          <p className="trio t-label"><span>modest</span><span>modern</span><span>swim sets</span></p>
          <h1 id="hero-title" className="hero__title t-headline">made for <em>the sun</em></h1>
          <div className="hero__sun" aria-hidden="true"><Logo slot="hero" /></div>
          <p className="hero__sticker sticker" aria-hidden="true"><span className="badge-sun"><span>summer 26</span><b>drop 01</b><span>is live</span></span></p>
        </div>
        <div className="hero__card framed">
          <p className="hero__handle t-label"><span>@solae.swim</span><span>designed in saudi arabia</span></p>
          <p className="tape-note">the suit you forget you're wearing</p>
          <p className="hero__lede">a double-lined one-piece and knee-length shorts that match, for teen girls who want coverage, comfort and confidence without giving up on style.</p>
          <div className="hero__ctas">
            <Link className="btn" to="/shop">shop drop 01</Link>
            <a className="btn btn--ghost" href="#about">our story</a>
          </div>
          <p className="trio t-label"><span>double-lined</span><span>removable pads</span><span>made to match</span></p>
        </div>
      </div>
    </section>
  );
}
