import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${bodoni.variable} ${manrope.variable}`}>
      <body className="min-h-full bg-ivory font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <Header />
        <main className="pb-28 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
