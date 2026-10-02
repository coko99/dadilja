import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/window.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover scale-110 blur-[2px]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(24,12,48,0.86)_0%,rgba(60,36,102,0.8)_100%)]" />
      <div className="relative mx-auto max-w-[1180px] px-4 py-16 sm:px-8 sm:py-28">
        <div className="home-glass-dark max-w-3xl rounded-[32px] p-7 sm:p-10">
          <h2 className="font-serif text-[2.5rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
            Tražite nekoga kome možete da poverite ono najvažnije?
          </h2>
          <p className="mt-5 text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">
            Pozovite ili pošaljite poruku. Vodimo vas kroz naredne korake.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#upit" className="home-neon-btn">Javite nam se</Button>
            <Button href="/kontakt" variant="ghost" className="border-white/35">
              Kontaktirajte nas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
