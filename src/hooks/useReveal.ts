import { useEffect, useRef, useState } from "react";

/* one shared observer for every .reveal element on the page */
const shown = new WeakMap<Element, () => void>();
let io: IntersectionObserver | undefined;
const observer = () =>
  (io ??= new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    shown.get(en.target)?.();
    shown.delete(en.target);
    io!.unobserve(en.target);
  }), { rootMargin: "0px 0px -6% 0px" }));

/**
 * Fade an element up the first time it scrolls into view.
 * Returns a ref for the element and its class ("reveal", then "reveal is-in").
 */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [isIn, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    shown.set(el, () => setIn(true));
    observer().observe(el);
    return () => { shown.delete(el); observer().unobserve(el); };
  }, []);
  return [ref, isIn ? "reveal is-in" : "reveal"] as const;
}
