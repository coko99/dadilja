import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Politika privatnosti",
  description: "Kako Moja dadilja koristi podatke iz poruka i prijave za dadilje.",
  path: "/politika-privatnosti",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Politika privatnosti"
        text="Kako koristimo podatke kada nam se javite ili pošaljete prijavu."
      />
      <article className="mx-auto max-w-[860px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="home-glass space-y-4 rounded-[32px] p-6 text-[17px] leading-[1.8] text-muted sm:p-10">
          <p>
            {site.name} ne traži kontakt formu. Javljate nam se pozivom, WhatsAppom, Viberom ili e-mailom. Ako se prijavljujete za posao dadilje, prijava može sadržati ime, kontakt, opis iskustva i dokument koji priložite.
          </p>
          <p>
            Podatke koristimo da odgovorimo na upit, dogovorimo naredni korak ili razmotrimo prijavu. Ne prodajemo ih i ne koristimo ih za nevezano oglašavanje.
          </p>
          <p>
            Slanje može ići preko podešenog servisa za poruke ili webhooka. Ključevi tog servisa nisu deo sajta i čuvaju se u okruženju.
          </p>
          <p>
            Uvid ili brisanje podataka možete zatražiti istim putem kojim ste nas kontaktirali, čim broj i e-mail budu uneti u podešavanjima.
          </p>
        </div>
      </article>
    </>
  );
}
