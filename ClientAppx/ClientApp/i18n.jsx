// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import ar from './locales/ar.json'; // or whichever languages you support

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } =
  Localization.findBestAvailableLanguage(Object.keys(resources)) || fallback;

// i18n config
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
