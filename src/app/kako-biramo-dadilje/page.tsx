import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "Kako biramo dadilje",
  description: "Kako Moja dadilja bira kandidate: odgovornost, iskustvo, komunikacija i uklapanje u konkretnu porodicu.",
  path: "/kako-biramo-dadilje",
});

const steps = [
  ["Razgovor", "Slušamo kako kandidat govori o deci, granicama i danima koji nisu bili laki."],
  ["Iskustvo", "Prednost imaju osobe sa relevantnim iskustvom i razumevanjem odgovornosti."],
  ["Uklapanje", "Ne tražimo univerzalnu dadilju. Tražimo osobu za konkretan dom i ritam."],
  ["Upoznavanje", "Porodica i kandidat se sreću pre konačne odluke."],
];

export default function SelectionPage() {
  return (
    <>
      <PageHero
        eyebrow="IZBOR"
        title="Kako biramo dadilje."
        text="Ne povezujemo porodicu sa prvom slobodnom osobom. Gledamo da li neko razume poverenje koje dobija kada uđe u tuđi dom."
        image="/images/story.jpg"
        imageAlt="Zajedničko čitanje u mirnom, prirodno osvetljenom prostoru."
      />
      <section className="mx-auto grid max-w-[1000px] gap-5 px-5 py-16 sm:px-8 md:grid-cols-2">
        {steps.map(([title, text], index) => (
          <article key={title} className="rounded-3xl bg-cream p-7">
            <p className="text-sm font-semibold tracking-[0.16em] text-accent">0{index + 1}</p>
            <h2 className="mt-3 font-serif text-3xl text-brown">{title}</h2>
            <p className="mt-3 text-muted">{text}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-[800px] px-5 pb-20 text-[18px] leading-[1.75] text-muted sm:px-8">
        <p>
          Ne objavljujemo tvrdnje o proverama koje nisu deo potvrđenog procesa. Ono što jeste deo pristupa: razgovor, iskustvo, način komunikacije i prilika da se porodica i kandidat upoznaju pre početka.
        </p>
        <div className="mt-8">
          <Button href="/za-dadilje" variant="secondary">Pogledajte stranicu za dadilje</Button>
        </div>
      </section>
    </>
  );
}
