import { Button } from "@/components/ui/Button";

export function CTASection({
  title,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  text: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto size-96 -translate-y-1/2 rounded-full bg-[#8a4058]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="home-glass-dark rounded-[32px] p-7 sm:p-10">
          <h2 className="max-w-3xl font-serif text-[2.4rem] leading-[1.08] text-white sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} className="home-neon-btn">
              {primaryLabel}
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} variant="ghost" className="border-white/35">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
