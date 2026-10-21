import type { Metadata } from "next";
import { getSeoGuide } from "@/data/seoGuides";
import { pageMeta } from "@/lib/seo";
import { SeoGuidePage } from "@/components/seo/SeoGuidePage";

const guide = getSeoGuide("dadilja-krusevac")!;

export const metadata: Metadata = pageMeta({
  title: `${guide.title} | Moja dadilja`,
  description: guide.description,
  path: "/dadilja-krusevac",
  keywords: [
    "dadilja Kruševac",
    "dadilja",
    "pronađi dadilju Kruševac",
    "profesionalna dadilja Kruševac",
    "agencija za dadilje Kruševac",
    "čuvanje dece Kruševac",
    "Moja dadilja",
  ],
});

export default function DadiljaKrusevacPage() {
  return <SeoGuidePage guide={guide} />;
}
