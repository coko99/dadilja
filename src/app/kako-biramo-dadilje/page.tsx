import type { Metadata } from "next";
import { Handshake, MessageSquareText, UserRoundSearch, UsersRound } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = pageMeta({
  title: "Kako biramo dadilje",
  description: "Kako Moja dadilja bira kandidate: odgovornost, iskustvo, komunikacija i uklapanje u konkretnu porodicu.",
  path: "/kako-biramo-dadilje",
});

const steps = [
  {
    title: "Razgovor",
    text: "Slušamo kako kandidat govori o deci, granicama i danima koji nisu bili laki.",
    Icon: MessageSquareText,
  },
  {
    title: "Iskustvo",
    text: "Prednost imaju osobe sa relevantnim iskustvom i razumevanjem odgovornosti.",
    Icon: UserRoundSearch,
  },
  {
    title: "Uklapanje",
    text: "Ne tražimo univerzalnu dadilju. Tražimo osobu za konkretan dom i ritam.",
    Icon: UsersRound,
  },
  {
    title: "Upoznavanje",
    text: "Porodica i kandidat se sreću pre konačne odluke.",
    Icon: Handshake,
  },
];

export default function SelectionPage() {
  return (
    <>
      <PageHero
        eyebrow="IZBOR"
        title="Kako biramo dadilje."
        text="Ne povezujemo porodicu sa prvom slobodnom osobom. Gledamo da li neko razume poverenje koje dobija kada uđe u tuđi dom."
        actions={
          <Button href="/za-dadilje" className="home-neon-btn">
            Za dadilje
          </Button>
        }
      />

      <section className="mx-auto grid max-w-[1240px] gap-4 px-4 py-10 sm:px-8 sm:py-16 md:grid-cols-2">
        {steps.map(({ title, text, Icon }, index) => (
          <article key={title} className="home-glass rounded-[28px] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <p className="text-sm font-semibold tracking-[0.16em] text-[#e8a8b8]">0{index + 1}</p>
            </div>
            <h2 className="mt-5 font-serif text-3xl text-brown">{title}</h2>
            <p className="mt-3 text-muted">{text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-[900px] px-4 pb-6 sm:px-8">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <p className="text-[17px] leading-[1.75] text-muted sm:text-[18px]">
            Ne objavljujemo tvrdnje o proverama koje nisu deo potvrđenog procesa. Ono što jeste deo pristupa: razgovor, iskustvo, način komunikacije i prilika da se porodica i kandidat upoznaju pre početka.
          </p>
        </div>
      </section>

      <CTASection
        title="Želite da se prijavite?"
        text="Pogledajte stranicu za dadilje i pošaljite kratku prijavu."
        primaryHref="/za-dadilje"
        primaryLabel="Za dadilje"
        secondaryHref="/prijava-za-dadilje"
        secondaryLabel="Prijavi se"
      />
    </>
  );
}
