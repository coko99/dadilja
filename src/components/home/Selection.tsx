import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const traits = ["Odgovornost", "Empatija", "Komunikacija", "Iskustvo", "Pouzdanost", "Diskretnost", "Strpljenje", "Spremnost za učenje"];

export function Selection() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <h2 className="font-serif text-5xl leading-tight text-brown sm:text-6xl">Ko može postati Moja dadilja?</h2>
          <p className="mt-6 text-[18px] leading-[1.75] text-muted">
            Rad sa decom zahteva mnogo više od slobodnog vremena i dobre namere. Tražimo odgovorne, stabilne, komunikativne i brižne osobe koje razumeju granice, potrebe deteta i poverenje koje im porodica daje.
          </p>
          <div className="mt-8">
            <Button href="/prijava-za-dadilje" className="home-neon-btn">Želim da postanem dadilja</Button>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {traits.map((trait, index) => (
            <Reveal key={trait} delay={index * 0.03}>
              <li className="home-glass flex min-h-24 items-end rounded-[24px] p-4 font-serif text-xl leading-tight text-brown sm:min-h-28 sm:text-2xl">
                {trait}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
