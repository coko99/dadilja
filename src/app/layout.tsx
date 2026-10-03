import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { site } from "@/data/site";
import { organizationSchema, seoKeywords, websiteSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { ContactDock } from "@/components/contact/ContactDock";
import { LanguageDock } from "@/components/layout/LanguageDock";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source",
  display: "swap",
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dadilja Beograd | Agencija Moja dadilja — profesionalno čuvanje dece",
    template: "%s | Moja dadilja",
  },
  description:
    "Tražite dadilju u Beogradu ili Srbiji? Moja dadilja je agencija za dadilje koja povezuje porodice sa stručnim, pouzdanim dadiljama — po satu, tokom dana, 24h ili na putovanju.",
  keywords: [...seoKeywords],
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: site.url,
    languages: {
      "sr-RS": site.url,
      en: new URL("/en", site.url).toString(),
      de: new URL("/de", site.url).toString(),
      "x-default": site.url,
    },
  },
  openGraph: {
    title: "Dadilja Beograd | Moja dadilja — profesionalne dadilje",
    description:
      "Agencija za dadilje u Beogradu i Srbiji. Pronađite stručnu dadilju prilagođenu ritmu vaše porodice.",
    url: site.url,
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
    title: "Dadilja Beograd | Moja dadilja",
    description: "Agencija za dadilje u Beogradu i Srbiji. Stručna dadilja u vašem domu.",
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
  verification: {
    // Dodajte Google Search Console kod ovde kad ga dobijete:
    // google: "VAŠ_KOD",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemas = [organizationSchema(), websiteSchema()];
  return (
    <html lang="sr-RS" className={`${sourceSans.variable} ${cormorant.variable} home-theme`}>
      <body className="min-h-full bg-ivory font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
        <Preloader />
        <Header />
        <main className="pt-[72px] pb-28 sm:pt-20 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCta />
        <LanguageDock />
        <ContactDock />
      </body>
    </html>
  );
}
