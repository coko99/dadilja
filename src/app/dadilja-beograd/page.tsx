import type { Metadata } from "next";
import { getSeoGuide } from "@/data/seoGuides";
import { pageMeta } from "@/lib/seo";
import { SeoGuidePage } from "@/components/seo/SeoGuidePage";

const guide = getSeoGuide("dadilja-beograd")!;

export const metadata: Metadata = pageMeta({
  title: `${guide.title} | Moja dadilja`,
  description: guide.description,
  path: "/dadilja-beograd",
  keywords: [
    "dadilja Beograd",
    "dadilja",
    "pronađi dadilju Beograd",
    "profesionalna dadilja Beograd",
    "agencija za dadilje Beograd",
    "čuvanje dece Beograd",
    "Moja dadilja",
  ],
});

export default function DadiljaBeogradPage() {
  return <SeoGuidePage guide={guide} />;
}
