/* ==========================================================================
   SOLAE — catalog data
   Products, colours, sizes and ports (the shop map's categories).
   Photography: Pexels (free licence) — stand-ins until the real shoot.
   ========================================================================== */

export const COLORS = {
  lagoon:   { name: "lagoon",    dot: "#17BEBB" },
  brick:    { name: "brick",     dot: "#B40421" },
  jasmine:  { name: "jasmine",   dot: "#F8E077" },
  deep:     { name: "deep teal", dot: "#07494A" },
  sky:      { name: "blue grey", dot: "#6699CC" },
  turf:     { name: "turf",      dot: "#337155" },
  coral:    { name: "coral",     dot: "#F07167" },
  ocean:    { name: "ocean",     dot: "#0471A6" },
  hibiscus: { name: "hibiscus",  dot: "#EC0868" },
  willow:   { name: "willow",    dot: "#93C186" },
  marigold: { name: "marigold",  dot: "#FFAB4C" },
  lilac:    { name: "lilac",     dot: "#B9A6C9" },
  white:    { name: "white",     dot: "#FFFFFF" },
  black:    { name: "black",     dot: "#1E2626" },
  sand:     { name: "sand",      dot: "#FFECD1" },
} as const;

export type ColorKey = keyof typeof COLORS;
export type Category = "swimsuits" | "shorts" | "cover-ups" | "skirts";
export type BadgeTone = "sun" | "ink" | "coral";
export type ProductId =
  | "tidepool" | "cabana" | "shallows" | "off-shoulder" | "flounce"
  | "boardwalk" | "drift" | "white-one" | "shoreline";

export interface Product {
  id: ProductId;
  name: string;
  /** the name on the stamp postcard */
  short: string;
  cat: Category;
  /** one of the two signature styles (they get their own port) */
  sig?: boolean;
  type: string;
  price: number;
  /** Pexels photo id for the card */
  img: string;
  /** object-position for every crop of this product */
  pos: string;
  alt: string;
  gallery: string[];
  badges: [label: string, tone: BadgeTone][];
  colors: ColorKey[];
  /** the flounce asks shoppers to vote on its centre seam */
  stitch?: string[];
  blurb: string;
}

export const isColorKey = (k: unknown): k is ColorKey => typeof k === "string" && Object.hasOwn(COLORS, k);
export const dot = (k: ColorKey) => COLORS[k].dot;

/* Brand notes: plain suits, except the two signatures (off-shoulder, flounce).
   Every suit is double-lined with small removable pads held in by a second layer of fabric. */
const BASE: Product[] = [
  { id: "tidepool", name: "the tidepool one-piece", short: "tidepool", cat: "swimsuits", type: "scoop-neck one-piece", price: 2799,
    img: "31094963", pos: "80% 30%", alt: "a lagoon-blue one-piece swimsuit, worn", gallery: ["31094963", "29957708"],
    badges: [["new", "sun"]], colors: ["lagoon", "lilac", "brick", "deep"],
    blurb: "our everyday one-piece. plain, double-lined and scooped just right — with removable pads held in by a second layer of fabric, so nothing shifts when you dive in." },
  { id: "cabana", name: "the cabana square-neck", short: "cabana", cat: "swimsuits", type: "square-neck one-piece", price: 2599,
    img: "10486115", pos: "50% 30%", alt: "three friends in one-piece swimsuits laughing together on the beach", gallery: ["10486115", "8926078"],
    badges: [["bestseller", "ink"]], colors: ["sky", "coral", "turf", "jasmine"],
    blurb: "a plain square neckline and a low scoop back. small padding, adjustable straps, and nothing that digs in." },
  { id: "shallows", name: "the shallows racerback", short: "shallows", cat: "swimsuits", type: "racerback one-piece", price: 2699,
    img: "33265997", pos: "50% 40%", alt: "a group of girls in swimsuits posing on rocks by the sea", gallery: ["33265997", "40471890"],
    badges: [], colors: ["ocean", "marigold", "black"],
    blurb: "a plain high neck and a racerback that stays put for laps, cannonballs and climbing out the ladder." },
  { id: "off-shoulder", name: "the off-shoulder", short: "off-shoulder", cat: "swimsuits", sig: true, type: "signature swimsuit", price: 3199,
    img: "28681540", pos: "50% 30%", alt: "a black off-the-shoulder one-piece, worn standing in the sea", gallery: ["28681540", "28681548"],
    badges: [["signature 01", "coral"]], colors: ["black", "coral", "ocean"],
    blurb: "one of our two signature styles. a soft off-the-shoulder neckline with a hidden silicone grip, so it stays exactly where you put it." },
  { id: "flounce", name: "the flounce", short: "flounce", cat: "swimsuits", sig: true, type: "signature swimsuit", price: 3199,
    img: "4271771", pos: "50% 40%", alt: "a blue-grey one-piece with ruffled flounce straps, laid flat", gallery: ["4271771", "27330805"],
    badges: [["signature 02", "coral"]], colors: ["sky", "hibiscus", "willow"], stitch: ["basting stitch", "no stitch"],
    blurb: "our second signature: soft flounces on the straps, with a basting stitch down the middle. still deciding if it stays — pick the one you'd wear." },
  { id: "boardwalk", name: "the boardwalk short", short: "boardwalk", cat: "shorts", type: "knee-length short", price: 1499,
    img: "3998649", pos: "50% 60%", alt: "swim shorts and suits laid out flat on a wooden floor", gallery: ["3998649", "25649794"],
    badges: [["matches every suit", "sun"]], colors: [],
    blurb: "knee-length (or just above), quick-dry and made to match your suit — or keep it classic in white or black." },
  { id: "drift", name: "the drift cover-up", short: "drift", cat: "cover-ups", type: "cover-up", price: 1999,
    img: "35126783", pos: "50% 35%", alt: "a sheer yellow cover-up worn on a tropical beach", gallery: ["35126783", "36173873"],
    badges: [["new", "sun"]], colors: [],
    blurb: "a breezy kaftan that comes in a colour to match each suit. throw it on for the walk from the water to lunch." },
  { id: "white-one", name: "the white one", short: "white one", cat: "cover-ups", type: "cover-up", price: 2199,
    img: "15560782", pos: "50% 30%", alt: "a long white lace cover-up worn on a misty beach", gallery: ["15560782", "8371478"],
    badges: [["goes with everything", "ink"]], colors: ["white"],
    blurb: "the one white cover-up in the collection — lace-light and long, made to go over every single suit we make." },
  { id: "shoreline", name: "the shoreline skirt", short: "shoreline", cat: "skirts", type: "cover-up skirt", price: 1299,
    img: "7292976", pos: "50% 40%", alt: "a long plain green cover-up skirt worn at the shoreline", gallery: ["7292976", "7292977"],
    badges: [], colors: ["turf", "sand", "white", "deep"],
    blurb: "a plain wrap skirt to throw over your suit on the walk to the beach. ties at the side, folds into your tote." },
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

export const SHIP_FREE = 2999;

/* Shop map: each category is a place. `notes` define the category in a few words. */
export type PortId = "all" | "swimsuits" | "signatures" | "shorts" | "cover-ups" | "skirts";

export interface Port {
  id: PortId;
  place: string;
  label: string;
  /** the two-line mast on the photo postcard */
  line: [string, string];
  def: string;
  notes: string[];
}

export const PORTS: Port[] = [
  { id: "all", place: "solae harbour", label: "everything", line: ["made for", "the sun"],
    def: "every piece in drop 01, all in one place. pick an island on the map to narrow it down.",
    notes: ["all of drop 01", "start here"] },
  { id: "swimsuits", place: "swimsuit bay", label: "plain swimsuits", line: ["built for", "warm days"],
    def: "plain, double-lined one-pieces in solid colours. every suit has small removable pads, held in place by a second layer of fabric.",
    notes: ["double-lined", "small removable pads", "held in by a second layer"] },
  { id: "signatures", place: "signature isle", label: "signature swimsuits", line: ["built for", "warm days"],
    def: "the only two suits that aren't plain: one off the shoulder, one with flounces. same lining, same pads that stay put.",
    notes: ["off the shoulder", "flounces + basting stitch", "small removable pads"] },
  { id: "shorts", place: "shorts shore", label: "matching shorts", line: ["made to", "match"],
    def: "knee-length, or just above. get them in your suit's colour, or keep it simple in white or black.",
    notes: ["knee-length or just above", "match your suit", "or white / black"] },
  { id: "cover-ups", place: "cover-up cove", label: "cover-ups", line: ["for the", "walk home"],
    def: "a kaftan in every suit colour, plus the white one, which goes with everything.",
    notes: ["matches every suit", "plus the white one", "quick-dry"] },
  { id: "skirts", place: "skirt sandbar", label: "the skirt", line: ["for the walk", "to the beach"],
    def: "one plain cover-up skirt to wear over your suit on the walk to the beach.",
    notes: ["plain, no print", "ties at the side", "folds into your tote"] },
];

export const isPortId = (id: unknown): id is PortId => PORTS.some(x => x.id === id);
export const portOf = (p: Product): PortId => (p.sig ? "signatures" : p.cat);
export const portById = (id: PortId) => PORTS.find(x => x.id === id)!;
export const inPort = (id: PortId) => (id === "all" ? PRODUCTS : PRODUCTS.filter(p => portOf(p) === id));
