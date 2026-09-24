export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={`mb-4 text-[13px] font-semibold tracking-[0.18em] ${light ? "text-blush" : "text-nude"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-serif text-[2.4rem] leading-[1.12] font-medium tracking-tight sm:text-5xl lg:text-[3.4rem] ${
          light ? "text-ivory" : "text-brown"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-5 text-[17px] leading-[1.75] sm:text-[18px] ${light ? "text-blush" : "text-muted"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
