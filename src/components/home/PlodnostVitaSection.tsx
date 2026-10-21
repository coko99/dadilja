import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { plodnostVita } from "@/data/plodnostVita";

export function PlodnostVitaSection() {
  return (
    <section
      id="plodnost-vita"
      className="relative isolate overflow-hidden px-4 py-14 sm:px-8 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(180,70,110,0.18),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(90,40,58,0.22),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-8 rounded-full bg-[#8a4058]/25 blur-3xl" aria-hidden />
          <Image
            src={plodnostVita.image}
            alt="Plodnost Vita — prirodna biljna mešavina za plodnost"
            width={1080}
            height={1080}
            className="relative mx-auto h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
            sizes="(max-width: 768px) 90vw, 420px"
          />
        </div>

        <div className="home-glass-dark rounded-[32px] p-6 sm:p-9">
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#e8c4ce]">PARTNER PREPORUKA</p>
          <h2 className="mt-3 font-serif text-4xl leading-[1.08] text-white sm:text-5xl">
            Plodnost <span className="text-[#f2a0c0]">Vita</span>
          </h2>
          <p className="mt-3 text-sm text-white/55">{plodnostVita.recipeBy}</p>
          <p className="mt-4 text-[17px] leading-[1.7] text-white/80">{plodnostVita.tagline}</p>

          <ul className="mt-6 space-y-2.5">
            {plodnostVita.benefits.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-snug text-white/75">
                <Check
                  strokeWidth={1.6}
                  className="mt-0.5 size-4 shrink-0 text-[#e8a8b8]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-white/45">{plodnostVita.note}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              href={plodnostVita.orderUrl}
              className="home-neon-btn w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Poruči Plodnost Vita
            </Button>
            <Button
              href={plodnostVita.orderUrl}
              variant="ghost"
              className="w-full border-white/30 sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Saznaj više
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
