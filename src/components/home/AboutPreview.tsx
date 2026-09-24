import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">MOJA DADILJA</p>
        <h2 className="mt-4 font-serif text-5xl leading-[1.08] text-brown sm:text-6xl">Više od čuvanja deteta.</h2>
        <div className="mt-6 space-y-5 text-[18px] leading-[1.75] text-muted">
          <p>
            Verujemo da izbor dadilje nije samo pitanje rasporeda. To je odluka o osobi kojoj poveravate jedan od najvažnijih delova svog života.
          </p>
          <p>
            Zato porodicu i dadilju ne povezujemo nasumično. Želimo da razumemo vaš način života, potrebe deteta, dnevnu rutinu i očekivanja, kako bismo pronašli osobu koja se prirodno uklapa u vaš dom.
          </p>
          <p>Naš cilj je jednostavan – da roditelji imaju mir, a dete sigurnu, toplu i podsticajnu osobu pored sebe.</p>
        </div>
        <div className="mt-8">
          <Button href="/o-nama" variant="secondary">Upoznajte nas</Button>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <Photo src="/images/about.jpg" alt="Blizak trenutak roditelja i deteta u domu." className="aspect-[4/5]" sizes="(min-width: 1024px) 560px, 100vw" />
      </Reveal>
    </section>
  );
}
