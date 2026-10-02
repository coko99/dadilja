import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { NannyApplicationForm } from "@/components/forms/NannyApplicationForm";

export const metadata: Metadata = pageMeta({
  title: "Prijava za dadilje",
  description: "Prijavite se za rad kao dadilja. Recite nam iskustvo, dostupnost i uzrast dece sa kojim ste radili.",
  path: "/prijava-za-dadilje",
});

export default function ApplicationPage() {
  return (
    <>
      <PageHero
        eyebrow="PRIJAVA"
        title="Pošaljite prijavu."
        text="Tražimo osnovne podatke i kratak opis iskustva. Ne tražimo osetljive podatke koji nisu potrebni u ovoj fazi."
      />
      <section className="mx-auto max-w-[900px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <NannyApplicationForm />
        </div>
      </section>
    </>
  );
}
