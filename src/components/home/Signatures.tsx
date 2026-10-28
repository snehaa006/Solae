import { Link } from "react-router";
import type { ProductId } from "../../data/catalog";
import { useReveal } from "../../hooks/useReveal";
import { px } from "../../lib/format";
import { Edge } from "../edges";

interface Signature {
  id: ProductId;
  num: string;
  name: string;
  img: string;
  alt: string;
  pos?: string;
  text: string;
}

const SIGNATURES: Signature[] = [
  { id: "off-shoulder", num: "01", name: "the off-shoulder", img: "28681540", pos: "50% 25%",
    alt: "the off-shoulder one-piece, worn standing in the sea",
    text: "a soft off-the-shoulder neckline with a hidden grip, so it stays exactly where you put it." },
  { id: "flounce", num: "02", name: "the flounce", img: "4271771",
    alt: "the flounce one-piece with ruffled straps, laid flat",
    text: "soft flounces on the straps, finished with a basting stitch down the middle." },
];

function SignatureItem({ s }: { s: Signature }) {
  const [ref, reveal] = useReveal<HTMLAnchorElement>();
  return (
    <Link ref={ref} className={`sig__item ${reveal}`} to={`/product/${s.id}`}>
      <div className="frame-arch"><img src={px(s.img, 900)} alt={s.alt} loading="lazy" style={s.pos ? { objectPosition: s.pos } : undefined} /></div>
      <span className="num" aria-hidden="true">{s.num}</span>
      <h3 className="t-headline">{s.name}</h3>
      <p>{s.text}</p>
      <span className="btn btn--ghost btn--sm">shop {s.name}</span>
    </Link>
  );
}

/* pin: "surf shop" — arches, waves and type on a curve */
export function Signatures() {
  return (
    <section id="signatures" className="sig" aria-labelledby="sig-title">
      <div className="wrap sig__inner">
        <div className="sig__head">
          <p className="t-hand" aria-hidden="true">you asked, we made them</p>
          <h2 id="sig-title" className="t-wide t-wide--l">signatures</h2>
        </div>
        <div className="sig__grid">
          {SIGNATURES.map(s => <SignatureItem key={s.id} s={s} />)}
        </div>
        <svg className="sig__curve" viewBox="0 0 1200 120" aria-hidden="true">
          <path id="sig-wave" d="M0 70C100 20 200 20 300 70S500 120 600 70 800 20 900 70 1100 120 1200 70" fill="none" />
          <text><textPath href="#sig-wave">life's a beach ✶ made for the sun ✶ life's a wave ✶ by teens, for teens ✶ life's a beach ✶ made for the sun ✶</textPath></text>
        </svg>
      </div>
      <Edge shape="wave" style={{ position: "absolute", bottom: "-39px", left: 0, height: "40px" }} />
    </section>
  );
}
