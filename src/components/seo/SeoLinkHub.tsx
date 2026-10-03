import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { seoGuides } from "@/data/seoGuides";

export function SeoLinkHub({
  title = "Korisni vodiči",
  exclude,
}: {
  title?: string;
  exclude?: string;
}) {
  const items = seoGuides.filter((guide) => guide.slug !== exclude);
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-14">
      <p className="text-[11px] font-medium tracking-[0.22em] text-nude">VODIČI</p>
      <h2 className="mt-3 font-serif text-4xl text-brown sm:text-5xl">{title}</h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/${guide.slug}`}
              className="home-glass group flex h-full flex-col rounded-[28px] p-6 transition hover:-translate-y-0.5 sm:p-7"
            >
              <p className="text-[11px] font-medium tracking-[0.18em] text-nude">{guide.eyebrow}</p>
              <h3 className="mt-3 font-serif text-[1.7rem] leading-tight text-brown">{guide.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-muted">{guide.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brown">
                Pročitajte
                <ArrowUpRight strokeWidth={1.4} className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
