"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { GlassCard } from "@/components/portal/GlassCard";
import { ActivityFeed } from "@/components/portal/ActivityFeed";
import { usePortalData } from "@/hooks/usePortalData";

export default function ParentPortalPage() {
  const router = useRouter();
  const { data, error, loading } = usePortalData(5000);
  const [childId, setChildId] = useState("");
  const [toast, setToast] = useState("");
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (error === "unauthorized") router.replace("/portal/login");
    else if (data && data.session.role !== "parent" && data.session.role !== "admin") {
      router.replace("/portal");
    }
  }, [error, data, router]);

  useEffect(() => {
    if (!data?.children.length) return;
    if (!childId) setChildId(data.children[0].id);
  }, [data, childId]);

  const child = useMemo(
    () => data?.children.find((c) => c.id === childId),
    [data, childId],
  );

  useEffect(() => {
    if (!child?.entries.length) return;
    const newest = child.entries[0];
    if (!seenRef.current.size) {
      child.entries.forEach((e) => seenRef.current.add(e.id));
      return;
    }
    if (!seenRef.current.has(newest.id)) {
      seenRef.current.add(newest.id);
      setToast(`Novo: ${newest.title}`);
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("Moja dadilja", { body: newest.title });
      }
      window.setTimeout(() => setToast(""), 4000);
    }
  }, [child]);

  async function enableNotifications() {
    if (!("Notification" in window)) return;
    await Notification.requestPermission();
  }

  if (loading || !data || (data.session.role !== "parent" && data.session.role !== "admin")) {
    return <div className="portal-root grid min-h-dvh place-items-center text-white/70">Učitavanje…</div>;
  }

  return (
    <PortalShell session={data.session} title="Dnevnik deteta">
      {!data.children.length ? (
        <GlassCard>
          <p className="text-white/75">Još nema povezanog deteta. Administrator će otvoriti pristup.</p>
        </GlassCard>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {data.children.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setChildId(item.id)}
                className={`rounded-full px-4 py-2 text-sm ${
                  item.id === childId
                    ? "home-neon-btn font-semibold"
                    : "border border-white/15 bg-black/20 text-white/80"
                }`}
              >
                {item.firstName}
              </button>
            ))}
            <button
              type="button"
              onClick={enableNotifications}
              className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/70"
            >
              Uključi obaveštenja
            </button>
          </div>

          {toast ? (
            <div className="mt-3 rounded-2xl border border-[#e8a8b8]/40 bg-[#8a4058]/40 px-4 py-3 text-sm text-[#faf2f4]">
              {toast}
            </div>
          ) : null}

          <GlassCard className="mt-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl text-[#faf2f4]">
                  {child?.firstName} {child?.lastName}
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Pregled je samo za čitanje. Zapise unosi dadilja.
                  {child?.openShift ? " · Čuvanje je trenutno aktivno." : ""}
                </p>
              </div>
              <p className="text-xs text-white/45">Osvežava se automatski</p>
            </div>
            <div className="mt-5">
              <ActivityFeed entries={child?.entries || []} />
            </div>
          </GlassCard>
        </>
      )}
    </PortalShell>
  );
}
