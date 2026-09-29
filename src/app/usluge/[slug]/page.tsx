import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { enabledServices, getService } from "@/data/services";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactChannels } from "@/components/contact/ContactChannels";

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
      <PageHero eyebrow={service.eyebrow.toUpperCase()} title={service.title} text={service.lead} image={service.image} imageAlt={service.imageAlt} />
      <section className="mx-auto grid max-w-[1100px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-[18px] leading-[1.75] text-muted">
          {service.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2 className="pt-4 font-serif text-3xl text-brown">Kome odgovara</h2>
          <ul className="space-y-2">
            {service.suitedFor.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
          <h2 className="pt-4 font-serif text-3xl text-brown">Šta dogovaramo</h2>
          <ul className="space-y-2">
            {service.includes.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
        <div className="h-fit rounded-[24px] border border-[rgba(82,33,16,0.1)] bg-ivory p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-brown">Javite nam se</h2>
          <p className="mt-2 mb-6 text-sm text-muted">Za {service.cardTitle.toLowerCase()} pozovite ili pošaljite poruku.</p>
          <ContactChannels />
        </div>
      </section>
    </>
  );
}
