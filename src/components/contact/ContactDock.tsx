"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { contactLinks } from "@/data/contactLinks";
import { MessageChannels, PhoneChannel } from "@/components/contact/ContactChannels";

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
        className="home-neon-btn inline-flex size-14 items-center justify-center rounded-full text-ivory shadow-[0_12px_32px_rgba(90,36,54,0.45)]"
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
          className="home-glass w-[min(280px,calc(100vw-1.5rem))] rounded-[24px] p-3"
        >
          <p className="px-2 pt-1 font-serif text-[1.7rem] leading-none text-brown">Javite nam se</p>
          <div className="mt-3 grid gap-2">
            {contactLinks
              .filter((channel) => channel.id === "phone" || channel.id === "email")
              .map((channel) => (
                <PhoneChannel key={channel.id} channel={channel} compact />
              ))}
            <MessageChannels
              channels={contactLinks.filter((channel) => channel.id !== "phone" && channel.id !== "email")}
              compact
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
