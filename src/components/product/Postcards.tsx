import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { byId, PRODUCTS, type Port, type Product } from "../../data/catalog";
import { pad, prefersReducedMotion, px, sar } from "../../lib/format";
import { NextIcon, PrevIcon, Sprite } from "../icons";
import { Logo } from "../Logo";

/** rows of little waves, n deep and w wide */
const Waves = ({ n, w }: { n: number; w: number }) => (
  <svg className="post__waves" viewBox={`0 0 ${w} ${n * 12}`} preserveAspectRatio="none" aria-hidden="true">
    {Array.from({ length: n }, (_, i) => <path key={i} d={`M0 ${6 + i * 12}${"q5-5 10 0t10 0".repeat(w / 20)}`} />)}
  </svg>
);
const PLANE = <svg className="post__plane" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15.5v-2l-8-5V3.6a1.5 1.5 0 0 0-3 0v4.9l-8 5v2l8-2.5v5.4L8 19.6V21l3.5-1 3.5 1v-1.4L13 18.4V13z" /></svg>;
const SPARKLE = "M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z";

/* the postcards — each one follows its pin's layout piece for piece:
   1 lemon stripe short (stamp), 2 built for warm days (photo), 3 a postcard from summer (letter), 4 caprini (welcome) */
export function Postcards({ product: p, port }: { product: Product; port: Port }) {
  const posts = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [active, setActive] = useState(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const n = PRODUCTS.indexOf(p) + 1;
  const shots = p.gallery;
  const img = (id: string, i: number, w = 1100) => (
    <img src={px(id, w)} alt={i ? `another look at ${p.name}` : p.alt} loading={i ? "lazy" : "eager"} style={{ objectPosition: p.pos }} />
  );
  const look = byId(p.cat === "swimsuits" ? "boardwalk" : "tidepool");
  // the note on the photo card holds a sentence or two of the blurb
  const note = p.blurb.split(/(?<=\.) /).reduce((t, x) => (t.length < 70 ? (t ? t + " " : "") + x : t), "");

  const slides = [
    <article key="stamp" className="post post--stamp">
      <div className="post__perf"><div className="post__panel" /></div>
      <i className="post__specks" aria-hidden="true" />
      <svg className="post__ring" viewBox="0 0 200 56" preserveAspectRatio="none" aria-hidden="true"><path d="M30 50C8 46 2 30 14 18S70 2 116 3s80 8 80 24-40 26-96 27c-30 .5-60-2-74-8" /></svg>
      <span className="post__num">#{pad(n)}</span>
      <span className="post__handle">@solae.swim</span>
      <p className="post__title" style={{ "--len": p.name.length }}>{p.name}</p>
      <div className="post__shot">{img(shots[0], 0)}</div>
      <p className="post__meta">{p.name}<b>{sar(p.price)}</b></p>
      <p className="post__date">drop 01 · live now<br />ships across saudi arabia</p>
      <svg className="post__clip" viewBox="0 0 100 80" aria-hidden="true">
        <defs><linearGradient id="clip-metal" x1="0" y1="0" x2="1" y2="1"><stop className="post__clip-hi" offset="0" /><stop className="post__clip-mid" offset=".55" /><stop className="post__clip-lo" offset="1" /></linearGradient></defs>
        <path className="post__clip-wire" d="M30 38 20 9a5 5 0 0 1 9-3l14 32M70 38 80 9a5 5 0 0 0-9-3L57 38" />
        <path className="post__clip-body" d="M24 34h52l10 36H14z" />
        <path className="post__clip-fold" d="M24 34h52l2 7H22z" />
        <path className="post__clip-shine" d="M22 48h56" />
      </svg>
    </article>,

    <article key="photo" className="post post--photo">
      {img(shots[1] ?? shots[0], 1)}
      <p className="post__label">solae · drop 01<br />{port.place}</p>
      <p className="post__head" style={{ "--len": port.line[1].length }}><span>{port.line[0]}</span>{port.line[1]}</p>
      <div className="post__note"><p>{note}</p></div>
      <svg className="post__shell" viewBox="0 0 100 92" aria-hidden="true">
        <path className="post__shell-ears" d="M36 72 26 88h48L64 72z" />
        <path className="post__shell-fan" d="M50 4C24 4 4 26 8 52c2 10 18 22 42 24 24-2 40-14 42-24C96 26 76 4 50 4z" />
        <path className="post__shell-ribs" d="M50 76V8M50 76 34 10M50 76 66 10M50 76 20 20M50 76 80 20M50 76 11 36M50 76 89 36" />
      </svg>
    </article>,

    <article key="letter" className="post post--letter">
      <div className="post__card">
        <div className="post__perf"><div className="post__paper" /></div>
        <div className="post__waves-a"><Waves n={6} w={240} /></div>
        <p className="post__pm post__pm--a"><b>jeddah</b><span>saudi arabia</span><span>04.05.26</span></p>
        <p className="post__pm post__pm--b"><b>umluj</b><span>tabuk</span><span>18.06.26</span></p>
        <svg className="post__pm post__pm--c" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="57" /><circle cx="60" cy="60" r="51" />
          <path id="pm-arc-c" d="M18 62a42 42 0 0 1 84 0" fill="none" stroke="none" />
          <text className="post__pm-arc"><textPath href="#pm-arc-c" startOffset="50%" textAnchor="middle">YANBU</textPath></text>
          <path className="post__pm-icon" d="M55 74 57 52h6l2 22zM56 52h8v-4h-8zM58 48l2-5 2 5M54 74h12" />
          <text x="60" y="88" textAnchor="middle" className="post__pm-sm">MADINAH</text><text x="60" y="99" textAnchor="middle" className="post__pm-sm">02.07.26</text>
        </svg>
        <p className="post__from">a postcard<br />from summer</p>
        <p className="post__ss">solae ss'26</p>
        <p className="post__pm post__pm--d"><b>half moon<br />bay</b><span>khobar</span><span>29.06.26</span></p>
        <svg className="post__palm" viewBox="0 0 60 60" aria-hidden="true">
          <path d="M30 58c0-14 1-26 4-34" />
          <path className="post__palm-leaf" d="M34 24C26 16 12 16 4 24c10-4 20-4 30 0zM34 24c6-10 18-12 24-6-8-2-16 0-24 6zM34 24c-2-10 4-18 12-20-6 6-10 12-12 20zM34 24C24 24 16 32 16 40c4-8 10-14 18-16zM34 24c10 0 16 8 16 16-4-8-8-12-16-16z" />
        </svg>
        <p className="post__pm post__pm--e"><b>farasan</b><span>jazan {PLANE}</span><span>07.07.26</span></p>
        <p className="post__pm post__pm--f"><span>postmarked from</span><b>jeddah · umluj · yanbu<br />half moon bay · farasan</b></p>
        <svg className="post__pm post__pm--g" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="37" /><use href="#i-sun-solo" x="22" y="22" width="36" height="36" /></svg>
      </div>
      <div className="post__strip">
        {[shots[0], shots[1] ?? shots[0]].map((id, i) => <div key={i}>{img(id, i + 1, 500)}</div>)}
        <div><img src={px(look.img, 500)} alt={look.alt} loading="lazy" style={{ objectPosition: look.pos }} /></div>
      </div>
    </article>,

    <article key="brand" className="post post--brand">
      <div className="post__front">
        <span className="post__logo" aria-hidden="true"><Logo /></span>
        <svg className="post__sparks" viewBox="0 0 100 40" aria-hidden="true">
          <g transform="translate(14 14) scale(.9)"><path d={SPARKLE} /></g><g transform="translate(66 4) scale(1.05)"><path d={SPARKLE} /></g>
        </svg>
        <p className="post__tag">made for the sun</p>
      </div>
      <svg className="post__paperclip" viewBox="0 0 24 90" aria-hidden="true"><path d="M7 70V14a6.5 6.5 0 0 1 13 0v62a10 10 0 0 1-20 0V22" /></svg>
      <div className="post__back">
        <p className="post__welcome">welcome to your<br />endless summer</p>
        <div className="post__seal">
          <Waves n={3} w={120} />
          <svg className="post__mark" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="56" /><circle cx="60" cy="60" r="38" />
            <path id="pm-arc-w" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" fill="none" stroke="none" />
            <text className="post__mark-arc"><textPath href="#pm-arc-w">SOLAE · DROP 01 · SUMMER 26 ·</textPath></text>
            <text x="60" y="72" textAnchor="middle" className="post__mark-s">S</text>
          </svg>
          <div className="post__stamp stamp-wrap"><div className="stamp"><div className="stamp__inner">{img(shots[0], 2, 300)}<span>Solae</span></div></div></div>
        </div>
        <p className="post__lede">some suits slip, ride up or show too much.<br />this one just stays put.</p>
        <div className="post__copy">
          <p>the first dip, the first cannonball, the first climb out of the pool when nothing has moved an inch. that's the suit i kept looking for, so i made it.</p>
          <p>{p.blurb}</p>
          <p className="post__at">@solae.swim</p>
        </div>
        <div className="post__lines"><p>thank you for choosing solae.</p><p>we hope this one comes</p><p>on every trip, to every</p><p>beach, all summer long.</p></div>
        <p className="post__url">solae · modest swim sets for teen girls</p>
      </div>
    </article>,
  ];

  const current = () => {
    const el = posts.current;
    return el ? Math.round(el.scrollLeft / el.clientWidth) : 0;
  };
  const slideTo = (i: number) => {
    const el = posts.current;
    el?.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setActive(current()));
  };

  return (
    <div className="stack">
      <Link className="stack__back" to={`/shop/${port.id}`} aria-label={`back to ${port.place}`}><PrevIcon /></Link>
      <p className="stack__where t-label"><Sprite id="i-boat" />{port.place}</p>
      <div ref={posts} className="posts" tabIndex={0} role="region" aria-roledescription="carousel" aria-label={`postcards of ${p.name}`} onScroll={onScroll}>
        {slides.map((s, i) => (
          <div key={i} className="posts__slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>{s}</div>
        ))}
      </div>
      <div className="stack__bar">
        <button className="stack__arrow" type="button" aria-label="previous postcard" onClick={() => slideTo(current() - 1)}><PrevIcon /></button>
        <div className="stack__dots">
          {slides.map((_, i) => <button key={i} type="button" aria-label={`postcard ${i + 1}`} aria-current={i === active} onClick={() => slideTo(i)} />)}
        </div>
        <button className="stack__arrow" type="button" aria-label="next postcard" onClick={() => slideTo(current() + 1)}><NextIcon /></button>
      </div>
    </div>
  );
}
