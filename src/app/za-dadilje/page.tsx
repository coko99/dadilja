import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "Za dadilje",
  description: "Ako ste odgovorni, strpljivi i volite rad sa decom, prijavite se za Moja dadilja.",
  path: "/za-dadilje",
});

const expectations = [
  "odgovornost",
  "pouzdanost",
  "profesionalnu komunikaciju",
  "poštovanje privatnosti porodice",
  "strpljenje",
  "empatiju",
  "spremnost na dogovor",
  "iskustvo je prednost",
];

export default function ForNanniesPage() {
  return (
    <>
      <PageHero
        eyebrow="ZA DADILJE"
        title="Vaša briga može postati vaš poziv."
        text="Ako ste odgovorni, strpljivi, pouzdani i volite rad sa decom, želimo da vas upoznamo."
        image="/images/blocks.jpg"
        imageAlt="Dete crta u mirnom, toplom prostoru."
      />
      <section className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8">
        <h2 className="font-serif text-4xl text-brown sm:text-5xl">Šta očekujemo</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {expectations.map((item) => (
            <li key={item} className="rounded-2xl bg-cream px-5 py-4 text-lg text-brown capitalize">{item}</li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-muted">
          Prijava je razgovor, ne automatski angažman. Javljamo se kada profil odgovara potrebama porodica sa kojima radimo.
        </p>
        <div className="mt-8">
          <Button href="/prijava-za-dadilje" variant="accent">Prijavi se</Button>
        </div>
      </section>
    </>
  );
}
