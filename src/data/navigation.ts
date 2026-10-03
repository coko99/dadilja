export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Početna", href: "/" },
  { label: "O nama", href: "/o-nama" },
  { label: "Usluge", href: "/usluge" },
  { label: "Za porodice", href: "/za-porodice" },
  { label: "Za dadilje", href: "/za-dadilje" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerColumns = {
  brand: [
    { label: "O nama", href: "/o-nama" },
    { label: "Kako funkcioniše", href: "/#kako-funkcionise" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  info: [
    { label: "Za porodice", href: "/za-porodice" },
    { label: "Za dadilje", href: "/za-dadilje" },
    { label: "FAQ", href: "/#pitanja" },
  ],
  seo: [
    { label: "Dadilja Beograd", href: "/dadilja-beograd" },
    { label: "Agencija za dadilje", href: "/agencija-za-dadilje" },
    { label: "Čuvanje dece", href: "/cuvanje-dece" },
  ],
  legal: [
    { label: "Politika privatnosti", href: "/politika-privatnosti" },
    { label: "Uslovi korišćenja", href: "/uslovi-koriscenja" },
  ],
} as const;
