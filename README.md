# Moja dadilja

Premium sajt za servis profesionalnih dadilja. Roditelj ide od poverenja, preko usluga i načina izbora, do upita. Posebna prijava postoji za kandidate.

## Pokretanje

```bash
npm install
npm run dev
```

Dev server sluša na [http://localhost:3841](http://localhost:3841). Produkcija:

```bash
npm run build
npm start
```

## Sadržaj

Tekst, navigacija, usluge i FAQ su odvojeni od komponenti:

- `src/data/site.ts` — naziv, slogan i kontakt. Telefon pokreće poziv, WhatsApp i Viber. E-mail, adresa i društvene mreže ostaju `[UNESI …]` dok se ne unesu pravi podaci.
- `src/data/services.ts` — usluge. Polje `enabled: false` sklanja uslugu iz menija, kartica i sitemap-a.
- `src/data/faq.ts`
- `src/data/testimonials.ts` — placeholder recenzije. Kada unesete pravu i postavite `published: true`, placeholderi se više ne prikazuju.
- `src/data/navigation.ts`

## Kontakt

Nema kontakt forme. Dugmad vode na poziv, WhatsApp, Viber i e-mail čim se u `src/data/site.ts` unese telefon i e-mail.

Prijava za dadilje i dalje ima formu. `src/lib/submissions.ts` je prosleđuje ako su podešeni `SUBMISSION_WEBHOOK_URL` ili Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`). Ključevi nisu u kodu. Primer je u `.env.example`.

## Jezik

Sajt je na srpskom. Ruta `/en` drži mesto za englesku verziju, bez punog prevoda.

## Fotografije

Slike u `public/images` su privremeni Unsplash prikazi. Zamenite ih fotografijama brenda pre objave. Istu fotografiju ne koristiti dva puta.

## SEO

Naslov početne, opis, Open Graph, canonical, `sitemap.xml`, `robots.txt`, Organization, Service, FAQPage i Article.
