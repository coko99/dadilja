import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { enabledServices } from "@/data/services";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "Moja dadilja",
  description: "A carefully chosen nanny in your home. English pages are prepared as a starting structure.",
  path: "/en",
});

export default function EnglishPage() {
  return (
    <section className="mx-auto max-w-[900px] px-5 py-16 sm:px-8">
      <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">ENGLISH</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight text-brown sm:text-6xl">A considered nanny, in your home.</h1>
      <p className="mt-6 text-[18px] leading-[1.75] text-muted">
        Moja dadilja introduces families to responsible, carefully considered nannies. The full site is written in Serbian. This page keeps the English route ready, without inventing a translation of every inner page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/kontakt">Call, WhatsApp, Viber or email</Button>
        <Button href="/" variant="secondary">Read in Serbian</Button>
      </div>
      <ul className="mt-12 space-y-3">
        {enabledServices().map((service) => (
          <li key={service.slug}>
            <Link href={`/usluge/${service.slug}`} className="text-lg text-brown underline-offset-4 hover:underline">
              {service.cardTitle}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
