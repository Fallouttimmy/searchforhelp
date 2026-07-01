export type Category = {
  id: string;
  name: string;
  nameNl: string;
  nameFr?: string;
  nameDe?: string;
  nameSv?: string;
  description: string;
  descriptionNl: string;
  descriptionFr?: string;
  descriptionDe?: string;
  descriptionSv?: string;
  icon: string;
  slug: string;
};

export type Helpline = {
  id: string;
  name: string;
  description: string;
  descriptionNl: string;
  descriptionFr?: string;
  descriptionDe?: string;
  descriptionSv?: string;
  phone?: string;
  website?: string;
  categoryId: string;
  hoursNl: string;
  hoursEn?: string;
  hoursFr?: string;
  hoursDe?: string;
  hoursSv?: string;
  languages: string[];
  isEmergency?: boolean;
  isFeatured?: boolean;
  country: string; // 'NL' | 'BE' | 'DE' | 'UK' | 'SE'
};

export const categories: Category[] = [
  {
    id: "mental-health",
    name: "Mental Health",
    nameNl: "Mentale Gezondheid",
    nameFr: "Santé Mentale",
    nameDe: "Psychische Gesundheit",
    nameSv: "Psykisk Hälsa",
    description: "Support for mental health issues, depression, anxiety, and emotional wellbeing",
    descriptionNl: "Ondersteuning bij mentale problemen, depressie, angst en emotioneel welzijn",
    descriptionFr: "Soutien pour les problèmes de santé mentale, la dépression, l'anxiété et le bien-être émotionnel",
    descriptionDe: "Unterstützung bei psychischen Problemen, Depressionen, Angstzuständen und emotionalem Wohlbefinden",
    descriptionSv: "Stöd vid psykiska problem, depression, ångest och emotionellt välbefinnande",
    icon: "brain",
    slug: "mental-health",
  },
  {
    id: "abuse-violence",
    name: "Abuse & Violence",
    nameNl: "Misbruik & Geweld",
    nameFr: "Abus & Violence",
    nameDe: "Missbrauch & Gewalt",
    nameSv: "Övergrepp & Våld",
    description: "Help for victims of abuse, violence, and assault",
    descriptionNl: "Hulp voor slachtoffers van misbruik, geweld en aanranding",
    descriptionFr: "Aide aux victimes de violence, d'abus et d'agression",
    descriptionDe: "Hilfe für Opfer von Missbrauch, Gewalt und Übergriffen",
    descriptionSv: "Hjälp för offer för övergrepp, våld och överfall",
    icon: "shield",
    slug: "abuse-violence",
  },
  {
    id: "addiction",
    name: "Addiction",
    nameNl: "Verslaving",
    nameFr: "Addiction",
    nameDe: "Sucht",
    nameSv: "Beroende",
    description: "Support for addiction to alcohol, drugs, gambling, and other substances",
    descriptionNl: "Ondersteuning bij verslaving aan alcohol, drugs, gokken en andere middelen",
    icon: "pill",
    slug: "addiction",
  },
  {
    id: "youth",
    name: "Youth & Children",
    nameNl: "Jeugd & Kinderen",
    nameFr: "Jeunesse & Enfants",
    nameDe: "Jugend & Kinder",
    nameSv: "Ungdom & Barn",
    description: "Support specifically for young people and children",
    descriptionNl: "Ondersteuning speciaal voor jongeren en kinderen",
    icon: "baby",
    slug: "youth",
  },
  {
    id: "lgbtq",
    name: "LGBTQ+",
    nameNl: "LHBTQ+",
    nameFr: "LGBTQ+",
    nameDe: "LGBTQ+",
    nameSv: "HBTQ+",
    description: "Support for LGBTQ+ individuals and their families",
    descriptionNl: "Ondersteuning voor LHBTQ+ personen en hun families",
    icon: "heart",
    slug: "lgbtq",
  },
  {
    id: "domestic",
    name: "Domestic Issues",
    nameNl: "Huiselijke Problemen",
    nameFr: "Problèmes Domestiques",
    nameDe: "Häusliche Probleme",
    nameSv: "Hemliga Problem",
    description: "Help with domestic violence and family issues",
    descriptionNl: "Hulp bij huiselijk geweld en familiezaken",
    icon: "home",
    slug: "domestic",
  },
  {
    id: "financial",
    name: "Financial Help",
    nameNl: "Financiële Hulp",
    nameFr: "Aide Financière",
    nameDe: "Finanzielle Hilfe",
    nameSv: "Ekonomisk Hjälp",
    description: "Support for debt, poverty, and financial problems",
    descriptionNl: "Ondersteuning bij schulden, armoede en financiële problemen",
    icon: "wallet",
    slug: "financial",
  },
  {
    id: "legal",
    name: "Legal Aid",
    nameNl: "Juridische Hulp",
    nameFr: "Aide Juridique",
    nameDe: "Rechtshilfe",
    nameSv: "Rättshjälp",
    description: "Free legal advice and support",
    descriptionNl: "Gratis juridisch advies en ondersteuning",
    icon: "scale",
    slug: "legal",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    nameNl: "Gezondheidszorg",
    nameFr: "Soins de Santé",
    nameDe: "Gesundheitswesen",
    nameSv: "Sjukvård",
    description: "Medical advice, public health, and healthcare services",
    descriptionNl: "Medisch advies, volksgezondheid en zorgdiensten",
    icon: "stethoscope",
    slug: "healthcare",
  },
  {
    id: "housing",
    name: "Housing & Homelessness",
    nameNl: "Huisvesting & Dakloosheid",
    nameFr: "Logement & Sans-abrisme",
    nameDe: "Wohnen & Obdachlosigkeit",
    nameSv: "Bostad & Hemlöshet",
    description: "Support for housing issues and homelessness",
    descriptionNl: "Ondersteuning bij huisvestingsproblemen en dakloosheid",
    icon: "building",
    slug: "housing",
  },
  {
    id: "seniors",
    name: "Seniors",
    nameNl: "Ouderen",
    nameFr: "Personnes Âgées",
    nameDe: "Senioren",
    nameSv: "Äldre",
    description: "Support, advice, and social connection for older adults",
    descriptionNl: "Ondersteuning, advies en sociaal contact voor ouderen",
    icon: "userPlus",
    slug: "seniors",
  },
  {
    id: "refugees",
    name: "Refugees & Immigrants",
    nameNl: "Vluchtelingen & Immigranten",
    nameFr: "Réfugiés & Immigrants",
    nameDe: "Flüchtlinge & Einwanderer",
    nameSv: "Flyktingar & Invandrare",
    description: "Help and information for refugees and newcomers",
    descriptionNl: "Hulp en informatie voor vluchtelingen en nieuwkomers",
    icon: "globe",
    slug: "refugees",
  },
];

const nlHelplines: Helpline[] = [
  {
    id: "113-suicide",
    name: "113 Zelfmoordpreventie",
    description: "Suicide prevention hotline available 24/7",
    descriptionNl: "Zelfmoordpreventielijn, 24 uur per dag, 7 dagen per week bereikbaar",
    phone: "113",
    website: "https://www.113.nl",
    categoryId: "mental-health",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands", "English"],
    isEmergency: true,
    isFeatured: true,
    country: "NL"
  },
  {
    id: "0800-0113",
    name: "113 Gratis Nummer",
    description: "Free suicide prevention hotline",
    descriptionNl: "Gratis zelfmoordpreventielijn",
    phone: "0800-0113",
    website: "https://www.113.nl",
    categoryId: "mental-health",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
    isFeatured: true,
    country: "NL"
  },
  {
    id: "sensoor",
    name: "De Luisterlijn (Sensoor)",
    description: "Anonymous listening service for loneliness and difficult moments",
    descriptionNl: "Anonieme luisterlijn voor eenzaamheid en moeilijke momenten",
    phone: "088-0767000",
    website: "https://www.deluisterlijn.nl",
    categoryId: "mental-health",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isFeatured: true,
    country: "NL"
  },
  {
    id: "mind-korrelatie",
    name: "MIND Korrelatie",
    description: "Mental health support and information",
    descriptionNl: "Ondersteuning en informatie over mentale gezondheid",
    phone: "0900-1450",
    website: "https://www.mindkorrelatie.nl",
    categoryId: "mental-health",
    hoursNl: "Ma-Vr 9:00-21:00",
    languages: ["Nederlands"],
    isFeatured: true,
    country: "NL"
  },
  {
    id: "veilig-thuis",
    name: "Veilig Thuis",
    description: "Advice and support for domestic violence and child abuse",
    descriptionNl: "Advies en ondersteuning bij huiselijk geweld en kindermishandeling",
    phone: "0800-2000",
    website: "https://www.veiligthuis.nl",
    categoryId: "abuse-violence",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
    isFeatured: true,
    country: "NL"
  },
  {
    id: "slachtofferhulp",
    name: "Slachtofferhulp Nederland",
    description: "Support for victims of crimes, accidents, and disasters",
    descriptionNl: "Ondersteuning voor slachtoffers van misdrijven, ongelukken en rampen",
    phone: "0900-0101",
    website: "https://www.slachtofferhulp.nl",
    categoryId: "abuse-violence",
    hoursNl: "Ma-Vr 8:00-20:00, Za 9:00-17:00",
    languages: ["Nederlands", "English"],
    country: "NL"
  },
  {
    id: "centrum-seksueel-geweld",
    name: "Centrum Seksueel Geweld",
    description: "24/7 support for victims of sexual violence",
    descriptionNl: "24/7 ondersteuning voor slachtoffers van seksueel geweld",
    phone: "0800-0188",
    website: "https://www.centrumseksueelgeweld.nl",
    categoryId: "abuse-violence",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    isEmergency: true,
    country: "NL"
  },
  {
    id: "fier",
    name: "Fier",
    description: "Expert center for violence in dependency relationships",
    descriptionNl: "Expertisecentrum voor geweld in afhankelijkheidsrelaties",
    phone: "088-2084000",
    website: "https://www.fier.nl",
    categoryId: "abuse-violence",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    country: "NL"
  },
  {
    id: "kindertelefoon",
    name: "De Kindertelefoon",
    description: "Free and anonymous helpline for children up to 18 years",
    descriptionNl: "Gratis en anonieme hulplijn voor kinderen tot 18 jaar",
    phone: "0800-0432",
    website: "https://www.kindertelefoon.nl",
    categoryId: "youth",
    hoursNl: "Dagelijks 11:00-21:00",
    languages: ["Nederlands"],
    isFeatured: true,
    country: "NL"
  },
  {
    id: "coc-nederland",
    name: "COC Nederland",
    description: "LGBTQ+ rights organization with support services",
    descriptionNl: "LHBTQ+ belangenorganisatie met ondersteuningsdiensten",
    phone: "020-6234596",
    website: "https://www.coc.nl",
    categoryId: "lgbtq",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands", "English"],
    country: "NL"
  },
  {
    id: "switchboard",
    name: "Switchboard",
    description: "Information and support for LGBTQ+ individuals",
    descriptionNl: "Informatie en ondersteuning voor LHBTQ+ personen",
    phone: "020-6232510",
    website: "https://www.switchboard.nl",
    categoryId: "lgbtq",
    hoursNl: "Ma-Vr 10:00-22:00",
    languages: ["Nederlands", "English"],
    country: "NL"
  },
  {
    id: "blijf-groep",
    name: "Blijf Groep",
    description: "Emergency shelter and support for domestic violence",
    descriptionNl: "Opvang en ondersteuning bij huiselijk geweld",
    phone: "0900-2015550",
    website: "https://www.blijfgroep.nl",
    categoryId: "domestic",
    hoursNl: "24/7 bereikbaar",
    languages: ["Nederlands"],
    country: "NL"
  },
  {
    id: "nibud",
    name: "Nibud",
    description: "Financial advice and budgeting support",
    descriptionNl: "Financieel advies en budgetondersteuning",
    website: "https://www.nibud.nl",
    categoryId: "financial",
    hoursNl: "Via website",
    languages: ["Nederlands"],
    country: "NL"
  },
  {
    id: "juridisch-loket",
    name: "Het Juridisch Loket",
    description: "Free legal advice and information",
    descriptionNl: "Gratis juridisch advies en informatie",
    phone: "0900-8020",
    website: "https://www.juridischloket.nl",
    categoryId: "legal",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands"],
    country: "NL"
  },
  {
    id: "thuisarts",
    name: "Thuisarts.nl",
    description: "Reliable and independent information about health and diseases",
    descriptionNl: "Betrouwbare en onafhankelijke informatie over gezondheid en ziekte",
    website: "https://www.thuisarts.nl",
    categoryId: "healthcare",
    hoursNl: "24/7 via website",
    languages: ["Nederlands"],
    isFeatured: true,
    country: "NL"
  },
  {
    id: "leger-des-heils",
    name: "Leger des Heils",
    description: "Shelter, care, and support for the homeless and vulnerable",
    descriptionNl: "Opvang, zorg en begeleiding voor daklozen en kwetsbaren",
    website: "https://www.legerdesheils.nl",
    categoryId: "housing",
    hoursNl: "24/7 (noodopvang)",
    languages: ["Nederlands"],
    isFeatured: true,
    country: "NL"
  },
  {
    id: "anbo-pcob",
    name: "ANBO-PCOB",
    description: "Advocacy and support for seniors in the Netherlands",
    descriptionNl: "Belangenbehartiging en ondersteuning voor senioren in Nederland",
    phone: "0348-466666",
    website: "https://www.anbo-pcob.nl",
    categoryId: "seniors",
    hoursNl: "Ma-Vr 10:00-15:00",
    languages: ["Nederlands"],
    country: "NL"
  },
  {
    id: "vluchtelingenwerk",
    name: "VluchtelingenWerk Nederland",
    description: "Support and advocacy for asylum seekers and refugees",
    descriptionNl: "Ondersteuning en belangenbehartiging voor asielzoekers en vluchtelingen",
    website: "https://www.vluchtelingenwerk.nl",
    categoryId: "refugees",
    hoursNl: "Ma-Vr 9:00-17:00",
    languages: ["Nederlands", "English", "Arabic", "Tigrinya"],
    isFeatured: true,
    country: "NL"
  }
];

const ukHelplines: Helpline[] = [
  {
    id: "samaritans",
    name: "Samaritans",
    description: "Confidential support for people experiencing feelings of distress or despair",
    descriptionNl: "Vertrouwelijke steun voor mensen met gevoelens van wanhoop",
    phone: "116 123",
    website: "https://www.samaritans.org",
    categoryId: "mental-health",
    hoursNl: "24/7",
    languages: ["English"],
    isEmergency: true,
    isFeatured: true,
    country: "UK"
  },
  {
    id: "mind-uk",
    name: "Mind",
    description: "Mental health information and signposting",
    descriptionNl: "Informatie en verwijzing geestelijke gezondheidszorg",
    phone: "0300 123 3393",
    website: "https://www.mind.org.uk",
    categoryId: "mental-health",
    hoursNl: "Mon-Fri 9:00-18:00",
    languages: ["English"],
    isFeatured: true,
    country: "UK"
  },
  {
    id: "national-domestic-abuse",
    name: "National Domestic Abuse Helpline",
    description: "Free, confidential, 24-hour helpline for those experiencing domestic abuse",
    descriptionNl: "Gratis, vertrouwelijke 24-uurs hulplijn voor slachtoffers van huiselijk geweld",
    phone: "0808 2000 247",
    website: "https://www.nationaldahelpline.org.uk",
    categoryId: "domestic",
    hoursNl: "24/7",
    languages: ["English"],
    isEmergency: true,
    country: "UK"
  },
  {
    id: "childline",
    name: "Childline",
    description: "Free, private and confidential service where you can talk about anything",
    descriptionNl: "Gratis en vertrouwelijke dienst waar je over alles kunt praten",
    phone: "0800 1111",
    website: "https://www.childline.org.uk",
    categoryId: "youth",
    hoursNl: "24/7",
    languages: ["English"],
    isFeatured: true,
    country: "UK"
  },
  {
    id: "nhs-111",
    name: "NHS 111",
    description: "Non-emergency medical advice and support",
    descriptionNl: "Niet-spoedeisend medisch advies en ondersteuning",
    phone: "111",
    website: "https://111.nhs.uk",
    categoryId: "healthcare",
    hoursNl: "24/7",
    languages: ["English"],
    isFeatured: true,
    country: "UK"
  },
  {
    id: "citizens-advice",
    name: "Citizens Advice",
    description: "Free, independent, confidential and impartial advice on rights and responsibilities",
    descriptionNl: "Gratis, onafhankelijk juridisch en financieel advies",
    phone: "0800 144 8848",
    website: "https://www.citizensadvice.org.uk",
    categoryId: "legal",
    hoursNl: "Mon-Fri 9:00-17:00",
    languages: ["English", "Welsh"],
    country: "UK"
  },
  {
    id: "shelter-uk",
    name: "Shelter",
    description: "Housing and homelessness advice",
    descriptionNl: "Advies over huisvesting en dakloosheid",
    phone: "0808 800 4444",
    website: "https://www.shelter.org.uk",
    categoryId: "housing",
    hoursNl: "Mon-Fri 8:00-18:00",
    languages: ["English"],
    country: "UK"
  },
  {
    id: "age-uk",
    name: "Age UK",
    description: "Support, advice and services for older people",
    descriptionNl: "Ondersteuning en advies voor ouderen",
    phone: "0800 678 1602",
    website: "https://www.ageuk.org.uk",
    categoryId: "seniors",
    hoursNl: "Daily 8:00-19:00",
    languages: ["English"],
    country: "UK"
  },
  {
    id: "talk-to-frank",
    name: "FRANK",
    description: "Honest information about drugs and addiction",
    descriptionNl: "Eerlijke informatie over drugs en verslaving",
    phone: "0300 123 6600",
    website: "https://www.talktofrank.com",
    categoryId: "addiction",
    hoursNl: "24/7",
    languages: ["English"],
    country: "UK"
  },
  {
    id: "galop",
    name: "Galop",
    description: "Support for LGBT+ people who have experienced abuse and violence",
    descriptionNl: "Ondersteuning voor LGBT+ personen die misbruik en geweld hebben ervaren",
    phone: "0800 999 5428",
    website: "https://galop.org.uk",
    categoryId: "lgbtq",
    hoursNl: "Mon-Fri 10:00-16:00",
    languages: ["English"],
    country: "UK"
  }
];

const deHelplines: Helpline[] = [
  {
    id: "telefonseelsorge",
    name: "TelefonSeelsorge",
    description: "Free, anonymous helpline for people in crisis or emotional distress",
    descriptionNl: "Gratis, anonieme hulplijn voor mensen in crisis of emotionele nood",
    descriptionDe: "Kostenlose, anonyme Telefonberatung für Menschen in Krisen oder emotionaler Not",
    phone: "0800 111 0 111",
    website: "https://www.telefonseelsorge.de",
    categoryId: "mental-health",
    hoursNl: "24/7",
    languages: ["German"],
    isEmergency: true,
    isFeatured: true,
    country: "DE"
  },
  {
    id: "hilfetelefon-gewalt",
    name: "Hilfetelefon Gewalt gegen Frauen",
    description: "Support for women experiencing violence",
    descriptionNl: "Hulp voor vrouwen die geweld ervaren",
    descriptionDe: "Unterstützung für Frauen, die von Gewalt betroffen sind",
    phone: "116 016",
    website: "https://www.hilfetelefon.de",
    categoryId: "abuse-violence",
    hoursNl: "24/7",
    languages: ["German", "English", "French"],
    isEmergency: true,
    country: "DE"
  },
  {
    id: "nummer-gegen-kummer",
    name: "Nummer gegen Kummer",
    description: "Helpline for children, youth, and parents",
    descriptionNl: "Hulplijn voor kinderen, jongeren en ouders",
    descriptionDe: "Kinder- und Jugendtelefon, Elterntelefon",
    phone: "116 111",
    website: "https://www.nummergegenkummer.de",
    categoryId: "youth",
    hoursNl: "Mon-Sat 14:00-20:00",
    languages: ["German"],
    isFeatured: true,
    country: "DE"
  },
  {
    id: "aerztlicher-bereitschaftsdienst",
    name: "Ärztlicher Bereitschaftsdienst",
    description: "Medical on-call service for non-life-threatening illnesses out of hours",
    descriptionNl: "Medische dienstverlening buiten kantooruren voor niet-levensbedreigende aandoeningen",
    descriptionDe: "Ärztlicher Bereitschaftsdienst bei nicht lebensbedrohlichen Krankheiten außerhalb der Praxiszeiten",
    phone: "116 117",
    website: "https://www.116117.de",
    categoryId: "healthcare",
    hoursNl: "24/7",
    languages: ["German"],
    isFeatured: true,
    country: "DE"
  },
  {
    id: "sucht-und-drogen-hotline",
    name: "Sucht & Drogen Hotline",
    description: "Helpline for addiction and drug problems",
    descriptionNl: "Hulplijn voor verslaving en drugsproblemen",
    descriptionDe: "Bundesweite Sucht- & Drogen-Hotline",
    phone: "01806 313031",
    website: "https://www.sucht-und-drogen-hotline.de",
    categoryId: "addiction",
    hoursNl: "24/7",
    languages: ["German"],
    country: "DE"
  },
  {
    id: "weisser-ring",
    name: "Weisser Ring",
    description: "Support for victims of crime and their families",
    descriptionNl: "Ondersteuning voor slachtoffers van misdrijven en hun families",
    descriptionDe: "Hilfe für Kriminalitätsopfer und deren Angehörige",
    phone: "116 006",
    website: "https://weisser-ring.de",
    categoryId: "abuse-violence",
    hoursNl: "Daily 07:00-22:00",
    languages: ["German"],
    country: "DE"
  },
  {
    id: "vlsp",
    name: "VLSP",
    description: "Psychological support for LGBTQ+ people",
    descriptionNl: "Psychologische ondersteuning voor LHBTQ+ personen",
    descriptionDe: "Psychologische Unterstützung für LGBTQ+ Personen",
    website: "https://www.vlsp.de",
    categoryId: "lgbtq",
    hoursNl: "Via website",
    languages: ["German"],
    country: "DE"
  }
];

const beHelplines: Helpline[] = [
  {
    id: "tele-onthaal",
    name: "Tele-Onthaal",
    description: "Anonymous helpline for all personal issues",
    descriptionNl: "Anonieme hulplijn voor alle persoonlijke problemen",
    descriptionFr: "Ligne d'assistance anonyme pour tous les problèmes personnels (Télé-Accueil)",
    phone: "106",
    website: "https://www.tele-onthaal.be",
    categoryId: "mental-health",
    hoursNl: "24/7",
    languages: ["Nederlands", "French"],
    isEmergency: true,
    isFeatured: true,
    country: "BE"
  },
  {
    id: "zelfmoordlijn1813",
    name: "Zelfmoordlijn 1813",
    description: "Suicide prevention hotline",
    descriptionNl: "Zelfmoordpreventielijn",
    descriptionFr: "Ligne de prévention du suicide",
    phone: "1813",
    website: "https://www.zelfmoord1813.be",
    categoryId: "mental-health",
    hoursNl: "24/7",
    languages: ["Nederlands"],
    isEmergency: true,
    isFeatured: true,
    country: "BE"
  },
  {
    id: "awel",
    name: "Awel",
    description: "Helpline for children and youth",
    descriptionNl: "Hulplijn voor kinderen en jongeren",
    descriptionFr: "Ligne d'assistance pour les enfants et les jeunes",
    phone: "102",
    website: "https://www.awel.be",
    categoryId: "youth",
    hoursNl: "16:00-22:00",
    languages: ["Nederlands"],
    isFeatured: true,
    country: "BE"
  },
  {
    id: "1712",
    name: "1712",
    description: "Helpline for questions about violence, abuse and child abuse",
    descriptionNl: "Hulplijn voor vragen over geweld, misbruik en kindermishandeling",
    descriptionFr: "Ligne d'assistance pour les questions sur la violence et les abus",
    phone: "1712",
    website: "https://www.1712.be",
    categoryId: "abuse-violence",
    hoursNl: "Mon-Fri 09:00-17:00",
    languages: ["Nederlands"],
    country: "BE"
  },
  {
    id: "druglijn",
    name: "De Druglijn",
    description: "Information, help and advice about drugs, alcohol, pills, gaming and gambling",
    descriptionNl: "Informatie, hulp en advies over drugs, alcohol, pillen, gamen en gokken",
    phone: "078 15 10 20",
    website: "https://www.druglijn.be",
    categoryId: "addiction",
    hoursNl: "Mon-Fri 10:00-20:00",
    languages: ["Nederlands"],
    country: "BE"
  },
  {
    id: "caw",
    name: "CAW",
    description: "Center for general social work (financial, housing, domestic)",
    descriptionNl: "Centrum Algemeen Welzijnswerk",
    phone: "0800 13 500",
    website: "https://www.caw.be",
    categoryId: "financial",
    hoursNl: "Mon-Fri 09:00-17:00",
    languages: ["Nederlands"],
    country: "BE"
  },
  {
    id: "lumi",
    name: "Lumi",
    description: "Information and support for LGBTQ+ issues",
    descriptionNl: "Informatie en opvang voor al je vragen over gender en seksuele voorkeur",
    phone: "0800 99 533",
    website: "https://www.lumi.be",
    categoryId: "lgbtq",
    hoursNl: "Mon, Wed, Thu 18:30-21:30",
    languages: ["Nederlands"],
    country: "BE"
  }
];

const seHelplines: Helpline[] = [
  {
    id: "bris",
    name: "BRIS",
    description: "Children's rights in society, helpline for youth under 18",
    descriptionNl: "Kinderrechten in de samenleving, hulplijn voor jongeren onder 18",
    descriptionSv: "Barnens rätt i samhället, stödlinje för barn under 18",
    phone: "116 111",
    website: "https://www.bris.se",
    categoryId: "youth",
    hoursNl: "24/7",
    languages: ["Swedish", "English"],
    isFeatured: true,
    country: "SE"
  },
  {
    id: "mind-sjalvmordslinjen",
    name: "Självmordslinjen (Mind)",
    description: "Suicide prevention helpline",
    descriptionNl: "Zelfmoordpreventielijn",
    descriptionSv: "Självmordslinjen öppen dygnet runt",
    phone: "90101",
    website: "https://mind.se",
    categoryId: "mental-health",
    hoursNl: "24/7",
    languages: ["Swedish"],
    isEmergency: true,
    isFeatured: true,
    country: "SE"
  },
  {
    id: "kvinnofridslinjen",
    name: "Kvinnofridslinjen",
    description: "National helpline for women experiencing violence",
    descriptionNl: "Nationale hulplijn voor vrouwen die geweld ervaren",
    descriptionSv: "Nationell stödtelefon för dig som utsatts för våld",
    phone: "020-50 50 50",
    website: "https://kvinnofridslinjen.se",
    categoryId: "domestic",
    hoursNl: "24/7",
    languages: ["Swedish", "English", "Arabic"],
    isEmergency: true,
    country: "SE"
  },
  {
    id: "1177-vardguiden",
    name: "1177 Vårdguiden",
    description: "Healthcare advice and information",
    descriptionNl: "Medisch advies en informatie",
    descriptionSv: "Sjukvårdsrådgivning och information",
    phone: "1177",
    website: "https://www.1177.se",
    categoryId: "healthcare",
    hoursNl: "24/7",
    languages: ["Swedish", "English"],
    isFeatured: true,
    country: "SE"
  },
  {
    id: "alkohollinjen",
    name: "Alkohollinjen",
    description: "Helpline for alcohol problems",
    descriptionNl: "Hulplijn voor alcoholproblemen",
    descriptionSv: "Stöd för dig som vill förändra dina alkoholvanor",
    phone: "020-84 44 48",
    website: "https://www.alkohollinjen.se",
    categoryId: "addiction",
    hoursNl: "Varies",
    languages: ["Swedish"],
    country: "SE"
  },
  {
    id: "rfsl",
    name: "RFSL Stödmottagning",
    description: "Support for LGBTQ+ people subjected to harassment, threats or violence",
    descriptionNl: "Ondersteuning voor LHBTQ+ personen",
    descriptionSv: "Stöd till hbtqi-personer som utsatts för kränkningar, hot eller våld",
    phone: "020-34 13 16",
    website: "https://www.rfsl.se/stodmottagning",
    categoryId: "lgbtq",
    hoursNl: "Varies",
    languages: ["Swedish", "English"],
    country: "SE"
  },
  {
    id: "brottsofferjouren",
    name: "Brottsofferjouren",
    description: "Victim support Sweden",
    descriptionNl: "Slachtofferhulp Zweden",
    descriptionSv: "Stöd till brottsutsatta, vittnen och anhöriga",
    phone: "116 006",
    website: "https://www.brottsofferjouren.se",
    categoryId: "abuse-violence",
    hoursNl: "Mon-Fri 09:00-19:00",
    languages: ["Swedish", "English", "Others"],
    country: "SE"
  }
];

export const helplines: Helpline[] = [
  ...nlHelplines,
  ...ukHelplines,
  ...deHelplines,
  ...beHelplines,
  ...seHelplines
];
