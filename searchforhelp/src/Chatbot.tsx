import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, ChevronRight, Phone, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatNodes, ChatOption } from './chatData';
import { helplines as allHelplines, Helpline } from './data';

let globalAudioCtx: AudioContext | null = null;

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  speakText?: string;
  helplines?: Helpline[];
  silent?: boolean;
};

type Language = 'en' | 'nl' | 'fr' | 'de' | 'sv';

interface ChatbotProps {
  lang: Language;
  country: string;
  onSelectCategory: (categoryId: string) => void;
}

const getBotMessage = (node: any, lang: Language) => {
  switch (lang) {
    case 'nl': return node.messageNl || node.message;
    case 'fr': return node.messageFr || node.message;
    case 'de': return node.messageDe || node.message;
    case 'sv': return node.messageSv || node.message;
    default: return node.message;
  }
};

const getOptionLabel = (option: ChatOption, lang: Language) => {
  switch (lang) {
    case 'nl': return option.labelNl || option.label;
    case 'fr': return (option as any).labelFr || option.label;
    case 'de': return (option as any).labelDe || option.label;
    case 'sv': return (option as any).labelSv || option.label;
    default: return option.label;
  }
};

const getHelplineDescription = (h: Helpline, lang: Language) => {
  switch (lang) {
    case 'nl': return h.descriptionNl || h.description;
    case 'fr': return h.descriptionFr || h.description;
    case 'de': return h.descriptionDe || h.description;
    case 'sv': return h.descriptionSv || h.description;
    default: return h.description;
  }
};

const translations = {
  en: {
    needHelp: 'Need help?',
    assistant: 'Help Assistant',
    closeReply: 'No problem. If you need anything else, you know where to find me.',
    chooseFrom: 'Choose from:',
    resourcesIntro: 'Here are some resources that can help you:',
    helpVoice: 'Help voice'
  },
  nl: {
    needHelp: 'Hulp nodig?',
    assistant: 'Hulp Assistent',
    closeReply: 'Geen probleem. Als je nog wat nodig hebt weet je me te vinden.',
    chooseFrom: 'Kies uit:',
    resourcesIntro: 'Hier zijn enkele organisaties die je kunnen helpen:',
    helpVoice: 'Hulp stem'
  },
  fr: {
    needHelp: 'Besoin d\'aide ?',
    assistant: 'Assistant d\'aide',
    closeReply: 'Pas de problème. Si vous avez besoin d\'autre chose, vous savez où me trouver.',
    chooseFrom: 'Choisissez parmi :',
    resourcesIntro: 'Voici quelques ressources qui peuvent vous aider :',
    helpVoice: 'Voix d\'aide'
  },
  de: {
    needHelp: 'Brauchen Sie Hilfe?',
    assistant: 'Hilfsassistent',
    closeReply: 'Kein Problem. Wenn Sie noch etwas brauchen, wissen Sie, wo Sie mich finden.',
    chooseFrom: 'Wählen Sie aus:',
    resourcesIntro: 'Hier sind einige Ressourcen, die Ihnen helfen können:',
    helpVoice: 'Hilfsstimme'
  },
  sv: {
    needHelp: 'Behöver du hjälp?',
    assistant: 'Hjälpassistent',
    closeReply: 'Inga problem. Om du behöver något annat vet du var jag finns.',
    chooseFrom: 'Välj bland:',
    resourcesIntro: 'Här är några resurser som kan hjälpa dig:',
    helpVoice: 'Hjälpröst'
  }
};

export function Chatbot({ lang, country, onSelectCategory }: ChatbotProps) {
  const t = translations[lang] || translations['en'];
  const [animState, setAnimState] = useState<'closed'|'right'|'up'|'expand'|'open'|'ready'>('closed');
  const [showTooltip, setShowTooltip] = useState(true);
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      // Use standard iPad/tablet breakpoint for mobile view
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animState === 'ready' && messages.length === 0) {
      const startNode = chatNodes['start'];
      setMessages([{
        id: 'msg-start',
        sender: 'bot',
        text: getBotMessage(startNode, lang),
        silent: true
      }]);
    }
  }, [animState, lang, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentNodeId, animState]);

  useEffect(() => {
    // Warm up the voices
    window.speechSynthesis.getVoices();
    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  useEffect(() => {
    if (ttsEnabled && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'bot') {
        if (lastMsg.silent) return;

        window.speechSynthesis.cancel();
        
        let textToSpeak = lastMsg.speakText || lastMsg.text;
        
        // Add options text if available
        if (currentNodeId && !lastMsg.id.startsWith('msg-bot-result')) {
          const node = chatNodes[currentNodeId];
          if (node && node.options && node.options.length > 0) {
            const optionsText = node.options.map(opt => getOptionLabel(opt, lang)).join('. ');
            textToSpeak += '. ' + t.chooseFrom + ' ' + optionsText;
          }
        }
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        const voices = window.speechSynthesis.getVoices();
        const langPrefix = lang;
        const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
        
        // Find best female/premium voice
        const femaleKeywords = ['female', 'woman', 'samantha', 'victoria', 'tessa', 'colette', 'zira', 'fleur', 'lotte', 'laura', 'google'];
        let selectedVoice = null;
        
        for (const kw of femaleKeywords) {
          selectedVoice = langVoices.find(v => v.name.toLowerCase().includes(kw));
          if (selectedVoice) break;
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        } else if (langVoices.length > 0) {
          utterance.voice = langVoices[0];
        }
        
        utterance.lang = lang === 'en' ? 'en-US' : (lang === 'nl' ? 'nl-NL' : lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'sv-SE');
        // Adjust pitch and rate for a more natural sound
        utterance.pitch = 1.1; 
        utterance.rate = 0.95;
        
        if (lastMsg.id.startsWith('msg-bot-close')) {
          utterance.onend = () => handleClose();
          utterance.onerror = () => handleClose();
        }
        
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [messages, ttsEnabled, lang, t, currentNodeId]);

  const playSound = (type: 'up' | 'expand' | 'open' | 'close' | 'click') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!globalAudioCtx) {
        globalAudioCtx = new AudioContextClass();
      }
      const ctx = globalAudioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const time = ctx.currentTime;
      
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, time);
        osc.frequency.exponentialRampToValueAtTime(100, time + 0.015);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.02);
        return;
      }
      
      const createWhoosh = (startFreq: number, endFreq: number, duration: number, vol: number = 0.1) => {
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(startFreq, time);
        filter.frequency.exponentialRampToValueAtTime(endFreq, time + duration);
        filter.Q.value = 0.5;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(vol, time + duration * 0.3);
        gain.gain.linearRampToValueAtTime(0, time + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(time);
      };

      if (type === 'up') {
        createWhoosh(200, 800, 0.3, 0.1);
      } else if (type === 'expand') {
        createWhoosh(400, 1200, 0.3, 0.1);
      } else if (type === 'open') {
        createWhoosh(800, 2000, 0.3, 0.1);
      } else if (type === 'close') {
        createWhoosh(2000, 200, 0.4, 0.15);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpen = () => {
    if (animState !== 'closed') return;
    playSound('up');
    setShowTooltip(false);
    setAnimState('up');
    
    setTimeout(() => {
      playSound('expand');
      setAnimState('expand');
    }, 400);
    
    setTimeout(() => {
      playSound('open');
      setAnimState('open');
    }, 800);
    
    setTimeout(() => setAnimState('ready'), 1200);
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    playSound('close');
    setAnimState('closed');
    setTimeout(() => {
      setMessages([]);
      setCurrentNodeId('start');
    }, 500);
  };

  const handleOptionClick = (option: ChatOption) => {
    playSound('click');
    setMessages(prev => [...prev, {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: getOptionLabel(option, lang)
    }]);

    if (option.action) {
      if (option.action.type === 'phone') {
        window.location.href = `tel:${option.action.value}`;
      } else if (option.action.type === 'close') {
        setCurrentNodeId('');
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `msg-bot-close-${Date.now()}`,
            sender: 'bot',
            text: t.closeReply
          }]);
          
          if (ttsEnabled) {
            setTimeout(() => handleClose(), 7000); // Fallback
          } else {
            setTimeout(() => handleClose(), 3000);
          }
        }, 500);
      } else if (option.action.type === 'category' || option.action.type === 'helplines') {
        let specificHelplines: Helpline[] = [];
        if (option.action.type === 'category') {
          specificHelplines = allHelplines.filter(h => h.categoryId === option.action.value as string && h.country === country);
        } else if (option.action.type === 'helplines') {
          const ids = Array.isArray(option.action.value) ? option.action.value : [option.action.value];
          specificHelplines = allHelplines.filter(h => ids.includes(h.id) && h.country === country);
        }
        
        setTimeout(() => {
          const endNode = chatNodes['end_results'];
          const combinedMsg = t.resourcesIntro + ' ' + getBotMessage(endNode, lang) + ' ' + t.chooseFrom + ' ' + endNode.options.map(o => getOptionLabel(o, lang)).join(', ');

          setMessages(prev => [...prev, {
            id: `msg-bot-result-${Date.now()}`,
            sender: 'bot',
            text: t.resourcesIntro,
            speakText: combinedMsg,
            helplines: specificHelplines
          }]);
          
          setTimeout(() => {
            setCurrentNodeId('end_results');
            setMessages(prev => [...prev, {
              id: `msg-bot-end-${Date.now()}`,
              sender: 'bot',
              text: getBotMessage(endNode, lang),
              silent: true
            }]);
          }, 600);
        }, 500);
      }
    } else if (option.nextId && chatNodes[option.nextId]) {
      if (option.nextId === 'start') {
        setMessages([]); 
        setCurrentNodeId('start');
        const startNode = chatNodes['start'];
        setTimeout(() => {
          setMessages([{
            id: `msg-start-${Date.now()}`,
            sender: 'bot',
            text: getBotMessage(startNode, lang)
          }]);
        }, 100);
      } else {
        const nextNode = chatNodes[option.nextId];
        setCurrentNodeId(option.nextId);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `msg-bot-${Date.now()}`,
            sender: 'bot',
            text: getBotMessage(nextNode, lang)
          }]);
        }, 400);
      }
    }
  };

  const currentNode = chatNodes[currentNodeId];

  return (
    <>
      <AnimatePresence>
        {showTooltip && animState === 'closed' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-6 lg:bottom-24 lg:left-6 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl shadow-xl border border-teal-100 dark:border-teal-900/50 text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[250px] z-50 pointer-events-auto"
          >
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-slate-900 border-b border-r border-teal-100 dark:border-teal-900/50 transform rotate-45"></div>
            <div className="flex items-start justify-between gap-3">
              <span>{t.needHelp}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed top-0 left-0 w-full h-full lg:top-auto lg:bottom-6 lg:left-6 lg:w-[380px] lg:h-[600px] z-50 pointer-events-none">
        <motion.div
          className={`pointer-events-auto absolute overflow-hidden shadow-2xl border transition-colors duration-300 ${(animState === 'open' || animState === 'ready') ? 'border-slate-200' : 'border-transparent'}`}
          initial="initial"
          animate={animState}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          variants={{
            initial: { 
              left: isMobile ? 24 : 0, 
              top: `calc(100% - ${isMobile ? 24 : 0}px - 56px)`, 
              width: 56, height: 56, borderRadius: '28px 28px 28px 28px', backgroundColor: '#0d9488',
              scale: 0,
              opacity: 0,
              y: 50
            },
            closed: { 
              left: isMobile ? 24 : 0, 
              top: `calc(100% - ${isMobile ? 24 : 0}px - 56px)`, 
              width: 56, height: 56, borderRadius: '28px 28px 28px 28px', backgroundColor: '#0d9488',
              scale: 1,
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: { 
                type: 'spring', stiffness: 400, damping: 25, delay: 0.1
              }
            },
            right: { 
              left: isMobile ? 24 : 0, 
              top: `calc(100% - ${isMobile ? 24 : 0}px - 56px)`, 
              width: 56, height: 56, borderRadius: '28px 28px 28px 28px', backgroundColor: '#0d9488',
              scale: 1, opacity: 1, y: 0
            },
            up: { 
              left: isMobile ? 24 : 0, 
              top: 0, 
              width: 56, height: 56, borderRadius: '28px 28px 28px 28px', backgroundColor: '#0d9488',
              scale: 1, opacity: 1, y: 0
            },
            expand: { 
              left: 0, top: 0, 
              width: '100%', height: 64, 
              borderRadius: isMobile ? '0px 0px 0px 0px' : '16px 16px 0px 0px', 
              backgroundColor: '#0d9488',
              scale: 1, opacity: 1, y: 0
            },
            open: { 
              left: 0, top: 0, 
              width: '100%', height: '100%', 
              borderRadius: isMobile ? '0px 0px 0px 0px' : '16px 16px 16px 16px', 
              backgroundColor: '#0d9488',
              scale: 1, opacity: 1, y: 0
            },
            ready: { 
              left: 0, top: 0, 
              width: '100%', height: '100%', 
              borderRadius: isMobile ? '0px 0px 0px 0px' : '16px 16px 16px 16px', 
              backgroundColor: '#0d9488',
              scale: 1, opacity: 1, y: 0
            }
          }}
        >
          {/* Persistent Chat Icon */}
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ 
              rotate: 0, 
              scale: 1,
              left: (animState === 'closed' || animState === 'right' || animState === 'up') ? '50%' : 28,
              top: (animState === 'closed' || animState === 'right' || animState === 'up') ? '50%' : 32,
              x: '-50%',
              y: '-50%',
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute z-20 flex items-center justify-center text-white"
            onClick={animState === 'closed' ? handleOpen : undefined}
            style={{ 
              cursor: animState === 'closed' ? 'pointer' : 'default',
              width: 24,
              height: 24
            }}
          >
            <MessageCircle className="w-full h-full" />
          </motion.div>

          <AnimatePresence>
            {(animState === 'expand' || animState === 'open' || animState === 'ready') && (
              <motion.div 
                initial={{ opacity: 1 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-teal-600 text-white p-4 flex items-center justify-between shrink-0 h-16 w-full absolute top-0 left-0 z-10"
              >
                <AnimatePresence>
                  {(animState === 'expand' || animState === 'open' || animState === 'ready') && (
                    <motion.div 
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 shrink-0" />
                        <motion.h3 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ delay: 0.2 }}
                          className="font-bold"
                        >
                          {t.assistant}
                        </motion.h3>
                      </div>
                      <motion.button 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={handleClose}
                        className="p-1 hover:bg-teal-700 rounded-md transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {animState === 'ready' && (
              <>
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-teal-600 absolute top-16 left-0 right-0 bottom-14"
                  ref={scrollRef}
                >
                  {messages.map(msg => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === 'user' 
                            ? 'bg-teal-800 text-white rounded-br-none' 
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.helplines && (
                        <div className="w-full flex flex-col gap-2 mt-1">
                          {msg.helplines.map(helpline => (
                            <div key={helpline.id} className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm text-sm w-[90%]">
                              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{helpline.name}</h4>
                              <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">{getHelplineDescription(helpline, lang)}</p>
                              <div className="flex flex-col gap-2">
                                {helpline.phone && (
                                  <a href={`tel:${helpline.phone}`} className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300">
                                    <Phone className="w-4 h-4" />
                                    {helpline.phone}
                                  </a>
                                )}
                                {helpline.website && (
                                  <a href={helpline.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium hover:text-teal-600 dark:hover:text-teal-400 truncate">
                                    <ExternalLink className="w-4 h-4 shrink-0" />
                                    <span className="truncate">{helpline.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {currentNode && messages[messages.length - 1]?.sender === 'bot' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col gap-2 pt-2"
                    >
                      {currentNode.options.map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className="text-left w-full bg-white dark:bg-slate-800 text-teal-800 dark:text-teal-400 text-sm font-medium p-3 rounded-xl transition-colors flex items-center justify-between group shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          <span>{getOptionLabel(option, lang)}</span>
                          {option.action?.type === 'phone' ? (
                            <Phone className="w-4 h-4 text-teal-500 opacity-50 group-hover:opacity-100" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-teal-500 opacity-50 group-hover:opacity-100" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 h-14 bg-teal-700 flex items-center justify-between px-4 border-t border-teal-500"
                >
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    {t.helpVoice}
                  </span>
                  <button
                    onClick={() => {
                      setTtsEnabled(!ttsEnabled);
                      if (ttsEnabled) {
                        window.speechSynthesis.cancel();
                      }
                      playSound('click');
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700 ${
                      ttsEnabled ? 'bg-teal-400' : 'bg-teal-900'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        ttsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
