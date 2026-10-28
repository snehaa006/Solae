/** a Pexels photo at the given width */
export const px = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* prices in saudi riyals; placeholders until the real ones are set */
export const sar = (n: number) => "SAR " + n.toLocaleString("en-US");
export const pad = (n: number) => String(n).padStart(2, "0");
export const pieces = (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`;

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** localStorage that never throws (private mode, blocked storage) */
export const storage = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* not saved */ } },
};
