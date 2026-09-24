"use client";

import { useState } from "react";
import { engagementOptions } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Consent, Field, FormStatus, honeypotClass, SelectInput, TextInput } from "@/components/forms/fields";

type Errors = Record<string, string>;

const initial = {
  children: "",
  ages: "",
  city: "",
  period: "",
  timeFrom: "",
  timeTo: "",
  engagement: "",
  name: "",
  phone: "",
  email: "",
  privacy: false,
  company: "",
};

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function set<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    const next: Errors = {};
    if (!values.children.trim()) next.children = "Unesite broj dece.";
    if (!values.ages.trim()) next.ages = "Unesite uzrast.";
    if (!values.city.trim()) next.city = "Unesite grad.";
    if (!values.period.trim()) next.period = "Unesite datum ili period.";
    if (!values.engagement) next.engagement = "Izaberite vrstu angažovanja.";
    if (values.name.trim().length < 3) next.name = "Unesite ime i prezime.";
    if (!/^[0-9+()\s-]{6,}$/.test(values.phone)) next.phone = "Unesite ispravan telefon.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Unesite ispravnu e-mail adresu.";
    if (!values.privacy) next.privacy = "Potrebna je saglasnost.";
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("fail");
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className={honeypotClass} aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => set("company", e.target.value)} name="company" />
        </label>
      </div>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Broj dece" name="children" error={errors.children}>
          <TextInput name="children" value={values.children} onChange={(e) => set("children", e.target.value)} invalid={!!errors.children} />
        </Field>
        <Field label="Uzrast deteta/dece" name="ages" error={errors.ages}>
          <TextInput name="ages" value={values.ages} onChange={(e) => set("ages", e.target.value)} placeholder="npr. 2 i 5 godina" />
        </Field>
        <Field label="Grad" name="city" error={errors.city}>
          <TextInput name="city" value={values.city} onChange={(e) => set("city", e.target.value)} />
        </Field>
        <Field label="Datum / period" name="period" error={errors.period}>
          <TextInput name="period" value={values.period} onChange={(e) => set("period", e.target.value)} />
        </Field>
        <Field label="Vreme od" name="timeFrom" required={false}>
          <TextInput type="time" name="timeFrom" value={values.timeFrom} onChange={(e) => set("timeFrom", e.target.value)} />
        </Field>
        <Field label="Vreme do" name="timeTo" required={false}>
          <TextInput type="time" name="timeTo" value={values.timeTo} onChange={(e) => set("timeTo", e.target.value)} />
        </Field>
      </div>
      <Field label="Vrsta angažovanja" name="engagement" error={errors.engagement}>
        <SelectInput name="engagement" value={values.engagement} onChange={(e) => set("engagement", e.target.value)}>
          <option value="">Izaberite</option>
          {engagementOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectInput>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ime i prezime" name="name" error={errors.name}>
          <TextInput name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Telefon" name="phone" error={errors.phone}>
          <TextInput name="phone" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
      </div>
      <Field label="E-mail" name="email" error={errors.email}>
        <TextInput type="email" name="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
      </Field>
      <Consent checked={values.privacy} onChange={(value) => set("privacy", value)} error={errors.privacy} />
      <FormStatus status={status} success="Hvala. Upit je primljen. Javićemo vam se sa narednim koracima." />
      <div>
        <Button type="submit" variant="accent" disabled={status === "loading"}>
          {status === "loading" ? "Šaljemo…" : "Pošalji upit"}
        </Button>
        <p className="mt-3 text-[13px] text-muted">Slanjem upita ne preuzimate nikakvu obavezu.</p>
      </div>
    </form>
  );
}
