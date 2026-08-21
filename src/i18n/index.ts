import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'de',
    fallbackLng: 'de',
    supportedLngs: ['de'],
    debug: false,
    resources: messages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'navigator', 'htmlTag'],
      caches: [],
    },
    load: 'languageOnly',
  });

export default i18n;