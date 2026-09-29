import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full min-w-0 flex-col rounded-3xl bg-cream p-6 shadow-[0_16px_40px_rgba(82,33,16,0.06)] sm:p-8">
      <span className="font-serif text-5xl leading-none text-accent" aria-hidden>
        “
      </span>
      <blockquote className="mt-3 flex-1 font-serif text-[1.45rem] leading-snug text-brown">{item.quote}</blockquote>
      <figcaption className="mt-8 text-sm font-medium tracking-wide text-muted">{item.name}</figcaption>
    </figure>
  );
}
