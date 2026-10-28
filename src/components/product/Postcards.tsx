import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { byId, PORTS, PRODUCTS, type Port, type Product } from "../../data/catalog";
import { inr, pad, prefersReducedMotion, px } from "../../lib/format";
import { NextIcon, PrevIcon, Sprite } from "../icons";

/* the postcards — one per photo, then the letter and the welcome card
   (pins: caprini, lemon stripe short, a postcard from summer, built for warm days) */
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
  const marks = [port, ...PORTS.slice(1).filter(x => x !== port)].slice(0, 3);
  const facts = [...port.notes, ...(p.stitch ? ["tell us: basting stitch or not?"] : [])];

  const slides = [
    <article key="stamp" className="post post--stamp">
      <div className="post__perf"><div className="post__sheet">
        <div className="post__row"><span className="post__num">#{pad(n)}</span><span className="t-label">@solae.swim</span></div>
        <p className="post__name t-fluid" style={{ "--len": p.short.length }}>{p.short}</p>
        <div className="post__shot">{img(shots[0], 0)}</div>
        <div className="post__row post__row--foot"><span>{p.name}<b>{inr(p.price)}</b></span><span>drop 01<b>summer 2026</b></span></div>
      </div></div>
      <svg className="post__clip" viewBox="0 0 64 72" aria-hidden="true">
        <path className="post__clip-wire" d="M15 40V12a6 6 0 0 1 12 0V40M37 40V12a6 6 0 0 1 12 0V40" />
        <path className="post__clip-body" d="M8 34H56L62 68H2Z" />
        <path className="post__clip-shine" d="M10 40H54" />
      </svg>
    </article>,

    <article key="photo" className="post post--photo">
      {img(shots[1] ?? shots[0], 1)}
      <div className="post__mast"><p className="t-label">solae · {port.place}</p><p className="post__script">{port.line[0]}</p><p className="post__caps">{port.line[1]}</p></div>
      <div className="post__note"><Sprite id="i-sun-solo" className="post__sun" /><p>{p.blurb.split(". ")[0].replace(/\.$/, "")}.</p></div>
    </article>,

    <article key="letter" className="post post--letter">
      <div className="post__perf"><div className="post__sheet">
        <div className="post__marks" aria-hidden="true">
          {marks.map((x, i) => <span key={x.id} className={`post__pm post__pm--${i}`}>{x.place}<small>{pad(4 + i * 7)}.06.26</small></span>)}
        </div>
        <p className="post__from"><span>a postcard from</span>{port.place}</p>
        <p className="t-label post__ss">solae · drop 01 · ss'26</p>
        <p className="post__msg">{p.blurb}</p>
        <p className="post__box"><span className="t-label">postmarked from</span>{PORTS.slice(1).map(x => x.place).join(" · ")}</p>
      </div></div>
      <div className="post__strip">
        {[shots[0], shots[1] ?? shots[0]].map((id, i) => <div key={i}>{img(id, i + 1, 500)}</div>)}
        <div><img src={px(look.img, 500)} alt={look.alt} loading="lazy" style={{ objectPosition: look.pos }} /></div>
      </div>
    </article>,

    <article key="brand" className="post post--brand">
      <div className="post__stripes">
        <span className="wordmark">Solae</span><p className="post__tag">made for the sun</p>
        <svg className="post__paperclip" viewBox="0 0 24 80" aria-hidden="true"><path d="M8 60V14a6 6 0 0 1 12 0v52a10 10 0 0 1-20 0V20" /></svg>
      </div>
      <div className="post__back">
        <div className="post__welcome">
          <p className="post__caps">welcome to your endless summer</p>
          <div className="post__stamp stamp-wrap"><div className="stamp"><div className="stamp__inner">{img(shots[0], 2, 300)}<p className="t-label">₹ 26 · india</p></div></div></div>
        </div>
        <p className="post__lede">some suits slip, ride up or show too much. this one stays put.</p>
        <div className="post__cols">
          <ul role="list">{facts.map(x => <li key={x}>{x}</li>)}</ul>
          <div className="post__lines"><p>thank you for choosing solae.</p><p>we hope this one comes</p><p>on every trip x</p></div>
        </div>
        <p className="post__foot"><span>@solae.swim</span><span>{p.type} · {inr(p.price)}</span></p>
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
      <p className="stack__hint t-hand" aria-hidden="true">swipe the postcards</p>
    </div>
  );
}
