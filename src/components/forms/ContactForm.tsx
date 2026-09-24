"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Consent, Field, FormStatus, honeypotClass, SelectInput, TextArea, TextInput } from "@/components/forms/fields";

const topics = ["Pronalazak dadilje", "Postojeća saradnja", "Prijava za dadilje", "Ostalo"];

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    privacy: false,
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate() {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 3) next.name = "Unesite ime i prezime.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Unesite ispravnu e-mail adresu.";
    if (values.phone && !/^[0-9+()\s-]{6,}$/.test(values.phone)) next.phone = "Unesite ispravan telefon.";
    if (!values.topic) next.topic = "Izaberite temu.";
    if (values.message.trim().length < 10) next.message = "Poruka je prekratka.";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("fail");
      setStatus("success");
      setValues({ name: "", email: "", phone: "", topic: "", message: "", privacy: false, company: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className={honeypotClass} aria-hidden>
        <input tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => setValues({ ...values, company: e.target.value })} name="company" />
      </div>
      <Field label="Ime i prezime" name="name" error={errors.name}>
        <TextInput name="name" autoComplete="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-mail" name="email" error={errors.email}>
          <TextInput type="email" name="email" autoComplete="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        </Field>
        <Field label="Telefon" name="phone" error={errors.phone} required={false}>
          <TextInput name="phone" autoComplete="tel" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} />
        </Field>
      </div>
      <Field label="Tema" name="topic" error={errors.topic}>
        <SelectInput name="topic" value={values.topic} onChange={(e) => setValues({ ...values, topic: e.target.value })}>
          <option value="">Izaberite temu</option>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Poruka" name="message" error={errors.message}>
        <TextArea name="message" value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
      </Field>
      <Consent checked={values.privacy} onChange={(privacy) => setValues({ ...values, privacy })} error={errors.privacy} />
      <FormStatus status={status} success="Hvala. Poruka je primljena i javićemo vam se." />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Šaljemo…" : "Pošalji poruku"}
      </Button>
    </form>
  );
}
