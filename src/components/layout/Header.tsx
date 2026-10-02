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
    document.documentElement.classList.toggle("home-theme", pathname === "/");
    return () => document.documentElement.classList.remove("home-theme");
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`z-40 transition duration-300 ${
        home ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        floating
          ? "border-b border-transparent bg-transparent"
          : scrolled || open
            ? home
              ? "border-b border-[rgba(232,196,206,0.14)] bg-[#241018]/80 backdrop-blur-md"
              : "border-b border-[rgba(82,33,16,0.12)] bg-ivory/85 backdrop-blur-md"
            : home
              ? "bg-[#241018]/70"
              : "bg-ivory/70"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
        <Logo tone={floating ? "light" : "dark"} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Glavna navigacija">
          {mainNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium tracking-[-0.02em] ${
                  floating
                    ? active
                      ? "text-white"
                      : "text-white/75 hover:text-white"
                    : active
                      ? "text-brown"
                      : "text-muted hover:text-brown"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div
            className={`hidden items-center gap-2 text-[13px] font-semibold tracking-wide sm:flex ${floating ? "text-white/80" : ""}`}
            aria-label="Jezik"
          >
            <Link href="/" className={english ? (floating ? "text-white/55" : "text-muted") : floating ? "text-white" : "text-brown"} hrefLang="sr">
              SR
            </Link>
            <span className={floating ? "text-white/40" : "text-nude"}>|</span>
            <Link href="/en" className={english ? (floating ? "text-white" : "text-brown") : floating ? "text-white/55" : "text-muted"} hrefLang="en">
              EN
            </Link>
          </div>
          <Link
            href="/#upit"
            className={`hidden h-11 items-center rounded-full px-5 text-[13px] font-medium tracking-[0.04em] text-ivory lg:inline-flex ${
              floating ? "home-neon-btn" : "bg-brown"
            }`}
          >
            Pronađi dadilju
          </Link>
          <button
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-full lg:hidden ${
              floating ? "border border-white/30 text-white" : "border border-[rgba(82,33,16,0.12)]"
            }`}
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
