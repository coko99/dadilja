import { faq } from "@/data/faq";
import { FAQ } from "@/components/ui/FAQ";

export function FaqSection() {
  return (
    <section id="pitanja" className="bg-cream">
      <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-8 sm:py-24 lg:py-32">
        <h2 className="font-serif text-5xl text-brown sm:text-6xl">Najčešća pitanja</h2>
        <div className="mt-10">
          <FAQ items={faq} />
        </div>
      </div>
    </section>
  );
}
