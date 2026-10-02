"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  Home,
  Info,
  Mail,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { getLanguageFromPath, languages } from "@/data/languages";
import { Logo } from "@/components/brand/Logo";

const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/o-nama": Info,
  "/usluge": Sparkles,
  "/za-porodice": Users,
  "/za-dadilje": Baby,
  "/kontakt": Mail,
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const currentLang = getLanguageFromPath(pathname);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col overflow-hidden lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Meni"
        >
          <div className="absolute inset-0 bg-[#1a0c12]" />
          <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[#8a4058]/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-24 size-80 rounded-full bg-[#5c3344]/45 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full bg-[#c97a8e]/15 blur-3xl" />

          <motion.div
            className="relative flex h-[72px] items-center justify-between px-4"
            initial={reduce ? false : { y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo tone="light" />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(242,210,220,0.35)] bg-white/5 text-white shadow-[0_0_24px_rgba(232,168,184,0.25)] backdrop-blur-md"
              aria-label="Zatvori meni"
              onClick={onClose}
            >
              <X strokeWidth={1.6} className="size-5" />
            </button>
          </motion.div>

          <nav className="relative flex-1 overflow-y-auto px-4 pb-4" aria-label="Mobilna navigacija">
            <motion.p
              className="mb-4 text-[11px] font-medium tracking-[0.24em] text-[#e8c4ce]"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
            >
              NAVIGACIJA
            </motion.p>
            <ul className="grid gap-2.5">
              {mainNav.map((item, index) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = navIcons[item.href] ?? Sparkles;
                return (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.045, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`group flex min-h-[64px] items-center gap-4 rounded-[22px] border px-4 py-3 transition duration-300 ${
                        active
                          ? "border-[rgba(242,210,220,0.4)] bg-[linear-gradient(135deg,rgba(90,48,64,0.75),rgba(42,20,32,0.85))] shadow-[0_0_28px_rgba(232,168,184,0.18)]"
                          : "border-[rgba(242,210,220,0.12)] bg-[rgba(58,34,48,0.45)] hover:border-[rgba(242,210,220,0.28)] hover:bg-[rgba(74,42,56,0.55)]"
                      }`}
                    >
                      <span
                        className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full border ${
                          active
                            ? "border-[rgba(242,210,220,0.5)] bg-[rgba(48,24,36,0.9)] text-[#f0d4dc] shadow-[0_0_16px_rgba(232,168,184,0.45)]"
                            : "border-[rgba(242,210,220,0.22)] bg-[rgba(48,24,36,0.7)] text-[#e8c4ce]"
                        }`}
                      >
                        <Icon strokeWidth={1.2} className="size-[18px]" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[1.55rem] leading-none tracking-[-0.02em] text-white">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-[12px] tracking-[0.08em] text-white/45">
                          {active ? "TRENUTNA STRANA" : `0${index + 1}`}
                        </span>
                      </span>
                      <ArrowUpRight
                        strokeWidth={1.4}
                        className={`size-4 shrink-0 transition duration-300 ${
                          active ? "text-[#e8a8b8]" : "text-white/35 group-hover:text-white/70"
                        }`}
                        aria-hidden
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="relative px-4 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[28px] border border-[rgba(242,210,220,0.16)] bg-[rgba(42,20,32,0.72)] p-4 shadow-[0_20px_50px_rgba(8,2,10,0.45)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#e8c4ce]">JEZIK</p>
                <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
                  {languages.map((language) => (
                    <Link
                      key={language.code}
                      href={language.href}
                      hrefLang={language.hrefLang}
                      onClick={onClose}
                      className={`inline-flex h-9 min-w-11 items-center justify-center rounded-full px-2.5 text-[13px] font-semibold ${
                        currentLang === language.code
                          ? "bg-white/15 text-white shadow-[0_0_16px_rgba(232,168,184,0.25)]"
                          : "text-white/50"
                      }`}
                    >
                      {language.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/#upit"
                onClick={onClose}
                className="home-neon-btn flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-[0.04em] text-ivory"
              >
                Pronađi dadilju
                <ArrowUpRight strokeWidth={1.5} className="size-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
