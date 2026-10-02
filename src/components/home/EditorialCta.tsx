import { Button } from "@/components/ui/Button";

export function EditorialCta() {
  return (
    <section className="px-4 py-10 sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto size-96 -translate-y-1/2 rounded-full bg-[#8a4058]/22 blur-3xl" />
        <div className="home-glass-dark relative rounded-[36px] p-7 sm:p-12 lg:p-16">
          <h2 className="max-w-3xl font-serif text-[2rem] leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            Kada znate da je dete u dobrim rukama, sve ostalo postaje lakše.
          </h2>
          <p className="mt-4 text-[#e8c4ce]">Pronađimo osobu kojoj ćete moći da verujete.</p>
          <div className="mt-6">
            <Button href="/#upit" variant="light" className="w-full sm:w-auto">
              Pronađi dadilju
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
