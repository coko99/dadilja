import { contactHref, site } from "@/data/site";

export const contactLinks = [
  {
    id: "phone",
    label: "Pozovite nas",
    hint: "Direktan poziv",
    href: contactHref("phone"),
    value: site.phone,
  },
  {
    id: "viber",
    label: "Viber",
    hint: "Pošaljite poruku",
    href: contactHref("viber"),
    value: site.phone,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    hint: "Pošaljite poruku",
    href: contactHref("whatsapp"),
    value: site.phone,
  },
  {
    id: "sms",
    label: "SMS",
    hint: "Pošaljite poruku",
    href: contactHref("sms"),
    value: site.phone,
  },
  {
    id: "email",
    label: "E-mail",
    hint: "Pišite nam",
    href: contactHref("email"),
    value: site.email,
  },
] as const;

export type ContactLink = (typeof contactLinks)[number];
