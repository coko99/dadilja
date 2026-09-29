"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";

export function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[rgba(82,33,16,0.12)] border-y border-[rgba(82,33,16,0.12)]">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-serif text-[1.5rem] leading-snug text-brown sm:text-[1.85rem]">{item.question}</span>
              <ChevronDown
                strokeWidth={1.25}
                className={`size-5 shrink-0 text-nude transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-[17px] leading-[1.75] text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
