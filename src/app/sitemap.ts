import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { enabledServices } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/o-nama",
    "/usluge",
    "/za-porodice",
    "/kako-biramo-dadilje",
    "/za-dadilje",
    "/prijava-za-dadilje",
    "/kontakt",
    "/politika-privatnosti",
    "/uslovi-koriscenja",
    "/en",
    "/de",
  ];
  const now = new Date();
  return [
    ...staticPaths.map((path) => ({ url: new URL(path, site.url).toString(), lastModified: now })),
    ...enabledServices().map((service) => ({
      url: new URL(`/usluge/${service.slug}`, site.url).toString(),
      lastModified: now,
    })),
  ];
}
