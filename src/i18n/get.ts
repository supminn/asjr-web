import enHeader from './en/header.json';
import esHeader from './es/header.json';
import enIndex from './en/index.json';
import esIndex from './es/index.json';

export const translations = {
  en: { ...enHeader, ...enIndex } as Record<string, string>,
  es: { ...esHeader, ...esIndex } as Record<string, string>,
};

export type Lang = keyof typeof translations;

export function t(lang: Lang, key: string): string {
  return translations[lang][key] || translations.en[key] || key;
}
