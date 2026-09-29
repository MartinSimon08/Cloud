"use client";

import { useState, useEffect } from "react";
import type { LandingContent } from "../_lib/types";
import { Faq } from "./Faq";
import { ContactForm } from "./ContactForm";

const displayFont = { fontFamily: "var(--font-fraunces)" };
const monoFont = { fontFamily: "var(--font-jetbrains-mono)" };

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 7.5l3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraScanIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function TemplateDesignIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function GlobeWebIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
    </svg>
  );
}

// Logo icon reproducing the cloche + fork + 3 pink rays from branding.jpeg
function TuMenuAhoraIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top Knob */}
      <circle cx="18" cy="4.5" r="2.8" fill="#4A90E2" />

      {/* Cloche Dome */}
      <path
        d="M 3 25 C 3 12 9.5 5.5 18 5.5 C 26.5 5.5 33 12 33 25 Z"
        fill="#5B9FE3"
      />

      {/* Bottom Platter Base */}
      <rect x="1" y="25" width="34" height="3.5" rx="1.75" fill="#4A90E2" />

      {/* Fork in crisp White */}
      <rect x="17" y="15" width="2" height="8" rx="1" fill="#FFFFFF" />
      <path
        d="M 14.5 13 C 14.5 16.5 21.5 16.5 21.5 13 Z"
        fill="#FFFFFF"
      />
      <rect x="14.5" y="9.5" width="1.3" height="4.5" rx="0.65" fill="#FFFFFF" />
      <rect x="17.35" y="9.5" width="1.3" height="4.5" rx="0.65" fill="#FFFFFF" />
      <rect x="20.2" y="9.5" width="1.3" height="4.5" rx="0.65" fill="#FFFFFF" />

      {/* 3 Pink Radiating Rays */}
      <line
        x1="31"
        y1="7"
        x2="35.5"
        y2="4"
        stroke="#FF6B8B"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <line
        x1="33.5"
        y1="12.5"
        x2="39"
        y2="11"
        stroke="#FF6B8B"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="18.5"
        x2="39.5"
        y2="18.5"
        stroke="#FF6B8B"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TicketCard({ ticket }: { ticket: LandingContent["hero"]["ticket"] }) {
  return (
    <div className="w-64 rounded-2xl border-2 border-slate-200 bg-white/95 p-4 shadow-xl shadow-sky-500/10 backdrop-blur dark:border-white/10 dark:bg-[#141824]/95 dark:shadow-2xl">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-[#F5F2EA]">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="flex-1 truncate">{ticket.title}</span>
        <span className="text-slate-400 dark:text-[#F5F2EA]/40" style={monoFont}>
          {ticket.time}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {ticket.rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-[#F5F2EA]/75"
          >
            <span className="font-bold text-sky-600 dark:text-sky-400">{row.qty}</span>
            <span className="flex-1 truncate">{row.name}</span>
            <span className="font-semibold text-slate-900 dark:text-[#F5F2EA]" style={monoFont}>
              {row.price}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-xs dark:border-white/10">
        <span className="text-slate-500 dark:text-[#F5F2EA]/50">{ticket.footLabel}</span>
        <span className="font-bold text-slate-900 dark:text-[#F5F2EA]" style={monoFont}>
          {ticket.total}
        </span>
      </div>
    </div>
  );
}

function PipelineCard({
  pipeline,
}: {
  pipeline: LandingContent["hero"]["pipeline"];
}) {
  return (
    <div className="w-56 rounded-2xl border-2 border-slate-200 bg-white/95 p-4 shadow-xl shadow-sky-500/10 backdrop-blur dark:border-white/10 dark:bg-[#141824]/95 dark:shadow-2xl">
      <div className="mb-3 text-xs font-bold text-slate-700 dark:text-[#F5F2EA]/75">
        {pipeline.title}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {pipeline.jobs.map((job) => (
          <div
            key={job.code}
            className={`rounded-xl px-2.5 py-2 text-xs border ${
              job.done
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/5 dark:bg-white/5 dark:text-slate-300"
            }`}
          >
            <div className="font-bold" style={monoFont}>
              {job.code}
            </div>
            <div
              className={`text-[11px] ${
                job.done ? "font-bold text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-[#F5F2EA]/45"
              }`}
              style={monoFont}
            >
              {job.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DomainCard({ brand }: { brand: string }) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl shadow-sky-500/10 dark:border-white/10 dark:bg-[#141824]">
      <div className="flex items-center gap-1.5 border-b border-slate-200 px-3 py-2.5 dark:border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF8EA8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFEB3B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#00C853]" />
        <span
          className="ml-2 truncate rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-[#0B0B0E] dark:text-[#F5F2EA]/50"
          style={monoFont}
        >
          {brand.toLowerCase()}.com
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-[#F5F2EA]">
          <TuMenuAhoraIcon className="h-5 w-5" />
          <span>{brand}</span>
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-16 rounded-full bg-sky-200 dark:bg-white/10" />
          <div className="h-2 w-10 rounded-full bg-pink-200 dark:bg-white/10" />
          <div className="h-2 w-12 rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
        <div className="h-16 rounded-xl bg-gradient-to-r from-sky-100 to-pink-100 dark:from-white/[.04] dark:to-white/[.02]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 rounded-lg bg-slate-100 dark:bg-white/[.04]" />
          <div className="h-10 rounded-lg bg-slate-100 dark:bg-white/[.04]" />
          <div className="h-10 rounded-lg bg-slate-100 dark:bg-white/[.04]" />
        </div>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-xl shadow-sky-500/10 dark:border-white/10 dark:bg-[#141824]">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
          S
        </div>
        <div className="text-xs">
          <div className="font-bold text-slate-800 dark:text-[#F5F2EA]">Soporte TuMenuAhora</div>
          <div className="flex items-center gap-1 text-slate-400 dark:text-[#F5F2EA]/45">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            En línea ahora
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[13px]">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-sky-500 px-3.5 py-2 text-white shadow-sm font-medium">
          Hola, ¿cómo configuro mis categorías de menú?
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-100 border border-slate-200/80 px-3.5 py-2 text-slate-700 dark:bg-white/10 dark:border-transparent dark:text-[#F5F2EA]/85">
          ¡Hola! Podés escanear tu carta física o armarla desde el panel en menos de 5 minutos. ¿Te ayudo por WhatsApp?
        </div>
      </div>
    </div>
  );
}

function FeatureVisual({
  kind,
  ticket,
  pipeline,
  brand,
}: {
  kind: LandingContent["features"]["rows"][number]["kind"];
  ticket: LandingContent["hero"]["ticket"];
  pipeline: LandingContent["hero"]["pipeline"];
  brand: string;
}) {
  switch (kind) {
    case "ticket":
      return <TicketCard ticket={ticket} />;
    case "pipeline":
      return <PipelineCard pipeline={pipeline} />;
    case "domain":
      return <DomainCard brand={brand} />;
    case "chat":
      return <ChatCard />;
  }
}

export function Landing({ content }: { content: LandingContent }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tumenuahora-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("tumenuahora-theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <div className="flex flex-1 flex-col bg-[#F8FAFC] text-slate-900 transition-colors duration-200 dark:bg-[#090D16] dark:text-[#F5F2EA]">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-300 bg-white/95 backdrop-blur-md shadow-xs dark:border-white/10 dark:bg-[#090D16]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
          <a
            href="#top"
            className="flex items-center gap-3 transition-transform hover:scale-102"
          >
            {/* Enlarged and sharp logo icon */}
            <TuMenuAhoraIcon className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 drop-shadow-xs" />
            <span className="text-xl sm:text-2xl font-black tracking-tight">
              <span className="text-[#4A90E2] dark:text-[#7CB3E9]">TuMenu</span>
              <span className="text-[#FF6B8B] dark:text-[#FF8EA8]">Ahora</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 dark:text-[#F5F2EA]/75 md:flex">
            {content.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-sky-600 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 dark:border-white/15 dark:bg-white/10 dark:text-amber-300 dark:hover:bg-white/20"
            >
              {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : <span className="h-4 w-4" />}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex rounded-full bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 text-sm font-bold shadow-xs transition-colors active:scale-[0.99]"
            >
              {content.nav.cta}
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-700 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 dark:border-white/15 dark:bg-white/10 dark:text-[#F5F2EA] dark:hover:bg-white/20 md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white/98 px-5 py-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#090D16]/98 md:hidden">
            <nav className="flex flex-col gap-1.5">
              {content.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-sky-50 hover:text-sky-600 dark:text-[#F5F2EA] dark:hover:bg-white/5 dark:hover:text-sky-400"
                >
                  <span>{link.label}</span>
                  <ArrowIcon />
                </a>
              ))}
              <div className="mt-2 pt-3 border-t border-slate-200 dark:border-white/10 sm:hidden">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-sm transition-colors active:scale-[0.99]"
                >
                  {content.nav.cta}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b-2 border-slate-300 bg-gradient-to-b from-sky-100/40 via-[#F8FAFC] to-slate-100/70 px-5 py-16 sm:py-24 dark:border-white/10 dark:from-[#0c1220] dark:via-[#090D16] dark:to-[#090D16]">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:items-center">
            <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <h1
                className="text-4xl leading-[1.15] font-bold text-slate-900 sm:text-5xl lg:text-[3.25rem] dark:text-white"
                style={displayFont}
              >
                {content.hero.headline[0]}{" "}
                <span className="text-sky-600 dark:text-[#7CB3E9]">{content.hero.headline[1]}</span>{" "}
                <span className="text-pink-500 dark:text-[#FF8EA8]">{content.hero.headline[2]}</span>{" "}
                <span className="text-slate-900 dark:text-white">{content.hero.headline[3]}</span>
              </h1>

              <p className="text-lg leading-relaxed text-slate-700 dark:text-[#F5F2EA]/75">
                {content.hero.sub}
              </p>

              <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
                <a
                  href="#contact"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white px-6 text-sm font-bold shadow-sm transition-colors active:scale-[0.99]"
                >
                  {content.hero.ctaPrimary}
                  <ArrowIcon />
                </a>
                <a
                  href="#pasos"
                  className="flex h-12 items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-xs transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  {content.hero.ctaSecondary}
                </a>
              </div>

              <div className="flex gap-8 pt-4 border-t border-slate-300 dark:border-white/10">
                {content.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-2xl font-black text-sky-600 dark:text-sky-400"
                      style={displayFont}
                    >
                      {stat.value}
                    </div>
                    <div className="max-w-24 text-xs font-semibold text-slate-500 dark:text-[#F5F2EA]/50">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smartphone & Interactive Visuals */}
            <div className="relative flex w-full max-w-sm flex-1 justify-center py-4">
              {/* Phone Mockup with simulated menu */}
              <div className="relative aspect-[9/18] w-64 rounded-[36px] border-4 border-slate-800 bg-slate-900 p-2.5 shadow-2xl shadow-sky-500/10 dark:border-slate-700 dark:bg-slate-950">
                {/* Screen */}
                <div className="flex h-full w-full flex-col overflow-hidden rounded-[26px] bg-slate-100 p-3 text-slate-900 dark:bg-[#111726] dark:text-white">
                  {/* Dynamic Island */}
                  <div className="mx-auto mb-2 h-3.5 w-16 rounded-full bg-slate-800/80 dark:bg-slate-700/80" />
                  
                  {/* Phone Header */}
                  <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-white/10">
                    <div className="flex items-center gap-1.5">
                      <TuMenuAhoraIcon className="h-4 w-4" />
                      <span className="text-[11px] font-bold">La Trattoria Dorada</span>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      Abierto
                    </span>
                  </div>

                  {/* Menu Category Pills */}
                  <div className="mb-2.5 flex gap-1 text-[10px]">
                    <span className="rounded-full bg-sky-500 px-2 py-0.5 font-bold text-white">Todos</span>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300">Pizzas</span>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 font-medium text-slate-700 dark:bg-white/10 dark:text-slate-300">Pastas</span>
                  </div>

                  {/* Sample Dish Card 1 */}
                  <div className="mb-2 rounded-xl border border-slate-200 bg-white p-2 shadow-xs dark:border-white/10 dark:bg-[#182032]">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[11px] font-bold text-slate-800 dark:text-white">🍕 Pizza Margarita</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400">Salsa de tomate, mozzarella y albahaca.</div>
                      </div>
                      <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">$12.00</span>
                    </div>
                    <div className="mt-1.5 flex justify-end">
                      <button className="rounded-md bg-sky-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                        + Agregar
                      </button>
                    </div>
                  </div>

                  {/* Sample Dish Card 2 */}
                  <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xs dark:border-white/10 dark:bg-[#182032]">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[11px] font-bold text-slate-800 dark:text-white">🍞 Bruschetta Clásica</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400">Tomates frescos con aceite de oliva.</div>
                      </div>
                      <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">$6.50</span>
                    </div>
                  </div>

                  {/* Bottom bar inside phone */}
                  <div className="mt-auto flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2 text-[10px] text-white dark:bg-sky-600">
                    <span>🛒 2 items</span>
                    <span className="font-bold">$18.50</span>
                  </div>
                </div>
              </div>

              {/* Floating Ticket */}
              <div className="absolute -left-6 top-6 hidden sm:block">
                <TicketCard ticket={content.hero.ticket} />
              </div>
              {/* Floating Pipeline */}
              <div className="absolute -right-4 bottom-2 hidden sm:block">
                <PipelineCard pipeline={content.hero.pipeline} />
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Pillars Section (from branding.jpeg) */}
        <section className="border-b-2 border-slate-300 bg-white px-5 py-20 dark:border-white/10 dark:bg-[#0c1220]" id="pasos">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
                style={displayFont}
              >
                De tu carta en papel a tu menú digital en 3 pasos
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
                Diseñado para dueños de restaurantes, cafeterías, bares y food trucks que no tienen tiempo que perder.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {/* Step 1 */}
              <div className="group rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-xs transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg dark:border-white/10 dark:bg-[#141824] dark:hover:bg-[#182032] dark:hover:border-sky-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white dark:bg-sky-500/20 dark:text-sky-400">
                  <CameraScanIcon />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white" style={displayFont}>
                  ESCANEÁ TU CARTA
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Sacale una foto con tu celular a tu carta física o subí tu archivo PDF. Nuestro sistema digitaliza los platos, precios y descripciones en instantes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-xs transition-all hover:-translate-y-1 hover:border-pink-400 hover:shadow-lg dark:border-white/10 dark:bg-[#141824] dark:hover:bg-[#182032] dark:hover:border-pink-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-500 group-hover:text-white dark:bg-pink-500/20 dark:text-pink-400">
                  <TemplateDesignIcon />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white" style={displayFont}>
                  ELEGÍ TU PLANTILLA
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Seleccioná entre plantillas optimizadas para conversión visual. Aplicá el logo de tu local, tus colores y fotografías atractivas de cada plato.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-xs transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg dark:border-white/10 dark:bg-[#141824] dark:hover:bg-[#182032] dark:hover:border-sky-500/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-500 group-hover:text-white dark:bg-indigo-500/20 dark:text-indigo-400">
                  <GlobeWebIcon />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white" style={displayFont}>
                  TU WEB EN MINUTOS
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Publicá tu menú con tu propio dominio o enlace personalizado. Descargá tus códigos QR en alta resolución listos para imprimir en tus mesas y barras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-b-2 border-slate-300 bg-[#F1F5F9] px-5 py-20 dark:border-white/10 dark:bg-[#090D16]" id="why">
          <div className="mx-auto max-w-6xl">
            <h2
              className="max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
              style={displayFont}
            >
              {content.problem.heading}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {content.problem.cards.map((card, i) => (
                <div
                  key={card.title}
                  className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-[#141824]"
                >
                  <div
                    className={`text-3xl font-black ${
                      i === 0
                        ? "text-pink-500 dark:text-[#FF8EA8]"
                        : i === 1
                        ? "text-sky-600 dark:text-[#7CB3E9]"
                        : "text-amber-500 dark:text-amber-300"
                    }`}
                    style={displayFont}
                  >
                    {card.stat}
                  </div>
                  <div className="mt-4 text-base font-bold text-slate-800 dark:text-[#F5F2EA]">
                    {card.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#F5F2EA]/60">
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="border-b-2 border-slate-300 bg-sky-50/80 px-5 py-24 text-center dark:border-white/10 dark:bg-[#101726]">
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
              style={displayFont}
            >
              {content.solution.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              {content.solution.sub}
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-b-2 border-slate-300 bg-white px-5 py-20 dark:border-white/10 dark:bg-[#090D16]" id="features">
          <div className="mx-auto max-w-6xl">
            <h2
              className="max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
              style={displayFont}
            >
              {content.features.heading}
            </h2>
            <div className="mt-16 flex flex-col gap-20">
              {content.features.rows.map((row, i) => (
                <div
                  key={row.title}
                  className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
                >
                  <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                    <h3
                      className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
                      style={displayFont}
                    >
                      {row.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#F5F2EA]/70">
                      {row.desc}
                    </p>
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {row.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-[#F5F2EA]/85"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
                            <CheckIcon />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`flex justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}
                  >
                    <FeatureVisual
                      kind={row.kind}
                      ticket={content.hero.ticket}
                      pipeline={content.hero.pipeline}
                      brand={content.brand}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b-2 border-slate-300 bg-[#F1F5F9] px-5 py-20 dark:border-white/10 dark:bg-[#0c1220]" id="how">
          <div className="mx-auto max-w-6xl">
            <h2
              className="max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
              style={displayFont}
            >
              {content.how.heading}
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {content.how.steps.map((step) => (
                <div key={step.n} className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-[#141824]">
                  <div
                    className="text-base font-bold text-sky-600 dark:text-sky-400"
                    style={monoFont}
                  >
                    {step.n}
                  </div>
                  <div className="mt-3 h-1 w-10 bg-gradient-to-r from-sky-500 to-pink-500 rounded-full" />
                  <div className="mt-4 text-base font-bold text-slate-800 dark:text-[#F5F2EA]">
                    {step.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#F5F2EA]/65">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b-2 border-slate-300 bg-white px-5 py-20 dark:border-white/10 dark:bg-[#090D16]">
          <div className="mx-auto max-w-6xl">
            <h2
              className="max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
              style={displayFont}
            >
              {content.testimonials.heading}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {content.testimonials.items.map((item) => (
                <figure
                  key={item.name}
                  className="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-[#F8FAFC] p-7 shadow-xs dark:border-white/10 dark:bg-[#141824]"
                >
                  <div>
                    <div className="text-4xl text-sky-400/50" style={displayFont}>
                      “
                    </div>
                    <blockquote className="text-sm leading-relaxed text-slate-700 dark:text-[#F5F2EA]/85">
                      {item.quote}
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-pink-400 text-xs font-bold text-white shadow-xs">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-[#F5F2EA]">
                        {item.name}
                      </div>
                      <div className="text-xs font-medium text-slate-500 dark:text-[#F5F2EA]/50">{item.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & FAQ */}
        <section className="border-b-2 border-slate-300 bg-[#F1F5F9] px-5 py-20 dark:border-white/10 dark:bg-[#0c1220]" id="contact">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <div>
              <h2
                className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
                style={displayFont}
              >
                {content.contact.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#F5F2EA]/70">
                {content.contact.sub}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {content.contact.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-[#F5F2EA]/85"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
                      <CheckIcon />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-slate-500 dark:text-[#F5F2EA]/45">
                {content.contact.privacy}
              </p>
            </div>
            <div>
              <ContactForm contact={content.contact} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b-2 border-slate-300 bg-white px-5 py-20 dark:border-white/10 dark:bg-[#090D16]" id="faq">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
                style={displayFont}
              >
                {content.faq.heading}
              </h2>
            </div>
            <div className="mt-12">
              <Faq items={content.faq.items} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-300 bg-white px-5 py-16 dark:border-white/10 dark:bg-[#060910]">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <TuMenuAhoraIcon className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />
              <span className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-[#4A90E2] dark:text-[#7CB3E9]">TuMenu</span>
                <span className="text-[#FF6B8B] dark:text-[#FF8EA8]">Ahora</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-[#F5F2EA]/60">{content.footer.tagline}</p>
            <a
              href="#contact"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 text-white px-5 text-sm font-bold shadow-xs transition-colors active:scale-[0.99]"
            >
              {content.footer.cta}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {content.footer.cols.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-[#F5F2EA]/40">
                  {col.title}
                </div>
                <ul className="mt-3.5 flex flex-col gap-2.5 text-sm font-semibold text-slate-600 dark:text-[#F5F2EA]/70">
                  {col.links.map((link) => (
                    <li key={link} className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs font-medium text-slate-500 sm:flex-row dark:border-white/10 dark:text-[#F5F2EA]/40">
          <div>{content.footer.bottom[0]}</div>
          <div>{content.footer.bottom[1]}</div>
        </div>
      </footer>
    </div>
  );
}
