"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, FormStatus, honeypotClass, TextArea, TextInput } from "@/components/forms/fields";

const ages = ["0–1", "1–3", "3–6", "6–10", "10+"];
const types = ["po satu", "part-time", "full-time", "live-in", "vikend", "putovanja"];

export function NannyApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const required = ["firstName", "lastName", "birthDate", "city", "phone", "email", "experience", "availability"];
    required.forEach((key) => {
      if (!String(data.get(key) || "").trim()) next[key] = "Ovo polje je obavezno.";
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") || ""))) next.email = "Unesite ispravnu e-mail adresu.";
    if (!/^[0-9+()\s-]{6,}$/.test(String(data.get("phone") || ""))) next.phone = "Unesite ispravan telefon.";
    if (!data.getAll("ages").length) next.ages = "Izaberite bar jedan uzrast.";
    if (!data.getAll("types").length) next.types = "Izaberite bar jednu vrstu angažovanja.";
    if (!data.get("license")) next.license = "Izaberite da ili ne.";
    if (!data.get("privacy")) next.privacy = "Potrebna je saglasnost.";
    const cv = data.get("cv");
    if (!(cv instanceof File) || cv.size === 0) next.cv = "Dodajte CV.";
    else if (cv.size > 5 * 1024 * 1024) next.cv = "CV može imati najviše 5 MB.";
    const photo = data.get("photo");
    if (photo instanceof File && photo.size > 5 * 1024 * 1024) next.photo = "Fotografija može imati najviše 5 MB.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/nanny-application", { method: "POST", body: data });
      if (!response.ok) throw new Error("fail");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className={honeypotClass} aria-hidden>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ime" name="firstName" error={errors.firstName}>
          <TextInput name="firstName" autoComplete="given-name" />
        </Field>
        <Field label="Prezime" name="lastName" error={errors.lastName}>
          <TextInput name="lastName" autoComplete="family-name" />
        </Field>
        <Field label="Datum rođenja" name="birthDate" error={errors.birthDate}>
          <TextInput type="date" name="birthDate" />
        </Field>
        <Field label="Grad" name="city" error={errors.city}>
          <TextInput name="city" />
        </Field>
        <Field label="Telefon" name="phone" error={errors.phone}>
          <TextInput name="phone" autoComplete="tel" />
        </Field>
        <Field label="E-mail" name="email" error={errors.email}>
          <TextInput type="email" name="email" autoComplete="email" />
        </Field>
      </div>
      <Field label="Iskustvo u radu sa decom" name="experience" error={errors.experience}>
        <TextArea name="experience" placeholder="Ukratko opišite gde i sa kim ste radili." />
      </Field>
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold tracking-wide text-brown">
          Uzrast dece sa kojim imate iskustvo <span className="text-accent">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {ages.map((age) => (
            <label key={age} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(232,196,206,0.18)] px-4 text-sm text-brown">
              <input type="checkbox" name="ages" value={age} className="accent-[#c97a8e]" />
              {age}
            </label>
          ))}
        </div>
        {errors.ages ? <span className="mt-1.5 block text-sm text-[#f0a0b4]">{errors.ages}</span> : null}
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold tracking-wide text-brown">
          Vrsta angažovanja <span className="text-accent">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {types.map((type) => (
            <label key={type} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(232,196,206,0.18)] px-4 text-sm text-brown">
              <input type="checkbox" name="types" value={type} className="accent-[#c97a8e]" />
              {type}
            </label>
          ))}
        </div>
        {errors.types ? <span className="mt-1.5 block text-sm text-[#f0a0b4]">{errors.types}</span> : null}
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold tracking-wide text-brown">
          Vozačka dozvola <span className="text-accent">*</span>
        </legend>
        <div className="flex gap-3">
          {["da", "ne"].map((value) => (
            <label key={value} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(232,196,206,0.18)] px-4 text-sm text-brown">
              <input type="radio" name="license" value={value} className="accent-[#c97a8e]" />
              {value}
            </label>
          ))}
        </div>
        {errors.license ? <span className="mt-1.5 block text-sm text-[#f0a0b4]">{errors.license}</span> : null}
      </fieldset>
      <label className="block text-[13px] font-semibold tracking-wide text-brown">
        Znanje stranih jezika <span className="font-normal text-muted">(opciono)</span>
        <TextInput name="languages" className="mt-2 font-normal" />
      </label>
      <Field label="Dostupnost" name="availability" error={errors.availability}>
        <TextArea name="availability" placeholder="Dani, termini ili period od kada možete da počnete." />
      </Field>
      <label className="block text-[13px] font-semibold tracking-wide text-brown">
        CV <span className="text-accent">*</span>
        <input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" className="mt-2 block w-full text-sm font-normal text-muted" />
        {errors.cv ? <span className="mt-1.5 block text-sm font-normal text-[#f0a0b4]">{errors.cv}</span> : null}
      </label>
      <label className="block text-[13px] font-semibold tracking-wide text-brown">
        Fotografija — opciono
        <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full text-sm font-normal text-muted" />
        {errors.photo ? <span className="mt-1.5 block text-sm font-normal text-[#f0a0b4]">{errors.photo}</span> : null}
      </label>
      <label className="block text-[13px] font-semibold tracking-wide text-brown">
        Dodatna poruka
        <TextArea name="message" className="mt-2 font-normal" />
      </label>
      <label className="flex items-start gap-3 text-[14px] leading-relaxed text-muted">
        <input type="checkbox" name="privacy" required className="mt-1 size-5 accent-[#c97a8e]" />
        <span>
          Saglasan/na sam sa <a className="font-semibold text-brown underline" href="/politika-privatnosti">politikom privatnosti</a>.
        </span>
      </label>
      {errors.privacy ? <span className="text-sm text-[#f0a0b4]">{errors.privacy}</span> : null}
      <FormStatus status={status} success="Hvala. Prijava je primljena. Javićemo vam se ako profil odgovara trenutnim potrebama." />
      <Button type="submit" className="home-neon-btn" disabled={status === "loading"}>
        {status === "loading" ? "Šaljemo…" : "Pošalji prijavu"}
      </Button>
    </form>
  );
}
