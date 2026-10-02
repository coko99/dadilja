import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FamiliesBand() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-[#c97a8e]/18 blur-3xl" />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="home-glass-dark rounded-[32px] p-7 sm:p-10">
          <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
            <Sparkles strokeWidth={1.15} className="size-[18px]" aria-hidden />
          </span>
          <h2 className="mt-5 font-serif text-5xl leading-[1.08] text-white sm:text-6xl">
            Vaše dete je jedinstveno.
            <span className="mt-2 block text-[#e8c4ce]">Takav treba da bude i izbor dadilje.</span>
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-[18px] leading-[1.75] text-white/80">
            <p>Ne postoji univerzalna dadilja koja odgovara svakoj porodici.</p>
            <p>
              Nekom je najvažnija fleksibilnost. Drugom iskustvo sa bebama. Trećem osoba koja može da pomogne oko školskih obaveza ili prati porodicu tokom putovanja.
            </p>
            <p className="text-white">Zato počinjemo slušanjem.</p>
          </div>
          <div className="mt-10">
            <Button href="/#upit" variant="light">
              Javite nam se
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
