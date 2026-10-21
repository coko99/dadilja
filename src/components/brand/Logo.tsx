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
      <Link href="/" className="inline-block rounded-[28px] bg-[#f6e8ec] p-2.5" aria-label="Moja dadilja, početna">
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
    <Link href="/" className="inline-flex min-w-0 items-center gap-2.5" aria-label="Moja dadilja, početna">
      <Image
        src="/brand/icon.png"
        alt=""
        width={512}
        height={512}
        className="size-10 shrink-0 rounded-full object-cover sm:size-11"
        priority
      />
      <span className={`brand-wordmark ${tone === "light" ? "brand-wordmark-light" : ""}`}>Moja dadilja</span>
    </Link>
  );
}
