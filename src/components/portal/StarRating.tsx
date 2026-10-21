"use client";

export function StarRating({
  value,
  onChange,
  size = "md",
  readOnly = false,
}: {
  value: number;
  onChange?: (score: number) => void;
  size?: "sm" | "md";
  readOnly?: boolean;
}) {
  const cls = size === "sm" ? "text-base" : "text-2xl";
  return (
    <div className={`flex items-center gap-0.5 ${cls}`} role={readOnly ? "img" : "group"}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        if (readOnly) {
          return (
            <span key={n} className={active ? "text-[#f0c4a8]" : "text-white/20"}>
              ★
            </span>
          );
        }
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange?.(n)}
            className={`leading-none transition ${active ? "text-[#f0c4a8]" : "text-white/25 hover:text-[#f0c4a8]/70"}`}
            aria-label={`${n} zvezdica`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
