import { Link } from "react-router";
import type { ProductId } from "../../data/catalog";
import { useReveal } from "../../hooks/useReveal";
import { px } from "../../lib/format";
import { Edge } from "../edges";

interface Signature {
  id: ProductId;
  name: string;
  img: string;
  alt: string;
  pos?: string;
  text: string;
}

const SIGNATURES: Signature[] = [
  { id: "off-shoulder", name: "the off-shoulder", img: "28681540", pos: "50% 25%",
    alt: "the off-shoulder one-piece, worn standing in the sea",
    text: "a soft off-the-shoulder neckline with a hidden grip, so it stays exactly where you put it." },
  { id: "flounce", name: "the flounce", img: "4271771",
    alt: "the flounce one-piece with ruffled straps, laid flat",
    text: "soft flounces on the straps, finished with a basting stitch down the middle." },
];

function SignatureItem({ s }: { s: Signature }) {
  const [ref, reveal] = useReveal<HTMLAnchorElement>();
  return (
    <Link ref={ref} className={`sig__item ${reveal}`} to={`/product/${s.id}`}>
      <div className="frame-arch"><img src={px(s.img, 900)} alt={s.alt} loading="lazy" style={s.pos ? { objectPosition: s.pos } : undefined} /></div>
      <h3 className="t-headline">{s.name}</h3>
      <p>{s.text}</p>
    </Link>
  );
}

const EDGE = { position: "absolute", left: 0, height: "40px" } as const;

/* pin: "surf shop" — arches between two waves */
export function Signatures() {
  return (
    <section id="signatures" className="sig" aria-labelledby="sig-title">
      <Edge shape="wave" className="edge--flip" style={{ ...EDGE, top: "-39px" }} />
      <div className="wrap sig__inner">
        <div className="sig__head">
          <h2 id="sig-title" className="t-wide t-wide--l">signatures</h2>
        </div>
        <div className="sig__grid">
          {SIGNATURES.map(s => <SignatureItem key={s.id} s={s} />)}
        </div>
      </div>
      <Edge shape="wave" style={{ ...EDGE, bottom: "-39px" }} />
    </section>
  );
}
