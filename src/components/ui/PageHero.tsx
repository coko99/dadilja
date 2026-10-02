import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  text,
  actions,
}: {
  eyebrow: string;
  title: string;
  text: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-8 pb-4 sm:px-8 sm:pt-12 sm:pb-8">
      <div className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-[#8a4058]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-[#5c3344]/30 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="home-glass-dark rounded-[32px] p-6 sm:p-10 lg:p-12">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[#e8c4ce]">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-[2.5rem] leading-[1.05] text-white sm:text-6xl lg:text-[4.4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">{text}</p>
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
