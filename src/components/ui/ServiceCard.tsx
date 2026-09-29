import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { Photo } from "@/components/ui/Photo";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={`/usluge/${service.slug}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[rgba(82,33,16,0.1)] bg-ivory"
    >
      <Photo
        src={service.image}
        alt={service.imageAlt}
        className="aspect-[4/3] rounded-none"
        sizes="(min-width: 1024px) 360px, 80vw"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[12px] font-semibold tracking-[0.16em] text-nude">{service.eyebrow.toUpperCase()}</p>
        <h3 className="mt-3 font-serif text-[2rem] leading-[1.15] text-brown">{service.cardTitle}</h3>
        <p className="mt-3 flex-1 text-[15.5px] leading-[1.7] text-muted">{service.summary}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brown">
          Saznaj više
          <ArrowUpRight strokeWidth={1.4} className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
