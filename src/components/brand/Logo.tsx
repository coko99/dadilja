import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "#FFFDF9" : "#522110";
  return (
    <Link href="/" className="inline-flex min-w-0 items-center gap-2" aria-label="Moja dadilja, početna">
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0 sm:h-7 sm:w-7">
        <path
          d="M16 27s-9.2-5.7-12.2-11.1C2.1 12.6 3.2 8.2 7.1 7.2c2.2-.6 4.2.3 5.4 2.1C13.7 7.5 15.7 6.6 17.9 7.2c3.9 1 5 5.4 3.3 8.7C25.2 21.3 16 27 16 27z"
          fill="#F8459C"
        />
      </svg>
      <span className="font-serif text-[1.45rem] leading-none font-medium tracking-[-0.02em] sm:text-[1.7rem]" style={{ color }}>
        Moja dadilja
      </span>
    </Link>
  );
}
