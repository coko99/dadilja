import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { isPlaceholder, site } from "@/data/site";
import { ContactChannels } from "@/components/contact/ContactChannels";

export const metadata: Metadata = pageMeta({
  title: "Kontakt",
  description: "Pozovite Moja dadilja ili pošaljite poruku na WhatsApp, Viber ili e-mail.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[760px] px-4 py-14 sm:px-8 sm:py-20">
      <p className="text-[11px] font-medium tracking-[0.22em] text-nude">KONTAKT</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-brown sm:text-6xl">Pozovite ili pošaljite poruku.</h1>
      <p className="mt-5 max-w-xl text-[18px] leading-[1.75] text-muted">
        Za dadilju ili prijavu javite se direktno. Birate poziv, WhatsApp, Viber ili e-mail.
      </p>
      <div className="mt-10">
        <ContactChannels />
      </div>
      <p className="mt-8 text-sm text-muted">
        {isPlaceholder(site.address) ? "Adresa biće dodata." : site.address}
      </p>
    </section>
  );
}
