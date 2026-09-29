import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMeta({
  title: "Politika privatnosti",
  description: "Kako Moja dadilja koristi podatke iz poruka i prijave za dadilje.",
  path: "/politika-privatnosti",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 py-16 text-[17px] leading-[1.8] text-muted sm:px-8">
      <h1 className="font-serif text-5xl text-brown">Politika privatnosti</h1>
      <p className="mt-6">
        {site.name} ne traži kontakt formu. Javljate nam se pozivom, WhatsAppom, Viberom ili e-mailom. Ako se prijavljujete za posao dadilje, prijava može sadržati ime, kontakt, opis iskustva i dokument koji priložite.
      </p>
      <p className="mt-4">
        Podatke koristimo da odgovorimo na upit, dogovorimo naredni korak ili razmotrimo prijavu. Ne prodajemo ih i ne koristimo ih za nevezano oglašavanje.
      </p>
      <p className="mt-4">
        Slanje može ići preko podešenog servisa za poruke ili webhooka. Ključevi tog servisa nisu deo sajta i čuvaju se u okruženju.
      </p>
      <p className="mt-4">
        Uvid ili brisanje podataka možete zatražiti istim putem kojim ste nas kontaktirali, čim broj i e-mail budu uneti u podešavanjima.
      </p>
    </article>
  );
}
