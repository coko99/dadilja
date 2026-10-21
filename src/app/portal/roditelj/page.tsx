"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { GlassCard } from "@/components/portal/GlassCard";
import { ActivityFeed } from "@/components/portal/ActivityFeed";
import { ChatPanel } from "@/components/portal/ChatPanel";
import { ScheduleCalendar } from "@/components/portal/ScheduleCalendar";
import { StarRating } from "@/components/portal/StarRating";
import { usePortalData } from "@/hooks/usePortalData";

export default function ParentPortalPage() {
  const router = useRouter();
  const { data, error, loading, reload } = usePortalData(5000);
  const [childId, setChildId] = useState("");
  const [toast, setToast] = useState("");
  const [msg, setMsg] = useState("");
  const [rateScore, setRateScore] = useState(5);
  const [rateComment, setRateComment] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [selectedNannyId, setSelectedNannyId] = useState("");
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

  useEffect(() => {
    if (!data?.assignedNannies?.length) return;
    if (!selectedNannyId) setSelectedNannyId(data.assignedNannies[0].id);
  }, [data, selectedNannyId]);

  const child = useMemo(
    () => data?.children.find((c) => c.id === childId),
    [data, childId],
  );

  const selectedNanny = useMemo(
    () => data?.assignedNannies?.find((n) => n.id === selectedNannyId),
    [data, selectedNannyId],
  );

  useEffect(() => {
    if (selectedNanny?.myRating) {
      setRateScore(selectedNanny.myRating.score);
      setRateComment(selectedNanny.myRating.comment || "");
    } else {
      setRateScore(5);
      setRateComment("");
    }
  }, [selectedNanny]);

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

  async function submitRating(event: FormEvent) {
    event.preventDefault();
    if (!selectedNannyId) return;
    const response = await fetch("/api/portal/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nannyId: selectedNannyId,
        score: rateScore,
        comment: rateComment,
        childId: childId || undefined,
      }),
    });
    const json = await response.json();
    setMsg(response.ok ? "Ocena je sačuvana. Dadilja je ne vidi — samo vi i admin." : json.error || "Greška");
    if (response.ok) await reload();
  }

  async function submitFeedback(event: FormEvent) {
    event.preventDefault();
    if (!selectedNannyId) return;
    const response = await fetch("/api/portal/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create",
        nannyId: selectedNannyId,
        childId: childId || undefined,
        body: feedbackBody,
      }),
    });
    const json = await response.json();
    setMsg(response.ok ? "Poruka je poslata adminu." : json.error || "Greška");
    if (response.ok) {
      setFeedbackBody("");
      await reload();
    }
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
          {msg ? <p className="mt-3 text-sm text-[#e8a8b8]">{msg}</p> : null}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <GlassCard>
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

            {child ? (
              <ChatPanel childId={child.id} childName={`${child.firstName} ${child.lastName}`} />
            ) : null}
          </div>

          {data.assignedNannies?.length ? (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <GlassCard>
                <h2 className="font-serif text-2xl text-[#faf2f4]">Ocena dadilje</h2>
                <p className="mt-1 text-sm text-white/55">
                  Privatno za vas i admina — dadilja ocenu ne vidi.
                </p>
                {data.assignedNannies.length > 1 ? (
                  <select
                    className="portal-input mt-3"
                    value={selectedNannyId}
                    onChange={(e) => setSelectedNannyId(e.target.value)}
                  >
                    {data.assignedNannies.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.fullName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-3 text-sm font-semibold text-[#faf2f4]">
                    {selectedNanny?.fullName || "Dadilja"}
                  </p>
                )}
                {selectedNanny?.adminRating ? (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm">
                    <p className="text-xs text-[#e8a8b8]">Ocena admina</p>
                    <StarRating value={selectedNanny.adminRating.score} readOnly size="sm" />
                    {selectedNanny.adminRating.comment ? (
                      <p className="mt-1 text-xs text-white/65">{selectedNanny.adminRating.comment}</p>
                    ) : null}
                  </div>
                ) : null}
                <form onSubmit={submitRating} className="mt-4 grid gap-3 text-sm">
                  <div>
                    <p className="mb-1 text-white/70">Vaša ocena</p>
                    <StarRating value={rateScore} onChange={setRateScore} />
                  </div>
                  <textarea
                    value={rateComment}
                    onChange={(e) => setRateComment(e.target.value)}
                    placeholder="Komentar (opciono)"
                    className="portal-input min-h-20"
                  />
                  <button type="submit" className="home-neon-btn rounded-full px-4 py-2.5 font-semibold">
                    Sačuvaj ocenu
                  </button>
                </form>
              </GlassCard>

              <GlassCard>
                <h2 className="font-serif text-2xl text-[#faf2f4]">Poruka adminu o dadilji</h2>
                <p className="mt-1 text-sm text-white/55">
                  Pišite agenciji u vezi {selectedNanny?.fullName || "dadilje"} — dadilja ovo ne vidi.
                </p>
                <form onSubmit={submitFeedback} className="mt-4 grid gap-3 text-sm">
                  <textarea
                    value={feedbackBody}
                    onChange={(e) => setFeedbackBody(e.target.value)}
                    required
                    placeholder="Npr. sve je u redu / molim napomenu oko tačnosti…"
                    className="portal-input min-h-28"
                  />
                  <button type="submit" className="home-neon-btn rounded-full px-4 py-2.5 font-semibold">
                    Pošalji adminu
                  </button>
                </form>
                {data.feedback?.length ? (
                  <ul className="mt-4 max-h-40 space-y-2 overflow-auto text-xs text-white/60">
                    {data.feedback.map((f) => (
                      <li key={f.id} className="rounded-xl border border-white/10 bg-black/20 px-2 py-1.5">
                        <span className="text-[#e8a8b8]">{f.nannyName}: </span>
                        {f.body}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </GlassCard>
            </div>
          ) : null}

          <div className="mt-4">
            <GlassCard>
              <ScheduleCalendar slots={data.schedule || []} showChild={data.children.length > 1} />
            </GlassCard>
          </div>
        </>
      )}
    </PortalShell>
  );
}
