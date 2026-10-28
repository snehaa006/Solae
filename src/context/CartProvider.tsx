import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { byId, isColorKey, isSize, type ColorKey, type ProductId, type Size } from "../data/catalog";
import { CartContext, type Cart, type CartLine } from "./cart";
import { useToast } from "./toast";

const CART_KEY = "solae-cart-v2";

const isLine = (l: unknown): l is CartLine => {
  if (typeof l !== "object" || l === null) return false;
  const x = l as Record<string, unknown>;
  return !!byId(x.id as string) && isColorKey(x.color) && isSize(x.size)
    && typeof x.key === "string" && typeof x.extra === "string"
    && typeof x.qty === "number" && x.qty > 0;
};

function load(): CartLine[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter(isLine) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const { pathname } = useLocation();
  const [lines, setLines] = useState(load);
  // the bag remembers which page it was opened on, so moving to another page closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(lines)); } catch { /* private mode */ }
  }, [lines]);

  const add = useCallback((id: ProductId, color?: ColorKey, size: Size = "m", extra = "") => {
    const p = byId(id);
    const c = color ?? p.colors[0];
    if (!c) return;
    const x = extra || (p.stitch?.[0] ?? "");
    const key = [id, c, size, x].join("|");
    setLines(ls => ls.some(l => l.key === key)
      ? ls.map(l => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
      : [...ls, { key, id, color: c, size, extra: x, qty: 1 }]);
    toast(`${p.name} added to your bag`);
  }, [toast]);

  const changeQty = useCallback((key: string, delta: number) => {
    setLines(ls => ls.flatMap(l => (l.key !== key ? [l] : l.qty + delta > 0 ? [{ ...l, qty: l.qty + delta }] : [])));
  }, []);

  const open = useCallback(() => setOpenOn(pathname), [pathname]);
  const close = useCallback(() => setOpenOn(null), []);

  const cart = useMemo<Cart>(() => ({
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((n, l) => n + l.qty * byId(l.id).price, 0),
    add, changeQty, isOpen, open, close,
  }), [lines, add, changeQty, isOpen, open, close]);

  return <CartContext value={cart}>{children}</CartContext>;
}
