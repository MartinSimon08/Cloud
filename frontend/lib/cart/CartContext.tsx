"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { PublicMenuItem } from "@/lib/templates/menuData";

export interface CartLine {
  item: PublicMenuItem;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: PublicMenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Per-menu-view cart state — ephemeral (no persistence), reset on page reload. The order itself is only ever sent as a WhatsApp message, never stored. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  function addItem(item: PublicMenuItem) {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  function increment(id: string) {
    setLines((prev) => prev.map((l) => (l.item.id === id ? { ...l, qty: l.qty + 1 } : l)));
  }

  function decrement(id: string) {
    setLines((prev) => prev.map((l) => (l.item.id === id ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0));
  }

  function removeItem(id: string) {
    setLines((prev) => prev.filter((l) => l.item.id !== id));
  }

  function clear() {
    setLines([]);
  }

  const totalItems = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const totalPrice = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.item.price, 0), [lines]);

  return (
    <CartContext.Provider value={{ lines, totalItems, totalPrice, addItem, increment, decrement, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
