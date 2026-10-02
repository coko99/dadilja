import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Home,
  Plane,
  SunMedium,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { homeServices } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  "dadilja-4-sata": Clock3,
  "dadilja-6-sati": Timer,
  "dadilja-8-sati": SunMedium,
  guvernanta: BookOpen,
  "live-in": Home,
  "dadilja-na-putovanjima": Plane,
};

export function Services() {
  const items = homeServices();
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,75,184,0.14),transparent_48%)]" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">PREGLED</p>
        <h2 className="mt-4 font-serif text-[2.65rem] leading-[1.08] text-brown sm:text-5xl lg:text-[3.6rem]">Naše usluge</h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.75] text-muted">
          Izaberite oblik podrške koji odgovara ritmu vaše porodice — od nekoliko sati do boravka u domu i putovanja.
        </p>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const Icon = icons[service.slug] ?? Clock3;
            return (
              <Reveal key={service.slug} delay={index * 0.04}>
                <a
                  href={`/usluge/${service.slug}`}
                  className="home-glass group flex h-full min-w-0 flex-col rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(90,40,160,0.18)] sm:p-7"
                >
                  <span className="home-neon-icon inline-flex size-14 items-center justify-center rounded-2xl">
                    <Icon strokeWidth={1.5} className="size-7" aria-hidden />
                  </span>
                  <p className="mt-6 text-[12px] font-semibold tracking-[0.16em] text-nude">{service.eyebrow.toUpperCase()}</p>
                  <h3 className="mt-2 font-serif text-[2rem] leading-[1.15] text-brown">{service.cardTitle}</h3>
                  <p className="mt-3 flex-1 text-[15.5px] leading-[1.7] text-muted">{service.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brown">
                    Saznaj više
                    <ArrowUpRight
                      strokeWidth={1.4}
                      className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
