import { InquiryForm } from "@/components/forms/InquiryForm";

export function NannyFinder() {
  return (
    <section id="upit" className="relative z-10 mx-auto mt-2 max-w-[1100px] scroll-mt-24 px-4 pb-4 sm:px-8 lg:-mt-6">
      <div className="rounded-[24px] border border-[rgba(82,33,16,0.1)] bg-white p-5 sm:p-12">
        <h2 className="font-serif text-[2.1rem] leading-[1.08] text-brown sm:text-5xl">Kakva dadilja vam je potrebna?</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Pošaljite nam osnovne informacije, a naš tim će vam se javiti sa narednim koracima.
        </p>
        <div className="mt-8">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
