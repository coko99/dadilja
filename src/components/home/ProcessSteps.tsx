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
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-24 lg:py-32">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-nude sm:text-[13px] sm:tracking-[0.18em]">JEDNOSTAVNO DO PRAVE OSOBE</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-brown sm:text-6xl">Od prvog razgovora do vaše dadilje.</h2>
        <ol className="mt-10 border-l border-[rgba(82,33,16,0.12)] pl-6 lg:mt-14 lg:grid lg:grid-cols-5 lg:gap-8 lg:border-0 lg:pl-0">
          {steps.map((step) => (
            <li key={step.n} className="relative pb-8 last:pb-0 lg:pb-0">
              <p className="font-serif text-3xl text-accent lg:text-4xl">{step.n}</p>
              <h3 className="mt-2 font-serif text-2xl text-brown">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
