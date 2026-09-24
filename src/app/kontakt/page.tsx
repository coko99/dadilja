import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { contactHref, isPlaceholder, site } from "@/data/site";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = pageMeta({
  title: "Kontakt",
  description: "Javite se Moja dadilja. Pošaljite poruku i recićemo vam koji je naredni korak.",
  path: "/kontakt",
});

function Row({ label, value, href }: { label: string; value: string; href: string | null }) {
  const text = isPlaceholder(value) ? "biće dodat" : value;
  return (
    <p>
      <span className="block text-[12px] font-semibold tracking-[0.14em] text-nude">{label}</span>
      {href ? (
        <a href={href} className="text-lg text-brown">{text}</a>
      ) : (
        <span className="text-lg text-brown">{text}</span>
      )}
    </p>
  );
}

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-[1100px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-5xl leading-tight text-brown sm:text-6xl">Pišite nam.</h1>
        <p className="mt-5 max-w-md text-[18px] leading-[1.75] text-muted">
          Ako tražite dadilju ili želite da se prijavite, ostavite poruku. Javićemo vam se sa narednim korakom.
        </p>
        <div className="mt-10 space-y-5">
          <Row label="TELEFON" value={site.phone} href={contactHref("phone")} />
          <Row label="E-MAIL" value={site.email} href={contactHref("email")} />
          <Row label="ADRESA" value={site.address} href={null} />
        </div>
      </div>
      <div className="rounded-[28px] bg-cream p-6 sm:p-8">
        <ContactForm />
      </div>
    </section>
  );
}
