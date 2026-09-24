import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";

export function EditorialCta() {
  return (
    <section className="px-5 pb-8 sm:px-8">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px]">
        <Photo
          src="/images/editorial.jpg"
          alt="Mirno, blisko druženje odrasle osobe i deteta."
          className="aspect-[4/5] rounded-none sm:aspect-[16/9]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b2118]/80 via-[#3b2118]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-ivory sm:p-12 lg:p-16">
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.08] sm:text-6xl">
            Kada znate da je dete u dobrim rukama, sve ostalo postaje lakše.
          </h2>
          <p className="mt-4 text-blush">Pronađimo osobu kojoj ćete moći da verujete.</p>
          <div className="mt-6">
            <Button href="/#upit" variant="light">Pronađi dadilju</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
