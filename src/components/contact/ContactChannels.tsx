"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { getContactLinks, type ContactIntent, type ContactLink } from "@/data/contactLinks";
import { isPlaceholder } from "@/data/site";

export function ChannelMark({ id }: { id: ContactLink["id"] }) {
  if (id === "phone") return <Phone strokeWidth={1.5} className="size-5" />;
  if (id === "email") return <Mail strokeWidth={1.5} className="size-5" />;
  if (id === "sms") return <MessageSquare strokeWidth={1.5} className="size-5" />;
  if (id === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 11.5A8.5 8.5 0 0 1 7.4 18.6L4 20l1.5-3.3A8.5 8.5 0 1 1 20 11.5z" />
        <path d="M9 10.2c.2 1.6 1.8 3.1 3.4 3.5l1-.9c.2-.2.4-.2.6 0l1.2.7c.2.1.3.4.2.6-.3.8-1.2 1.2-2 .9-2.2-.7-4-2.6-4.6-4.8-.2-.8.2-1.6 1-1.8l.7.1c.2 0 .4.2.4.4l.1 1.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M10 18h4" />
    </svg>
  );
}

function channelDetail(channel: ContactLink) {
  if (!channel.href || isPlaceholder(channel.value)) {
    return channel.id === "email" ? "Email biće dodat" : "Broj biće dodat u podešavanjima";
  }
  return channel.value;
}

export function PhoneChannel({
  channel,
  compact = false,
}: {
  channel: ContactLink;
  compact?: boolean;
}) {
  const detail = channelDetail(channel);
  const className = compact
    ? "flex min-h-12 w-full items-center gap-3 rounded-2xl px-2 py-2 text-left hover:bg-cream"
    : "flex min-h-[72px] items-center gap-4 rounded-[20px] border border-[rgba(232,196,206,0.16)] bg-[rgba(74,42,56,0.45)] px-4 py-4 text-left transition hover:border-[rgba(232,196,206,0.35)] sm:px-5";
  const inner = (
    <>
      <span
        className={
          compact
            ? "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-brown"
            : "home-service-icon inline-flex size-11 shrink-0 items-center justify-center rounded-full"
        }
      >
        <ChannelMark id={channel.id} />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold tracking-[-0.02em] text-brown">
          {channel.label}
        </span>
        <span className={`block truncate text-muted ${compact ? "text-xs" : "mt-0.5 text-sm"}`}>{detail}</span>
      </span>
    </>
  );
  if (!channel.href) {
    return <div className={`${className} opacity-80`}>{inner}</div>;
  }
  return (
    <a href={channel.href} className={className}>
      {inner}
    </a>
  );
}

export function MessageChannels({
  channels,
  compact = false,
}: {
  channels: ContactLink[];
  compact?: boolean;
}) {
  const [openId, setOpenId] = useState<ContactLink["id"] | null>(null);
  const open = channels.find((channel) => channel.id === openId) ?? null;

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Viber, WhatsApp i SMS">
        {channels.map((channel) => {
          const active = openId === channel.id;
          return (
            <button
              key={channel.id}
              type="button"
              aria-expanded={active}
              aria-controls={active ? `broj-${channel.id}` : undefined}
              aria-label={active ? `Sakrij broj za ${channel.label}` : `${channel.label}, prikaži broj`}
              onClick={() => setOpenId((current) => (current === channel.id ? null : channel.id))}
              className={
                compact
                  ? `inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-cream p-0 text-brown transition ${active ? "ring-2 ring-brown/40" : "hover:bg-white"}`
                  : `home-service-icon inline-flex size-12 cursor-pointer items-center justify-center rounded-full p-0 transition ${active ? "ring-2 ring-[#e8c4ce]/70" : ""}`
              }
            >
              <ChannelMark id={channel.id} />
            </button>
          );
        })}
      </div>
      {open ? (
        <div
          id={`broj-${open.id}`}
          className={
            compact
              ? "mt-2 rounded-2xl bg-cream/70 px-3 py-2"
              : "mt-3 rounded-[20px] border border-[rgba(232,196,206,0.16)] bg-[rgba(74,42,56,0.45)] px-4 py-3"
          }
        >
          <p className="text-sm font-semibold text-brown">{open.label}</p>
          {open.href && !isPlaceholder(open.value) ? (
            <a
              href={open.href}
              className="mt-0.5 block text-sm text-muted underline-offset-2 hover:underline"
              {...(open.id === "whatsapp" ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {open.value}
            </a>
          ) : (
            <p className="mt-0.5 text-sm text-muted">Broj biće dodat u podešavanjima</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function ContactChannels({ intent = "family" }: { intent?: ContactIntent }) {
  const links = getContactLinks(intent);
  const direct = links.filter((channel) => channel.id === "phone" || channel.id === "email");
  const messages = links.filter((channel) => channel.id !== "phone" && channel.id !== "email");

  return (
    <div className="grid gap-3">
      {direct.map((channel) => (
        <PhoneChannel key={channel.id} channel={channel} />
      ))}
      <MessageChannels channels={messages} />
    </div>
  );
}
