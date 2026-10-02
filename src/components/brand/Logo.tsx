import Image from "next/image";
import Link from "next/link";

export function Logo({
  variant = "mark",
  tone = "dark",
}: {
  variant?: "mark" | "full";
  tone?: "dark" | "light";
}) {
  if (variant === "full") {
    return (
      <Link href="/" className="inline-block rounded-[28px] bg-ivory p-2.5" aria-label="Moja dadilja, početna">
        <Image
          src="/brand/logo.jpg"
          alt="Moja dadilja. Stručna i obučena dadilja u vašem domu."
          width={1254}
          height={1254}
          className="h-auto w-[210px] sm:w-[240px]"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex min-w-0 items-center gap-2" aria-label="Moja dadilja, početna">
      <Image
        src="/brand/mark.jpg"
        alt=""
        width={1040}
        height={620}
        priority
        className="h-11 w-auto rounded-xl bg-white/90 px-1 sm:h-[52px]"
      />
      <span
        className={`truncate font-serif text-[1.35rem] leading-none font-medium tracking-[-0.02em] sm:text-[1.65rem] ${
          tone === "light" ? "text-white" : "text-brown"
        }`}
      >
        Moja dadilja
      </span>
    </Link>
  );
}
