export type SeoGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string[];
  sections: { heading: string; body: string[] }[];
  related: { label: string; href: string }[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "dadilja-beograd",
    eyebrow: "DADILJA BEOGRAD",
    title: "Dadilja Beograd — kako da pronađete pravu osobu",
    description:
      "Tražite dadilju u Beogradu? Moja dadilja pomaže porodicama da pronađu stručnu i pouzdanu dadilju — po satu, tokom dana, 24h ili na putovanju.",
    intro: [
      "Pronalaženje dadilje u Beogradu često počne hitno: novi posao, duži radni dan, putovanje ili potreba za mirnim ritmom kod kuće. Umesto da sami prolazite kroz nepoznate profile, Moja dadilja vodi razgovor od vaših potreba.",
      "Pitamo za uzrast deteta, raspored, očekivanja i način komunikacije. Tek onda predlažemo korake ka osobi koja može da odgovara konkretnoj porodici — ne univerzalnom oglasu.",
    ],
    sections: [
      {
        heading: "Šta porodice u Beogradu najčešće traže",
        body: [
          "Nekim porodicama treba dadilja po satu ili nekoliko sati tokom dana. Drugima je važna redovna podrška tokom radne nedelje, guvernanta uz školske obaveze, ili dadilja 24h uz boravak u domu.",
          "Ima i porodica kojima treba dadilja na putovanjima — da dete zadrži poznat ritam i van kuće. Zato prvo razjašnjavamo šta vam zaista treba, pa tek onda idemo dalje.",
        ],
      },
      {
        heading: "Kako izgleda početak",
        body: [
          "Pozovete ili pošaljete poruku. Ukratko kažete kada vam je dadilja potrebna i šta očekujete. Zatim razgovaramo o detetu, rutinama i tipu osobe koja bi vam najviše odgovarala.",
          "Upit ne znači obavezu. Porodica i kandidat se upoznaju pre konačne odluke, a obaveze se dogovaraju jasno pre početka saradnje.",
        ],
      },
      {
        heading: "Zašto agencija, a ne slučajan oglas",
        body: [
          "Izbor dadilje nije samo slobodan termin. Reč je o poverenju, domu i vremenu sa detetom. Zato tražimo odgovornost, komunikaciju i uklapanje — ne samo dostupnost.",
          "Ako vam je potreban brži uvid u usluge, pogledajte pregled angažmana ili nas kontaktirajte direktno.",
        ],
      },
    ],
    related: [
      { label: "Sve usluge dadilje", href: "/usluge" },
      { label: "Agencija za dadilje", href: "/agencija-za-dadilje" },
      { label: "Čuvanje dece", href: "/cuvanje-dece" },
      { label: "Za porodice", href: "/za-porodice" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "agencija-za-dadilje",
    eyebrow: "AGENCIJA ZA DADILJE",
    title: "Agencija za dadilje Moja dadilja",
    description:
      "Moja dadilja je agencija za dadilje u Beogradu i Srbiji. Pažljiv izbor kandidata, jasan dogovor i podrška porodici od prvog razgovora.",
    intro: [
      "Agencija za dadilje ima smisla kada želite strukturisan početak: da neko razume vaš ritam, predloži odgovarajući oblik angažovanja i pomogne da razgovor sa kandidatom bude jasan.",
      "Moja dadilja ne nudi „prvu slobodnu osobu“. Tražimo dadilju koja može da se uklopi u potrebe konkretnog deteta i kuće — uz diskreciju i dogovorene granice.",
    ],
    sections: [
      {
        heading: "Šta radi agencija za dadilje",
        body: [
          "Slušamo porodicu, razjašnjavamo očekivanja i pomažemo da se definiše profil: uzrast, termini, jezik, pomoć oko učenja, putovanja ili boravak u domu.",
          "Zatim vodimo ka kandidatima i upoznavanju. Porodica ostaje ta koja odlučuje. Naš zadatak je da proces bude mirniji i jasniji.",
        ],
      },
      {
        heading: "Koje usluge pokrivamo",
        body: [
          "Dadilja po satu, dadilja na 4, 6 i 8 sati, guvernanta, dadilja 24h i dadilja na putovanjima. Svaka usluga ima svoj ritam i drugačiji dogovor oko obaveza.",
          "Ako niste sigurni šta vam treba, počnite kratkim pozivom ili porukom — to je dovoljno za prvi korak.",
        ],
      },
      {
        heading: "Za porodice i za dadilje",
        body: [
          "Porodicama pomažemo da pronađu pouzdanu podršku. Dadiljama dajemo prostor da se prijave kada žele odgovoran rad sa decom.",
          "I jednima i drugima je važno isto: poverenje, komunikacija i jasan okvir saradnje.",
        ],
      },
    ],
    related: [
      { label: "Dadilja Beograd", href: "/dadilja-beograd" },
      { label: "Usluge", href: "/usluge" },
      { label: "Kako biramo dadilje", href: "/kako-biramo-dadilje" },
      { label: "Za dadilje", href: "/za-dadilje" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "cuvanje-dece",
    eyebrow: "ČUVANJE DECE",
    title: "Čuvanje dece uz stručnu dadilju",
    description:
      "Čuvanje dece u Beogradu i Srbiji uz pažljivo odabranu dadilju. Fleksibilni termini, redovna podrška, 24h ili pratnja na putovanju.",
    intro: [
      "Čuvanje dece nije samo prisustvo odrasle osobe. Reč je o ritmu, sigurnosti, igri, obrocima, odmoru i načinu na koji dete doživljava dan.",
      "Zato u Moja dadilja prvo slušamo porodicu: šta dete voli, šta mu prija, šta roditelji očekuju i kako treba da izgleda predaja obaveza.",
    ],
    sections: [
      {
        heading: "Oblici čuvanja dece",
        body: [
          "Kratko čuvanje dece po satu ili nekoliko sati korisno je za sastanke, obaveze i dane kada vam treba više prostora. Duži dnevni termini odgovaraju roditeljima koji rade skraćeno ili puno radno vreme.",
          "Za porodice kojima treba veća fleksibilnost postoje dadilja 24h i dadilja na putovanjima. Guvernanta je dobar izbor kada uz čuvanje treba i podrška oko učenja i dnevnih navika.",
        ],
      },
      {
        heading: "Šta dogovaramo pre početka",
        body: [
          "Obaveze, granice, način komunikacije i ritam dana. Porodica treba da zna šta može da očekuje, a dadilja šta je dogovoreno.",
          "Diskrecija je deo pristupa: dadilja ulazi u tuđi dom i poverenje se gradi jasnim dogovorom, ne pretpostavkama.",
        ],
      },
      {
        heading: "Kako da započnete",
        body: [
          "Najbrži put je poziv ili poruka. Recite nam uzrast deteta, periode kada vam treba podrška i šta vam je najvažnije. Zajedno definišemo sledeći korak.",
          "Ako želite pregled opcija, otvorite stranicu usluga ili vodič za porodice.",
        ],
      },
    ],
    related: [
      { label: "Dadilja Beograd", href: "/dadilja-beograd" },
      { label: "Agencija za dadilje", href: "/agencija-za-dadilje" },
      { label: "Usluge dadilje", href: "/usluge" },
      { label: "Za porodice", href: "/za-porodice" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}
