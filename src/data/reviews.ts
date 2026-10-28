import type { ProductId } from "./catalog";

export interface Review {
  name: string;
  /** yyyy-mm-dd */
  date: string;
  rating: number;
  text: string;
}

/* Real reviews go here as they come in: { tidepool: [{ name, date: "2026-07-12", rating: 5, text }] }.
   Until a piece has some, its page says "no reviews yet". */
export const REVIEWS: Partial<Record<ProductId, Review[]>> = {};

/* ?reviews=sample on a product page previews the layout with these; visitors never see them */
export const SAMPLE_REVIEWS: Review[] = [
  { name: "noura a.", date: "2026-07-12", rating: 5, text: "finally a suit that stays put when i jump in, and the shorts match perfectly." },
  { name: "lama k.", date: "2026-07-03", rating: 5, text: "comfortable all day at the beach. i didn't have to keep fixing it." },
  { name: "reem s.", date: "2026-06-21", rating: 4, text: "love the colour. i sized up for more coverage and it's just right." },
];

export const starRow = (r: number) => "★★★★★".slice(0, Math.round(r)) + "☆☆☆☆☆".slice(0, 5 - Math.round(r));
