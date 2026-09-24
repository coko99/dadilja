import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja sajta Moja dadilja.",
  path: "/uslovi-koriscenja",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[760px] px-5 py-16 text-[17px] leading-[1.8] text-muted sm:px-8">
      <h1 className="font-serif text-5xl text-brown">Uslovi korišćenja</h1>
      <p className="mt-6">
        Sajt predstavlja uslugu povezivanja porodica i dadilja. Tekst na stranicama je informativan. Slanje upita ili prijave ne znači da je saradnja već dogovorena.
      </p>
      <p className="mt-4">
        Uslovi konkretnog angažovanja — termini, obaveze i naknada — dogovaraju se posebno, pre početka rada, i nisu automatski sadržani u ovoj formi.
      </p>
      <p className="mt-4">
        Sadržaj sajta, naziv i vizuelni identitet pripadaju Moja dadilja. Ne kopirajte tekst i oznake u svrhu tuđe usluge.
      </p>
      <p className="mt-4">
        Fotografije na sajtu su privremeni prikazi raspoloženja i biće zamenjene fotografijama brenda.
      </p>
    </article>
  );
}
