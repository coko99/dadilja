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
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { faq } from "@/data/faq";

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
      <AboutPreview />
      <Services />
      <WhyUs />
      <ProcessSteps />
      <FamiliesBand />
      <Selection />
      <EditorialCta />
      <Testimonials />
      <FaqSection />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
