import { ContactChannels } from "@/components/contact/ContactChannels";

export function NannyFinder() {
  return (
    <section id="upit" className="relative z-10 mx-auto max-w-[900px] scroll-mt-24 px-4 py-10 sm:px-8 sm:py-14">
      <div className="home-glass overflow-visible rounded-[32px] p-6 shadow-[0_24px_80px_rgba(60,36,102,0.18)] sm:p-12">
        <h2 className="font-serif text-[2.1rem] leading-[1.15] text-brown sm:text-5xl">Javite nam se direktno.</h2>
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
