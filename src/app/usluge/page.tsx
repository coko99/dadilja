import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { enabledServices } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "Usluge",
  description: "Dadilja na 4, 6 i 8 sati, guvernanta, dadilja 24h i dadilja na putovanjima. Izaberite oblik brige koji odgovara ritmu vaše porodice.",
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="USLUGE"
        title="Naše usluge"
        text="Od nekoliko sati tokom dana, preko guvernante i boravka u domu, do pratnje kada ste daleko od kuće."
        actions={
          <Button href="/#upit" className="home-neon-btn">
            Pronađi dadilju
          </Button>
        }
      />
      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {enabledServices().map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
