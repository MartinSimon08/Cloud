"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import type { PublicPageData, TestimonialData } from "@/lib/templates/pageData";
import "./pagina5.css";

export type Pagina5Data = PublicPageData;

function BarsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7-6.4-7-11a7 7 0 1 1 14 0c0 4.6-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
function QuoteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.6 8.4c-2.4 0-4.2 1.9-4.2 4.5 0 2.3 1.6 3.9 3.6 3.9 1.6 0 2.8-1.1 2.8-2.7 0-1.4-.9-2.4-2.2-2.5.2-1.5 1.5-2.7 3.1-3V6.4c-1.5.2-3.1 1-4.1 2.4zm9.2 0c-2.4 0-4.2 1.9-4.2 4.5 0 2.3 1.6 3.9 3.6 3.9 1.6 0 2.8-1.1 2.8-2.7 0-1.4-.9-2.4-2.2-2.5.2-1.5 1.5-2.7 3.1-3V6.4c-1.5.2-3.1 1-4.1 2.4z" />
    </svg>
  );
}
function PrevIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function NextIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function LeafBadgeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 21c8-2 10-10 9-17-7-1-15 1-17 9-1 4 1 7 4 8Z" /><path d="M9 15 20 4" />
    </svg>
  );
}

function SearchPlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15.5" y2="15.5" /><line x1="10" y1="7" x2="10" y2="13" /><line x1="7" y1="10" x2="13" y2="10" />
    </svg>
  );
}

function socialHref(platform: "instagram" | "facebook", value: string): string {
  if (value.startsWith("http")) return value;
  const handle = value.replace(/^@/, "");
  return platform === "instagram" ? `https://instagram.com/${handle}` : `https://facebook.com/${handle}`;
}

function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialData[] }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function resetAutoplay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
  }

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <div className="testimonial-quote">
      <QuoteIcon />
      <p>{current.quote}</p>
      {current.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={current.photoUrl} alt={current.name} className="testimonial-avatar" />
      ) : (
        <div className="testimonial-avatar-placeholder">{current.name.slice(0, 1).toUpperCase()}</div>
      )}
      <p className="testimonial-name">{current.name}</p>

      {testimonials.length > 1 && (
        <>
          <div className="testimonial-nav">
            <button
              type="button"
              onClick={() => {
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
                resetAutoplay();
              }}
              aria-label="Testimonio anterior"
            >
              <PrevIcon />
            </button>
            <button
              type="button"
              onClick={() => {
                setIndex((i) => (i + 1) % testimonials.length);
                resetAutoplay();
              }}
              aria-label="Testimonio siguiente"
            >
              <NextIcon />
            </button>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={i === index ? "active" : ""}
                onClick={() => {
                  setIndex(i);
                  resetAutoplay();
                }}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Pagina5Page({ data }: { data: Pagina5Data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroHeadline = data.hero?.headline || data.name;
  const heroTagline = data.hero?.tagline || data.description;
  const hasDishes = data.mainDishes && data.mainDishes.length > 0;
  const hasFeatures = (data.whyUs?.features?.length ?? 0) > 0;
  const hasTestimonials = data.testimonials && data.testimonials.length > 0;
  const hasBlogPosts = data.blogPosts && data.blogPosts.length > 0;
  const hasContactInfo = data.address || data.phone || data.email || data.hours;
  const galleryImages = Array.from(
    new Set(
      [
        data.about?.imageUrl,
        data.whyUs?.imageUrl,
        ...(data.mainDishes ?? []).map((d) => d.imageUrl),
        ...(data.blogPosts ?? []).map((b) => b.imageUrl),
      ].filter((url): url is string => !!url),
    ),
  ).slice(0, 6);
  const hasGallery = galleryImages.length >= 3;

  return (
    <div className="pagina5">
      <div className="topbar" id="top">
        <a href="#top" className="logo">
          {data.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoUrl} alt={data.name} className="logo-badge" />
          ) : (
            <span>☕</span>
          )}
          {data.name}
        </a>
        <button type="button" className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
          {menuOpen ? <XIcon /> : <BarsIcon />}
        </button>
      </div>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <Link href={data.menuHref} onClick={() => setMenuOpen(false)}>Ver menú</Link>
        {hasContactInfo && <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>}
        {data.instagram && (
          <a href={socialHref("instagram", data.instagram)} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Instagram
          </a>
        )}
      </div>

      <section className="hero" style={data.coverUrl ? { backgroundImage: `url(${data.coverUrl})` } : undefined}>
        <div className="hero-content">
          <h1>
            <span>{heroHeadline}</span>
          </h1>
          {heroTagline && <p>{heroTagline}</p>}
          <Link href={data.menuHref} className="btn">
            Ver menú
          </Link>
        </div>
      </section>

      {hasDishes && (
        <section className="section">
          <div className="container">
            <div className="heading">
              <h5>{data.name}</h5>
              <h2>Productos destacados</h2>
            </div>
            <div className="dish-strip">
              {data.mainDishes!.map((dish) => (
                <div className="dish-item" key={dish.id}>
                  {dish.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dish.imageUrl} alt={dish.title} />
                  ) : (
                    <div className="img-placeholder">{dish.title}</div>
                  )}
                  <h3>{dish.title}</h3>
                  {dish.description && <p>{dish.description}</p>}
                  {dish.price !== undefined && <div className="price">${dish.price.toFixed(2)}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(data.description || data.about) && (
        <section
          className="wrapper"
          style={
            data.about?.imageUrl || data.coverUrl
              ? { backgroundImage: `url(${data.about?.imageUrl || data.coverUrl})` }
              : undefined
          }
        >
          <div className="left">
            <h1>
              <span>{data.about?.title || data.name}</span>
            </h1>
            {data.description && <p className="lead">{data.description}</p>}
            {data.address && (
              <div className="location">
                <LocationIcon />
                <div>
                  <h5>Nuestra ubicación</h5>
                  <span>{data.address}</span>
                </div>
              </div>
            )}
            <div className="buttons">
              <Link href={data.menuHref} className="btn">
                Ver menú
              </Link>
              {hasContactInfo && (
                <a href="#contact" className="btn btn-outline-light">
                  Contactanos
                </a>
              )}
            </div>
          </div>
          <div className="right">
            {data.about?.imageUrl || data.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.about?.imageUrl || data.coverUrl} alt={data.name} />
            ) : (
              <div className="img-placeholder">{data.name}</div>
            )}
          </div>
        </section>
      )}

      {hasFeatures && (
        <section className="features">
          <div className="container features-grid">
            {data.whyUs!.features!.map((feature) => (
              <div className="box" key={feature}>
                <div className="icon-badge">
                  <LeafBadgeIcon />
                </div>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.hours && (
        <section className="section" id="hours">
          <div className="hours-card">
            <div className="icon-badge">
              <ClockIcon />
            </div>
            <h2>Horarios</h2>
            <p>{data.hours}</p>
          </div>
        </section>
      )}

      {hasTestimonials && (
        <section className="section testimonials">
          <div className="container">
            <TestimonialsCarousel testimonials={data.testimonials!} />
          </div>
        </section>
      )}

      {hasBlogPosts && (
        <section className="section">
          <div className="container">
            <div className="heading">
              <h5>Novedades</h5>
              <h2>Últimas publicaciones</h2>
            </div>
            <div className="blog-grid">
              {data.blogPosts!.map((post) => (
                <div className="blog-card" key={post.id}>
                  <div className="image">
                    {post.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.imageUrl} alt={post.title} />
                    ) : (
                      <div className="img-placeholder">{post.title}</div>
                    )}
                  </div>
                  <h3>{post.title}</h3>
                  {post.link && (
                    <a href={post.link} target="_blank" rel="noreferrer" className="read-more">
                      Leer más →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasGallery && (
        <section className="gallery">
          <div className="gallery-grid">
            {galleryImages.map((url, i) => (
              <a href={url} target="_blank" rel="noreferrer" className="box" key={`${url}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={data.name} />
                <div className="icon">
                  <SearchPlusIcon />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer style={data.coverUrl ? { backgroundImage: `url(${data.coverUrl})` } : undefined} id="contact">
        <div className="footer-overlay">
          <div className="footer-grid">
            <div>
              <h3>{data.name}</h3>
              {data.description && <p>{data.description}</p>}
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
              <div>
                <h3>Contacto</h3>
                {data.address && (
                  <div className="footer-item">
                    <LocationIcon />
                    <div>
                      <h5>Ubicación</h5>
                      <span>{data.address}</span>
                    </div>
                  </div>
                )}
                {data.phone && (
                  <div className="footer-item">
                    <PhoneIcon />
                    <div>
                      <h5>Teléfono</h5>
                      <span>{data.phone}</span>
                    </div>
                  </div>
                )}
                {data.email && (
                  <div className="footer-item">
                    <MailIcon />
                    <div>
                      <h5>Email</h5>
                      <span>{data.email}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <h3>Visitanos</h3>
              {data.hours && (
                <div className="footer-item">
                  <ClockIcon />
                  <div>
                    <h5>Horario</h5>
                    <span>{data.hours}</span>
                  </div>
                </div>
              )}
              {data.mapsUrl && (
                <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light">
                  Ver en Maps
                </a>
              )}
            </div>
          </div>
          <div className="legal">&copy; {new Date().getFullYear()} {data.name}. Todos los derechos reservados.</div>
        </div>
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
