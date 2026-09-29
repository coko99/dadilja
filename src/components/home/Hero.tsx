"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";

const trust = ["Individualan pristup", "Pažljiv izbor kandidata", "Podrška porodici"];

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto grid max-w-[1280px] items-center gap-8 px-4 pt-4 pb-2 sm:gap-10 sm:px-8 sm:pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-14">
      <div className="order-2 lg:order-1">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-nude sm:text-[13px] sm:tracking-[0.18em]">PROFESIONALNA BRIGA O DECI</p>
        <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.02] font-medium tracking-tight text-brown sm:text-6xl lg:text-[5.2rem]">
          <span className="block">Prava osoba</span>
          <span className="block">za vaše dete.</span>
          <span className="mt-3 block text-brown-soft">Mir koji</span>
          <span className="block text-brown-soft">
            vi zaslužujete
            <motion.span
              className="ml-3 inline-block text-accent"
              aria-hidden
              animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-[18px] leading-[1.75] text-muted">
          Moja dadilja povezuje porodice sa stručnim, odgovornim i pažljivo odabranim dadiljama, prilagođenim potrebama vašeg deteta i ritmu vaše porodice.
        </p>
        <p className="mt-3 font-medium text-brown">Stručna i obučena dadilja u vašem domu.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/#upit" variant="accent" className="w-full sm:w-auto">Pronađi dadilju</Button>
          <Button href="/#kako-funkcionise" variant="secondary" className="w-full sm:w-auto">Kako funkcioniše</Button>
        </div>
        <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {trust.map((item) => (
            <li key={item} className="inline-flex items-center gap-2 text-sm text-muted">
              <Check strokeWidth={1.4} className="size-4 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Photo
        src="/images/hero.jpg"
        alt="Roditelj drži dete u toplom prirodnom svetlu."
        priority
        className="order-1 aspect-[5/4] min-h-0 sm:aspect-[4/5] lg:order-2 lg:min-h-[640px]"
        sizes="(min-width: 1024px) 46vw, 100vw"
      />
    </section>
  );
}
