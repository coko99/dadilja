import type { Metadata } from "next";
import { itemListSchema, pageMeta } from "@/lib/seo";
import { enabledServices } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SeoLinkHub } from "@/components/seo/SeoLinkHub";

export const metadata: Metadata = pageMeta({
  title: "Usluge dadilje — po satu, dnevno, 24h, guvernanta, putovanja",
  description:
    "Pregled usluga: dadilja po satu, 4/6/8 sati, guvernanta, dadilja 24h i dadilja na putovanjima. Pronađite oblik čuvanja dece koji odgovara vašoj porodici u Beogradu i Srbiji.",
  path: "/usluge",
});

export default function ServicesPage() {
  const services = enabledServices();
  const schema = itemListSchema(
    services.map((service) => ({
      name: service.title,
      path: `/usluge/${service.slug}`,
      description: service.summary,
    })),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow="USLUGE DADILJE"
        title="Usluge dadilje za ritam vaše porodice"
        text="Od nekoliko sati tokom dana, preko guvernante i boravka u domu, do pratnje kada ste daleko od kuće — u Beogradu i širom Srbije."
        actions={
          <Button href="/#upit" className="home-neon-btn">
            Pronađi dadilju
          </Button>
        }
      />
      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <SeoLinkHub title="Više o dadiljama i čuvanju dece" />
    </>
  );
}
