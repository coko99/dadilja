import type { ReactNode } from "react";
import Link from "next/link";
import { contactHref, isPlaceholder, site } from "@/data/site";
import { footerColumns } from "@/data/navigation";
import { enabledServices } from "@/data/services";
import { Logo } from "@/components/brand/Logo";

function Social({ href, label, children }: { href: string | null; label: string; children: ReactNode }) {
  if (!href) {
    return (
      <span className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/50" aria-label={`${label} nije unet`}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-brown" aria-label={label} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brown pb-28 text-ivory md:pb-0">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 pb-8 sm:px-8 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Logo variant="full" />
          <div className="mt-6 space-y-1 text-sm text-blush">
            <p>{isPlaceholder(site.phone) ? "Telefon biće dodat" : site.phone}</p>
            <p>{isPlaceholder(site.email) ? "E-mail biće dodat" : site.email}</p>
            <p>{isPlaceholder(site.address) ? "Adresa biće dodata" : site.address}</p>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-blush">MOJA DADILJA</p>
          <ul className="mt-4 space-y-2">
            {footerColumns.brand.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-ivory/90 hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-blush">USLUGE</p>
          <ul className="mt-4 space-y-2">
            {enabledServices().map((service) => (
              <li key={service.slug}>
                <Link href={`/usluge/${service.slug}`} className="text-[15px] text-ivory/90 hover:text-white">{service.cardTitle}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-8">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-blush">INFORMACIJE</p>
            <ul className="mt-4 space-y-2">
              {footerColumns.info.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] text-ivory/90 hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] text-blush">LEGAL</p>
            <ul className="mt-4 space-y-2">
              {footerColumns.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] text-ivory/90 hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-5 px-5 py-6 sm:px-8">
          <div className="footer-heart" aria-hidden>
            <svg className="footer-heart-icon" viewBox="0 0 32 32">
              <path d="M16 27s-9.2-5.7-12.2-11.1C2.1 12.6 3.2 8.2 7.1 7.2c2.2-.6 4.2.3 5.4 2.1C13.7 7.5 15.7 6.6 17.9 7.2c3.9 1 5 5.4 3.3 8.7C25.2 21.3 16 27 16 27z" />
            </svg>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-blush">© {year} Moja dadilja. Sva prava zadržana.</p>
            <div className="flex gap-2">
              <Social href={contactHref("instagram")} label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
              </Social>
              <Social href={contactHref("facebook")} label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>
              </Social>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
