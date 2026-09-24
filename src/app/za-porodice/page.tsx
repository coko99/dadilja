import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { faq } from "@/data/faq";
import { enabledServices } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = pageMeta({
  title: "Za porodice",
  description: "Pouzdana pomoć počinje pravim izborom. Saznajte kako Moja dadilja vodi porodicu od upita do saradnje.",
  path: "/za-porodice",
});

const reasons = [
  ["Jasan početak", "Ne morate sami da prolazite kroz nepoznate profile. Počinjemo od vašeg opisa dana."],
  ["Izbor koji ima smisla", "Predlažemo kandidate prema uzrastu, ritmu i onome što vam je zaista važno."],
  ["Prostor za odluku", "Upoznavanje dolazi pre konačnog dogovora. Upit ne znači obavezu."],
];

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="ZA PORODICE"
        title="Pouzdana pomoć počinje pravim izborom."
        text="Pronalaženje dadilje ne bi trebalo da bude stresan proces. Naš zadatak je da razumemo vašu porodicu, način života i očekivanja i pomognemo vam da dođete do odgovarajuće osobe."
        image="/images/sofa.jpg"
        imageAlt="Porodica u toplom domu, u mirnom trenutku."
      />
      <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
        <h2 className="font-serif text-4xl text-brown sm:text-5xl">Zašto koristiti Moja dadilja</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reasons.map(([title, text]) => (
            <article key={title} className="rounded-3xl bg-cream p-6">
              <h3 className="font-serif text-2xl text-brown">{title}</h3>
              <p className="mt-3 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-cream">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
          <h2 className="font-serif text-4xl text-brown">Kako izgleda proces</h2>
          <p className="mt-4 max-w-2xl text-muted">Od upita, preko razgovora i upoznavanja, do početka saradnje. Isti put možete videti i na početnoj strani.</p>
          <Link href="/#kako-funkcionise" className="mt-6 inline-block font-semibold text-brown underline-offset-4 hover:underline">Pogledajte korake</Link>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
        <h2 className="font-serif text-4xl text-brown">Vrste angažovanja</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {enabledServices().map((service) => (
            <li key={service.slug}>
              <Link href={`/usluge/${service.slug}`} className="block rounded-2xl border border-[rgba(82,33,16,0.12)] px-5 py-4 hover:bg-cream">
                <span className="font-semibold text-brown">{service.cardTitle}</span>
                <span className="mt-1 block text-sm text-muted">{service.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-brown text-ivory">
        <div className="mx-auto max-w-[800px] px-5 py-20 sm:px-8">
          <h2 className="font-serif text-4xl sm:text-5xl">Kako definišemo profil koji tražite</h2>
          <p className="mt-5 text-[18px] leading-[1.75] text-blush">
            Pitamo za uzrast, ritam dana, jezik, pomoć oko učenja, navike i granice. Iz toga nastaje profil — ne iz opšteg oglasa. Što jasnije kažete šta vam je važno, to je predlog bliži vašem domu.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[900px] px-5 py-16 sm:px-8">
        <h2 className="mb-8 font-serif text-4xl text-brown">Najčešća pitanja</h2>
        <FAQ items={faq} />
      </section>
      <section className="bg-cream">
        <div className="mx-auto max-w-[860px] px-5 py-16 sm:px-8">
          <h2 className="font-serif text-4xl text-brown">Pošaljite upit</h2>
          <div className="mt-8 rounded-[28px] bg-ivory p-6 sm:p-8">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
