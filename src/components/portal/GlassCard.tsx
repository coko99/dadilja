export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`home-glass rounded-[28px] p-5 sm:p-6 ${className}`}>{children}</div>;
}
