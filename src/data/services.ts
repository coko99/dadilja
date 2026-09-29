export type Service = {
  slug: string;
  enabled: boolean;
  /** Prikaz u pregledu „Naše usluge“ na početnoj. */
  onHome?: boolean;
  title: string;
  cardTitle: string;
  summary: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  lead: string;
  paragraphs: string[];
  suitedFor: string[];
  includes: string[];
};

export const servicesIntro = {
  title: "Prava dadilja za vašu porodicu",
  paragraphs: [
    "Izbor dadilje znači da nekome poveravate ono što vam je najvažnije — svoje dete, ali i pristup svom domu i porodičnoj svakodnevici. Zato tražimo dadilje koje su obučene za rad sa decom, odgovorno pristupaju svojim obavezama i umeju da poštuju navike vaše porodice.",
    "Agencija „Moja dadilja” pomaže vam da pronađete stručnu dadilju od poverenja, u skladu sa potrebama vašeg deteta. Pre početka angažovanja jasno se dogovaraju njene obaveze i pravila rada. Posebnu pažnju posvećujemo diskreciji: dadilja se ugovorom obavezuje da čuva privatnost vaše porodice i da se prema vašem domu i stvarima odnosi pažljivo i odgovorno.",
    "Želimo da znate sa kim vaše dete provodi vreme i šta možete da očekujete od saradnje — kako biste odluku doneli mirnije i sa više poverenja.",
  ],
};

export const engagementOptions = [
  "Po satu",
  "4 sata",
  "6 sati",
  "8 sati",
  "Povremeno",
  "Puno radno vreme",
  "Live-in / 24h",
  "Nisam siguran/na",
] as const;

export const services: Service[] = [
  {
    slug: "dadilja-po-satu",
    enabled: true,
    title: "Dadilja po satu",
    cardTitle: "Dadilja po satu",
    summary:
      "Fleksibilna pomoć kada vam je potrebno nekoliko sati za obaveze, sastanak, događaj ili vreme za sebe.",
    eyebrow: "Fleksibilno",
    image: "/images/play.jpg",
    imageAlt: "Dečja igraonica sa drvenim igračkama i prirodnim svetlom.",
    lead: "Kratak, jasan termin kada porodici treba pouzdana osoba — bez obaveze da to preraste u svakodnevni raspored.",
    paragraphs: [
      "Angažovanje po satu ima smisla kada je ritam porodice promenljiv: sastanak koji se odužio, večernji izlazak, ili nekoliko sati da završite ono što ne može da čeka.",
      "U razgovoru definišemo uzrast deteta, šta dadilja treba da radi dok je kod vas i kako izgleda predaja. Tražimo osobu koja se uklapa u taj kratak, ali važan prozor vremena.",
    ],
    suitedFor: [
      "Povremene obaveze van kuće",
      "Večernje ili vikend termine",
      "Porodice koje još ispituju kakva im pomoć treba",
    ],
    includes: [
      "Dogovor oko trajanja i obaveza pre dolaska",
      "Briga prilagođena uzrastu deteta",
      "Jasan način komunikacije sa roditeljem",
    ],
  },
  {
    slug: "dadilja-4-sata",
    enabled: true,
    onHome: true,
    title: "Dadilja na 4 sata",
    cardTitle: "Dadilja na 4 sata",
    summary: "Podrška kada vam je potrebna pomoć tokom dela dana.",
    eyebrow: "Deo dana",
    image: "/images/drawing.jpg",
    imageAlt: "Dete crta za stolom u toplom, mirnom enterijeru.",
    lead: "Nekoliko sati podrške može mnogo da znači.",
    paragraphs: [
      "Ponekad vam je potrebna pomoć samo tokom jednog dela dana. Možda imate poslovne obaveze, važan sastanak ili želite vreme da završite ono što ne možete dok ste sa detetom. Dadilja na 4 sata omogućava vam da organizujete dan uz podršku osobe posvećene brizi o vašem detetu.",
    ],
    suitedFor: [
      "Jutarnje ili popodnevne blokove",
      "Roditelje koji rade skraćeno",
      "Dane kada je druga pomoć nedostupna",
    ],
    includes: [
      "Usklađen početak i kraj termina",
      "Briga tokom dogovorenih aktivnosti",
      "Kratak osvrt roditelju na kraju",
    ],
  },
  {
    slug: "dadilja-6-sati",
    enabled: true,
    onHome: true,
    title: "Dadilja na 6 sati",
    cardTitle: "Dadilja na 6 sati",
    summary: "Briga o detetu prilagođena vašem dnevnom rasporedu.",
    eyebrow: "Dnevni ritam",
    image: "/images/reading.jpg",
    imageAlt: "Odrasla osoba i dete dele knjigu u mirnom, prirodno osvetljenom prostoru.",
    lead: "Više vremena za obaveze, uz pažnju posvećenu detetu.",
    paragraphs: [
      "Kada vam je potreban veći deo dana za posao i druge obaveze, dadilja na 6 sati može da se uklopi u ritam vaše porodice. To je dovoljno vremena da dete zadrži svoju uobičajenu rutinu, uz igru, obroke i odmor prema vašem dogovoru. Vi možete da se posvetite onome što treba da završite, znajući da je neko tu da brine o vašem detetu.",
      "U agenciji „Moja dadilja” znamo koliko je važno da dete sa dadiljom izgradi osećaj bliskosti i poverenja. Zato slušamo šta je vašoj porodici važno i pomažemo vam da pronađete osobu koja će se uklopiti u detetovu svakodnevicu.",
    ],
    suitedFor: [
      "Radni dan koji nije punih osam sati",
      "Decu kojoj treba stabilan popodnevni ritam",
      "Porodice sa više kraćih obaveza u nizu",
    ],
    includes: [
      "Dogovorena dnevna struktura",
      "Briga o obrocima i odmoru u okviru termina",
      "Prilagođavanje navikama deteta",
    ],
  },
  {
    slug: "dadilja-8-sati",
    enabled: true,
    onHome: true,
    title: "Dadilja na 8 sati",
    cardTitle: "Dadilja na 8 sati",
    summary: "Redovna podrška porodici tokom radnog dana.",
    eyebrow: "Radni dan",
    image: "/images/home.jpg",
    imageAlt: "Svetao dnevni boravak u toplim bež i braon tonovima.",
    lead: "Podrška na koju možete da računate tokom radnog dana.",
    paragraphs: [
      "Kada vam je dadilja potrebna osam sati dnevno, važno je da pronađete osobu koja će razumeti ritam vašeg deteta i uklopiti se u svakodnevicu porodice. Tokom dana ona može biti uz dete u igri, za vreme obroka i odmora, poštujući navike i dogovore koje ste zajedno utvrdili.",
      "U agenciji „Moja dadilja” najpre želimo da upoznamo vaše potrebe, ali i temperament i interesovanja vašeg deteta. Tako možemo da vam pomognemo u izboru osobe sa kojom će dete vremenom izgraditi bliskost, a vi odnos zasnovan na poverenju.",
    ],
    suitedFor: [
      "Roditelje koji rade puno radno vreme",
      "Svakodnevnu, predvidivu podršku",
      "Decu kojoj prija poznata osoba",
    ],
    includes: [
      "Jasan dnevni okvir",
      "Kontinuitet sa istom osobom kad je to moguće",
      "Dogovor oko granica i načina komunikacije",
    ],
  },
  {
    slug: "live-in",
    enabled: true,
    onHome: true,
    title: "Dadilja 24h",
    cardTitle: "Dadilja 24h",
    summary: "Podrška uz boravak u porodičnom domu.",
    eyebrow: "Live-in",
    image: "/images/care.jpg",
    imageAlt: "Porodica u toplom domu, u mirnom trenutku bliskosti.",
    lead: "Podrška uz boravak u porodičnom domu.",
    paragraphs: [
      "Live-in dadilja živi sa porodicom tokom dogovorenog perioda. Ovaj oblik angažovanja odgovara porodicama kojima je potrebna redovna podrška i veća fleksibilnost u organizaciji dana. Dadilja brine o detetu prema njegovoj svakodnevnoj rutini, a njene obaveze mogu obuhvatiti obroke, higijenu, igru, odmor i pratnju na aktivnosti. Po dogovoru, može da prati porodicu i na putovanjima.",
      "Pre početka saradnje dogovaraju se konkretne dužnosti, radno vreme, slobodni dani i smeštaj, kao i uslovi eventualnog putovanja. Boravak u domu porodice ne znači rad bez prekida — dadilja ima vreme za odmor.",
    ],
    suitedFor: [
      "Porodice kojima treba redovna podrška u domu",
      "Veću fleksibilnost u organizaciji dana",
      "Pratnju na putovanju, kada se tako dogovori",
    ],
    includes: [
      "Dogovorene dužnosti, radno vreme i slobodni dani",
      "Smeštaj i uslovi boravka",
      "Vreme za odmor, ne rad bez prekida",
    ],
  },
  {
    slug: "dadilja-na-putovanjima",
    enabled: true,
    onHome: true,
    title: "Dadilja na putovanjima",
    cardTitle: "Dadilja na putovanjima",
    summary: "Pomoć porodici i kada ste daleko od kuće.",
    eyebrow: "Putovanja",
    image: "/images/travel.jpg",
    imageAlt: "Porodica sa detetom na obali, tokom odmora daleko od kuće.",
    lead: "Pomoć porodici i kada ste daleko od kuće.",
    paragraphs: [
      "Dadilja za putovanja prati porodicu tokom dogovorenog puta i pomaže u brizi o detetu, kako bi ono i u novom okruženju zadržalo poznat ritam. U zavisnosti od uzrasta deteta i dogovora sa roditeljima, može da pomogne oko obroka, odmora, igre i pratnje na aktivnostima.",
      "Usluga je korisna tokom odmora, poslovnih putovanja ili dužeg boravka van kuće. Pre polaska se dogovaraju obaveze dadilje, raspored rada i odmora, kao i uslovi putovanja i smeštaja. Na taj način porodica zna šta može da očekuje i može opuštenije da uživa u zajedničkom vremenu.",
    ],
    suitedFor: [
      "Odmor i duži boravak van kuće",
      "Poslovna putovanja porodice",
      "Dete kome je važno da zadrži poznat ritam",
    ],
    includes: [
      "Dogovorene obaveze pre polaska",
      "Raspored rada i odmora",
      "Uslovi putovanja i smeštaja",
    ],
  },
  {
    slug: "guvernanta",
    enabled: true,
    onHome: true,
    title: "Guvernanta",
    cardTitle: "Guvernanta",
    summary: "Podrška detetu u svakodnevnim obavezama, učenju i razvijanju dobrih navika.",
    eyebrow: "Učenje",
    image: "/images/learning.jpg",
    imageAlt: "Dete za stolom, usredsređeno na učenje u mirnom okruženju.",
    lead: "Podrška u učenju, obavezama i svakodnevnom razvoju.",
    paragraphs: [
      "Guvernanta dolazi u dom porodice i pomaže detetu da organizuje školske obaveze, domaće zadatke i pripremu za naredni dan, podstičući ga na samostalnost i razmišljanje.",
      "Uz učenje, organizuje vreme za čitanje, kreativne aktivnosti, igru i odmor, stvarajući zdrav i uravnotežen dnevni ritam.",
    ],
    suitedFor: [
      "Školski uzrast i domaće zadatke",
      "Decu kojoj prija miran, predvidiv popodnevni ritam",
      "Porodice koje žele brigu i podršku u učenju u jednoj osobi",
    ],
    includes: [
      "Dogovor oko školskih obaveza",
      "Vreme za igru i odmor, ne samo zadatke",
      "Povratna informacija roditelju o tome kako je dan tekao",
    ],
  },
];

const serviceOrder = [
  "dadilja-po-satu",
  "dadilja-4-sata",
  "dadilja-6-sati",
  "dadilja-8-sati",
  "guvernanta",
  "live-in",
  "dadilja-na-putovanjima",
];

export function enabledServices() {
  return services
    .filter((service) => service.enabled)
    .sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug));
}

export function homeServices() {
  return enabledServices().filter((service) => service.onHome);
}

export function getService(slug: string) {
  return enabledServices().find((service) => service.slug === slug);
}
