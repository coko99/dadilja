import { faq } from "@/data/faq";
import { FAQ } from "@/components/ui/FAQ";

export function FaqSection() {
  return (
    <section id="pitanja" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-cream/70" />
      <div className="relative mx-auto max-w-[900px] px-4 sm:px-8">
        <h2 className="font-serif text-5xl text-brown sm:text-6xl">Najčešća pitanja</h2>
        <div className="home-glass mt-10 rounded-[28px] px-5 py-2 sm:px-8">
          <FAQ items={faq} />
        </div>
      </div>
    </section>
  );
}
