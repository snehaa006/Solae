import { Fragment, useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { byId } from "../data/catalog";
import { NextIcon, PrevIcon, Sprite } from "../components/icons";
import { ProductCard } from "../components/ProductCard";
import { Ticker } from "../components/Ticker";
import { usePageMeta } from "../hooks/usePageMeta";
import { px } from "../lib/format";
import "../styles/design-system.css";

/* ---- Colour, with contrast worked out live ------------------------------- */
const PALETTE: Record<string, [name: string, hex: string, source: string][]> = {
  "main colours": [["deep", "07494A", "Deep Teal · primary"], ["sunshine", "F8E077", "Sunshine · secondary"], ["lagoon", "119DA4", "Lagoon · tertiary"]],
  "neutral + accents": [["sand", "FFECD1", "Sand · neutral"], ["cream", "FFF8EE", "the page"], ["coral", "F07167", "accent"], ["stormy", "196876", "Stormy Teal · accent"], ["olive", "545624", "Olive · accent"]],
  "tints · for whole fields": [["lagoon-mist", "B8DDD8", "lagoon 30% into cream"], ["sun-wash", "FBEAA7", "sunshine 60% into cream"]],
  "collection · swimsuits only": [["cerulean", "0E79B2", "collection"], ["sky", "6699CC", "collection"], ["ocean", "0471A6", "collection"], ["tropical", "17BEBB", "collection"], ["brick", "B40421", "collection"], ["turf", "337155", "collection"], ["willow", "93C186", "collection"]],
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
  const onCream = ratio(h, "FFF8EE"), dark = ratio(h, "07494A");
  return onCream >= 4.5 ? `text on cream ${onCream.toFixed(1)}:1 ✓`
    : onCream >= 3 ? `large text on cream ${onCream.toFixed(1)}:1`
    : `fill only · deep teal text on it ${dark.toFixed(1)}:1`;
};

/* the fields, in the order the homepage stacks them */
const FIELDS: [cls: string, name: string, ink: string, use: string][] = [
  ["", "cream", "deep teal", "the page: catalog, product, shop"],
  ["field--mist", "lagoon mist", "deep teal", "the big ticker, our story, the menu"],
  ["field--olive", "olive", "sand + sunshine", "signatures"],
  ["field--coral", "coral", "deep teal (large) on cream cards", "how we're different"],
  ["field--sun", "sun wash", "deep teal", "inside the framed card only"],
  ["field--deep", "deep teal", "sand + sunshine", "reviews, the footer"],
];

const SEMANTIC = [
  ["--bg", "var(--cream)", "cream", "page background"],
  ["--field", "per section", "one of the six fields", "set by .field--mist, --olive, --coral, --sun, --deep; frames read it for their gap"],
  ["--ink", "var(--deep)", "deep teal", "body text and headlines on light fields"],
  ["--ink-soft", "var(--stormy)", "stormy teal", "secondary copy, labels"],
  ["--ink-mute", "var(--ink-mute)", "#4F6F70", "meta text, captions"],
  ["--action", "var(--deep)", "deep teal", "buttons, with sand text (8.8:1)"],
  ["--pop", "var(--coral)", "coral", "line drawings, stamps: decoration only, never text people must read"],
  ["--focus", "var(--lagoon)", "lagoon", "focus rings, input focus"],
] as const;

/* ---- Type & space, measured at the current window width ------------------ */
const STEPS: [key: string, cls: string, sample: ReactNode][] = [
  ["mega", "t-headline", <Fragment key="s1">made for <em>the sun</em></Fragment>], ["display", "t-headline", <Fragment key="s2">how we're <em>different</em></Fragment>],
  ["h1", "t-headline", <Fragment key="s3">the tidepool <em>one-piece</em></Fragment>], ["h2", "t-headline", <Fragment key="s4">letters from <em>the shore</em></Fragment>],
  ["h3", "t-headline", <em key="h3">shorts that match…</em>], ["lead", "t-lead", "swimsuits, shorts & cover-ups that match"],
  ["body", "", "removable pads held in by a second layer of fabric."], ["small", "t-small", "true to size. between sizes? size up."],
  ["label", "t-label", "modest · modern · swim sets"], ["script", "t-script", "hi, i'm ghalia"],
];
const fsOf = (k: string) => `var(--fs-${k})`;
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
  ["announcement", "sunseeker", "a slim deep teal ticker of tiny typewriter caps between little suns"],
  ["header", "sunseeker", "cream with one hairline under it; tiny caps nav either side, the chosen logo centred"],
  ["hero", "swimwear thank-you card", "two cards over a beach photo: cabana stripes with three tiny caps along the top and \"made for the sun\" along the bottom, the logo's sun rising out of its edge and a \"drop 01\" sticker; then a framed butter card with the handle, a script note on tape, one short paragraph, the buttons and three facts. Desktop: the cards stand left so the girls show on the right"],
  ["big ticker", "beach bar", "a lagoon-mist band of serif phrases, alternating roman and italic, scrolling between coral suns"],
  ["catalog", "sunseeker", "section head (line sun, label, headline), four framed product cards, one ghost button"],
  ["signatures", "interiors \"what's trending\"", "an olive field; the headline split by a line drawing; the two signatures in an oval and a scalloped frame with a sand hairline; \"view the signatures ———\""],
  ["checker ribbon", "interiors board", "between the olive, coral and mist fields"],
  ["how we're different", "interiors board", "a coral field, four cream cards, each with a coral line drawing, an italic title that trails off and one line"],
  ["our story", "sunseeker + thank-you card", "a lagoon-mist field; the logo on a hairline card with a parasol sticker; \"hi, i'm ghalia\" in script; then vision and mission inside the framed butter card"],
  ["shop · sea chart", "hand-drawn \"solae\" chart", "unchanged: the dotted lane writes \"Solae\", islands are the categories, the boat sails between them"],
  ["product page", "postcards + sunseeker", "the postcard stack beside a quiet panel (tiny caps type, serif name and price, square size chips, a ruled box), a facts strip, a deep teal reviews field, pairs well with"],
  ["footer", "beach bar's maroon band", "a full-width deep teal field: link columns, the newsletter as one input + sun button, a script sign-off and the logo rising out of the window's edge"],
];

const NAV = [["brand", "01 logos"], ["colour", "02 colour"], ["type", "03 type"], ["space", "04 space & shape"], ["motifs", "05 motifs"], ["components", "06 components"], ["sections", "07 section patterns"], ["voice", "08 voice"]];
const TABS = ["the suit", "the short", "the cover-up"];
const DRAWINGS = ["i-sun-line", "i-parasol", "i-shell", "i-palm", "i-wave", "i-star"];

/* option 2's wordmark: spaced caps with a soft sun for the O */
const Word = ({ label, dark }: { label: string; dark?: boolean }) => (
  <span className={dark ? "logo-word on-dark" : "logo-word"} role="img" aria-label={label}>S<i />LAE</span>
);
/* option 3: the sun symbol with the name underneath */
const Mark = ({ label, dark }: { label: string; dark?: boolean }) => (
  <span className={dark ? "logo-mark on-dark" : "logo-mark"} role="img" aria-label={label}><img src="/img/logo-mark.svg" alt="" /><span>SOLAE</span></span>
);

function LogoOption({ n, name, light, dark, children }: { n: number; name: string; light: ReactNode; dark: ReactNode; children: ReactNode }) {
  return (
    <article className="logo-opt">
      <div className="logo-opt__pair">
        <div className="logo-opt__tile">{light}</div>
        <div className="logo-opt__tile logo-opt__tile--dark">{dark}</div>
      </div>
      <p className="t-label">option {n} of 3</p>
      <h3>{name}</h3>
      {children}
    </article>
  );
}

function Section({ id, num, title, intro, last, children }: { id: string; num: string; title: ReactNode; intro: ReactNode; last?: boolean; children: ReactNode }) {
  return (
    <section id={id} className="ds-sec" style={last ? { borderBottom: 0 } : undefined}>
      <div className="ds-sec__head">
        <div><p className="num t-label">{num}</p><h2 className="t-headline t-display">{title}</h2></div>
        <p>{intro}</p>
      </div>
      {children}
    </section>
  );
}

function Family({ eyebrow, spec, children }: { eyebrow: string; spec: ReactNode; children: ReactNode }) {
  return (
    <div className="fam">
      <div><p className="t-label t-soft">{eyebrow}</p><dl>{children}</dl></div>
      {spec}
    </div>
  );
}

/* private: the brand page is not linked from the store, and vercel.json sends it home on the live site */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.append(meta);
    return () => meta.remove();
  }, []);
}

export function DesignSystemPage() {
  usePageMeta("SOLAE Design System", "Tokens, type, motifs and components for the SOLAE swim storefront.");
  useNoIndex();
  const [probe, measured] = useMeasured();
  const [tab, setTab] = useState(0);
  const noSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <div className="ds-page">
      <a className="skip-link" href="#main">skip to content</a>

      <header className="ds-hero cabana">
        <div className="wrap ds-hero__inner">
          <p className="trio t-label"><span>design system</span><span>v2 · riviera</span><span>30 october 2026</span></p>
          <h1 className="t-headline">elegant, simple <em>&amp; sunny</em></h1>
          <div className="ds-hero__card framed">
            <p className="tape-note">same colours, new look</p>
            <p>The foundations for SOLAE's store, re-set after the client's second round of boards: a swimwear thank-you card (cabana stripes, a framed butter card, typewriter caps, a script note on tape), an interiors site (colour fields, roman + italic serif headlines, checker ribbons, thin-lined oval and scalloped frames, line drawings), a beach-house template and a beach bar (tickers, centred section heads, a deep band at the foot) and a sheet of retro motel stickers. The colours and the three logo options still come from the Brand Starter (28 October 2026).</p>
            <Link className="btn btn--sm" to="/">view the mock store</Link>
          </div>
        </div>
      </header>

      <nav className="ds-nav" aria-label="sections">
        <ol className="wrap">
          {NAV.map(([id, label]) => <li key={id}><a className="t-label" href={`#${id}`}>{label}</a></li>)}
        </ol>
      </nav>

      <main id="main" className="wrap">

        <Section id="brand" num="01" title={<>the <em>logos</em></>} intro="Three options from the Brand Starter, and nothing is final. The site wears one at a time, everywhere a logo shows: the header and menu, the sun rising out of the hero's striped card, the story and vision cards, the product welcome card, the footer and the tab icon. Switch between them with the logo bar in the corner of every store page, or open the store with each link below; your browser remembers the last one you picked. Everyone else sees option 1.">
          <div className="logo-opts">
            <LogoOption n={1} name="ghalia's sun"
              light={<img className="logo-sun" src="/img/logo-sun.svg" alt="option 1, ghalia's sun, on white" />}
              dark={<img className="logo-sun" src="/img/logo-sun.svg" alt="option 1 on deep teal" />}>
              <p>Her original drawing, cleaned up: the half sun, the name running up its edge in her colours, and brush-stroke beams. Playful, warm and personal.</p>
              <p><Link className="link-u" to="/?logo=1">see the site with option 1</Link> · it turns upright in the header and on the hero's striped card, a sunrise sitting on the edge, and rises out of the window's right edge in the footer.</p>
            </LogoOption>
            <LogoOption n={2} name="minimal wordmark"
              light={<Word label="option 2, minimal wordmark, on white" />}
              dark={<Word label="option 2 on deep teal" dark />}>
              <p>The name in clean, widely spaced capitals, with the O swapped for a soft sun. Clean, modern and the most premium of the three: the closest to the new boards.</p>
              <p><Link className="link-u" to="/?logo=2">see the site with option 2</Link> · its soft sun rises half out of the striped card; the wordmark sits in the header, the story card and the footer.</p>
            </LogoOption>
            <LogoOption n={3} name="sun symbol + name"
              light={<Mark label="option 3, sun symbol and name, on white" />}
              dark={<Mark label="option 3 on deep teal" dark />}>
              <p>Ghalia's sun as a symbol of its own, with the name underneath. Friendly and balanced, between playful and premium. The symbol can go on the suit itself.</p>
              <p><Link className="link-u" to="/?logo=3">see the site with option 3</Link> · half the symbol rises out of the striped card; symbol and name sit in the header, the story card and the footer.</p>
            </LogoOption>
          </div>

          <p className="ds-sub t-label">in use</p>
          <div className="ds-grid ds-grid--wide">
            <div><div className="mock"><div className="tag"><Word label="Solae" /><small>the tidepool one-piece<br />size m · SAR 229</small></div></div><p className="note"><b>hang tag</b> · option 2</p></div>
            <div><div className="mock"><div className="fabric"><img src="/img/logo-mark.svg" alt="the sun symbol printed on tropical teal swim fabric" /></div></div><p className="note"><b>on the suit</b> · option 3's symbol, the way the Nike tick sits on a shoe</p></div>
            <div><div className="mock"><div className="pfp"><span><img src="/img/logo-mark.svg" alt="the sun symbol as a round profile picture" /></span><b>@solae.swim</b></div></div><p className="note"><b>profile picture</b> · option 3</p></div>
            <div><div className="mock"><div className="box"><p>made for<br /><em>the sun</em></p><img className="logo-sun" src="/img/logo-sun.svg" alt="ghalia's sun on the end of a sand mailer box" /></div></div><p className="note"><b>mailer box</b> · option 1, the sun rising out of the edge</p></div>
            <div><div className="mock"><div className="post-sq"><img className="logo-sun" src="/img/logo-sun.svg" alt="" /><p>drop 01<br /><em>is live</em></p><small>swim sets for teen girls</small></div></div><p className="note"><b>social post</b> · option 1 on deep teal</p></div>
          </div>

          <p className="ds-sub t-label">rules</p>
          <table className="tok"><tbody>
            <tr><td><b>colour</b></td><td>Options 1 and 3 always keep their own colours, on cream, sand or Deep Teal. Option 2's letters are Deep Teal on light and Sand on Deep Teal; its sun is always Sunshine.</td></tr>
            <tr><td><b>size</b></td><td>Option 1 needs room: below about 8rem wide the letters get hard to read, so in the header it's at its limit. Option 2 works from 1rem caps. Option 3's symbol works down to 16px, which is why it's the tab icon.</td></tr>
            <tr><td><b>space</b></td><td>Leave at least one sun's width of empty space around every logo. Option 1's flat edge can sit right on the edge of a page, card or box: the sun is rising out of it.</td></tr>
            <tr><td><b>tagline</b></td><td>"made for <i>the sun</i>", in the headline serif with the last words in italic.</td></tr>
            <tr><td><b>case</b></td><td>Headlines and body are lowercase. Labels, nav, buttons and tickers are tiny tracked caps in the typewriter face.</td></tr>
          </tbody></table>
        </Section>

        <Section id="colour" num="02" title={<>colour, <em>in fields</em></>} intro="Every hex comes from the Brand Starter, unchanged. What's new is how they're used: each section is one flat field of a single colour, stacked down the page like the boards, with no grain, gradients or paper texture. Two tints (lagoon mist and sun wash) soften the brights into the powder blue and butter of the boards. The collection colours are for the swimsuits only. Contrast labels are worked out live.">
          <div>
            {Object.entries(PALETTE).map(([group, list]) => (
              <Fragment key={group}>
                <p className="ds-sub t-label">{group}</p>
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

          <p className="ds-sub t-label">the six fields, top to bottom</p>
          <div className="fields">
            {FIELDS.map(([cls, name, ink, use]) => (
              <div key={name} className={`fields__row field ${cls}`}>
                <p className="t-headline t-h3">{name}</p><p className="t-label">ink: {ink}</p><p className="t-small">{use}</p>
              </div>
            ))}
          </div>
          <p className="note">One field per section. Coral and olive never touch: a checker ribbon goes between them. Deep teal comes last on every page.</p>

          <p className="ds-sub t-label">semantic tokens</p>
          <div className="scroll-x"><table className="tok">
            <thead><tr><th>token</th><th>maps to</th><th>use</th></tr></thead>
            <tbody>
              {SEMANTIC.map(([token, c, name, use]) => (
                <tr key={token}><td><code>{token}</code></td><td><i className="dotc" style={{ "--c": c.startsWith("var") ? c : "transparent" }} />{name}</td><td>{use}</td></tr>
              ))}
            </tbody>
          </table></div>
        </Section>

        <Section id="type" num="03" title={<>type, <em>four voices</em></>} intro="Four faces, each with one job, all free on Google Fonts. The serif does the talking, roman with a word or two turned italic. The typewriter caps do the labelling, small and tracked out. Jost carries the reading. The script turns up once per view, never for anything people must read.">
          <Family eyebrow="headline serif · interiors board" spec={<p className="fam__spec t-headline">how we're <em>different</em></p>}>
            <dt>in use</dt><dd>Playfair Display 400 roman, 500 italic</dd><dt>token</dt><dd><code className="inline">--font-headline</code> · <code className="inline">.t-headline</code></dd><dt>use</dt><dd>headlines, product names, prices, the big ticker · lowercase · wrap one or two words in <code className="inline">&lt;em&gt;</code> for the italic</dd>
          </Family>
          <Family eyebrow="typewriter caps · thank-you card" spec={<p className="fam__spec t-label" style={{ fontSize: "clamp(.9rem,.7rem + .8vw,1.4rem)" }}>high quality · modest · swimwear</p>}>
            <dt>in use</dt><dd>DM Mono 400, uppercase, tracked .18em</dd><dt>token</dt><dd><code className="inline">--font-mono</code> · <code className="inline">.t-label</code></dd><dt>use</dt><dd>labels, nav, buttons, tickers, sizes, prices on cards, the trio of caps along a card's edge</dd>
          </Family>
          <Family eyebrow="body & ui" spec={<p className="fam__spec" style={{ fontSize: "clamp(1.4rem,1rem + 1.6vw,2.4rem)" }}>swim, shorts &amp; cover-ups that match</p>}>
            <dt>in use</dt><dd>Jost 400–500</dd><dt>token</dt><dd><code className="inline">--font-body</code></dd><dt>use</dt><dd>body copy, product blurbs, form fields</dd>
          </Family>
          <Family eyebrow="script · sunseeker" spec={<p className="fam__spec t-script" style={{ fontSize: "clamp(3rem,2rem + 4vw,5.5rem)" }}>hi, i'm ghalia</p>}>
            <dt>in use</dt><dd>Pinyon Script</dd><dt>token</dt><dd><code className="inline">--font-script</code> · <code className="inline">.t-script</code> · <code className="inline">.tape-note</code></dd><dt>use</dt><dd>one accent per view, 2–6 words: "hi, i'm ghalia", the tape note, the sign-off</dd>
          </Family>
          <p className="note">The logo wordmark (options 2 and 3) keeps Poppins, and the product postcards keep their own faces, each matched to its pin.</p>

          <p className="ds-sub t-label">fluid scale · 360px → 1440px · resize the window to watch it change</p>
          <div>
            {STEPS.map(([k, cls, sample]) => (
              <div className="scale-row" key={k}>
                <div className="meta"><b>--fs-{k}</b><span>{measured && `${measured.fs[k]}px @ ${measured.w}w`}</span></div>
                <p className={`sample ${cls}`} style={{ fontSize: fsOf(k) }}>{sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="space" num="04" title={<>space <em>&amp; shape</em></>} intro="Spacing is fluid, so sections breathe more on desktop without breakpoints. Shapes are square-ish now: rectangles for buttons and inputs, small soft corners for photos and cards, and round only for colour dots and arrows. Depth is mostly flat; the colour fields do the separating.">
          <div>
            {SPACE.map(k => (
              <div className="space-row" key={k}>
                <span><code className="inline">--space-{k}</code></span><i style={{ "--w": `var(--space-${k})` }} /><span>{measured && `${measured.space[k]}px`}</span>
              </div>
            ))}
          </div>
          <p className="ds-sub t-label">radius</p>
          <div className="ds-grid">
            <div className="shape" style={{ borderRadius: "var(--r-xs)" }}>r-xs · 2 · buttons</div>
            <div className="shape" style={{ borderRadius: "var(--r-sm)" }}>r-sm · 4 · boxes</div>
            <div className="shape" style={{ borderRadius: "var(--r-md)" }}>r-md · 8 · photos, cards</div>
            <div className="shape" style={{ borderRadius: "var(--r-lg)" }}>r-lg · 14 · rare</div>
            <div className="shape" style={{ borderRadius: "var(--r-pill)" }}>round · dots</div>
          </div>
        </Section>

        <Section id="motifs" num="05" title={<>the <em>motifs</em></>} intro="Six motifs carry the look, each from a board. They're all CSS or inline SVG, so any brand colour can fill them. Use two or three per section at most; the quiet is part of it.">
          <div className="ds-grid ds-grid--wide">
            <div className="demo"><h4 className="t-label">cabana stripes · thank-you card</h4>
              <div className="cabana motif-box"><p className="trio t-label"><span>modest</span><span>modern</span><span>swim</span></p></div>
              <p className="note"><code className="inline">.cabana</code> · wide lagoon-mist and cream bars. The hero card, and this page's header.</p></div>
            <div className="demo"><h4 className="t-label">framed card · thank-you card</h4>
              <div className="framed motif-box motif-box--framed"><p className="t-label">@solae.swim</p><p className="tape-note">swim with a purpose</p></div>
              <p className="note"><code className="inline">.framed</code> · a thick deep teal border round sun wash, everything centred. <code className="inline">.tape-note</code> · a script phrase on a strip of lagoon-mist tape.</p></div>
            <div className="demo"><h4 className="t-label">checker ribbon · interiors board</h4>
              <div className="motif-ribbons"><div className="field field--olive" /><div className="ribbon" /><div className="field field--coral" /></div>
              <p className="note"><code className="inline">.ribbon</code> · a checker row, upright bars, a checker row. Set <code className="inline">--ra</code> / <code className="inline">--rb</code> for its colours.</p></div>
            <div className="demo"><h4 className="t-label">tickers · beach bar, sunseeker</h4>
              <Ticker className="announce" label="demo" items={["drop 01 is live", "free shipping over SAR 300"]} />
              <Ticker className="ticker--lg field field--mist" label="demo" items={["removable pads", <em key="d">double-lined</em>]} />
              <p className="note"><code className="inline">&lt;Ticker&gt;</code> · tiny caps on deep teal, or <code className="inline">.ticker--lg</code> in the serif.</p></div>
          </div>

          <p className="ds-sub t-label">photo frames · a photo, a gap, a hairline</p>
          <div className="frames-demo field field--olive">
            <figure><div className="frame-oval"><img src={px("28681540", 600)} alt="off-shoulder swimsuit in the sea" style={{ objectPosition: "50% 25%" }} /></div><figcaption><b>oval</b><code className="inline">.frame-oval</code></figcaption></figure>
            <figure><div className="frame-scallop"><img src={px("4271771", 600)} alt="flounce swimsuit flat lay" /></div><figcaption><b>scalloped</b><code className="inline">.frame-scallop</code></figcaption></figure>
            <figure><div className="frame-arch"><img src={px("15560782", 600)} alt="white cover-up on a misty beach" /></div><figcaption><b>arch</b><code className="inline">.frame-arch</code></figcaption></figure>
            <figure><div className="frame"><img src={px("10486115", 600)} alt="friends on the beach" /></div><figcaption><b>plain</b><code className="inline">.frame</code> · product cards</figcaption></figure>
          </div>
          <p className="note">The shaped frames read the field they sit on (<code className="inline">--field</code>) for the gap, and <code className="inline">--line</code> for the hairline (sand by default).</p>

          <p className="ds-sub t-label">line drawings + stickers · interiors board, motel stickers</p>
          <div className="ds-grid ds-grid--wide">
            <div className="demo"><div className="drawings">{DRAWINGS.map(id => <Sprite key={id} id={id} className="ill" />)}</div>
              <p className="note"><code className="inline">&lt;Sprite id="i-shell" className="ill" /&gt;</code> · thin one-colour strokes: coral on cream, sand on olive. One per card or section head.</p></div>
            <div className="demo" style={{ placeItems: "center" }}>
              <div className="row" style={{ gap: "2rem" }}>
                <Sprite id="s-parasol" className="sticker" style={{ width: "5.5rem", height: "5.5rem", rotate: "-12deg" }} />
                <span className="sticker" style={{ fontSize: ".85rem", rotate: "8deg" }}><span className="badge-sun"><span>summer 26</span><b>drop 01</b><span>is live</span></span></span>
              </div>
              <p className="note"><code className="inline">.sticker</code> · a die-cut white edge round any shape. One per view, tilted, never over text.</p></div>
          </div>
        </Section>

        <Section id="components" num="06" title={<>the <em>components</em></>} intro="Controls are rectangles with tiny typewriter caps. Every interactive element has a 44px minimum touch target and a visible Lagoon focus ring. Press Tab to check.">
          <div className="ds-grid ds-grid--wide">
            <div className="demo"><h4 className="t-label">buttons</h4>
              <div className="row"><button className="btn" type="button">shop drop 01</button><button className="btn btn--ghost" type="button">our story</button></div>
              <div className="row"><button className="btn btn--sun" type="button">sign up</button><button className="btn btn--sm" type="button">small</button></div>
              <Link className="link-line" to="/shop/signatures">view <em>the signatures</em></Link>
              <p className="note">deep = do · ghost = see more · sun = on deep teal · the long italic link closes a section</p></div>
            <div className="demo field field--deep"><h4 className="t-label" style={{ color: "var(--sunshine)" }}>on deep teal</h4>
              <div className="row"><button className="btn btn--sun" type="button">shop drop 01</button><button className="btn btn--ghost-light" type="button">write a review</button></div>
              <div className="row"><span className="badge badge--sun">new</span><span className="badge badge--mist">signature</span><span className="badge">matches every suit</span></div></div>
            <div className="demo"><h4 className="t-label">tabs</h4>
              <div className="tabs" role="tablist" aria-label="demo tabs">
                {TABS.map((t, i) => <button key={t} className="tab" type="button" role="tab" aria-selected={tab === i} onClick={() => setTab(i)}>{t}</button>)}
              </div></div>
            <div className="demo"><h4 className="t-label">input</h4>
              <form className="field-row" onSubmit={noSubmit}><label className="sr-only" htmlFor="ds-email">email</label><input className="input" id="ds-email" type="email" placeholder="enter your email" /><button className="btn" type="submit">sign up</button></form>
              <div className="row"><button className="icon-btn icon-btn--outline" type="button" aria-label="previous"><PrevIcon /></button><button className="icon-btn icon-btn--outline" type="button" aria-label="next"><NextIcon /></button></div></div>
            <div className="demo"><h4 className="t-label">selectors</h4>
              <div className="swatches">
                {[["tropical", "#17BEBB"], ["cerulean", "#0E79B2"], ["brick", "#B40421"], ["willow", "#93C186"]].map(([name, c], i) => (
                  <button key={name} className="swatch swatch--lg" type="button" aria-pressed={i === 0} aria-label={name} style={{ "--c": c }} />
                ))}
              </div>
              <div className="sizes"><button className="size" type="button">XS</button><button className="size" type="button" aria-checked="true">S</button><button className="size" type="button">M</button><button className="size" type="button">L</button><button className="size" type="button" disabled>XL</button></div>
              <div className="chips"><button className="chip" type="button" aria-checked="true"><i style={{ "--c": "#17BEBB" }} />match my suit</button><button className="chip" type="button"><i style={{ "--c": "#fff" }} />white</button></div></div>
            <div className="demo"><h4 className="t-label">product card</h4><div><ProductCard product={byId("tidepool")} /></div></div>
            <div className="demo"><h4 className="t-label">accordion</h4>
              <div className="acc"><details open><summary>fit &amp; pads</summary><div>small removable pads, held in by a second layer of fabric.</div></details><details><summary>care</summary><div>rinse in cool fresh water after every swim.</div></details></div></div>
            <div className="demo field field--coral"><h4 className="t-label">difference card</h4>
              <div className="diff__card"><Sprite id="i-shell" className="diff__icon ill" /><h3>double-lined, every time…</h3><p>every suit is double-lined, so it stays fully opaque when it's wet.</p></div></div>
          </div>
        </Section>

        <Section id="sections" num="07" title={<>section <em>patterns</em></>} intro="Where each part of the store comes from on the client's boards.">
          <div className="scroll-x"><table className="tok map">
            <thead><tr><th>section</th><th>board</th><th>what we took</th></tr></thead>
            <tbody>
              {PATTERNS.map(([section, ref, took]) => <tr key={section}><td>{section}</td><td>{ref}</td><td>{took}</td></tr>)}
            </tbody>
          </table></div>
        </Section>

        <Section id="voice" num="08" title={<>the <em>voice</em></>} last intro="We sound like friends who've been to the beach, not a catalogue. Lowercase, warm, specific. Always say what something does (pads that stay put) rather than how it feels. Fewer words than you think.">
          <div className="voice">
            <div className="demo yes"><h4 className="t-label">say</h4><p>knee-length, so they never ride up when you climb out of the pool.</p></div>
            <div className="demo no"><h4 className="t-label">not</h4><p>Experience unparalleled comfort with our premium performance shorts.</p></div>
            <div className="demo yes"><h4 className="t-label">say</h4><p>the white one goes with everything.</p></div>
            <div className="demo no"><h4 className="t-label">not</h4><p>SHOP NOW!!! LIMITED TIME ONLY</p></div>
          </div>
        </Section>
      </main>

      <footer className="ds-foot field field--deep">
        <p className="t-label">© 2026 SOLAE · <Link className="link-u" to="/">back to the store</Link></p>
      </footer>

      {/* sized with each token in turn to read out its current pixel value */}
      <div ref={probe} style={{ position: "absolute", visibility: "hidden" }} />
    </div>
  );
}
