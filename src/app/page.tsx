import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NannyFinder } from "@/components/home/NannyFinder";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { Services } from "@/components/home/Services";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { FamiliesBand } from "@/components/home/FamiliesBand";
import { Selection } from "@/components/home/Selection";
import { EditorialCta } from "@/components/home/EditorialCta";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { LocalSeo } from "@/components/home/LocalSeo";
import { faq } from "@/data/faq";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dadilja Beograd | Agencija Moja dadilja — profesionalno čuvanje dece",
  description:
    "Pronađite dadilju u Beogradu i Srbiji. Moja dadilja je agencija za dadilje: po satu, tokom dana, 24h, guvernanta ili dadilja na putovanju. Pozovite +381 61 2628988.",
  path: "/",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero />
      <NannyFinder />
      <LocalSeo />
      <AboutPreview />
      <Services />
      <WhyUs />
      <ProcessSteps />
      <FamiliesBand />
      <Selection />
      <EditorialCta />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
