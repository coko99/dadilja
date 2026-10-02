import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { enabledServices, getService } from "@/data/services";
import { site } from "@/data/site";
import { getServiceIcon } from "@/lib/serviceIcons";
import { PageHero } from "@/components/ui/PageHero";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return enabledServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: new URL(`/usluge/${service.slug}`, site.url).toString() },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = getServiceIcon(service.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@type": "Organization", name: site.name },
    areaServed: site.city,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow={service.eyebrow.toUpperCase()}
        title={service.title}
        text={service.lead}
        actions={
          <>
            <Button href="/#upit" className="home-neon-btn">
              Javite nam se
            </Button>
            <Button href="/usluge" variant="ghost" className="border-white/35">
              Sve usluge
            </Button>
          </>
        }
      />

      <section className="mx-auto grid max-w-[1240px] gap-6 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <span className="home-service-icon inline-flex size-12 items-center justify-center rounded-full">
            <Icon strokeWidth={1.15} className="size-5" aria-hidden />
          </span>
          <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-10 font-serif text-3xl text-brown">Kome odgovara</h2>
          <ul className="mt-4 space-y-3">
            {service.suitedFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted">
                <Check strokeWidth={1.6} className="mt-1 size-4 shrink-0 text-[#e8a8b8]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-serif text-3xl text-brown">Šta dogovaramo</h2>
          <ul className="mt-4 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted">
                <Check strokeWidth={1.6} className="mt-1 size-4 shrink-0 text-[#e8a8b8]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside id="upit" className="home-glass h-fit rounded-[32px] p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="font-serif text-3xl text-brown">Javite nam se</h2>
          <p className="mt-2 mb-6 text-sm text-muted">Za {service.cardTitle.toLowerCase()} pozovite ili pošaljite poruku.</p>
          <ContactChannels />
        </aside>
      </section>
    </>
  );
}
