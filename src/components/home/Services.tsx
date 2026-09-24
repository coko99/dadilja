import { enabledServices } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  const items = enabledServices();
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading eyebrow="FLEKSIBILNA BRIGA" title="Dadilja kada vam je potrebna." />
      </div>
      <div className="mt-12 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:mx-auto lg:grid lg:max-w-[1240px] lg:grid-cols-3 lg:overflow-visible">
        {items.map((service) => (
          <div key={service.slug} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
