import { Sprite } from "../icons";

const POINTS = [
  { icon: "i-shell", title: "double-lined, every time…", text: "every suit is double-lined, so it stays fully opaque when it's wet." },
  { icon: "i-sun-line", title: "pads that stay put…", text: "small removable pads, held in by a second layer of fabric." },
  { icon: "i-parasol", title: "shorts that match…", text: "knee-length shorts in every suit colour, plus white and black." },
  { icon: "i-palm", title: "made for the gulf…", text: "designed in saudi arabia, for long, bright summers by the sea." },
];

/* ref: the interiors board's "how we're different": a coral field, cream cards with line drawings */
export function Different() {
  return (
    <section className="diff field field--coral" aria-labelledby="diff-title">
      <div className="wrap">
        <h2 id="diff-title" className="diff__title t-headline">how we're <em>different</em></h2>
        <ul className="diff__grid" role="list">
          {POINTS.map(p => (
            <li className="diff__card" key={p.icon}>
              <Sprite id={p.icon} className="diff__icon ill" />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
        <div className="diff__more"><a className="btn" href="#about">read our story</a></div>
      </div>
    </section>
  );
}
