import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 size-80 -translate-x-1/2 rounded-full bg-[#8a4058]/25 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <div className="home-glass-dark rounded-[32px] p-8 text-center sm:p-12">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-[#e8c4ce]">404</p>
          <h1 className="mt-4 font-serif text-5xl text-white">Ova stranica nije pronađena.</h1>
          <p className="mt-4 text-white/75">Link možda više nije aktivan. Vratite se na početnu ili pošaljite upit.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" className="home-neon-btn">
              Početna
            </Button>
            <Button href="/kontakt" variant="ghost" className="border-white/35">
              Kontakt
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
