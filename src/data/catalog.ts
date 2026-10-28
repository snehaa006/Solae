/* ==========================================================================
   SOLAE — catalog data
   Products, colours, sizes and ports (the shop map's categories).
   Photography: Pexels (free licence) — stand-ins until the real shoot.
   ========================================================================== */

/* the Brand Starter's collection colours (swimsuits only), plus white and black */
export const COLORS = {
  tropical: { name: "tropical",  dot: "#17BEBB" },
  cerulean: { name: "cerulean",  dot: "#0E79B2" },
  sky:      { name: "blue grey", dot: "#6699CC" },
  ocean:    { name: "ocean",     dot: "#0471A6" },
  brick:    { name: "brick",     dot: "#B40421" },
  turf:     { name: "turf",      dot: "#337155" },
  willow:   { name: "willow",    dot: "#93C186" },
  white:    { name: "white",     dot: "#FFFFFF" },
  black:    { name: "black",     dot: "#1E2626" },
} as const;

export type ColorKey = keyof typeof COLORS;
export type Category = "swimsuits" | "shorts" | "cover-ups";
export type ProductId =
  | "tidepool" | "cabana" | "shallows" | "off-shoulder" | "flounce"
  | "boardwalk" | "drift" | "white-one";

export interface Product {
  id: ProductId;
  name: string;
  short: string;
  cat: Category;
  /** one of the two signature styles (they get their own port) */
  sig?: boolean;
  type: string;
  /** SAR */
  price: number;
  /** Pexels photo id for the card */
  img: string;
  /** object-position for every crop of this product */
  pos: string;
  alt: string;
  gallery: string[];
  colors: ColorKey[];
  /** the flounce comes with or without its centre seam */
  stitch?: string[];
  blurb: string;
}

export const isColorKey = (k: unknown): k is ColorKey => typeof k === "string" && Object.hasOwn(COLORS, k);
export const dot = (k: ColorKey) => COLORS[k].dot;

/* Brand notes: plain suits, except the two signatures (off-shoulder, flounce).
   Every suit is double-lined with small removable pads held in by a second layer of fabric. */
const BASE: Product[] = [
  { id: "tidepool", name: "the tidepool one-piece", short: "tidepool", cat: "swimsuits", type: "scoop-neck one-piece", price: 229,
    img: "31094963", pos: "80% 30%", alt: "a lagoon-blue one-piece swimsuit, worn", gallery: ["31094963", "29957708"],
    colors: ["tropical", "cerulean", "brick", "turf"],
    blurb: "our everyday one-piece: plain, double-lined and scooped just right." },
  { id: "cabana", name: "the cabana square-neck", short: "cabana", cat: "swimsuits", type: "square-neck one-piece", price: 219,
    img: "10486115", pos: "50% 30%", alt: "three friends in one-piece swimsuits laughing together on the beach", gallery: ["10486115", "8926078"],
    colors: ["sky", "willow", "ocean", "brick"],
    blurb: "a plain square neck and a low scoop back, with nothing that digs in." },
  { id: "shallows", name: "the shallows racerback", short: "shallows", cat: "swimsuits", type: "racerback one-piece", price: 219,
    img: "33265997", pos: "50% 40%", alt: "a group of girls in swimsuits posing on rocks by the sea", gallery: ["33265997", "40471890"],
    colors: ["ocean", "turf", "black"],
    blurb: "a high neck and a racerback that stays put for laps and cannonballs." },
  { id: "off-shoulder", name: "the off-shoulder", short: "off-shoulder", cat: "swimsuits", sig: true, type: "signature swimsuit", price: 259,
    img: "28681540", pos: "50% 30%", alt: "a black off-the-shoulder one-piece, worn standing in the sea", gallery: ["28681540", "28681548"],
    colors: ["black", "brick", "cerulean"],
    blurb: "a soft off-the-shoulder neckline with a hidden grip, so it stays where you put it." },
  { id: "flounce", name: "the flounce", short: "flounce", cat: "swimsuits", sig: true, type: "signature swimsuit", price: 259,
    img: "4271771", pos: "50% 40%", alt: "a blue-grey one-piece with ruffled flounce straps, laid flat", gallery: ["4271771", "27330805"],
    colors: ["sky", "tropical", "willow"], stitch: ["basting stitch", "no stitch"],
    blurb: "soft flounces on the straps, with or without a basting stitch down the middle." },
  { id: "boardwalk", name: "the boardwalk short", short: "boardwalk", cat: "shorts", type: "knee-length short", price: 99,
    img: "3998649", pos: "50% 60%", alt: "swim shorts and suits laid out flat on a wooden floor", gallery: ["3998649", "25649794"],
    colors: [],
    blurb: "knee-length and quick-dry, in your suit's colour or in white or black." },
  { id: "drift", name: "the drift cover-up", short: "drift", cat: "cover-ups", type: "cover-up", price: 149,
    img: "35126783", pos: "50% 35%", alt: "a sheer yellow cover-up worn on a tropical beach", gallery: ["35126783", "36173873"],
    colors: [],
    blurb: "a breezy kaftan in every suit colour, for the walk from the water to lunch." },
  { id: "white-one", name: "the white one", short: "white one", cat: "cover-ups", type: "cover-up", price: 169,
    img: "15560782", pos: "50% 30%", alt: "a long white lace cover-up worn on a misty beach", gallery: ["15560782", "8371478"],
    colors: ["white"],
    blurb: "a long, light white cover-up that goes over every suit we make." },
];

/* matching pieces come in every suit colour; the shorts also come in white or black */
const SUIT_COLORS = [...new Set(BASE.filter(p => p.cat === "swimsuits").flatMap(p => p.colors))];
const MATCHING: Partial<Record<ProductId, ColorKey[]>> = {
  boardwalk: [...SUIT_COLORS.filter(k => k !== "black"), "white", "black"],
  drift: SUIT_COLORS,
};

export const PRODUCTS: Product[] = BASE.map(p => ({ ...p, colors: MATCHING[p.id] ?? p.colors }));

export function byId(id: ProductId): Product;
export function byId(id: string | null | undefined): Product | undefined;
export function byId(id: string | null | undefined) {
  return PRODUCTS.find(p => p.id === id);
}

export const SIZES = ["xs", "s", "m", "l", "xl"] as const;
export type Size = (typeof SIZES)[number];
export const isSize = (s: unknown): s is Size => SIZES.includes(s as Size);

/** SAR; a matching set ships free */
export const SHIP_FREE = 300;

/** the slim strip of facts under each product */
export const FACTS: Record<Category, string[]> = {
  swimsuits: ["double-lined", "removable pads", "fully opaque", "chlorine resistant"],
  shorts: ["knee-length", "quick-dry", "matches every suit", "chlorine resistant"],
  "cover-ups": ["lightweight", "quick-dry", "goes over every suit", "packs small"],
};

/* Shop map: each category is a place. `notes` define the category in a few words. */
export type PortId = "all" | "swimsuits" | "signatures" | "shorts" | "cover-ups";

export interface Port {
  id: PortId;
  place: string;
  label: string;
  /** the two-line headline on the photo postcard */
  line: [string, string];
  notes: string[];
}

export const PORTS: Port[] = [
  { id: "all", place: "solae harbour", label: "everything", line: ["made for", "the sun"],
    notes: ["all of drop 01", "start here"] },
  { id: "swimsuits", place: "swimsuit bay", label: "plain swimsuits", line: ["built for", "warm days"],
    notes: ["double-lined", "small removable pads", "held in by a second layer"] },
  { id: "signatures", place: "signature isle", label: "signature swimsuits", line: ["built for", "warm days"],
    notes: ["off the shoulder", "flounces + basting stitch", "small removable pads"] },
  { id: "shorts", place: "shorts shore", label: "matching shorts", line: ["made to", "match"],
    notes: ["knee-length or just above", "match your suit", "or white / black"] },
  { id: "cover-ups", place: "cover-up cove", label: "cover-ups", line: ["for the", "walk home"],
    notes: ["matches every suit", "plus the white one", "quick-dry"] },
];

export const isPortId = (id: unknown): id is PortId => PORTS.some(x => x.id === id);
export const portOf = (p: Product): PortId => (p.sig ? "signatures" : p.cat);
export const portById = (id: PortId) => PORTS.find(x => x.id === id)!;
export const inPort = (id: PortId) => (id === "all" ? PRODUCTS : PRODUCTS.filter(p => portOf(p) === id));
