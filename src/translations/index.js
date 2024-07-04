import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

import enTranslation from "./en.json";
import arTranslation from "./ar.json";

/**
 * Initializes i18next for internationalization in a React Native application,
 * with automatic language detection based on the device's language settings.
 *
 * @returns {void}
 */

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // Enable debug mode for development
    fallbackLng: "en", // Fallback language if translation for detected language is unavailable
    supportedLngs: ["en", "ar"], // Supported languages in the application
    resources: {
      en: {
        translation: enTranslation, // English translations loaded from en.json
      },
      ar: {
        translation: arTranslation, // Arabic translations loaded from ar.json
      },
    },
  });
