'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fr } from './fr';
import { ar } from './ar';

export type Locale = 'fr' | 'ar';
export type Translations = typeof fr;

const dictionaries = { fr, ar } as const;

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType>({
  locale: 'fr',
  t: fr,
  setLocale: () => {},
  dir: 'ltr',
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'fr' || saved === 'ar')) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('locale', next);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        t: dictionaries[locale],
        setLocale,
        dir: locale === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
