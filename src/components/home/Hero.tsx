"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const trust = ["Individualan pristup", "Pažljiv izbor kandidata", "Podrška porodici"];

export function Hero() {
  return (
    <section className="relative isolate -mt-[72px] min-h-[min(100vh,960px)] overflow-hidden pt-[72px] sm:-mt-20 sm:pt-20">
      <Image
        src="/images/hero.jpg"
        alt="Profesionalna dadilja brižno drži bebu — Moja dadilja, agencija za dadilje u Beogradu"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-[1.12] blur-[3px] saturate-[0.95]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,64,90,0.4),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(90,40,58,0.5),transparent_40%),linear-gradient(180deg,rgba(28,12,20,0.55)_0%,rgba(42,20,32,0.74)_45%,rgba(20,10,16,0.9)_100%)]" />
      <div className="pointer-events-none absolute -left-20 top-24 size-64 rounded-full bg-[#8a4058]/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-20 size-72 rounded-full bg-[#5c3344]/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(min(100vh,960px)-4.5rem)] max-w-[1280px] items-center px-4 py-16 sm:px-8 sm:py-20">
        <div className="home-glass-dark w-full max-w-3xl rounded-[32px] p-6 sm:p-10 lg:p-12">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[#e8c4ce]">DADILJA · BEOGRAD · SRBIJA</p>
          <h1 className="mt-5 font-serif text-[2.7rem] leading-[1.02] text-white sm:text-7xl lg:text-[5.1rem]">
            <span className="block">Prava dadilja</span>
            <span className="block">za vaše dete.</span>
            <span className="mt-1 block italic text-[#e8c4ce]">Mir koji</span>
            <span className="block italic text-[#e8c4ce]">vi zaslužujete</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">
            Moja dadilja je agencija za dadilje u Beogradu i Srbiji. Povezujemo porodice sa stručnim, odgovornim i pažljivo odabranim dadiljama, prilagođenim potrebama vašeg deteta i ritmu vaše porodice.
          </p>
          <p className="mt-3 font-medium text-white">Stručna i obučena dadilja u vašem domu.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#upit" className="home-neon-btn w-full sm:w-auto">
              Pronađi dadilju
            </Button>
            <Button href="/#kako-funkcionise" variant="ghost" className="w-full border-white/35 sm:w-auto">
              Kako funkcioniše
            </Button>
          </div>
          <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-sm text-white/75">
                <Check strokeWidth={1.6} className="size-4 text-[#e8a8b8] drop-shadow-[0_0_10px_rgba(232,168,184,0.85)]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
