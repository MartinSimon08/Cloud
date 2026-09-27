export type LandingContent = {
  brand: string;
  nav: {
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    headline: [string, string, string, string];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
    ticket: {
      title: string;
      time: string;
      rows: { qty: string; name: string; price: string }[];
      footLabel: string;
      total: string;
    };
    pipeline: {
      title: string;
      jobs: { code: string; time: string; done?: boolean }[];
    };
  };
  problem: {
    kicker: string;
    heading: string;
    cards: { stat: string; title: string; desc: string }[];
  };
  solution: {
    kicker: string;
    heading: string;
    sub: string;
  };
  features: {
    kicker: string;
    heading: string;
    rows: {
      tag: string;
      title: string;
      desc: string;
      bullets: string[];
      kind: "ticket" | "pipeline" | "domain" | "chat";
    }[];
  };
  how: {
    kicker: string;
    heading: string;
    steps: { n: string; title: string; desc: string }[];
  };
  testimonials: {
    kicker: string;
    heading: string;
    items: { quote: string; initials: string; name: string; role: string }[];
  };
  contact: {
    kicker: string;
    heading: string;
    sub: string;
    bullets: string[];
    privacy: string;
    submitLabel: string;
    sentMessage: string;
  };
  faq: {
    kicker: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  footer: {
    tagline: string;
    cta: string;
    cols: { title: string; links: string[] }[];
    bottom: [string, string];
  };
};
