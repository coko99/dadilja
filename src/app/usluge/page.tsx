import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { enabledServices } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = pageMeta({
  title: "Usluge",
  description: "Dadilja na 4, 6 i 8 sati, guvernanta, dadilja 24h i dadilja na putovanjima. Izaberite oblik brige koji odgovara ritmu vaše porodice.",
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
      <SectionHeading
        eyebrow="USLUGE"
        title="Naše usluge"
        text="Od nekoliko sati tokom dana, preko guvernante i boravka u domu, do pratnje kada ste daleko od kuće."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {enabledServices().map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
