"use client";

import { useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import type { PublicPageData } from "@/lib/templates/pageData";
import "./pagina1.css";

export type Pagina1Data = PublicPageData;

function BarsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7-6.4-7-11a7 7 0 1 1 14 0c0 4.6-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.85 9.85 0 0 0 4.64 1.18h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.53 3.68-8.21 8.21-8.21 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.22-8.2 8.22Zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.23-.17-.47-.29Z" />
    </svg>
  );
}
function BowlIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 12h18a9 9 0 0 1-18 0Z" /><path d="M12 12V5" /><path d="M8 5a4 4 0 0 1 8 0" />
    </svg>
  );
}

function socialHref(platform: "instagram" | "facebook", value: string): string {
  if (value.startsWith("http")) return value;
  const handle = value.replace(/^@/, "");
  return platform === "instagram" ? `https://instagram.com/${handle}` : `https://facebook.com/${handle}`;
}

function formatPrice(n: number): string {
  return "$" + n.toFixed(2);
}

export function Pagina1Page({ data }: { data: Pagina1Data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroHeadline = data.hero?.headline || data.name;
  const heroTagline = data.hero?.tagline || data.description;
  const hasServices = (data.whyUs?.features?.length ?? 0) > 0;
  const hasDishes = data.mainDishes && data.mainDishes.length > 0;
  const hasContactInfo = data.address || data.phone || data.email || data.hours;

  return (
    <div className="pagina1">
      <header
        className="hero"
        id="top"
        style={
          data.coverUrl
            ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.35)), url(${data.coverUrl})` }
            : undefined
        }
      >
        <nav className="navbar">
          <div className="logo">
            {data.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt={data.name} className="logo-badge" />
            ) : (
              <span className="logo-placeholder">{data.name.slice(0, 1).toUpperCase()}</span>
            )}
            <span>{data.name}</span>
          </div>

          <div className="nav-items">
            <a href="#top">Inicio</a>
            {hasServices && <a href="#services">Servicios</a>}
            <a href="#about">Nosotros</a>
            {hasContactInfo && <a href="#contact">Contacto</a>}
            <Link href={data.menuHref} className="btn">
              Ver menú
            </Link>
          </div>

          <button type="button" className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
            {menuOpen ? <XIcon /> : <BarsIcon />}
          </button>
        </nav>

        <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
          <a href="#top" onClick={() => setMenuOpen(false)}>Inicio</a>
          {hasServices && <a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a>}
          <a href="#about" onClick={() => setMenuOpen(false)}>Nosotros</a>
          {hasContactInfo && <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>}
          <Link href={data.menuHref} onClick={() => setMenuOpen(false)}>Ver menú</Link>
        </div>

        <div className="hero-main">
          <p className="hero-eyebrow">Bienvenidos a</p>
          <h1 className="hero-heading">{heroHeadline}</h1>
          {heroTagline && <p className="hero-tagline">{heroTagline}</p>}
          <Link href={data.menuHref} className="btn">
            Ver menú
          </Link>
        </div>
      </header>

      {hasServices && (
        <section className="sec" id="services">
          <div className="head">
            <p className="eyebrow">Nuestros servicios</p>
            <h2>{data.whyUs?.title || "Por qué elegirnos"}</h2>
            {data.whyUs?.description && <p style={{ color: "#999", marginTop: 10 }}>{data.whyUs.description}</p>}
          </div>
          <div className="boxes">
            {data.whyUs!.features!.map((feature) => (
              <div className="box" key={feature}>
                <div className="box-icon">
                  <BowlIcon />
                </div>
                <h4>{feature}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.description || data.about) && (
        <section className="sec" id="about">
          <div className="about-heading">
            <div>
              <p className="eyebrow">Sobre nosotros</p>
              <h2>{data.about?.title || data.name}</h2>
            </div>
            {data.description && <p className="para">{data.description}</p>}
          </div>

          {hasDishes && (
            <div className="about-grid">
              {data.mainDishes!.map((dish) => (
                <div className="dish-card" key={dish.id}>
                  {dish.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dish.imageUrl} alt={dish.title} />
                  ) : (
                    <div className="img-placeholder">{dish.title}</div>
                  )}
                  <div className="dish-card-text">
                    <h4>{dish.title}</h4>
                    {dish.description && <p>{dish.description}</p>}
                    {dish.price !== undefined && <div className="dish-price">{formatPrice(dish.price)}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {hasContactInfo && (
        <section className="cta" id="contact">
          <div className="cta-box">
            <div>
              <p className="cta-eyebrow">Visitanos</p>
              <h2 className="cta-heading">Te esperamos en {data.name}</h2>
              {data.description && <p className="cta-text">{data.description}</p>}
              <ul className="cta-list">
                {data.address && (
                  <li><LocationIcon /><span>{data.address}</span></li>
                )}
                {data.phone && (
                  <li><PhoneIcon /><span>{data.phone}</span></li>
                )}
                {data.email && (
                  <li><MailIcon /><span>{data.email}</span></li>
                )}
                {data.hours && (
                  <li><ClockIcon /><span>{data.hours}</span></li>
                )}
              </ul>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={data.menuHref} className="btn">
                  Ver menú
                </Link>
                {data.mapsUrl && (
                  <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="btn" style={{ background: "transparent" }}>
                    Ver en Maps
                  </a>
                )}
              </div>
            </div>
            <div>
              {data.about?.imageUrl || data.mainDishes?.[0]?.imageUrl || data.coverUrl || data.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.about?.imageUrl || data.mainDishes?.[0]?.imageUrl || data.coverUrl || data.logoUrl}
                  alt={data.name}
                  className="cta-image"
                />
              ) : (
                <div className="cta-image-placeholder">{data.name}</div>
              )}
            </div>
          </div>
        </section>
      )}

      <footer>
        <div className="footer-container">
          <div>
            <div className="footer-logo">
              {data.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.logoUrl} alt={data.name} className="logo-badge" />
              ) : (
                <span className="logo-placeholder">{data.name.slice(0, 1).toUpperCase()}</span>
              )}
              <span>{data.name}</span>
            </div>
            {data.description && <p className="footer-text">{data.description}</p>}
            {(data.instagram || data.facebook || data.whatsapp) && (
              <div className="footer-socials">
                {data.instagram && (
                  <a href={socialHref("instagram", data.instagram)} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                )}
                {data.facebook && (
                  <a href={socialHref("facebook", data.facebook)} target="_blank" rel="noreferrer" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                )}
                {data.whatsapp && (
                  <a href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre ${data.name}.`)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                    <WhatsAppIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {hasContactInfo && (
            <div className="footer-col">
              <h4>Contacto</h4>
              <ul className="footer-links">
                {data.address && <li><LocationIcon /><span>{data.address}</span></li>}
                {data.phone && <li><PhoneIcon /><span>{data.phone}</span></li>}
                {data.email && <li><MailIcon /><span>{data.email}</span></li>}
                {data.hours && <li><ClockIcon /><span>{data.hours}</span></li>}
              </ul>
            </div>
          )}

          <div className="footer-col">
            <h4>Explorá</h4>
            <ul className="footer-links">
              <li><a href="#top">Inicio</a></li>
              <li><Link href={data.menuHref}>Menú</Link></li>
              {hasContactInfo && <li><a href="#contact">Contacto</a></li>}
            </ul>
          </div>
        </div>

        <div className="footer-bar">&copy; {new Date().getFullYear()} {data.name}. Todos los derechos reservados.</div>
      </footer>

      {data.whatsapp && (
        <a
          href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre ${data.name}.`)}
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
