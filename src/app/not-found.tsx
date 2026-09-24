import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28 text-center">
      <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">404</p>
      <h1 className="mt-4 font-serif text-5xl text-brown">Ova stranica nije pronađena.</h1>
      <p className="mt-4 text-muted">Link možda više nije aktivan. Vratite se na početnu ili pošaljite upit.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Početna</Button>
        <Button href="/kontakt" variant="secondary">Kontakt</Button>
      </div>
    </section>
  );
}
