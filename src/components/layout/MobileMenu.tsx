"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

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
          className="fixed inset-0 z-[80] flex flex-col bg-ivory lg:hidden"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Meni"
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Logo />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(82,33,16,0.12)]"
              aria-label="Zatvori meni"
              onClick={onClose}
            >
              <X strokeWidth={1.6} className="size-5" />
            </button>
          </div>
          <nav className="mt-2 flex-1 overflow-y-auto px-4" aria-label="Mobilna navigacija">
            {mainNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 items-center border-b border-[rgba(82,33,16,0.08)] text-[1.35rem] font-medium tracking-[-0.03em] ${
                    active ? "text-brown" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex gap-2 text-sm font-semibold">
              <Link href="/" hrefLang="sr" onClick={onClose} className="inline-flex h-11 items-center rounded-full bg-cream px-4 text-brown">
                SR
              </Link>
              <Link href="/en" hrefLang="en" onClick={onClose} className="inline-flex h-11 items-center rounded-full border border-[rgba(82,33,16,0.12)] px-4 text-muted">
                EN
              </Link>
            </div>
            <Link
              href="/#upit"
              onClick={onClose}
              className="flex h-12 items-center justify-center rounded-full bg-brown text-sm font-semibold text-ivory"
            >
              Pronađi dadilju
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
