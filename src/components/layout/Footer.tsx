import type { FormEvent } from "react";
import { Link } from "react-router";
import { useToast } from "../../context/toast";
import { InstagramIcon, PinterestIcon, SendIcon } from "../icons";

const SHOP_LINKS = [
  ["swimsuits", "swimsuits"], ["signatures", "signatures"], ["shorts", "matching shorts"],
  ["cover-ups", "cover-ups"], ["skirts", "the skirt"],
] as const;

export function Footer() {
  const toast = useToast();
  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast("you're on the list — see you on the shore");
  };

  return (
    <footer className="footer">
      <div className="footer__card">
        <div className="footer__grid">
          <nav className="footer__links" aria-label="shop">
            <p className="t-label">shop</p>
            {SHOP_LINKS.map(([port, label]) => <Link key={port} to={`/shop/${port}`}>{label}</Link>)}
          </nav>
          <nav className="footer__links" aria-label="help">
            <p className="t-label">help</p><a href="#">size guide</a><a href="#">shipping</a><a href="#">exchanges</a><a href="#">contact</a>
          </nav>
          <div className="footer__news">
            <h3>letters from the shore</h3>
            <p>new drops, beach playlists and first dibs on restocks. no spam, promise.</p>
            <form className="field-pill" onSubmit={subscribe}>
              <label className="sr-only" htmlFor="news-email">email</label>
              <input className="input" id="news-email" type="email" placeholder="enter your email" required />
              <button className="icon-btn" type="submit" aria-label="subscribe" style={{ width: "3rem", height: "3rem", borderWidth: "1.5px" }}><SendIcon /></button>
            </form>
            <div className="footer__social">
              <a className="icon-btn icon-btn--outline" href="#" aria-label="instagram"><InstagramIcon /></a>
              <a className="icon-btn icon-btn--outline" href="#" aria-label="pinterest"><PinterestIcon /></a>
            </div>
          </div>
        </div>
        <div className="footer__big">
          <span className="wordmark" aria-hidden="true">Solae</span>
          <span className="t-hand" aria-hidden="true">see you on the shore</span>
        </div>
        <div className="footer__legal">
          <span>© 2026 SOLAE · by teens, for teens · photos: pexels &amp; unsplash</span>
          <nav aria-label="legal"><a href="#">privacy</a><a href="#">terms</a><Link to="/design-system">design system</Link></nav>
        </div>
      </div>
      <div className="footer__stripe" aria-hidden="true" />
    </footer>
  );
}
