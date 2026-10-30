import { Link } from "react-router";
import type { ProductId } from "../../data/catalog";
import { useReveal } from "../../hooks/useReveal";
import { px } from "../../lib/format";
import { Sprite } from "../icons";

interface Signature {
  id: ProductId;
  name: string;
  img: string;
  alt: string;
  pos?: string;
  /** frame-oval or frame-scallop */
  frame: string;
  text: string;
}

const SIGNATURES: Signature[] = [
  { id: "off-shoulder", name: "the off-shoulder", img: "28681540", pos: "50% 25%", frame: "frame-oval",
    alt: "the off-shoulder one-piece, worn standing in the sea",
    text: "a soft off-the-shoulder neckline with a hidden grip, so it stays exactly where you put it." },
  { id: "flounce", name: "the flounce", img: "4271771", frame: "frame-scallop",
    alt: "the flounce one-piece with ruffled straps, laid flat",
    text: "soft flounces on the straps, finished with a basting stitch down the middle." },
];

function SignatureItem({ s }: { s: Signature }) {
  const [ref, reveal] = useReveal<HTMLAnchorElement>();
  return (
    <Link ref={ref} className={`sig__item ${reveal}`} to={`/product/${s.id}`}>
      <div className={s.frame}><img src={px(s.img, 900)} alt={s.alt} loading="lazy" style={s.pos ? { objectPosition: s.pos } : undefined} /></div>
      <h3 className="t-headline"><em>{s.name}</em></h3>
      <p>{s.text}</p>
    </Link>
  );
}

/* ref: the interiors board's "what's trending": an olive field, the headline split by a
   line drawing, two photos in thin-lined oval and scalloped frames, then a long italic link */
export function Signatures() {
  return (
    <section id="signatures" className="sig field field--olive" aria-labelledby="sig-title">
      <div className="wrap">
        <h2 id="sig-title" className="sig__title t-headline"><em>our</em><Sprite id="i-sun-line" className="ill" /><em>signatures</em></h2>
        <div className="sig__grid">
          {SIGNATURES.map(s => <SignatureItem key={s.id} s={s} />)}
        </div>
        <Link className="link-line" to="/shop/signatures">view <em>the signatures</em></Link>
      </div>
    </section>
  );
}
