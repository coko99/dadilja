import type { Metadata } from "next";
import { site } from "@/data/site";

/** Primarne fraze za pretrage u Srbiji. */
export const seoKeywords = [
  "dadilja",
  "dadilja Beograd",
  "dadilja Srbija",
  "agencija za dadilje",
  "agencija za dadilje Beograd",
  "profesionalna dadilja",
  "čuvanje dece",
  "čuvanje dece Beograd",
  "dadilja po satu",
  "dadilja 24h",
  "guvernanta",
  "bebisiter",
  "pronađi dadilju",
  "Moja dadilja",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function pageMeta({
  title,
  description,
  path,
  keywords = [...seoKeywords],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = title.includes("Moja dadilja") ? title : `${title} | Moja dadilja`;
  const useAbsoluteTitle = path === "/" || title.includes("|");
  return {
    title: useAbsoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: "Childcare",
    alternates: {
      canonical: url,
      languages: {
        "sr-RS": absoluteUrl(path === "/en" || path === "/de" ? "/" : path),
        "en": absoluteUrl("/en"),
        "de": absoluteUrl("/de"),
        "x-default": absoluteUrl("/"),
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      alternateLocale: ["en_US", "de_DE"],
      type: "website",
      images: [
        {
          url: "/images/hero.jpg",
          width: 1600,
          height: 1068,
          alt: "Moja dadilja — profesionalna dadilja u vašem domu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/images/hero.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "EmploymentAgency"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.name,
    description:
      "Agencija za dadilje u Beogradu i Srbiji. Povezujemo porodice sa stručnim, odgovornim i pažljivo odabranim dadiljama.",
    url: site.url,
    logo: absoluteUrl("/brand/logo.jpg"),
    image: absoluteUrl("/images/hero.jpg"),
    telephone: site.phone,
    email: site.email.startsWith("[UNESI") ? undefined : site.email,
    address: site.address.startsWith("[UNESI")
      ? {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "RS",
        }
      : {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: site.city,
          addressCountry: "RS",
        },
    areaServed: [
      { "@type": "Country", name: "Srbija" },
      { "@type": "City", name: "Beograd" },
      { "@type": "AdministrativeArea", name: "Srbija" },
    ],
    availableLanguage: ["sr", "en", "de"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "customer service",
        areaServed: "RS",
        availableLanguage: ["Serbian", "English", "German"],
      },
    ],
    knowsAbout: [
      "dadilja",
      "čuvanje dece",
      "guvernanta",
      "dadilja 24h",
      "dadilja na putovanjima",
      "agencija za dadilje",
    ],
    slogan: site.tagline,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "sr-RS",
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Kontaktirajte Moja dadilja",
      target: absoluteUrl("/kontakt"),
    },
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Srbija" },
      { "@type": "City", name: "Beograd" },
    ],
    serviceType: "Childcare / Nanny agency",
    inLanguage: "sr-RS",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
