"use client";

import type { CSSProperties } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { PublicMenuItem } from "@/lib/templates/menuData";

const defaultStyle: CSSProperties = {
  marginTop: 8,
  padding: "4px 12px",
  fontSize: 12,
  fontWeight: 700,
  borderRadius: 999,
  border: "1px solid currentColor",
  background: "transparent",
  cursor: "pointer",
  color: "inherit",
};

export function AddToCartButton({ item, style }: { item: PublicMenuItem; style?: CSSProperties }) {
  const { addItem } = useCart();
  return (
    <button type="button" onClick={() => addItem(item)} style={{ ...defaultStyle, ...style }}>
      + Agregar al pedido
    </button>
  );
}
