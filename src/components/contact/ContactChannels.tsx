import { Mail, MessageSquare, Phone } from "lucide-react";
import { contactLinks, type ContactLink } from "@/data/contactLinks";
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

export function ContactChannels() {
  return (
    <div className="grid gap-3">
      {contactLinks.map((channel) => {
        const ready = Boolean(channel.href);
        const detail = isPlaceholder(channel.value) ? "Broj ili adresa biće dodati u podešavanjima" : channel.value;
        const className =
          "flex min-h-[72px] items-center gap-4 rounded-[20px] border border-[rgba(82,33,16,0.1)] bg-ivory px-4 py-4 text-left transition sm:px-5";
        const inner = (
          <>
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-cream text-brown">
              <ChannelMark id={channel.id} />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold tracking-[-0.02em] text-brown">{channel.label}</span>
              <span className="mt-0.5 block truncate text-sm text-muted">{ready ? detail : channel.hint}</span>
              {!ready ? <span className="mt-0.5 block text-xs text-nude">{detail}</span> : null}
            </span>
          </>
        );
        if (!channel.href) {
          return (
            <div key={channel.id} className={`${className} opacity-80`}>
              {inner}
            </div>
          );
        }
        const external = channel.id === "whatsapp";
        return (
          <a
            key={channel.id}
            href={channel.href}
            className={`${className} hover:border-brown`}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}
