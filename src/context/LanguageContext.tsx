'use client';

import React, { createContext, useContext, useCallback, useSyncExternalStore } from 'react';
import { translations, TranslationKey, Language } from '@/data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

let memoryLang: Language = 'id';
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'portfolio_lang' && (e.newValue === 'en' || e.newValue === 'id')) {
      memoryLang = e.newValue;
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
  };
}

function getSnapshot(): Language {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'en' || saved === 'id') {
        memoryLang = saved;
      }
    } catch {
      // LocalStorage might be restricted
    }
  }
  return memoryLang;
}

function getServerSnapshot(): Language {
  return 'id';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((newLang: Language) => {
    memoryLang = newLang;
    try {
      localStorage.setItem('portfolio_lang', newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    } catch {
      // LocalStorage might be restricted
    }
    listeners.forEach((listener) => listener());
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'id' ? 'en' : 'id');
  }, [lang, setLang]);

  const t = useCallback(
    (key: TranslationKey): string => {
      const record = translations[key];
      if (!record) return key;
      return record[lang] || record.id || key;
    },
    [lang]
  );

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
