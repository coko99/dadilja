import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="bg-blush-light">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-8 sm:py-28">
        <SectionHeading
          title="Tražite nekoga kome možete da poverite ono najvažnije?"
          text="Pozovite ili pošaljite poruku. Vodimo vas kroz naredne korake."
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/#upit">Javite nam se</Button>
          <Button href="/kontakt" variant="secondary">Kontaktirajte nas</Button>
        </div>
      </div>
    </section>
  );
}
