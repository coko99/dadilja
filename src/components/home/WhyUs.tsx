import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    n: "01",
    title: "Pažljiv izbor",
    text: "Ne tražimo samo osobu koja je slobodna u određenom terminu, već osobu koja odgovara potrebama konkretne porodice.",
  },
  {
    n: "02",
    title: "Stručnost",
    text: "Prednost imaju kandidati sa relevantnim iskustvom, znanjem i razumevanjem odgovornosti koju rad sa decom nosi.",
  },
  {
    n: "03",
    title: "Individualan pristup",
    text: "Svaka porodica ima drugačiji ritam. Zato želimo da razumemo vaše navike, očekivanja i prioritete.",
  },
  {
    n: "04",
    title: "Podrška",
    text: "Naša uloga se ne završava povezivanjem porodice i dadilje. Želimo da komunikacija tokom saradnje ostane jasna i jednostavna.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-24 lg:py-32">
        <h2 className="max-w-3xl font-serif text-5xl leading-[1.08] text-brown sm:text-6xl">
          Poverenje se ne podrazumeva. Ono se gradi.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.n} delay={index * 0.05}>
              <article className="h-full rounded-3xl bg-ivory p-7 shadow-[0_16px_40px_rgba(82,33,16,0.06)] sm:p-8">
                <p className="text-sm font-semibold tracking-[0.16em] text-accent">{item.n}</p>
                <h3 className="mt-4 font-serif text-3xl text-brown">{item.title}</h3>
                <p className="mt-3 text-[16.5px] leading-[1.7] text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
