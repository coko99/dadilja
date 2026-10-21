"use client";

import { useMemo, useState } from "react";
import {
  SCHEDULE_STATUS_LABELS,
  type ScheduleSlot,
  type ScheduleStatus,
} from "@/lib/portal/types";

export type ScheduleSlotView = ScheduleSlot & {
  childName: string;
  nannyName: string;
};

function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + mondayOffset);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("sr-RS", { weekday: "short", day: "numeric", month: "short" }).format(
    date,
  );
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("sr-RS", { hour: "2-digit", minute: "2-digit" }).format(
    new Date(iso),
  );
}

function statusClass(status: ScheduleStatus) {
  if (status === "cancelled") return "border-white/10 bg-black/30 text-white/45 line-through";
  if (status === "completed") return "border-white/15 bg-white/5 text-white/70";
  return "border-[#e8a8b8]/35 bg-[#8a4058]/35 text-[#faf2f4]";
}

const DAY_NAMES = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

export function ScheduleCalendar({
  slots,
  showNanny = true,
  showChild = true,
  onCancel,
}: {
  slots: ScheduleSlotView[];
  showNanny?: boolean;
  showChild?: boolean;
  onCancel?: (id: string) => void;
}) {
  const [weekAnchor, setWeekAnchor] = useState(() => startOfWeek(new Date()));
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekAnchor, i)), [weekAnchor]);

  const byDay = useMemo(() => {
    return days.map((day) =>
      slots
        .filter((slot) => sameDay(new Date(slot.startsAt), day))
        .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt)),
    );
  }, [days, slots]);

  const rangeLabel = `${formatDayLabel(days[0])} – ${formatDayLabel(days[6])}`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#faf2f4]">Raspored</h2>
          <p className="mt-1 text-sm text-white/55">{rangeLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setWeekAnchor((w) => addDays(w, -7))}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80"
          >
            ← Prethodna
          </button>
          <button
            type="button"
            onClick={() => setWeekAnchor(startOfWeek(new Date()))}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80"
          >
            Danas
          </button>
          <button
            type="button"
            onClick={() => setWeekAnchor((w) => addDays(w, 7))}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80"
          >
            Sledeća →
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-7">
        {days.map((day, index) => {
          const isToday = sameDay(day, today);
          const daySlots = byDay[index];
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[140px] rounded-[22px] border px-2.5 py-2.5 ${
                isToday ? "border-[#e8a8b8]/50 bg-[#8a4058]/20" : "border-white/10 bg-black/20"
              }`}
            >
              <p className="text-[11px] font-semibold tracking-wide text-[#e8a8b8]">
                {DAY_NAMES[index]}
              </p>
              <p className="text-sm text-[#faf2f4]">
                {new Intl.DateTimeFormat("sr-RS", { day: "numeric", month: "short" }).format(day)}
              </p>
              <ul className="mt-2 space-y-1.5">
                {!daySlots.length ? (
                  <li className="text-[11px] text-white/35">—</li>
                ) : (
                  daySlots.map((slot) => (
                    <li
                      key={slot.id}
                      className={`rounded-xl border px-2 py-1.5 text-[11px] leading-snug ${statusClass(slot.status)}`}
                    >
                      <p className="font-semibold">
                        {formatTime(slot.startsAt)}–{formatTime(slot.endsAt)}
                      </p>
                      {showChild ? <p>{slot.childName}</p> : null}
                      {showNanny ? <p className="opacity-80">{slot.nannyName}</p> : null}
                      {slot.location ? <p className="opacity-70">{slot.location}</p> : null}
                      {slot.status !== "scheduled" ? (
                        <p className="mt-0.5 opacity-80">{SCHEDULE_STATUS_LABELS[slot.status]}</p>
                      ) : null}
                      {onCancel && slot.status === "scheduled" ? (
                        <button
                          type="button"
                          onClick={() => onCancel(slot.id)}
                          className="mt-1 text-[10px] underline opacity-80 hover:opacity-100"
                        >
                          Otkaži
                        </button>
                      ) : null}
                    </li>
                  ))
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
