"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Languages, X } from "lucide-react";
import { getLanguageFromPath, languages } from "@/data/languages";

export function LanguageDock() {
  const pathname = usePathname();
  const current = getLanguageFromPath(pathname);
  const [open, setOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => {
    document.documentElement.lang = current === "sr" ? "sr" : current;
  }, [current]);

  return (
    <div
      ref={rootRef}
      className={`fixed z-50 left-3 flex flex-col-reverse items-start gap-3 md:left-6 md:bottom-8 ${
        raised ? "bottom-[calc(5.4rem+env(safe-area-inset-bottom))] md:bottom-8" : "bottom-[max(1rem,env(safe-area-inset-bottom))]"
      }`}
    >
      <button
        type="button"
        className="inline-flex size-14 items-center justify-center rounded-full border border-[rgba(242,210,220,0.35)] bg-[linear-gradient(145deg,#5c3344_0%,#3a2230_55%,#2a1520_100%)] text-[#f0d4dc] shadow-[0_12px_32px_rgba(90,36,54,0.45),0_0_24px_rgba(232,168,184,0.22)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Zatvori izbor jezika" : "Promeni jezik"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X strokeWidth={1.6} className="size-6" /> : <Languages strokeWidth={1.6} className="size-6" />}
      </button>

      {open ? (
        <div id={panelId} className="home-glass w-[min(240px,calc(100vw-1.5rem))] rounded-[24px] p-3">
          <p className="px-2 pt-1 font-serif text-[1.7rem] leading-none text-brown">Jezik</p>
          <p className="px-2 pt-1 text-xs text-muted">Izaberite jezik sajta</p>
          <ul className="mt-3 grid gap-1">
            {languages.map((language) => {
              const active = language.code === current;
              return (
                <li key={language.code}>
                  <Link
                    href={language.href}
                    hrefLang={language.hrefLang}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "true" : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-2xl px-2 py-2 text-left transition ${
                      active
                        ? "bg-[rgba(90,48,64,0.65)] shadow-[inset_0_0_0_1px_rgba(242,210,220,0.28)]"
                        : "hover:bg-[rgba(74,42,56,0.45)]"
                    }`}
                  >
                    <span
                      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold tracking-wide ${
                        active
                          ? "border-[rgba(242,210,220,0.5)] bg-[rgba(48,24,36,0.9)] text-[#f0d4dc] shadow-[0_0_16px_rgba(232,168,184,0.4)]"
                          : "border-[rgba(242,210,220,0.2)] bg-[rgba(48,24,36,0.7)] text-[#e8c4ce]"
                      }`}
                    >
                      {language.label}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-brown">{language.nativeLabel}</span>
                      <span className="block text-xs text-muted">{language.label}</span>
                    </span>
                    {active ? <Check strokeWidth={1.6} className="size-4 shrink-0 text-[#e8a8b8]" aria-hidden /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
