export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "kako-odabrati-dadilju",
    title: "Kako odabrati dadilju za svoje dete",
    excerpt:
      "Dobar izbor počinje od ritma vaše porodice, ne od spiska opštih vrlina. Evo na šta vredi obratiti pažnju pre prvog susreta.",
    category: "Izbor",
    date: "2026-09-12",
    image: "/images/family.jpg",
    imageAlt: "Roditelj i dete u šetnji, u prirodnom svetlu.",
    content: [
      "Većina roditelja počne od pitanja da li je neko slobodan u terminu. To je važno, ali nije dovoljno. Dadilja ulazi u dom u kome već postoje navike, tempo i način na koji se detetu obraćate.",
      "Pre razgovora zapišite tri stvari: uzrast i ritam deteta, šta tačno očekujete tokom angažovanja i šta vam je neprihvatljivo. Taj kratak okvir olakšava i vama i osobi sa kojom razgovarate.",
      "Na susretu posmatrajte kako kandidat sluša, ne samo kako priča o iskustvu. Da li pita za dete? Da li poštuje granice koje postavite? Da li odgovori ostaju konkretni kada pitate kako bi postupio u običnom popodnevu?",
      "Nema univerzalno „prave“ dadilje. Postoji osoba koja odgovara vašem domu. Zato je u redu da prvi predlog nije i poslednji.",
    ],
  },
  {
    slug: "prvi-susret-deteta-i-dadilje",
    title: "Prvi susret deteta i nove dadilje",
    excerpt:
      "Prvi susret ne mora da bude savršen. Treba da bude dovoljno miran da dete vidi poznato lice pored novog.",
    category: "Početak",
    date: "2026-08-28",
    image: "/images/hands.jpg",
    imageAlt: "Nežan trenutak brige o bebi u sigurnom, toplom okruženju.",
    content: [
      "Detetu je lakše kada prvi susret nije rastanak na vratima. Ostanite u prostoriji. Neka dadilja uđe u igru koja je već u toku, umesto da traži pažnju odmah.",
      "Recite detetu, jezikom koji razume, ko dolazi i šta će se dešavati. Kratko i konkretno: „Ana će biti sa tobom dok sam na poslu. Ja se vraćam posle užine.“",
      "Ako dete plače, to nije znak da je izbor propao. To je znak da mu treba vreme i da odrasli ostaju smireni. Dogovorite kako ćete se javiti tokom prvih dana i šta dadilja radi ako je rastanak težak.",
    ],
  },
  {
    slug: "sta-dogovoriti-pre-angazovanja",
    title: "Šta dogovoriti pre početka angažovanja",
    excerpt:
      "Jasan dogovor pre prvog dana čuva i porodicu i dadilju. Nekoliko tema vredi proći unapred.",
    category: "Dogovor",
    date: "2026-08-04",
    image: "/images/walk.jpg",
    imageAlt: "Roditelj i dete u šetnji, u prirodnom dnevnom svetlu.",
    content: [
      "Počnite od praktičnog: dani, sati, adresa, način dolaska i kome se dadilja javlja ako kasni ili ako se plan promeni.",
      "Zatim ritam deteta. Obroci, spavanje, ekrani, šetnja, alergije i osobe koje smeju da preuzmu dete. Ovo nije spisak pravila radi pravila — to je način da se izbegnu nagađanja usred dana.",
      "Dogovorite i šta nije deo angažovanja. Kada su granice rečene na vreme, saradnja ostaje jednostavnija za obe strane.",
      "Na kraju, recite kako želite da dobijate kratak osvrt: poruka na kraju dana, poziv ili beleška. Jedan kanal je dovoljan.",
    ],
  },
  {
    slug: "dadilja-po-satu-ili-stalna",
    title: "Dadilja po satu ili stalna dadilja?",
    excerpt:
      "Povremena pomoć i svakodnevno prisustvo rešavaju različite potrebe. Izbor zavisi od ritma, ne od toga šta „treba“ svima.",
    category: "Usluge",
    date: "2026-07-16",
    image: "/images/baby.jpg",
    imageAlt: "Beba u mirnom, sigurnom okruženju sa mekim svetlom.",
    content: [
      "Po satu i kraći termini odgovaraju kada je potreba povremena ili kada još ne znate kakav vam ritam zaista treba. Manje obaveze, više fleksibilnosti.",
      "Stalniji angažman ima smisla kada dete provodi veći deo dana sa istom osobom i kada porodici treba predvidivost. Tada postaju važniji kontinuitet, navike i način na koji se dadilja uklapa u dom.",
      "Ako niste sigurni, počnite od narednih nekoliko nedelja. Recite šta se ponavlja, a šta je izuzetak. Iz toga se obično vidi da li vam treba fleksibilan termin ili osoba koja je tu redovno.",
    ],
  },
  {
    slug: "kako-pripremiti-dete",
    title: "Kako pripremiti dete za dolazak dadilje",
    excerpt:
      "Priprema ne mora da bude velika priča. Detetu pomažu poznati predmeti, jasan raspored i odrasli koji ne žure.",
    category: "Porodica",
    date: "2026-06-20",
    image: "/images/editorial.jpg",
    imageAlt: "Blizak trenutak odrasle osobe i deteta, bez poze.",
    content: [
      "Dan-dva ranije pomenite dolazak u običnom razgovoru, ne kao veliki događaj. Pokažite gde su igračke, omiljena knjiga i šta se dešava posle ručka.",
      "Ostavite dadilji kratku belešku: šta dete teši, šta ga uznemirava i kako izgleda uobičajeno popodne. To je korisnije od duge biografije.",
      "Prvih dana budite dostupni na dogovoreni način, ali ne prekidajte svaki miran trenutak proverom. Dete brže prihvata novu osobu kada vidi da joj i vi verujete.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function latestPosts(count = 3) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, count);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
