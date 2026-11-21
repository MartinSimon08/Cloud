"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import type { PublicPageData, TestimonialData } from "@/lib/templates/pageData";
import "./pagina4.css";

export type Pagina4Data = PublicPageData;

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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 9.2 8.6 2 9.3l5.5 4.6L5.8 21 12 17.3 18.2 21l-1.7-7.1L22 9.3l-7.2-.7Z" />
    </svg>
  );
}
function PrevIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function NextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m18 15-6-6-6 6" />
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
    <>
      <div className="testimonial-quote-mark">&rdquo;</div>
      <p className="testimonial-text">{current.quote}</p>
      {current.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={current.photoUrl} alt={current.name} className="testimonial-avatar" />
      ) : (
        <div className="testimonial-avatar-placeholder">{current.name.slice(0, 1).toUpperCase()}</div>
      )}
      <p className="testimonial-name">{current.name}</p>
      {testimonials.length > 1 && (
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
      )}
    </>
  );
}

function HeroSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function resetAutoplay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
  }

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className="hero-slider">
      {images.map((url, i) => (
        <div
          key={url}
          className={`hero-slide${i === index ? " active" : ""}`}
          style={{ backgroundImage: `url(${url})` }}
        />
      ))}
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="hero-slider-btn prev"
            onClick={() => {
              setIndex((i) => (i - 1 + images.length) % images.length);
              resetAutoplay();
            }}
            aria-label="Imagen anterior"
          >
            <PrevIcon />
          </button>
          <button
            type="button"
            className="hero-slider-btn next"
            onClick={() => {
              setIndex((i) => (i + 1) % images.length);
              resetAutoplay();
            }}
            aria-label="Imagen siguiente"
          >
            <NextIcon />
          </button>
          <div className="hero-slider-dots">
            {images.map((url, i) => (
              <button
                key={url}
                type="button"
                className={`hero-slider-dot${i === index ? " active" : ""}`}
                onClick={() => {
                  setIndex(i);
                  resetAutoplay();
                }}
                aria-label={`Ir a la imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Pagina4Page({ data }: { data: Pagina4Data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowBackTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroHeadline = data.hero?.headline || data.name;
  const heroTagline = data.hero?.tagline || data.description;
  const hasContactInfo = data.address || data.phone || data.email || data.hours;
  const hasDishes = data.mainDishes && data.mainDishes.length > 0;
  const heroImages = Array.from(
    new Set(
      [data.coverUrl, ...(data.mainDishes ?? []).map((d) => d.imageUrl), data.about?.imageUrl].filter(
        (url): url is string => !!url,
      ),
    ),
  ).slice(0, 5);
  const hasDailyOffer = !!data.dailyOffer?.title;
  const hasTestimonials = data.testimonials && data.testimonials.length > 0;
  const hasFeatures = (data.whyUs?.features?.length ?? 0) > 0;
  const hasBlogPosts = data.blogPosts && data.blogPosts.length > 0;

  return (
    <div className="pagina4" id="top">
      {hasContactInfo && (
        <div className="topbar">
          {data.address && (
            <div className="item">
              <LocationIcon />
              <span>{data.address}</span>
            </div>
          )}
          {data.hours && (
            <div className="item hide-mobile">
              <ClockIcon />
              <span>{data.hours}</span>
            </div>
          )}
          {data.phone && (
            <div className="item hide-mobile">
              <PhoneIcon />
              <span>{data.phone}</span>
            </div>
          )}
          {data.email && (
            <div className="item hide-mobile">
              <MailIcon />
              <span>{data.email}</span>
            </div>
          )}
        </div>
      )}

      <header className="header">
        <a href="#top" className="brand-name">
          {data.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoUrl} alt={data.name} className="logo-badge" />
          ) : null}
          {data.name}
        </a>
        <nav className="nav-items">
          <a href="#top">Inicio</a>
          {hasDishes && <a href="#menu">Menú</a>}
          <a href="#about">Sobre Nosotros</a>
          {hasContactInfo && <a href="#contact">Contacto</a>}
          <Link href={data.menuHref} className="btn">
            Ver menú
          </Link>
        </nav>
        <button type="button" className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
          {menuOpen ? <XIcon /> : <BarsIcon />}
        </button>
      </header>

      {menuOpen && (
        <div className="nav-mobile open">
          <a href="#top" onClick={() => setMenuOpen(false)}>Inicio</a>
          {hasDishes && <a href="#menu" onClick={() => setMenuOpen(false)}>Menú destacado</a>}
          <a href="#about" onClick={() => setMenuOpen(false)}>Sobre Nosotros</a>
          {hasContactInfo && <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>}
          <Link href={data.menuHref} onClick={() => setMenuOpen(false)}>Ver menú completo</Link>
        </div>
      )}

      <section className="hero">
        {heroImages.length > 0 && <HeroSlider images={heroImages} />}
        <div className="hero-content">
          <p className="subtitle">Pasión por la cocina</p>
          <h1>{heroHeadline}</h1>
          {heroTagline && <p>{heroTagline}</p>}
          <Link href={data.menuHref} className="btn">
            Ver nuestro menú
          </Link>
        </div>
      </section>

      {(data.description || data.about) && (
        <section className="section" id="about">
          <div className="about-grid">
            {data.about?.imageUrl || data.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.about?.imageUrl || data.coverUrl} alt={data.about?.title || data.name} />
            ) : (
              <div className="img-placeholder">{data.name}</div>
            )}
            <div>
              <p className="section-subtitle">Nuestra Historia</p>
              <h2 className="section-title">{data.about?.title || data.name}</h2>
              {data.description && <p className="section-text" style={{ margin: 0 }}>{data.description}</p>}
              {data.about?.bullets && data.about.bullets.length > 0 && (
                <ul style={{ listStyle: "none", marginTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {data.about.bullets.map((bullet) => (
                    <li key={bullet} style={{ color: "var(--muted)", display: "flex", gap: 8 }}>
                      <StarIcon />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {data.phone && (
                <>
                  <div className="contact-label">Llamar</div>
                  <a href={`tel:${data.phone}`} className="contact-number">{data.phone}</a>
                </>
              )}
              <div>
                <Link href={data.menuHref} className="btn">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {hasDailyOffer && (
        <section className="special-dish">
          <div
            className="banner"
            style={data.dailyOffer!.imageUrl ? { backgroundImage: `url(${data.dailyOffer!.imageUrl})` } : undefined}
          />
          <div className="content">
            <p className="section-subtitle">Plato especial</p>
            <h2 className="section-title">{data.dailyOffer!.title}</h2>
            {data.dailyOffer!.ingredients && data.dailyOffer!.ingredients!.length > 0 && (
              <ul className="ingredients">
                {data.dailyOffer!.ingredients!.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            )}
            <div>
              <Link href={data.menuHref} className="btn">
                Ver menú
              </Link>
            </div>
          </div>
        </section>
      )}

      {hasDishes && (
        <section className="section bg-alt" id="menu">
          <p className="section-subtitle">Platos recomendados</p>
          <h2 className="section-title">Nuestro Menú</h2>
          <div className="menu-grid">
            {data.mainDishes!.map((dish) => (
              <div className="menu-card" key={dish.id}>
                {dish.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={dish.imageUrl} alt={dish.title} className="thumb" />
                ) : (
                  <div className="thumb-placeholder">{dish.title.slice(0, 1).toUpperCase()}</div>
                )}
                <div>
                  <div className="title-row">
                    <Link href={data.menuHref}>{dish.title}</Link>
                    {dish.price !== undefined && <span className="price">{formatPrice(dish.price)}</span>}
                  </div>
                  {dish.description && <p>{dish.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasTestimonials && (
        <section
          className="section"
          style={data.coverUrl ? { backgroundImage: `linear-gradient(rgba(10,8,6,0.88), rgba(10,8,6,0.88)), url(${data.coverUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        >
          <TestimonialsCarousel testimonials={data.testimonials!} />
        </section>
      )}

      {hasContactInfo && (
        <section className="section" id="contact">
          <div className="contact-panel">
            <div className="side side-left">
              <p className="section-subtitle">Contanos</p>
              <h2 className="section-title" style={{ margin: 0 }}>¿Hacemos una reserva?</h2>
              <p className="section-text" style={{ marginBottom: 0 }}>
                Escribinos y coordinamos todo.
              </p>
              {data.whatsapp && (
                <a href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre ${data.name}.`)} target="_blank" rel="noreferrer" className="btn">
                  Escribinos por WhatsApp
                </a>
              )}
            </div>
            <div className="side side-right">
              <p className="section-subtitle">Llamanos</p>
              {data.phone && <a href={`tel:${data.phone}`} className="contact-number" style={{ display: "block", marginBottom: 8 }}>{data.phone}</a>}
              {data.address && (
                <div className="contact-row">
                  <LocationIcon />
                  <span>{data.address}</span>
                </div>
              )}
              {data.email && (
                <div className="contact-row">
                  <MailIcon />
                  <span>{data.email}</span>
                </div>
              )}
              {data.hours && (
                <div className="contact-row">
                  <ClockIcon />
                  <span>{data.hours}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {hasFeatures && (
        <section className="section">
          <p className="section-subtitle">¿Por qué elegirnos?</p>
          <h2 className="section-title">{data.whyUs?.title || "Nuestros valores"}</h2>
          {data.whyUs?.description && <p className="section-text">{data.whyUs.description}</p>}
          <div className="features-grid">
            {data.whyUs!.features!.map((feature) => (
              <div className="feature-card" key={feature}>
                <div className="icon-badge">
                  <StarIcon />
                </div>
                <h3>{feature}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasBlogPosts && (
        <section className="section bg-alt">
          <p className="section-subtitle">Anuncios</p>
          <h2 className="section-title">Novedades</h2>
          <div className="event-grid">
            {data.blogPosts!.map((post) => (
              <a
                key={post.id}
                href={post.link || data.menuHref}
                target={post.link ? "_blank" : undefined}
                rel="noreferrer"
                className="event-card"
              >
                <div className="banner">
                  {post.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.imageUrl} alt={post.title} />
                  ) : (
                    <div className="img-placeholder">{post.title}</div>
                  )}
                </div>
                <h3>{post.title}</h3>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer>
        <div className="footer-grid">
          <div>
            <h4>{data.name}</h4>
            {data.address && (
              <div className="contact-row">
                <LocationIcon />
                <span>{data.address}</span>
              </div>
            )}
            {data.email && (
              <div className="contact-row">
                <MailIcon />
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="contact-row">
                <PhoneIcon />
                <span>{data.phone}</span>
              </div>
            )}
            {data.hours && (
              <div className="contact-row">
                <ClockIcon />
                <span>{data.hours}</span>
              </div>
            )}
          </div>

          <div>
            <h4>Explorá</h4>
            <ul className="footer-links">
              <li><a href="#top">Inicio</a></li>
              <li><Link href={data.menuHref}>Menú</Link></li>
              <li><a href="#about">Sobre Nosotros</a></li>
              {hasContactInfo && <li><a href="#contact">Contacto</a></li>}
            </ul>
          </div>

          {(data.instagram || data.facebook || data.whatsapp || data.mapsUrl) && (
            <div>
              <h4>Seguinos</h4>
              <ul className="footer-links">
                {data.instagram && (
                  <li>
                    <a href={socialHref("instagram", data.instagram)} target="_blank" rel="noreferrer">
                      <InstagramIcon /> Instagram
                    </a>
                  </li>
                )}
                {data.facebook && (
                  <li>
                    <a href={socialHref("facebook", data.facebook)} target="_blank" rel="noreferrer">
                      <FacebookIcon /> Facebook
                    </a>
                  </li>
                )}
                {data.whatsapp && (
                  <li>
                    <a href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre ${data.name}.`)} target="_blank" rel="noreferrer">
                      <WhatsAppIcon /> WhatsApp
                    </a>
                  </li>
                )}
                {data.mapsUrl && (
                  <li>
                    <a href={data.mapsUrl} target="_blank" rel="noreferrer">
                      <LocationIcon /> Google Maps
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="footer-bottom">&copy; {new Date().getFullYear()} {data.name}. Todos los derechos reservados.</div>
      </footer>

      {showBackTop && (
        <a href="#top" className="back-top-btn" aria-label="Volver arriba">
          <ChevronUpIcon />
        </a>
      )}

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
