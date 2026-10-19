import type { Metadata } from "next";
import { Check } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "Konkurs za posao dadilje",
  description:
    "Otvoren konkurs za dadilje. Prijavite se pozivom, WhatsAppom, Viberom ili SMS-om i recite nam o iskustvu u radu sa decom.",
  path: "/konkurs",
});

const lookingFor = [
  "Odgovornost i pouzdanost",
  "Strpljenje i empatija u radu sa decom",
  "Jasna, profesionalna komunikacija sa porodicom",
  "Poštovanje privatnosti doma",
  "Iskustvo je prednost, ali nije jedini uslov",
];

const howToApply = [
  "Pozovite ili pošaljite poruku na WhatsApp, Viber ili SMS",
  "Ukratko recite iskustvo, grad i dostupnost",
  "Javljamo se kada profil odgovara trenutnim potrebama porodica",
];

export default function JobOpeningPage() {
  return (
    <>
      <PageHero
        eyebrow="KONKURS"
        title="Konkurs za posao dadilje."
        text="Tražimo brižne, odgovorne i pouzdane osobe za rad sa decom. Prijava ide direktno — pozivom, WhatsAppom, Viberom ili SMS-om."
        actions={
          <Button href="#prijava" className="home-neon-btn">
            Prijavi se
          </Button>
        }
      />

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="home-glass rounded-[32px] p-6 sm:p-10">
            <p className="text-[11px] font-medium tracking-[0.22em] text-nude">TRAŽIMO</p>
            <h2 className="mt-3 font-serif text-[2.1rem] text-brown sm:text-4xl">Šta očekujemo</h2>
            <ul className="mt-6 space-y-3">
              {lookingFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                  <Check strokeWidth={1.8} className="mt-0.5 size-4 shrink-0 text-blush" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="home-glass rounded-[32px] p-6 sm:p-10">
            <p className="text-[11px] font-medium tracking-[0.22em] text-nude">PRIJAVA</p>
            <h2 className="mt-3 font-serif text-[2.1rem] text-brown sm:text-4xl">Kako da se prijavite</h2>
            <ul className="mt-6 space-y-3">
              {howToApply.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                  <Check strokeWidth={1.8} className="mt-0.5 size-4 shrink-0 text-blush" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Više o tome kako biramo dadilje možete pročitati na stranici{" "}
              <a href="/kako-biramo-dadilje" className="font-semibold text-brown underline-offset-2 hover:underline">
                Kako biramo dadilje
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="prijava" className="mx-auto max-w-[900px] scroll-mt-24 px-4 pb-14 sm:px-8 sm:pb-20">
        <div className="home-glass overflow-visible rounded-[32px] p-6 shadow-[0_24px_80px_rgba(20,8,14,0.4)] sm:p-12">
          <h2 className="font-serif text-[2.1rem] leading-[1.15] text-brown sm:text-5xl">Pošaljite prijavu.</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Pozovite ili pošaljite poruku na WhatsApp, Viber ili SMS. Recite nam kratko o sebi — javljamo se istim putem.
          </p>
          <div className="mt-8">
            <ContactChannels intent="application" />
          </div>
        </div>
      </section>
    </>
  );
}
