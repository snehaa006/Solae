/* ==========================================================================
   SOLAE — mock storefront behaviour
   Logos, product data, catalog filter, cart drawer, shop map, postcard product page.
   Photography: Pexels (free licence) — stand-ins until the real shoot.
   ========================================================================== */

const PX = (id, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* ---- Icons ------------------------------------------------------------ */
const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <!-- a plain sun dot for the scrolling bars and postmarks; it suits every logo option -->
  <symbol id="i-sun-solo" viewBox="0 0 40 40"><circle cx="20" cy="20" r="9" fill="currentColor"/></symbol>
  <symbol id="i-squiggle" viewBox="0 0 72 16">
    <path d="M2 8Q8 1 14 8T26 8T38 8T50 8T62 8T72 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </symbol>
  <symbol id="i-leaf" viewBox="0 0 300 300">
    <g fill="none" stroke="currentColor" stroke-linecap="round">
      <path stroke-width="7" d="M40 290Q120 170 270 40"/>
      <g stroke-width="16">
        <path d="M92 214Q60 176 30 170"/><path d="M92 214Q120 232 132 270"/>
        <path d="M128 172Q96 128 66 118"/><path d="M128 172Q160 184 178 226"/>
        <path d="M166 132Q140 88 110 72"/><path d="M166 132Q198 142 220 180"/>
        <path d="M204 94Q186 56 160 36"/><path d="M204 94Q232 98 254 130"/>
        <path d="M238 64Q228 36 214 18"/><path d="M238 64Q258 64 280 84"/>
      </g>
    </g>
  </symbol>
  <symbol id="i-boat" viewBox="0 0 40 32">
    <path fill="currentColor" d="M19 2V22H4ZM22 6Q32 12 31 22H22Z"/>
    <path fill="currentColor" d="M2 24H38L33 30H7Z"/>
  </symbol>
  <!-- gooey wide type: warps the outline, then melts the corners (.t-fluid) -->
  <filter id="f-fluid" x="-4%" y="-15%" width="108%" height="130%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".004 .009" numOctaves="1" seed="3" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="1.6" result="b"/>
    <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -6"/>
  </filter>
</svg>`;

/* ---- Data --------------------------------------------------------------- */
/* the Brand Starter's collection colours (swimsuits only), plus white and black */
const C = {
  tropical:{ name: "tropical",      dot: "#17BEBB" },
  cerulean:{ name: "cerulean",      dot: "#0E79B2" },
  sky:     { name: "blue grey",     dot: "#6699CC" },
  ocean:   { name: "ocean",         dot: "#0471A6" },
  brick:   { name: "brick",         dot: "#B40421" },
  turf:    { name: "turf",          dot: "#337155" },
  willow:  { name: "willow",        dot: "#93C186" },
  white:   { name: "white",         dot: "#FFFFFF" },
  black:   { name: "black",         dot: "#1E2626" },
};

/* Brand notes: plain suits, except the two signatures (off-shoulder, flounce).
   Every suit is double-lined with small removable pads held in by a second layer of fabric. */
const PRODUCTS = [
  { id: "tidepool", name: "the tidepool one-piece", short: "tidepool", cat: "swimsuits", type: "scoop-neck one-piece", price: 229,
    img: "31094963", pos: "80% 30%", alt: "a lagoon-blue one-piece swimsuit, worn", gallery: ["31094963", "29957708"],
    badges: [["new", "sun"]], colors: ["tropical", "cerulean", "brick", "turf"],
    blurb: "our everyday one-piece. plain, double-lined and scooped just right — with removable pads held in by a second layer of fabric, so nothing shifts when you dive in." },
  { id: "cabana", name: "the cabana square-neck", short: "cabana", cat: "swimsuits", type: "square-neck one-piece", price: 219,
    img: "10486115", pos: "50% 30%", alt: "three friends in one-piece swimsuits laughing together on the beach", gallery: ["10486115", "8926078"],
    badges: [["bestseller", "ink"]], colors: ["sky", "willow", "ocean", "brick"],
    blurb: "a plain square neckline and a low scoop back. small padding, adjustable straps, and nothing that digs in." },
  { id: "shallows", name: "the shallows racerback", short: "shallows", cat: "swimsuits", type: "racerback one-piece", price: 219,
    img: "33265997", pos: "50% 40%", alt: "a group of girls in swimsuits posing on rocks by the sea", gallery: ["33265997", "40471890"],
    badges: [], colors: ["ocean", "turf", "black"],
    blurb: "a plain high neck and a racerback that stays put for laps, cannonballs and climbing out the ladder." },
  { id: "off-shoulder", name: "the off-shoulder", short: "off-shoulder", cat: "swimsuits", sig: true, type: "signature swimsuit", price: 259,
    img: "28681540", pos: "50% 30%", alt: "a black off-the-shoulder one-piece, worn standing in the sea", gallery: ["28681540", "28681548"],
    badges: [["signature 01", "coral"]], colors: ["black", "brick", "cerulean"],
    blurb: "one of our two signature styles. a soft off-the-shoulder neckline with a hidden silicone grip, so it stays exactly where you put it." },
  { id: "flounce", name: "the flounce", short: "flounce", cat: "swimsuits", sig: true, type: "signature swimsuit", price: 259,
    img: "4271771", pos: "50% 40%", alt: "a blue-grey one-piece with ruffled flounce straps, laid flat", gallery: ["4271771", "27330805"],
    badges: [["signature 02", "coral"]], colors: ["sky", "tropical", "willow"], stitch: ["basting stitch", "no stitch"],
    blurb: "our second signature: soft flounces on the straps, with a basting stitch down the middle. still deciding if it stays — pick the one you'd wear." },
  { id: "boardwalk", name: "the boardwalk short", short: "boardwalk", cat: "shorts", type: "knee-length short", price: 99,
    img: "3998649", pos: "50% 60%", alt: "swim shorts and suits laid out flat on a wooden floor", gallery: ["3998649", "25649794"],
    badges: [["matches every suit", "sun"]], colors: [],
    blurb: "knee-length (or just above), quick-dry and made to match your suit — or keep it classic in white or black." },
  { id: "drift", name: "the drift cover-up", short: "drift", cat: "cover-ups", type: "cover-up", price: 149,
    img: "35126783", pos: "50% 35%", alt: "a sheer yellow cover-up worn on a tropical beach", gallery: ["35126783", "36173873"],
    badges: [["new", "sun"]], colors: [],
    blurb: "a breezy kaftan that comes in a colour to match each suit. throw it on for the walk from the water to lunch." },
  { id: "white-one", name: "the white one", short: "white one", cat: "cover-ups", type: "cover-up", price: 169,
    img: "15560782", pos: "50% 30%", alt: "a long white lace cover-up worn on a misty beach", gallery: ["15560782", "8371478"],
    badges: [["goes with everything", "ink"]], colors: ["white"],
    blurb: "the one white cover-up in the collection — lace-light and long, made to go over every single suit we make." },
];

const SIZES = ["xs", "s", "m", "l", "xl"];
/* prices in saudi riyals; placeholders until the real ones are set */
const SHIP_FREE = 300;
const sar = n => "SAR " + n.toLocaleString("en-US");
const byId = id => PRODUCTS.find(p => p.id === id);
const dot = k => C[k].dot;

/* matching pieces come in every suit colour; the shorts also come in white or black */
const SUIT_COLORS = [...new Set(PRODUCTS.filter(p => p.cat === "swimsuits").flatMap(p => p.colors))];
byId("boardwalk").colors = [...SUIT_COLORS.filter(k => k !== "black"), "white", "black"];
byId("drift").colors = SUIT_COLORS;

/* Shop map: each category is a place. `notes` define the category in a few words. */
const PORTS = [
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
];
const portOf = p => p.sig ? "signatures" : p.cat;
const portById = id => PORTS.find(x => x.id === id);
const inPort = id => id === "all" ? PRODUCTS : PRODUCTS.filter(p => portOf(p) === id);
const pad = n => String(n).padStart(2, "0");

const photo = (p, { w = 900, cls = "frame", id = p.img, alt = p.alt } = {}) =>
  `<div class="${cls}"><img src="${PX(id, w)}" alt="${alt}" loading="lazy" style="object-position:${p.pos}"></div>`;

const ICON = {
  plus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

const MAX_SW = 6;
function card(p, i = 0) {
  const badges = p.badges.map(([t, tone]) => `<span class="badge badge--${tone}">${t}</span>`).join("");
  const sw = p.colors.slice(0, MAX_SW).map(k => `<span class="swatch" style="--c:${dot(k)}" title="${C[k].name}"></span>`).join("")
    + (p.colors.length > MAX_SW ? `<span class="swatch-more">+${p.colors.length - MAX_SW}</span>` : "");
  return `<article class="card reveal" data-cat="${p.cat}" style="--i:${i}">
    <div class="card__media">
      ${photo(p, { cls: "frame-wavy", w: 700 })}
      <div class="card__badges">${badges}</div>
    </div>
    <h3 class="card__name"><a href="product.html?p=${p.id}">${p.name}</a></h3>
    <p class="card__price">${sar(p.price)}</p>
    <div class="swatches" aria-label="${p.colors.length} colours: ${p.colors.map(k => C[k].name).join(", ")}">${sw}</div>
    <button class="btn btn--ghost btn--sm card__add" type="button" data-add="${p.id}" aria-label="add ${p.name} to bag">${ICON.plus}add to bag</button>
  </article>`;
}

/* ---- Cart --------------------------------------------------------------- */
const CART_KEY = "solae-cart-v2";
let cart = [];
try { cart = (JSON.parse(localStorage.getItem(CART_KEY)) || []).filter(l => byId(l.id) && C[l.color]); } catch { cart = []; }
const save = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} };

function addToCart(id, color, size = "m", extra = "") {
  const p = byId(id); if (!p) return;
  color = color || p.colors[0];
  extra = extra || (p.stitch ? p.stitch[0] : "");
  const key = [id, color, size, extra].join("|");
  const line = cart.find(l => l.key === key);
  line ? line.qty++ : cart.push({ key, id, color, size, extra, qty: 1 });
  save(); renderCart(); toast(`${p.name} added to your bag`);
}

function renderCart() {
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + l.qty * byId(l.id).price, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = count; el.classList.toggle("is-on", count > 0); });
  const items = document.querySelector("[data-cart-items]");
  if (!items) return;
  const left = SHIP_FREE - total;
  document.querySelector("[data-ship-msg]").innerHTML = total === 0
    ? `spend ${sar(SHIP_FREE)} for free shipping across saudi arabia`
    : left > 0 ? `you're <b>${sar(left)}</b> away from free shipping` : `<b>you've unlocked free shipping</b> ☀`;
  document.querySelector("[data-ship-bar]").style.setProperty("--p", Math.min(100, (total / SHIP_FREE) * 100) + "%");
  document.querySelector("[data-cart-total]").textContent = sar(total);
  document.querySelector("[data-cart-foot]").hidden = count === 0;
  items.innerHTML = count === 0
    ? `<div class="drawer__empty"><p class="t-hand">nothing yet</p><p>the sun is out though.</p><a class="btn btn--ink btn--sm" href="shop.html">shop drop 01</a></div>`
    : cart.map(l => {
        const p = byId(l.id);
        return `<div class="line">
          ${photo(p, { w: 200, alt: "" })}
          <div><p class="line__name">${p.name}</p>
            <p class="line__meta">${C[l.color].name} · ${l.size.toUpperCase()}${l.extra ? " · " + l.extra : ""}</p>
            <div class="qty"><button type="button" data-qty="-1" data-key="${l.key}" aria-label="decrease">−</button><span>${l.qty}</span><button type="button" data-qty="1" data-key="${l.key}" aria-label="increase">+</button></div>
          </div>
          <b>${sar(p.price * l.qty)}</b>
        </div>`;
      }).join("");
}

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
  t.textContent = msg; t.classList.add("is-on");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("is-on"), 2200);
}

function openPanel(sel, open) {
  const panel = document.querySelector(sel);
  if (!panel) return;
  panel.classList.toggle("is-open", open);
  if (sel === ".drawer") document.querySelector(".scrim")?.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
  if (open) panel.querySelector("button, a")?.focus();
}

/* ---- Logos ------------------------------------------------------------------ */
/* The Brand Starter's three options, nothing final. The site wears one at a time,
   everywhere a logo shows: header, menu, the sun at the end of the hero, the story
   and vision cards, the product welcome card, the footer and the tab icon.
   The bar in the bottom-left corner switches between them (hide it with ×, bring it
   back with ?logos); ?logo=1, 2 or 3 in the address picks one too. This browser
   remembers the choice; everyone else sees LOGO_DEFAULT. */
const LOGO_DEFAULT = "1";
const LOGO_KEY = "solae-logo-option";
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch { return null; } };
const SUN_IMG = `<img class="logo-sun" src="assets/img/logo-sun.svg" alt="">`;
const MARK_IMG = `<img class="sun-mark" src="assets/img/logo-mark.svg" alt="">`;
/* full: the whole logo · bar: in the header and menu (option 1 turned upright, a sunrise on the header's edge)
   hero: its sun alone, cut by the window's edge · mark: small, for the vision card */
const LOGOS = {
  "1": { name: "ghalia's sun", icon: "assets/img/logo-sun.svg", full: SUN_IMG, bar: `<img class="logo-sun-up" src="assets/img/logo-sun-up.svg" alt="">`, hero: SUN_IMG, mark: SUN_IMG,
         story: `<img class="logo-sun" src="assets/img/logo-sun.svg" alt="Ghalia's drawing: a half sun with the letters s, o, l, a, e running up its edge and wavy beams">` },
  "2": { name: "minimal wordmark", icon: "assets/img/logo-soft-sun.svg", full: `<span class="logo-word">S<i></i>LAE</span>`, bar: `<span class="logo-word">S<i></i>LAE</span>`, hero: `<i class="sun-soft"></i>`, mark: `<i class="sun-soft"></i>`,
         story: `<span class="logo-word" role="img" aria-label="Solae: the name in spaced capitals with a soft sun for the O">S<i></i>LAE</span>` },
  "3": { name: "sun symbol and name", icon: "assets/img/logo-mark.svg", full: `<span class="logo-mark"><img src="assets/img/logo-mark.svg" alt=""><span>SOLAE</span></span>`, bar: `<span class="logo-mark"><img src="assets/img/logo-mark.svg" alt=""><span>SOLAE</span></span>`, hero: MARK_IMG, mark: MARK_IMG,
         story: `<span class="logo-mark" role="img" aria-label="Solae: Ghalia's sun as a symbol, with the name underneath"><img src="assets/img/logo-mark.svg" alt=""><span>SOLAE</span></span>` },
};
let logoOpt = LOGO_DEFAULT;
function setLogo(opt, remember = false) {
  logoOpt = LOGOS[opt] ? opt : LOGO_DEFAULT;
  const set = LOGOS[logoOpt];
  document.documentElement.dataset.logo = logoOpt;
  document.querySelectorAll("[data-logo-slot]").forEach(el => { el.innerHTML = set[el.dataset.logoSlot || "full"]; });
  document.querySelector('link[rel="icon"]')?.setAttribute("href", set.icon);
  document.querySelectorAll("[data-logo]").forEach(b => b.setAttribute("aria-pressed", b.dataset.logo === logoOpt));
  if (remember) store(LOGO_KEY, logoOpt);
}
const params = new URLSearchParams(location.search);
if (params.has("logos")) store(LOGO_KEY + "-bar", "on");
if (document.querySelector("[data-logo-slot]") && store(LOGO_KEY + "-bar") !== "off") {
  document.body.insertAdjacentHTML("beforeend", `<div class="logo-lab" role="group" aria-label="try a logo">
    <span>logo</span>${Object.entries(LOGOS).map(([k, l]) => `<button type="button" data-logo="${k}" aria-pressed="false" title="option ${k}: ${l.name}" aria-label="option ${k}: ${l.name}">${k}</button>`).join("")}
    <button class="logo-lab__x" type="button" data-logo-lab-off title="hide" aria-label="hide the logo bar">×</button>
  </div>`);
}
LOGOS[params.get("logo")] ? setLogo(params.get("logo"), true) : setLogo(store(LOGO_KEY));

/* ---- Page wiring -------------------------------------------------------- */
document.body.insertAdjacentHTML("afterbegin", SPRITE);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px" });
const reveal = root => root.querySelectorAll(".reveal").forEach(el => io.observe(el));

document.querySelectorAll("[data-products]").forEach(el => {
  const ids = el.dataset.products ? el.dataset.products.split(",") : PRODUCTS.map(p => p.id);
  el.innerHTML = ids.map((id, i) => card(byId(id), i)).join("");
});

/* Catalog map filter */
document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
  const on = btn.getAttribute("aria-pressed") !== "true";
  document.querySelectorAll("[data-filter]").forEach(b => b.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", on);
  document.querySelectorAll("#catalog .card").forEach(c => { c.hidden = on && c.dataset.cat !== btn.dataset.filter; });
}));

document.addEventListener("click", e => {
  const t = e.target.closest("button, a");
  if (!t) return;
  if (t.dataset.add) addToCart(t.dataset.add);
  if (t.dataset.qty) {
    const l = cart.find(x => x.key === t.dataset.key);
    l.qty += +t.dataset.qty; if (l.qty <= 0) cart = cart.filter(x => x !== l);
    save(); renderCart();
  }
  if (t.matches("[data-open-cart]")) { e.preventDefault(); openPanel(".drawer", true); }
  if (t.matches("[data-close-cart]")) openPanel(".drawer", false);
  if (t.matches("[data-open-menu]")) openPanel(".mobile-nav", true);
  if (t.matches("[data-close-menu]")) openPanel(".mobile-nav", false);
  if (t.matches(".checkout")) toast("this is a mock store — checkout comes next ☀");
  if (t.dataset.logo) setLogo(t.dataset.logo, true);
  if (t.matches("[data-logo-lab-off]")) { t.parentElement.hidden = true; store(LOGO_KEY + "-bar", "off"); }
});
document.querySelector(".scrim")?.addEventListener("click", () => openPanel(".drawer", false));
document.addEventListener("keydown", e => { if (e.key === "Escape") { openPanel(".drawer", false); openPanel(".mobile-nav", false); } });

/* Generic tabs (design system) */
document.querySelectorAll("[role=tablist]").forEach(list => {
  const tabs = [...list.querySelectorAll("[role=tab]")];
  tabs.forEach(t => t.addEventListener("click", () => tabs.forEach(x => x.setAttribute("aria-selected", x === t))));
});

const header = document.querySelector(".header");
addEventListener("scroll", () => header?.classList.toggle("is-scrolled", scrollY > 8), { passive: true });
reveal(document);

document.querySelectorAll("[data-news]").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); f.reset(); toast("you're on the list — see you on the shore"); }));

renderCart();

/* ---- Shop map ------------------------------------------------------------- */
/* A wide strip of sea across the page (pin: the hand-drawn "solae" chart). The
   sea lane is "Solae" written as one dotted line in flowing calligraphy, traced
   from the Great Vibes script; the islands (one per category) sit in the open
   water inside and around its loops, and the boat sails along the writing.
   Hovering an island (or its ribbon) shows what lives there.
   Chart space is 1400 × 440: `at`/`r` shape each island, `sign` places its
   ribbon, `dock` is the spot on the lane where the boat ties up. */
const CHART = {
  w: 1400, h: 440,
  isles: {
    all:         { at: [365, 285],  r: [62, 23], seed: 9,  sign: [365, 232],  dock: [178, 300],
                   deco: [["light", 338, 292, .66], ["palm", 386, 296, .58]] },
    swimsuits:   { at: [805, 108],  r: [58, 21], seed: 4,  sign: [805, 58],   dock: [650, 168],
                   deco: [["palm", 778, 115, .54], ["umbrella", 810, 120, .62], ["palm", 836, 113, .48]] },
    signatures:  { at: [1110, 104], r: [56, 21], seed: 12, sign: [1110, 54],  dock: [958, 114],
                   deco: [["palm", 1088, 112, .54], ["x", 1140, 108, .62]] },
    shorts:      { at: [1318, 128], r: [52, 22], seed: 21, sign: [1318, 78],  dock: [1212, 208],
                   deco: [["palm", 1301, 136, .56], ["palm", 1333, 132, .48]] },
    "cover-ups": { at: [900, 405],  r: [56, 18], seed: 15, sign: [900, 366],  dock: [955, 327],
                   deco: [["hut", 886, 413, .55], ["palm", 918, 410, .48]] },
  },
  /* "Solae" in one stroke: the S from its tail to the hook, a curl down into the o, then "olae";
     the o and the a are gone round once and their joins retraced, like real handwriting */
  lane: [
    [245.4, 170.8], [225.5, 180.2], [211.2, 189.7], [201.5, 198.1], [186.1, 214.9], [173.4, 235.9], [166.2, 256.2], [164.7, 264.6], [164.7, 275.8], [167, 289.8],
    [169.9, 297.5], [175.8, 308.7], [180.8, 315], [194.2, 326.9], [214.1, 338.8], [227.4, 344.6], [243.6, 349.9], [266.4, 355.2], [313.9, 360.5], [349, 360.5],
    [401.2, 354.5], [434.5, 347.2], [465.8, 336.9], [483.9, 328.8], [509.5, 314.3], [533.8, 295.4], [548.8, 277.9], [554.3, 268.8], [557.5, 261.1], [561.4, 240.8],
    [557, 226.1], [550.3, 215.6], [540.9, 206.5], [526.6, 197.1], [504.8, 186.7], [410.8, 154.3], [390.8, 145.2], [375.7, 135.8], [365.4, 124.6], [362, 117.6],
    [360.5, 110.6], [363.8, 96.6], [367.6, 87.5], [371.8, 81.9], [379.9, 74.2], [391.8, 66.3], [409.8, 57.2], [429.8, 50.6], [464.9, 43.1], [491.5, 39.9],
    [524.8, 39.2], [550.4, 41.7], [564.6, 44.8], [576, 48.8], [591.2, 56.8], [600.3, 65.8], [604.4, 72.8], [605.5, 77], [605.5, 81.9], [602.6, 92.4],
    [594.1, 102.2], [587.5, 106.5], [579.8, 109.6], [558, 114.8], [529.5, 133], [533.3, 147], [556.1, 154], [612.9, 158.2], [678.2, 172.2], [735.6, 194.6],
    [770.8, 218.4], [778.4, 242.2], [770.8, 270.2], [767, 288.4], [755.1, 301.7], [743.2, 312.2], [732.8, 318.8], [721.4, 324.3], [712.9, 326.5], [696.7, 327.6],
    [689.1, 325.7], [683.8, 322.7], [680, 318.5], [676.2, 310.8], [672.9, 294.7], [673.5, 291.2], [678.9, 273.7], [687.3, 258.3], [695.9, 246.4], [704.7, 236.6],
    [717.6, 225.4], [729, 218.1], [739.4, 213.3], [751.8, 210.3], [764.1, 211.2], [771.8, 213], [778, 217], [782.9, 224], [786, 233.8], [786, 244.3],
    [783.3, 254.8], [771.1, 261.5], [769.2, 263.9], [767.9, 285.6], [769.3, 288.3], [783.1, 293.7], [797.4, 294], [811.6, 290.7], [823, 284.1], [828.8, 282.2],
    [838.7, 281.7], [855.5, 248.6], [858.5, 238.7], [865, 226.1], [892.1, 179.9], [912.1, 150.5], [924.7, 134.4], [935.8, 123.2], [949.4, 113.6], [957, 111.4],
    [965.5, 113.2], [969.5, 116.9], [970.3, 121.8], [967.9, 133.7], [956.3, 155.4], [940.2, 179.2], [912.1, 214.2], [884, 240.8], [869.6, 251.9], [862, 253.3],
    [854.7, 251.9], [850.9, 256.2], [838, 284.9], [836.4, 298.9], [836.4, 305.9], [838.5, 313.6], [843, 321.3], [847.8, 325.1], [858.2, 328.6], [869.6, 328.3],
    [879.1, 326.9], [893.3, 320.9], [908.8, 309.4], [923.1, 294.8], [939.8, 289], [950.1, 271.6], [959.8, 258.3], [970.8, 246.4], [985.5, 233.1], [1004.5, 220.1],
    [1015.9, 214.2], [1029.2, 209.4], [1039.7, 207], [1048.2, 206.5], [1061.5, 207.7], [1071.9, 210.9], [1079.4, 216.3], [1082.5, 223.3], [1090.1, 231], [1090.4, 233.5],
    [1073.8, 238.2], [1066.9, 242.2], [1060.5, 248.5], [1051.3, 260.4], [1037.3, 282.8], [1019.2, 286.5], [1004.8, 301.7], [986.4, 317.1], [970.3, 324.7], [957, 326.9],
    [951.3, 326.2], [943.6, 321.3], [940.2, 314.3], [938, 303.8], [938.9, 292.1], [938, 303.8], [939.8, 312.9], [942.6, 319.9], [948.4, 325.1], [957, 326.9],
    [970.3, 324.7], [983.6, 318.9], [1001, 305.2], [1019.2, 286.5], [1025.7, 285.3], [1035.4, 287], [1032.7, 310.1], [1034.6, 318.5], [1039, 324.1], [1043.4, 326.8],
    [1049.2, 327.6], [1058.7, 326.5], [1067.2, 323.9], [1082.8, 312.9], [1102.8, 290.7], [1111.8, 286.9], [1121.3, 285.5], [1126.9, 273], [1133, 265.8], [1136.3, 258.3],
    [1148.6, 243.6], [1162.2, 231], [1182.1, 216.6], [1191.6, 211.6], [1204, 207.1], [1219.2, 207], [1224.9, 208.9], [1228.2, 212.1], [1230.2, 218.4], [1230.1, 221.9],
    [1227.8, 228.9], [1222.3, 237.3], [1214.7, 245.7], [1206.8, 252], [1192.6, 260.2], [1181.2, 264.8], [1159.3, 270.5], [1145.1, 272.3], [1140.3, 271.7], [1133.2, 267.5],
    [1131, 267.8], [1126.9, 273], [1120.4, 289.1], [1120.4, 298.2], [1122, 305.9], [1123.9, 312.2], [1127.3, 317.8], [1132.9, 323.4], [1140.3, 327.4], [1155.5, 329.6],
    [1168.8, 328.7], [1189.8, 322.6], [1207.8, 311.5], [1223.8, 296.1], [1232.9, 284.9], [1244.2, 268.1], [1245.8, 263.9],
  ],
  waves: [[110, 390], [560, 412], [640, 60], [1010, 40], [1150, 420], [1240, 60]],
  sea: [["whale", 640, 400, .8], ["fish", 1180, 392, .85], ["fish", 1318, 300, .8]],
};
const { w: CW, h: CH } = CHART;

const f1 = n => Math.round(n * 10) / 10;
/* closed Catmull-Rom curve through points, as cubic Béziers */
function smooth(pts) {
  const n = pts.length, P = i => pts[(i + n) % n];
  let d = `M${P(0).map(f1).join(" ")}`;
  for (let i = 0; i < n; i++) {
    const [a, b, c, e] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += `C${f1(b[0] + (c[0] - a[0]) / 6)} ${f1(b[1] + (c[1] - a[1]) / 6)} ${f1(c[0] - (e[0] - b[0]) / 6)} ${f1(c[1] - (e[1] - b[1]) / 6)} ${f1(c[0])} ${f1(c[1])}`;
  }
  return d + "Z";
}
/* open centripetal Catmull-Rom through points: no overshoot on tight turns, so the letters keep their shape */
function stroke(pts) {
  const n = pts.length, ext = (a, b) => [2 * a[0] - b[0], 2 * a[1] - b[1]];
  const dd = (a, b) => Math.max(1e-3, Math.hypot(b[0] - a[0], b[1] - a[1]) ** .5);
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
function blob([cx, cy], [rx, ry], seed) {
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280 * Math.PI * 2;
  const [a, b, c] = [rnd(), rnd(), rnd()];
  return smooth(Array.from({ length: 22 }, (_, i) => {
    const t = i / 22 * Math.PI * 2;
    const k = 1 + .14 * Math.sin(2 * t + a) + .1 * Math.sin(3 * t + b) + .06 * Math.sin(5 * t + c) + .035 * Math.sin(8 * t + a + b);
    return [cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k];
  }));
}

const DECO = {
  palm: `<path class="m-trunk" d="M0 0C-2-12 1-24 6-34"/>
    <path class="m-frond" d="M6-34C-2-43-15-41-21-32C-11-37-3-36 6-34ZM6-34C14-45 27-43 31-33C21-38 13-37 6-34ZM6-34C2-47 9-55 17-55C11-49 8-42 6-34ZM6-34C-5-36-13-28-13-19C-7-28 0-32 6-34ZM6-34C17-36 25-28 25-19C19-28 12-32 6-34Z"/>
    <circle class="m-nut" cx="4" cy="-31" r="2.2"/><circle class="m-nut" cx="9" cy="-32" r="2.2"/>`,
  light: `<path class="m-tower" d="M-9 0L-6-42H6L9 0Z"/><path class="m-band" d="M-8.3-10H8.3L7.7-19H-7.7ZM-7.1-28H7.1L6.6-35H-6.6Z"/>
    <rect class="m-lamp" x="-6" y="-50" width="12" height="8"/><path class="m-band" d="M-8-50L0-59L8-50Z"/>`,
  umbrella: `<path class="m-line" d="M0 0V-26"/><path class="m-canopy" d="M-20-24Q0-44 20-24Z"/><path class="m-canopy-stripe" d="M-7-24Q-4-38 0-39Q-1-31 -2-24ZM7-24Q4-38 0-39Q1-31 2-24Z"/>`,
  hut: `<path class="m-hut" d="M-15 0V-17H15V0Z"/><path class="m-door" d="M-4 0V-10H4V0Z"/><path class="m-roof" d="M-20-16L0-32L20-16Z"/><path class="m-line" d="M-12-18L0-28M-4-17L6-26M4-17L12-23"/>`,
  x: `<path class="m-trail" d="M-50 8C-40 18-24 2-12 7"/><path class="m-x" d="M-6-6L6 6M6-6L-6 6"/>`,
  whale: `<path class="m-whale" d="M0 0C-1-7 0-13 3-17C-3-19-9-23-11-29C-5-27 0-25 4-21C8-25 14-27 20-29C18-23 12-19 6-17C9-13 10-7 8 0Z"/><path class="m-wave" d="M-16 2q5-5 10 0t10 0 10 0 10 0"/>`,
  fish: `<path class="m-fish" d="M0 0C6-7 17-7 24 0C17 7 6 7 0 0ZM1 0L-8-6V6Z"/><circle class="m-eye" cx="18" cy="-1" r="1.4"/>`,
};
const deco = ([k, x, y, s = 1]) => `<g class="m-${k}" transform="translate(${x} ${y}) scale(${s})">${DECO[k]}</g>`;

/* the boat — bow to the right, waterline at 0. Striped sails, a wooden hull, and
   a curling stern wave + bow spray that only show while it's sailing */
const SHIP = `<g class="ship__curl">
    <path class="curl__body" d="M-132 6C-112 4-98-2-88-14C-80-24-74-36-62-40C-50-44-40-38-38-30C-44-35-52-34-55-28C-58-22-54-15-47-15C-44-8-40 0-34 6Z"/>
    <path class="curl__face" d="M-84 6C-78-4-74-14-68-22C-66-12-60-6-50-4C-46 0-42 4-38 6Z"/>
    <path class="curl__line" d="M-118 2C-104 0-96-6-90-14M-74-12C-70-4-62 0-54 0"/>
    <path class="curl__foam" d="M-62-40C-50-44-40-38-38-30C-41-33-44-33-46-31C-47-35-51-37-55-36C-56-39-59-40-62-40Z"/>
  </g>
  <path class="ship__mast" d="M-6-18V-90M24-18V-70"/>
  <path class="ship__rig" d="M-6-90L-44-24M-6-90L44-22M24-70L62-28"/>
  <path class="ship__jib" d="M25-66L62-28L30-26Z"/>
  <path class="ship__sail" d="M-28-64Q-6-68 16-64Q20-45 18-26Q-6-20-30-26Q-32-45-28-64Z"/>
  <path class="ship__sail" d="M-22-86Q-6-89 10-86Q13-77 12-68Q-6-65-24-68Q-25-77-22-86Z"/>
  <path class="ship__sail" d="M10-62Q24-65 38-62Q41-46 39-30Q24-25 9-30Q7-46 10-62Z"/>
  <path class="ship__flag" d="M-6-92C-14-95-22-89-32-92L-26-86L-32-81C-22-79-14-85-6-82Z"/>
  <path class="ship__hull" d="M-50-28H-30V-20H46L62-28C58-10 48 2 34 6H-34C-45 1-50-12-50-28Z"/>
  <path class="ship__deck" d="M-50-28H-30V-20H-50Z"/>
  <path class="ship__band" d="M-49-12H54"/>
  <path class="ship__plank" d="M-46-4H48M-40 2H40"/>
  <rect class="ship__win" x="-46" y="-26" width="6" height="5" rx="1"/><rect class="ship__win" x="-37" y="-26" width="6" height="5" rx="1"/>
  ${[-24, -8, 8, 24].map(x => `<circle class="ship__port" cx="${x}" cy="-16" r="2"/>`).join("")}
  <g clip-path="url(#ship-water)"><path class="ship__water" d="M-90 8${"q6-5 12 0t12 0".repeat(8)}"/></g>
  <g class="ship__spray"><path d="M64-14q8-8 14-2"/><path d="M66-6q10-4 16 2"/><path d="M62 0q8 0 12 6"/></g>`;

function chartSVG() {
  const isles = Object.entries(CHART.isles);
  return `<svg class="chart__svg" viewBox="0 0 ${CW} ${CH}" aria-hidden="true">
    <defs>
      ${isles.map(([id, o]) => `<path id="isle-${id}" d="${blob(o.at, o.r, o.seed)}"/>`).join("")}
      <pattern id="sail-stripe" width="11" height="10" patternUnits="userSpaceOnUse"><rect class="ship__stripe-a" width="11" height="10"/><rect class="ship__stripe-b" width="5.5" height="10"/></pattern>
      <clipPath id="ship-water"><rect x="-66" y="0" width="134" height="14"/></clipPath>
    </defs>
    <g class="compass" transform="translate(72 82) scale(.7)">
      <circle r="38" class="compass__ring"/><circle r="27" class="compass__ring compass__ring--dash"/>
      <path class="compass__star" d="M0-34L5-5L34 0L5 5L0 34L-5 5L-34 0L-5-5Z"/><path class="compass__north" d="M0-34L5-5L0 0L-5-5Z"/>
      <text y="-46" class="compass__n">N</text>
    </g>
    ${CHART.waves.map(([x, y]) => `<path class="m-wave" d="M${x} ${y}q6-6 12 0t12 0 12 0"/>`).join("")}
    ${CHART.sea.map(deco).join("")}
    ${isles.map(([id, o]) => `<g class="isle" data-port="${id}">
      <use href="#isle-${id}" class="isle__line" style="stroke-width:38"/>
      <use href="#isle-${id}" class="isle__gap" style="stroke-width:35"/>
      <use href="#isle-${id}" class="isle__shoal" style="stroke-width:20"/>
      <use href="#isle-${id}" class="isle__land"/>
      ${o.deco.map(deco).join("")}
    </g>`).join("")}
    <path class="chart__lane" d="${stroke(CHART.lane)}"/>
    <path class="chart__trail" d="M0 0"/>
    ${isles.map(([id]) => `<circle class="dock" data-dock="${id}" r="5"/>`).join("")}
    <g class="wake"></g>
    <g class="ship"><g class="ship__tilt"><g class="ship__face"><g class="ship__bob" transform="scale(.8)">${SHIP}</g></g></g></g>
  </svg>`;
}

const pc = (v, of) => f1(v / of * 100);
const pieces = n => `${n} ${n === 1 ? "piece" : "pieces"}`;
/* the ribbon on each island: just the place name; the hover card says the rest */
const sign = port => {
  const [x, y] = CHART.isles[port.id].sign;
  return `<button class="port" type="button" data-port="${port.id}" aria-pressed="false" style="left:${pc(x, CW)}%;top:${pc(y, CH)}%">
    ${port.place}<span class="sr-only">: ${port.label}, ${pieces(inPort(port.id).length)}</span></button>`;
};
const isleCard = port => {
  const items = inPort(port.id);
  return `<p class="isle-card__k">${port.label} · ${pieces(items.length)}</p>
    <p class="isle-card__notes">${port.notes.join(" · ")}</p>
    <div class="isle-card__foot">
      <span class="isle-card__thumbs">${items.slice(0, 4).map(p => `<img src="${PX(p.img, 120)}" alt="" style="object-position:${p.pos}">`).join("")}</span>
      <span>from ${sar(Math.min(...items.map(p => p.price)))}</span>
    </div>`;
};

const shop = document.querySelector("[data-shop]");
if (shop) {
  const chart = shop.querySelector("[data-chart]"), panel = shop.querySelector("[data-panel]"), status = shop.querySelector("[data-status]");
  chart.insertAdjacentHTML("afterbegin", chartSVG() + PORTS.map(sign).join("") + `<div class="isle-card" aria-hidden="true"></div>`);
  const scroller = shop.querySelector(".chart-scroll"), tip = chart.querySelector(".isle-card");
  const lane = chart.querySelector(".chart__lane"), trail = chart.querySelector(".chart__trail"), wake = chart.querySelector(".wake");
  const ship = chart.querySelector(".ship"), tiltEl = chart.querySelector(".ship__tilt");

  /* sample the lane once; the boat moves by index along this table */
  const STEP = 4, total = lane.getTotalLength(), N = Math.round(total / STEP);
  const lut = Array.from({ length: N + 1 }, (_, i) => { const q = lane.getPointAtLength(i / N * total); return [q.x, q.y]; });
  const pt = f => {
    f = Math.max(0, Math.min(N, f));
    const i = Math.min(N - 1, Math.floor(f)), k = f - i;
    return [lut[i][0] + (lut[i + 1][0] - lut[i][0]) * k, lut[i][1] + (lut[i + 1][1] - lut[i][1]) * k];
  };
  const nearest = ([x, y]) => lut.reduce((b, q, i) => (q[0] - x) ** 2 + (q[1] - y) ** 2 < (lut[b][0] - x) ** 2 + (lut[b][1] - y) ** 2 ? i : b, 0);
  const docks = Object.fromEntries(Object.entries(CHART.isles).map(([id, o]) => [id, nearest(o.dock)]));
  chart.querySelectorAll(".dock").forEach(c => { const [x, y] = lut[docks[c.dataset.dock]]; c.setAttribute("cx", f1(x)); c.setAttribute("cy", f1(y)); });

  let at = docks.all, tilt = 0, raf = 0, here = null, follow = 0;
  /* place the boat; it turns to face where it's heading and leans into climbs, levelling out as it docks */
  const draw = (f, dir, level = 0) => {
    const [x, y] = pt(f), [x2, y2] = pt(f + dir * 3);
    if (Math.abs(x2 - x) > .4) ship.classList.toggle("is-west", x2 < x);
    const lean = Math.max(-20, Math.min(20, Math.atan2(y2 - y, Math.abs(x2 - x) || 1) * 57.3)) * level;
    tilt = level ? tilt + (lean - tilt) * .25 : 0;
    ship.setAttribute("transform", `translate(${f1(x)} ${f1(y)})`);
    tiltEl.setAttribute("transform", `rotate(${f1(ship.classList.contains("is-west") ? -tilt : tilt)})`);
  };

  /* foam: little wave marks peel off both sides of the stern and drift apart */
  const foam = (f, dir) => {
    if (wake.childElementCount > 70) return;
    const [x, y] = pt(f - dir * 11), [x2, y2] = pt(f - dir * 8);
    const a = f1(Math.atan2(y2 - y, x2 - x) * 57.3);
    wake.insertAdjacentHTML("beforeend", ["l", "r"].map(s => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${a})"><path class="foam foam--${s}" d="M-6 0q3-3.5 6 0t6 0"/></g>`).join(""));
  };
  const ripple = f => {
    const [x, y] = pt(f);
    wake.insertAdjacentHTML("beforeend", [0, 1].map(i => `<g transform="translate(${f1(x)} ${f1(y + 4)})"><ellipse class="ripple" rx="46" ry="11" style="animation-delay:${i * .22}s"/></g>`).join(""));
  };
  wake.addEventListener("animationend", e => e.target.parentNode.remove());

  function sail(id) {
    const from = at, to = docks[id], dir = to >= from ? 1 : -1, steps = Math.abs(to - from);
    const dur = reduceMotion.matches || !steps ? 0 : Math.min(2600, 550 + steps * STEP * .5);
    cancelAnimationFrame(raf);
    chart.classList.toggle("is-sailing", dur > 0);
    const t0 = performance.now();
    let spawned = from;
    const tick = now => {
      const k = dur ? Math.min(1, (now - t0) / dur) : 1, e = k < .5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2;
      at = from + dir * steps * e;
      draw(at, dir, Math.min(1, k / .1, (1 - k) / .18));
      if (dur && Math.abs(at - spawned) * STEP > 18) { foam(at, dir); spawned = at; }
      let d = "";
      for (let s = 0; s <= steps * e; s += 2) d += (s ? "L" : "M") + pt(from + dir * s).map(f1).join(" ");
      trail.setAttribute("d", d + "L" + pt(at).map(f1).join(" "));
      if (k < 1) raf = requestAnimationFrame(tick);
      else { at = to; chart.classList.remove("is-sailing"); if (dur) ripple(at); }
    };
    raf = requestAnimationFrame(tick);
    return dur;
  }

  /* hover card: what's on the island, without leaving the map */
  let tipFor = null, tipOff = 0;
  const showTip = id => {
    clearTimeout(tipOff);
    chart.querySelectorAll(".isle").forEach(g => g.classList.toggle("is-hover", g.dataset.port === id));
    if (tipFor === id) return;
    tipFor = id;
    const o = CHART.isles[id], s = chart.clientWidth / CW, below = o.at[1] < CH / 2;
    tip.innerHTML = isleCard(portById(id));
    tip.dataset.side = below ? "below" : "above";
    const x = o.at[0] * s, half = tip.offsetWidth / 2 + 8, left = Math.max(half, Math.min(chart.clientWidth - half, x));
    tip.style.left = left + "px";
    tip.style.top = (o.at[1] + (below ? 1 : -1) * (o.r[1] + 24)) * s + "px";
    tip.style.setProperty("--ax", f1(x - left) + "px");
    tip.classList.add("is-on");
  };
  const hideTip = () => {
    tipOff = setTimeout(() => {
      tipFor = null;
      tip.classList.remove("is-on");
      chart.querySelectorAll(".isle.is-hover").forEach(g => g.classList.remove("is-hover"));
    }, 80);
  };
  const hoverable = matchMedia("(hover: hover)");
  chart.addEventListener("pointerover", e => { const t = e.target.closest("[data-port]"); if (t && hoverable.matches) showTip(t.dataset.port); });
  chart.addEventListener("pointerout", e => { const t = e.target.closest("[data-port]"); if (t && !t.contains(e.relatedTarget)) hideTip(); });
  chart.addEventListener("focusin", e => { const t = e.target.closest(".port"); if (t && t.matches(":focus-visible")) showTip(t.dataset.port); });
  chart.addEventListener("focusout", hideTip);

  function renderPanel(id) {
    const port = portById(id), n = PORTS.indexOf(port), next = PORTS[n % (PORTS.length - 1) + 1];
    panel.innerHTML = `
      <header class="port-head">
        <h2 class="t-label"><span class="sr-only">${port.place}: </span>${port.label} · ${pieces(inPort(id).length)}</h2>
        <p class="port-head__about">${port.def}</p>
      </header>
      <div class="grid-products">${inPort(id).map(card).join("")}</div>
      <div class="port-next">
        <p class="t-hand" aria-hidden="true">next stop</p>
        <button class="btn btn--ink" type="button" data-port="${next.id}"><svg class="port-next__boat" aria-hidden="true"><use href="#i-boat"/></svg>sail to ${next.place}</button>
      </div>`;
    reveal(panel);
  }

  function go(id, { from = "panel", quiet = false } = {}) {
    if (!portById(id)) id = "all";
    if (id === here) return;
    here = id;
    chart.querySelectorAll(".port").forEach(b => b.setAttribute("aria-pressed", b.dataset.port === id));
    chart.querySelectorAll(".isle").forEach(g => g.classList.toggle("is-here", g.dataset.port === id));
    chart.querySelectorAll(".dock").forEach(c => c.classList.toggle("is-here", c.dataset.dock === id));
    if (scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollTo({ left: CHART.isles[id].dock[0] / CW * scroller.scrollWidth - scroller.clientWidth / 2, behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
    const dur = sail(id);
    renderPanel(id);
    status.textContent = `sailed to ${portById(id).place}: ${inPort(id).length} ${portById(id).label}`;
    history.replaceState(null, "", id === "all" ? location.pathname + location.search : "#" + id);
    /* once the boat lands, bring the products into view if they're below the fold */
    clearTimeout(follow);
    if (!quiet) follow = setTimeout(() => {
      const top = panel.getBoundingClientRect().top;
      if (from === "map" ? top > innerHeight * .78 : top < 0 || top > innerHeight) panel.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
    }, from === "map" ? dur + 120 : 0);
  }

  shop.addEventListener("click", e => {
    const t = e.target.closest("[data-port]");
    if (t) go(t.dataset.port, { from: t.closest(".chart") ? "map" : "panel" });
  });
  addEventListener("hashchange", () => go(location.hash.slice(1)));

  /* start in the harbour; a deep link (shop.html#shorts) sails straight there */
  const start = location.hash.slice(1);
  draw(at, 1);
  go("all", { quiet: true });
  if (portById(start) && start !== "all") setTimeout(() => go(start, { from: "map" }), 450);
}

/* ---- Product page: postcards ----------------------------------------------- */
const pdp = document.querySelector("[data-pdp]");
if (pdp) {
  const p = byId(new URLSearchParams(location.search).get("p")) || PRODUCTS[0];
  const port = portById(portOf(p)), n = PRODUCTS.indexOf(p) + 1;
  const isSuit = p.cat === "swimsuits";
  let color = p.colors[0], size = "m", stitch = p.stitch?.[0] || "";
  const setRows = isSuit ? [byId("boardwalk"), byId("drift")] : [];
  const setState = { boardwalk: { on: false, opt: "matching" }, drift: { on: false, opt: "matching" } };
  // "match my suit" uses the suit's colour when the set piece comes in it
  const setColor = (r, opt) => opt !== "matching" ? opt : r.colors.includes(color) ? color : r.colors[0];
  const optsFor = r => r.id === "boardwalk" ? ["matching", "white", "black"] : ["matching"];
  document.title = `${p.name} — SOLAE`;
  document.querySelector("[data-crumb]") && (document.querySelector("[data-crumb]").textContent = p.name);
  const crumbPort = document.querySelector("[data-crumb-port]");
  if (crumbPort) { crumbPort.textContent = port.place; crumbPort.href = `shop.html#${port.id}`; }

  /* the postcards — each one follows its pin's layout piece for piece:
     1 lemon stripe short (stamp), 2 built for warm days (photo), 3 a postcard from summer (letter), 4 caprini (welcome) */
  const shots = p.gallery, alt = i => i ? `another look at ${p.name}` : p.alt;
  const img = (id, i, w = 1100) => `<img src="${PX(id, w)}" alt="${alt(i)}" loading="${i ? "lazy" : "eager"}" style="object-position:${p.pos}">`;
  const look = isSuit ? byId("boardwalk") : byId("tidepool");
  // the note on the photo card holds a sentence or two of the blurb
  const note = p.blurb.split(/(?<=\.) /).reduce((t, x) => t.length < 70 ? (t ? t + " " : "") + x : t, "");
  const waves = (n, w) => `<svg class="post__waves" viewBox="0 0 ${w} ${n * 12}" preserveAspectRatio="none" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<path d="M0 ${6 + i * 12}${Array.from({ length: w / 20 }, () => "q5-5 10 0t10 0").join("")}"/>`).join("")}</svg>`;
  const plane = '<svg class="post__plane" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15.5v-2l-8-5V3.6a1.5 1.5 0 0 0-3 0v4.9l-8 5v2l8-2.5v5.4L8 19.6V21l3.5-1 3.5 1v-1.4L13 18.4V13z"/></svg>';
  const sparkle = '<path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/>';
  const slides = [
    `<article class="post post--stamp">
      <div class="post__perf"><div class="post__panel"></div></div>
      <i class="post__specks" aria-hidden="true"></i>
      <svg class="post__ring" viewBox="0 0 200 56" preserveAspectRatio="none" aria-hidden="true"><path d="M30 50C8 46 2 30 14 18S70 2 116 3s80 8 80 24-40 26-96 27c-30 .5-60-2-74-8"/></svg>
      <span class="post__num">#${pad(n)}</span>
      <span class="post__handle">@solae.swim</span>
      <p class="post__title" style="--len:${p.name.length}">${p.name}</p>
      <div class="post__shot">${img(shots[0], 0)}</div>
      <p class="post__meta">${p.name}<b>${sar(p.price)}</b></p>
      <p class="post__date">drop 01 · live now<br>ships across saudi arabia</p>
      <svg class="post__clip" viewBox="0 0 100 80" aria-hidden="true"><defs><linearGradient id="clip-metal" x1="0" y1="0" x2="1" y2="1"><stop class="post__clip-hi" offset="0"/><stop class="post__clip-mid" offset=".55"/><stop class="post__clip-lo" offset="1"/></linearGradient></defs><path class="post__clip-wire" d="M30 38 20 9a5 5 0 0 1 9-3l14 32M70 38 80 9a5 5 0 0 0-9-3L57 38"/><path class="post__clip-body" d="M24 34h52l10 36H14z"/><path class="post__clip-fold" d="M24 34h52l2 7H22z"/><path class="post__clip-shine" d="M22 48h56"/></svg>
    </article>`,
    `<article class="post post--photo">
      ${img(shots[1] || shots[0], 1)}
      <p class="post__label">solae · drop 01<br>${port.place}</p>
      <p class="post__head" style="--len:${port.line[1].length}"><span>${port.line[0]}</span>${port.line[1]}</p>
      <div class="post__note"><p>${note}</p></div>
      <svg class="post__shell" viewBox="0 0 100 92" aria-hidden="true"><path class="post__shell-ears" d="M36 72 26 88h48L64 72z"/><path class="post__shell-fan" d="M50 4C24 4 4 26 8 52c2 10 18 22 42 24 24-2 40-14 42-24C96 26 76 4 50 4z"/><path class="post__shell-ribs" d="M50 76V8M50 76 34 10M50 76 66 10M50 76 20 20M50 76 80 20M50 76 11 36M50 76 89 36"/></svg>
    </article>`,
    `<article class="post post--letter">
      <div class="post__card"><div class="post__perf"><div class="post__paper"></div></div>
        <div class="post__waves-a">${waves(6, 240)}</div>
        <p class="post__pm post__pm--a"><b>jeddah</b><span>saudi arabia</span><span>04.05.26</span></p>
        <p class="post__pm post__pm--b"><b>umluj</b><span>tabuk</span><span>18.06.26</span></p>
        <svg class="post__pm post__pm--c" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="57"/><circle cx="60" cy="60" r="51"/>
          <path id="pm-arc-c" d="M18 62a42 42 0 0 1 84 0" fill="none" stroke="none"/><text class="post__pm-arc"><textPath href="#pm-arc-c" startOffset="50%" text-anchor="middle">YANBU</textPath></text>
          <path class="post__pm-icon" d="M55 74 57 52h6l2 22zM56 52h8v-4h-8zM58 48l2-5 2 5M54 74h12"/>
          <text x="60" y="88" text-anchor="middle" class="post__pm-sm">MADINAH</text><text x="60" y="99" text-anchor="middle" class="post__pm-sm">02.07.26</text></svg>
        <p class="post__from">a postcard<br>from summer</p>
        <p class="post__ss">solae ss'26</p>
        <p class="post__pm post__pm--d"><b>half moon<br>bay</b><span>khobar</span><span>29.06.26</span></p>
        <svg class="post__palm" viewBox="0 0 60 60" aria-hidden="true"><path d="M30 58c0-14 1-26 4-34"/><path class="post__palm-leaf" d="M34 24C26 16 12 16 4 24c10-4 20-4 30 0zM34 24c6-10 18-12 24-6-8-2-16 0-24 6zM34 24c-2-10 4-18 12-20-6 6-10 12-12 20zM34 24C24 24 16 32 16 40c4-8 10-14 18-16zM34 24c10 0 16 8 16 16-4-8-8-12-16-16z"/></svg>
        <p class="post__pm post__pm--e"><b>farasan</b><span>jazan ${plane}</span><span>07.07.26</span></p>
        <p class="post__pm post__pm--f"><span>postmarked from</span><b>jeddah · umluj · yanbu<br>half moon bay · farasan</b></p>
        <svg class="post__pm post__pm--g" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="37"/><use href="#i-sun-solo" x="22" y="22" width="36" height="36"/></svg>
      </div>
      <div class="post__strip">
        ${[shots[0], shots[1] || shots[0]].map((id, i) => `<div>${img(id, i + 1, 500)}</div>`).join("")}
        <div><img src="${PX(look.img, 500)}" alt="${look.alt}" loading="lazy" style="object-position:${look.pos}"></div>
      </div>
    </article>`,
    `<article class="post post--brand">
      <div class="post__front">
        <span class="post__logo" aria-hidden="true" data-logo-slot>${LOGOS[logoOpt].full}</span>
        <svg class="post__sparks" viewBox="0 0 100 40" aria-hidden="true"><g transform="translate(14 14) scale(.9)">${sparkle}</g><g transform="translate(66 4) scale(1.05)">${sparkle}</g></svg>
        <p class="post__tag">made for the sun</p>
      </div>
      <svg class="post__paperclip" viewBox="0 0 24 90" aria-hidden="true"><path d="M7 70V14a6.5 6.5 0 0 1 13 0v62a10 10 0 0 1-20 0V22"/></svg>
      <div class="post__back">
        <p class="post__welcome">welcome to your<br>endless summer</p>
        <div class="post__seal">${waves(3, 120)}<svg class="post__mark" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56"/><circle cx="60" cy="60" r="38"/>
          <path id="pm-arc-w" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" fill="none" stroke="none"/><text class="post__mark-arc"><textPath href="#pm-arc-w">SOLAE · DROP 01 · SUMMER 26 ·</textPath></text>
          <text x="60" y="72" text-anchor="middle" class="post__mark-s">S</text></svg>
          <div class="post__stamp stamp-wrap"><div class="stamp"><div class="stamp__inner">${img(shots[0], 2, 300)}<span>Solae</span></div></div></div>
        </div>
        <p class="post__lede">some suits slip, ride up or show too much.<br>this one just stays put.</p>
        <div class="post__copy">
          <p>the first dip, the first cannonball, the first climb out of the pool when nothing has moved an inch. that's the suit i kept looking for, so i made it.</p>
          <p>${p.blurb}</p>
          <p class="post__at">@solae.swim</p>
        </div>
        <div class="post__lines"><p>thank you for choosing solae.</p><p>we hope this one comes</p><p>on every trip, to every</p><p>beach, all summer long.</p></div>
        <p class="post__url">solae · modest swim sets for teen girls</p>
      </div>
    </article>`,
  ];

  pdp.innerHTML = `
    <div class="stack">
      <a class="stack__back" href="shop.html#${port.id}" aria-label="back to ${port.place}">${ICON.prev}</a>
      <p class="stack__where t-label"><svg aria-hidden="true"><use href="#i-boat"/></svg>${port.place}</p>
      <div class="posts" tabindex="0" role="region" aria-roledescription="carousel" aria-label="postcards of ${p.name}">
        ${slides.map((s, i) => `<div class="posts__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">${s}</div>`).join("")}
      </div>
      <div class="stack__bar">
        <button class="stack__arrow" type="button" data-step="-1" aria-label="previous postcard">${ICON.prev}</button>
        <div class="stack__dots">${slides.map((_, i) => `<button type="button" data-slide="${i}" aria-label="postcard ${i + 1}"></button>`).join("")}</div>
        <button class="stack__arrow" type="button" data-step="1" aria-label="next postcard">${ICON.next}</button>
      </div>
    </div>
    <div class="buy" data-buy-panel></div>`;

  const posts = pdp.querySelector(".posts"), dots = [...pdp.querySelectorAll("[data-slide]")];
  const current = () => Math.round(posts.scrollLeft / posts.clientWidth);
  const showDot = () => dots.forEach((d, i) => d.setAttribute("aria-current", i === current()));
  const slideTo = i => posts.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * posts.clientWidth, behavior: reduceMotion.matches ? "auto" : "smooth" });
  posts.addEventListener("scroll", () => { cancelAnimationFrame(posts._r); posts._r = requestAnimationFrame(showDot); }, { passive: true });
  showDot();

  const buy = pdp.querySelector("[data-buy-panel]");
  const render = () => {
    const subtotal = p.price + setRows.reduce((n, r) => n + (setState[r.id].on ? r.price : 0), 0);
    buy.innerHTML = `
      <div class="buy__title">
        <p class="t-tag">${p.type} · ${port.place}</p>
        <h1 class="t-headline">${p.name}</h1>
        <div class="buy__price"><span>${sar(p.price)}</span><span class="stars" aria-label="4.9 out of 5">★★★★★ <span class="t-mute">4.9 · 128 reviews</span></span></div>
      </div>
      <p class="t-lead t-soft">${p.blurb}</p>
      <div class="opt">
        <div class="opt__label"><span>colour: <b>${C[color].name}</b></span>${p.colors.length > 8 ? `<span class="t-mute">${p.colors.length} colours</span>` : ""}</div>
        <div class="swatches" role="radiogroup" aria-label="colour">
          ${p.colors.map(k => `<button type="button" class="swatch swatch--lg" role="radio" aria-checked="${k === color}" aria-label="${C[k].name}" data-color="${k}" style="--c:${dot(k)}"></button>`).join("")}
        </div>
      </div>
      <div class="opt">
        <div class="opt__label"><span>size: <b>${size.toUpperCase()}</b></span><button type="button" data-fit>size &amp; fit guide</button></div>
        <div class="sizes" role="radiogroup" aria-label="size">
          ${SIZES.map(s => `<button type="button" class="size" role="radio" aria-checked="${s === size}" data-size="${s}">${s.toUpperCase()}</button>`).join("")}
        </div>
      </div>
      ${p.stitch ? `
      <div class="opt">
        <div class="opt__label"><span>down the middle: <b>${stitch}</b></span><span class="t-mute">help us decide</span></div>
        <div class="chips" role="radiogroup" aria-label="centre seam">
          ${p.stitch.map(o => `<button type="button" class="chip" role="radio" aria-checked="${o === stitch}" data-stitch="${o}">${o}</button>`).join("")}
        </div>
      </div>` : ""}
      ${setRows.length ? `
      <div class="opt">
        <div class="opt__label"><span><b>complete the set</b></span><span class="t-mute">optional</span></div>
        <div class="set">
          ${setRows.map(r => {
            const st = setState[r.id];
            return `<div class="set__row">
              ${photo(r, { w: 200, alt: "" })}
              <div>
                <p class="line__name">${r.name}</p>
                <p class="line__meta">${sar(r.price)} · ${C[setColor(r, st.opt)].name}</p>
                <div class="chips" role="radiogroup" aria-label="${r.name} colour">
                  ${optsFor(r).map(o => `<button type="button" class="chip" role="radio" aria-checked="${st.opt === o}" data-set="${r.id}" data-opt="${o}"><i style="--c:${o === "matching" ? dot(color) : dot(o)}"></i>${o === "matching" ? "match my suit" : o}</button>`).join("")}
                </div>
              </div>
              <input class="check" type="checkbox" aria-label="add ${r.name}" data-set-on="${r.id}" ${st.on ? "checked" : ""}>
            </div>`;
          }).join("")}
        </div>
      </div>` : ""}
      <div class="buy__cta">
        <button class="btn" type="button" data-buy>add to bag — ${sar(subtotal)}</button>
        <button class="icon-btn icon-btn--outline" type="button" aria-label="save to wishlist" style="width:3.4rem;height:3.4rem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg></button>
      </div>
      <div class="perks">
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>free shipping over ${sar(SHIP_FREE)}</div>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg>easy 14-day exchanges</div>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3c3 3.5 6 6.6 6 10a6 6 0 0 1-12 0c0-3.4 3-6.5 6-10Z"/></svg>chlorine &amp; salt resistant</div>
      </div>
      <div class="acc">
        <details open><summary>details</summary><div><ul>
          ${isSuit ? "<li>double-lined, fully opaque when wet</li><li>small removable pads, held in place by a second layer of fabric</li>" : ""}
          ${p.id === "off-shoulder" ? "<li>off-the-shoulder neckline with a hidden silicone grip</li>" : ""}
          ${p.stitch ? "<li>flounces on the straps, basting stitch down the middle (or not — your call)</li>" : ""}
          ${p.cat === "shorts" ? "<li>knee-length, or just above — no riding up</li><li>matches every suit, or pick white or black</li>" : ""}
          ${p.cat === "cover-ups" ? "<li>light, quick-dry woven fabric</li><li>made to wear over your suit on the walk home</li>" : ""}
          <li>78% recycled nylon, 22% elastane</li><li>designed in saudi arabia</li></ul></div></details>
        <details><summary>fit &amp; pads</summary><div>true to size. if you're between sizes, size up for more coverage. the pads are small and slip out through an inner opening — the second fabric layer keeps them flat and in place while you swim.</div></details>
        <details><summary>care</summary><div>rinse in cool fresh water after every swim. hand wash, dry flat in the shade. no tumble dry, no bleach.</div></details>
        <details><summary>shipping &amp; exchanges</summary><div>ships in 2–4 days across saudi arabia. free over ${sar(SHIP_FREE)}. unworn pieces with hygiene liner intact can be exchanged within 14 days.</div></details>
      </div>`;
  };
  render();

  pdp.addEventListener("click", e => {
    const t = e.target.closest("button, input"); if (!t) return;
    if (t.dataset.step) return slideTo(current() + +t.dataset.step);
    if (t.dataset.slide) return slideTo(+t.dataset.slide);
    if (t.dataset.color) color = t.dataset.color;
    else if (t.dataset.size) size = t.dataset.size;
    else if (t.dataset.stitch) stitch = t.dataset.stitch;
    else if (t.dataset.set) { setState[t.dataset.set].opt = t.dataset.opt; setState[t.dataset.set].on = true; }
    else if (t.dataset.setOn) setState[t.dataset.setOn].on = t.checked;
    else if (t.matches("[data-fit]")) return toast("size guide coming soon — we're measuring everything twice");
    else if (t.matches("[data-buy]")) {
      addToCart(p.id, color, size, stitch);
      setRows.forEach(r => {
        const st = setState[r.id]; if (!st.on) return;
        addToCart(r.id, setColor(r, st.opt), size, st.opt === "matching" ? "matching set" : "");
      });
      return openPanel(".drawer", true);
    } else return;
    const key = t.dataset.color ? ["color", t.dataset.color] : t.dataset.size ? ["size", t.dataset.size] : t.dataset.stitch ? ["stitch", t.dataset.stitch] : null;
    render();
    if (key) buy.querySelector(`[data-${key[0]}="${key[1]}"]`)?.focus();
  });

  const pairs = document.querySelector("[data-pairs]");
  if (pairs) {
    pairs.innerHTML = (isSuit ? ["boardwalk", "drift", "white-one", p.sig ? "tidepool" : "off-shoulder"] : ["tidepool", "cabana", "off-shoulder", "flounce"]).map((id, i) => card(byId(id), i)).join("");
    reveal(pairs);
  }
}
