export const site = {
  name: "Moja dadilja",
  tagline: "Stručna i obučena dadilja u vašem domu.",
  phone: "[UNESI TELEFON]",
  email: "[UNESI EMAIL]",
  address: "[UNESI ADRESU]",
  instagram: "[UNESI INSTAGRAM]",
  facebook: "[UNESI FACEBOOK]",
  /** Zamenite stvarnim domenom pre objave, ili podesite NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mojadadilja.rs",
  locale: "sr_RS",
  city: "Beograd",
} as const;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[UNESI");
}

export function contactHref(kind: "phone" | "email" | "instagram" | "facebook") {
  const value = site[kind];
  if (isPlaceholder(value)) return null;
  if (kind === "phone") return `tel:${value.replace(/\s/g, "")}`;
  if (kind === "email") return `mailto:${value}`;
  return value;
}
