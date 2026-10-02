export type LanguageCode = "sr" | "en" | "de";

export type LanguageOption = {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  href: string;
  hrefLang: string;
};

export const languages: LanguageOption[] = [
  { code: "sr", label: "SR", nativeLabel: "Srpski", href: "/", hrefLang: "sr" },
  { code: "en", label: "EN", nativeLabel: "English", href: "/en", hrefLang: "en" },
  { code: "de", label: "DE", nativeLabel: "Deutsch", href: "/de", hrefLang: "de" },
];

export function getLanguageFromPath(pathname: string): LanguageCode {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return "sr";
}
