import { Button } from "@/components/ui/Button";

const traits = ["Odgovornost", "Empatija", "Komunikacija", "Iskustvo", "Pouzdanost", "Diskretnost", "Strpljenje", "Spremnost za učenje"];

export function Selection() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <h2 className="font-serif text-5xl leading-tight text-brown sm:text-6xl">Ko može postati Moja dadilja?</h2>
          <p className="mt-6 text-[18px] leading-[1.75] text-muted">
            Rad sa decom zahteva mnogo više od slobodnog vremena i dobre namere. Tražimo odgovorne, stabilne, komunikativne i brižne osobe koje razumeju granice, potrebe deteta i poverenje koje im porodica daje.
          </p>
          <div className="mt-8">
            <Button href="/prijava-za-dadilje" variant="secondary">Želim da postanem dadilja</Button>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {traits.map((trait) => (
            <li key={trait} className="flex min-h-28 items-end rounded-3xl bg-cream p-4 font-serif text-2xl leading-tight text-brown">
              {trait}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
