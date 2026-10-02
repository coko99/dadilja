import type { Metadata } from "next";
import { Ear, HeartHandshake, MessagesSquare, ShieldCheck, Sparkles, Users } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { servicesIntro } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMeta({
  title: "O nama",
  description: "Moja dadilja povezuje porodice sa pažljivo odabranim dadiljama. Saznajte kako pristupamo izboru i saradnji.",
  path: "/o-nama",
});

const values = [
  { title: "Slušamo prvo", text: "Pre predloga želimo da razumemo ritam kuće, ne samo slobodan termin.", Icon: Ear },
  { title: "Biramo pažljivo", text: "Tražimo iskustvo, odgovornost i osobu koja odgovara konkretnoj porodici.", Icon: ShieldCheck },
  { title: "Ostajemo dostupni", text: "Komunikacija ne prestaje onog trenutka kada se dadilja i porodica upoznaju.", Icon: MessagesSquare },
];

const principles = [
  { title: "Diskrecija", text: "Dadilja se obavezuje da čuva privatnost porodice i pažljivo se odnosi prema domu.", Icon: Sparkles },
  { title: "Poverenje", text: "Jasno dogovaramo obaveze i granice pre početka — da znate šta možete da očekujete.", Icon: HeartHandshake },
  { title: "Uklapanje", text: "Ne tražimo univerzalnu dadilju. Tražimo osobu za vaše dete i vaš ritam.", Icon: Users },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O NAMA"
        title={servicesIntro.title}
        text={servicesIntro.paragraphs[0]}
        actions={
          <>
            <Button href="/#upit" className="home-neon-btn">
              Javite nam se
            </Button>
            <Button href="/za-porodice" variant="ghost" className="border-white/35">
              Za porodice
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8 sm:py-16">
        <div className="home-glass rounded-[32px] p-6 sm:p-10">
          <div className="max-w-3xl space-y-5 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
            {servicesIntro.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-8 sm:py-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-nude">PRISTUP</p>
        <h2 className="mt-4 font-serif text-[2.4rem] leading-[1.08] text-brown sm:text-5xl">Kako radimo</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map(({ title, text, Icon }) => (
            <article key={title} className="home-glass rounded-[28px] p-6 sm:p-7">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <h3 className="mt-5 font-serif text-[1.8rem] text-brown">{title}</h3>
              <p className="mt-3 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 pb-10 sm:px-8 sm:pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ title, text, Icon }) => (
            <article key={title} className="home-glass-dark rounded-[28px] p-6 sm:p-7">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Icon strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <h3 className="mt-5 font-serif text-[1.8rem] text-white">{title}</h3>
              <p className="mt-3 text-white/75">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Recite nam kakva vam je pomoć potrebna."
        text="Kratak poziv ili poruka je dovoljna da krenemo razgovor. Bez obaveze."
        primaryHref="/#upit"
        primaryLabel="Javite nam se"
        secondaryHref="/za-porodice"
        secondaryLabel="Za porodice"
      />
    </>
  );
}
