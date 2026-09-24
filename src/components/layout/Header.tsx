"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const english = pathname.startsWith("/en");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition duration-300 ${
        scrolled || open ? "border-b border-[rgba(82,33,16,0.12)] bg-ivory/85 backdrop-blur-md" : "bg-ivory/70"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Glavna navigacija">
          {mainNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14.5px] font-medium ${active ? "text-brown" : "text-muted hover:text-brown"}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-[13px] font-semibold tracking-wide sm:flex" aria-label="Jezik">
            <Link href="/" className={english ? "text-muted" : "text-brown"} hrefLang="sr">
              SR
            </Link>
            <span className="text-nude">|</span>
            <Link href="/en" className={english ? "text-brown" : "text-muted"} hrefLang="en">
              EN
            </Link>
          </div>
          <Button href="/#upit" className="hidden md:inline-flex">
            Pronađi dadilju
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[rgba(82,33,16,0.12)] lg:hidden"
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
