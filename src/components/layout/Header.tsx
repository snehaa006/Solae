import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useCart } from "../../context/cart";
import { BagIcon, MenuIcon, SearchIcon } from "../icons";

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { count, open } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header__bar">
        <nav className="nav t-label" aria-label="primary">
          <Link to="/shop" aria-current={pathname.startsWith("/shop") ? "page" : undefined}>shop</Link>
          <Link to="/#signatures">signatures</Link>
          <Link to="/#lookbook">lookbook</Link>
        </nav>
        <button className="icon-btn menu-btn" type="button" aria-label="open menu" onClick={onOpenMenu}><MenuIcon /></button>
        <Link className="header__brand" to="/" aria-label="SOLAE home"><span className="wordmark">Solae</span></Link>
        <div className="header__tools">
          <nav className="nav t-label" aria-label="secondary">
            <Link to="/#about">about</Link>
            <Link to="/design-system">brand</Link>
          </nav>
          <button className="icon-btn hide-sm" type="button" aria-label="search"><SearchIcon /></button>
          <button className="icon-btn" type="button" aria-label="open bag" onClick={open}>
            <BagIcon /><span className={`count${count > 0 ? " is-on" : ""}`}>{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
