import { CTASection } from "@/components/ui/CTASection";

export function FinalCta() {
  return (
    <CTASection
      title="Tražite nekoga kome možete da poverite ono najvažnije?"
      text="Pozovite ili pošaljite poruku. Vodimo vas kroz naredne korake."
      primaryHref="/#upit"
      primaryLabel="Javite nam se"
      secondaryHref="/kontakt"
      secondaryLabel="Kontaktirajte nas"
    />
  );
}
