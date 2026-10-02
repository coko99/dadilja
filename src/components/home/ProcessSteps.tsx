import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Pošaljete upit", text: "Kažete nam kada vam je dadilja potrebna i šta očekujete." },
  { n: "02", title: "Upoznajemo porodicu", text: "Razgovaramo o detetu, rutini, obavezama i tipu osobe koja bi vam najviše odgovarala." },
  { n: "03", title: "Biramo odgovarajuće kandidate", text: "Na osnovu vaših potreba izdvajamo profile koji najbolje odgovaraju porodici." },
  { n: "04", title: "Upoznavanje", text: "Porodica i kandidat dobijaju priliku da se upoznaju pre konačne odluke." },
  { n: "05", title: "Početak saradnje", text: "Nakon dogovora, dadilja započinje angažovanje prema definisanim uslovima." },
];

export function ProcessSteps() {
  return (
    <section id="kako-funkcionise" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-nude sm:text-[13px] sm:tracking-[0.18em]">JEDNOSTAVNO DO PRAVE OSOBE</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-brown sm:text-6xl">Od prvog razgovora do vaše dadilje.</h2>
        <ol className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.04}>
              <li className="home-glass relative h-full rounded-[28px] p-5 sm:p-6">
                <p className="font-serif text-3xl text-[#e8a8b8] drop-shadow-[0_0_16px_rgba(232,168,184,0.55)] lg:text-4xl">{step.n}</p>
                <h3 className="mt-3 font-serif text-2xl text-brown">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
