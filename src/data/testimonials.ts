export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  /** Kada unesete pravu recenziju, postavite published na true. Placeholderi se tada ne prikazuju. */
  published: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote: "Ovde će biti prikazana recenzija porodice.",
    name: "Porodica / inicijali",
    published: false,
  },
  {
    id: "placeholder-2",
    quote: "Ovde će biti prikazana recenzija porodice.",
    name: "Porodica / inicijali",
    published: false,
  },
  {
    id: "placeholder-3",
    quote: "Ovde će biti prikazana recenzija porodice.",
    name: "Porodica / inicijali",
    published: false,
  },
];

export function visibleTestimonials() {
  const published = testimonials.filter((item) => item.published);
  return published.length > 0 ? published : testimonials;
}
