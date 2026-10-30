import { Sprite } from "./icons";

/** round line drawings with a word or two under each, on a pastel strip (ref: the beauty site's benefits row) */
export function Perks({ items, className = "field--mist" }: { items: [icon: string, label: string][]; className?: string }) {
  return (
    <div className={`perks field ${className}`}>
      <ul className="wrap perks__list" role="list">
        {items.map(([icon, label]) => (
          <li key={label}><span className="perks__icon"><Sprite id={icon} className="ill" /></span><span className="perks__label">{label}</span></li>
        ))}
      </ul>
    </div>
  );
}
