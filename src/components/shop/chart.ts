/* A wide, quiet sea chart (pin: the hand-drawn "solae" chart). The sea lane is
   the word "solae" written as one dotted line; one small island per category
   sits around the letters, and the boat sails along the writing to the island
   you pick. Hovering an island (or its ribbon) shows what lives there.
   Chart space is 1400 × 540: `at`/`r` shape each island, `sign` places its
   ribbon, `dock` is the spot on the lane where the boat ties up. */
import type { PortId } from "../../data/catalog";

export type Pt = [x: number, y: number];
export type DecoKind = "palm" | "light" | "umbrella" | "hut" | "x" | "whale" | "fish";
export type Deco = [kind: DecoKind, x: number, y: number, scale?: number];

export interface Isle {
  at: Pt;
  r: Pt;
  seed: number;
  sign: Pt;
  dock: Pt;
  deco: Deco[];
}

export const CHART: { w: number; h: number; isles: Record<PortId, Isle>; lane: Pt[]; waves: Pt[]; sea: Deco[] } = {
  w: 1400, h: 540,
  isles: {
    all:         { at: [100, 455],  r: [72, 30], seed: 9,  sign: [100, 514],  dock: [178, 410],
                   deco: [["light", 74, 462, .8], ["palm", 124, 466, .7]] },
    swimsuits:   { at: [330, 108],  r: [66, 28], seed: 4,  sign: [330, 50],   dock: [444, 206],
                   deco: [["palm", 302, 116, .68], ["umbrella", 340, 122, .75], ["palm", 372, 112, .6]] },
    signatures:  { at: [764, 100],  r: [62, 27], seed: 12, sign: [764, 44],   dock: [624, 118],
                   deco: [["palm", 736, 110, .68], ["x", 800, 104, .75]] },
    shorts:      { at: [705, 462],  r: [74, 30], seed: 21, sign: [705, 516],  dock: [736, 353],
                   deco: [["palm", 684, 472, .72], ["palm", 728, 468, .6]] },
    "cover-ups": { at: [1172, 102], r: [68, 28], seed: 15, sign: [1172, 44],  dock: [1090, 228],
                   deco: [["hut", 1155, 112, .7], ["palm", 1197, 108, .62]] },
    skirts:      { at: [1324, 410], r: [52, 17], seed: 2,  sign: [1312, 456], dock: [1232, 372],
                   deco: [["palm", 1326, 414, .55]] },
  },
  /* "solae" in one stroke, lead-in to swash; the o and the a go up their left side and back, like real cursive */
  lane: [
    [178, 410], [222, 326], [252, 254], [270, 202],
    [286, 218], [302, 268], [302, 318], [282, 348], [255, 356], [235, 346], [232, 330], [247, 326], [264, 346], [300, 362],
    [340, 352], [370, 322], [384, 284], [395, 240], [416, 214], [446, 206],
    [416, 214], [395, 240], [384, 284], [398, 334], [432, 354], [466, 336], [481, 284], [471, 230], [449, 208],
    [458, 226], [482, 233], [516, 224], [552, 206],
    [590, 172], [624, 118], [642, 74], [630, 50], [606, 64], [594, 128], [596, 250], [604, 328], [628, 354],
    [662, 350], [690, 326], [701, 288], [712, 240], [740, 208], [768, 205], [788, 214],
    [768, 205], [740, 208], [712, 240], [701, 288], [708, 334], [736, 353], [766, 338], [782, 298], [790, 250], [792, 212],
    [790, 262], [792, 330], [810, 355], [845, 346],
    [882, 318], [926, 290], [960, 262], [972, 232], [956, 208], [930, 214], [908, 262], [905, 320], [925, 352], [958, 357], [998, 334],
    [1040, 280], [1090, 228], [1140, 250], [1185, 318], [1232, 372],
  ],
  waves: [[512, 72], [1270, 214], [548, 300], [420, 420], [928, 430], [1150, 492], [210, 254], [960, 120]],
  sea: [["whale", 486, 478], ["fish", 1010, 484]],
};

/** the islands in drawing order */
export const ISLES = Object.entries(CHART.isles) as [PortId, Isle][];

export const f1 = (n: number) => Math.round(n * 10) / 10;

/* closed Catmull-Rom curve through points, as cubic Béziers */
export function smooth(pts: Pt[]) {
  const n = pts.length, P = (i: number) => pts[(i + n) % n];
  let d = `M${P(0).map(f1).join(" ")}`;
  for (let i = 0; i < n; i++) {
    const [a, b, c, e] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += `C${f1(b[0] + (c[0] - a[0]) / 6)} ${f1(b[1] + (c[1] - a[1]) / 6)} ${f1(c[0] - (e[0] - b[0]) / 6)} ${f1(c[1] - (e[1] - b[1]) / 6)} ${f1(c[0])} ${f1(c[1])}`;
  }
  return d + "Z";
}

/* open centripetal Catmull-Rom through points: no overshoot on tight turns, so the letters keep their shape */
export function stroke(pts: Pt[]) {
  const n = pts.length, ext = (a: Pt, b: Pt): Pt => [2 * a[0] - b[0], 2 * a[1] - b[1]];
  const dd = (a: Pt, b: Pt) => Math.max(1e-3, Math.hypot(b[0] - a[0], b[1] - a[1]) ** .5);
  let d = `M${pts[0].map(f1).join(" ")}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = i ? pts[i - 1] : ext(pts[0], pts[1]), p1 = pts[i], p2 = pts[i + 1], p3 = i + 2 < n ? pts[i + 2] : ext(p2, p1);
    const d1 = dd(p0, p1), d2 = dd(p1, p2), d3 = dd(p2, p3);
    const b1 = [0, 1].map(k => (d1 * d1 * p2[k] - d2 * d2 * p0[k] + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) / (3 * d1 * (d1 + d2)));
    const b2 = [0, 1].map(k => (d3 * d3 * p1[k] - d2 * d2 * p3[k] + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) / (3 * d3 * (d3 + d2)));
    d += `C${b1.map(f1).join(" ")} ${b2.map(f1).join(" ")} ${p2.map(f1).join(" ")}`;
  }
  return d;
}

/* a wobbly island outline, the same every time for a given seed */
export function blob([cx, cy]: Pt, [rx, ry]: Pt, seed: number) {
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280 * Math.PI * 2;
  const [a, b, c] = [rnd(), rnd(), rnd()];
  return smooth(Array.from({ length: 22 }, (_, i): Pt => {
    const t = i / 22 * Math.PI * 2;
    const k = 1 + .14 * Math.sin(2 * t + a) + .1 * Math.sin(3 * t + b) + .06 * Math.sin(5 * t + c) + .035 * Math.sin(8 * t + a + b);
    return [cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k];
  }));
}
