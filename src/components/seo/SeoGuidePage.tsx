import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SeoGuide } from "@/data/seoGuides";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { site } from "@/data/site";

export function SeoGuidePage({ guide }: { guide: SeoGuide }) {
  const schema = [
    breadcrumbSchema([
      { name: "Početna", path: "/" },
      { name: guide.eyebrow, path: `/${guide.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      inLanguage: "sr-RS",
      author: { "@type": "Organization", name: site.name },
      publisher: {
        "@type": "Organization",
        name: site.name,
        logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.jpg") },
      },
      mainEntityOfPage: absoluteUrl(`/${guide.slug}`),
      about: ["dadilja", "čuvanje dece", "Beograd", "Srbija"],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow={guide.eyebrow}
        title={guide.title}
        text={guide.description}
        actions={
          <>
            <Button href="/#upit" className="home-neon-btn">
              Pronađi dadilju
            </Button>
            <Button href="/usluge" variant="ghost" className="border-white/35">
              Pogledaj usluge
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-[900px] px-4 py-10 sm:px-8 sm:py-14">
        <article className="home-glass space-y-5 rounded-[32px] p-6 text-[17px] leading-[1.75] text-muted sm:p-10 sm:text-[18px]">
          {guide.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="mx-auto max-w-[1100px] space-y-4 px-4 pb-10 sm:px-8 sm:pb-14">
        {guide.sections.map((section) => (
          <article key={section.heading} className="home-glass rounded-[28px] p-6 sm:p-8">
            <h2 className="font-serif text-[2rem] text-brown sm:text-[2.35rem]">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-[16.5px] leading-[1.75] text-muted">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-[1100px] px-4 pb-10 sm:px-8 sm:pb-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">POVEZANO</p>
        <h2 className="mt-3 font-serif text-4xl text-brown">Korisni linkovi</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {guide.related.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="home-glass group flex items-center justify-between gap-3 rounded-[22px] px-5 py-4 text-brown transition hover:-translate-y-0.5"
              >
                <span className="font-medium">{item.label}</span>
                <ArrowUpRight strokeWidth={1.4} className="size-4 opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTASection
        title="Spremni da pronađete dadilju?"
        text="Pozovite ili pošaljite poruku. Recite nam šta vam treba i vodimo vas kroz naredne korake."
        primaryHref="/kontakt"
        primaryLabel="Kontaktirajte nas"
        secondaryHref="/usluge"
        secondaryLabel="Usluge"
      />
    </>
  );
}
