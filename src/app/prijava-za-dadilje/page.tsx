import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { NannyApplicationForm } from "@/components/forms/NannyApplicationForm";

export const metadata: Metadata = pageMeta({
  title: "Prijava za dadilje",
  description: "Prijavite se za rad kao dadilja. Recite nam iskustvo, dostupnost i uzrast dece sa kojim ste radili.",
  path: "/prijava-za-dadilje",
});

export default function ApplicationPage() {
  return (
    <section className="mx-auto grid max-w-[1100px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">PRIJAVA</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-brown">Pošaljite prijavu.</h1>
        <p className="mt-5 text-[18px] leading-[1.75] text-muted">
          Tražimo osnovne podatke i kratak opis iskustva. Ne tražimo osetljive podatke koji nisu potrebni u ovoj fazi.
        </p>
      </div>
      <div className="rounded-[28px] bg-cream p-6 sm:p-8">
        <NannyApplicationForm />
      </div>
    </section>
  );
}
