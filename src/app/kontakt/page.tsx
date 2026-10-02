import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { isPlaceholder, site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactChannels } from "@/components/contact/ContactChannels";

export const metadata: Metadata = pageMeta({
  title: "Kontakt",
  description: "Pozovite Moja dadilja ili pošaljite poruku na WhatsApp, Viber ili e-mail.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="KONTAKT"
        title="Pozovite ili pošaljite poruku."
        text="Za dadilju ili prijavu javite se direktno. Birate poziv, WhatsApp, Viber ili e-mail."
      />
      <section id="upit" className="mx-auto max-w-[860px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <ContactChannels />
          <p className="mt-8 text-sm text-muted">
            {isPlaceholder(site.address) ? "Adresa biće dodata." : site.address}
          </p>
        </div>
      </section>
    </>
  );
}
