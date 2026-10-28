import { inPort, PORTS, portById, type PortId } from "../../data/catalog";
import { pieces } from "../../lib/format";
import { Sprite } from "../icons";
import { ProductCard } from "../ProductCard";

/* one slim line about the port, its pieces, and a boat to the next stop */
export function PortPanel({ id, onSail }: { id: PortId; onSail: (id: PortId) => void }) {
  const port = portById(id), items = inPort(id);
  const next = PORTS[(PORTS.indexOf(port) % (PORTS.length - 1)) + 1];
  return (
    <>
      <header className="port-head">
        <h2 className="t-label"><span className="sr-only">{port.place}: </span>{port.label} · {pieces(items.length)}</h2>
        <p className="port-head__about">{port.def}</p>
      </header>
      <div className="grid-products">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
      <div className="port-next">
        <p className="t-hand" aria-hidden="true">next stop</p>
        <button className="btn btn--ink" type="button" onClick={() => onSail(next.id)}>
          <Sprite id="i-boat" className="port-next__boat" />sail to {next.place}
        </button>
      </div>
    </>
  );
}
