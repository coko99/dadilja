import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { enabledServices } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/dadilja-beograd", priority: 0.98, changeFrequency: "weekly" },
    { path: "/agencija-za-dadilje", priority: 0.96, changeFrequency: "weekly" },
    { path: "/cuvanje-dece", priority: 0.95, changeFrequency: "weekly" },
    { path: "/usluge", priority: 0.95, changeFrequency: "weekly" },
    { path: "/za-porodice", priority: 0.9, changeFrequency: "monthly" },
    { path: "/o-nama", priority: 0.85, changeFrequency: "monthly" },
    { path: "/kako-biramo-dadilje", priority: 0.85, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.9, changeFrequency: "monthly" },
    { path: "/za-dadilje", priority: 0.75, changeFrequency: "monthly" },
    { path: "/prijava-za-dadilje", priority: 0.7, changeFrequency: "monthly" },
    { path: "/politika-privatnosti", priority: 0.3, changeFrequency: "yearly" },
    { path: "/uslovi-koriscenja", priority: 0.3, changeFrequency: "yearly" },
    { path: "/en", priority: 0.5, changeFrequency: "monthly" },
    { path: "/de", priority: 0.5, changeFrequency: "monthly" },
  ];

  return [
    ...staticEntries.map((entry) => ({
      url: new URL(entry.path, site.url).toString(),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...enabledServices().map((service) => ({
      url: new URL(`/usluge/${service.slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
  ];
}
