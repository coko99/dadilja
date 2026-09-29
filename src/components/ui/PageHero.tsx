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
    <section className="mx-auto grid max-w-[1240px] items-center gap-8 px-4 pt-6 pb-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-16 lg:pb-10">
      <div className="order-2 lg:order-1">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-nude sm:text-[13px] sm:tracking-[0.18em]">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-[2.2rem] leading-[1.08] font-medium tracking-tight text-brown sm:text-6xl lg:text-[4.6rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-[1.75] text-muted sm:text-[18px]">{text}</p>
      </div>
      {image && imageAlt ? (
        <Photo src={image} alt={imageAlt} priority className="order-1 aspect-[5/4] min-h-0 lg:order-2 lg:aspect-[4/5]" sizes="(min-width: 1024px) 520px, 100vw" />
      ) : null}
    </section>
  );
}
