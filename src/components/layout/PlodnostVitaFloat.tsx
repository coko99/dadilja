"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { plodnostVita } from "@/data/plodnostVita";

const DISMISS_KEY = "md-plodnost-vita-float-dismissed";

export function PlodnostVitaFloat() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (
    dismissed ||
    !visible ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/de")
  ) {
    return null;
  }

  function dismiss(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  return (
    <div className="pointer-events-none fixed bottom-[max(5.8rem,env(safe-area-inset-bottom))] left-3 z-40 md:bottom-8 md:left-6">
      <div className="plodnost-float pointer-events-auto relative">
        <button
          type="button"
          onClick={dismiss}
          className="absolute -right-1 -top-1 z-10 inline-flex size-7 items-center justify-center rounded-full border border-white/20 bg-[#1a0c12]/90 text-white/80 shadow-md"
          aria-label="Zatvori preporuku"
        >
          <X className="size-3.5" strokeWidth={2} />
        </button>
        <Link
          href="/#plodnost-vita"
          className="group flex w-[148px] flex-col items-center rounded-[22px] border border-[#e8a8b8]/35 bg-[#1a0c12]/88 p-2.5 shadow-[0_16px_40px_rgba(40,12,24,0.55)] backdrop-blur-md transition hover:border-[#e8a8b8]/60 sm:w-[168px]"
        >
          <Image
            src={plodnostVita.image}
            alt=""
            width={160}
            height={160}
            className="h-auto w-full drop-shadow-lg transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="mt-1 text-center text-[11px] font-semibold leading-tight text-[#faf2f4]">
            Plodnost <span className="text-[#f2a0c0]">Vita</span>
          </span>
          <span className="mt-0.5 text-[10px] text-[#e8c4ce]/90">Poruči →</span>
        </Link>
      </div>
    </div>
  );
}
