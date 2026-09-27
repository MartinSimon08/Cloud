"use client";

import { useState } from "react";
import type { LandingContent } from "../_lib/types";

export function Faq({ items }: { items: LandingContent["faq"]["items"] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto flex max-w-2xl flex-col divide-y divide-white/10 border-t border-b border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-[#F5F2EA]"
            >
              <span>{item.q}</span>
              <span className="shrink-0 text-lg text-[#F5F2EA]/50">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 text-sm leading-relaxed text-[#F5F2EA]/70">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
