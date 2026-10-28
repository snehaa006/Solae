import { useImperativeHandle, useLayoutEffect, useRef, useState, type Ref } from "react";
import { inPort, PORTS, portById, type PortId } from "../../data/catalog";
import { pieces, prefersReducedMotion, px, sar } from "../../lib/format";
import { blob, CHART, f1, ISLES, stroke, type Pt } from "./chart";
import { DecoMark, ShipArt } from "./ChartArt";

const { w: CW, h: CH } = CHART;
const ISLE_D = Object.fromEntries(ISLES.map(([id, o]) => [id, blob(o.at, o.r, o.seed)])) as Record<PortId, string>;
const LANE_D = stroke(CHART.lane);
/** lane samples are this many chart units apart */
const STEP = 4;

const pc = (v: number, of: number) => f1(v / of * 100);
const hoverable = () => matchMedia("(hover: hover)").matches;

export interface SeaChartHandle {
  /** sail the boat to a port's dock; returns how long the trip takes, in ms */
  sailTo: (id: PortId) => number;
}

interface SeaChartProps {
  /** the port the boat is at, or heading to */
  here: PortId;
  onPick: (id: PortId) => void;
  ref?: Ref<SeaChartHandle>;
}

/* everything the boat needs between frames; kept out of React state so sailing never re-renders */
interface Voyage {
  /** points along the lane, STEP apart; the boat moves by index along this table */
  lut: Pt[];
  N: number;
  /** each port's dock as a lane index */
  docks: Record<PortId, number>;
  at: number;
  tilt: number;
  raf: number;
}

function sampleLane(lane: SVGPathElement): Pick<Voyage, "lut" | "N" | "docks"> {
  const total = lane.getTotalLength(), N = Math.round(total / STEP);
  const lut = Array.from({ length: N + 1 }, (_, i): Pt => { const q = lane.getPointAtLength(i / N * total); return [q.x, q.y]; });
  const nearest = ([x, y]: Pt) => lut.reduce((b, q, i) => ((q[0] - x) ** 2 + (q[1] - y) ** 2 < (lut[b][0] - x) ** 2 + (lut[b][1] - y) ** 2 ? i : b), 0);
  const docks = Object.fromEntries(ISLES.map(([id, o]) => [id, nearest(o.dock)])) as Record<PortId, number>;
  return { lut, N, docks };
}

/* the hover card: what's on the island, without leaving the map */
function IsleCard({ id }: { id: PortId }) {
  const port = portById(id), items = inPort(id);
  return (
    <>
      <p className="isle-card__k">{port.label} · {pieces(items.length)}</p>
      <p className="isle-card__notes">{port.notes.join(" · ")}</p>
      <div className="isle-card__foot">
        <span className="isle-card__thumbs">
          {items.slice(0, 4).map(p => <img key={p.id} src={px(p.img, 120)} alt="" style={{ objectPosition: p.pos }} />)}
        </span>
        <span>from {sar(Math.min(...items.map(p => p.price)))}</span>
      </div>
    </>
  );
}

export function SeaChart({ here, onPick, ref }: SeaChartProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const chart = useRef<HTMLDivElement>(null);
  const lane = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const wake = useRef<SVGGElement>(null);
  const ship = useRef<SVGGElement>(null);
  const tiltEl = useRef<SVGGElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const voyage = useRef<Voyage>(null);

  const [docksAt, setDocksAt] = useState<Partial<Record<PortId, Pt>>>({});
  const [sailing, setSailing] = useState(false);
  const [hover, setHover] = useState<PortId | null>(null);
  const [cardFor, setCardFor] = useState<PortId | null>(null);
  const [cardOn, setCardOn] = useState(false);
  const cardOff = useRef(0);

  const pt = (f: number): Pt => {
    const { lut, N } = voyage.current!;
    f = Math.max(0, Math.min(N, f));
    const i = Math.min(N - 1, Math.floor(f)), k = f - i;
    return [lut[i][0] + (lut[i + 1][0] - lut[i][0]) * k, lut[i][1] + (lut[i + 1][1] - lut[i][1]) * k];
  };

  /* place the boat; it turns to face where it's heading and leans into climbs, levelling out as it docks */
  const draw = (f: number, dir: number, level = 0) => {
    const v = voyage.current!, boat = ship.current!;
    const [x, y] = pt(f), [x2, y2] = pt(f + dir * 3);
    if (Math.abs(x2 - x) > .4) boat.classList.toggle("is-west", x2 < x);
    const lean = Math.max(-20, Math.min(20, Math.atan2(y2 - y, Math.abs(x2 - x) || 1) * 57.3)) * level;
    v.tilt = level ? v.tilt + (lean - v.tilt) * .25 : 0;
    boat.setAttribute("transform", `translate(${f1(x)} ${f1(y)})`);
    tiltEl.current!.setAttribute("transform", `rotate(${f1(boat.classList.contains("is-west") ? -v.tilt : v.tilt)})`);
  };

  /* foam: little wave marks peel off both sides of the stern and drift apart */
  const foam = (f: number, dir: number) => {
    const w = wake.current!;
    if (w.childElementCount > 70) return;
    const [x, y] = pt(f - dir * 11), [x2, y2] = pt(f - dir * 8);
    const a = f1(Math.atan2(y2 - y, x2 - x) * 57.3);
    w.insertAdjacentHTML("beforeend", ["l", "r"].map(s => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${a})"><path class="foam foam--${s}" d="M-6 0q3-3.5 6 0t6 0"/></g>`).join(""));
  };
  const ripple = (f: number) => {
    const [x, y] = pt(f);
    wake.current!.insertAdjacentHTML("beforeend", [0, 1].map(i => `<g transform="translate(${f1(x)} ${f1(y + 4)})"><ellipse class="ripple" rx="46" ry="11" style="animation-delay:${i * .22}s"/></g>`).join(""));
  };

  // measure the lane once and moor the boat in the harbour
  useLayoutEffect(() => {
    const { lut, N, docks } = sampleLane(lane.current!);
    voyage.current = { lut, N, docks, at: docks.all, tilt: 0, raf: 0 };
    setDocksAt(Object.fromEntries(ISLES.map(([id]) => [id, lut[docks[id]]])));
    draw(docks.all, 1);
    return () => cancelAnimationFrame(voyage.current?.raf ?? 0);
  }, []);

  useImperativeHandle(ref, () => ({
    sailTo(id) {
      const v = voyage.current;
      if (!v) return 0;
      const from = v.at, to = v.docks[id], dir = to >= from ? 1 : -1, steps = Math.abs(to - from);
      const dur = prefersReducedMotion() || !steps ? 0 : Math.min(2600, 550 + steps * STEP * .5);
      cancelAnimationFrame(v.raf);
      setSailing(dur > 0);

      // on narrow screens the chart scrolls sideways: bring the destination into the middle
      const sc = scroller.current;
      if (sc && sc.scrollWidth > sc.clientWidth) {
        sc.scrollTo({ left: CHART.isles[id].dock[0] / CW * sc.scrollWidth - sc.clientWidth / 2, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }

      const t0 = performance.now();
      let spawned = from;
      const tick = (now: number) => {
        // the first frame's timestamp can be a hair earlier than t0, so clamp at 0
        const k = dur ? Math.max(0, Math.min(1, (now - t0) / dur)) : 1, e = k < .5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2;
        v.at = from + dir * steps * e;
        draw(v.at, dir, Math.min(1, k / .1, (1 - k) / .18));
        if (dur && Math.abs(v.at - spawned) * STEP > 18) { foam(v.at, dir); spawned = v.at; }
        let d = "";
        for (let s = 0; s <= steps * e; s += 2) d += (s ? "L" : "M") + pt(from + dir * s).map(f1).join(" ");
        trail.current!.setAttribute("d", d + "L" + pt(v.at).map(f1).join(" "));
        if (k < 1) v.raf = requestAnimationFrame(tick);
        else { v.at = to; setSailing(false); if (dur) ripple(v.at); }
      };
      v.raf = requestAnimationFrame(tick);
      return dur;
    },
  }), []);

  const showCard = (id: PortId) => {
    clearTimeout(cardOff.current);
    setHover(id);
    setCardFor(id);
    setCardOn(true);
  };
  const hideCard = () => {
    clearTimeout(cardOff.current);
    cardOff.current = window.setTimeout(() => { setCardOn(false); setHover(null); }, 80);
  };

  /* the card sits above or below its island, nudged to stay inside the chart; the arrow keeps pointing at the island */
  useLayoutEffect(() => {
    const el = card.current, c = chart.current;
    if (!cardOn || !cardFor || !el || !c) return;
    const o = CHART.isles[cardFor], s = c.clientWidth / CW, below = o.at[1] < CH / 2;
    const x = o.at[0] * s, half = el.offsetWidth / 2 + 8, left = Math.max(half, Math.min(c.clientWidth - half, x));
    el.style.left = left + "px";
    el.style.top = (o.at[1] + (below ? 1 : -1) * (o.r[1] + 24)) * s + "px";
    el.style.setProperty("--ax", f1(x - left) + "px");
  }, [cardOn, cardFor]);

  const hoverProps = (id: PortId) => ({
    onPointerEnter: () => { if (hoverable()) showCard(id); },
    onPointerLeave: hideCard,
  });

  return (
    <div ref={scroller} className="chart-scroll">
      <div ref={chart} className={`chart${sailing ? " is-sailing" : ""}`}>
        <svg className="chart__svg" viewBox={`0 0 ${CW} ${CH}`} aria-hidden="true">
          <defs>
            {ISLES.map(([id]) => <path key={id} id={`isle-${id}`} d={ISLE_D[id]} />)}
            <pattern id="sail-stripe" width="11" height="10" patternUnits="userSpaceOnUse"><rect className="ship__stripe-a" width="11" height="10" /><rect className="ship__stripe-b" width="5.5" height="10" /></pattern>
            <clipPath id="ship-water"><rect x="-66" y="0" width="134" height="14" /></clipPath>
          </defs>
          <g className="compass" transform="translate(72 82) scale(.7)">
            <circle r="38" className="compass__ring" /><circle r="27" className="compass__ring compass__ring--dash" />
            <path className="compass__star" d="M0-34L5-5L34 0L5 5L0 34L-5 5L-34 0L-5-5Z" /><path className="compass__north" d="M0-34L5-5L0 0L-5-5Z" />
            <text y="-46" className="compass__n">N</text>
          </g>
          {CHART.waves.map(([x, y]) => <path key={`${x},${y}`} className="m-wave" d={`M${x} ${y}q6-6 12 0t12 0 12 0`} />)}
          {CHART.sea.map((d, i) => <DecoMark key={i} deco={d} />)}
          {ISLES.map(([id, o]) => (
            <g key={id} className={`isle${here === id ? " is-here" : ""}${hover === id ? " is-hover" : ""}`} onClick={() => onPick(id)} {...hoverProps(id)}>
              <use href={`#isle-${id}`} className="isle__line" style={{ strokeWidth: 38 }} />
              <use href={`#isle-${id}`} className="isle__gap" style={{ strokeWidth: 35 }} />
              <use href={`#isle-${id}`} className="isle__shoal" style={{ strokeWidth: 20 }} />
              <use href={`#isle-${id}`} className="isle__land" />
              {o.deco.map((d, i) => <DecoMark key={i} deco={d} />)}
            </g>
          ))}
          <path ref={lane} className="chart__lane" d={LANE_D} />
          <path ref={trail} className="chart__trail" d="M0 0" />
          {ISLES.map(([id]) => {
            const at = docksAt[id];
            return <circle key={id} className={`dock${here === id ? " is-here" : ""}`} r="5" cx={at && f1(at[0])} cy={at && f1(at[1])} />;
          })}
          {/* foam and ripples are added straight to the DOM while sailing and remove themselves when their animation ends */}
          <g ref={wake} className="wake" onAnimationEnd={e => (e.target as Element).parentElement?.remove()} />
          <g ref={ship} className="ship"><g ref={tiltEl} className="ship__tilt"><g className="ship__face"><g className="ship__bob" transform="scale(.8)"><ShipArt /></g></g></g></g>
        </svg>

        {/* the ribbon on each island: just the place name; the hover card says the rest */}
        {PORTS.map(port => {
          const [x, y] = CHART.isles[port.id].sign;
          return (
            <button key={port.id} className="port" type="button" aria-pressed={here === port.id}
              style={{ left: `${pc(x, CW)}%`, top: `${pc(y, CH)}%` }}
              onClick={() => onPick(port.id)} {...hoverProps(port.id)}
              onFocus={e => { if (e.currentTarget.matches(":focus-visible")) showCard(port.id); }} onBlur={hideCard}>
              {port.place}<span className="sr-only">: {port.label}, {pieces(inPort(port.id).length)}</span>
            </button>
          );
        })}
        <div ref={card} className={`isle-card${cardOn ? " is-on" : ""}`} aria-hidden="true"
          data-side={cardFor ? (CHART.isles[cardFor].at[1] < CH / 2 ? "below" : "above") : undefined}>
          {cardFor && <IsleCard id={cardFor} />}
        </div>
      </div>
    </div>
  );
}
