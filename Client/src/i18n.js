// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import englishTranslation from './locales/en/translation.json';
import frenchTranslation from './locales/fr/translation.json';

// Initialize i18n
i18n
  .use(initReactI18next) // Connects i18next with React
  .init({
    resources: {
      en: {
        translation: englishTranslation,
      },
      fr: {
        translation: frenchTranslation,
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the current language is missing translations
    interpolation: {
      escapeValue: false, // React already prevents XSS
    },
  });

export default i18n;
