const steps = [
  { n: "01", title: "Pošaljete upit", text: "Kažete nam kada vam je dadilja potrebna i šta očekujete." },
  { n: "02", title: "Upoznajemo porodicu", text: "Razgovaramo o detetu, rutini, obavezama i tipu osobe koja bi vam najviše odgovarala." },
  { n: "03", title: "Biramo odgovarajuće kandidate", text: "Na osnovu vaših potreba izdvajamo profile koji najbolje odgovaraju porodici." },
  { n: "04", title: "Upoznavanje", text: "Porodica i kandidat dobijaju priliku da se upoznaju pre konačne odluke." },
  { n: "05", title: "Početak saradnje", text: "Nakon dogovora, dadilja započinje angažovanje prema definisanim uslovima." },
];

export function ProcessSteps() {
  return (
    <section id="kako-funkcionise" className="bg-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">JEDNOSTAVNO DO PRAVE OSOBE</p>
        <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-brown sm:text-6xl">Od prvog razgovora do vaše dadilje.</h2>
        <ol className="mt-14 grid gap-8 lg:grid-cols-5">
          {steps.map((step) => (
            <li key={step.n} className="relative">
              <p className="font-serif text-4xl text-accent">{step.n}</p>
              <h3 className="mt-3 text-sm font-semibold tracking-[0.12em] text-brown uppercase">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
