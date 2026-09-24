export type Service = {
  slug: string;
  enabled: boolean;
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
    title: "Dadilja – 4 sata",
    cardTitle: "Dadilja – 4 sata",
    summary:
      "Praktično rešenje za kraće dnevne obaveze i periode kada vam je potrebna pouzdana pomoć.",
    eyebrow: "Kraći dan",
    image: "/images/drawing.jpg",
    imageAlt: "Dete crta za stolom u toplom, mirnom enterijeru.",
    lead: "Četiri sata su dovoljna za fokusiran deo dana — jutarnju rutinu, vreme posle vrtića ili blok obaveza.",
    paragraphs: [
      "Ovaj format odgovara porodicama kojima ne treba ceo dan, ali im treba osoba na koju mogu da računaju u tačno određenom delu dana.",
      "Zajedno definišemo šta se u ta četiri sata dešava: obrok, igra, odmor, šetnja ili preuzimanje deteta. Dadilja dolazi pripremljena za taj ritam, ne za opšti raspored.",
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
    title: "Dadilja – 6 sati",
    cardTitle: "Dadilja – 6 sati",
    summary: "Produžena podrška porodici tokom većeg dela dana.",
    eyebrow: "Produženi dan",
    image: "/images/reading.jpg",
    imageAlt: "Odrasla osoba i dete dele knjigu u mirnom, prirodno osvetljenom prostoru.",
    lead: "Šest sati pokriva veći deo dana — dovoljno da dete ima kontinuitet, a roditelj prostor za rad.",
    paragraphs: [
      "U dužem terminu postaje važnije kako dadilja vodi ritam: obroci, odmor, igra i prelazak iz jedne aktivnosti u drugu bez žurbe.",
      "Tražimo osobu koja može da drži taj ritam smireno i da se javi ako se nešto promeni, umesto da porodica nagađa kako je dan prošao.",
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
    title: "Dadilja – 8 sati",
    cardTitle: "Dadilja – 8 sati",
    summary:
      "Dadilja za puno radno vreme i porodice kojima je potrebna svakodnevna podrška.",
    eyebrow: "Ceo dan",
    image: "/images/home.jpg",
    imageAlt: "Svetao dnevni boravak u toplim bež i braon tonovima.",
    lead: "Celodnevna podrška za porodice čiji radni dan traži osobu koja je tu od jutra do popodneva.",
    paragraphs: [
      "Osam sati znači da dadilja ulazi u pravi ritam kuće: jutarnje pripreme, obroke, igru, odmor i preuzimanje dana kada se roditelj vrati.",
      "Zato izbor nije samo pitanje slobodnog termina. Razgovaramo o tome kako izgleda vaš dan, šta dete voli i šta vam je važno da ostane isto.",
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
    title: "Live-in dadilja",
    cardTitle: "Live-in dadilja",
    summary:
      "Dugoročniji oblik angažovanja za porodice kojima je potrebna intenzivnija podrška i prisustvo dadilje.",
    eyebrow: "Prisustvo",
    image: "/images/care.jpg",
    imageAlt: "Porodica u toplom domu, u mirnom trenutku bliskosti.",
    lead: "Za porodice kojima treba više od dnevnog termina — prisustvo koje prati ritam kuće kroz duži period.",
    paragraphs: [
      "Live-in angažovanje traži posebno pažljiv spoj. Reč je o osobi koja boravi u domu, pa su granice, privatnost i način komunikacije jednako važni kao iskustvo sa decom.",
      "Razgovor počinje od toga kako živite: prostor, noćni ritam, putovanja i šta tačno očekujete od prisustva. Ništa se ne podrazumeva unapred.",
    ],
    suitedFor: [
      "Porodice sa intenzivnijom potrebom za podrškom",
      "Duži periodi u kojima ritam kuće mora da ostane stabilan",
      "Situacije u kojima dnevni termini nisu dovoljni",
    ],
    includes: [
      "Detaljan dogovor pre početka",
      "Poštovanje privatnosti doma",
      "Jasno definisane obaveze i vreme odmora",
    ],
  },
  {
    slug: "guvernanta",
    enabled: true,
    title: "Guvernanta",
    cardTitle: "Guvernanta",
    summary:
      "Podrška detetu koja pored brige može uključivati učenje, razvoj veština i pomoć u svakodnevnim obrazovnim obavezama.",
    eyebrow: "Briga i učenje",
    image: "/images/learning.jpg",
    imageAlt: "Dete za stolom, usredsređeno na učenje u mirnom okruženju.",
    lead: "Osoba koja pored brige može da prati školske obaveze, čitanje i navike učenja — tempom koji detetu odgovara.",
    paragraphs: [
      "Guvernanta nije zamena za školu. To je odrasla osoba koja može da organizuje popodne: užina, zadaci, čitanje i vreme za igru, bez pritiska da sve izgleda kao čas.",
      "U razgovoru razdvajamo šta je briga, a šta pomoć oko učenja, koji uzrast je u pitanju i kojim jezikom ili veštinama želite da se bavite.",
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

export function enabledServices() {
  return services.filter((service) => service.enabled);
}

export function getService(slug: string) {
  return enabledServices().find((service) => service.slug === slug);
}
