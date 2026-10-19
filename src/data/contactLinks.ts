import { contactHref, site } from "@/data/site";

export type ContactIntent = "family" | "application";

export function getContactLinks(intent: ContactIntent = "family") {
  return [
    {
      id: "phone" as const,
      label: "Pozovite nas",
      hint: intent === "application" ? "Prijava telefonom" : "Direktan poziv",
      href: contactHref("phone", { intent }),
      value: site.phone,
    },
    {
      id: "viber" as const,
      label: "Viber",
      hint: "Pošaljite poruku",
      href: contactHref("viber", { intent }),
      value: site.phone,
    },
    {
      id: "whatsapp" as const,
      label: "WhatsApp",
      hint: "Pošaljite poruku",
      href: contactHref("whatsapp", { intent }),
      value: site.phone,
    },
    {
      id: "sms" as const,
      label: "SMS",
      hint: "Pošaljite poruku",
      href: contactHref("sms", { intent }),
      value: site.phone,
    },
  ];
}

export const contactLinks = getContactLinks("family");

export type ContactLink = (typeof contactLinks)[number];
