import { inPort, PORTS, portById, type PortId } from "../../data/catalog";
import { pieces } from "../../lib/format";
import { Sprite } from "../icons";
import { ProductCard } from "../ProductCard";

/* one slim line naming the port, its pieces, and a boat to the next stop */
export function PortPanel({ id, onSail }: { id: PortId; onSail: (id: PortId) => void }) {
  const port = portById(id), items = inPort(id);
  const next = PORTS[(PORTS.indexOf(port) % (PORTS.length - 1)) + 1];
  return (
    <>
      <header className="port-head">
        <h2 className="t-label"><span className="sr-only">{port.place}: </span>{port.label} · {pieces(items.length)}</h2>
      </header>
      <div className="grid-products">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="port-next">
        <button className="btn" type="button" onClick={() => onSail(next.id)}>
          <Sprite id="i-boat" className="port-next__boat" />sail to {next.place}
        </button>
      </div>
    </>
  );
}
