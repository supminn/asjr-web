import enHeader from './en/header.json';
import esHeader from './es/header.json';
import enIndex from './en/index.json';
import esIndex from './es/index.json';
import enAbout from './en/about.json';
import esAbout from './es/about.json';
import enWhatWeDo from './en/what-we-do.json';
import esWhatWeDo from './es/what-we-do.json';
import enLatestUpdates from './en/latest-updates.json';
import esLatestUpdates from './es/latest-updates.json';

export const translations = {
  en: { ...enHeader, ...enIndex, ...enAbout, ...enWhatWeDo, ...enLatestUpdates } as Record<string, string>,
  es: { ...esHeader, ...esIndex, ...esAbout, ...esWhatWeDo, ...esLatestUpdates } as Record<string, string>,
};

export type Lang = keyof typeof translations;

export function t(lang: Lang, key: string): string {
  return translations[lang][key] || translations.en[key] || key;
}
