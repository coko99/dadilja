import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMeta({
  title: "Politika privatnosti",
  description: "Kako Moja dadilja koristi podatke iz upita, prijave i kontakt forme.",
  path: "/politika-privatnosti",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 py-16 text-[17px] leading-[1.8] text-muted sm:px-8">
      <h1 className="font-serif text-5xl text-brown">Politika privatnosti</h1>
      <p className="mt-6">
        {site.name} prikuplja samo podatke koje sami unesete u upit, kontakt formu ili prijavu za dadilje: ime, kontakt, opis potrebe ili iskustva i, kod prijave, dokument koji priložite.
      </p>
      <p className="mt-4">
        Podatke koristimo da odgovorimo na upit, dogovorimo naredni korak ili razmotrimo prijavu. Ne prodajemo ih i ne koristimo ih za nevezano oglašavanje.
      </p>
      <p className="mt-4">
        Slanje može ići preko podešenog servisa za poruke ili webhooka. Ključevi tog servisa nisu deo sajta i čuvaju se u okruženju.
      </p>
      <p className="mt-4">
        Možete zatražiti uvid ili brisanje svojih podataka putem kontakt forme, čim bude uneta zvanična adresa za prepisku. Do tada, poruka poslata kroz formu ostaje kanal za takav zahtev.
      </p>
    </article>
  );
}
