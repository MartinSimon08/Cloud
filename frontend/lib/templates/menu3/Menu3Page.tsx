"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import type { PublicMenuData } from "@/lib/templates/menuData";
import "./menu3.css";

export type Menu3Data = PublicMenuData;

const UNCATEGORIZED = "Otros";

function formatPrice(n: number): string {
  return "$" + n.toFixed(2);
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.85 9.85 0 0 0 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.53 3.68-8.21 8.21-8.21 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.22-8.2 8.22Zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.23-.17-.47-.29Z" />
    </svg>
  );
}

export function Menu3Page({ data }: { data: Menu3Data }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of data.items) set.add(item.category?.trim() || UNCATEGORIZED);
    return Array.from(set);
  }, [data.items]);

  const [activeCategory, setActiveCategory] = useState("todos");

  const filtered = data.items.filter(
    (item) => activeCategory === "todos" || (item.category?.trim() || UNCATEGORIZED) === activeCategory
  );

  return (
    <div className="menu3">
      <header className="cover">
        <div className="cover-inner">
          <Link href={data.homeHref} className="back-link">
            ← Volver al inicio
          </Link>
          {data.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoUrl} alt={data.restaurantName} className="cover-logo" />
          )}
          <h1 className="cover-title">{data.restaurantName}</h1>
          {data.tagline && <p className="cover-desc">{data.tagline}</p>}
        </div>
      </header>

      <main>
        <nav className="tabs" aria-label="Categorías del menú">
          <button
            type="button"
            className={`tab${activeCategory === "todos" ? " active" : ""}`}
            onClick={() => setActiveCategory("todos")}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`tab${activeCategory === category ? " active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <section className="menu-grid">
          {filtered.length === 0 ? (
            <p className="empty-msg">No hay platos en esta categoría.</p>
          ) : (
            filtered.map((item) => (
              <article key={item.id} className="dish-card">
                <span className="dish-category">{item.category?.trim() || UNCATEGORIZED}</span>
                <div className="dish-top">
                  <span className="dish-name">{item.name}</span>
                  <span className="dish-price">{formatPrice(item.price)}</span>
                </div>
                {item.description && <p className="dish-desc">{item.description}</p>}
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="dish-ingredients">
                    {item.ingredients.map((ing) => (
                      <span key={ing} className="ingredient-tag">
                        {ing}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </section>
      </main>

      <footer>
        <p>{data.restaurantName}</p>
      </footer>

      {data.whatsapp && (
        <a
          href={whatsappHref(data.whatsapp, `Hola! Quería hacer un pedido del menú de ${data.restaurantName}.`)}
          target="_blank"
          rel="noreferrer"
          aria-label="Pedir por WhatsApp"
          title="Pedir por WhatsApp"
          className="whatsapp-float"
        >
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
