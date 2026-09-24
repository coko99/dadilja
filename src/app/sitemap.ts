import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { enabledServices } from "@/data/services";
import { posts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/o-nama",
    "/usluge",
    "/za-porodice",
    "/kako-biramo-dadilje",
    "/za-dadilje",
    "/prijava-za-dadilje",
    "/blog",
    "/kontakt",
    "/politika-privatnosti",
    "/uslovi-koriscenja",
    "/en",
  ];
  const now = new Date();
  return [
    ...staticPaths.map((path) => ({ url: new URL(path, site.url).toString(), lastModified: now })),
    ...enabledServices().map((service) => ({
      url: new URL(`/usluge/${service.slug}`, site.url).toString(),
      lastModified: now,
    })),
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, site.url).toString(),
      lastModified: new Date(post.date),
    })),
  ];
}
