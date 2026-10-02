import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-[#8a4058]/25 blur-3xl" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="home-glass-dark rounded-[32px] p-7 sm:p-10">
          <h2 className="font-serif text-[2.5rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
            Tražite nekoga kome možete da poverite ono najvažnije?
          </h2>
          <p className="mt-5 text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">
            Pozovite ili pošaljite poruku. Vodimo vas kroz naredne korake.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#upit" className="home-neon-btn">
              Javite nam se
            </Button>
            <Button href="/kontakt" variant="ghost" className="border-white/35">
              Kontaktirajte nas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
