import { CTASection } from "@/components/ui/CTASection";

export function FinalCta() {
  return (
    <CTASection
      title="Tražite nekoga kome možete da poverite ono najvažnije?"
      text="Recite nam šta vašoj porodici treba. Mi ćemo vas voditi kroz naredne korake."
      primaryHref="/#upit"
      primaryLabel="Pošalji upit"
      secondaryHref="/kontakt"
      secondaryLabel="Kontaktirajte nas"
    />
  );
}
