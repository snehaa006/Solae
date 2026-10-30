import type { Product } from "../data/catalog";
import { px } from "../lib/format";

interface PhotoProps {
  product: Product;
  /** frame class: frame, frame-oval, frame-scallop, frame-arch */
  className?: string;
  w?: number;
  id?: string;
  alt?: string;
}

/** a product photo inside one of the frames */
export function Photo({ product: p, className = "frame", w = 900, id = p.img, alt = p.alt }: PhotoProps) {
  return (
    <div className={className}>
      <img src={px(id, w)} alt={alt} loading="lazy" style={{ objectPosition: p.pos }} />
    </div>
  );
}
