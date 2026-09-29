import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { servicesIntro } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = pageMeta({
  title: "O nama",
  description: "Moja dadilja povezuje porodice sa pažljivo odabranim dadiljama. Saznajte kako pristupamo izboru i saradnji.",
  path: "/o-nama",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O NAMA"
        title={servicesIntro.title}
        text={servicesIntro.paragraphs[0]}
        image="/images/window.jpg"
        imageAlt="Roditelj i dete u šetnji, u prirodnom svetlu."
      />
      <section className="mx-auto grid max-w-[1100px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div className="space-y-5 text-[18px] leading-[1.75] text-muted">
          {servicesIntro.paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Photo src="/images/kitchen.jpg" alt="Svetao porodični dnevni boravak u toplim tonovima." className="aspect-[5/4]" />
      </section>
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1100px] gap-6 px-5 py-20 sm:px-8 md:grid-cols-3">
          {[
            ["Slušamo prvo", "Pre predloga želimo da razumemo ritam kuće, ne samo slobodan termin."],
            ["Biramo pažljivo", "Tražimo iskustvo, odgovornost i osobu koja odgovara konkretnoj porodici."],
            ["Ostajemo dostupni", "Komunikacija ne prestaje onog trenutka kada se dadilja i porodica upoznaju."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-3xl bg-ivory p-7">
              <h2 className="font-serif text-3xl text-brown">{title}</h2>
              <p className="mt-3 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTASection
        title="Recite nam kakva vam je pomoć potrebna."
        text="Kratak upit je dovoljan da krenemo razgovor. Bez obaveze."
        primaryHref="/#upit"
        primaryLabel="Javite nam se"
        secondaryHref="/za-porodice"
        secondaryLabel="Za porodice"
      />
    </>
  );
}
