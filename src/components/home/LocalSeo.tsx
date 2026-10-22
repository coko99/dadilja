import { ShieldCheck, Clock3 } from "lucide-react";

const points = [
  {
    title: "Agencija za dadilje",
    text: "Ne biramo prvu slobodnu osobu. Tražimo dadilju koja odgovara uzrastu deteta, ritmu kuće i vašim očekivanjima.",
    Icon: ShieldCheck,
  },
  {
    title: "Fleksibilno čuvanje dece",
    text: "Dadilja po satu, tokom radnog dana, 24h uz boravak u domu ili na putovanju — u skladu sa potrebama porodice.",
    Icon: Clock3,
  },
];

export function LocalSeo() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24" aria-labelledby="local-seo-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto size-96 rounded-full bg-[#8a4058]/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">ŠIROM SRBIJE</p>
        <h2 id="local-seo-heading" className="mt-4 max-w-3xl font-serif text-[2.4rem] leading-[1.08] text-brown sm:text-5xl">
          Tražite dadilju? Počnite sa jasnim razgovorom.
        </h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-[1.75] text-muted sm:text-[18px]">
          Moja dadilja je agencija za dadilje. Delujemo na teritoriji čitave Srbije, bez vezivanja za jedan grad.
          Pomažemo porodicama da pronađu stručnu i odgovornu osobu za čuvanje dece. Bez nepreglednih oglasa — uz pažljiv
          izbor i dogovor oko obaveza pre početka saradnje.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {points.map(({ title, text, Icon }) => (
            <article key={title} className="home-glass rounded-[28px] p-6 sm:p-7">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <h3 className="mt-5 font-serif text-[1.7rem] text-brown">{title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
