import { homeServices } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  const items = homeServices();
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <SectionHeading eyebrow="PREGLED" title="Naše usluge" />
      </div>
      <div className="mx-auto mt-8 grid max-w-[1240px] gap-4 px-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 sm:px-8 lg:grid-cols-3">
        {items.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
