"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PortalSession } from "@/lib/portal/types";
import { ROLE_LABELS } from "@/lib/portal/types";

export function PortalShell({
  session,
  title,
  children,
}: {
  session: PortalSession;
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    router.replace("/portal/login");
    router.refresh();
  }

  return (
    <div className="portal-root min-h-dvh text-[#f6e8ec]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(180,90,120,0.28),_transparent_55%),linear-gradient(160deg,#1a0c12_0%,#2a1520_45%,#14080e_100%)]" />
        <div className="absolute -left-20 top-24 size-72 rounded-full bg-[#8a4058]/25 blur-3xl" />
        <div className="absolute -right-16 bottom-10 size-80 rounded-full bg-[#c97a8e]/15 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1a0c12]/70 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <div className="min-w-0">
            <Link href="/" className="font-serif text-xl text-[#faf2f4]">
              Moja dadilja
            </Link>
            <p className="truncate text-xs text-[#e8a8b8]/90">
              {ROLE_LABELS[session.role]} · {session.fullName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              Sajt
            </Link>
            <button
              type="button"
              onClick={logout}
              className="home-neon-btn rounded-full px-4 py-1.5 text-xs font-semibold"
            >
              Odjava
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="font-serif text-3xl leading-tight text-[#faf2f4] sm:text-4xl">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
