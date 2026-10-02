import Image from "next/image";
import { servicesIntro } from "@/data/services";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[36px]">
        <Image
          src="/images/about.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-[3px]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(28,12,20,0.84)_0%,rgba(74,42,56,0.74)_55%,rgba(28,12,20,0.55)_100%)]" />
        <div className="pointer-events-none absolute right-0 top-0 size-80 rounded-full bg-[#8a4058]/30 blur-3xl" />
        <div className="relative grid gap-8 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-16 lg:py-24">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-[#e8c4ce]">MOJA DADILJA</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">{servicesIntro.title}</h2>
            <div className="mt-6 max-w-2xl space-y-5 text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">
              {servicesIntro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/o-nama" variant="light">Upoznajte nas</Button>
            </div>
          </div>
          <div className="home-glass-dark rounded-[28px] p-6 text-white/85 sm:p-8">
            <p className="font-serif text-3xl text-white">Diskrecija. Ritam. Poverenje.</p>
            <p className="mt-4 text-[16px] leading-[1.7]">
              Pre početka saradnje jasno dogovaramo obaveze, granice i način komunikacije — kako bi porodica znala šta može da očekuje.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
