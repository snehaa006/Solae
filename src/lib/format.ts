/** a Pexels photo at the given width */
export const px = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** an Unsplash photo at the given width */
export const unsplash = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const pad = (n: number) => String(n).padStart(2, "0");
export const pieces = (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`;

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
