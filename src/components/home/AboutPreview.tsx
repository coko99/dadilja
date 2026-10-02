import { HeartHandshake, Shield } from "lucide-react";
import { servicesIntro } from "@/data/services";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-[#8a4058]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-[#5c3344]/30 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="home-glass-dark grid gap-8 rounded-[36px] p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:p-14">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-[#e8c4ce]">MOJA DADILJA</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">{servicesIntro.title}</h2>
            <div className="mt-6 max-w-2xl space-y-5 text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">
              {servicesIntro.paragraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/o-nama" variant="light">
                Upoznajte nas
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="home-glass rounded-[28px] p-6 text-white/85 sm:p-7">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <Shield strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <p className="mt-4 font-serif text-3xl text-white">Diskrecija. Ritam. Poverenje.</p>
              <p className="mt-3 text-[16px] leading-[1.7]">
                Pre početka saradnje jasno dogovaramo obaveze, granice i način komunikacije.
              </p>
            </div>
            <div className="home-glass rounded-[28px] p-6 text-white/85 sm:p-7">
              <span className="home-service-icon inline-flex size-11 items-center justify-center rounded-full">
                <HeartHandshake strokeWidth={1.15} className="size-[18px]" aria-hidden />
              </span>
              <p className="mt-4 font-serif text-2xl text-white">Individualan pristup</p>
              <p className="mt-3 text-[16px] leading-[1.7]">Tražimo osobu za vaše dete i vaš ritam — ne univerzalni profil.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
