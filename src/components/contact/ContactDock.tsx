"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { contactLinks } from "@/data/contactLinks";
import { isPlaceholder } from "@/data/site";
import { ChannelMark } from "@/components/contact/ContactChannels";

export function ContactDock() {
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

  return (
    <div
      ref={rootRef}
      className={`fixed z-50 right-3 flex flex-col-reverse items-end gap-3 md:right-6 md:bottom-8 ${
        raised ? "bottom-[calc(5.4rem+env(safe-area-inset-bottom))] md:bottom-8" : "bottom-[max(1rem,env(safe-area-inset-bottom))]"
      }`}
    >
      <button
        type="button"
        className="inline-flex size-14 items-center justify-center rounded-full bg-brown text-ivory shadow-[0_12px_32px_rgba(82,33,16,0.28)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Zatvori kontakt" : "Javite nam se"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X strokeWidth={1.6} className="size-6" /> : <MessageCircle strokeWidth={1.6} className="size-6" />}
      </button>
      {open ? (
        <div
          id={panelId}
          className="w-[min(280px,calc(100vw-1.5rem))] rounded-[24px] border border-[rgba(82,33,16,0.12)] bg-ivory p-3 shadow-[0_18px_50px_rgba(82,33,16,0.16)]"
        >
          <p className="px-2 pt-1 font-serif text-[1.7rem] leading-none text-brown">Javite nam se</p>
          <ul className="mt-3 grid max-h-[min(70vh,420px)] gap-1 overflow-auto">
            {contactLinks.map((channel) => {
              const ready = Boolean(channel.href);
              const detail = ready && !isPlaceholder(channel.value) ? channel.value : "Biće dodato";
              const className = "flex min-h-12 items-center gap-3 rounded-2xl px-2 py-2 text-left";
              const inner = (
                <>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-brown">
                    <ChannelMark id={channel.id} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-brown">{channel.label}</span>
                    <span className="block truncate text-xs text-muted">{ready ? detail : "Biće dodato"}</span>
                  </span>
                </>
              );
              return (
                <li key={channel.id}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={`${className} hover:bg-cream`}
                      {...(channel.id === "whatsapp" ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={`${className} opacity-80`}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
