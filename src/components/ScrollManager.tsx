import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/* the shop keeps one page while the boat changes port, so /shop/* counts as one page */
const pageOf = (pathname: string) => (pathname.startsWith("/shop") ? "/shop" : pathname);

/** start new pages at the top, and scroll to #anchors (also across pages: /#about) */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const page = useRef<string | null>(null);

  useEffect(() => {
    const first = page.current === null;
    const newPage = !first && pageOf(pathname) !== page.current;
    page.current = pageOf(pathname);
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    // jump on arrival, glide within the page (html has scroll-behavior: smooth)
    if (target) target.scrollIntoView({ behavior: first || newPage ? "instant" : "auto" });
    else if (newPage) scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
