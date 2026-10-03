import type { Metadata } from "next";
import { getSeoGuide } from "@/data/seoGuides";
import { pageMeta } from "@/lib/seo";
import { SeoGuidePage } from "@/components/seo/SeoGuidePage";

const guide = getSeoGuide("agencija-za-dadilje")!;

export const metadata: Metadata = pageMeta({
  title: `${guide.title} | Moja dadilja`,
  description: guide.description,
  path: "/agencija-za-dadilje",
  keywords: [
    "agencija za dadilje",
    "agencija za dadilje Beograd",
    "agencija dadilje Srbija",
    "dadilja",
    "profesionalne dadilje",
    "Moja dadilja",
  ],
});

export default function AgencijaZaDadiljePage() {
  return <SeoGuidePage guide={guide} />;
}
