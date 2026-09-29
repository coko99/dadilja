import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";

export function EditorialCta() {
  return (
    <section className="px-4 pb-6 sm:px-8">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-brown sm:rounded-[32px] lg:relative">
        <Photo
          src="/images/editorial.jpg"
          alt="Mirno, blisko druženje odrasle osobe i deteta."
          className="aspect-[4/5] rounded-none sm:aspect-[16/10] lg:aspect-[16/9]"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#3b2118]/85 via-[#3b2118]/20 to-transparent lg:block" />
        <div className="px-6 py-8 text-ivory sm:p-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-16">
          <h2 className="max-w-3xl font-serif text-[2rem] leading-[1.12] sm:text-5xl lg:text-6xl">
            Kada znate da je dete u dobrim rukama, sve ostalo postaje lakše.
          </h2>
          <p className="mt-4 text-blush">Pronađimo osobu kojoj ćete moći da verujete.</p>
          <div className="mt-6">
            <Button href="/#upit" variant="light" className="w-full sm:w-auto">Pronađi dadilju</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
