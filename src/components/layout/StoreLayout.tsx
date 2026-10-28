import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useCart } from "../../context/cart";
import { LogoLab } from "../Logo";
import { AnnounceBar } from "./AnnounceBar";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

/** announcement bar, header, menu, footer, bag and logo bar around every store page */
export function StoreLayout() {
  const { isOpen: bagOpen, close: closeBag } = useCart();
  const { pathname } = useLocation();
  // like the bag, the menu belongs to the page it was opened on
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;
  const closeMenu = () => setMenuOpenOn(null);

  useEffect(() => {
    document.body.style.overflow = bagOpen || menuOpen ? "hidden" : "";
  }, [bagOpen, menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { closeBag(); setMenuOpenOn(null); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [closeBag]);

  return (
    <>
      <a className="skip-link" href="#main">skip to content</a>
      <AnnounceBar />
      <Header onOpenMenu={() => setMenuOpenOn(pathname)} />
      <MobileNav open={menuOpen} onClose={closeMenu} />
      <Outlet />
      <Footer />
      <CartDrawer />
      <LogoLab />
    </>
  );
}
