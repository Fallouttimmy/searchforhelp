import React, { useState, useMemo, useEffect } from 'react';
import { 
  Brain, Shield, Pill, Baby, Heart, Home, Wallet, Scale, 
  Search, ArrowLeft, Phone, Globe, AlertTriangle, ExternalLink,
  Stethoscope, Building, UserPlus, LogOut, Moon, Sun, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { categories, helplines, Category, Helpline } from './data';
import { Chatbot } from './Chatbot';

type Language = 'en' | 'nl' | 'fr' | 'de' | 'sv';
type CountryCode = 'NL' | 'BE' | 'DE' | 'UK' | 'SE';

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  pill: <Pill className="w-6 h-6" />,
  baby: <Baby className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  home: <Home className="w-6 h-6" />,
  wallet: <Wallet className="w-6 h-6" />,
  scale: <Scale className="w-6 h-6" />,
  stethoscope: <Stethoscope className="w-6 h-6" />,
  building: <Building className="w-6 h-6" />,
  userPlus: <UserPlus className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
};

const translations = {
  en: {
    quickExit: 'Quick Exit',
    emergencyBanner: 'In life-threatening or medical emergency? Call 112 immediately.',
    title: 'Find the right support',
    subtitle: 'A directory of helplines, support groups, and organizations. Select a category or search directly for the help you need.',
    searchPlaceholder: 'What kind of help do you need?',
    noResults: 'No results found for your search.',
    backToCategories: 'Back to categories',
    emergency: 'Emergency',
    hours: 'Hours:',
    noHelplines: 'No helplines found.',
    welcomeTitle: 'Welcome to searchforhelp',
    welcomeSubtitle: 'Please select your country and preferred language to continue.',
    selectCountry: 'Select your country',
    selectLanguage: 'Select your preferred language',
    continueBtn: 'Continue',
    forCountry: 'for',
    changeCountryPopup: 'Press this to change your country at any time',
    countries: {
      NL: 'Netherlands',
      BE: 'Belgium',
      DE: 'Germany',
      UK: 'United Kingdom',
      SE: 'Sweden'
    }
  },
  nl: {
    quickExit: 'Snel Verlaten',
    emergencyBanner: 'In levensgevaar of medische nood? Bel direct 112.',
    title: 'Vind de juiste hulp',
    subtitle: 'Een overzicht van hulplijnen, steungroepen en organisaties. Selecteer een categorie of zoek direct naar de hulp die je nodig hebt.',
    searchPlaceholder: 'Waar bent u naar op zoek?',
    noResults: 'Geen resultaten gevonden voor uw zoekopdracht.',
    backToCategories: 'Terug naar alle categorieën',
    emergency: 'Spoed',
    hours: 'Open:',
    noHelplines: 'Geen hulplijnen gevonden voor uw zoekopdracht.',
    welcomeTitle: 'Welkom bij searchforhelp',
    welcomeSubtitle: 'Selecteer uw land en voorkeurstaal om door te gaan.',
    selectCountry: 'Selecteer uw land',
    selectLanguage: 'Selecteer uw voorkeurstaal',
    continueBtn: 'Doorgaan',
    forCountry: 'voor',
    changeCountryPopup: 'Druk hierop om uw land op elk moment te wijzigen',
    countries: {
      NL: 'Nederland',
      BE: 'België',
      DE: 'Duitsland',
      UK: 'Verenigd Koninkrijk',
      SE: 'Zweden'
    }
  },
  fr: {
    quickExit: 'Sortie Rapide',
    emergencyBanner: 'Urgence médicale ou danger de mort ? Appelez immédiatement le 112.',
    title: 'Trouvez le bon soutien',
    subtitle: 'Un annuaire de lignes d\'assistance, de groupes de soutien et d\'organisations. Sélectionnez une catégorie ou recherchez directement l\'aide dont vous avez besoin.',
    searchPlaceholder: 'De quel type d\'aide avez-vous besoin ?',
    noResults: 'Aucun résultat trouvé pour votre recherche.',
    backToCategories: 'Retour aux catégories',
    emergency: 'Urgence',
    hours: 'Heures :',
    noHelplines: 'Aucune ligne d\'assistance trouvée.',
    welcomeTitle: 'Bienvenue sur searchforhelp',
    welcomeSubtitle: 'Veuillez sélectionner votre pays et votre langue préférée pour continuer.',
    selectCountry: 'Sélectionnez votre pays',
    selectLanguage: 'Sélectionnez votre langue préférée',
    continueBtn: 'Continuer',
    forCountry: 'pour',
    changeCountryPopup: 'Appuyez ici pour changer de pays à tout moment',
    countries: {
      NL: 'Pays-Bas',
      BE: 'Belgique',
      DE: 'Allemagne',
      UK: 'Royaume-Uni',
      SE: 'Suède'
    }
  },
  de: {
    quickExit: 'Schnelles Verlassen',
    emergencyBanner: 'In lebensbedrohlichen oder medizinischen Notfällen? Rufen Sie sofort 112 an.',
    title: 'Finden Sie die richtige Unterstützung',
    subtitle: 'Ein Verzeichnis von Hotlines, Selbsthilfegruppen und Organisationen. Wählen Sie eine Kategorie oder suchen Sie direkt nach der Hilfe, die Sie benötigen.',
    searchPlaceholder: 'Welche Art von Hilfe benötigen Sie?',
    noResults: 'Keine Ergebnisse für Ihre Suche gefunden.',
    backToCategories: 'Zurück zu Kategorien',
    emergency: 'Notfall',
    hours: 'Öffnungszeiten:',
    noHelplines: 'Keine Hotlines gefunden.',
    welcomeTitle: 'Willkommen bei searchforhelp',
    welcomeSubtitle: 'Bitte wählen Sie Ihr Land und Ihre bevorzugte Sprache, um fortzufahren.',
    selectCountry: 'Wählen Sie Ihr Land',
    selectLanguage: 'Wählen Sie Ihre bevorzugte Sprache',
    continueBtn: 'Fortfahren',
    forCountry: 'für',
    changeCountryPopup: 'Klicken Sie hier, um Ihr Land jederzeit zu ändern',
    countries: {
      NL: 'Niederlande',
      BE: 'Belgien',
      DE: 'Deutschland',
      UK: 'Vereinigtes Königreich',
      SE: 'Schweden'
    }
  },
  sv: {
    quickExit: 'Snabb Utgång',
    emergencyBanner: 'Vid livshotande eller medicinskt nödläge? Ring 112 omedelbart.',
    title: 'Hitta rätt stöd',
    subtitle: 'En katalog över hjälplinjer, stödgrupper och organisationer. Välj en kategori eller sök direkt efter den hjälp du behöver.',
    searchPlaceholder: 'Vilken typ av hjälp behöver du?',
    noResults: 'Inga resultat hittades för din sökning.',
    backToCategories: 'Tillbaka till kategorier',
    emergency: 'Nödsituation',
    hours: 'Öppettider:',
    noHelplines: 'Inga hjälplinjer hittades.',
    welcomeTitle: 'Välkommen till searchforhelp',
    welcomeSubtitle: 'Vänligen välj ditt land och föredragna språk för att fortsätta.',
    selectCountry: 'Välj ditt land',
    selectLanguage: 'Välj ditt föredragna språk',
    continueBtn: 'Fortsätt',
    forCountry: 'för',
    changeCountryPopup: 'Tryck här för att ändra ditt land när som helst',
    countries: {
      NL: 'Nederländerna',
      BE: 'Belgien',
      DE: 'Tyskland',
      UK: 'Storbritannien',
      SE: 'Sverige'
    }
  }
};

const countries: Record<CountryCode, { name: string, flag: string }> = {
  NL: { name: 'Netherlands', flag: '🇳🇱' },
  BE: { name: 'Belgium', flag: '🇧🇪' },
  DE: { name: 'Germany', flag: '🇩🇪' },
  UK: { name: 'United Kingdom', flag: '🇬🇧' },
  SE: { name: 'Sweden', flag: '🇸🇪' }
};

const languageNames = {
  en: 'English',
  nl: 'Nederlands',
  fr: 'Français',
  de: 'Deutsch',
  sv: 'Svenska'
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [country, setCountry] = useState<CountryCode | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const [setupStep, setSetupStep] = useState<'country'|'language'>('country');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCountryTooltip, setShowCountryTooltip] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const t = translations[lang] || translations['en'];

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    const savedCountry = localStorage.getItem('country') as CountryCode;
    if (savedLang) setLang(savedLang);
    if (savedCountry) {
      setCountry(savedCountry);
    }
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleSetupComplete = () => {
    if (!country) return;
    localStorage.setItem('lang', lang);
    localStorage.setItem('country', country);
    setShowSetup(false);
    
    if (!localStorage.getItem('countryTooltipShown')) {
      setShowCountryTooltip(true);
      localStorage.setItem('countryTooltipShown', 'true');
      setTimeout(() => setShowCountryTooltip(false), 6000);
    }
  };

  const getCategoryName = (c: Category) => {
    switch (lang) {
      case 'nl': return c.nameNl || c.name;
      case 'fr': return c.nameFr || c.name;
      case 'de': return c.nameDe || c.name;
      case 'sv': return c.nameSv || c.name;
      default: return c.name;
    }
  };

  const getCategoryDescription = (c: Category) => {
    switch (lang) {
      case 'nl': return c.descriptionNl || c.description;
      case 'fr': return c.descriptionFr || c.description;
      case 'de': return c.descriptionDe || c.description;
      case 'sv': return c.descriptionSv || c.description;
      default: return c.description;
    }
  };

  const getHelplineDescription = (h: Helpline) => {
    switch (lang) {
      case 'nl': return h.descriptionNl || h.description;
      case 'fr': return h.descriptionFr || h.description;
      case 'de': return h.descriptionDe || h.description;
      case 'sv': return h.descriptionSv || h.description;
      default: return h.description;
    }
  };
  
  const getHelplineHours = (h: Helpline) => {
    switch (lang) {
      case 'nl': return h.hoursNl || h.hoursEn || h.hoursNl;
      case 'fr': return h.hoursFr || h.hoursEn || h.hoursNl;
      case 'de': return h.hoursDe || h.hoursEn || h.hoursNl;
      case 'sv': return h.hoursSv || h.hoursEn || h.hoursNl;
      default: return h.hoursEn || h.hoursNl;
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    const lowerQuery = searchQuery.toLowerCase();
    return categories.filter(c => 
      getCategoryName(c).toLowerCase().includes(lowerQuery) || 
      getCategoryDescription(c).toLowerCase().includes(lowerQuery) ||
      helplines.some(h => 
        h.categoryId === c.id && h.country === country && (
          h.name.toLowerCase().includes(lowerQuery) ||
          getHelplineDescription(h).toLowerCase().includes(lowerQuery)
        )
      )
    );
  }, [searchQuery, lang, country]);

  const categoryHelplines = useMemo(() => {
    if (!activeCategory || !country) return [];
    let lines = helplines.filter(h => h.categoryId === activeCategory.id && h.country === country);
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      lines = lines.filter(h => 
        h.name.toLowerCase().includes(lowerQuery) ||
        getHelplineDescription(h).toLowerCase().includes(lowerQuery)
      );
    }
    // Sort emergencies first
    return lines.sort((a, b) => {
      if (a.isEmergency && !b.isEmergency) return -1;
      if (!a.isEmergency && b.isEmergency) return 1;
      return 0;
    });
  }, [activeCategory, searchQuery, lang, country]);

  const handleEmergencyExit = () => {
    // Quick exit to a safe site for privacy/safety
    setIsExiting(true);
    window.location.replace('https://www.google.com');
  };

  if (!isLoaded || isExiting) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;
  }

  if (showSetup) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-800">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">
            {t.welcomeTitle}
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
            {t.welcomeSubtitle}
          </p>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {setupStep === 'country' ? (
                <motion.div 
                  key="country"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-center text-slate-800 dark:text-slate-200 mb-4">{t.selectCountry}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(countries).map(([code, {flag}]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCountry(code as CountryCode);
                          setSetupStep('language');
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${country === code ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-teal-200 dark:hover:border-teal-800'}`}
                      >
                        <span className="text-4xl">{flag}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm text-center">{(t.countries as any)[code]}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="language"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      onClick={() => setSetupStep('country')}
                      className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t.selectLanguage}</h3>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => setLang(code as Language)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium ${lang === code ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-teal-200 dark:hover:border-teal-800 text-slate-700 dark:text-slate-300'}`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={handleSetupComplete}
                    disabled={!country}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-md"
                  >
                    {t.continueBtn}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-teal-100 dark:selection:bg-teal-900/30">
      {/* Emergency Exit Button */}
      <button 
        onClick={handleEmergencyExit}
        className="fixed bottom-6 right-6 z-50 bg-rose-600 hover:bg-rose-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold tracking-wide transition-transform hover:scale-105 active:scale-95"
        aria-label="Quick Exit"
      >
        <LogOut className="w-5 h-5" />
        <span className="hidden sm:inline">{t.quickExit}</span>
      </button>

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        {/* Emergency Banner */}
        <div className="bg-rose-600 text-white px-4 py-2 text-center text-sm font-medium">
          {t.emergencyBanner}
        </div>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div 
              className="cursor-pointer group"
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
              }}
            >
              <h1 className="font-bold text-xl sm:text-2xl tracking-tight text-slate-800 dark:text-slate-100 transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-400">
                searchforhelp
              </h1>
            </div>
            {country && (
              <div className="relative">
                <button 
                  onClick={() => setShowSetup(true)}
                  className="text-sm sm:text-base text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 font-medium tracking-wide transition-colors focus:outline-none"
                >
                  {t.forCountry} {(t.countries as any)[country]}
                </button>
                <AnimatePresence>
                  {showCountryTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 p-3 bg-slate-800 dark:bg-slate-700 text-white text-sm font-medium rounded-xl shadow-xl z-50 pointer-events-none"
                    >
                      <div className="absolute -top-1.5 left-4 w-3 h-3 bg-slate-800 dark:bg-slate-700 rotate-45" />
                      {(t as any).changeCountryPopup}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
              >
                <span>{lang.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </button>
              
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLang(code as Language);
                          localStorage.setItem('lang', code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === code ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                      >
                        {name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {!activeCategory ? (
            <motion.div 
              key="home-view"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Home Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-1 space-y-4">
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    {t.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                <div className="relative flex-1 max-w-md w-full ml-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-base transition-all shadow-sm text-slate-900 dark:text-slate-100"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div 
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category);
                        setSearchQuery('');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-600 transition-all cursor-pointer flex flex-col h-full"
                    >
                      <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-teal-600 dark:group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                        {iconMap[category.icon]}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {getCategoryName(category)}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed flex-grow">
                        {getCategoryDescription(category)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-slate-500">
                    {t.noResults}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="category-view"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Category Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button 
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors py-2 px-3 -ml-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 w-fit"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">{t.backToCategories}</span>
                </button>

                <div className="relative flex-1 max-w-md w-full ml-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-base transition-all shadow-sm text-slate-900 dark:text-slate-100"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Helplines List */}
              <div className="space-y-6">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-2xl flex items-center justify-center shrink-0">
                    {React.cloneElement(iconMap[activeCategory.icon] as React.ReactElement, { className: 'w-8 h-8' })}
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                      {getCategoryName(activeCategory)}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl mt-2 max-w-2xl">
                      {getCategoryDescription(activeCategory)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {categoryHelplines.length > 0 ? (
                    categoryHelplines.map((helpline) => (
                      <div 
                        key={helpline.id}
                        className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border ${helpline.isEmergency ? 'border-rose-300 dark:border-rose-800 shadow-sm ring-2 ring-rose-100 dark:ring-rose-900/30' : 'border-slate-200 dark:border-slate-800 shadow-sm'} flex flex-col`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 pr-4">
                            {helpline.name}
                          </h3>
                          {helpline.isEmergency && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 shrink-0">
                              <AlertTriangle className="w-4 h-4" />
                              {t.emergency}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 flex-grow leading-relaxed">
                          {getHelplineDescription(helpline)}
                        </p>

                        <div className="space-y-4 mt-auto pt-5 border-t border-slate-100 dark:border-slate-800">
                          {helpline.phone && (
                            <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                              <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                              </div>
                              <a href={`tel:${helpline.phone}`} className="font-bold text-lg hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                                {helpline.phone}
                              </a>
                            </div>
                          )}
                          {helpline.website && (
                            <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                              </div>
                              <a 
                                href={helpline.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-semibold text-lg hover:text-teal-700 dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1.5 truncate"
                              >
                                {helpline.website.replace(/^https?:\/\/(www\.)?/, '')}
                                <ExternalLink className="w-4 h-4 opacity-50 shrink-0" />
                              </a>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 mt-5 pt-3">
                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {t.hours} {getHelplineHours(helpline)}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {helpline.languages.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-dashed">
                      {t.noHelplines}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Chatbot 
        lang={lang} 
        country={country}
        onSelectCategory={(categoryId) => {
          const category = categories.find(c => c.id === categoryId);
          if (category) {
            setActiveCategory(category);
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} 
      />
    </div>
  );
}
