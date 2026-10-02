import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { ContactDock } from "@/components/contact/ContactDock";
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
    default: "Moja dadilja | Profesionalne dadilje i čuvanje dece",
    template: "%s | Moja dadilja",
  },
  description:
    "Pronađite stručnu i pouzdanu dadilju prilagođenu potrebama vaše porodice. Fleksibilno čuvanje dece, dnevni i dugoročni angažmani.",
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: ["/images/hero.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  description: site.tagline,
  url: site.url,
  logo: new URL("/brand/logo.jpg", site.url).toString(),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const home = pathname === "/";
  return (
    <html lang="sr" className={`${sourceSans.variable} ${cormorant.variable}${home ? " home-theme" : ""}`}>
      <body className="min-h-full bg-ivory font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <Header />
        <main className={`pb-28 md:pb-0${home ? " pt-[72px] sm:pt-20" : ""}`}>{children}</main>
        <Footer />
        <StickyMobileCta />
        <ContactDock />
      </body>
    </html>
  );
}
