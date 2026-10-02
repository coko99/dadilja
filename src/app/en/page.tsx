import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { enabledServices } from "@/data/services";
import { getServiceIcon } from "@/lib/serviceIcons";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "Moja dadilja",
  description: "A carefully chosen nanny in your home. English pages are prepared as a starting structure.",
  path: "/en",
});

export default function EnglishPage() {
  return (
    <>
      <PageHero
        eyebrow="ENGLISH"
        title="A considered nanny, in your home."
        text="Moja dadilja introduces families to responsible, carefully considered nannies. The full site is written in Serbian. This page keeps the English route ready, without inventing a translation of every inner page."
        actions={
          <>
            <Button href="/kontakt" className="home-neon-btn">
              Call, WhatsApp, Viber or email
            </Button>
            <Button href="/" variant="ghost" className="border-white/35">
              Read in Serbian
            </Button>
          </>
        }
      />
      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enabledServices().map((service) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <li key={service.slug}>
                <Link
                  href={`/usluge/${service.slug}`}
                  className="home-glass group flex h-full items-start gap-4 rounded-[28px] p-5 transition hover:-translate-y-0.5"
                >
                  <span className="home-service-icon inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                    <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
                  </span>
                  <span>
                    <span className="inline-flex items-center gap-1.5 font-serif text-2xl text-brown">
                      {service.cardTitle}
                      <ArrowUpRight strokeWidth={1.4} className="size-4" />
                    </span>
                    <span className="mt-2 block text-sm text-muted">{service.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
