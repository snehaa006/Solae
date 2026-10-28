import { Fragment, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { byId } from "../data/catalog";
import { Edge } from "../components/edges";
import { NextIcon, PrevIcon, SendIcon, Sprite } from "../components/icons";
import { ProductCard } from "../components/ProductCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { px } from "../lib/format";
import "../styles/design-system.css";

/* ---- Colour, with contrast worked out live ------------------------------- */
const PALETTE: Record<string, [name: string, hex: string, source: string][]> = {
  shore:  [["sand", "FFFDF2", "page"], ["papaya", "FFECD1", "Papaya Whip"], ["shell", "F6EEDF", "sunk surface"], ["jasmine", "F8E077", "Jasmine"], ["marigold", "FFAB4C", "Pantone 14-1050"]],
  sunset: [["coral", "F07167", "Vibrant Coral"], ["solae-red", "E84A4A", "wordmark"], ["brick", "B40421", "Brick Red"], ["hibiscus", "EC0868", "hot pink"], ["mauve", "9A879D", "dusk"]],
  ocean:  [["sky", "6699CC", "Blue Grey"], ["ocean", "0471A6", "Bright Teal Blue"], ["lagoon", "17BEBB", "Tropical Teal"], ["cyan", "119DA4", "Dark Cyan"], ["stormy", "196876", "Stormy Teal"], ["deep", "07494A", "Dark Teal"]],
  palm:   [["willow", "93C186", "Willow Green"], ["turf", "337155", "Turf Green"], ["olive", "545624", "Olive Leaf"], ["charcoal", "414146", "logo plate"]],
};
const hex2rgb = (h: string) => h.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
const lum = (h: string) => {
  const [r, g, b] = hex2rgb(h).map(v => (v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4));
  return .2126 * r + .7152 * g + .0722 * b;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + .05) / (y + .05);
};
const textOn = (h: string) => {
  const onSand = ratio(h, "FFFDF2"), dark = ratio(h, "07494A");
  return onSand >= 4.5 ? `text on sand ${onSand.toFixed(1)}:1 ✓`
    : onSand >= 3 ? `large text on sand ${onSand.toFixed(1)}:1`
    : `fill only · deep teal text on it ${dark.toFixed(1)}:1`;
};

const SEMANTIC = [
  ["--bg", "var(--sand)", "sand", "page background (k2o cream)"],
  ["--surface", "#fff", "white", "cards over photography, inputs"],
  ["--surface-sunk", "var(--shell)", "shell", "about card, tabs track, perks"],
  ["--surface-warm", "var(--papaya)", "papaya whip", "product tiles, shipping bar"],
  ["--ink", "var(--deep)", "dark teal", "all body text and headlines"],
  ["--ink-soft", "var(--stormy)", "stormy teal", "secondary copy"],
  ["--ink-mute", "var(--ink-mute)", "#5E7F80", "meta text, captions"],
  ["--accent", "var(--solae-red)", "solae red", "wordmark, sun-streak, large accents (≥24px)"],
  ["--action", "var(--brick)", "brick", "primary buttons, announcement pill, badges"],
  ["--focus", "var(--ocean)", "ocean", "focus rings, input focus"],
] as const;

/* ---- Type & space, measured at the current window width ------------------ */
const MEGA = "clamp(3.4rem, .8rem + 10.6vw, 12rem)";
const STEPS: [key: string, cls: string, sample: string][] = [
  ["mega", "t-headline", "made for the sun"], ["display", "t-headline", "made for the sun"], ["h1", "t-headline", "the tidepool one-piece"],
  ["h2", "t-h2", "shop drop 01"], ["h3", "t-h3", "letters from the shore"], ["lead", "t-lead", "swimsuits, shorts & cover-ups that match"],
  ["body", "", "removable pads held in by a second layer of fabric."], ["small", "t-small", "swimsuit · 4 colours"], ["eyebrow", "t-eyebrow", "meet drop 01"],
  ["script", "t-script", "by teens, for teens"], ["hand", "t-hand", "it's about"], ["label", "t-label", "shop · signatures · lookbook"],
];
const fsOf = (k: string) => (k === "mega" ? MEGA : `var(--fs-${k})`);
const SPACE = ["3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"];

interface Measured { w: number; fs: Record<string, number>; space: Record<string, number> }

function useMeasured() {
  const probe = useRef<HTMLDivElement>(null);
  const [m, setM] = useState<Measured | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = probe.current!;
      const size = (v: string) => { el.style.width = v; return Math.round(el.getBoundingClientRect().width); };
      setM({
        w: innerWidth,
        fs: Object.fromEntries(STEPS.map(([k]) => [k, size(fsOf(k))])),
        space: Object.fromEntries(SPACE.map(k => [k, size(`var(--space-${k})`)])),
      });
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);
  return [probe, m] as const;
}

/* ---- Section patterns ------------------------------------------------------ */
const PATTERNS = [
  ["announcement", "k2o", "slim bar with tracked caps scrolling between sun marks"],
  ["header", "the late checkout", "tracked caps nav spread across the top, wordmark centred, sticky with blur"],
  ["hero", "the late checkout", "a huge red serif headline overlapping a print-framed photo; a side column with a script note, small photo and serif-caps tagline; a postage stamp"],
  ["wave band", "surf shop + k2o", "an ocean marquee with wavy edges, wide caps, a script accent and sun marks"],
  ["catalog", "SUIT taplink", "wide caps CATALOG, a dotted swirl map of categories (it filters), wavy-framed product photos, outline pill buttons"],
  ["lookbook sheet", "the late checkout (lower page)", "a cream sheet floating on sea photography: mixed-size prints, red serif headlines, serif-caps notes, a dotted arrow"],
  ["signatures", "surf shop", "a pale-blue section, two arched white-border frames offset in height, curved text on a wave"],
  ["postcard", "a postcard from summer", "a founders' note on a postcard: stamp, postmark, address lines, taped polaroid"],
  ["about us", "SUIT taplink", "wide caps title, alternating wavy-framed photos, squiggle + italic labels, palm leaf watermark"],
  ["sun & salt", "sea & soil", "full-bleed water photo, huge spaced wide caps, vertical 'and' around a wave glyph"],
  ["on the shore", "k2o + surf shop", "staggered soft-framed UGC tiles with handle chips"],
  ["shop · sea chart", "hand-drawn \"solae\" chart + the ship photo", "a small strip of sea centred under the header, no frame, sized like a nav bar (no page title, the map is the top of the page): the dotted lane writes \"solae\", one small island per category sits beside it with a ribbon name. the map is the only category nav: hover an island for its notes and pieces, click and the striped-sail boat sails the writing, kicking up a stern wave, spray and foam"],
  ["shop · port panel", "k2o + SUIT taplink", "one slim centred line under the map (the category, how many pieces, a one-line definition), then the landing page's wavy product cards"],
  ["product · postcards", "caprini, lemon stripe short, a postcard from summer, built for warm days", "a swipeable stack of postcards right on the page: perforated stamp with a binder clip, full photo with a pinned note, photo strip with postmarks, striped welcome card"],
  ["footer", "k2o", "rounded deep-teal card, link columns, newsletter pill, oversized wordmark, script sign-off, stripe band"],
];

const NAV = [["brand", "01 brand"], ["colour", "02 colour"], ["type", "03 type"], ["space", "04 space & shape"], ["motifs", "05 motifs"], ["components", "06 components"], ["sections", "07 section patterns"], ["voice", "08 voice"]];
const TABS = ["the suit", "the short", "the cover-up"];

function Section({ id, num, title, intro, last, children }: { id: string; num: string; title: string; intro: ReactNode; last?: boolean; children: ReactNode }) {
  return (
    <section id={id} className="ds-sec" style={last ? { borderBottom: 0 } : undefined}>
      <div className="ds-sec__head">
        <div><p className="num">{num}</p><h2 className="t-headline t-display">{title}</h2></div>
        <p>{intro}</p>
      </div>
      {children}
    </section>
  );
}

function Family({ eyebrow, spec, children }: { eyebrow: string; spec: ReactNode; children: ReactNode }) {
  return (
    <div className="fam">
      <div><p className="t-eyebrow t-soft">{eyebrow}</p><dl>{children}</dl></div>
      {spec}
    </div>
  );
}

export function DesignSystemPage() {
  usePageMeta("SOLAE Design System", "Tokens, type, motifs and components for the SOLAE swim storefront.");
  const [probe, measured] = useMeasured();
  const [tab, setTab] = useState(0);
  const noSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <div className="ds-page">
      <a className="skip-link" href="#main">skip to content</a>

      <header className="wrap ds-hero">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <p className="t-eyebrow t-soft">design system · v1.0 · october 2026</p>
          <Link className="btn btn--ink btn--sm" to="/">view the mock store</Link>
        </div>
        <span className="wordmark">Solae</span>
        <p className="t-headline" style={{ fontSize: "var(--fs-h1)", maxWidth: "16ch" }}>aesthetic, professional, and a little bit sandy.</p>
        <p className="t-lead t-soft" style={{ maxWidth: "var(--text-max)" }}>The foundations for SOLAE's portfolio and store. The structure comes from k2o (warm cream, rounded cards, pill controls, a wide display face). Body type is SKIMS' Inter. The look comes from the pin boards: an editorial red serif on grainy cream paper (the late checkout), hand-cut wavy photo frames (SUIT), arches and waves (surf shop) and big spaced type over the sea (sea &amp; soil).</p>
        <div className="ds-hero__meta">
          <span className="badge badge--sun">fluid type</span><span className="badge badge--coral">brand palette</span><span className="badge badge--ink">wcag aa text</span>
        </div>
      </header>

      <nav className="ds-nav" aria-label="sections">
        <ol className="wrap">
          {NAV.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
        </ol>
      </nav>

      <main id="main" className="wrap">

        <Section id="brand" num="01" title="brand" intro="The wordmark is a tall, condensed high-contrast serif in Solae Red, taken from the brand sheet. The sun-streak is our answer to k2o's shooting star: a tapering line that ends in a little sun. Use it as a divider, after headings, and as a sign-off.">
          <div className="ds-grid ds-grid--wide">
            <div className="demo" style={{ placeItems: "center", minHeight: "14rem" }}><span className="wordmark" style={{ fontSize: "4rem" }}>Solae</span><p className="note">wordmark · on sand</p></div>
            <div className="demo" style={{ placeItems: "center", minHeight: "14rem", background: "var(--charcoal)", boxShadow: "none" }}><span className="wordmark" style={{ fontSize: "4rem" }}>Solae</span><p className="t-eyebrow" style={{ color: "var(--papaya)", letterSpacing: ".32em" }}>by teens for teens</p></div>
            <div className="demo" style={{ placeItems: "center", minHeight: "14rem", background: "var(--deep)", boxShadow: "none", color: "var(--jasmine)" }}><Sprite id="i-sun" className="sunmark" style={{ width: "12rem", height: "3rem" }} /><p className="note" style={{ color: "var(--papaya)" }}>sun-streak · divider &amp; sign-off</p></div>
          </div>
          <p className="ds-sub">rules</p>
          <table className="tok"><tbody>
            <tr><td><b>wordmark</b></td><td>Always set in caps, tracked out at .12em and stretched vertically. Solae Red on light backgrounds, Coral on Deep Teal. Never inside a heading.</td></tr>
            <tr><td><b>tagline</b></td><td>"by teens, for teens" in Instrument Serif italic as a script overlay, or in tracked caps under the wordmark.</td></tr>
            <tr><td><b>case</b></td><td>Headlines and buttons are lowercase (k2o, late checkout). Section labels (wide display), nav and eyebrows are tracked caps.</td></tr>
          </tbody></table>
        </Section>

        <Section id="colour" num="02" title="colour" intro="Every hex comes from the brand sheet's two colour drafts. Sand is the page; Deep Teal is the ink. Brights are for illustration, stripes and big moments. Small text only ever uses ink, stormy or brick. The contrast labels below are worked out live in the page.">
          <div>
            {Object.entries(PALETTE).map(([group, list]) => (
              <Fragment key={group}>
                <p className="ds-sub">{group}</p>
                <div className="ds-grid">
                  {list.map(([n, h, src]) => (
                    <div className="sw" key={n}>
                      <div className="sw__chip" style={{ "--c": `#${h}` }}><span>#{h}</span></div>
                      <div className="sw__body"><b>{n}</b><code>--{n}</code><small>{src} · {textOn(h)}</small></div>
                    </div>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>

          <p className="ds-sub">the cabana stripe</p>
          <div className="ds-grid ds-grid--wide">
            <div><div className="stripe-demo" /><p className="note" style={{ marginTop: ".5rem" }}><code className="inline">--stripe-cabana</code>: from the brand sheet's stripe page. Use it for footers, progress bars, product tiles and the mobile menu.</p></div>
            <div><div className="stripe-demo stripe-demo--umb" /><p className="note" style={{ marginTop: ".5rem" }}><code className="inline">--stripe-umbrella</code>: the blue-and-white beach umbrella from the pins, for accents.</p></div>
          </div>

          <p className="ds-sub">semantic tokens</p>
          <div className="scroll-x"><table className="tok">
            <thead><tr><th>token</th><th>maps to</th><th>use</th></tr></thead>
            <tbody>
              {SEMANTIC.map(([token, c, name, use]) => (
                <tr key={token}><td><code>{token}</code></td><td><i className="dotc" style={{ "--c": c }} />{name}</td><td>{use}</td></tr>
              ))}
            </tbody>
          </table></div>
        </Section>

        <Section id="type" num="03" title="type" intro={<>Six roles, each with one job. k2o's <b>Moslin</b> and <b>TT Turns</b> are commercial fonts you have to license, so free Google stand-ins are in place for now. The real names come first in every font stack, so once you license and self-host a font, it takes over automatically. <b>Inter</b> is SKIMS' actual body font, and it's free.</>}>
          <Family eyebrow="editorial headline · from the pins" spec={<p className="fam__spec t-headline">the suit that stays put</p>}>
            <dt>in use</dt><dd>Gloock 400</dd><dt>token</dt><dd><code className="inline">--font-headline</code></dd><dt>use</dt><dd>hero, product names, section headlines · lowercase · Solae Red</dd>
          </Family>
          <Family eyebrow="wide display · from k2o" spec={<p className="fam__spec t-wide">catalog</p>}>
            <dt>original</dt><dd>Moslin (licensed)</dd><dt>stand-in</dt><dd>Unbounded 500</dd><dt>token</dt><dd><code className="inline">--font-display</code></dd><dt>use</dt><dd>section labels in caps (CATALOG, ABOUT US), marquees, the sun &amp; salt statement</dd>
          </Family>
          <Family eyebrow="body & ui · from SKIMS" spec={<p className="fam__spec" style={{ fontWeight: 600, letterSpacing: "-.02em" }}>swim, shorts &amp; cover-ups that match</p>}>
            <dt>in use</dt><dd>Inter 400–700 (SKIMS' own body face)</dd><dt>k2o equivalent</dt><dd>TT Turns (licensed)</dd><dt>token</dt><dd><code className="inline">--font-body</code></dd><dt>use</dt><dd>body copy, nav in tracked caps, buttons, prices on cards</dd>
          </Family>
          <Family eyebrow="serif · brand sheet" spec={<p className="fam__spec t-script" style={{ color: "var(--ocean)" }}>in our shop you'll find…</p>}>
            <dt>in use</dt><dd>Instrument Serif, roman + italic</dd><dt>token</dt><dd><code className="inline">--font-serif</code></dd><dt>use</dt><dd>wordmark, serif-caps taglines, postcard letters, prices</dd>
          </Family>
          <Family eyebrow="handwriting · from the pins" spec={<p className="fam__spec t-hand" style={{ fontSize: "clamp(3rem,2rem + 4vw,5.5rem)", color: "var(--brick)" }}>scroll down to explore</p>}>
            <dt>in use</dt><dd>Mrs Saint Delafield</dd><dt>token</dt><dd><code className="inline">--font-script</code></dd><dt>use</dt><dd>short notes only ("it's about", "scroll down to explore"), 2–5 words, never for anything users must read</dd>
          </Family>
          <Family eyebrow={'fluid display · from SKIMS + "your hair is thirsty"'} spec={<p className="fam__spec t-fluid" style={{ fontSize: "clamp(2.8rem,2rem + 3.4vw,5rem)", color: "var(--ocean)" }}>the shop</p>}>
            <dt>in use</dt><dd>Sour Gummy 900 at 125% width, melted by the <code className="inline">#f-fluid</code> SVG filter</dd><dt>token</dt><dd><code className="inline">--font-fluid</code> · <code className="inline">.t-fluid</code></dd><dt>use</dt><dd>the shop title, port names, the product name on the stamp postcard · lowercase · ocean on sand · 2.5rem and up only, the melt gets crunchy below that</dd>
          </Family>

          <p className="ds-sub">fluid scale · 360px → 1440px · resize the window to watch it change</p>
          <div>
            {STEPS.map(([k, cls, sample]) => (
              <div className="scale-row" key={k}>
                <div className="meta"><b>{k === "mega" ? ".t-mega" : `--fs-${k}`}</b><span>{measured && `${measured.fs[k]}px @ ${measured.w}w`}</span></div>
                <p className={`sample ${cls}`} style={{ fontSize: fsOf(k) }}>{sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="space" num="04" title="space & shape" intro="Spacing is fluid as well, so sections breathe more on desktop without breakpoints. The corners stay soft (k2o) but never fully round on cards. Pills are reserved for controls.">
          <div>
            {SPACE.map(k => (
              <div className="space-row" key={k}>
                <span><code className="inline">--space-{k}</code></span><i style={{ "--w": `var(--space-${k})` }} /><span>{measured && `${measured.space[k]}px`}</span>
              </div>
            ))}
          </div>
          <p className="ds-sub">radius</p>
          <div className="ds-grid">
            <div className="shape" style={{ borderRadius: "var(--r-xs)" }}>r-xs · 6</div>
            <div className="shape" style={{ borderRadius: "var(--r-sm)" }}>r-sm · 12</div>
            <div className="shape" style={{ borderRadius: "var(--r-md)" }}>r-md · 20</div>
            <div className="shape" style={{ borderRadius: "var(--r-lg)" }}>r-lg · 20→32</div>
            <div className="shape" style={{ borderRadius: "var(--r-pill)", aspectRatio: 2 }}>r-pill</div>
          </div>
          <p className="ds-sub">elevation</p>
          <div className="ds-grid ds-grid--wide demo--sunk" style={{ padding: "var(--space-m)", borderRadius: "var(--r-lg)" }}>
            <div className="shadow-box" style={{ boxShadow: "var(--shadow-paper)" }}>shadow-paper · chips, quick add</div>
            <div className="shadow-box" style={{ boxShadow: "var(--shadow-lift)" }}>shadow-lift · cards over photos</div>
            <div className="shadow-box" style={{ boxShadow: "var(--shadow-polaroid)", borderRadius: "3px" }}>shadow-polaroid · prints &amp; postcards</div>
          </div>
        </Section>

        <Section id="motifs" num="05" title="motifs" intro="The frames carry the look. Every photo on the site sits in one of these, and each frame comes from a pin. They're pure CSS and SVG masks, so any brand colour can be the outline. Use one or two kinds per section.">
          <p className="ds-sub">photo frames</p>
          <div className="frames-demo">
            <figure><div className="frame-wavy"><img src={px("4271771", 600)} alt="flounce swimsuit flat lay" /></div><figcaption><b>wavy</b><code className="inline">.frame-wavy</code> · pin: SUIT · product cards, about rows, product page. Set <code className="inline">--frame-c</code> for the outline colour.</figcaption></figure>
            <figure><div className="frame-arch"><img src={px("28681540", 600)} alt="off-shoulder swimsuit in the sea" style={{ objectPosition: "50% 25%" }} /></div><figcaption><b>arch</b><code className="inline">.frame-arch</code> · pin: surf shop · signature styles</figcaption></figure>
            <figure><div className="frame"><img src={px("10486115", 600)} alt="friends on the beach" /></div><figcaption><b>print</b><code className="inline">.frame</code> · pin: the late checkout · hero, editorial sheet</figcaption></figure>
            <figure><div className="frame-soft"><img src={px("9872701", 600)} alt="donut float on a pool" /></div><figcaption><b>soft</b><code className="inline">.frame-soft</code> · pin: surf shop catalog · social tiles</figcaption></figure>
            <figure><div className="frame-torn"><img src={px("36188914", 600)} alt="striped towel by a pool" /></div><figcaption><b>torn</b><code className="inline">.frame-torn</code> · pin: torn-paper ocean · use sparingly</figcaption></figure>
            <figure style={{ paddingTop: "1rem" }}>
              <div className="polaroid" style={{ transform: "rotate(-3deg)" }}>
                <span className="tape" style={{ top: "-.7rem", left: "50%", translate: "-50% 0" }} aria-hidden="true" />
                <img src={px("8926075", 400)} alt="two girls smiling" />
                <p className="t-hand" style={{ textAlign: "center", fontSize: "1.9rem" }}>best friends</p>
              </div>
              <figcaption style={{ marginTop: "1rem" }}><b>polaroid + tape</b><code className="inline">.polaroid</code> · scrapbook pins</figcaption>
            </figure>
          </div>
          <p className="ds-sub">edges, stamps &amp; marks</p>
          <div className="ds-grid ds-grid--wide">
            <div className="demo"><h4>torn paper edge</h4>
              <div className="motif-stage"><Edge shape="torn" /></div>
              <p className="note">into and out of photo sections</p></div>
            <div className="demo"><h4>wave edge</h4>
              <div className="motif-stage" style={{ background: "var(--lagoon)" }}><Edge shape="wave" /></div>
              <p className="note">marquee band, signatures, statement</p></div>
            <div className="demo" style={{ placeItems: "center" }}><h4 style={{ justifySelf: "start" }}>postage stamp</h4>
              <div className="stamp-wrap" style={{ width: "8.5rem", color: "var(--brick)", transform: "rotate(4deg)" }}><div className="stamp"><div className="stamp__inner"><img src={px("27330805", 300)} alt="" /><p className="t-label" style={{ fontSize: ".5rem", marginTop: ".3rem" }}>summer '26 · india</p></div></div></div>
              <p className="note">one per page section, max</p></div>
            <div className="demo" style={{ placeItems: "center", color: "var(--willow)" }}><h4 style={{ justifySelf: "start" }}>dotted swirl &amp; leaf</h4>
              <svg viewBox="0 0 800 140" style={{ width: "100%", height: "5rem" }} aria-hidden="true"><path className="swirl" d="M40 100C120 20 170 20 224 38S330 120 400 104 520 22 576 36 700 118 760 100" /></svg>
              <Sprite id="i-leaf" viewBox="0 0 300 300" style={{ width: "6rem", opacity: .5 }} />
              <p className="note">connect labels (catalog map), decorate quiet sections</p></div>
          </div>
        </Section>

        <Section id="components" num="06" title="components" intro="Controls are pill-shaped and lowercase. Every interactive element has a 44px minimum touch target and a visible Ocean focus ring. Press Tab to check.">
          <div className="ds-grid ds-grid--wide">
            <div className="demo"><h4>buttons</h4>
              <div className="row"><button className="btn" type="button">shop drop 01</button><button className="btn btn--ink" type="button">our story</button></div>
              <div className="row"><button className="btn btn--sun" type="button">get early access</button><button className="btn btn--ghost" type="button">follow us</button></div>
              <div className="row"><button className="btn btn--sm" type="button">small</button><a className="link-u" href="#components">shop now</a></div>
              <p className="note">brick = buy · ink = learn · sun = promo · ghost = secondary</p></div>
            <div className="demo demo--ocean"><h4>on photography</h4>
              <div className="row"><button className="btn" type="button">shop drop 01</button><button className="btn btn--ghost-light" type="button">see the lookbook</button></div>
              <div className="row"><span className="badge badge--sun">new</span><span className="badge badge--coral">signature</span><span className="badge">matches every suit</span><span className="badge badge--ink">bestseller</span></div></div>
            <div className="demo"><h4>tabs</h4>
              <div className="tabs" role="tablist" aria-label="demo tabs">
                {TABS.map((t, i) => <button key={t} className="tab" type="button" role="tab" aria-selected={tab === i} onClick={() => setTab(i)}>{t}</button>)}
              </div>
              <p className="note">k2o's "hair growth / advanced skin" toggle · arrow keys move between tabs</p></div>
            <div className="demo"><h4>input</h4>
              <form className="field-pill" onSubmit={noSubmit}><label className="sr-only" htmlFor="ds-email">email</label><input className="input" id="ds-email" type="email" placeholder="enter your email" /><button className="icon-btn icon-btn--outline" type="submit" aria-label="subscribe" style={{ width: "3rem", height: "3rem" }}><SendIcon /></button></form>
              <div className="row"><button className="icon-btn icon-btn--outline" type="button" aria-label="previous"><PrevIcon /></button><button className="icon-btn icon-btn--outline" type="button" aria-label="next"><NextIcon /></button></div></div>
            <div className="demo"><h4>selectors</h4>
              <div className="swatches">
                {[["lagoon", "#17BEBB"], ["brick", "#B40421"], ["jasmine", "#F8E077"], ["deep teal", "#07494A"]].map(([name, c], i) => (
                  <button key={name} className="swatch swatch--lg" type="button" aria-pressed={i === 0} aria-label={name} style={{ "--c": c }} />
                ))}
              </div>
              <div className="sizes"><button className="size" type="button">XS</button><button className="size" type="button" aria-checked="true">S</button><button className="size" type="button">M</button><button className="size" type="button">L</button><button className="size" type="button" disabled>XL</button></div>
              <div className="chips"><button className="chip" type="button" aria-checked="true"><i style={{ "--c": "#17BEBB" }} />match my suit</button><button className="chip" type="button"><i style={{ "--c": "#fff" }} />white</button><button className="chip" type="button"><i style={{ "--c": "#1E2626" }} />black</button></div>
              <p className="note">shorts come matching, white or black (from the brand notes)</p></div>
            <div className="demo"><h4>product card</h4><div><ProductCard product={byId("tidepool")} /></div></div>
            <div className="demo"><h4>accordion</h4>
              <div className="acc"><details open><summary>fit &amp; pads</summary><div>small removable pads, held in by a second layer of fabric.</div></details><details><summary>care</summary><div>rinse in cool fresh water after every swim.</div></details></div></div>
          </div>
        </Section>

        <Section id="sections" num="07" title="section patterns" intro="Where each homepage section comes from. Use k2o for structure and rhythm, and the boards for texture and personality.">
          <div className="scroll-x"><table className="tok map">
            <thead><tr><th>section</th><th>reference</th><th>what we took</th></tr></thead>
            <tbody>
              {PATTERNS.map(([section, ref, took]) => <tr key={section}><td>{section}</td><td>{ref}</td><td>{took}</td></tr>)}
            </tbody>
          </table></div>
        </Section>

        <Section id="voice" num="08" title="voice" last intro="We sound like friends who've been to the beach, not a catalogue. Lowercase, warm, specific. Always say what something does (pads that stay put) rather than how it feels.">
          <div className="voice">
            <div className="demo yes"><h4>say</h4><p>knee-length, so they never ride up when you climb out of the pool.</p></div>
            <div className="demo no"><h4>not</h4><p>Experience unparalleled comfort with our premium performance shorts.</p></div>
            <div className="demo yes"><h4>say</h4><p>the white one goes with everything.</p></div>
            <div className="demo no"><h4>not</h4><p>SHOP NOW!!! LIMITED TIME ONLY</p></div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <div className="footer__stripe" aria-hidden="true" />
        <p className="note" style={{ textAlign: "center", marginTop: "1rem" }}>© 2026 SOLAE · <Link className="link-u" to="/">back to the store</Link></p>
      </footer>

      {/* sized with each token in turn to read out its current pixel value */}
      <div ref={probe} style={{ position: "absolute", visibility: "hidden" }} />
    </div>
  );
}
