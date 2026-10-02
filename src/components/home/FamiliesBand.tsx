import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function FamiliesBand() {
  return (
    <section className="relative isolate overflow-hidden text-ivory">
      <Image
        src="/images/family.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover scale-110 blur-[2px]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(24,12,48,0.88)_0%,rgba(60,36,102,0.78)_50%,rgba(201,75,184,0.35)_100%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-[#ff6ad5]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1100px] px-4 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="home-glass-dark max-w-3xl rounded-[32px] p-7 sm:p-10">
          <h2 className="font-serif text-5xl leading-[1.08] sm:text-6xl">
            Vaše dete je jedinstveno.
            <span className="mt-2 block text-[#e7d8f4]">Takav treba da bude i izbor dadilje.</span>
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-[18px] leading-[1.75] text-white/80">
            <p>Ne postoji univerzalna dadilja koja odgovara svakoj porodici.</p>
            <p>
              Nekom je najvažnija fleksibilnost. Drugom iskustvo sa bebama. Trećem osoba koja može da pomogne oko školskih obaveza ili prati porodicu tokom putovanja.
            </p>
            <p className="text-white">Zato počinjemo slušanjem.</p>
          </div>
          <div className="mt-10">
            <Button href="/#upit" variant="light">Javite nam se</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
