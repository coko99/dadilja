export const site = {
  name: "Moja dadilja",
  tagline: "Stručna i obučena dadilja u vašem domu.",
  phone: "+381 65 35 80 352",
  email: "info@moja-dadilja.rs",
  address: "Jasički put 9a, Kruševac",
  instagram: "[UNESI INSTAGRAM]",
  facebook: "[UNESI FACEBOOK]",
  /** Produkcijski domen. Može se override-ovati sa NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://moja-dadilja.rs",
  locale: "sr_RS",
  city: "Kruševac",
  country: "Srbija",
} as const;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[UNESI");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

const defaultMessage = "Zdravo, zanima me dadilja za moju porodicu.";
const applicationMessage = "Zdravo, želim da se prijavim za posao dadilje.";

export function contactHref(
  kind: "phone" | "email" | "instagram" | "facebook" | "whatsapp" | "viber" | "sms",
  options?: { intent?: "family" | "application" },
) {
  if (kind === "email") {
    if (isPlaceholder(site.email)) return null;
    const subject = options?.intent === "application" ? "Prijava za posao dadilje" : "Upit za dadilju";
    const body = options?.intent === "application" ? applicationMessage : defaultMessage;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  if (kind === "whatsapp" || kind === "viber" || kind === "phone" || kind === "sms") {
    if (isPlaceholder(site.phone)) return null;
    const number = digits(site.phone);
    if (!number) return null;
    const text = encodeURIComponent(
      options?.intent === "application" ? applicationMessage : defaultMessage,
    );
    if (kind === "phone") return `tel:+${number}`;
    if (kind === "whatsapp") return `https://wa.me/${number}?text=${text}`;
    if (kind === "sms") return `sms:+${number}?body=${text}`;
    return `viber://chat?number=%2B${number}`;
  }
  const value = site[kind];
  if (isPlaceholder(value)) return null;
  return value;
}
