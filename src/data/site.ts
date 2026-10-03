export const site = {
  name: "Moja dadilja",
  tagline: "Stručna i obučena dadilja u vašem domu.",
  phone: "+381 61 2628988",
  email: "[UNESI EMAIL]",
  address: "[UNESI ADRESU]",
  instagram: "[UNESI INSTAGRAM]",
  facebook: "[UNESI FACEBOOK]",
  /** Produkcijski domen. Može se override-ovati sa NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://moja-dadilja.rs",
  locale: "sr_RS",
  city: "Beograd",
  country: "Srbija",
} as const;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[UNESI");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function contactHref(kind: "phone" | "email" | "instagram" | "facebook" | "whatsapp" | "viber" | "sms") {
  if (kind === "whatsapp" || kind === "viber" || kind === "phone" || kind === "sms") {
    if (isPlaceholder(site.phone)) return null;
    const number = digits(site.phone);
    if (!number) return null;
    const text = encodeURIComponent("Zdravo, zanima me dadilja za moju porodicu.");
    if (kind === "phone") return `tel:+${number}`;
    if (kind === "whatsapp") return `https://wa.me/${number}?text=${text}`;
    if (kind === "sms") return `sms:+${number}?body=${text}`;
    return `viber://chat?number=%2B${number}`;
  }
  const value = site[kind];
  if (isPlaceholder(value)) return null;
  if (kind === "email") {
    const subject = encodeURIComponent("Upit za dadilju");
    return `mailto:${value}?subject=${subject}`;
  }
  return value;
}
