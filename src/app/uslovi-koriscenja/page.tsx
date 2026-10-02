import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja sajta Moja dadilja.",
  path: "/uslovi-koriscenja",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Uslovi korišćenja"
        text="Kratka pravila o korišćenju sajta i informacijama koje delimo."
      />
      <article className="mx-auto max-w-[860px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="home-glass space-y-4 rounded-[32px] p-6 text-[17px] leading-[1.8] text-muted sm:p-10">
          <p>
            Sajt predstavlja uslugu povezivanja porodica i dadilja. Tekst na stranicama je informativan. Slanje upita ili prijave ne znači da je saradnja već dogovorena.
          </p>
          <p>
            Uslovi konkretnog angažovanja — termini, obaveze i naknada — dogovaraju se posebno, pre početka rada, i nisu automatski sadržani u ovoj formi.
          </p>
          <p>
            Sadržaj sajta, naziv i vizuelni identitet pripadaju Moja dadilja. Ne kopirajte tekst i oznake u svrhu tuđe usluge.
          </p>
          <p>
            Vizuelni elementi na sajtu služe atmosferi brenda i mogu se menjati kako se sadržaj razvija.
          </p>
        </div>
      </article>
    </>
  );
}
