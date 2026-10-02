import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { getServiceIcon } from "@/lib/serviceIcons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getServiceIcon(service.slug);
  return (
    <a
      href={`/usluge/${service.slug}`}
      className="home-glass group flex h-full min-w-0 flex-col rounded-[28px] p-6 transition duration-300 hover:-translate-y-0.5 sm:p-7"
    >
      <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
        <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
      </span>
      <p className="mt-5 text-[12px] font-semibold tracking-[0.16em] text-nude">{service.eyebrow.toUpperCase()}</p>
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
  );
}
