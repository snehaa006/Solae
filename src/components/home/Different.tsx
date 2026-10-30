const POINTS = [
  { cut: "suit-lace-pink", title: "double-lined, every time…", text: "every suit is double-lined, so it stays fully opaque when it's wet." },
  { cut: "suit-flounce-pink", title: "pads that stay put…", text: "small removable pads, held in by a second layer of fabric." },
  { cut: "shorts-pink", title: "shorts that match…", text: "knee-length shorts in every suit colour, plus white and black." },
  { cut: "sunglasses-pink", title: "made for the gulf…", text: "designed in saudi arabia, for long, bright summers by the sea." },
];

/* ref: the interiors board's "how we're different": a pink field, white cards, each with a
   cutout tinted in one colour (their pink engravings, our pieces in pink) */
export function Different() {
  return (
    <section className="diff field field--pink" aria-labelledby="diff-title">
      <div className="wrap">
        <h2 id="diff-title" className="diff__title t-headline">how we're <em>different</em></h2>
        <ul className="diff__grid" role="list">
          {POINTS.map(p => (
            <li className="diff__card" key={p.cut}>
              <img className="diff__cut" src={`/img/cutouts/${p.cut}.webp`} alt="" loading="lazy" />
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
