import { Photo } from "@/components/ui/Photo";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pt-10 pb-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16 lg:pb-10">
      <div>
        <p className="text-[13px] font-semibold tracking-[0.18em] text-nude">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-[2.8rem] leading-[1.05] font-medium tracking-tight text-brown sm:text-6xl lg:text-[4.6rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-[18px] leading-[1.75] text-muted">{text}</p>
      </div>
      {image && imageAlt ? (
        <Photo src={image} alt={imageAlt} priority className="aspect-[4/5] min-h-[320px]" sizes="(min-width: 1024px) 520px, 100vw" />
      ) : null}
    </section>
  );
}
