import type { LandingContent } from "../_lib/types";
import { Faq } from "./Faq";
import { ContactForm } from "./ContactForm";

const displayFont = { fontFamily: "var(--font-fraunces)" };
const monoFont = { fontFamily: "var(--font-jetbrains-mono)" };

const accentByIndex = ["text-[#EB7CA8]", "text-[#5668cd]", "text-[#F5F2EA]"];

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

function TicketCard({ ticket }: { ticket: LandingContent["hero"]["ticket"] }) {
  return (
    <div className="w-64 rounded-2xl border border-white/10 bg-[#141419]/95 p-4 shadow-xl backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#F5F2EA]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00C853]" />
        <span className="flex-1 truncate">{ticket.title}</span>
        <span className="text-[#F5F2EA]/40" style={monoFont}>
          {ticket.time}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {ticket.rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-2 text-[13px] text-[#F5F2EA]/75"
          >
            <span className="text-[#F5F2EA]/45">{row.qty}</span>
            <span className="flex-1 truncate">{row.name}</span>
            <span style={monoFont}>{row.price}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <span className="text-[#F5F2EA]/50">{ticket.footLabel}</span>
        <span className="font-semibold text-[#F5F2EA]" style={monoFont}>
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
    <div className="w-56 rounded-2xl border border-white/10 bg-[#141419]/95 p-4 shadow-xl backdrop-blur">
      <div className="mb-3 text-xs font-medium text-[#F5F2EA]/70">
        {pipeline.title}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {pipeline.jobs.map((job) => (
          <div
            key={job.code}
            className={`rounded-lg px-2.5 py-2 text-xs ${
              job.done ? "bg-[#00C853]/15" : "bg-[#1C1C23]"
            }`}
          >
            <div className="font-semibold text-[#F5F2EA]" style={monoFont}>
              {job.code}
            </div>
            <div
              className={job.done ? "text-[#00C853] font-medium" : "text-[#F5F2EA]/45"}
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
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#141419] shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#EB7CA8]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFEB3B]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#00C853]/70" />
        <span
          className="ml-2 truncate rounded bg-[#0B0B0E] px-2 py-1 text-[11px] text-[#F5F2EA]/50"
          style={monoFont}
        >
          tudominio.com
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="text-sm font-semibold text-[#F5F2EA]">{brand}</div>
        <div className="flex gap-2">
          <div className="h-2 w-16 rounded-full bg-white/10" />
          <div className="h-2 w-10 rounded-full bg-white/10" />
          <div className="h-2 w-12 rounded-full bg-white/10" />
        </div>
        <div className="h-16 rounded-lg bg-white/[.04]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 rounded-lg bg-white/[.04]" />
          <div className="h-10 rounded-lg bg-white/[.04]" />
          <div className="h-10 rounded-lg bg-white/[.04]" />
        </div>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#141419] p-4 shadow-xl">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00C853]/20 text-xs font-semibold text-[#00C853]">
          S
        </div>
        <div className="text-xs">
          <div className="font-medium text-[#F5F2EA]">Soporte</div>
          <div className="flex items-center gap-1 text-[#F5F2EA]/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00C853]" />
            En línea
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[13px]">
        <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#00C853]/15 px-3 py-2 text-[#F5F2EA]/85">
          Hola, ¿me ayudás con una duda?
        </div>
        <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white/[.06] px-3 py-2 text-[#F5F2EA]/85">
          ¡Claro! Contame qué necesitás y te guío paso a paso.
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
  return (
    <div className="flex flex-1 flex-col bg-[#0B0B0E] text-[#F5F2EA]">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0B0E]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <a href="#top" className="text-lg font-semibold" style={displayFont}>
            {content.brand}
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[#F5F2EA]/70 md:flex">
            {content.nav.links.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-[#F5F2EA]">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-[#F5F2EA] px-4 py-2 text-sm font-medium text-[#0B0B0E] transition-colors hover:bg-white"
          >
            {content.nav.cta}
          </a>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:py-28">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row lg:items-start">
            <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#F5F2EA]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00C853]" />
                {content.hero.eyebrow}
              </div>
              <h1
                className="text-4xl leading-[1.1] font-medium sm:text-5xl"
                style={displayFont}
              >
                {content.hero.headline.map((part, i) => (
                  <span key={part} className={i === 0 ? undefined : "block"}>
                    <span className={i === 0 ? undefined : accentByIndex[i - 1]}>
                      {part}
                    </span>{" "}
                  </span>
                ))}
              </h1>
              <p className="text-lg leading-8 text-[#F5F2EA]/70">
                {content.hero.sub}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#00C853] px-6 text-sm font-semibold text-[#041608] transition-colors hover:bg-[#2ae36c]"
                >
                  {content.hero.ctaPrimary}
                  <ArrowIcon />
                </a>
                <a
                  href="#features"
                  className="flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium text-[#F5F2EA] transition-colors hover:bg-white/5"
                >
                  {content.hero.ctaSecondary}
                </a>
              </div>
              <div className="flex gap-8 pt-4">
                {content.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold" style={displayFont}>
                      {stat.value}
                    </div>
                    <div className="max-w-24 text-xs text-[#F5F2EA]/50">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex w-full max-w-sm flex-1 justify-center py-6">
              <div className="aspect-[9/18] w-56 rounded-[32px] border border-white/10 bg-gradient-to-b from-[#1C1C23] to-[#0B0B0E] p-2 shadow-2xl">
                <div className="h-full w-full rounded-[24px] bg-[#141419]" />
              </div>
              <div className="absolute -left-4 top-4 hidden sm:block">
                <TicketCard ticket={content.hero.ticket} />
              </div>
              <div className="absolute -right-2 bottom-0 hidden sm:block">
                <PipelineCard pipeline={content.hero.pipeline} />
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-b border-white/10 px-5 py-20" id="why">
          <div className="mx-auto max-w-6xl">
            <div className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
              {content.problem.kicker}
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-medium sm:text-4xl"
              style={displayFont}
            >
              {content.problem.heading}
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {content.problem.cards.map((card, i) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-[#141419] p-8"
                >
                  <div
                    className={`text-3xl font-medium ${accentByIndex[i % accentByIndex.length]}`}
                    style={displayFont}
                  >
                    {card.stat}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-[#F5F2EA]">
                    {card.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-[#F5F2EA]/60">
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="border-b border-white/10 bg-[#141419] px-5 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
              {content.solution.kicker}
            </div>
            <h2
              className="mt-3 text-3xl font-medium sm:text-5xl"
              style={displayFont}
            >
              {content.solution.heading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#F5F2EA]/65">
              {content.solution.sub}
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-white/10 px-5 py-20" id="features">
          <div className="mx-auto max-w-6xl">
            <div className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
              {content.features.kicker}
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-medium sm:text-4xl"
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
                    <span className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
                      {row.tag}
                    </span>
                    <h3
                      className="mt-2 text-2xl font-medium sm:text-3xl"
                      style={displayFont}
                    >
                      {row.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#F5F2EA]/65">
                      {row.desc}
                    </p>
                    <ul className="mt-5 flex flex-col gap-2">
                      {row.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2 text-sm text-[#F5F2EA]/80"
                        >
                          <span className="text-[#00C853]">
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

        {/* How */}
        <section className="border-b border-white/10 bg-[#141419] px-5 py-20" id="how">
          <div className="mx-auto max-w-6xl">
            <div className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
              {content.how.kicker}
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-medium sm:text-4xl"
              style={displayFont}
            >
              {content.how.heading}
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {content.how.steps.map((step) => (
                <div key={step.n}>
                  <div
                    className="text-sm font-semibold text-[#F5F2EA]/35"
                    style={monoFont}
                  >
                    {step.n}
                  </div>
                  <div className="mt-3 h-px w-full bg-white/10" />
                  <div className="mt-4 text-base font-semibold text-[#F5F2EA]">
                    {step.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-[#F5F2EA]/60">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-white/10 px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
              {content.testimonials.kicker}
            </div>
            <h2
              className="mt-3 max-w-2xl text-3xl font-medium sm:text-4xl"
              style={displayFont}
            >
              {content.testimonials.heading}
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {content.testimonials.items.map((item) => (
                <figure
                  key={item.name}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141419] p-6"
                >
                  <div>
                    <div className="text-3xl text-[#F5F2EA]/25" style={displayFont}>
                      “
                    </div>
                    <blockquote className="text-sm leading-relaxed text-[#F5F2EA]/80">
                      {item.quote}
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#F5F2EA]">
                        {item.name}
                      </div>
                      <div className="text-xs text-[#F5F2EA]/50">{item.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="border-b border-white/10 bg-[#141419] px-5 py-20" id="contact">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <div>
              <div className="text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
                {content.contact.kicker}
              </div>
              <h2
                className="mt-3 text-3xl font-medium sm:text-4xl"
                style={displayFont}
              >
                {content.contact.heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#F5F2EA]/65">
                {content.contact.sub}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {content.contact.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-2 text-sm text-[#F5F2EA]/80"
                  >
                    <span className="text-[#00C853]">
                      <CheckIcon />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-xs text-[#F5F2EA]/40">
                {content.contact.privacy}
              </div>
            </div>
            <ContactForm contact={content.contact} />
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-20" id="faq">
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-xs font-medium tracking-wide text-[#F5F2EA]/45 uppercase">
              {content.faq.kicker}
            </div>
            <h2
              className="mt-3 text-center text-3xl font-medium sm:text-4xl"
              style={displayFont}
            >
              {content.faq.heading}
            </h2>
            <div className="mt-12">
              <Faq items={content.faq.items} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="text-lg font-semibold" style={displayFont}>
              {content.brand}
            </div>
            <p className="mt-3 text-sm text-[#F5F2EA]/55">{content.footer.tagline}</p>
            <a
              href="#contact"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#00C853] px-5 text-sm font-semibold text-[#041608] transition-colors hover:bg-[#2ae36c]"
            >
              {content.footer.cta}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {content.footer.cols.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold tracking-wide text-[#F5F2EA]/45 uppercase">
                  {col.title}
                </div>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-[#F5F2EA]/65">
                  {col.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#F5F2EA]/40 sm:flex-row sm:justify-between">
          <span>{content.footer.bottom[0]}</span>
          <span>{content.footer.bottom[1]}</span>
        </div>
      </footer>
    </div>
  );
}
