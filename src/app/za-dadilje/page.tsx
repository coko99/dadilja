import type { Metadata } from "next";
import {
  Ear,
  Heart,
  MessageCircle,
  Scale,
  Shield,
  Smile,
  Sparkles,
  Users,
} from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = pageMeta({
  title: "Za dadilje",
  description: "Ako ste odgovorni, strpljivi i volite rad sa decom, prijavite se za Moja dadilja.",
  path: "/za-dadilje",
});

const expectations = [
  { label: "Odgovornost", Icon: Shield },
  { label: "Pouzdanost", Icon: Scale },
  { label: "Profesionalna komunikacija", Icon: MessageCircle },
  { label: "Poštovanje privatnosti", Icon: Sparkles },
  { label: "Strpljenje", Icon: Ear },
  { label: "Empatija", Icon: Heart },
  { label: "Spremnost na dogovor", Icon: Users },
  { label: "Iskustvo je prednost", Icon: Smile },
];

export default function ForNanniesPage() {
  return (
    <>
      <PageHero
        eyebrow="ZA DADILJE"
        title="Vaša briga može postati vaš poziv."
        text="Ako ste odgovorni, strpljivi, pouzdani i volite rad sa decom, želimo da vas upoznamo."
        actions={
          <Button href="/prijava-za-dadilje" className="home-neon-btn">
            Prijavi se
          </Button>
        }
      />

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">OČEKIVANJA</p>
        <h2 className="mt-4 font-serif text-[2.4rem] text-brown sm:text-5xl">Šta očekujemo</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expectations.map(({ label, Icon }) => (
            <li key={label} className="home-glass flex items-center gap-4 rounded-[24px] p-5">
              <span className="home-service-icon inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <span className="font-medium text-brown">{label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-muted">
          Prijava je razgovor, ne automatski angažman. Javljamo se kada profil odgovara potrebama porodica sa kojima radimo.
        </p>
      </section>

      <CTASection
        title="Spremni da se prijavite?"
        text="Pošaljite kratku prijavu. Javljamo se kada ima smisla da razgovaramo dalje."
        primaryHref="/prijava-za-dadilje"
        primaryLabel="Prijavi se"
        secondaryHref="/kako-biramo-dadilje"
        secondaryLabel="Kako biramo dadilje"
      />
    </>
  );
}
