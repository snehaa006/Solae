import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { CloseIcon } from "../icons";

const LINKS = [["/shop", "shop"], ["/#signatures", "signatures"], ["/#lookbook", "lookbook"], ["/#about", "about"]] as const;

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) closeBtn.current?.focus(); }, [open]);

  return (
    <div className={`mobile-nav${open ? " is-open" : ""}`} aria-label="menu">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="wordmark" style={{ fontSize: "1.6rem" }}>Solae</span>
        <button ref={closeBtn} className="icon-btn" type="button" aria-label="close menu" onClick={onClose}><CloseIcon /></button>
      </div>
      <nav aria-label="mobile">
        {LINKS.map(([to, label]) => <Link key={to} to={to} onClick={onClose}>{label}</Link>)}
      </nav>
      <p className="t-hand">by teens, for teens</p>
      <div className="mobile-nav__stripe" />
    </div>
  );
}
