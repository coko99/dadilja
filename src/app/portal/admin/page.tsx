"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { GlassCard } from "@/components/portal/GlassCard";
import { usePortalData } from "@/hooks/usePortalData";
import { ROLE_LABELS, type UserRole } from "@/lib/portal/types";

export default function AdminPortalPage() {
  const router = useRouter();
  const { data, error, loading, reload } = usePortalData();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (error === "unauthorized") router.replace("/portal/login");
    else if (data && data.session.role !== "admin") router.replace("/portal");
  }, [error, data, router]);

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/portal/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "createUser",
        fullName: form.get("fullName"),
        email: form.get("email"),
        role: form.get("role"),
        password: form.get("password"),
        phone: form.get("phone"),
      }),
    });
    const json = await response.json();
    setMessage(response.ok ? "Nalog je kreiran." : json.error || "Greška");
    if (response.ok) {
      event.currentTarget.reset();
      await reload();
    }
  }

  async function createChild(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parentIds = form.getAll("parentIds").map(String);
    const response = await fetch("/api/portal/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "createChild",
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        birthDate: form.get("birthDate"),
        notes: form.get("notes"),
        parentIds,
      }),
    });
    const json = await response.json();
    setMessage(response.ok ? "Dete je dodato." : json.error || "Greška");
    if (response.ok) {
      event.currentTarget.reset();
      await reload();
    }
  }

  async function assignNanny(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/portal/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "assignNanny",
        nannyId: form.get("nannyId"),
        childId: form.get("childId"),
      }),
    });
    const json = await response.json();
    setMessage(response.ok ? "Dadilja je dodeljena." : json.error || "Greška");
    if (response.ok) await reload();
  }

  if (loading || !data || data.session.role !== "admin") {
    return <div className="portal-root grid min-h-dvh place-items-center text-white/70">Učitavanje…</div>;
  }

  return (
    <PortalShell session={data.session} title="Administracija">
      {message ? <p className="mb-4 text-sm text-[#e8a8b8]">{message}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="font-serif text-2xl text-[#faf2f4]">Novi nalog</h2>
          <form onSubmit={createUser} className="mt-4 grid gap-3 text-sm">
            <input name="fullName" required placeholder="Ime i prezime" className="portal-input" />
            <input name="email" type="email" required placeholder="E-mail" className="portal-input" />
            <input name="phone" placeholder="Telefon" className="portal-input" />
            <select name="role" className="portal-input" defaultValue="parent">
              {(["parent", "nanny", "admin"] as UserRole[]).map((role) => (
                <option key={role} value={role}>
                  {ROLE_LABELS[role]}
                </option>
              ))}
            </select>
            <input name="password" required placeholder="Privremena lozinka" className="portal-input" defaultValue="promeni123" />
            <button type="submit" className="home-neon-btn rounded-full px-4 py-2.5 font-semibold">
              Kreiraj nalog
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="font-serif text-2xl text-[#faf2f4]">Novo dete</h2>
          <form onSubmit={createChild} className="mt-4 grid gap-3 text-sm">
            <input name="firstName" required placeholder="Ime" className="portal-input" />
            <input name="lastName" required placeholder="Prezime" className="portal-input" />
            <input name="birthDate" type="date" className="portal-input" />
            <textarea name="notes" placeholder="Napomene" className="portal-input min-h-20" />
            <fieldset>
              <legend className="mb-2 text-white/70">Poveži roditelje</legend>
              <div className="space-y-2">
                {data.parents.map((parent) => (
                  <label key={parent.id} className="flex items-center gap-2 text-white/85">
                    <input type="checkbox" name="parentIds" value={parent.id} />
                    {parent.fullName}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="home-neon-btn rounded-full px-4 py-2.5 font-semibold">
              Sačuvaj dete
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="font-serif text-2xl text-[#faf2f4]">Dodeli dadilju</h2>
          <form onSubmit={assignNanny} className="mt-4 grid gap-3 text-sm">
            <select name="nannyId" required className="portal-input" defaultValue="">
              <option value="" disabled>
                Izaberi dadilju
              </option>
              {data.nannies.map((nanny) => (
                <option key={nanny.id} value={nanny.id}>
                  {nanny.fullName}
                </option>
              ))}
            </select>
            <select name="childId" required className="portal-input" defaultValue="">
              <option value="" disabled>
                Izaberi dete
              </option>
              {data.children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              ))}
            </select>
            <button type="submit" className="home-neon-btn rounded-full px-4 py-2.5 font-semibold">
              Dodeli
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="font-serif text-2xl text-[#faf2f4]">Korisnici</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {data.users.map((user) => (
              <li key={user.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                <p className="font-semibold text-[#faf2f4]">{user.fullName}</p>
                <p className="text-xs text-white/55">
                  {ROLE_LABELS[user.role]} · {user.email}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-4">
        <h2 className="font-serif text-2xl text-[#faf2f4]">Dodele i aktivnost</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/75">
          {data.assignments.map((a) => {
            const nanny = data.users.find((u) => u.id === a.nannyId);
            const child = data.children.find((c) => c.id === a.childId);
            const by = data.users.find((u) => u.id === a.assignedBy);
            return (
              <li key={a.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                {nanny?.fullName || "Dadilja"} → {child?.firstName} {child?.lastName}
                <span className="mt-0.5 block text-xs text-white/50">
                  Dodela: {new Date(a.assignedAt).toLocaleString("sr-RS")}
                  {by ? ` · od ${by.fullName}` : ""}
                </span>
              </li>
            );
          })}
        </ul>
        <h3 className="mt-6 text-sm font-semibold tracking-wide text-[#e8a8b8]">Evidencija pristupa</h3>
        <ul className="mt-3 max-h-64 space-y-1 overflow-auto text-xs text-white/55">
          {data.accessLogs.map((log) => (
            <li key={log.id}>
              {new Date(log.createdAt).toLocaleString("sr-RS")} — {log.action}
            </li>
          ))}
        </ul>
      </GlassCard>
    </PortalShell>
  );
}
