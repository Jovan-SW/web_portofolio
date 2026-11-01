'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey, Language } from '@/data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('portfolio_lang') as Language | null;
      if (saved === 'en' || saved === 'id') {
        setLangState(saved);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = saved;
        }
      }
    } catch {
      // LocalStorage might be restricted
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('portfolio_lang', newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    } catch {
      // LocalStorage might be restricted
    }
  };

  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  const t = (key: TranslationKey): string => {
    const record = translations[key];
    if (!record) return key;
    return record[lang] || record.id || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'id' as Language,
      setLang: () => {},
      toggleLang: () => {},
      t: (key: TranslationKey) => translations[key]?.id || key,
    };
  }
  return context;
};
