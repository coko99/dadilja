import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function EditorialCta() {
  return (
    <section className="px-4 py-10 sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[36px]">
        <Image
          src="/images/editorial.jpg"
          alt="Mirno, blisko druženje odrasle osobe i deteta."
          fill
          sizes="100vw"
          className="object-cover scale-105 blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,12,48,0.25)_0%,rgba(24,12,48,0.78)_100%)]" />
        <div className="relative flex min-h-[420px] items-end px-6 py-10 sm:min-h-[520px] sm:p-12 lg:p-16">
          <div className="home-glass-dark max-w-3xl rounded-[28px] p-6 sm:p-8">
            <h2 className="font-serif text-[2rem] leading-[1.12] text-white sm:text-5xl lg:text-6xl">
              Kada znate da je dete u dobrim rukama, sve ostalo postaje lakše.
            </h2>
            <p className="mt-4 text-[#e7d8f4]">Pronađimo osobu kojoj ćete moći da verujete.</p>
            <div className="mt-6">
              <Button href="/#upit" variant="light" className="w-full sm:w-auto">
                Pronađi dadilju
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
