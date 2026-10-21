import { ACTIVITY_LABELS, type DiaryEntry } from "@/lib/portal/types";

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("sr-RS", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function ActivityFeed({ entries }: { entries: DiaryEntry[] }) {
  if (!entries.length) {
    return (
      <p className="text-sm text-[#e8a8b8]/90">Još nema unosa u dnevniku za ovo dete.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.id} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#e8a8b8]/90">
                {ACTIVITY_LABELS[entry.kind]}
              </p>
              <p className="mt-1 font-semibold text-[#faf2f4]">{entry.title}</p>
            </div>
            <time className="shrink-0 text-xs text-white/55">{formatTime(entry.occurredAt)}</time>
          </div>
          {entry.body ? <p className="mt-2 text-sm leading-relaxed text-white/75">{entry.body}</p> : null}
          {entry.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.photoDataUrl}
              alt=""
              className="mt-3 max-h-56 w-full rounded-2xl object-cover"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
