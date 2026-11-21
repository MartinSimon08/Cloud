"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import type { PublicPageData, TestimonialData } from "@/lib/templates/pageData";
import "./pagina6.css";

export type Pagina6Data = PublicPageData;

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7-6.4-7-11a7 7 0 1 1 14 0c0 4.6-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function socialHref(platform: "instagram" | "facebook", value: string): string {
  if (value.startsWith("http")) return value;
  const handle = value.replace(/^@/, "");
  return platform === "instagram" ? `https://instagram.com/${handle}` : `https://facebook.com/${handle}`;
}

function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function scrollToIndex(next: number) {
    const normalized = (next + testimonials.length) % testimonials.length;
    indexRef.current = normalized;
    const el = containerRef.current;
    if (el) el.scrollTo({ left: normalized * el.clientWidth, behavior: "smooth" });
  }

  function resetAutoplay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => scrollToIndex(indexRef.current + 1), 5000);
  }

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  return (
    <div className="carousel-wrapper">
      <div className="container-testimonials" ref={containerRef}>
        {testimonials.map((t) => (
          <div className="testimonial" key={t.id}>
            <p>{t.quote}</p>
            {t.photoUrl && (
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.photoUrl} alt={t.name} />
              </figure>
            )}
            <h3>{t.name}</h3>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn-carousel btn-prev"
        onClick={() => {
          scrollToIndex(indexRef.current - 1);
          resetAutoplay();
        }}
        aria-label="Testimonio anterior"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className="btn-carousel btn-next"
        onClick={() => {
          scrollToIndex(indexRef.current + 1);
          resetAutoplay();
        }}
        aria-label="Testimonio siguiente"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export function Pagina6Page({ data }: { data: Pagina6Data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const hasContactInfo = data.address || data.phone || data.email || data.hours;
  const heroHeadline = data.hero?.headline || data.name;
  const heroTagline = data.hero?.tagline || data.description;
  const aboutTitle = data.about?.title || data.name;
  const aboutImage = data.about?.imageUrl || data.logoUrl;
  const hasMainDishes = data.mainDishes && data.mainDishes.length > 0;
  const hasDailyOffer = !!data.dailyOffer?.title;
  const hasWhyUs = data.whyUs?.title || data.whyUs?.description || data.whyUs?.stat || (data.whyUs?.features?.length ?? 0) > 0;
  const hasTestimonials = data.testimonials && data.testimonials.length > 0;
  const hasBlogPosts = data.blogPosts && data.blogPosts.length > 0;

  return (
    <div className="pagina6">
      <header>
        <div className="container header-expand">
          <a href="#top" className="container-logo">
            {data.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt={data.name} />
            ) : (
              <span className="img-placeholder" style={{ width: 50, height: 50, borderRadius: 999 }}>
                {data.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <span>{data.name}</span>
          </a>

          <nav>
            <ul>
              <li><a href="#top">Inicio</a></li>
              <li><a href="#about">Acerca</a></li>
              <li><a href="#contact">Contacto</a></li>
              <li><Link href={data.menuHref}>Menú</Link></li>
            </ul>
          </nav>

          <Link href={data.menuHref} className="btn btn-primary">
            Ver menú <ArrowIcon />
          </Link>

          <button type="button" className="btn-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
            {menuOpen ? <XIcon /> : <BarsIcon />}
          </button>
        </div>

        <div className={`menu-responsive${menuOpen ? " show" : ""}`}>
          <ul>
            <li><a href="#top" onClick={() => setMenuOpen(false)}>Inicio</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>Acerca</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            <li><Link href={data.menuHref} onClick={() => setMenuOpen(false)}>Menú</Link></li>
          </ul>
        </div>
      </header>

      <main id="top">
        <section
          className="hero-banner"
          style={data.coverUrl ? { backgroundImage: `url(${data.coverUrl})` } : undefined}
        >
          {!data.coverUrl && <div className="img-placeholder" style={{ position: "absolute", inset: 0, zIndex: -2 }}>Sin portada</div>}
          <div className="container">
            <div className="content">
              <span className="badge">Bienvenidos</span>
              <h1>{heroHeadline}</h1>
              {heroTagline && <p>{heroTagline}</p>}
              <div className="container-button">
                <Link href={data.menuHref} className="btn btn-primary">
                  Ver menú <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {(data.description || data.about) && (
          <section className="background-dark-1 section-about" id="about">
            <div className="container">
              <div className="container-images">
                {aboutImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={aboutImage} className="main-image" alt={aboutTitle} />
                ) : (
                  <div className="main-image img-placeholder">{aboutTitle}</div>
                )}
                {data.about?.stat && (
                  <div className="card-info">
                    <h3>{data.about.stat}</h3>
                  </div>
                )}
              </div>
              <div className="content">
                <span className="badge">Sobre nosotros</span>
                <h2 className="title">{aboutTitle}</h2>
                {data.description && <p>{data.description}</p>}
                {data.about?.bullets && data.about.bullets.length > 0 && (
                  <ul>
                    {data.about.bullets.map((bullet) => (
                      <li key={bullet}>
                        <CheckIcon />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="container-buttons">
                  <Link href={data.menuHref} className="btn btn-primary">
                    Ver menú <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {hasMainDishes && (
          <section className="background-dark-2 section-main-dishes">
            <div className="container">
              <div className="content">
                <span className="badge">Nuestra propuesta</span>
                <h2 className="title">Platos destacados</h2>
                <div className="container-dishes">
                  {data.mainDishes!.map((dish) => (
                    <div className="container-dish" key={dish.id}>
                      {dish.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={dish.imageUrl} alt={dish.title} />
                      ) : (
                        <div className="img-placeholder" style={{ width: 160, height: 160, borderRadius: 999, margin: "0 auto 20px" }}>
                          {dish.title}
                        </div>
                      )}
                      <div className="dish-info">
                        <h3>{dish.title}</h3>
                        {dish.description && <p>{dish.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {hasDailyOffer && (
          <section className="background-dark-1 section-daily-offers">
            <div className="container">
              <div className="container-images">
                {data.dailyOffer!.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.dailyOffer!.imageUrl} alt={data.dailyOffer!.title} className="main-image" />
                ) : (
                  <div className="main-image img-placeholder">{data.dailyOffer!.title}</div>
                )}
                <div className="card-info">
                  <h3>{data.dailyOffer!.title}</h3>
                  {data.dailyOffer!.ingredients && data.dailyOffer!.ingredients!.length > 0 && (
                    <ul>
                      {data.dailyOffer!.ingredients!.map((ing) => (
                        <li key={ing}>
                          <CheckIcon />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="content">
                <span className="badge">Oferta especial</span>
                <h2 className="title">La elección de hoy</h2>
                <div className="container-buttons">
                  <Link href={data.menuHref} className="btn btn-primary">
                    Ver menú <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {hasWhyUs && (
          <section className="background-dark-2 section-our-ingredients">
            <div className="container">
              <div className="container-images">
                {data.whyUs!.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.whyUs!.imageUrl} alt={data.whyUs!.title ?? data.name} className="main-image" />
                ) : (
                  <div className="main-image img-placeholder">{data.whyUs!.title ?? data.name}</div>
                )}
                {data.whyUs!.stat && (
                  <div className="card-customers">
                    <p>{data.whyUs!.stat}</p>
                  </div>
                )}
              </div>
              <div className="content">
                <span className="badge">Por qué elegirnos</span>
                {data.whyUs!.title && <h2 className="title">{data.whyUs!.title}</h2>}
                {data.whyUs!.description && <p>{data.whyUs!.description}</p>}
                {data.whyUs!.features && data.whyUs!.features!.length > 0 && (
                  <div className="container-options">
                    {data.whyUs!.features!.map((feature) => (
                      <div className="container-option" key={feature}>
                        <CheckIcon />
                        <h3>{feature}</h3>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {hasTestimonials && (
          <section
            className="section-testimonials"
            style={
              data.about?.imageUrl || data.coverUrl
                ? { backgroundImage: `url(${data.about?.imageUrl || data.coverUrl})` }
                : undefined
            }
          >
            <div className="container">
              <div className="content">
                <span className="badge">Testimonios</span>
                <h2 className="title">Lo que dicen nuestros clientes</h2>
                <TestimonialsCarousel testimonials={data.testimonials!} />
              </div>
            </div>
          </section>
        )}

        {hasBlogPosts && (
          <section className="background-dark-1 section-blog">
            <div className="container">
              <div className="content">
                <span className="badge">Novedades</span>
                <h2 className="title">Últimas publicaciones</h2>
                <div className="container-blogs">
                  {data.blogPosts!.map((post) => (
                    <div className="container-blog" key={post.id}>
                      <a href={post.link || "#"} target={post.link ? "_blank" : undefined} rel="noreferrer" className="container-img">
                        <figure>
                          {post.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.imageUrl} alt={post.title} />
                          ) : (
                            <div className="img-placeholder" style={{ height: 300 }}>{post.title}</div>
                          )}
                        </figure>
                      </a>
                      <div className="blog-info">
                        <h3>
                          <a href={post.link || "#"} target={post.link ? "_blank" : undefined} rel="noreferrer">
                            {post.title}
                          </a>
                        </h3>
                        {post.link && (
                          <div className="container-button">
                            <a href={post.link} target="_blank" rel="noreferrer" className="btn-read-more">
                              Leer más <ArrowIcon />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {hasContactInfo && (
          <section className="background-dark-2 section-contact" id="contact">
            <div className="container">
              <div className="content">
                <span className="badge">Visitanos</span>
                <h2 className="title">Contacto</h2>
                <ul className="info-list">
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
                {(data.instagram || data.facebook || data.whatsapp) && (
                  <div className="social-links">
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
                      <a
                        href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre ${data.name}.`)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="WhatsApp"
                      >
                        <WhatsAppIcon />
                      </a>
                    )}
                  </div>
                )}
              </div>
              {data.mapsUrl && (
                <div className="map-card">
                  <a href={data.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Ver en Google Maps <ArrowIcon />
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="background-dark-1">
        <div className="container">
          <div className="content">
            <div className="container-logo">
              {data.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.logoUrl} alt={data.name} />
              ) : (
                <span className="img-placeholder" style={{ width: 50, height: 50, borderRadius: 999 }}>
                  {data.name.slice(0, 1).toUpperCase()}
                </span>
              )}
              <span>{data.name}</span>
            </div>
            <ul>
              {data.address && (
                <li><LocationIcon /><span>{data.address}</span></li>
              )}
              {data.phone && (
                <li><PhoneIcon /><span>{data.phone}</span></li>
              )}
            </ul>
          </div>

          <div className="container-social-copyright">
            <ul>
              {data.instagram && (
                <li><a href={socialHref("instagram", data.instagram)} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a></li>
              )}
              {data.facebook && (
                <li><a href={socialHref("facebook", data.facebook)} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a></li>
              )}
              {data.whatsapp && (
                <li>
                  <a
                    href={whatsappHref(data.whatsapp, `Hola! Quería hacer una consulta sobre ${data.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </a>
                </li>
              )}
            </ul>
            <p>&copy; {new Date().getFullYear()} {data.name}. Todos los derechos reservados.</p>
          </div>
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
