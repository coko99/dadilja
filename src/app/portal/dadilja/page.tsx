"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { GlassCard } from "@/components/portal/GlassCard";
import { ActivityFeed } from "@/components/portal/ActivityFeed";
import { usePortalData } from "@/hooks/usePortalData";
import { ACTIVITY_LABELS, type ActivityKind, type DiaryEntry } from "@/lib/portal/types";

const entryKinds = Object.keys(ACTIVITY_LABELS).filter(
  (k) => !["shift_start", "shift_end"].includes(k),
) as ActivityKind[];

export default function NannyPortalPage() {
  const router = useRouter();
  const { data, error, loading, reload } = usePortalData(8000);
  const [childId, setChildId] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (error === "unauthorized") router.replace("/portal/login");
    else if (data && data.session.role !== "nanny" && data.session.role !== "admin") {
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
    if (child) setEntries(child.entries);
  }, [child]);

  async function diaryAction(payload: Record<string, unknown>) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, childId }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Greška");
      if (json.entries) setEntries(json.entries);
      await reload();
      setMessage("Sačuvano.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Greška");
    } finally {
      setBusy(false);
    }
  }

  async function onAddEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let photoDataUrl: string | undefined;
    const file = form.get("photo");
    if (file instanceof File && file.size > 0) {
      if (file.size > 2.5 * 1024 * 1024) {
        setMessage("Fotografija može imati najviše 2.5 MB.");
        return;
      }
      photoDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
    await diaryAction({
      action: "addEntry",
      kind: form.get("kind"),
      title: form.get("title"),
      body: form.get("body"),
      photoDataUrl,
    });
    event.currentTarget.reset();
  }

  if (loading || !data || (data.session.role !== "nanny" && data.session.role !== "admin")) {
    return <div className="portal-root grid min-h-dvh place-items-center text-white/70">Učitavanje…</div>;
  }

  return (
    <PortalShell session={data.session} title="Dnevnik dadilje">
      {!data.children.length ? (
        <GlassCard>
          <p className="text-white/75">Još vam nije dodeljeno nijedno dete. Administrator će vas povezati.</p>
        </GlassCard>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
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
          </div>

          {message ? <p className="mt-3 text-sm text-[#e8a8b8]">{message}</p> : null}

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">
                {child?.firstName} {child?.lastName}
              </h2>
              <p className="mt-1 text-sm text-white/60">
                {child?.openShift ? "Čuvanje je aktivno" : "Čuvanje nije pokrenuto"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy || Boolean(child?.openShift)}
                  onClick={() => diaryAction({ action: "startShift" })}
                  className="home-neon-btn rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
                >
                  Počni čuvanje
                </button>
                <button
                  type="button"
                  disabled={busy || !child?.openShift}
                  onClick={() => diaryAction({ action: "endShift" })}
                  className="rounded-full border border-white/20 px-4 py-2.5 text-sm text-white/85 disabled:opacity-50"
                >
                  Završi čuvanje
                </button>
              </div>

              <form onSubmit={onAddEntry} className="mt-6 grid gap-3 text-sm">
                <select name="kind" className="portal-input" defaultValue="meal">
                  {entryKinds.map((kind) => (
                    <option key={kind} value={kind}>
                      {ACTIVITY_LABELS[kind]}
                    </option>
                  ))}
                </select>
                <input name="title" required placeholder="Naslov (npr. Ručak)" className="portal-input" />
                <textarea name="body" placeholder="Detalji" className="portal-input min-h-24" />
                <label className="text-white/70">
                  Fotografija (opciono)
                  <input name="photo" type="file" accept="image/*" className="mt-2 block w-full text-xs text-white/60" />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="home-neon-btn rounded-full px-4 py-2.5 font-semibold disabled:opacity-50"
                >
                  Dodaj aktivnost
                </button>
              </form>
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Današnji i prethodni unosi</h2>
              <div className="mt-4">
                <ActivityFeed entries={entries} />
              </div>
            </GlassCard>
          </div>
        </>
      )}
    </PortalShell>
  );
}
