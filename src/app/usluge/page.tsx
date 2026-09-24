import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { enabledServices } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = pageMeta({
  title: "Usluge",
  description: "Dadilja po satu, dnevni termini, live-in i guvernanta. Izaberite oblik brige koji odgovara ritmu vaše porodice.",
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-20">
      <SectionHeading
        eyebrow="USLUGE"
        title="Dadilja kada vam je potrebna."
        text="Od nekoliko sati do svakodnevnog prisustva. Svaku uslugu možete uključiti ili isključiti u podešavanju sadržaja."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {enabledServices().map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
