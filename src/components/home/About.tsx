import { useReveal } from "../../hooks/useReveal";
import { px } from "../../lib/format";
import { Sprite } from "../icons";

const ROWS = [
  { img: "10495658", alt: "friends sitting together on the beach in the shade", title: "made by teens",
    text: "we're a group of teens who got tired of shopping for swimwear made for someone else. every piece is designed, tested and argued over by us." },
  { img: "40471890", alt: "two swimmers seen from above in deep blue water", title: "tested in the water",
    text: "if a suit slips when you dive, rides up when you climb out, or goes see-through when it's wet, it doesn't make the drop. simple." },
  { img: "5405629", alt: "a tropical swimsuit laid flat with a camera, palm leaf and straw bag", title: "made to match",
    text: "shorts, cover-ups and skirts come in every suit colour — plus white and black for the days you want it simple." },
];

function AboutRow({ row }: { row: (typeof ROWS)[number] }) {
  const [ref, reveal] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`about__row ${reveal}`}>
      <div className="frame-wavy"><img src={px(row.img, 1000)} alt={row.alt} loading="lazy" /></div>
      <div>
        <div className="about__label"><Sprite id="i-squiggle" /><h3>{row.title}</h3></div>
        <p>{row.text}</p>
      </div>
    </div>
  );
}

/* pin: "SUIT" about rows */
export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <Sprite id="i-leaf" className="about__leaf" style={{ right: "-4rem", top: "2rem" }} viewBox="0 0 300 300" />
      <Sprite id="i-leaf" className="about__leaf" style={{ left: "-5rem", bottom: 0, transform: "scaleX(-1) rotate(20deg)" }} viewBox="0 0 300 300" />
      <div className="wrap">
        <div className="about__head">
          <h2 id="about-title" className="t-wide t-wide--xl">about us</h2>
          <p className="t-script" style={{ fontSize: "clamp(1.3rem,1.1rem + .8vw,1.8rem)", color: "var(--ocean)" }}>three things we care about</p>
        </div>
        <div className="about__rows">
          {ROWS.map(row => <AboutRow key={row.title} row={row} />)}
        </div>
      </div>
    </section>
  );
}
