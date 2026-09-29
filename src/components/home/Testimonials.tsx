"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { visibleTestimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function Testimonials() {
  const items = visibleTestimonials();
  const [index, setIndex] = useState(0);
  const current = items[index % items.length];

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-serif text-5xl text-brown sm:text-6xl">Iskustva porodica</h2>
        <div className="flex gap-2">
          <button type="button" aria-label="Prethodna recenzija" className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(82,33,16,0.12)]" onClick={() => setIndex((value) => (value - 1 + items.length) % items.length)}>
            <ChevronLeft strokeWidth={1.4} />
          </button>
          <button type="button" aria-label="Sledeća recenzija" className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(82,33,16,0.12)]" onClick={() => setIndex((value) => (value + 1) % items.length)}>
            <ChevronRight strokeWidth={1.4} />
          </button>
        </div>
      </div>
      <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 md:hidden">
        <TestimonialCard item={current} />
      </div>
    </section>
  );
}
