import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Handshake, MessageCircleHeart, Search } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { faq } from "@/data/faq";
import { enabledServices } from "@/data/services";
import { getServiceIcon } from "@/lib/serviceIcons";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";

export const metadata: Metadata = pageMeta({
  title: "Za porodice — kako pronaći pouzdanu dadilju",
  description:
    "Kako Moja dadilja pomaže porodicama u Beogradu i Srbiji da pronađu dadilju: od upita, preko izbora, do upoznavanja. Bez obaveze.",
  path: "/za-porodice",
});

const reasons = [
  {
    title: "Jasan početak",
    text: "Ne morate sami da prolazite kroz nepoznate profile. Počinjemo od vašeg opisa dana.",
    Icon: MessageCircleHeart,
  },
  {
    title: "Izbor koji ima smisla",
    text: "Predlažemo kandidate prema uzrastu, ritmu i onome što vam je zaista važno.",
    Icon: Search,
  },
  {
    title: "Prostor za odluku",
    text: "Upoznavanje dolazi pre konačnog dogovora. Upit ne znači obavezu.",
    Icon: Handshake,
  },
];

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="ZA PORODICE"
        title="Pouzdana pomoć počinje pravim izborom."
        text="Pronalaženje dadilje ne bi trebalo da bude stresan proces. Naš zadatak je da razumemo vašu porodicu, način života i očekivanja i pomognemo vam da dođete do odgovarajuće osobe."
        actions={
          <>
            <Button href="/#upit" className="home-neon-btn">
              Pronađi dadilju
            </Button>
            <Button href="/#kako-funkcionise" variant="ghost" className="border-white/35">
              Kako funkcioniše
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">PREDNOSTI</p>
        <h2 className="mt-4 font-serif text-[2.4rem] text-brown sm:text-5xl">Zašto koristiti Moja dadilja</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reasons.map(({ title, text, Icon }) => (
            <article key={title} className="home-glass rounded-[28px] p-6 sm:p-7">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <h3 className="mt-5 font-serif text-2xl text-brown">{title}</h3>
              <p className="mt-3 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6 sm:px-8">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px]">
          <div className="pointer-events-none absolute -right-16 top-0 size-72 rounded-full bg-[#8a4058]/30 blur-3xl" />
          <div className="home-glass-dark relative grid gap-6 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Compass strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">Kako izgleda proces</h2>
              <p className="mt-4 max-w-2xl text-white/80">
                Od upita, preko razgovora i upoznavanja, do početka saradnje. Isti put možete videti i na početnoj strani.
              </p>
              <div className="mt-6">
                <Button href="/#kako-funkcionise" variant="light">
                  Pogledajte korake
                </Button>
              </div>
            </div>
            <div className="home-glass rounded-[28px] p-6 text-white/85">
              <p className="font-serif text-2xl text-white">Kako definišemo profil</p>
              <p className="mt-3 text-[16px] leading-[1.7]">
                Pitamo za uzrast, ritam dana, jezik, pomoć oko učenja, navike i granice. Iz toga nastaje profil — ne iz opšteg oglasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">USLUGE</p>
        <h2 className="mt-4 font-serif text-[2.4rem] text-brown sm:text-5xl">Vrste angažovanja</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {enabledServices().map((service) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <li key={service.slug}>
                <Link
                  href={`/usluge/${service.slug}`}
                  className="home-glass group flex h-full items-start gap-4 rounded-[28px] p-5 transition duration-300 hover:-translate-y-0.5 sm:p-6"
                >
                  <span className="home-service-icon inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                    <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-serif text-2xl text-brown">
                      {service.cardTitle}
                      <ArrowUpRight
                        strokeWidth={1.4}
                        className="size-4 opacity-70 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="mt-2 block text-sm text-muted">{service.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-10 sm:px-8 sm:py-16">
        <h2 className="mb-8 font-serif text-4xl text-brown sm:text-5xl">Najčešća pitanja</h2>
        <div className="home-glass rounded-[28px] px-5 py-2 sm:px-8">
          <FAQ items={faq} />
        </div>
      </section>

      <section id="upit" className="mx-auto max-w-[860px] px-4 pb-10 sm:px-8 sm:pb-16">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <h2 className="font-serif text-4xl text-brown">Javite nam se</h2>
          <p className="mt-3 text-muted">Pozovite ili pošaljite poruku. Nema forme.</p>
          <div className="mt-8">
            <ContactChannels />
          </div>
        </div>
      </section>

      <CTASection
        title="Spremni da pronađete pravu osobu?"
        text="Recite nam šta vam treba. Vodimo vas kroz naredne korake."
        primaryHref="/#upit"
        primaryLabel="Pronađi dadilju"
        secondaryHref="/kako-biramo-dadilje"
        secondaryLabel="Kako biramo"
      />
    </>
  );
}
