"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-ivory px-6 py-6 lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex justify-end">
            <button type="button" className="inline-flex size-11 items-center justify-center" aria-label="Zatvori meni" onClick={onClose}>
              <X strokeWidth={1.4} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-2" aria-label="Mobilna navigacija">
            {mainNav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.35 }}
              >
                <Link href={item.href} onClick={onClose} className="block py-2 font-serif text-4xl text-brown">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mt-8 flex gap-4 text-sm font-semibold">
            <Link href="/" hrefLang="sr">SR</Link>
            <Link href="/en" hrefLang="en">EN</Link>
          </div>
          <div className="mt-auto pb-6">
            <Button href="/#upit" variant="accent" className="w-full" onClick={onClose}>
              Pronađi dadilju
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
