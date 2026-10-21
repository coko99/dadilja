"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { GlassCard } from "@/components/portal/GlassCard";
import { ScheduleCalendar } from "@/components/portal/ScheduleCalendar";
import { StarRating } from "@/components/portal/StarRating";
import { usePortalData } from "@/hooks/usePortalData";
import { ROLE_LABELS, type UserRole } from "@/lib/portal/types";

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={`rounded-[22px] border px-4 py-4 ${
        accent
          ? "border-[#e8a8b8]/40 bg-gradient-to-br from-[#8a4058]/50 to-black/30"
          : "border-white/10 bg-black/25"
      }`}
    >
      <p className="text-3xl font-semibold text-[#faf2f4]">{value}</p>
      <p className="mt-1 text-xs leading-snug text-white/60">{label}</p>
    </div>
  );
}

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("sr-RS", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function AdminPortalPage() {
  const router = useRouter();
  const { data, error, loading, reload } = usePortalData(10000);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"pregled" | "ocene" | "raspored" | "upravljanje">("pregled");
  const [rateNannyId, setRateNannyId] = useState("");
  const [rateScore, setRateScore] = useState(5);
  const [rateComment, setRateComment] = useState("");

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

  async function createSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const startsAt = String(form.get("startsAt") || "");
    const endsAt = String(form.get("endsAt") || "");
    const response = await fetch("/api/portal/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create",
        nannyId: form.get("nannyId"),
        childId: form.get("childId"),
        startsAt: startsAt ? new Date(startsAt).toISOString() : "",
        endsAt: endsAt ? new Date(endsAt).toISOString() : "",
        location: form.get("location"),
        note: form.get("note"),
      }),
    });
    const json = await response.json();
    setMessage(response.ok ? "Termin je zakazan." : json.error || "Greška");
    if (response.ok) {
      event.currentTarget.reset();
      await reload();
    }
  }

  async function cancelSchedule(id: string) {
    const response = await fetch("/api/portal/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel", id }),
    });
    const json = await response.json();
    setMessage(response.ok ? "Termin je otkazan." : json.error || "Greška");
    if (response.ok) await reload();
  }

  async function submitAdminRating(event: FormEvent) {
    event.preventDefault();
    if (!rateNannyId) {
      setMessage("Izaberite dadilju.");
      return;
    }
    const response = await fetch("/api/portal/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nannyId: rateNannyId, score: rateScore, comment: rateComment }),
    });
    const json = await response.json();
    setMessage(response.ok ? "Ocena je sačuvana (dadilja je ne vidi)." : json.error || "Greška");
    if (response.ok) {
      setRateComment("");
      await reload();
    }
  }

  async function markFeedbackRead() {
    const unread = (data?.feedback || []).filter((f) => !f.readByAdmin).map((f) => f.id);
    if (!unread.length) return;
    await fetch("/api/portal/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "markRead", ids: unread }),
    });
    await reload();
    setMessage("Poruke majki označene kao pročitane.");
  }

  if (loading || !data || data.session.role !== "admin" || !data.overview) {
    return <div className="portal-root grid min-h-dvh place-items-center text-white/70">Učitavanje…</div>;
  }

  const { overview } = data;
  const s = overview.stats;

  return (
    <PortalShell session={data.session} title="Administracija">
      {message ? <p className="mb-4 text-sm text-[#e8a8b8]">{message}</p> : null}

      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            ["pregled", "Pregled"],
            ["ocene", "Ocene i poruke"],
            ["raspored", "Raspored"],
            ["upravljanje", "Upravljanje"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm ${
              tab === id ? "home-neon-btn font-semibold" : "border border-white/15 bg-black/20 text-white/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "pregled" ? (
        <div className="space-y-4">
          <GlassCard className="overflow-hidden border border-[#e8a8b8]/25 bg-gradient-to-br from-[#5c2438]/55 via-[#2a1520]/80 to-black/40">
            <p className="text-xs tracking-[0.18em] text-[#e8a8b8]">ADMIN PANEL · MOJA DADILJA</p>
            <h2 className="mt-2 font-serif text-3xl text-[#faf2f4] sm:text-4xl">Pregled agencije</h2>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Koliko ima roditelja i dece, koliko dadilja radi, ko čeka dodelu — i ocene koje dadilje ne vide.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Dadilje" value={s.nannies} accent />
              <Stat label="Roditelji / majke" value={s.parents} accent />
              <Stat label="Deca u sistemu" value={s.children} accent />
              <Stat label="Poruke majki (nepročitano)" value={s.unreadFeedback} accent />
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Stat label="Aktivne dodele" value={s.activeAssignments} />
            <Stat label="Deca čekaju dadilju" value={s.childrenWaitingNanny} />
            <Stat label="Dadilje bez dece" value={s.nanniesWithoutChildren} />
            <Stat label="Majke čekaju dadilju" value={s.parentsWaitingNanny} />
            <Stat label="Majke čekaju dete" value={s.parentsWaitingChild} />
            <Stat label="Termini ove nedelje" value={s.scheduleThisWeek} />
            <Stat label="Aktivna čuvanja" value={s.openShifts} />
            <Stat label="Ocene dadilja" value={s.ratingsTotal} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Roditelji i njihova deca</h2>
              <p className="mt-1 text-sm text-white/55">Koliko koje majke ima dece i da li imaju dadilju.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {overview.parentActivity.map((parent) => (
                  <li key={parent.id} className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#faf2f4]">{parent.fullName}</p>
                      <span className="rounded-full bg-[#8a4058]/50 px-2 py-0.5 text-[11px] text-[#faf2f4]">
                        {parent.childCount} {parent.childCount === 1 ? "dete" : "dece"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/50">{parent.email}</p>
                    <p className="mt-2 text-xs text-white/70">
                      {parent.children.length
                        ? parent.children
                            .map((c) => `${c.name}${c.nannyName ? ` → ${c.nannyName}` : " (čeka dadilju)"}`)
                            .join(" · ")
                        : "Nema povezanog deteta"}
                    </p>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Dadilje i ocene</h2>
              <p className="mt-1 text-sm text-white/55">Ocene vide samo admin i majke — dadilje ih ne vide.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {overview.nannyWorkload.map((nanny) => (
                  <li key={nanny.id} className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#faf2f4]">{nanny.fullName}</p>
                        <p className="text-xs text-white/50">
                          {nanny.childCount
                            ? `Deca: ${nanny.children.join(", ")}`
                            : "Bez dodeljenog deteta"}
                        </p>
                      </div>
                      {nanny.ratingAvg != null ? (
                        <div className="text-right">
                          <StarRating value={Math.round(nanny.ratingAvg)} readOnly size="sm" />
                          <p className="text-[11px] text-white/50">
                            {nanny.ratingAvg} · {nanny.ratingCount} ocena
                          </p>
                        </div>
                      ) : (
                        <span className="text-[11px] text-white/40">Bez ocene</span>
                      )}
                    </div>
                    {nanny.activeShift ? (
                      <span className="mt-2 inline-block rounded-full bg-[#8a4058] px-2 py-0.5 text-[10px] text-[#faf2f4]">
                        Trenutno u čuvanju
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Deca koja čekaju dadilju</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {!overview.lists.childrenWaitingNanny.length ? (
                  <li className="text-white/55">Nema — sva deca imaju dodelu.</li>
                ) : (
                  overview.lists.childrenWaitingNanny.map((item) => (
                    <li key={item.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <p className="font-semibold text-[#faf2f4]">{item.name}</p>
                      <p className="text-xs text-white/55">
                        Roditelji: {item.parents.join(", ") || "—"}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Majke koje čekaju</h2>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs tracking-[0.14em] text-[#e8a8b8]">ČEKAJU DETE U SISTEMU</p>
                  <ul className="mt-2 space-y-2">
                    {!overview.lists.parentsWaitingChild.length ? (
                      <li className="text-white/55">Nema.</li>
                    ) : (
                      overview.lists.parentsWaitingChild.map((p) => (
                        <li key={p.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                          {p.fullName}
                          <span className="mt-0.5 block text-xs text-white/50">{p.email}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div>
                  <p className="text-xs tracking-[0.14em] text-[#e8a8b8]">ČEKAJU DODELU DADILJE</p>
                  <ul className="mt-2 space-y-2">
                    {!overview.lists.parentsWaitingNanny.length ? (
                      <li className="text-white/55">Nema.</li>
                    ) : (
                      overview.lists.parentsWaitingNanny.map((p) => (
                        <li key={p.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                          {p.fullName}
                          <span className="mt-0.5 block text-xs text-white/50">
                            Deca: {p.children.join(", ")}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Dadilje bez dodeljenog deteta</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {!overview.lists.nanniesWithoutChildren.length ? (
                  <li className="text-white/55">Sve dadilje imaju bar jedno dete.</li>
                ) : (
                  overview.lists.nanniesWithoutChildren.map((n) => (
                    <li key={n.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      {n.fullName}
                      <span className="mt-0.5 block text-xs text-white/50">{n.email}</span>
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Aktivna čuvanja sada</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {!overview.lists.openShifts.length ? (
                  <li className="text-white/55">Nema aktivnog čuvanja.</li>
                ) : (
                  overview.lists.openShifts.map((shift) => (
                    <li key={shift.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      {shift.nannyName} → {shift.childName}
                      <span className="mt-0.5 block text-xs text-white/50">
                        Od {formatWhen(shift.startedAt)}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>

            <GlassCard className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-[#faf2f4]">Naredni termini</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {!overview.lists.upcomingSchedule.length ? (
                  <li className="text-white/55">Nema zakazanih termina.</li>
                ) : (
                  overview.lists.upcomingSchedule.map((slot) => (
                    <li key={slot.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      {slot.nannyName} → {slot.childName}
                      <span className="mt-0.5 block text-xs text-white/50">
                        {formatWhen(slot.startsAt)} –{" "}
                        {new Intl.DateTimeFormat("sr-RS", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(slot.endsAt))}
                        {slot.location ? ` · ${slot.location}` : ""}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Svi unosi dadilja</h2>
              <ul className="mt-4 max-h-[420px] space-y-2 overflow-auto text-sm">
                {!overview.recentDiary.length ? (
                  <li className="text-white/55">Još nema unosa.</li>
                ) : (
                  overview.recentDiary.map((entry) => (
                    <li key={entry.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-[#faf2f4]">{entry.title}</p>
                        <time className="shrink-0 text-[11px] text-white/45">{formatWhen(entry.occurredAt)}</time>
                      </div>
                      <p className="mt-1 text-xs text-[#e8a8b8]/90">
                        {entry.kindLabel} · {entry.nannyName} · {entry.childName}
                        {entry.hasPhoto ? " · foto" : ""}
                      </p>
                      {entry.body ? <p className="mt-1 text-xs text-white/65">{entry.body}</p> : null}
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Sve poruke majki i dadilja</h2>
              <ul className="mt-4 max-h-[420px] space-y-2 overflow-auto text-sm">
                {!overview.recentMessages.length ? (
                  <li className="text-white/55">Još nema poruka.</li>
                ) : (
                  overview.recentMessages.map((msg) => (
                    <li key={msg.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs text-[#e8a8b8]/90">
                          {msg.senderName} ({msg.senderRoleLabel}) · {msg.childName}
                        </p>
                        <time className="shrink-0 text-[11px] text-white/45">{formatWhen(msg.createdAt)}</time>
                      </div>
                      <p className="mt-1 text-white/85">{msg.body}</p>
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>
          </div>

          <GlassCard>
            <h2 className="font-serif text-2xl text-[#faf2f4]">Dodele</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {data.assignments.map((a) => {
                const nanny = data.users.find((u) => u.id === a.nannyId);
                const child = data.children.find((c) => c.id === a.childId);
                const by = data.users.find((u) => u.id === a.assignedBy);
                return (
                  <li key={a.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                    {nanny?.fullName || "Dadilja"} → {child?.firstName} {child?.lastName}
                    <span className="mt-0.5 block text-xs text-white/50">
                      {formatWhen(a.assignedAt)}
                      {by ? ` · od ${by.fullName}` : ""}
                      {a.active ? "" : " · neaktivno"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <h3 className="mt-6 text-sm font-semibold tracking-wide text-[#e8a8b8]">Evidencija pristupa</h3>
            <ul className="mt-3 max-h-48 space-y-1 overflow-auto text-xs text-white/55">
              {data.accessLogs.map((log) => (
                <li key={log.id}>
                  {formatWhen(log.createdAt)} — {log.action}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      ) : null}

      {tab === "ocene" ? (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h2 className="font-serif text-2xl text-[#faf2f4]">Oceni dadilju</h2>
              <p className="mt-1 text-sm text-white/55">Ocena je privatna — dadilja je ne vidi.</p>
              <form onSubmit={submitAdminRating} className="mt-4 grid gap-3 text-sm">
                <select
                  className="portal-input"
                  value={rateNannyId}
                  onChange={(e) => setRateNannyId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Izaberi dadilju
                  </option>
                  {data.nannies.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.fullName}
                    </option>
                  ))}
                </select>
                <div>
                  <p className="mb-1 text-white/70">Ocena</p>
                  <StarRating value={rateScore} onChange={setRateScore} />
                </div>
                <textarea
                  value={rateComment}
                  onChange={(e) => setRateComment(e.target.value)}
                  placeholder="Komentar (opciono)"
                  className="portal-input min-h-24"
                />
                <button type="submit" className="home-neon-btn rounded-full px-4 py-2.5 font-semibold">
                  Sačuvaj ocenu
                </button>
              </form>
            </GlassCard>

            <GlassCard>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-serif text-2xl text-[#faf2f4]">Poruke majki o dadiljama</h2>
                <button
                  type="button"
                  onClick={markFeedbackRead}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80"
                >
                  Označi pročitano
                </button>
              </div>
              <ul className="mt-4 max-h-[420px] space-y-2 overflow-auto text-sm">
                {!overview.parentMessagesToAdmin.length ? (
                  <li className="text-white/55">Još nema poruka.</li>
                ) : (
                  overview.parentMessagesToAdmin.map((msg) => (
                    <li
                      key={msg.id}
                      className={`rounded-2xl border px-3 py-2 ${
                        msg.readByAdmin
                          ? "border-white/10 bg-black/20"
                          : "border-[#e8a8b8]/40 bg-[#8a4058]/25"
                      }`}
                    >
                      <p className="text-xs text-[#e8a8b8]/90">
                        {msg.parentName} → o {msg.nannyName}
                        {msg.childName ? ` · ${msg.childName}` : ""}
                        {!msg.readByAdmin ? " · novo" : ""}
                      </p>
                      <p className="mt-1 text-white/85">{msg.body}</p>
                      <time className="mt-1 block text-[11px] text-white/45">{formatWhen(msg.createdAt)}</time>
                    </li>
                  ))
                )}
              </ul>
            </GlassCard>
          </div>

          <GlassCard>
            <h2 className="font-serif text-2xl text-[#faf2f4]">Sve ocene</h2>
            <ul className="mt-4 max-h-[480px] space-y-2 overflow-auto text-sm">
              {!overview.recentRatings.length ? (
                <li className="text-white/55">Još nema ocena.</li>
              ) : (
                overview.recentRatings.map((r) => (
                  <li key={r.id} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#faf2f4]">{r.nannyName}</p>
                      <StarRating value={r.score} readOnly size="sm" />
                    </div>
                    <p className="mt-1 text-xs text-white/55">
                      {r.raterRoleLabel}: {r.raterName}
                      {r.childName ? ` · ${r.childName}` : ""} · {formatWhen(r.updatedAt)}
                    </p>
                    {r.comment ? <p className="mt-1 text-white/80">{r.comment}</p> : null}
                  </li>
                ))
              )}
            </ul>
          </GlassCard>
        </div>
      ) : null}

      {tab === "raspored" ? (
        <div className="space-y-4">
          <GlassCard>
            <ScheduleCalendar slots={data.schedule || []} onCancel={cancelSchedule} />
          </GlassCard>
          <GlassCard>
            <h2 className="font-serif text-2xl text-[#faf2f4]">Novi termin</h2>
            <form onSubmit={createSchedule} className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
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
              <label className="text-white/70">
                Početak
                <input name="startsAt" type="datetime-local" required className="portal-input mt-1" />
              </label>
              <label className="text-white/70">
                Kraj
                <input name="endsAt" type="datetime-local" required className="portal-input mt-1" />
              </label>
              <input name="location" placeholder="Lokacija" className="portal-input sm:col-span-2" />
              <input name="note" placeholder="Napomena" className="portal-input sm:col-span-2" />
              <button
                type="submit"
                className="home-neon-btn rounded-full px-4 py-2.5 font-semibold sm:col-span-2"
              >
                Zakazi termin
              </button>
            </form>
          </GlassCard>
        </div>
      ) : null}

      {tab === "upravljanje" ? (
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
              <input
                name="password"
                required
                placeholder="Privremena lozinka"
                className="portal-input"
                defaultValue="promeni123"
              />
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
            <h2 className="font-serif text-2xl text-[#faf2f4]">Svi korisnici</h2>
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
      ) : null}
    </PortalShell>
  );
}
