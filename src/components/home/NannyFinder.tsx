import { ContactChannels } from "@/components/contact/ContactChannels";

export function NannyFinder() {
  return (
    <section id="upit" className="relative z-10 mx-auto mt-2 max-w-[860px] scroll-mt-24 px-4 pb-4 sm:px-8 lg:-mt-6">
      <div className="rounded-[24px] border border-[rgba(82,33,16,0.1)] bg-white p-5 sm:p-12">
        <h2 className="font-serif text-[2.1rem] leading-[1.08] text-brown sm:text-5xl">Javite nam se direktno.</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Pozovite, ili pošaljite poruku na WhatsApp, Viber ili e-mail. Nema forme. Javljamo se istim putem.
        </p>
        <div className="mt-8">
          <ContactChannels />
        </div>
      </div>
    </section>
  );
}
