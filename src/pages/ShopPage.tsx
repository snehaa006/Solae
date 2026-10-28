import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { inPort, isPortId, portById, type PortId } from "../data/catalog";
import { PortPanel } from "../components/shop/PortPanel";
import { SeaChart, type SeaChartHandle } from "../components/shop/SeaChart";
import { usePageMeta } from "../hooks/usePageMeta";
import { prefersReducedMotion } from "../lib/format";

const pathOf = (id: PortId) => (id === "all" ? "/shop" : `/shop/${id}`);
const sailedTo = (id: PortId) => `sailed to ${portById(id).place}: ${inPort(id).length} ${portById(id).label}`;

/* The shop: a wide sea chart under the header is the category nav; the pieces follow right below
   (pins: hand-drawn "solae" chart, ship reference). /shop/<port> deep-links to a category. */
export function ShopPage() {
  usePageMeta("The shop — SOLAE", "Shop SOLAE by port: plain swimsuits, the two signatures, matching knee-length shorts and cover-ups. Pick an island on the map and the boat sails you there.");
  const { port } = useParams();
  const navigate = useNavigate();
  const chart = useRef<SeaChartHandle>(null);
  const panel = useRef<HTMLDivElement>(null);

  // every visit starts in the harbour; a deep link sails out from there
  const [here, setHere] = useState<PortId>("all");
  const hereRef = useRef<PortId>("all");
  const [status, setStatus] = useState(() => sailedTo("all"));
  const timers = useRef({ follow: 0, start: 0 });

  const go = (raw: string | undefined, { from = "panel", quiet = false }: { from?: "map" | "panel"; quiet?: boolean } = {}) => {
    const id = isPortId(raw) ? raw : "all";
    clearTimeout(timers.current.start);
    if (location.pathname !== pathOf(id)) navigate(pathOf(id), { replace: true });
    if (id === hereRef.current) return;
    hereRef.current = id;
    setHere(id);
    setStatus(sailedTo(id));
    const dur = chart.current?.sailTo(id) ?? 0;

    // once the boat lands, bring the products into view if they're below the fold
    clearTimeout(timers.current.follow);
    if (quiet) return;
    timers.current.follow = window.setTimeout(() => {
      const top = panel.current?.getBoundingClientRect().top ?? 0;
      if (from === "map" ? top > innerHeight * .78 : top < 0 || top > innerHeight) {
        panel.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    }, from === "map" ? dur + 120 : 0);
  };

  // the first visit waits a beat in the harbour, so you see the boat set off
  const lastPort = useRef(port);
  const arrive = useEffectEvent(() => {
    const start = lastPort.current;
    if (start && !isPortId(start)) navigate("/shop", { replace: true });
    else if (start && start !== "all") timers.current.start = window.setTimeout(() => go(start, { from: "map" }), 450);
  });
  useEffect(() => {
    arrive();
    const t = timers.current;
    return () => { clearTimeout(t.start); clearTimeout(t.follow); };
  }, []);

  // later links to /shop/<port> (the footer, back/forward) sail from wherever the boat is
  const followUrl = useEffectEvent((to: string | undefined) => {
    if (to === lastPort.current) return;
    lastPort.current = to;
    go(to);
  });
  useEffect(() => followUrl(port), [port]);

  return (
    <main id="main">
      <section className="shop" aria-labelledby="shop-title">
        <h1 id="shop-title" className="sr-only">the shop</h1>
        <div className="wrap shop-top">
          <SeaChart ref={chart} here={here} onPick={id => go(id, { from: "map" })} />
        </div>
        <p className="sr-only" role="status">{status}</p>
        <div ref={panel} className="wrap port-panel">
          {/* keyed by port, so each stop starts with a fresh set of cards */}
          <PortPanel key={here} id={here} onSail={id => go(id)} />
        </div>
      </section>
    </main>
  );
}
