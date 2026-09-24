import { Button } from "@/components/ui/Button";

export function FamiliesBand() {
  return (
    <section className="bg-brown text-ivory">
      <div className="mx-auto max-w-[1100px] px-5 py-24 sm:px-8 lg:py-32">
        <h2 className="font-serif text-5xl leading-[1.08] sm:text-6xl">
          Vaše dete je jedinstveno.
          <span className="mt-2 block text-blush">Takav treba da bude i izbor dadilje.</span>
        </h2>
        <div className="mt-8 max-w-2xl space-y-5 text-[18px] leading-[1.75] text-blush">
          <p>Ne postoji univerzalna dadilja koja odgovara svakoj porodici.</p>
          <p>
            Nekom je najvažnija fleksibilnost. Drugom iskustvo sa bebama. Trećem osoba koja može da pomogne oko školskih obaveza ili prati porodicu tokom putovanja.
          </p>
          <p className="text-ivory">Zato počinjemo slušanjem.</p>
        </div>
        <div className="mt-10">
          <Button href="/#upit" variant="accent">Pošaljite upit</Button>
        </div>
      </div>
    </section>
  );
}
