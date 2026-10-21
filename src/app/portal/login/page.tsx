"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/portal/GlassCard";

const demos = [
  { role: "Administrator", email: "admin@moja-dadilja.rs", password: "admin123" },
  { role: "Dadilja", email: "dadilja@moja-dadilja.rs", password: "dadilja123" },
  { role: "Roditelj", email: "roditelj@moja-dadilja.rs", password: "roditelj123" },
];

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@moja-dadilja.rs");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Prijava nije uspela.");
      if (data.role === "admin") router.replace("/portal/admin");
      else if (data.role === "nanny") router.replace("/portal/dadilja");
      else router.replace("/portal/roditelj");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portal-root flex min-h-dvh items-center justify-center px-4 py-10 text-[#f6e8ec]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(180,90,120,0.3),_transparent_55%),linear-gradient(160deg,#1a0c12,#2a1520,#14080e)]" />
      <div className="w-full max-w-md">
        <p className="text-center text-[11px] font-medium tracking-[0.22em] text-[#e8a8b8]">PORTAL</p>
        <h1 className="mt-2 text-center font-serif text-4xl text-[#faf2f4]">Prijavite se</h1>
        <p className="mt-2 text-center text-sm text-white/65">
          Za administratore, dadilje i roditelje.{" "}
          <Link href="/" className="text-[#e8a8b8] underline-offset-2 hover:underline">
            Nazad na sajt
          </Link>
        </p>

        <GlassCard className="mt-8">
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="grid gap-1.5 text-sm">
              <span className="text-white/70">E-mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-[#faf2f4] outline-none focus:border-[#e8a8b8]"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="text-white/70">Lozinka</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-[#faf2f4] outline-none focus:border-[#e8a8b8]"
              />
            </label>
            {error ? <p className="text-sm text-[#f0a0b4]">{error}</p> : null}
            <button type="submit" disabled={loading} className="home-neon-btn rounded-full px-5 py-3 text-sm font-semibold">
              {loading ? "Prijava…" : "Prijavi se"}
            </button>
          </form>
        </GlassCard>

        <GlassCard className="mt-4">
          <p className="text-xs font-medium tracking-[0.16em] text-[#e8a8b8]">DEMO NALOZI</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {demos.map((demo) => (
              <li key={demo.email}>
                <button
                  type="button"
                  className="w-full rounded-xl px-2 py-2 text-left hover:bg-white/5"
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword(demo.password);
                  }}
                >
                  <span className="font-semibold text-[#faf2f4]">{demo.role}</span>
                  <span className="mt-0.5 block text-xs text-white/55">
                    {demo.email} · {demo.password}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
