export type ChatOption = {
  id: string;
  label: string;
  labelNl: string;
  labelFr?: string;
  labelDe?: string;
  labelSv?: string;
  nextId?: string;
  action?: {
    type: 'category' | 'helplines' | 'phone' | 'close';
    value: string | string[];
  };
};

export type ChatNode = {
  id: string;
  message: string;
  messageNl: string;
  messageFr?: string;
  messageDe?: string;
  messageSv?: string;
  options: ChatOption[];
};

export const chatNodes: Record<string, ChatNode> = {
  start: {
    id: 'start',
    message: 'Hello. I am the Help Assistant. I can guide you to the right resources. What kind of help do you need?',
    messageNl: 'Hallo. Ik ben de Hulp Assistent. Ik kan je de weg wijzen naar de juiste instanties. Welke hulp heb je nodig?',
    messageFr: 'Bonjour. Je suis l\'Assistant d\'Aide. Je peux vous guider vers les bonnes ressources. De quel type d\'aide avez-vous besoin ?',
    messageDe: 'Hallo. Ich bin der Hilfsassistent. Ich kann Sie zu den richtigen Ressourcen führen. Welche Art von Hilfe benötigen Sie?',
    messageSv: 'Hej. Jag är Hjälpassistenten. Jag kan guida dig till rätt resurser. Vilken typ av hjälp behöver du?',
    options: [
      { id: 'opt_urgent', label: 'I am in immediate danger / emergency', labelNl: 'Ik ben in direct gevaar / noodgeval', labelFr: 'Je suis en danger immédiat / urgence', labelDe: 'Ich bin in unmittelbarer Gefahr / Notfall', labelSv: 'Jag är i omedelbar fara / nödsituation', nextId: 'urgent' },
      { id: 'opt_mental', label: 'I am struggling with my mental health', labelNl: 'Ik worstel met mijn mentale gezondheid', labelFr: 'Je lutte avec ma santé mentale', labelDe: 'Ich kämpfe mit meiner psychischen Gesundheit', labelSv: 'Jag kämpar med min psykiska hälsa', nextId: 'mental' },
      { id: 'opt_lonely', label: 'I am feeling lonely or need to talk', labelNl: 'Ik voel me eenzaam of wil praten', labelFr: 'Je me sens seul ou j\'ai besoin de parler', labelDe: 'Ich fühle mich einsam oder muss reden', labelSv: 'Jag känner mig ensam eller behöver prata', nextId: 'lonely' },
      { id: 'opt_practical', label: 'I need practical help (money, housing, legal)', labelNl: 'Ik heb praktische hulp nodig (geld, wonen, juridisch)', labelFr: 'J\'ai besoin d\'aide pratique (argent, logement, juridique)', labelDe: 'Ich brauche praktische Hilfe (Geld, Wohnen, Rechtliches)', labelSv: 'Jag behöver praktisk hjälp (pengar, boende, juridik)', nextId: 'practical' },
      { id: 'opt_violence', label: 'I am dealing with violence or abuse', labelNl: 'Ik heb te maken met geweld of misbruik', labelFr: 'Je fais face à la violence ou à des abus', labelDe: 'Ich habe mit Gewalt oder Missbrauch zu tun', labelSv: 'Jag har att göra med våld eller övergrepp', nextId: 'violence' },
      { id: 'opt_cancel', label: 'Never mind', labelNl: 'Laat maar', labelFr: 'Peu importe', labelDe: 'Vergiss es', labelSv: 'Glöm det', action: { type: 'close' as any, value: '' } }
    ]
  },
  urgent: {
    id: 'urgent',
    message: 'If you are in immediate physical danger or need urgent medical help, please call 112. If you are having thoughts of suicide, please contact your local suicide prevention hotline.',
    messageNl: 'Als je in direct fysiek gevaar bent of dringend medische hulp nodig hebt, bel dan 112. Als je gedachten aan zelfmoord hebt, neem dan contact op met je lokale zelfmoordpreventielijn.',
    messageFr: 'Si vous êtes en danger physique immédiat ou si vous avez besoin d\'une aide médicale urgente, veuillez appeler le 112. Si vous avez des pensées suicidaires, veuillez contacter la ligne de prévention du suicide de votre région.',
    messageDe: 'Wenn Sie in unmittelbarer körperlicher Gefahr sind oder dringend medizinische Hilfe benötigen, rufen Sie bitte die 112 an. Wenn Sie Selbstmordgedanken haben, wenden Sie sich bitte an Ihre örtliche Selbstmordpräventions-Hotline.',
    messageSv: 'Om du befinner dig i omedelbar fysisk fara eller behöver akut medicinsk hjälp, ring 112. Om du har självmordstankar, vänligen kontakta din lokala självmordslinje.',
    options: [
      { id: 'opt_112', label: 'Call 112', labelNl: 'Bel 112', labelFr: 'Appeler le 112', labelDe: '112 anrufen', labelSv: 'Ring 112', action: { type: 'phone', value: '112' } },
      { id: 'opt_suicide', label: 'Show suicide prevention helplines', labelNl: 'Toon zelfmoordpreventielijnen', labelFr: 'Afficher les lignes d\'assistance pour la prévention du suicide', labelDe: 'Suizidpräventions-Hotlines anzeigen', labelSv: 'Visa hjälplinjer för självmordsprevention', action: { type: 'category', value: 'mental-health' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'start' }
    ]
  },
  lonely: {
    id: 'lonely',
    message: 'Everyone feels lonely sometimes. We are here for you. Who are you looking to talk to?',
    messageNl: 'Iedereen voelt zich weleens eenzaam. We zijn er voor je. Met wie zou je willen praten?',
    messageFr: 'Tout le monde se sent parfois seul. Nous sommes là pour vous. Avec qui cherchez-vous à parler ?',
    messageDe: 'Jeder fühlt sich manchmal einsam. Wir sind für Sie da. Mit wem möchten Sie sprechen?',
    messageSv: 'Alla känner sig ensamma ibland. Vi är här för dig. Vem letar du efter att prata med?',
    options: [
      { id: 'opt_sensoor', label: 'I want to talk anonymously to a listener', labelNl: 'Ik wil anoniem met een luisteraar praten', labelFr: 'Je veux parler de manière anonyme à un auditeur', labelDe: 'Ich möchte anonym mit einem Zuhörer sprechen', labelSv: 'Jag vill prata anonymt med en lyssnare', action: { type: 'category', value: 'mental-health' } },
      { id: 'opt_youth_talk', label: 'I am young and want to talk to peers/counselors', labelNl: 'Ik ben jong en wil praten', labelFr: 'Je suis jeune et je veux parler à des pairs/conseillers', labelDe: 'Ich bin jung und möchte mit Gleichaltrigen/Beratern sprechen', labelSv: 'Jag är ung och vill prata med jämnåriga/rådgivare', action: { type: 'category', value: 'youth' } },
      { id: 'opt_senior_talk', label: 'I am a senior looking for connection', labelNl: 'Ik ben een senior en zoek contact', labelFr: 'Je suis un senior à la recherche de contacts', labelDe: 'Ich bin ein Senior, der nach Kontakt sucht', labelSv: 'Jag är en senior som letar efter kontakt', action: { type: 'category', value: 'seniors' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'start' }
    ]
  },
  mental: {
    id: 'mental',
    message: 'Mental health is important. What are you experiencing right now?',
    messageNl: 'Mentale gezondheid is belangrijk. Wat ervaar je op dit moment?',
    messageFr: 'La santé mentale est importante. Que vivez-vous en ce moment ?',
    messageDe: 'Psychische Gesundheit ist wichtig. Was erleben Sie gerade?',
    messageSv: 'Psykisk hälsa är viktig. Vad upplever du just nu?',
    options: [
      { id: 'opt_crisis', label: 'I am in a crisis / suicidal', labelNl: 'Ik zit in een crisis / ben suïcidaal', labelFr: 'Je suis en crise / suicidaire', labelDe: 'Ich bin in einer Krise / suizidal', labelSv: 'Jag är i en kris / självmordsbenägen', nextId: 'urgent' },
      { id: 'opt_depression', label: 'I am feeling depressed or anxious', labelNl: 'Ik voel me depressief of angstig', labelFr: 'Je me sens déprimé ou anxieux', labelDe: 'Ich fühle mich depressiv oder ängstlich', labelSv: 'Jag känner mig deprimerad eller orolig', nextId: 'mental_depression' },
      { id: 'opt_youth_mental', label: 'I am a youth looking for help', labelNl: 'Ik ben een jongere en zoek hulp', labelFr: 'Je suis un jeune à la recherche d\'aide', labelDe: 'Ich bin ein Jugendlicher und suche Hilfe', labelSv: 'Jag är en ungdom som letar efter hjälp', nextId: 'youth_mental' },
      { id: 'opt_addiction', label: 'I need help with addiction', labelNl: 'Ik heb hulp nodig bij verslaving', labelFr: 'J\'ai besoin d\'aide pour une addiction', labelDe: 'Ich brauche Hilfe bei einer Sucht', labelSv: 'Jag behöver hjälp med beroende', nextId: 'addiction' },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'start' }
    ]
  },
  mental_depression: {
    id: 'mental_depression',
    message: 'Do you want to talk anonymously over the phone, or are you looking for professional therapy/counseling services?',
    messageNl: 'Wil je anoniem telefonisch praten, of zoek je professionele therapie/hulpverlening?',
    messageFr: 'Voulez-vous parler de manière anonyme au téléphone, ou recherchez-vous des services de thérapie/conseil professionnels ?',
    messageDe: 'Möchten Sie anonym am Telefon sprechen oder suchen Sie professionelle Therapie-/Beratungsdienste?',
    messageSv: 'Vill du prata anonymt via telefon, eller letar du efter professionella terapi-/rådgivningstjänster?',
    options: [
      { id: 'opt_anonymous', label: 'Anonymous listening helpline', labelNl: 'Anonieme luisterlijn', labelFr: 'Ligne d\'écoute anonyme', labelDe: 'Anonyme Telefonberatung', labelSv: 'Anonym lyssnarhjälplinje', action: { type: 'category', value: 'mental-health' } },
      { id: 'opt_therapy', label: 'Professional healthcare / doctor', labelNl: 'Professionele zorg / huisarts', labelFr: 'Soins de santé professionnels / médecin', labelDe: 'Professionelle Gesundheitsversorgung / Arzt', labelSv: 'Professionell sjukvård / läkare', action: { type: 'category', value: 'healthcare' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'mental' }
    ]
  },
  addiction: {
    id: 'addiction',
    message: 'What kind of addiction do you need help with?',
    messageNl: 'Met wat voor soort verslaving heb je hulp nodig?',
    messageFr: 'Pour quel type d\'addiction avez-vous besoin d\'aide ?',
    messageDe: 'Bei welcher Art von Sucht benötigen Sie Hilfe?',
    messageSv: 'Vilken typ av beroende behöver du hjälp med?',
    options: [
      { id: 'opt_drugs', label: 'Drugs or Alcohol', labelNl: 'Drugs of Alcohol', labelFr: 'Drogues ou Alcool', labelDe: 'Drogen oder Alkohol', labelSv: 'Droger eller Alkohol', action: { type: 'category', value: 'addiction' } },
      { id: 'opt_gambling', label: 'Gambling', labelNl: 'Gokken', labelFr: 'Jeux d\'argent', labelDe: 'Glücksspiel', labelSv: 'Spel', action: { type: 'category', value: 'addiction' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'mental' }
    ]
  },
  youth_mental: {
    id: 'youth_mental',
    message: 'It is brave of you to seek help. What kind of support are you looking for?',
    messageNl: 'Het is moedig dat je hulp zoekt. Wat voor soort ondersteuning zoek je?',
    messageFr: 'C\'est courageux de votre part de chercher de l\'aide. Quel type de soutien recherchez-vous ?',
    messageDe: 'Es ist mutig von Ihnen, um Hilfe zu bitten. Welche Art von Unterstützung suchen Sie?',
    messageSv: 'Det är modigt av dig att söka hjälp. Vilken typ av stöd letar du efter?',
    options: [
      { id: 'opt_youth_chat', label: 'Anonymous chat / call for youth', labelNl: 'Anoniem chatten / bellen voor jongeren', labelFr: 'Chat / appel anonyme pour les jeunes', labelDe: 'Anonymer Chat / Anruf für Jugendliche', labelSv: 'Anonym chatt / samtal för ungdomar', action: { type: 'category', value: 'youth' } },
      { id: 'opt_youth_suicide', label: 'I am thinking about suicide', labelNl: 'Ik denk aan zelfmoord', labelFr: 'Je pense au suicide', labelDe: 'Ich denke an Selbstmord', labelSv: 'Jag tänker på självmord', action: { type: 'category', value: 'mental-health' } },
      { id: 'opt_lgbtq', label: 'LGBTQ+ specific support', labelNl: 'LHBTQ+ specifieke ondersteuning', labelFr: 'Soutien spécifique LGBTQ+', labelDe: 'LGBTQ+ spezifische Unterstützung', labelSv: 'HBTQ+-specifikt stöd', action: { type: 'category', value: 'lgbtq' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'mental' }
    ]
  },
  practical: {
    id: 'practical',
    message: 'What kind of practical help are you looking for?',
    messageNl: 'Welke praktische hulp zoek je?',
    messageFr: 'Quel type d\'aide pratique recherchez-vous ?',
    messageDe: 'Nach welcher Art von praktischer Hilfe suchen Sie?',
    messageSv: 'Vilken typ av praktisk hjälp letar du efter?',
    options: [
      { id: 'opt_finance', label: 'Financial or debt help', labelNl: 'Hulp bij financiën of schulden', labelFr: 'Aide financière ou aux dettes', labelDe: 'Finanz- oder Schuldenhilfe', labelSv: 'Ekonomisk eller skuldrådgivning', nextId: 'finance' },
      { id: 'opt_housing', label: 'Housing or homelessness', labelNl: 'Huisvesting of dakloosheid', labelFr: 'Logement ou sans-abrisme', labelDe: 'Wohnen oder Obdachlosigkeit', labelSv: 'Bostad eller hemlöshet', action: { type: 'category', value: 'housing' } },
      { id: 'opt_legal', label: 'Legal advice', labelNl: 'Juridisch advies', labelFr: 'Conseil juridique', labelDe: 'Rechtsberatung', labelSv: 'Juridisk rådgivning', action: { type: 'category', value: 'legal' } },
      { id: 'opt_refugee', label: 'Refugee or immigrant support', labelNl: 'Ondersteuning voor vluchtelingen', labelFr: 'Soutien aux réfugiés ou immigrants', labelDe: 'Flüchtlings- oder Einwandererunterstützung', labelSv: 'Stöd till flyktingar eller invandrare', action: { type: 'category', value: 'refugees' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'start' }
    ]
  },
  finance: {
    id: 'finance',
    message: 'Are you dealing with debt that you cannot pay, or do you need help with budgeting and general financial advice?',
    messageNl: 'Heb je te maken met schulden die je niet kunt betalen, of heb je hulp nodig bij budgetteren en algemeen financieel advies?',
    messageFr: 'Faites-vous face à des dettes que vous ne pouvez pas payer, ou avez-vous besoin d\'aide pour la budgétisation et des conseils financiers généraux ?',
    messageDe: 'Haben Sie Schulden, die Sie nicht bezahlen können, oder benötigen Sie Hilfe bei der Budgetierung und allgemeinen Finanzberatung?',
    messageSv: 'Har du att göra med skulder som du inte kan betala, eller behöver du hjälp med budgetering och allmän ekonomisk rådgivning?',
    options: [
      { id: 'opt_debt', label: 'I am in debt', labelNl: 'Ik heb schulden', labelFr: 'Je suis endetté', labelDe: 'Ich bin verschuldet', labelSv: 'Jag är skuldsatt', action: { type: 'category', value: 'financial' } },
      { id: 'opt_budget', label: 'Budgeting & advice', labelNl: 'Budgetteren & advies', labelFr: 'Budgétisation & conseil', labelDe: 'Budgetierung & Beratung', labelSv: 'Budgetering & rådgivning', action: { type: 'category', value: 'financial' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'practical' }
    ]
  },
  violence: {
    id: 'violence',
    message: 'I am so sorry you are dealing with this. Safety is the first priority. What type of situation is this?',
    messageNl: 'Het spijt me dat je hiermee te maken hebt. Veiligheid heeft de hoogste prioriteit. Om wat voor situatie gaat het?',
    messageFr: 'Je suis tellement désolé que vous fassiez face à cela. La sécurité est la première priorité. De quel type de situation s\'agit-il ?',
    messageDe: 'Es tut mir so leid, dass Sie damit zu tun haben. Sicherheit ist die erste Priorität. Um welche Art von Situation handelt es sich?',
    messageSv: 'Jag är så ledsen att du har att göra med detta. Säkerhet är högsta prioritet. Vilken typ av situation är detta?',
    options: [
      { id: 'opt_urgent_violence', label: 'I am in immediate danger (Call 112)', labelNl: 'Ik ben in direct gevaar (Bel 112)', labelFr: 'Je suis en danger immédiat (Appeler le 112)', labelDe: 'Ich bin in unmittelbarer Gefahr (112 anrufen)', labelSv: 'Jag är i omedelbar fara (Ring 112)', action: { type: 'phone', value: '112' } },
      { id: 'opt_domestic', label: 'Domestic violence or child abuse', labelNl: 'Huiselijk geweld of kindermishandeling', labelFr: 'Violence domestique ou maltraitance d\'enfants', labelDe: 'Häusliche Gewalt oder Kindesmissbrauch', labelSv: 'Våld i hemmet eller barnmisshandel', action: { type: 'category', value: 'domestic' } },
      { id: 'opt_sexual', label: 'Sexual violence', labelNl: 'Seksueel geweld', labelFr: 'Violence sexuelle', labelDe: 'Sexuelle Gewalt', labelSv: 'Sexuellt våld', action: { type: 'category', value: 'abuse-violence' } },
      { id: 'opt_crime', label: 'Victim of a crime', labelNl: 'Slachtoffer van een misdrijf', labelFr: 'Victime d\'un crime', labelDe: 'Opfer eines Verbrechens', labelSv: 'Offer för ett brott', action: { type: 'category', value: 'abuse-violence' } },
      { id: 'opt_back', label: 'Go back', labelNl: 'Ga terug', labelFr: 'Retourner', labelDe: 'Geh zurück', labelSv: 'Gå tillbaka', nextId: 'start' }
    ]
  },
  end_results: {
    id: 'end_results',
    message: 'I hope this information was helpful. Do you need anything else?',
    messageNl: 'Ik hoop dat deze informatie nuttig was. Heb je nog iets anders nodig?',
    messageFr: 'J\'espère que ces informations vous ont été utiles. Avez-vous besoin d\'autre chose ?',
    messageDe: 'Ich hoffe, diese Informationen waren hilfreich. Brauchen Sie noch etwas?',
    messageSv: 'Jag hoppas att denna information var till hjälp. Behöver du något annat?',
    options: [
      { id: 'opt_yes', label: 'Yes', labelNl: 'Ja', labelFr: 'Oui', labelDe: 'Ja', labelSv: 'Ja', nextId: 'restart' },
      { id: 'opt_no', label: 'No', labelNl: 'Nee', labelFr: 'Non', labelDe: 'Nein', labelSv: 'Nej', action: { type: 'close' as any, value: '' } }
    ]
  },
  restart: {
    id: 'restart',
    message: 'What can I help you with?',
    messageNl: 'Waar kan ik je mee helpen?',
    messageFr: 'En quoi puis-je vous aider ?',
    messageDe: 'Wobei kann ich Ihnen helfen?',
    messageSv: 'Vad kan jag hjälpa dig med?',
    options: [
      { id: 'opt_urgent', label: 'I am in immediate danger / emergency', labelNl: 'Ik ben in direct gevaar / noodgeval', labelFr: 'Je suis en danger immédiat / urgence', labelDe: 'Ich bin in unmittelbarer Gefahr / Notfall', labelSv: 'Jag är i omedelbar fara / nödsituation', nextId: 'urgent' },
      { id: 'opt_mental', label: 'I am struggling with my mental health', labelNl: 'Ik worstel met mijn mentale gezondheid', labelFr: 'Je lutte avec ma santé mentale', labelDe: 'Ich kämpfe mit meiner psychischen Gesundheit', labelSv: 'Jag kämpar med min psykiska hälsa', nextId: 'mental' },
      { id: 'opt_lonely', label: 'I am feeling lonely or need to talk', labelNl: 'Ik voel me eenzaam of wil praten', labelFr: 'Je me sens seul ou j\'ai besoin de parler', labelDe: 'Ich fühle mich einsam oder muss reden', labelSv: 'Jag känner mig ensam eller behöver prata', nextId: 'lonely' },
      { id: 'opt_practical', label: 'I need practical help (money, housing, legal)', labelNl: 'Ik heb praktische hulp nodig (geld, wonen, juridisch)', labelFr: 'J\'ai besoin d\'aide pratique (argent, logement, juridique)', labelDe: 'Ich brauche praktische Hilfe (Geld, Wohnen, Rechtliches)', labelSv: 'Jag behöver praktisk hjälp (pengar, boende, juridik)', nextId: 'practical' },
      { id: 'opt_violence', label: 'I am dealing with violence or abuse', labelNl: 'Ik heb te maken met geweld of misbruik', labelFr: 'Je fais face à la violence ou à des abus', labelDe: 'Ich habe mit Gewalt oder Missbrauch zu tun', labelSv: 'Jag har att göra med våld eller övergrepp', nextId: 'violence' },
      { id: 'opt_cancel', label: 'Never mind', labelNl: 'Laat maar', labelFr: 'Peu importe', labelDe: 'Vergiss es', labelSv: 'Glöm det', action: { type: 'close' as any, value: '' } }
    ]
  }
};
