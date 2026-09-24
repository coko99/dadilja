import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-brown text-ivory hover:bg-brown-soft hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-brown border border-brown hover:bg-brown hover:text-ivory hover:-translate-y-0.5",
  accent: "bg-accent text-white hover:bg-[#e1328b] hover:-translate-y-0.5",
  light:
    "bg-ivory text-brown hover:bg-white hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-ivory border border-ivory/40 hover:bg-ivory hover:text-brown hover:-translate-y-0.5",
} as const;

type Variant = keyof typeof styles;

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold tracking-wide transition duration-300 disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
  onClick,
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const classes = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
