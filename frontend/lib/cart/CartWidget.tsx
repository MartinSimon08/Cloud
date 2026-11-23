"use client";

import { useState, type CSSProperties } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { whatsappHref } from "@/lib/whatsapp";

function formatPrice(n: number): string {
  return "$" + n.toFixed(2);
}

const qtyBtnStyle: CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: 6,
  border: "none",
  background: "#1f2937",
  color: "#fff",
  cursor: "pointer",
  lineHeight: 1,
};

/**
 * Floating cart bubble, bottom-left so it never collides with a template's
 * own bottom-right "ask about the menu" WhatsApp button. Hidden while the
 * cart is empty. Sending the order just opens a prefilled wa.me link — no
 * order is ever stored, this is a nicer WhatsApp message, not a checkout.
 */
export function CartWidget({ whatsapp, restaurantName }: { whatsapp?: string; restaurantName: string }) {
  const { lines, totalItems, totalPrice, increment, decrement, clear } = useCart();
  const [open, setOpen] = useState(false);

  if (totalItems === 0) return null;

  function buildMessage(): string {
    const itemLines = lines.map((l) => `- ${l.qty}x ${l.item.name} (${formatPrice(l.item.price)} c/u)`).join("\n");
    return `Hola! Quiero hacer este pedido de ${restaurantName}:\n${itemLines}\nTotal: ${formatPrice(totalPrice)}`;
  }

  function handleSend() {
    if (!whatsapp) return;
    window.open(whatsappHref(whatsapp, buildMessage()), "_blank", "noreferrer");
    clear();
    setOpen(false);
  }

  return (
    <div style={{ position: "fixed", left: 16, bottom: 16, zIndex: 50 }}>
      {open && (
        <div
          style={{
            marginBottom: 12,
            width: 300,
            maxWidth: "calc(100vw - 32px)",
            borderRadius: 16,
            background: "#111827",
            color: "#fff",
            padding: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Tu pedido</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 240, overflowY: "auto" }}>
            {lines.map((l) => (
              <div key={l.item.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ flex: 1 }}>{l.item.name}</span>
                <button type="button" onClick={() => decrement(l.item.id)} aria-label={`Quitar uno de ${l.item.name}`} style={qtyBtnStyle}>
                  −
                </button>
                <span>{l.qty}</span>
                <button type="button" onClick={() => increment(l.item.id)} aria-label={`Agregar uno más de ${l.item.name}`} style={qtyBtnStyle}>
                  +
                </button>
                <span style={{ width: 60, textAlign: "right" }}>{formatPrice(l.item.price * l.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {whatsapp ? (
            <button
              type="button"
              onClick={handleSend}
              style={{
                marginTop: 12,
                width: "100%",
                borderRadius: 999,
                background: "#25D366",
                color: "#06210f",
                fontWeight: 700,
                padding: "10px 0",
                border: "none",
                cursor: "pointer",
              }}
            >
              Enviar pedido por WhatsApp
            </button>
          ) : (
            <p style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
              Este restaurante todavía no cargó un WhatsApp para pedidos.
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ver tu pedido"
        style={{
          position: "relative",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#111827",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          fontSize: 24,
        }}
      >
        🛒
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            background: "#ef4444",
            color: "#fff",
            borderRadius: "50%",
            width: 22,
            height: 22,
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {totalItems}
        </span>
      </button>
    </div>
  );
}
