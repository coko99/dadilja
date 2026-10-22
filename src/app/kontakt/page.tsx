import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ContactChannels } from "@/components/contact/ContactChannels";

export const metadata: Metadata = pageMeta({
  title: "Kontakt — pronađi dadilju, pozovi Moja dadilja",
  description:
    "Kontakt Moja dadilja: +381 65 35 80 352 ili info@moja-dadilja.rs. Pozovite, pišite mejl ili pošaljite poruku na WhatsApp, Viber ili SMS.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="KONTAKT"
        title="Pozovite ili pošaljite poruku."
        text="Za dadilju ili prijavu javite se direktno. Birate poziv, email, WhatsApp, Viber ili SMS."
      />
      <section id="upit" className="mx-auto max-w-[860px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <ContactChannels />
        </div>
      </section>
    </>
  );
}
