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
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-cream/80" />
      <div className="pointer-events-none absolute left-1/2 top-0 size-[520px] -translate-x-1/2 rounded-full bg-[#8a4058]/18 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <h2 className="max-w-3xl font-serif text-5xl leading-[1.08] text-brown sm:text-6xl">
          Poverenje se ne podrazumeva. Ono se gradi.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.n} delay={index * 0.05}>
              <article className="home-glass h-full rounded-[28px] p-7 sm:p-8">
                <p className="font-serif text-3xl text-[#e8a8b8] drop-shadow-[0_0_16px_rgba(232,168,184,0.55)]">{item.n}</p>
                <h3 className="mt-5 font-serif text-[1.7rem] text-brown">{item.title}</h3>
                <p className="mt-3 text-[16.5px] leading-[1.7] text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
