# Moja dadilja

Premium sajt za servis profesionalnih dadilja. Roditelj ide od poverenja, preko usluga i načina izbora, do upita. Poseban konkurs postoji za kandidate.

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

- `src/data/site.ts` — naziv, slogan i kontakt. Telefon pokreće poziv, WhatsApp, Viber i SMS. Adresa i društvene mreže ostaju `[UNESI …]` dok se ne unesu pravi podaci.
- `src/data/services.ts` — usluge. Polje `enabled: false` sklanja uslugu iz menija, kartica i sitemap-a.
- `src/data/faq.ts`
- `src/data/testimonials.ts` — placeholder recenzije. Kada unesete pravu i postavite `published: true`, placeholderi se više ne prikazuju.
- `src/data/navigation.ts`

## Kontakt i konkurs

Nema kontakt forme. Dugmad vode na poziv, WhatsApp, Viber i SMS.

Prijava za posao je na `/konkurs` — isti kanali, sa porukom namenjenom kandidatima. Stara ruta `/prijava-za-dadilje` preusmerava na konkurs.

## Jezik

Sajt je na srpskom. Rute `/en` i `/de` drže mesto za englesku i nemačku verziju, bez punog prevoda.

## Fotografije

Slike u `public/images` su privremeni Unsplash prikazi. Zamenite ih fotografijama brenda pre objave. Istu fotografiju ne koristiti dva puta.

## SEO

On-page SEO za pretrage u Srbiji (`dadilja`, `dadilja Kruševac`, `agencija za dadilje`, `čuvanje dece`):

- Naslovi, opisi, canonical, Open Graph, `hreflang` (sr/en/de)
- Landing stranice: `/dadilja-krusevac`, `/agencija-za-dadilje`, `/cuvanje-dece`
- `sitemap.xml` sa prioritetima i `robots.txt`
- Schema: Organization/LocalBusiness, WebSite, FAQPage, HowTo, Service, ItemList, Article, BreadcrumbList
- Footer vodiči + interni linkovi

Produkcijski URL: `https://moja-dadilja.rs` (ili `NEXT_PUBLIC_SITE_URL`).

U Google Search Console dodajte domen i pošaljite sitemap. Verification kod ide u `src/app/layout.tsx`.
