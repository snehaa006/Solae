import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { CloseIcon } from "../icons";
import { Logo } from "../Logo";

const LINKS = [["/shop", "shop"], ["/#signatures", "signatures"], ["/#about", "about"]] as const;

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) closeBtn.current?.focus(); }, [open]);

  return (
    <div className={`mobile-nav${open ? " is-open" : ""}`} aria-label="menu">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mobile-nav__brand" aria-hidden="true"><Logo slot="bar" /></span>
        <button ref={closeBtn} className="icon-btn" type="button" aria-label="close menu" onClick={onClose}><CloseIcon /></button>
      </div>
      <nav aria-label="mobile">
        {LINKS.map(([to, label]) => <Link key={to} to={to} onClick={onClose}>{label}</Link>)}
      </nav>
      <p className="t-hand">bright, free &amp; all your own</p>
    </div>
  );
}
