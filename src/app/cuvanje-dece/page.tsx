import type { Metadata } from "next";
import { getSeoGuide } from "@/data/seoGuides";
import { pageMeta } from "@/lib/seo";
import { SeoGuidePage } from "@/components/seo/SeoGuidePage";

const guide = getSeoGuide("cuvanje-dece")!;

export const metadata: Metadata = pageMeta({
  title: `${guide.title} | Moja dadilja`,
  description: guide.description,
  path: "/cuvanje-dece",
  keywords: [
    "čuvanje dece",
    "čuvanje dece Beograd",
    "čuvanje dece Srbija",
    "dadilja",
    "bebisiter",
    "profesionalno čuvanje dece",
    "Moja dadilja",
  ],
});

export default function CuvanjeDecePage() {
  return <SeoGuidePage guide={guide} />;
}
