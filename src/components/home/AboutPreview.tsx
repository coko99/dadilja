import { servicesIntro } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section className="mx-auto grid max-w-[1240px] items-center gap-8 px-4 py-16 sm:gap-12 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-32">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">MOJA DADILJA</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-brown sm:text-5xl lg:text-6xl">{servicesIntro.title}</h2>
        <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
          {servicesIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
