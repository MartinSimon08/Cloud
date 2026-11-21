"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import type { PublicMenuData } from "@/lib/templates/menuData";
import "./menu1.css";

export type Menu1Data = PublicMenuData;

const UNCATEGORIZED = "Otros";

function formatPrice(n: number): string {
  return "$" + n.toFixed(2);
}

function ForkKnifeIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 2v8M4 2v5a2 2 0 0 0 2 2 2 2 0 0 0 2-2V2M6 12v10" />
      <path d="M18 2c-2 0-3 2-3 5v3a2 2 0 0 0 2 2v10" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.85 9.85 0 0 0 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.53 3.68-8.21 8.21-8.21 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.22-8.2 8.22Zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.23-.17-.47-.29Z" />
    </svg>
  );
}

export function Menu1Page({ data }: { data: Menu1Data }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of data.items) set.add(item.category?.trim() || UNCATEGORIZED);
    return Array.from(set);
  }, [data.items]);

  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = data.items.filter((item) => {
    const matchesCategory = activeCategory === "todos" || (item.category?.trim() || UNCATEGORIZED) === activeCategory;
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term || item.name.toLowerCase().includes(term) || (item.description ?? "").toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu1">
      <header className="hero">
        <nav className="topbar">
          <Link href={data.homeHref} className="back-link">
            ← Volver al inicio
          </Link>
          <div className="logo">
            {data.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt={data.restaurantName} className="logo-badge" />
            )}
            {data.restaurantName}
          </div>
        </nav>
        <div className="hero-content">
          <h1>Nuestro Menú</h1>
          {data.tagline && <p>{data.tagline}</p>}
        </div>
      </header>

      <main>
        <section className="controls">
          <nav className="tabs" aria-label="Categorías del menú">
            <button type="button" className={`tab${activeCategory === "todos" ? " active" : ""}`} onClick={() => setActiveCategory("todos")}>
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
          <input
            type="text"
            className="search-input"
            placeholder="Buscar un plato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        <section className="menu-grid">
          {filtered.length === 0 ? (
            <p className="empty-msg">No se encontraron platos 😕</p>
          ) : (
            filtered.map((item) => (
              <article key={item.id} className="card">
                {item.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photoUrl} alt={item.name} className="card-img" />
                ) : (
                  <div className="card-img" aria-hidden="true">
                    <ForkKnifeIcon />
                  </div>
                )}
                <div className="card-body">
                  <div className="card-top">
                    <h3>{item.name}</h3>
                    <span className="price">{formatPrice(item.price)}</span>
                  </div>
                  {item.description && <p className="desc">{item.description}</p>}
                </div>
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
          href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre el menú de ${data.restaurantName}.`)}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribinos por WhatsApp"
          title="Escribinos por WhatsApp"
          className="whatsapp-float"
        >
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
