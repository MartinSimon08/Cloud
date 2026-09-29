"use client";

import { useState } from "react";
import type { LandingContent } from "../_lib/types";

export function Faq({ items }: { items: LandingContent["faq"]["items"] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto flex max-w-2xl flex-col divide-y divide-slate-200 dark:divide-white/10 border-t border-b border-slate-200 dark:border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="transition-colors">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-semibold text-slate-800 transition-colors hover:text-sky-600 dark:text-[#F5F2EA] dark:hover:text-sky-300"
            >
              <span>{item.q}</span>
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 transition-transform dark:bg-white/10 dark:text-[#F5F2EA]/60">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-[#F5F2EA]/75">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
