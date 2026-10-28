import { createContext, use } from "react";
import type { ColorKey, ProductId, Size } from "../data/catalog";

export interface CartLine {
  /** id|colour|size|extra — one line per distinct variant */
  key: string;
  id: ProductId;
  color: ColorKey;
  size: Size;
  /** the flounce's seam choice, or "matching set" for pieces bought with a suit */
  extra: string;
  qty: number;
}

export interface Cart {
  lines: CartLine[];
  count: number;
  total: number;
  add: (id: ProductId, color?: ColorKey, size?: Size, extra?: string) => void;
  changeQty: (key: string, delta: number) => void;
  /** the bag drawer */
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const CartContext = createContext<Cart | null>(null);

export function useCart() {
  const cart = use(CartContext);
  if (!cart) throw new Error("useCart must be used inside <CartProvider>");
  return cart;
}
