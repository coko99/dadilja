"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const english = pathname.startsWith("/en");
  const home = pathname === "/";
  const floating = home && !scrolled && !open;

  useEffect(() => {
    document.documentElement.classList.add("home-theme");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
        floating
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[rgba(232,196,206,0.14)] bg-[#241018]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
        <Logo tone="light" />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Glavna navigacija">
          {mainNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium tracking-[-0.02em] ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-[13px] font-semibold tracking-wide text-white/80 sm:flex" aria-label="Jezik">
            <Link href="/" className={english ? "text-white/55" : "text-white"} hrefLang="sr">
              SR
            </Link>
            <span className="text-white/40">|</span>
            <Link href="/en" className={english ? "text-white" : "text-white/55"} hrefLang="en">
              EN
            </Link>
          </div>
          <Link
            href="/#upit"
            className="home-neon-btn hidden h-11 items-center rounded-full px-5 text-[13px] font-medium tracking-[0.04em] text-ivory lg:inline-flex"
          >
            Pronađi dadilju
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(242,210,220,0.35)] bg-white/5 text-white shadow-[0_0_18px_rgba(232,168,184,0.2)] backdrop-blur-md lg:hidden"
            aria-label="Otvori meni"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu strokeWidth={1.4} />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
